"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular;

var articlesItem;
var categoriesItem;
var articleCatItem;
var myArticlesItem;
var wishItem;
var responseItem;
var alertPopup;
var articleName;

//angular.module('starter.article.services', ['ngMessages'])
angular.module('starter.article.services', ['ngResource'])


.factory('Articles', function($http) {

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
//            headers:{ 'Authorization': sessionStorage.getItem("apikey")},//{ Authorization: sessionStorage.getItem("apikey")},
            isArray: true,
            crossDomain : false
        }).success(function(data) {
                myArticlesItem = data;
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
//    $http.defaults.headers.common['Authorization'] = window.localStorage.getItem("apikey");
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    
    var _articlePost = function (articlePostData) {

        var catId;
        angular.forEach(categoriesItem, function(value, key){
            if(value.name === articlePostData.catName){
                catId = value.categorie_Id;
            } 
        });
        
//console.log(articlePostData.image);
//return;
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
//                            $window.location.reload(true);
                    $state.go('app.articles');
                    _getWish(articlePostData.name);

                } else {
                    alertPopup = $ionicPopup.alert({
                            title:'Message',
                            template: data.message
                        });
                        articleName = null;
                }
            }).error(function (data, status, headers, config) {
                alertPopup = $ionicPopup.alert({
                        title:'Message',
                        template: data.message
                    });
                    articleName = null;
            });
    };
    
    var _getWish = function(name){
        return $http.get(serviceURL + "wishlists" ,{
//        headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
        isArray: true,
        crossDomain : true
        })
        .success(function(data) {
            wishItem = data;
            console.log(data);
            angular.forEach(data, function(value, key){
            if(value.searchText === name){
                console.log(value.user_Id);
                _sendmsg(value.user_Id);
                } 
            });
            
        });   
    };
    
    var _sendmsg = function(user_Id){
        var msgdata = "message= das konnten Sie interessiert" ;
        $http.post(serviceURL + "messagepush/"+ user_Id, msgdata).
            success(function (data, status, headers, config) {
                if (data.error === false) {
                    $state.go('app.articles');
                } 
            });

    };

    return {
        articlePost: _articlePost
    };
})

//.factory('PushProcessingService', function() {
//        function onDeviceReady() {
//            console.info('NOTIFY  Device is ready.  Registering with GCM server');
//            //register with google GCM server
//            var pushNotification = window.plugins.pushNotification;
//            pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {senderID:gcmAppID,:onNotificationGCM});
//        }
//        function gcmSuccessHandler(result) {
//            console.info('NOTIFY  pushNotification.register succeeded.  Result = '+result)
//        }
//        function gcmErrorHandler(error) {
//            console.error('NOTIFY  '+error);
//        }
//        return {
//            initialize : function () {
//                console.info('NOTIFY  initializing');
//                document.addEventListener('deviceready', onDeviceReady, false);
//            },
//            registerID : function (id) {
//                //Insert code here to store the user's ID on your notification server.
//                //You'll probably have a web service (wrapped in an Angular service of course) set up for this.
//                //For example:
//                MyService.registerNotificationID(id).then(function(response){
//                    if (response.data.Result) {
//                        console.info('NOTIFY  Registration succeeded');
//                    } else {
//                        console.error('NOTIFY  Registration failed');
//                    }
//                });
//            },
//            //unregister can be called from a settings area.
//            unregister : function () {
//                console.info('unregister')
//                var push = window.plugins.pushNotification;
//                if (push) {
//                    push.unregister(function () {
//                        console.info('unregister success')
//                    });
//                }
//            }
//        }
//    });
// 
//// ALL GCM notifications come through here.
//function onNotificationGCM(e) {
//    console.log('EVENT -&gt; RECEIVED:' + e.event + '');
//    switch( e.event )
//    {
//        case 'registered':
//            if ( e.regid.length &gt; 0 )
//            {
//                console.log('REGISTERED with GCM Server -&gt; REGID:' + e.regid + &quot;&quot;);
// 
//                //call back to web service in Angular.
//                //This works for me because in my code I have a factory called
//                //      PushProcessingService with method registerID
//                var elem = angular.element(document.querySelector('[ng-app]'));
//                var injector = elem.injector();
//                var myService = injector.get('PushProcessingService');
//                myService.registerID(e.regid);
//            }
//            break;
// 
//        case 'message':
//            // if this flag is set, this notification happened while we were in the foreground.
//            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
//            if (e.foreground)
//            {
//                //we're using the app when a message is received.
//                console.log('--INLINE NOTIFICATION--' + '');
// 
//                // if the notification contains a soundname, play it.
//                //var my_media = new Media(&quot;/android_asset/www/&quot;+e.soundname);
//                //my_media.play();
//                alert(e.payload.message);
//            }
//            else
//            {
//                // otherwise we were launched because the user touched a notification in the notification tray.
//                if (e.coldstart)
//                    console.log('--COLDSTART NOTIFICATION--' + '');
//                else
//                    console.log('--BACKGROUND NOTIFICATION--' + '');
// 
//                // direct user here:
//                window.location = &quot;#/tab/featured&quot;;
//            }
// 
//            console.log('MESSAGE -&gt; MSG: ' + e.payload.message + '');
//            console.log('MESSAGE: '+ JSON.stringify(e.payload));
//            break;
// 
//        case 'error':
//            console.log('ERROR -&gt; MSG:' + e.msg + '');
//            break;
// 
//        default:
//            console.log('EVENT -&gt; Unknown, an event was received and we do not know what it is');
//            break;
//    }

;
