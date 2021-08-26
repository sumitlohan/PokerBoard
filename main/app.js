'use strict';
(function () {
    angular
        .module("pokerPlanner", [
            'ui.router', 'ngMessages', 'restangular', 'ngCookies'
        ])
        .run((
            $rootScope, $state, $cookies, $transitions, Restangular
        ) => {

            const user = JSON.parse($cookies.get('user') || ("{}"));
            const token = user?.token; 

            if(token)   $rootScope.isAuth = true;
            else    $rootScope.isAuth = false;

            //access whether user is authenticated or not
            const publicRoutes = ['404-page-not-found', '500-internal-server-error'];

            //acess only when user is not authenticated
            const unauthRoutes = ['login', 'signup'];

            //access only when user is authenticated
            const authRoutes = ['pokerboard'];

            $transitions.onBefore({ to: "*" }, function (transition) {
                const curUrl = transition.from().name;
                // console.log(curUrl);
                if (!publicRoutes.find((route) => route === transition.to().name)) {
                    if($rootScope.isAuth) {
                        if(unauthRoutes.find((route) => route === transition.to().name))
                            return transition.router.stateService.target(curUrl);
                    } else {
                        if(authRoutes.find((route) => route === transition.to().name))
                            return transition.router.stateService.target('login');
                        else if(!unauthRoutes.find((route) => route === transition.to().name))
                            return transition.router.stateService.target('404-page-not-found');
                    }
                }
            });
            
            
            Restangular.setFullRequestInterceptor(( 
                element, operation, route, url, headers, params, httpConfig
            ) => {
                
                if(token) {
                    headers.Authorization = `Token ${token}`;
                    $rootScope.isAuth = true;
                }
                else {
                    const current_url = $state.current.name;
                    $rootScope.isAuth = false;
                    if(current_url !== 'login' && current_url !== 'signup') {
                        $state.go('login');
                    }
                }
                return { element, params, headers, httpConfig };
            });

            Restangular.addResponseInterceptor((
                data, operation, what, url, response, deferred
            ) => {
                const current_url = $state.current.name;
                return data;
            });
        
            Restangular.setErrorInterceptor(response => {
                const current_url = $state.current.name;
                if(response.status === 401) {
                    if(current_url !== 'login' && current_url !== 'signup')
                        $state.go('login');
                } else if(response.status === 404) {
                    $state.go('404-page-not-found');
                } else if(response.status === 500) {
                    $state.go('500-internal-server-error');
                }
                // Stop the promise chain.
                return true;
            });
        });
})();
