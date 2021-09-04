'use strict';
(function () {
    /**
     * Checks if the input field is empty 
     */
    angular.module('pokerPlanner').directive('errorMsg', () => {
        var linker = (scope, el, attrs) => {
            var ele = document.querySelector('[ng-model=' + attrs.inputField + ']');
            ele.onfocus = () => {
                scope.$watch("inputField", () => {
                    scope.value = scope.inputField ? "" : ele.name + " is required";
                });
            };
        };
        return {
            scope: {
                inputField: '=inputField',
            },
            templateUrl: 'directives/errorMsg/errorMsg.html',
            link: linker
        };
    });
})();
