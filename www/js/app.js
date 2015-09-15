"use strict";
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ngMessages'])

//var serviceURL = "http://localhost:81/tbServer/";
var serviceURL = "http://tbapp.kamdem-kenmogne.de/";

var angular;
angular.module('starter', ['ionic', 'ngCordova','ionic.service.core','ionic.service.push','ngMessages',
    'starter.menu.controllers', 'starter.menu.services',])

.config(['$ionicAppProvider', function($ionicAppProvider){
   $ionicAppProvider.identify({
     app_id: '4f21f356',
     api_key: '069b7e5d0455d629b323ed0e0bc325aa376847224c5ac10c',
     name: 'Kamdem-Ionic',
     dev_push: true,
     gcm_id:'AIzaSyB8jBkZarMqufN09EIYWdac_7AGfmQK7Eo',
     senderID: 'tpapps-1044'
   }); 
   
}])

//.config('$httpProvider','$cookieStore',[function($httpProvider,$cookieStore){
//   //$httpProvider.interceptors.push(window.localStorage.getItem("apikey")); 
//    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
//}])

.run(function($ionicPlatform, $http, $rootScope, $cordovaPush,$ionicPush, $ionicUser) {
 
    var androidConfig = {
//        'canShowAlert': false,
        'badge': true,
        'sound': true,
        'alert': true,
        onNotification: function (notification) {
                console.log('onNotification', JSON.stringify(notification));
                // Called for each notification for custom handling
//                $scope.lastNotification = JSON.stringify(notification);
            }
        };
        
    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };
    
//    angular.extend(user, {
//      name: 'Test User',
//      bio: 'I come from planet Ion'
//    });
        $ionicUser.identify(user).then(function(){
//      $scope.identified = true;
            alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
//        $ionicUser.identify({
//            user_id: $ionicUser.generateGUID(),
//            name: 'Test User',
//            message: 'I come from planet Ion'
//        });
        
//            $ionicPush.register({
//                canShowAlert: false,
//                onNotification: function (notification) {
//                    console.log('onNotification', JSON.stringify(notification));
//                    // Called for each notification for custom handling
//                    $scope.lastNotification = JSON.stringify(notification);
//                }
//            },
//            // Some metadata to send through the webhook for your own
//            // linking of device token and user
//            {
//                "user_id": 0,
//                "email": "tester@example.com"
//            }).then(function (deviceToken) {
//                console.log("deviceToken", deviceToken);
//                $scope.token = deviceToken;
//            });

        $ionicPush.register(androidConfig).then(function(result) {
            // Success -- send deviceToken to server, and store for future use
            console.log('result: ' + result);
            $rootScope.deviceToken = result;
            //$http.post('http://server.co/', {user: 'Bob', tokenID: result.deviceToken})
        }, function(err) {
            alert('Registration error: ' + err);
        });


        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            console.log('Got token', notification.token, notification.platform);
            if (notification.alert) {
                navigator.notification.alert(notification.alert);
            }

            if (notification.sound) {
                var snd = new Media(event.sound);
                snd.play();
            }

            if (notification.badge) {
                $ionicPush.setBadgeNumber(notification.badge).then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occurred. Show a message to the user
                });
            }
        });
 
////    PushProcessingService.initialize();
//    var androidConfig = {
//    senderID: 'tpapps-1044',
//    gcm_id:'AIzaSyB8jBkZarMqufN09EIYWdac_7AGfmQK7Eo',
//    canShowAlert: false, //Can pushes show an alert on your screen?
//        canSetBadge: true, //Can pushes update app icon badges?
//        canPlaySound: true, //Can notifications play a sound?
//        canRunActionsOnWake: true
//  };
//
//
//
//  document.addEventListener("deviceready", function(){
//    $cordovaPush.register(androidConfig).then(function(result) {
//      // Success
//      arlert("je suis dans cordova");
//    }, function(err) {
//      // Error
//      arlert("je suis dans cordova fail");
//    });
//
//    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
//      switch(notification.event) {
//        case 'registered':
//          if (notification.regid.length > 0 ) {
//            alert('registration ID = ' + notification.regid);
//          }
//          break;
//
//        case 'message':
//          // this is the actual push notification. its format depends on the data model from the push server
//          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
//          break;
//
//        case 'error':
//          alert('GCM error = ' + notification.msg);
//          break;
//
//        default:
//          alert('An unknown GCM event has occurred');
//          break;
//      }
//    });
//
//
//    // WARNING: dangerous to unregister (results in loss of tokenID)
//    $cordovaPush.unregister(options).then(function(result) {
//      // Success!
//    }, function(err) {
//      // Error
//    })
//
//  }, false); 
    
    
   //send Apikey to server 
  $http.defaults.headers.common['Authorization'] = window.localStorage.getItem("apikey");

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });

})

