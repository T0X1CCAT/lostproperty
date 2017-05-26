// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('login component tests', function() {
  
  var $componentController;
  var authentication;
  var httpBackend;
  var credentials;
  var rootRouter;
  var toaster;

  // Before each test load our api.users module
  beforeEach(module('lostProperty'));

  beforeEach(inject(function(_$componentController_, $httpBackend, _authentication_, _toaster_, $rootRouter) {
    $componentController = _$componentController_;
    authentication = _authentication_;
    
    httpBackend = $httpBackend;
    rootRouter = $rootRouter;
    toaster = _toaster_;
    spyOn(rootRouter, 'navigate').and.callThrough();
    spyOn(toaster, 'pop').and.callThrough();
    
  }));

  it('successful login should result in a call to the toaster service and the router navigation method', function(){

    credentials = {
                    name: 'Tom Hanel',
                    email: 'thanel@email.com',
                    password: 'Tom'
                };

    jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTIyZGFmMWViYzAzYjNjZDRkMzliZDMiLCJlbWFpbCI6InRoYW5lbEBlbWFpbC5jb20iLCJuYW1lIjoiVG9tIEhhbmVsIiwiYWRtaW4iOmZhbHNlLCJleHAiOjE0OTU0NjAwOTgsImlhdCI6MTQ5NTQ1NjQ5OH0.v0w-y4-ETuJIKLn67wgm7POVlDMiLRwNLNMhIFIPrjQ';

    httpBackend.whenPOST('/api/login').respond(200, {token: jwt_token});        

    var ctrl = $componentController('login',{$http: httpBackend, authentication: authentication, toaster: toaster, $rootRouter: rootRouter});    
    console.log('ctrl', ctrl);

    ctrl.login();
    httpBackend.flush();
    expect(toaster.pop).toHaveBeenCalledWith('success', "Result", 'Login Successful');
    expect(rootRouter.navigate).toHaveBeenCalledWith(['Home']);

  });
  
  it('failed login should result in a call to the toaster service and the router navigation method not to be called', function(){

    credentials = {
                    name: 'Tom Hanel',
                    email: 'thanel@email.com',
                    password: 'Tom'
                };

    jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTIyZGFmMWViYzAzYjNjZDRkMzliZDMiLCJlbWFpbCI6InRoYW5lbEBlbWFpbC5jb20iLCJuYW1lIjoiVG9tIEhhbmVsIiwiYWRtaW4iOmZhbHNlLCJleHAiOjE0OTU0NjAwOTgsImlhdCI6MTQ5NTQ1NjQ5OH0.v0w-y4-ETuJIKLn67wgm7POVlDMiLRwNLNMhIFIPrjQ';

    httpBackend.whenPOST('/api/login').respond(200, {errorMessage: 'incorrect credentials'});        

    var ctrl = $componentController('login',{$http: httpBackend, authentication: authentication, toaster: toaster, $rootRouter: rootRouter});    
    console.log('ctrl', ctrl);

    ctrl.login();
    httpBackend.flush();
    expect(toaster.pop).toHaveBeenCalledWith('error', "Result", 'incorrect credentials');
    expect(rootRouter.navigate).not.toHaveBeenCalledWith(['Home']);

  });

});