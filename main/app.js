'use strict';
(function() {
    angular
        .module("pokerPlanner", [
            'ui.router', 'ngMessages', 'restangular', 'ngCookies', 'angularjsToast', 'ngMaterial'
        ])
        .run((
            $rootScope, $state, $cookies, $transitions, Restangular, APP_CONSTANTS
        ) => {

            const user = JSON.parse($cookies.get('user') || ("{}"));
            $rootScope.user = user;
            const token = user ?.token;
            $rootScope.isAuth = token;

            /**
             * Executes before every transition
             */
            $transitions.onBefore ({ to: "*" }, function (transition) {
                if (!APP_CONSTANTS.ROUTES.PUBLIC_ROUTES.find((route) => route === transition.to().name)) {
                    if ($rootScope.isAuth) {
                        if (APP_CONSTANTS.ROUTES.UNAUTH_ROUTES.find((route) => route === transition.to().name)) {
                            return transition.router.stateService.target('pokerboard');
                        }
                    } else {
                        if (APP_CONSTANTS.ROUTES.AUTH_ROUTES.find((route) => route === transition.to().name)) {
                            return transition.router.stateService.target('login');
                        }  
                    }
                }
            });

            /**
             * Executes at the time of request
             */
            Restangular.setFullRequestInterceptor ((element, operation, route, url, headers, params, httpConfig) => {
                $rootScope.loading = true;
                const authToken = JSON.parse($cookies.get('user') || ("{}")).token
                if (authToken) {
                    headers.Authorization = `Token ${authToken}`;
                    $rootScope.isAuth = authToken;
                } else {
                    const currentUrl = $state.current.name;
                    $rootScope.isAuth = "";
                    if (!(['login', 'signup'].includes(currentUrl))) {
                        $state.go('login');
                    }
                }
                return { element, params, headers, httpConfig };
            });

            /**
             * Executes if successful response is received
             */
            Restangular.addResponseInterceptor ((data, operation, what, url, response, deferred) => {
                $rootScope.loading = false;
                return data;
            });

            /**
             * Executes if error is received
             */
            Restangular.setErrorInterceptor (response => {
                $rootScope.loading = false;
                const key = response.status;
                $state.go(APP_CONSTANTS.ERROR_ROUTES[key]);
                // Stop the promise chain.
                return true;
            });
        });
})();
