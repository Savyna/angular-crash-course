app.factory('Quiz', function() {
	var data = [
				{ q: 'Are you ready?', a : 'yes' },
				{ q: '1 + 1?', a : '2' }
			];

	return {
		getData : function() {
			return data;
		}
	}
});

app.factory('storageService', function($rootScope) {

	function storageSupported() {
		try {

			return 'localStorage' in window && window['localStorage'] !== null;
		}catch (e) {

			console.log(e);
			return false;
		}
	}

	if ( storageSupported() ){
		return {
			get : function (key) {
				return localStorage.getItem(key);
			},
			save: function(key, data) {
				localStorage.setItem(key, data);
			},
			remove: function(key) {
				localStorage.removeItem(key);
			}
		}
	}
});