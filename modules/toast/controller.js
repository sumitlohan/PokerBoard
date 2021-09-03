'use strict';
(function() {
    angular.module('pokerPlanner').controller('toastCtrl', ['toast', '$rootScope',
        function (toast, $rootScope) {
            
            if($rootScope.signedUp){
                toast.create ({
                    timeout: 2 * 1000,
                    message: 'Successfully signed up!',
                    className: 'alert-success',
                    dismissible: true
                });
            }
            if($rootScope.profileUpdated){
                console.log('Created');
                toast.create ({
                    timeout: 2 * 1000,
                    message: 'Profile updated successfully!',
                    className: 'alert-success',
                    dismissible: true
                });
            }
        }
    ]);
})()
