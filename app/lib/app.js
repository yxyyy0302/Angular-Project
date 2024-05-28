let myCharacterApp = angular.module('myCharacterApp', ['ngRoute', 'ngAnimate']); 

myCharacterApp.config(['$routeProvider', function($routeProvider){
    
    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'CharacterController'
    })
    .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'CharacterController'
    })
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
    })
    .when('/contact-success', {
        templateUrl: 'views/contact-success.html',
        controller: 'ContactController'
    })
    .otherwise({
        redirectTo: '/home'
    });
}]);

myCharacterApp.config(function(){

});

myCharacterApp.run(function(){

});

myCharacterApp.directive('randomCharacter', [function(){
    return{
        restrict: 'EA', 
        scope: {
            characters: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope){
            $scope.random = Math.floor(Math.random() * 5);
        }
    };
}]);

myCharacterApp.controller('CharacterController', ['$scope', '$http', function($scope, $http){  

    
    $http.get('data/characters.json').then(function(response){
        $scope.characters = response.data;
    });

    $scope.addCharacter = function(){
        if ($scope.newcharacter.name !== "" && !isNaN($scope.newcharacter.age) && $scope.newcharacter.color !== "" && !isNaN($scope.newcharacter.rank))
        $scope.characters.push({
            name: $scope.newcharacter.name,
            age: parseInt($scope.newcharacter.age),
            color: $scope.newcharacter.color,
            rank: parseInt($scope.newcharacter.rank),
            
        });
    
        $scope.newcharacter.name = "";
        $scope.newcharacter.age = "";
        $scope.newcharacter.color = "";
        $scope.newcharacter.rank = "";
    };

    $scope.removeCharacter = function(character){
        let removedCharacter = $scope.characters.indexOf(character);
        $scope.characters.splice(removedCharacter, 1);
    };

    $scope.removeAll = function(){
        $scope.characters = [];
    }
    
}]); 

myCharacterApp.controller('ContactController', ['$scope', '$location','$rootScope', function($scope, $location, $rootScope){
    $scope.contact = {};
    $scope.sendMessage = function(){
        $rootScope.contactData = angular.copy($scope.contact);
        $location.path('/contact-success');
    };
}]);