var myApp = angular.module('reviewApp', ['pascalprecht.translate','ui.bootstrap']);


myApp.config(function ($translateProvider) {
	$translateProvider.translations('en', {
		'Nickname': 'Nickname',
		'Review': 'Review',
		'Character limit': 'Character Limit',
		'Submit': 'Submit'

	});
	$translateProvider.translations('fr', {
		'Nickname': 'surnom',
		'Review': 'La revue',
		'Character limit': 'Limite de caractères',
		'Submit': 'Soumettre'

	});
	$translateProvider.preferredLanguage('en');

});


myApp.controller('MyController', function ($scope, $translate) {
	$scope.reviews = []
	$scope.pageSize = 2;
	$scope.currentPage = 1;
	
	$scope.hidden = true;
	$scope.changeLanguage = function (key) { // taken from https://angular-translate.github.io 
		$translate.use(key);
		$scope.hidden = false;
	};
	

	for (item in localStorage) {
		// Parse the JSON string and add to to contacts array
		var newItem = JSON.parse(localStorage[item]);
		$scope.reviews.push(newItem);
	}
      
	
	$scope.submit = function (name, review) {

		$scope.show = true; // learned from http://fiddle.jshell.net/w7cyhnzf/8/?utm_source=website&utm_medium=embed&utm_campaign=w7cyhnzf
		$scope.time = new Date();

		var reviewsToPush = {
			name: name,
			review: review,
			time: $scope.time
		};

		localStorage.setItem(name, JSON.stringify(reviewsToPush));

		$scope.reviews.push(reviewsToPush);

		console.log($scope.reviews);
		console.log(reviewsToPush);

	}
});

myApp.filter('start', function () {
        return function (input, start) {
            if (!input || !input.length) { return; }
            start = +start;
            return input.slice(start);
		}
});