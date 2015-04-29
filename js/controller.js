app.controller('MainCtrl', function(Quiz, $scope, $timeout, $location, storageService) {
  
  $scope.quiz  = $scope.quiz || Quiz.getData();
  $scope.counter = $scope.counter || 0;

  $scope.getTotal = function() {
  	return $scope.quiz.length;
  }

  $scope.addItem = function(question, answer) {

  	if ( question && answer){
  		$scope.quiz.push({q : $scope.formQuestion, a : $scope.formAnswer});
  		$scope.formQuestion = '';
  		$scope.formAnswer 	= '';
  	}
  }

  $scope.removeLast = function() {
  	$scope.quiz.pop();
  }

  $scope.clearList = function() {
  	$scope.quiz = [];
  }

  $scope.incrementCounter = function() {
  	if ($scope.counter === $scope.getTotal() - 1) {
  		
  		$scope.counter = 0;
	} else {

		$scope.counter += 1;
	}
  }

  $scope.clearAnswer = function() {
  	$scope.userAnswer = '';
  }

  $scope.nextQuestion = function() {

  	$timeout(function() {

	  	$scope.myClass = '';
  	}, 500);

  	$scope.incrementCounter();
  	$scope.clearAnswer();
  }

  $scope.isCorrect = function(value) {
  	return value == this.quiz[this.counter].a ? true : false;
  }

  // answer for input comparison
  $scope.$watch("userAnswer", function(newValue) {
  	if($scope.isCorrect(newValue)) {

  		$scope.myClass = 'flip-add';
	  	$scope.nextQuestion();
  	}
  });

  if($location.$$path !== '/') {
  	if (document.getElementById('answer')) {
  		setTimeout(function() {
  			document.getElementById('answer').focus();
  		}, 200);
  	}
  }

  $scope.saveQuestions = function() {
  	if($scope.getTotal() > 0 ){

  		console.log('Saving...');
  		storageService.save('quiz', JSON.stringify($scope.quiz));
  	} else {
  		alert ('No quiz data found.')
  	}
  }

  $scope.loadQuestions = function() {

  	console.log('Loading...');
  	var storedQuiz = JSON.parse($scope.quiz = storageService.get('quiz'));
  	
  	if ( storedQuiz !== null && storedQuiz !== undefined ) {
  		for (var key in storedQuiz) {

  			$scope.quiz.push({q : storedQuiz[key].q, a : storedQuiz[key].a });
  		}
  	}
  }

  $scope.clearQuestions = function() {

  	console.log('Clearing...');
  	storageService.remove('quiz');
  }


});

