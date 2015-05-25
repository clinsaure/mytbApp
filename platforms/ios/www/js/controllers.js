var requestToken = "";
var accessToken = "";
var clientId = "200463856698-diablkbebnhc8srvgg2vg53q8or6h95t.apps.googleusercontent.com";
var clientSecret = "xDiJAb7Yq5bUj3EI4ID2aAHF";
var serviceURL = "http://localhost:81/tauschboerse-server/";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal , $state) {
    $scope.articles = function(){
        $state.go('app.articles');
    };
    $scope.categorie = function(){
        $state.go('app.categories');
    };
    $scope.mytbapp = function(){
        $state.go('app.secure');
    };
    
})
//Articles
.controller('ArticlesCtrl', function($scope, $stateParams, Articles) {
    $scope.loadArticles = function() {
        Articles.all($stateParams.categorieId)
        .success(function(articles){
//       $scope.articles = articles;
        $scope.articles = [];
        for(var i = 0; i < articles.length ; i++) {
           $scope.articles.push({id: articles[i].article_Id, name: articles[i].name,
           description: articles[i].description, src: serviceURL + articles[i].image});
        }
    });
    };
    
    
  $scope.remove = function(article) {
    Articles.remove(article);
  };
  
  $scope.loadImages = function() {
      Articles.all()
      .success(function(images){
            $scope.images = [];
        for(var i = 0; i < 6; i++) {
            $scope.images.push({id: images[i], src: serviceURL + images[i].image});
//            console.log(images[i]);
        }
      });
    };
})

.controller('ArticleCtrl', function($scope, $stateParams, Articles) {  

    var selectArticle = Articles.get($stateParams.articleId);
    $scope.article = selectArticle;
                $scope.articles = [];
        $scope.articles.push({id: selectArticle.article_Id, name: selectArticle.name,
           description: selectArticle.description, src: serviceURL + selectArticle.image});
            
})

// Categories
.controller('CategoriesCtrl', function($scope, Categories) {
    Categories.all()
    .success(function(categories){
       $scope.categories = categories; 
    });
})

//
.controller('ArticleCatCtrl', function ($scope, $stateParams, ArticlesCat) {
    $scope.loadArticlesCat = function() {
        ArticlesCat.all($stateParams.categoryId)
        .success(function(articles){
//       $scope.articles = articles;
        $scope.articles = [];
        for(var i = 0; i < articles.length ; i++) {
           $scope.articles.push({id: articles[i].article_Id, name: articles[i].name,
           description: articles[i].description, src: serviceURL + articles[i].image});
        }
    });
    };
})

.controller('LoginCtrl', function($scope, $ionicModal, Login, $http, $state) { 
    
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
     // Form data for the login modal
  $scope.loginData = {};

  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login/login.html', {
    scope: $scope
  }).then(function(modal) {
      
  $("#logintextE").on("keyup", function () {
            $("#loginMsg").text("");
        });

    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
    $("#logintextE").text("");
        $("#logintextP").text("");
      $("#loginMsg").text("");
  };

  // Perform the login action when the user submits the login form
    $scope.doLogin = function () {

//        Login.loginUser($scope.loginData);
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var rPromise = postLogin(serviceURL + "login", $scope.loginData);
        rPromise.success(function (response) {
            console.log(response);
            if (response.error === false) {
                if (typeof (Storage) !== "undefined") {
                    localStorage.username = response.username;
                    localStorage.apikey = response.apiKey;
                }
                $state.go('app.home');
                $scope.closeLogin();
            } else {
                localStorage.clear();
                $("#loginMsg").text(response.message).css("color","red");
            }
        }).error(function(){
            console.log("AJAX failed!");
    }) ;
                    
                // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
                //    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
    };

})

.controller('LoginGoogleCtrl', function($scope, $http, $location) {
 
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
    $scope.login = function() {
        var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
        ref.addEventListener('loadstart', function(event) { 
            if((event.url).startsWith("http://localhost/callback")) {
                requestToken = (event.url).split("code=")[1];
                $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
                    .success(function(data) {
                        accessToken = data.access_token;
                        $location.path("/secure");
                    })
                    .error(function(data, status) {
                        alert("ERROR: " + data);
                    });
                ref.close();
            }
        });
    };
 
    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) === 0;
        };
    } 
})
 
.controller('SecureController', function($scope, $http) {
    $scope.accessToken = accessToken;   
});

function postLogin(url, obj){
    return $.ajax({
        type: "POST",
        url: url,
        cache: true,
        data: obj
    });
}
