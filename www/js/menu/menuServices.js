"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var serviceURL = "http://tbapp.kamdem-kenmogne.de/";
var serviceURL = "http://localhost:81/tbServer/";
var angular;
var articlesItem,
        categoriesItem,
        articleCatItem;
var responseItem;

angular.module('starter.menu.services', ['ngMessages']),
angular.module('starter.menu.services', ['ngResource'])


.factory('Articles', function($http) {
  // Might use a resource here that returns a JSON array
    $http.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";

  // Some fake testing data      
var articles = function() {
    
//    var article = $http({
//            url: serviceURL + "articles",
//            type:'GET',
//            dataType:'json',
//            contentType: 'text/plain',
//            crossDomain : false,
//            headers: 'Access-Control-Allow-Origin: *'
//            })
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
    all: articles,
//    get: getArticle,
    remove: function(article) {
      articles.splice(articles.indexOf(article), 1);
    },
    
    get: function(articleId) {
//        console.log("arrivé");
      for (var i = 0; i < articlesItem.length; i++) {
        if (articlesItem[i].article_Id === articleId) {
          return articlesItem[i];
        }
      }
      return null;
    }
  };
})
;


