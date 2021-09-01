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

            $scope.showEmailForm = () => {
                $scope.emailInviteForm = true;
            }

            $scope.showGroupForm = () => {
                $scope.emailInviteForm = false;
            }
            
            $scope.getPokerboardDetails = () => {
                pokerboardService.getPokerboardDetails(pokerboardId).then(response => {
                    $scope.pokerboard = response;
                }, error => {
                    $state.go('404-page-not-found');
                })
            }
            $scope.getPokerboardDetails();

            // pokerboardService.getTickets().then(response => {
            //     $scope.boardList = [];
            //     response.forEach(parse);
            //     function parse(ele) {
            //         $scope.boardList.push({
            //             id: ele.id,
            //             title: ele.title,
            //             state: ele.status,
            //             date: new Date(ele.created_at).toLocaleDateString(),
            //             creator: ele.manager.first_name + ele.manager.last_name,
            //         });
            //     }
            // });

            $scope.isUserError = () => {
                $scope.showUserError = ($scope.existingInvite === $scope.email);
            };

            $scope.isGroupError = () => {
                $scope.showGroupError = ($scope.existingInvite === $scope.group);
            };

            $scope.isError = () => {
                $scope.showError = ($scope.notExistingGroup === $scope.group);
            };

            /**
             * Invites user
             */
            $scope.inviteUser = () => {
                const user = {
                    invitee: ($scope.emailInviteForm) ? $scope.email : null,
                    pokerboard: pokerboardId,
                    group_name: ($scope.emailInviteForm) ? null : $scope.group,
                    role: $scope.role
                }
                pokerboardService.inviteUser(user).then(response => {
                    // $scope.pokerboard.invites = [...$scope.pokerboard.invites, {user: response.user}]
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
