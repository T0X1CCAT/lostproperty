(function(){
    "use strict";
    var module = angular.module("lostProperty");

    module.component("lostPropertyApp", {
        templateUrl:"/app/lost-property-app.component.html",
        $routeConfig: [
            {path:"/find", component:"find", name: "Find"},
            {path:"/home", component:"home", name:"Home"},
            {path:"/place", component:"place", name:"Place"},
            {path:"/place/:id", component:"place", name:"EditPlace"},
            {path:"/list-categories", component:"listCategories", name:"ListCategories"},
            {path:"/add-category", component:"addCategory", name:"AddCategory"},
            {path:"/detail/:id/...", component: "movieDetails", name:"Details"},
            {path:"/login", component: "login", name:"Login"},
            {path:"/register", component: "register", name:"Register"},
            {path:"/**", redirectTo: ["Home"]}
        ],
        controllerAs:"model",
        controller: ['authentication', '$rootRouter', function(authentication, $rootRouter){
            var model = this;

            model.isLoggedIn = function(){
                if (authentication.isLoggedIn()){
                    return true;
                }else{
                    return false;
                }
            };
            model.getLoggedInUser = function(){
                return authentication.currentUser();
            };
            model.logout = function(){
                 authentication.logout();
                 $rootRouter.navigate(['Home']);
            };
            model.isAdminUser = function(){
                var loggedInUser = this.getLoggedInUser();
                if(loggedInUser != null && loggedInUser.admin ==true){
                    return true;
                }else{
                    return false;
                }
            }
        }]
    });
}());