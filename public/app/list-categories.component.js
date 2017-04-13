(function(){
    "use strict";

    var module = angular.module("lostProperty");

    module.component('listCategories', {
        templateUrl: '/app/list-categories.component.html',
        controllerAs: 'model',
        controller: function($http){
            var model = this;
            model.categories = [];

            this.$onInit = function () {
                model.listCategories();
            };
            
            model.listCategories = function(){
                console.log('bla0');
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
            }
        }

    });
}());