(function(){
    "use strict";
    var module = angular.module("lostProperty");

    module.component('register', {
        templateUrl: '/app/register.component.html',
        controllerAs: 'model',
        controller: ['$http', 'authentication', '$rootRouter', 'toaster', function($http, authentication,$rootRouter, toaster){
            var model = this;
            
            model.register = function($http){
                
                var credentials = {
                    name: model.name,
                    email: model.email,
                    password: model.password
                };
                authentication
                    .register(credentials)
                    .then(function(data){
                        if(data.token){
                            $rootRouter.navigate(['Home']);
                            toaster.pop('success', "Result", 'Registration Successful');
                        }else if (data.errorMessage){
                            toaster.pop('error', "Result", data.errorMessage);
                        }    
                    });
            }
     
        }]

    });
}());