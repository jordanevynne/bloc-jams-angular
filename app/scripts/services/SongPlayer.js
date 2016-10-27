(function() {
   function SongPlayer(Fixtures) {
     var SongPlayer = {};
     
     var currentAlbum = Fixtures.getAlbum();
     
     /*
     *@desc Buzz object audio file
     *@type {Object}
     */
     var currentBuzzObject = null;
     
     /*
     *@function setSong
     *@desc Stops currently playing song and loads new audio file as currentBuzzObject
     *@param {Object} song
     */
     var setSong = function(song) {
       if (currentBuzzObject) {
         stopSong();
       }
 
       currentBuzzObject = new buzz.sound(song.audioUrl, {
         formats: ['mp3'],
         preload: true
       });
 
       SongPlayer.currentSong = song;
     };   
     
     /*
     *@function playSong
     *@desc Play current song
     *@param {Object} song
     */
     var playSong = function(song) {
       currentBuzzObject.play();
       song.playing = true;
     };
     
     /*
     *@function stopSong
     *@desc Stop current song
     *@param {Object} song
     */
     var stopSong = function() {
       currentBuzzObject.stop();
       SongPlayer.currentSong.playing = null;
     };
     
     /*
     *@function getSongIndex
     *@desc Get the index of a song
     *@param {Object} song
     *@returns indexOf song
     */
     
     var getSongIndex = function(song) {
       return currentAlbum.songs.indexOf(song);
     };
    
     /*
     *@desc Active song Object from list of songs
     *@type {Object}
     */
     
     SongPlayer.currentSong = null;
     
     /*
     *@function play
     *@desc Play current or new song
     *@param {Object} song
     */
     SongPlayer.play = function(song) {
       song = song || SongPlayer.currentSong;
       if (SongPlayer.currentSong !== song) {
         setSong(song);
         playSong(song);
       } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
           playSong(song);
         }
       }   
     };
     
     /*
     *@function pause
     *@desc Pause current song
     *@param {Object} song
     *@returns n/a
     */
     SongPlayer.pause = function(song) {
       song = song || SongPlayer.currentSong;
       currentBuzzObject.pause();
       song.playing = false;
     };
     
     /*
     *@function previous
     *@desc Go to the previous song
     *@param {Object} song
     */
     SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;
       
       if (currentSongIndex < 0) {
         stopSong();
       } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };
    
     /*
     *@function next
     *@desc Go to the next song
     *@param {Object} song
     */
     SongPlayer.next = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;
       
       if (currentSongIndex >= currentAlbum.songs.length) {
         stopSong();
       } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
     };
     
     return SongPlayer;
  }

   angular
       .module('blocJams')
       .factory('SongPlayer', SongPlayer);
})();