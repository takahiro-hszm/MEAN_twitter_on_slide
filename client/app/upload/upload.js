'use strict';

angular.module('tweetOnSlideApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/upload', {
        templateUrl: 'app/upload/upload.html',
        controller: 'UploadCtrl'
      });
  });