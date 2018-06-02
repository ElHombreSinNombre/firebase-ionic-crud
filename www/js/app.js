angular.module('angularfirebase', ['ionic', 'angularfirebase.crud', 'firebase', 'ngRoute'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController'

      })

      .state('users', {
        url: '/users',
        abstract: true,
        templateUrl: 'templates/menu.html',


      })


      .state('users.users', {
        url: '/users',
        views: {
          'menuContent': {
            templateUrl: 'templates/users.html',
            controller: 'usersController'
          }
        }
      })

      .state('users.create', {
        url: '/create',
        views: {
          'menuContent': {
            templateUrl: 'templates/form.html',
            controller: 'createController'
          }
        }
      })

      .state('users.edit/:id', {
        url: '/edit/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/form.html',
            controller: 'editController'
          }
        }
      })


    $urlRouterProvider.otherwise('/login');
  });