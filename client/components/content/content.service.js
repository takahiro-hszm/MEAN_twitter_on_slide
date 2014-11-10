'use strict';

angular.module('tweetOnSlideApp')
  .factory('Content', function($resource,$http,$q) {
    return {

      get:function(account,callback){
        var deferred = $q.defer();
        $http.post('/api/upload/user',{
          user:account
        }).
        success(function(data) {
          console.log(data);
          deferred.resolve(data);

        }).
        error(function(err) {
          cb(err);
          deferred.reject(err);
        }.bind(this));
        return deferred.promise;
      }

    };
  });

