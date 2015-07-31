"use strict";
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ngMessages'])
var angular;
angular.module('starter', ['ionic', 'starter.menu.controllers', 'starter.menu.services', 'ngCordova','ngMessages'])

.run(function($ionicPlatform) {
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
