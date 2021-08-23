'use strict';
(function () {
    angular
        .module("pokerPlanner", [
            'ui.router', 'ngMessages', 'restangular', 'ngCookies'
        ])
        .run((
            $rootScope, $state, $cookies, Restangular
        ) => {

            const user = JSON.parse($cookies.get('user') || ("{}"));
            const token = user?.token; 
            $rootScope.user = user;
            if(token)   $rootScope.isAuth = true;
            else    $rootScope.isAuth = false;
            
            Restangular.setFullRequestInterceptor(( 
                element, operation, route, url, headers, params, httpConfig
            ) => {
                const userObj = JSON.parse($cookies.get('user') || ("{}"));
                const authToken = userObj?.token; 
                if(authToken) {
                    headers.Authorization = `Token ${authToken}`;
                    $rootScope.isAuth = true;
                }

                else {
                    const current_url = $state.current.name;
                    $rootScope.isAuth = false;
                    if(current_url !== 'login' && current_url !== 'signup') {
                        $state.go('login');
                    }
                }
                return {
                    element: element,
                    params: params,
                    headers: headers,
                    httpConfig: httpConfig,
                };
            });

            Restangular.addResponseInterceptor((
                data, operation, what, url, response, deferred
            ) => {
                const current_url = $state.current.name;
                if(current_url === 'signup') {
                    if(response.status === 200) {
                        $state.go('login');
                    }
                }
                else if(current_url === 'login') {
                    if(response.status === 200) {
                        $rootScope.isAuth = true;
                        $state.go('pokerbard');
                    }
                }
                else {
                    if(response.status === 200) {
                        $state.go('pokerbard');
                    }
                }
                return data;
            });
        
            Restangular.setErrorInterceptor(response => {
                console.log(3);
                const current_url = $state.current.name;
                if(response.status === 401) {
                    if(current_url !== 'login' && current_url !== 'signup')
                        $state.go('login');
                } else {
                    // Some other unknown Error.
                }
                // Stop the promise chain.
                return true;
            });
        });
})();
