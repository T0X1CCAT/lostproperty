(function(){
    "use strict";

    var module = angular.module("lostProperty");

    module.component("addCategory", {
        templateUrl: "/js/add-category.component.html",
        controllerAs: 'model',
        controller: function($http){
            var model = this;

            model.saveCategory = function(){
                console.log('tom');

                $http.post({
                    method: 'GET',
                    url: '/saveCategory'
                    }).then(function successCallback(response) {
                        window.location ="/list"
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }       

        }
    });
}());