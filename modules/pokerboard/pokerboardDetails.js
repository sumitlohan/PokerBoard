'use strict';
(function () {
    angular.module('pokerPlanner').controller('pokerboardDetailsCtrl', [
        '$state', '$scope', '$stateParams', 'pokerboardService', 'APP_CONSTANTS',
        function ($state, $scope, $stateParams, pokerboardService, APP_CONSTANTS) {
            
            $scope.pokerboard = {};
            const pokerboardId = $stateParams.id;
            $scope.email = "";
            $scope.emailInviteForm = true;
            $scope.showUserError = false;
            $scope.showGroupError = false;
            
            /**
             * Redirects to pokerboard's members page
             */
            $scope.goToMembers = () => {
                $state.go('pokerboard-members', {"pid": pokerboardId});
            }

            /**
             * Shows form to invite through email
             */
            $scope.showEmailForm = () => {
                $scope.emailInviteForm = true;
            }

            /**
             * Shows form to invite through group
             */
            $scope.showGroupForm = () => {
                $scope.emailInviteForm = false;
            }
            
            /**
             * Fetch details of the pokerboard
             */
            const init = () => {
                pokerboardService.getPokerboardDetails(pokerboardId).then(response => {
                    $scope.pokerboard = response;
                }, error => {
                    $state.go('404-page-not-found');
                })
            }
            init();

            /**
             * Invokes error when user is already invited
             */
            $scope.isUserError = () => {
                $scope.showUserError = ($scope.existingInvite === $scope.email);
            };

            /**
             * Invokes error when group is already invited
             */
            $scope.isGroupError = () => {
                $scope.showGroupError = ($scope.existingInvite === $scope.group);
            };

            /**
             * Invokes error when group does not exist
             */
            $scope.isError = () => {
                $scope.showError = ($scope.notExistingGroup === $scope.group);
            };

            /**
             * Invites user
             */
            $scope.inviteUser = () => {
                const user = {
                    type: ($scope.emailInviteForm) ? 1 : 2,
                    invitee: ($scope.emailInviteForm) ? $scope.email : null,
                    pokerboard: pokerboardId,
                    group_name: ($scope.emailInviteForm) ? null : $scope.group,
                    role: $scope.role
                }
                // Creates invites and checks for errors, if encountered
                pokerboardService.inviteUser(user).then(response => {
                        // User invited
                }, error => {
                    if (error.data.non_field_errors[0] === APP_CONSTANTS.ERROR_MESSAGES.USER_ALREADY_INVITED) {
                        $scope.existingInvite = $scope.email;
                        $scope.isUserError();
                    }
                    if (error.data.non_field_errors[0] === APP_CONSTANTS.ERROR_MESSAGES.GROUP_ALREADY_INVITED) {
                        $scope.existingInvite = $scope.group;
                        $scope.isGroupError();
                    }
                    if (error.data.non_field_errors[0] === APP_CONSTANTS.ERROR_MESSAGES.GROUP_DOES_NOT_EXIST) {
                        $scope.notExistingGroup = $scope.group;
                        $scope.isError();
                    }
                });
            }
        }]);
})();
