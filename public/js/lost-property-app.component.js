(function(){
    "use strict";

    var module = angular.module("lostProperty");

    module.component("lostPropertyApp", {
        templateUrl:"/js/lost-property-app.component.html",
        $routeConfig: [
            {path:"/find", component:"find", name: "Find"},
            {path:"/about", component:"appAbout", name:"About"},
            {path:"/add", component:"add", name:"Add"},
            {path:"/detail/:id/...", component: "movieDetails", name:"Details"},
            {path:"/**", redirectTo: ["Find"]}
        ]
    });
}());