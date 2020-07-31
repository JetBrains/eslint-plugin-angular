// example - valid: true
angular.module('myModule').factory('myService', function ($log, anotherService) {
    $log.log(anotherService.getSomeData());
});

// example - valid: false, errorMessage: "You should not use array expression for DI"
angular.module('myModule').factory('myService', ['$http', '$log', function($http, $log) {
    $http.get('/api/someData').then(function (response) {
        $log.log(response.data);
    });
}]);
