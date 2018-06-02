angular.module('angularfirebase.crud', [])
    .filter('startTo', function () {
        return function (all, limit) {
            limit = +limit;
            return all.slice(limit);
        }
    })