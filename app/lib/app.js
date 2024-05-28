let myCharacterApp = angular.module('myCharacterApp', ['ngRoute', 'ngAnimate']); 

myCharacterApp.config(['$routeProvider', function($routeProvider){
    
    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'CharacterController'
    })
    .when('/directory', {
        templateUrl: 'views/directory.html',
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

//executes before running
myCharacterApp.config(function(){

});

//executes when running
myCharacterApp.run(function(){

});

myCharacterApp.directive('randomCharacter', [function(){
    return{
        restrict: 'E', //A: attribute, E: element, C: classes, M: comments, can do something like EA
        scope: {
            characters: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope){
            $scope.random = Math.floor(Math.random() * 4);
        }
    };
}]);

//manages specific controller
myCharacterApp.controller('CharacterController', ['$scope', '$http', function($scope, $http){  //always somethingController

    $scope.addCharacter = function(){
        if ($scope.newcharacter.name !== "" && !isNaN($scope.newcharacter.age) && $scope.newcharacter.color !== "" && !isNaN($scope.newcharacter.rank))
        $scope.characters.push({
            name: $scope.newcharacter.name,
            age: parseInt($scope.newcharacter.rank),
            color: $scope.newcharacter.color,
            rank: parseInt($scope.newcharacter.rank),
            
        });
    
        $scope.newcharacter.name = "";
        $scope.newcharacter.age = "";
        $scope.newcharacter.color = "";
        $scope.newcharacter.rank = "";
    };


    $scope.removeAll = function(){
        $scope.characters = [];
    }

    $scope.removeCharacter = function(character){
        let removedCharacter = $scope.characters.indexOf(character);
        $scope.characters.splice(removedCharacter, 1);
    };

    $http.get('data/characters.json').then(function(response){
        $scope.characters = response.data;
    });
    
}]); 

myCharacterApp.controller('ContactController', ['$scope', '$location','$rootScope', function($scope, $location, $rootScope){
    $scope.contact = {};
    $scope.sendMessage = function(){
        $rootScope.contactData = angular.copy($scope.contact);
        $location.path('/contact-success');
    };
}]);