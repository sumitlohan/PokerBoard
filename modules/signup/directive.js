'use strict';
(function () {
    /**
     * Checks if password matches confirm password
     */
    angular.module('pokerPlanner').directive('matchPass', function() {
        return {
          require: 'ngModel',
          scope: {
            confirmPassword: '=matchPass'
          },
          link: function (scope, element, attributes, paramval) {
            paramval.$validators.matchPass = function(val) {
              return val == scope.confirmPassword;
            };
            scope.$watch("confirmPassword", function() {
              paramval.$validate();
            });
          }
        };
      });
})();
