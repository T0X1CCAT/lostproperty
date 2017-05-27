(function(){
    "use strict";

    var module = angular.module('lostProperty');
    module.component("place", {
        templateUrl: '/app/place.component.html',
        controllerAs: 'model',
        controller: ['$http','toaster','authentication', function($http, toaster, authentication){
            var model = this;

            model.categories = [];
            
            model.datePicker = {
                opened: false
            };    
            model.openDatePicker = function(){
                model.datePicker.opened = true;
            };    
            model.loadCategories = function(){
                 $http.get(
                    "/api/category",{
                        headers: {
                            Authorization: 'Bearer '+ authentication.getToken()
                        }
                    }    
                ).then(
                    function successCallback(response) {
                        model.categories = response.data;
                                               
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            };
            model.saveItem = function(){
            console.log('save Item');
                
                $http.post(
                    "/api/place",
                    model,{
                        headers: {
                            Authorization: 'Bearer '+ authentication.getToken()
                        }
                    }
                ).then(
                    function successCallback(response) {
                        console.log('response', response.data);
                        if(response.data.status == 'ok'){
                            toaster.pop('success', "Result", 'Item Saved.');
                            angular.element(document.getElementById('placeSubmit')).remove();
                        }
                       
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                    
            }       

            this.$onInit = function () {
                model.loadCategories();
            };

        }]
    });

}());