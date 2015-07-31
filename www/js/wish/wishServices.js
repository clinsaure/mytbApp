"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var serviceURL = "http://localhost:81/tbServer/";
var angular;

var wishlistsItem;


//angular.module('starter.article.services', ['ngMessages'])
angular.module('starter.wishlist.services', ['ngResource'])


.factory('wishLists', function ($http, $state, $ionicPopup,$window) {
    // Might use a resource here that returns a JSON array
    $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("apikey");
    // Some fake testing data      
    var _wishlist = function () {

        return $http.get(serviceURL + "wishlist", {
            headers: 'Access-Control-Allow-Headers: Content-Type, x-xsrf-token',
            isArray: true,
            crossDomain: true
        })
                .success(function (data) {
                    wishlistsItem = data;
                });
    };
    
    var _deletwish = function(id){
        
        $http.delete(serviceURL + "wishlist/" + id).
            
        success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        var alertPopup = $ionicPopup.alert({
                            title:'Wish',
                            template: data.message
                        });
//                        $state.go('app.wishlist');
//                        $state.go('app.wishlist',{}, {reload:true});
                        $window.location.reload(true);
                        
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title:'Wish',
                            template: data.message
                        });
                        $state.go('app.wishlist');
                    }
                }).
                error(function (data, status, headers, config) {
                    var alertPopup = $ionicPopup.alert({
                            title:'Wish',
                            template: 'send wish failed please try again'
                        });
                        $state.go('app.wishlist');
                });
    };

    return {
        all: _wishlist,
        remove: _deletwish
//                function (wishId) {
//            articles.splice(articles.indexOf(article), 1);
//        }
    };
})

.factory('WishPost', function($http, $state, $ionicPopup, $window){
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http.defaults.headers.common['Authorization'] = sessionStorage.getItem("apikey");
    var wishPost = function (wishPostData) {
        
        var wishdata = "searchText=" + wishPostData.wishText;
        // Simple POST request example (passing data) :
        if (wishPostData.wishText !== undefined){
        $http.post(serviceURL + "wishlist", wishdata).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (data.error === false) {
                        var alertPopup = $ionicPopup.alert({
                            title:'Wish',
                            template: data.message
                        });
//                        $state.go('app.wishlistPost');
//                        $state.go($state.current, {reload:true});
                        $window.location.reload(true);
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title:'Wish',
                            template: data.message
                        });
                        $state.go('app.wishlistPost');
                    }
                }).
                error(function (data, status, headers, config) {
                    var alertPopup = $ionicPopup.alert({
                            title:'Wish',
                            template: 'send wish failed please try again'
                        });
                        $state.go('app.wishlistPost');
                });
            }
    };

    return {
        wishPost: wishPost
    };
})
;
