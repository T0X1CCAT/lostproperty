(function () {
    "use strict";
  angular
    .module('lostProperty')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['lostproperty-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['lostproperty-token'];
    };

    var logout = function() {
      $window.localStorage.removeItem('lostproperty-token');
    };

    var register = function(user) {
        return $http.post('/api/register', user)
            .then(function(response){
                if(response.data.token){
                    saveToken(response.data.token);
                }
                return response.data;    
        });
    };

    var login = function(user) {
        return $http.post('/api/login', user)
            .then(
           function(response){
                if(response.data.token){
                    saveToken(response.data.token);
                }
                return response.data;    
 
            }, 
            function (errorResponse){
                if (errorResponse.status=='401'){
                    return {"errorMessage": "User or Password incorrect"};
                }else{
                    return {"errorMessage": "System error occured"};
                }    
            });
    };

    var isLoggedIn = function(){
        var token = getToken();

        var payload;

        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };
    
    var currentUser = function() {
        if(isLoggedIn()){
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email : payload.email,
                name : payload.name,
                admin: payload.admin
            };
        }
    };

    return {
      isLoggedIn: isLoggedIn,  
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
      register: register,
      login : login,
      logout: logout,
      currentUser: currentUser
    };
  }

}());