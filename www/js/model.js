angular.module('angularfirebase.crud')
    .factory('userAPI', [function ($scope, $timeout, $firebaseArray, $firebaseObject, $filter, $stateParams) {
        var users = root.ref('/users/');
        return {
            list: function () {
                users.on("value", function (snapshot) {
                    $scope.users = snapshot.val();
                    $timeout(function () {
                        $scope.$apply();
                    })
                });
            },
            deleteUser: function (id) {
                var user = $firebaseObject(users.child(id));
                user.$remove(id);
            },
            createUser: function (user) {
                user.$add(user);
            },
            editUser: function (user) {
                var user = $firebaseObject(users.child($stateParams.id));
                user.$save(user);
            }
        }

    }]);