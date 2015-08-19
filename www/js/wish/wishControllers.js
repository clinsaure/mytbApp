"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var angular;

angular.module('starter.wishlist.controllers', ['starter.wishlist.services'])

//Articles
.controller('wishListsCtrl', function($http, $scope, $stateParams, wishLists) {

//    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.loadWishLists = function() {
        wishLists.all()
        .success(function(wishList){
        $scope.wishList = [];
        for(var i = 0; i < wishList.length ; i++) {
           $scope.wishList.push({id: wishList[i].search_Id, searchText: wishList[i].searchText,
           date: wishList[i].created_at, userId: wishList[i].user_Id});
        }
    });
    };
    
    
  $scope.remove = function(wishId) {
      console.log("dans delete " + wishId);
    wishLists.remove(wishId);
  };
  
})

.controller('wishPostCtrl', function($http, $scope, WishPost) {  
    // Form data for the login modal
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.wishPostData = {};
    // Perform the login action when the user submits the login form
    $scope.dowishlistPost = function () {
//        console.log("controller data", $scope.articlePostData);
        WishPost.wishPost($scope.wishPostData);
    };
})

;


