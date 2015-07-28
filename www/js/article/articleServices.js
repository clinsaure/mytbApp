/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var serviceURL = "http://tbapp.kamdem-kenmogne.de/";
var serviceURL = "http://localhost:81/tbServer/";

var articlesItem,
        categoriesItem,
        articleCatItem;
var responseItem;

//angular.module('starter.article.services', ['ngMessages'])
angular.module('starter.article.services', ['ngResource'])


.factory('Articles', function($http) {
  // Might use a resource here that returns a JSON array
$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  // Some fake testing data      
var _articles = function() {

    return $http.get(serviceURL + "articles" ,{
        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
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

.factory('Categories', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data      
var categories = function() {
    
    return $http.get(serviceURL + "categories" ,{
        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
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
        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
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

.factory('ArticlePost', function($http, $state){
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var articlePost = function (articlePostData) {
        var catId;
        angular.forEach(categoriesItem, function(value, key){
            if(value.name === articlePostData.catName){
                catId = value.categorie_Id;
            } 
        });

        var articledata = "categorie_Id=" + catId + "&name=" + articlePostData.name +
                "&description" + articlePostData.description + "&image" + articlePostData.image;
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "//article", articledata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        $state.go('app.articles');
                    } else {
                        $("#loginMsg").text(data.message).css("color", "red");
                    }
                }).
                error(function (data, status, headers, config) {
                    $("#loginMsg").text(data.message).css("color", "red");
                    console.log("AJAX failed!");
                });
    };

    return {
        articlePost: articlePost
    };
})
;
