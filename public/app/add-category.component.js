(function(){
    "use strict";

    var module = angular.module("lostProperty");

    module.component("addCategory", {
        templateUrl: "/app/add-category.component.html",
        controllerAs: 'model',
        controller: function($http, $rootRouter){
            var model = this;

            model.saveCategory = function(){
            console.log('tom');
                
                $http.post(
                    "/category",
                    model
                ).then(
                    function successCallback(response) {
                        console.log('response', response.data);
                        if(response.data.status == 'ok'){
                            $rootRouter.navigate(['ListCategories']);
                        }else{

                        }
                       
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                    
            }       

        }
    });
}());