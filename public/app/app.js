(function(){
    var module = angular.module("lostProperty",["ngComponentRouter", "toaster",'ui.bootstrap','ngAnimate','ngMessages']);

    module.value("$routerRootComponent", "lostPropertyApp");
    
    function run($rootScope, $location, authentication) {
            $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
                if (!authentication.isLoggedIn()){
                    if ($location.path() === '/list-categories' ||
                        $location.path() === '/place' ||
                        $location.path() === 'add-category') {
                        $location.path('/');
                    }
                }
            });    
        }

    module.run(['$rootScope', '$location', 'authentication', run]);
    
}());
