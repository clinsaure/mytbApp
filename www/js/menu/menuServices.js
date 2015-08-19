"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular;
var articlesItem,
        categoriesItem,
        articleCatItem;
var responseItem;


angular.module('starter.menu.services', ['ngMessages']),
angular.module('starter.menu.services', ['ngResource'])


.factory('ArticlesMenu', function($http, $window) {
  // Might use a resource here that returns a JSON array
  // Some fake testing data      
var _articles = function() {

    return $http.get(serviceURL + "articles" ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
    })
        .success(function(data) {
            articlesItem = data;
         });   
};

  return {
    all: _articles
    };

})

;


