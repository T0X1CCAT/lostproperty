(function(){
    "use strict";

    var module = angular.module("lostProperty");

    module.component("addCategory", {
        templateUrl: "/app/add-category.component.html",
        controllerAs: 'model',
        controller: ['$http', '$rootRouter', 'toaster', 'authentication', function($http, $rootRouter, toaster, authentication){
            var model = this;

            model.saveCategory = function(){
            console.log('tom');
                
                $http.post(
                    "/api/category",
                    model,
                    {
                        headers: {
                            Authorization: 'Bearer '+ authentication.getToken()
                        }
                    }
                ).then(
                    function successCallback(response) {
                        console.log('response', response.data);
                        if(response.data.status == 'ok'){
                            $rootRouter.navigate(['ListCategories']);
                            toaster.pop('success', "Result", 'Category Saved.');

                        }else{
                            toaster.pop('error', "Result", 'Category already exists.');    
                        }
                       
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                    
            }       

        }]
    });
}());