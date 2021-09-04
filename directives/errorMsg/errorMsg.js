'use strict';
(function () {
    /**
     * Checks if the input field is empty 
     */
    angular.module('pokerPlanner').directive('errorMsg', () => {
        var linker = (scope, el, attrs) => {
            var ele = document.querySelector('[ng-model=' + attrs.field + ']');
            ele.onfocus = () => {
                scope.$watch("field", (extra) => {
                    scope.value = scope.field ? "" : "Please enter a valid " + attrs.field;
                });
            };
        };
        return {
            scope: {
                field: '=field',
            },
            templateUrl: 'directives/errorMsg/errorMsg.html',
            link: linker
        };
    });
})();
