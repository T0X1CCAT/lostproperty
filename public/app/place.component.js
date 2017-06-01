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
            model.deleteItem = function(){
               // toaster.pop('error', "Confirm", "{template: 'confirmDeleteTmpl.html'}", 15000,null);
                toaster.pop('warning', "Hi ", "{template: 'confirmDeleteTmpl.html', data: 'MyData'}", 15000, 'templateWithData');
            };
            model.deleteItemConfirmed = function(){
                $http.post(
                    "/api/deleteItem?id="+model._id,
                    model,{
                        headers: {
                            Authorization: 'Bearer '+ authentication.getToken()
                        }
                    }
                ).then(
                    function successCallback(response) {
                        console.log('response', response.data);
                        if(response.data.status == 'ok'){
                            toaster.pop('success', "Result", 'Item has been deleted.');
                            angular.element(document.getElementById('deleteSubmit')).remove();
                            angular.element(document.getElementById('updateItem')).remove();
                        }
                       
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            };
            
            model.itemLocated = function(){
                $http.post(
                    "/api/itemLocated?id="+model._id,
                    model,{
                        headers: {
                            Authorization: 'Bearer '+ authentication.getToken()
                        }
                    }
                ).then(
                    function successCallback(response) {
                        console.log('response', response.data);
                        if(response.data.status == 'ok'){
                            toaster.pop('success', "Result", 'Item successfully marked as having been found.');
                            angular.element(document.getElementById('locatedSubmit')).remove();
                            model.located = true;
                        }
                       
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            };
            model.updateItem = function(){
                console.log('update Item');
                
                $http.post(
                    "/api/updateItem",
                    model,{
                        headers: {
                            Authorization: 'Bearer '+ authentication.getToken()
                        }
                    }
                ).then(
                    function successCallback(response) {
                        console.log('response', response.data);
                        if(response.data.status == 'ok'){
                            toaster.pop('success', "Result", 'Item Updated.');
                        }
                       
                    }, 
                    function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
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

            model.$onInit = function () {
                model.loadCategories();


            };

            model.$routerOnActivate = function(next) {
              // Get the id if present
              var id = next.params.id;
              if (id){
                //load up the item from the db
                $http.get(
                    "/api/place?id="+id,{
                        headers: {
                                Authorization: 'Bearer '+ authentication.getToken()
                            }
                    }
                        
                    ).then(
                        function successCallback(response) {
                            //console.log('response', response);
                            model._id = response.data._id;
                            model.itemDate = new Date(response.data.itemDate);
                            model.itemLocation = response.data.itemLocation;
                            model.itemDescription = response.data.itemDescription;
                            model.itemLostOrFound = response.data.itemLostOrFound;
                            model.itemName = response.data.itemName;
                            model.itemTime = response.data.itemTime;
                            model.itemCategory = response.data.itemCategory;
                            model.located= response.data.located;
                        }, 
                        function errorCallback(response) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });
                }
             
            }

        }]
    });

}());