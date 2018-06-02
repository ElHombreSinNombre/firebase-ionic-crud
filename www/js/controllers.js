angular.module('angularfirebase.crud')

    .run(function ($rootScope, $state) {
        //Logout
        $rootScope.logout = function () {
            firebase.auth().signOut().then(function () {
                $state.go("login");
            });
        };
    })

    .controller('usersController', function ($scope, $firebaseObject, $ionicPopup, $timeout, $firebaseArray, $filter) {
        $scope.icon = "ion-person max";
        var users = root.ref('/users/');
        //Pagination
        $scope.currentPage = 0;
        $scope.pageSize = 1;
        $scope.all = $firebaseArray(users);
        $scope.paginate = function (paginate) {
            $scope.currentPage += (paginate);
            return $filter('startTo')($scope.all, $scope.currentPage)
        }
        $scope.numberOfPages = function () {
            return Math.ceil($scope.all.length / $scope.pageSize);
        }

        //Show Alls
        users.on("value", function (snapshot) {
            $scope.users = snapshot.val();
            $timeout(function () {
                $scope.$apply();
            })
        });

        //Remove
        $scope.removeUser = function (id) {
            var user = $firebaseObject(users.child(id));
            var confirm = $ionicPopup.confirm({
                title: '<div><i class="ion-close-circled"></i><div><h2>¿Are you sure?</h2></div>',
                subTitle: '<h4>The user will be deleted.</h4>',
            });
            confirm.then(function (response) {
                if (response) {
                    $scope.currentPage = 0;
                    user.$remove(id);
                }
            });
        }
    })

    //Create
    .controller('createController', function ($scope, $firebaseArray, $ionicPopup) {
        $scope.title = "New user"
        $scope.button = "Create";
        $scope.icon = "ion-person-add max";
        var newUser = $firebaseArray(root.ref('/users/'));
        $scope.user = {};
        $scope.submit = function () {
            var data = {
                name: $scope.user.name,
                phone: $scope.user.phone,
                email: $scope.user.email,
                username: $scope.user.username,
                city: $scope.user.city,
                lat: $scope.user.lat,
                lng: $scope.user.lng,
                street: $scope.user.street,
                suite: $scope.user.suite,
                website: $scope.user.website,
                zipcode: $scope.user.zipcode,
            }
            newUser.$add(data).then(function (response) {
                if (response) {
                    $ionicPopup.alert({
                        title: '<div><i class="ion-checkmark-circled"></i></div>',
                        subTitle: '<h4>The user <b>' + data.name + '</b> is added.</h4>',
                    });
                }
            }).catch(function (error) {
                $ionicPopup.alert({
                    title: '<div><i class="ion-information-circled"></i></div>',
                    subTitle: '<h4>All fields are required.</h4>',
                    buttons: [{
                        text: 'Retry'
                    }]
                });
            });
            $scope.user = null;
        };
    })

    //Edit
    .controller('editController', function ($scope, $location, $ionicPopup, $stateParams, $firebaseObject) {
        $scope.title = "Edit user"
        $scope.button = "Edit";
        $scope.icon = "ion-gear-a max";
        var ref = root.ref('/users/' + $stateParams.id);
        $scope.user = $firebaseObject(ref);
        $scope.submit = function () {
            $scope.user.$save($scope.user).then(function (response) {
                if (response) {
                    $ionicPopup.alert({
                        title: '<div><i class="ion-checkmark-circled"></i></div>',
                        subTitle: '<h4>The user <b>' + $scope.user.name + '</b> is changed.</h4>',
                    });
                }
            }).catch(function (error) {
                $ionicPopup.alert({
                    title: '<div><i class="ion-information-circled"></i></div>',
                    subTitle: '<h4>All fields are required.</h4>',
                    buttons: [{
                        text: 'Retry'
                    }]
                });
            });
            $location.path("/users/users");
        }
    })

    //Login
    .controller('loginController', function ($scope, $state, $ionicPopup) {
        $scope.login = {};
        $scope.submit = function () {
            firebase.auth().signInWithEmailAndPassword($scope.login.email, $scope.login.password).then(function () {
                $state.go("users.users");
            }).catch(function (error) {
                $ionicPopup.alert({
                    title: '<div><i class="ion-close-circled"></i><div><h2>Incorrect</h2></div>',
                    subTitle: '<h4>Enter a valid <b>email</b> and <b>password</b>.<h4>',
                    buttons: [{
                        text: 'Retry'
                    }]
                });
            });
        }
    });