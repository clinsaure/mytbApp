// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

//.state('tab', {
//    url: "/tab",
//    abstract: true,
//    templateUrl: "templates/tabs.html"
//  })
  
//  .state('app', {
//    url: "/app",
//    abstract: true,
//    templateUrl: "templates/tabs.html",
////    controller: 'AppCtrl'
//  })LoginCtrl

.state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
    
  .state('app.benachrichtigungen', {
    url: "/benachrichtigungen",
    views: {
      'menuContent': {
        templateUrl: "templates/benachrichtigungen.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.articles', {
      url: "/articles",
      views: {
        'menuContent': {
          templateUrl: "templates/articles.html",
          controller: 'ArticlesCtrl'
        }
      }
    })

.state('app.login', {
    url: "/login",
//    abstract: true,
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/articles/:articleId",
    views: {
      'menuContent': {
        templateUrl: "templates/article.html",
        controller: 'ArticleCtrl'
      }
    }
  })
  
  .state('app.articlePost', {
    url: "/articlePost",
    views: {
      'menuContent': {
        templateUrl: "templates/articlePost.html",
        controller: 'ArticleCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/articles');
});
