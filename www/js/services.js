/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var serviceURL = "http://localhost:81/tauschboerse-server/";
//var serviceURL = "http://myjoka.com/api/";
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
        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
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
    
$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
////console.log(loginData);
    var loginUser = function (loginData) {
        
    };
    

//        var rPromise = postLogin(serviceURL + "login", loginData);
//        
//        rPromise.success(function(response){
//
//        console.log(response);
//                if (response.error === false) {
//                    if (typeof (Storage) !== "undefined") {
//                        localStorage.username = response.username;
//                        localStorage.apikey = response.apiKey;    
//                    }
//                    $state.go('app.browse');
////                    $state.reload('app.login');
//                } else {
//                    localStorage.clear();
//                }
//                responseItem = response.error;
//    }).error(function(){
//        console.log("AJAX failed!");
//    });
//return responseItem;
//////            
//////            
//        $http.post(serviceURL + "login", {"email": loginData.username, "password": loginData.password})
//            .success(function (data) {
//                console.log('Doing login success');
//                if (data.error === false) {
//                    alert(data.error);
//                    if (typeof (Storage) !== "undefined") {
//                        localStorage.Username = data.username;
//                    }
//                } else {
//                    localStorage.Username = "";
//                    alert(data.message);
//                }
//
//            })
//        .error(function (data) {
//            console.log('Doing login failled');
//            alert(data.message);
//        });
//    };
//    
    return {
        loginUser: loginUser
    };
});

//.factory('Login', ['$resource', function ($http, $state, $resource) {
//        return $resource( serviceURL + "login", {email: "username", password: "password"}, { 
//      loginUser: { 
//        method: 'POST', 
//        params: {email: "username", password: "password"}, 
//        isArray: false 
//      } 
//      /* , method2: { ... } */
//    });
//    return {
//        loginUser: loginUser
//    };
//}]);

function postLogin(url, obj){
    return $.ajax({
        type: "POST",
        url: url,
        cache: true,
        data: obj
    });
}
