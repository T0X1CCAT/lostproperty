(function(){

    "use strict";

    var module = angular.module('lostProperty');
    module.component("place", {
        templateUrl: '/app/place.component.html',
        controllerAs: 'model',
        controller: function($http){
            var model = this;

            model.categories = [];

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

            this.$onInit = function () {
                model.loadCategories();
            };

        }
    });

}());