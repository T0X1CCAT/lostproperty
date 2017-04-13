(function(){
    "use strict";

    var module = angular.module("lostproperty");

    module.component('listCategories', {
        templateUrl: '/app/list-categories.component.html',
        controllerAs: 'model',
        controller: function($http){
            var model = this;

            model.listCategories = function(){
                
            }
        }

    });
}());