'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('ossuClientApp')
  .controller('AccountCtrl', function ($timeout, $scope, Auth, User, Course) {
    $scope.courses = null;
    $scope.user = User.user;
    $scope.edit = {};

    $timeout(function () {
      Course.getUserCourses($scope.user.uid).$loaded().then(function (data) {
        $scope.courses = data;
      });
    });

    $scope.enableEditMode = function (course) {
      $scope.edit[course.$id] = true;
    };

    $scope.discard = function (course) {
      $scope.edit[course.$id] = false;
    };

    $scope.updateUserCourse = function (courseId, newCourseObj) {
      Course.updateUserCourse($scope.user.uid, courseId, newCourseObj).then(function () {
        console.log('Course saved');
        $scope.edit[courseId] = false;
      });
    };
  });
