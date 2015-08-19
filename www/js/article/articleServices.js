"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular;

var articlesItem,
        categoriesItem,
        articleCatItem,
        myArticlesItem;
var responseItem;
var alertPopup;

//angular.module('starter.article.services', ['ngMessages'])
angular.module('starter.article.services', ['ngResource'])


.factory('Articles', function($http) {
  // Might use a resource here that returns a JSON array
//$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
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
    all: _articles,
//    get: getArticle,
    remove: function(article) {
      articles.splice(articles.indexOf(article), 1);
    },
    
    get: function(articleId) {
      for (var i = 0; i < articlesItem.length; i++) {
        if (articlesItem[i].article_Id === articleId) {
          return articlesItem[i];
        }
      }
      return null;
    }
  };
})

.factory('MyArticles', function($http, $ionicPopup, $window, $state) {

  // Some fake testing data      
    var _myarticles = function() {

        return $http.get(serviceURL + "article" ,{
//            headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
            isArray: true,
            crossDomain : true
        }).success(function(data) {
                myArticlesItem = data;
//                console.log( data);
        }).error(function (data, status) {
        console.log(status, data);
        });  
    };
    
    var _deletarticle = function(id){
        
        $http.delete(serviceURL + "article/" + id).   
        success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        alertPopup = $ionicPopup.alert({
                            title:'Article',
                            template: data.message
                        });
//                        $state.go('app.wishlist',{}, {reload:true});
                        $window.location.reload(true);
                        
                    } else {
                        alertPopup = $ionicPopup.alert({
                            title:'Article',
                            template: data.message
                        });
                        $state.go('app.myArticles');
                    }
                }).
                error(function (data, status, headers, config) {
                    alertPopup = $ionicPopup.alert({
                            title:'Article',
                            template: 'Delete article failed please try again'
                        });
                        $state.go('app.myArticles');
                });
    };
    

  return {
    all: _myarticles,
//    get: getArticle,
    remove: _deletarticle
  };
})

.factory('Categories', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data      
var categories = function() {
    
    return $http.get(serviceURL + "categories" ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
    })
        .success(function(data) {
            categoriesItem = data;
         });   
};

  return {
    all: categories,
//    get: getArticle,
    remove: function(article) {
      categories.splice(categories.indexOf(article), 1);
    },
    
    get: function(articleId) {
      for (var i = 0; i < categoriesItem.length; i++) {
        if (categoriesItem[i].article_Id === articleId) {
          return categoriesItem[i];
        }
      }
      return null;
    }
  };
})

.factory('ArticlesCat', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data      
var articleCat = function(categorieId) {
    
    return $http.get(serviceURL + "articleCat/" + categorieId ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
    })
        .success(function(data) {
            articleCatItem = data;
         });   
};

  return {
    all: articleCat

  };
})

.factory('ArticlePost', function($http, $state, $ionicPopup, $window){
    
    var articlePost = function (articlePostData) {
        var catId;
        angular.forEach(categoriesItem, function(value, key){
            if(value.name === articlePostData.catName){
                catId = value.categorie_Id;
            } 
        });

        var articledata = "categorie_Id=" + catId + "&name=" + articlePostData.name +
                "&description=" + articlePostData.description + "&image=" + articlePostData.image;
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "article", articledata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        alertPopup = $ionicPopup.alert({
                                title:'Message',
                                template: data.message
                            });
                            $window.location.reload(true);
                        $state.go('app.articles');
                    } else {
                        alertPopup = $ionicPopup.alert({
                                title:'Message',
                                template: data.message
                            });
                    }
                }).
                error(function (data, status, headers, config) {
                    alertPopup = $ionicPopup.alert({
                                title:'Message',
                                template: data.message
                            });

                });
    };

    return {
        articlePost: articlePost
    };
})
;