.config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;

      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
       //send Apikey to server 
  
  })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


//.state('tab', {
//    url: "/tab",
//    abstract: true,
//    templateUrl: "templates/tabs.html"
//  })

.state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu/menu.html",
    controller: 'AppCtrl'
  })
    
  .state('app.messages', {
    url: "/messages",
    views: {
      'menuContent': {
        templateUrl: "templates/message/messages.html",
        controller: 'messagesCtrl'
      }
    }
  })

  .state('app.message', {
    url: "/messages/:messageId",
    views: {
      'menuContent': {
        templateUrl: "templates/message/message.html",
        controller: 'messageCtrl'
      }
    }
  })
  
  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html"
//        controller: 'ArticlesMenuCtrl'
      }
    }
  })
  
.state('app.categories', {
    url: "/categories",
    views: {
        'menuContent': {
            templateUrl: "templates/article/categorie.html",
            controller: 'CategoriesCtrl'
        }
    }
})

.state('app.articles', {
  url: "/articles",
  views: {
    'menuContent': {
      templateUrl: "templates/article/articles.html",
      controller: 'ArticlesCtrl'
    }
  }
})

.state('app.myArticles', {
  url: "/myArticles",
  views: {
    'menuContent': {
      templateUrl: "templates/article/myArticles.html",
      controller: 'MyArticlesCtrl'
    }
  }
})

.state('app.signIn', {
    url: "/signIn",
    views: {
      'menuContent': {
        templateUrl: "templates/signIn/signIn.html",
        controller: 'SignInCtrl'
      }
    }
  })
  
  .state('app.signUp', {
    url: "/signUp",
//    abstract: true,
    views: {
      'menuContent': {
        templateUrl: "templates/signUp/signUp.html",
        controller: 'SignUpCtrl'
//        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/articles/:articleId",
    views: {
      'menuContent': {
        templateUrl: "templates/article/article.html",
        controller: 'ArticleCtrl'
      }
    }
  })
  
  .state('app.articlesCat', {
    url: "/articlesCat/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "templates/article/articlesCat.html",
        controller: 'ArticleCatCtrl'
      }
    }
  })
  
  .state('app.articlePost', {
    url: "/articlePost",
    views: {
      'menuContent': {
        templateUrl: "templates/article/articlePost.html",
        controller: 'ArticlePostCtrl'
      }
    }
  })
  
  .state('app.loginG+', {
    url: '/loginGoogle',            
        views:{
            'menuContent': {
                templateUrl: 'templates/signIn/loginGoogle.html',
                controller: 'LoginGoogleCtrl'
            }
        }
    })
    .state('app.secure', {
        url: '/secure',
        views: {
            'menuContent': {
                templateUrl: 'templates/signIn/secure.html',
                controller: 'SecureController'
            }
        }
    })
    .state('app.artcMessage', {
        url:'/artcMessage/:articleId',
        views: {
            'menuContent': {
                //url: '/artcMessage',
                templateUrl: 'templates/message/artcMessage.html',
                controller: 'messagesCtrl'
            }
        }
    })
    
    .state('app.wishlist', {
        url:'/wishlist',
        views: {
            'menuContent': {
                templateUrl: 'templates/wish/wishList.html',
                controller: 'wishListsCtrl'
            }
        }
    })
    
    .state('app.wishlistPost', {
        url:'/wishlistPost',
        views: {
            'menuContent': {
                templateUrl: 'templates/wish/postWish.html',
                controller: 'wishPostCtrl'
            }
        }
    })
  
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
