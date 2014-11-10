'use strict';

angular.module('tweetOnSlideApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/slide/:user', {
        templateUrl: 'app/slide/slide.html',
        controller: 'SlideCtrl'
      });
  });