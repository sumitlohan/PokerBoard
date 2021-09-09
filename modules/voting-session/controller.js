'use strict';
(function () {
    /*Controller for voting session*/
    angular.module('pokerPlanner').controller('votingSessionCtrl', [
        '$scope', '$rootScope', '$state', 'votingSessionService', '$mdToast', 'APP_CONSTANTS', '$stateParams',
        function ($scope, $rootScope, $state, votingSessionService, $mdToast, APP_CONSTANTS, $stateParams) {
            const pokerboardId = $stateParams.id;
            var issueId = undefined;
            const setCards = type => {
                /* Setting card type */
                $scope.cardList = APP_CONSTANTS.DECK_TYPE[type];
            };

            const setIssueDetails = ticketId => {
                /* Fetching JIRA issue to be estimated */
                const query = "?jql=issue IN (" + ticketId + ")";
                issueId = ticketId;
                votingSessionService.getIssue(query).then(response => {
                    $scope.issueTitle = ticketId + ": " + response.issues[0].fields.summary;
                    $scope.issueDescription = response.issues[0].fields.description;
                    $scope.labelList = response.issues[0].fields.labels;
                }, error => {
                    $state.go('404-page-not-found');
                });
            };

            const init = () => {
                /* Initializing function */
                votingSessionService.getSession(pokerboardId).then(response => {
                    if (response.status != "IN_PROGRESS") {
                        $state.go('404-page-not-found');
                    }
                    setSocketConnection(response.id);
                    setIssueDetails(response.ticket.ticket_id);
                }, error => {
                    $state.go('404-page-not-found');
                });

                /* Fetching Pokerboard Details */
                votingSessionService.getPokerboardDetails(pokerboardId).then(response => {
                    $scope.isAdmin = response.manager.id == $rootScope.user.id;
                    $scope.duration = response.duration;
                    $scope.title = response.title;
                    $scope.description = response.description;
                    setCards(response.estimation_type);
                }, error => {
                    $state.go('404-page-not-found');
                });
            };

            init();

            $scope.postComment = () => {
                /* Posting new comment on JIRA */
                votingSessionService.postComment({ "issue": issueId, "comment": $scope.comment }).then(response => {
                    $mdToast.show($mdToast.simple().textContent(APP_CONSTANTS.SUCCESS_MESSAGES.COMMENT_ADDED));
                }, error => {
                    $mdToast.show($mdToast.simple().textContent(APP_CONSTANTS.ERROR_MESSAGES.COMMENT_POST_FAILED));
                });
            };

            $scope.voteList = [];

            $scope.startCountdown = () => {
                /* Countdown timer broadcast */
                const data = {
                    message: "Start Timer",
                    message_type: "start_timer"
                }
                $scope.websocket.send(data);
            };

            $scope.skipGame = () => {
                /* Skipping the current game */
                const data = {
                    message: "Skip game",
                    message_type: "skip"
                }
                $scope.websocket.send(data);
            };

            const setCountdown = timer => {
                /* Setting up countdown timer */
                $scope.time = 0;
                if (timer == "null") return;
                var startTime = new Date(timer);
                var now = new Date();
                $scope.timerId = setInterval(countdown, 1000);
                $scope.time = Math.round($scope.duration - (now - startTime) / 1000);
            };

            function countdown() {
                /* Countdown helper */
                if ($scope.time == 0) {
                    clearTimeout($scope.timerId);
                    console.log("Trigger Event");
                } else {
                    $scope.time--;
                }
                $scope.$apply();
            };

            const InitializeGame = data => {
                /* Initializing game after successfull connection with websocket */
                $scope.voteList = [];
                updateParticipants(data.users);
                data.votes.forEach(parseVotes);
                function parseVotes(ele) {
                    addRealTimeVotedUser(ele);
                }
                setCountdown(data.timer);
            };

            const updateParticipants = data => {
                /* Updating Participants in UI */
                $scope.participantList = [];
                data.forEach(parseUsers);
                function parseUsers(ele) {
                    var name = ele.first_name + " " + ele.last_name;
                    if (!$scope.participantList.includes(name)) $scope.participantList.push(name);
                }
            };

            const updateVote = (id, estimate) => {
                /* Updating already voted estimate of user */
                for (let i = 0; i < $scope.voteList.length; i++) {
                    if ($scope.voteList[i].id == id) {
                        $scope.voteList.splice(i, 1);
                        return;
                    }
                }
            };

            const addRealTimeVotedUser = data => {
                /* Adding user who voted to the list for UI */
                updateVote(data.user.id, data.user.estimate);
                var first_name = data.user.first_name;
                var last_name = data.user.last_name;
                if (data.user.id == $rootScope.user.id) elevateCard($scope.cardList.indexOf(data.estimate));
                $scope.voteList.push(
                    {
                        id: data.user.id,
                        name: first_name + " " + last_name,
                        estimate: data.estimate,
                        short_name: (first_name.charAt(0) + last_name.charAt(0)).toUpperCase()
                    },
                );
            };

            const onGameSkipped = () => {
                /* Navigate to estimation page */
                $state.go('pokerboard-details', {id: pokerboardId});
            };

            const setSocketConnection = sessionId => {
                /* Establishing web socket connection */
                $scope.websocket = votingSessionService.wsConnect(sessionId, $rootScope.user.token);
                $scope.websocket.send({ "message": "Member Joined", "message_type": "initialise_game" });
                $scope.websocket.onMessage(function (message) {
                    const obj = JSON.parse(message.data);
                    switch (obj.type) {
                        case "initialise_game": InitializeGame(obj);
                            break;
                        case "skip": onGameSkipped();
                            break;
                        case "vote": addRealTimeVotedUser(obj.vote);
                            break;
                        case "start_timer": setCountdown(obj.timer_started_at);
                            break;
                        case "join": 
                        case "leave": updateParticipants(obj.users);
                            break;
                    }
                });
            };

            const setUserVote = number => {
                /* Broadcast current user vote */
                const data = {
                    message: {
                        estimate: number
                    },
                    message_type: "vote"
                }
                $scope.websocket.send(data);
            };

            const elevateCard = id => {
                /* Highlighting current user's voted card */
                if ($scope.prevCard != undefined) document.getElementById("card" + $scope.prevCard).classList.remove("selected-card");
                document.getElementById("card" + id).classList.add("selected-card");
                $scope.prevCard = id;
            };

            $scope.setEstimate = function (number, id) {
                /* Card click function */
                if ($scope.prevCard == id) return;
                elevateCard(id);
                setUserVote(number);
            };
        }
    ]);
})()
