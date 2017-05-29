
(function(){
    "use strict";
    var module = angular.module('lostProperty');
    module.component('find', {
        templateUrl: '/app/find.component.html',
        controllerAs: 'model',
        controller: ['$http', function($http){
        	var model = this;

            model.categories=[]

        	model.items =[];
        	model.itemPage;
        	model.itemPages;
        	model.pageSize = 5;

            model.datePicker = {
                opened: false
            };   
            model.openDatePicker = function(){
                model.datePicker.opened = true;
            }; 

        	model.searchModel = {
        		itemName:null,
                itemCategory:null,
        		itemDate:null
        	};
        	model.search = function(searchModel){
                $http.post(
                    "/api/findItem",{                        
                        data: model.searchModel
                    }
                ).then(
                    function successCallback(response) {
                        model.items = response.data;
                        model.itemPage = model.items.slice(0,model.items.length < model.pageSize ? model.items.length : model.pageSize);
                        model.itemPages = Math.ceil(model.items.length / model.pageSize);
                        
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
        	}

            model.loadCategories = function(){
                 $http.get(
                    "/api/category"
                        
                ).then(
                    function successCallback(response) {
                        model.categories = response.data;
                                               
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            };

            this.$onInit = function () {
                model.loadCategories();
            };    
        }]  
    });
}());
