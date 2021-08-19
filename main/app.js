'use strict';
(function () {
    angular.module("pokerPlanner", [
        'ui.router', 
        'ngMessages', 
        'restangular',
        'ngCookies'
    ])
    .run(function ($q, $location, $cookies, Restangular) {
        Restangular.setFullRequestInterceptor(function (
          element,
          operation,
          route,
          url,
          headers,
          params,
          httpConfig
        ) {
          const token = $cookies.get("token");
            if(token)
          headers.Authorization = `Token ${token}`;
          return {
            element: element,
            params: params,
            headers: headers,
            httpConfig: httpConfig,
          };
        });
      });;
})();
