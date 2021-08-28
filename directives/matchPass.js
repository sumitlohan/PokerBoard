'use strict';
(function () {
    /**
     * Checks if password matches confirm password
     */
    angular.module('pokerPlanner').directive('matchPass', () => {
        return {
            require: 'ngModel',
            scope: {
                confirmPassword: '=matchPass'
            },
            link: (scope, element, attributes, paramval) => {
                paramval.$validators.matchPass = val => {
                    return val == scope.confirmPassword;
                };
                scope.$watch("confirmPassword", () => {
                    paramval.$validate();
                });
            }
        };
    });
})();
