'use strict';

angular.module('tweetOnSlideApp')
  .controller('SlideCtrl', function ($scope, $routeParams,socket) {

    var str = $routeParams.user.split(".");
    $scope.scene = Number(str[0]);
    $scope.name = str[1];

    $scope.getNumber = function() {
      return new Array($scope.scene);
    }


    var obj_2014 = {
      "base":{
        color:"white",
        speed:10000,
        interval:700,
        font_size:"50px",
        loop:false
      },
      "comments":[
      ]
    }; //speedとintervalの指定方法変えたからnicoscreenの方見て
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

     socket.on('eeic2014', function (data) {
       nicoscreen.add(data);
    });//画面遷移を繰り返すと何本もコネクション張ってる？？

});
