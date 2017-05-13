(function(){

    "use strict";
    var module = angular.module("lostProperty");

    module.component('listCategories', {
        templateUrl: '/app/list-categories.component.html',
        controllerAs: 'model',
        controller: ['$http', 'authentication', function($http, authentication){
            var model = this;
            model.categories = [];
            model.pageSize = 5;
            model.currentPage =0;
            model.categoryPage = [];
            model.categoryPages = 0;

            model.nextPage = function(){
                if(model.hasNext()){
                    var newStartPosition = (model.currentPage+1)*model.pageSize;
                    var newEndPosition = ((model.currentPage+2)*model.pageSize) > model.categories.length ? model.categories.length : (((model.currentPage+2)*model.pageSize));
                    model.categoryPage = model.categories.slice(newStartPosition, newEndPosition);
                    model.currentPage +=1;
                }    
            };
            
            model.previousPage = function(){
                if(model.hasPrevious()){
                    var newStartPosition = null;
                    var newEndPosition = null;
                    if(model.currentPage == 1){
                        newStartPosition = 0;    
                        newEndPosition = model.currentPage * model.pageSize;
                    }else{
                        newStartPosition = (model.currentPage-1)*model.pageSize;
                        newEndPosition = model.currentPage*model.pageSize;
                    }
                    model.categoryPage = model.categories.slice(newStartPosition, newEndPosition);
                    model.currentPage -=1;
                }     
            };

            model.gotoPage = function(pageNumber){
                var newStartPosition = pageNumber*model.pageSize;
                var newEndPosition = ((pageNumber+1)*model.pageSize);
                model.categoryPage = model.categories.slice(newStartPosition, newEndPosition);
                model.currentPage = pageNumber;
            
            };
            
            model.hasNext = function(){
                return  (model.currentPage+1)*model.pageSize < model.categories.length;
            };

            model.hasPrevious = function(){
                return  (model.currentPage > 0);
            };

            model.getCategoryPages = function(){
                return new Array(model.categoryPages);
            };

            this.$onInit = function () {
                model.listCategories();
            };
            
            model.listCategories = function(){
                console.log('bla0');
                $http.get(
                    "/api/category",{
                        headers: {
                            Authorization: 'Bearer '+ authentication.getToken()
                        }
                    }
                ).then(
                    function successCallback(response) {
                        console.log('bla', response);
                        model.categories = response.data;
                        model.categoryPage = model.categories.slice(0,model.categories.length < model.pageSize ? model.categories.length : model.pageSize);
                        model.categoryPages = Math.floor(model.categories.length / model.pageSize);
                        
                    }, 
                    function errorCallback(response) {
                        console.log('bla2');
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
        }]

    });
}());