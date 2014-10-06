'use strict';

angular.module('tweetOnSlideApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    var obj_2014 = {
      "base":{
        color:"white",
        speed:"normal",
        interval:"normal",
        font_size:"60px",
        loop:false
      },
      "comments":[
      ]
    };
    nicoscreen.set(obj_2014);
    nicoscreen.start();

    $('.flexslider').flexslider({
      slideshow: false
    });

    var elem = document.getElementById('nicoscreen');
    document.getElementById('nicoscreen').addEventListener('click', function () {
      if (screenfull.enabled) {
        screenfull.request(elem);
      }
    });


    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      nicoscreen.add('あああああああああああああああ');
      $scope.newThing = '';

    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    socket.on('eeic2014', function (data) {

       $http.post('/api/things', { name: data });
       nicoscreen.add(data);
    });

  });
