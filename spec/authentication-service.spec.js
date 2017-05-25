// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('authentication tests', function() {
  
  var authentication;
  var httpBackend;
  var credentials;
  var $window;
  var jwt_toekn;

  // Before each test load our api.users module
  beforeEach(module('lostProperty'));

  beforeEach(inject(function(authentication, $httpBackend,_$window_) {
    auth = authentication;
    httpBackend = $httpBackend;
    $window = _$window_;

    jwt_toekn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTIyZGFmMWViYzAzYjNjZDRkMzliZDMiLCJlbWFpbCI6InRoYW5lbEBlbWFpbC5jb20iLCJuYW1lIjoiVG9tIEhhbmVsIiwiYWRtaW4iOmZhbHNlLCJleHAiOjE0OTU0NjAwOTgsImlhdCI6MTQ5NTQ1NjQ5OH0.v0w-y4-ETuJIKLn67wgm7POVlDMiLRwNLNMhIFIPrjQ';
    credentials = {
                    name: 'Tom Hanel',
                    email: 'thanel@email.com',
                    password: 'Tom'
                };
    
    httpBackend.when('POST', '/api/register', credentials)
                            .respond({token: jwt_toekn});

                            

    window.localStorageMockSpy.setup($window);                        

  }));

  it('should exist', function() {
    expect(auth).toBeDefined();
  });

  it('should on register save token to local storage', function(){
  	auth.register(credentials);
  	httpBackend.flush();
  	expect($window.localStorage.setItem).toHaveBeenCalledWith('lostproperty-token',jwt_toekn);


  });

  it('should on login save token to local storage', function(){
  	httpBackend.when('POST', '/api/login', credentials)
                            .respond({token: jwt_toekn});
  	auth.login(credentials);
  	httpBackend.flush();
  	expect($window.localStorage.setItem).toHaveBeenCalledWith('lostproperty-token',jwt_toekn);


  });

   it('should return error message when incorrect credentials supplied to login', function(){
	httpBackend.expectPOST('/api/login').respond(401, {});

  	var response = auth.login(credentials);
  	httpBackend.flush();

  	expect(response.$$state.value.errorMessage).toBe("User or Password incorrect");


  });

  it('logout should remove localstorage token', function(){
  	httpBackend.when('POST', '/api/login', credentials)
                            .respond({token: jwt_toekn});
  	auth.login(credentials);
  	httpBackend.flush();

  	auth.logout();
	expect($window.localStorage.removeItem).toHaveBeenCalledWith('lostproperty-token');
  });		

  // it('currentUser should return the current user', function(){
  // 	httpBackend.when('POST', '/api/login', credentials)
  //                           .respond({token: jwt_toekn});
  // 	auth.login(credentials);
  // 	httpBackend.flush();
  // 	var user = auth.currentUser();
  // 	expect(user.email).toBe('thanel@redletra.com');

  // });


});