'use strict';
(function () {
    /*Controller for creating games*/
    angular.module('pokerPlanner').controller('createGameCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'createGameService', '$mdToast', 'APP_CONSTANTS', '$window',
        function (
            $scope, $rootScope, $state, $cookies, createGameService, $mdToast, APP_CONSTANTS, $window
        ) {
            $rootScope.user = JSON.parse($cookies.get('user') || ('{}'));
            createGameService.getSuggestions().then(response => {
                const pList = [];
                const sList = [];
                response.projects.forEach(parsePro);
                response.sprints.forEach(parseSpr);

                function parsePro(ele) {
                    pList.push({
                        label: ele.displayName,
                        id: ele.value,
                    });
                }

                function parseSpr(ele) {
                    sList.push({
                        label: ele.name,
                        id: ele.id,
                    });
                }
                $scope.projectList = pList;
                $scope.sprintList = sList;
            }, error => {
                console.log(error);
            });

            $scope.getSelectedProjects = function () {
                $scope.selectedSprint = undefined;
                var proj = '';
                for (let i = 0; i < $scope.selectedProjects.length; i++) {
                    proj += $scope.selectedProjects[i].id;
                    if (i != $scope.selectedProjects.length - 1) proj += ',';
                }
                const query = "project IN (" + proj + ")";
                if (proj.length > 0) showTickets(query);
            };

            function showTickets(query) {
                createGameService.getTickets('?jql=' + query).then(response => {
                    const tList = [];
                    response.issues.forEach(parsePro);
                    function parsePro(ele) {
                        tList.push({
                            id: ele.id,
                            key: ele.key,
                            summary: ele.fields.summary,
                        });
                    }
                    $scope.ticketList = tList;
                    $scope.jqlCustomQuery = query;
                    if($scope.ticketList != undefined && $scope.ticketList.length > 0){
                        $scope.ticketErrorMsg = undefined;
                    }
                }, error => {
                    $scope.ticketList = []
                    $mdToast.show($mdToast.simple().textContent(APP_CONSTANTS.ERROR_MESSAGES.INVALID_JQL));
                });
            };

            

            $scope.getCustomQuery = function () {
                showTickets($scope.jqlCustomQuery)
            };

            $scope.removeTicket = function (ticket) {
                var i = $scope.ticketList.length;
                while (i--) {
                    if ($scope.ticketList[i] && $scope.ticketList[i] === ticket) {
                        $scope.ticketList.splice(i, 1);
                    }
                }
            };

            $scope.selectedType = "FIBONACCI";

            $scope.getSelectedSprint = function () {
                $scope.selectedProjects = [];
                const query = "sprint IN (" + $scope.selectedSprint.id + ")";
                showTickets(query);
            };

            $scope.submit = function () {
                const finalizedTickets = [];
                if($scope.ticketList == undefined){
                    $scope.ticketErrorMsg = APP_CONSTANTS .ERROR_MESSAGES.ATLEAST_TICKET;
                    return;
                }else{
                    $scope.ticketErrorMsg = undefined;
                }
                for (let i = 0; i < $scope.ticketList.length; i++) {
                    finalizedTickets.push($scope.ticketList[i].key);
                }
                const data = {
                    title: $scope.name,
                    description: $scope.description,
                    estimation_type: $scope.selectedType,
                    duration: $scope.duration,
                    tickets: finalizedTickets
                };
                createGameService.createGame(data).then(response => {
                    console.log(response);
                    /*
                    TODO: Goto estimation page
                    */
                }, error => {
                    console.log(error);
                    if ('title' in error.data){
                        $scope.nameErrorMsg = error.data.title[0];
                        $window.scrollTo(0, 0);
                    }else{
                        $scope.nameErrorMsg = undefined;
                    }
                });
            };
        }
    ]);
})()