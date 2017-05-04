(function(){
    "use strict";

    var module = angular.module("lostProperty");

    module.component('login', {
        templateUrl: '/app/login.component.html',
        controllerAs: 'model',
        controller: function($http, authentication, toaster){
            var model = this;

            model.credentials = {
                email : "",
                password : ""
            };

            model.login = function () {
                model.credentials.email=model.email;
                model.credentials.password=model.password;
                
                authentication
                .login(model.credentials)
                .then(
                    function(data){
                        if(data.token){
                            $rootRouter.navigate(['Home']);
                            toaster.pop('success', "Result", 'Login Successful');
                        }else if (data.errorMessage){
                            toaster.pop('error', "Result", data.errorMessage);
                        }    
                });
            };
     
        }

    });
}());