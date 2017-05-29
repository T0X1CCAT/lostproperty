// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('list category tests', function() {
  
  var $componentController;
  var authentication;
  var $httpBackend;

  // Before each test load our api.users module
  beforeEach(module('lostProperty'));

  beforeEach(inject(function(_$componentController_, _$httpBackend_) {
    $componentController = _$componentController_;
    
    $httpBackend = _$httpBackend_;
    
  }));

  it('test basic list categories', function(){

    $httpBackend.whenPOST('/api/findItem').respond(200, [
                                                        {"_id":"58fd7b0369e1bf37c014d24b","itemName":"shorts","__v":0}
                                                        ]);        

    var ctrl = $componentController('find',null);    


    ctrl.search();
    $httpBackend.flush();
    
    expect(ctrl.items[0].itemName).toBe('shorts');

    //can;'t be bothered with paging - and really would be best to put paging into a service'
  });
  
 

});