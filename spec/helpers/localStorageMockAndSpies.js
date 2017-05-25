
(function(self) {


    //helper guts goes here :)

	//data store for holding objects
	var localStore = {};

	//localStorage mock for interacting with localStore
	var fakeLocalStorage = {  
	    getItem: function (key) {
	        return localStore[key];
	    },
	    setItem: function (key, value) {
	        localStore[key] = value;
	    },
	    removeItem: function (key) {
	        delete localStore[key];
	    },
	    clear: function() {
	        localStore = {};
	    }
	}


	function setupMockLocalStorage(windowObject) {  
	    //first, check to see if the browser is phantom
	    if(windowObject.navigator && windowObject.navigator.userAgent.match(/Phantom/g)) {
	        //localStorage object being read-only, we have to spy and redirect function calls...
	        spyOn(windowObject.localStorage, 'getItem')
	            .and.callFake(fakeLocalStorage.getItem);
	        spyOn(windowObject.localStorage, 'setItem')
	            .and.callFake(fakeLocalStorage.setItem);
	        spyOn(windowObject.localStorage, 'removeItem')
	            .and.callFake(fakeLocalStorage.removeItem);
	        spyOn(windowObject.localStorage, 'clear')
	            .and.callFake(fakeLocalStorage.clear);    
	    } else {
	        //Anything other than Phantom, we can just replace the definition for windowObject.localStorage with our own custom one
	        Object.defineProperty(windowObject, 'localStorage', {value: fakeLocalStorage, writable: true});
	        //Create our spies so we can tell when functions were called, etc...
	        //using .andCallThrough() tells the spy to allow the function to go ahead and get called rather than redirecting to another function
	        spyOn(windowObject.localStorage, 'getItem')
	            .and.callThrough();
	        spyOn(windowObject.localStorage, 'setItem')
	            .and.callThrough();
	        spyOn(windowObject.localStorage, 'removeItem')
	            .and.callThrough();
	        spyOn(windowObject.localStorage, 'clear')
	            .and.callThrough();
	    }
	}

	//here's the object that actually gets exposed to be used by test fixtures
	self.localStorageMockSpy = {  
	    setup: setupMockLocalStorage
	};

    //if module.exports, then this should work with require() if needed - I've not tested this yet though :)
}(window));