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
var localStorage = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    image: null,
    name:null,
    apikey: null
};

angular.module('starter.services', ['ngMessages'])
angular.module('starter.services', ['ngResource'])


.factory('Articles', function($http) {
  // Might use a resource here that returns a JSON array

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
////    get: getArticle,
//    remove: function(article) {
//      articlecat.splice(articlecat.indexOf(article), 1);
//    },
//    
//    get: function(articleId) {
//      for (var i = 0; i < categoriesItem.length; i++) {
//        if (categoriesItem[i].article_Id === articleId) {
//          return categoriesItem[i];
//        }
//      }
//      return null;
//    }
  };
})

.factory('Login', function ($http, $state, $resource) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var loginUser = function (loginData) {
        var logindata = "email=" + loginData.email + "&password=" + loginData.password;
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "login", logindata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        if (typeof (Storage) !== "undefined") {
                            localStorage.username = data.username;
                            localStorage.apikey = data.apiKey;
                        }
                        $state.go('app.home');
                    } else {
                        localStorage.clear();
                        $("#loginMsg").text(data.message).css("color", "red");
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("AJAX failed!");
                });
    };

    return {
        loginUser: loginUser
    };
})

.factory('SignUp', function ($http, $state, $resource, $filter) {
    
$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
////console.log(loginData);
    var signUpUser = function (signupData) {
        console.log(signupData);
        var appDate = $filter('date')(signupData.birthdate, "yyyy-MM-dd");
        console.log(appDate);
        var signUpdata = "username=" + signupData.username + 
                "&email=" + signupData.email +
                "&password=" + signupData.password +
                "&birthdate=" + appDate ;
        
        // Simple POST request example (passing data) :
        $http.post(serviceURL + "register", signUpdata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(data);
                    if (data.error === false) {
                        $state.go('app.home');
                    } else {
                        localStorage.clear();
                        $("#loginMsg").text(data.message).css("color", "red");
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("AJAX failed!");
                });
    };
       
    return {
        signUpUser: signUpUser
    };
});

function postLogin(url, obj){
    return $.ajax({
        type: "POST",
        url: url,
        cache: true,
        data: obj
    });
}
