(function(){

    "use strict";

    var module = angular.module('lostProperty');
    module.component("place", {
        templateUrl: '/app/place.component.html',
        controllerAs: 'model',
        controller: function($http, toaster){
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
                    "/category"
                ).then(
                    function successCallback(response) {
                        console.log('bla', response);
                        model.categories = response.data;
                                               
                    }, 
                    function errorCallback(response) {
                        console.log('bla2');
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            };
            model.saveItem = function(){
            console.log('save Item');
                
                $http.post(
                    "/item",
                    model
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

        }
    });

}());