'use strict';
(function () {
    /*Controller for creating games*/
    angular.module('pokerPlanner').controller('createGameCtrl', [
        '$scope', '$rootScope', '$state', '$cookies', 'createGameService', '$mdToast', 'APP_CONSTANTS', '$window',
        function (
            $scope, $rootScope, $state, $cookies, createGameService, $mdToast, APP_CONSTANTS, $window
        ) {
            const init = function () {
                /* Initializing function */
                createGameService.getSuggestions().then(response => {
                    /* Import porjects and sprints from JIRA */
                    $scope.projectList = [];
                    $scope.sprintList = [];
                    response.projects.forEach(parseProjects);
                    response.sprints.forEach(parseSprints);
                    function parseProjects(ele) {
                        $scope.projectList.push({
                            label: ele.displayName,
                            id: ele.value,
                        });
                    }
                    function parseSprints(ele) {
                        $scope.sprintList.push({
                            label: ele.name,
                            id: ele.id,
                        });
                    }
                });
            }
            
            init();

            $scope.getSelectedProjects = function () {
                /* Get the list of selected projects from the options */
                if ($scope.selectedProjects == undefined || $scope.selectedProjects.length == 0) {
                    $scope.ticketList = [];
                    return;
                }
                /* Setting sprint to empty if user selects projects */
                $scope.selectedSprint = [];
                var proj = '';
                for (let i = 0; i < $scope.selectedProjects.length; i++) {
                    proj += $scope.selectedProjects[i].id;
                    if (i != $scope.selectedProjects.length - 1) proj += ',';
                }
                const query = "project IN (" + proj + ")";
                showTickets(query);
            };

            function showTickets(query) {
                /* Show the list of JIRA tickets from selected projects/sprint/JQL */
                createGameService.getTickets('?jql=' + query).then(response => {
                    $scope.ticketList = [];
                    response.issues.forEach(parseTickets);
                    function parseTickets(ele) {
                        $scope.ticketList.push({
                            id: ele.id,
                            key: ele.key,
                            summary: ele.fields.summary,
                        });
                    }
                    $scope.jqlCustomQuery = query;
                    /* Hiding the validation error if tickets have been imported */
                    if ($scope.ticketList != undefined && $scope.ticketList.length > 0) {
                        $scope.ticketErrorMsg = undefined;
                    }
                }, error => {
                    $scope.ticketList = []
                    $mdToast.show($mdToast.simple().textContent(APP_CONSTANTS.ERROR_MESSAGES.INVALID_JQL));
                });
            };

            $scope.executeCustomQuery = function () {
                /* Get the JQL written in the query box */
                /* Setting both pre-selected projects/sprint to empty if user executes custom JQL query */
                $scope.selectedSprint = [];
                $scope.selectedProjects = [];
                showTickets($scope.jqlCustomQuery)
            };

            $scope.removeTicket = function (ticket) {
                /* Remove the particular ticket from the list */
                var i = $scope.ticketList.length;
                while (i--) {
                    if ($scope.ticketList[i] && $scope.ticketList[i] === ticket) {
                        $scope.ticketList.splice(i, 1);
                    }
                }
            };

            /* Setting default deck type */
            $scope.selectedType = "FIBONACCI";

            $scope.getSelectedSprint = function () {
                /* Get the selected sprint from the options */
                /* Setting pre-selected projects(if any) to empty if user selects sprint */
                $scope.selectedProjects = [];
                const query = "sprint IN (" + $scope.selectedSprint.id + ")";
                showTickets(query);
            };

            $scope.submit = function () {
                /* Creating the game from desired data */
                const finalizedTickets = [];
                if ($scope.ticketList == undefined) {
                    $scope.ticketErrorMsg = APP_CONSTANTS.ERROR_MESSAGES.ATLEAST_TICKET;
                    return;
                } else {
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
                    /*
                    TODO: Goto estimation page
                    */
                }, error => {
                    if ('title' in error.data) {
                        $scope.nameErrorMsg = error.data.title[0];
                        $window.scrollTo(0, 0);
                    } else {
                        $scope.nameErrorMsg = undefined;
                    }
                });
            };
        }
    ]);
})()
