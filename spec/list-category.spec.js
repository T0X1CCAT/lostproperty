// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('list category tests', function() {
  
  var $componentController;
  var authentication;
  var $httpBackend;

  // Before each test load our api.users module
  beforeEach(module('lostProperty'));

  beforeEach(inject(function(_$componentController_, _$httpBackend_, _authentication_) {
    $componentController = _$componentController_;
    authentication = _authentication_;
    
    $httpBackend = _$httpBackend_;
    spyOn(authentication, 'getToken').and.returnValue('token');
    
  }));

  it('test basic list categories', function(){

    $httpBackend.whenGET('/api/category').respond(200, [
                                                        {"_id":"58fd7b0369e1bf37c014d24b","name":"Bags","name_case_insensitive":"bags","__v":0},
                                                        {"_id":"58fc74e1c0015ab264f5290c","name":"Books","name_case_insensitive":"books","__v":0},
                                                        {"_id":"58fd7af369e1bf37c014d249","name":"Crayons","name_case_insensitive":"crayons","__v":0},
                                                        {"_id":"58fd7aec69e1bf37c014d248","name":"Hats","name_case_insensitive":"hats","__v":0},
                                                        {"_id":"58fd7fc969e1bf37c014d24c","name":"jeff category","name_case_insensitive":"jeff category","__v":0},
                                                        {"_id":"5916f56708456848b47e35d0","name":"Jumper","name_case_insensitive":"jumper","__v":0},
                                                        {"_id":"58fd7afd69e1bf37c014d24a","name":"Pencil Case","name_case_insensitive":"pencil case","__v":0},
                                                        {"_id":"58fc74edc0015ab264f5290d","name":"Pens","name_case_insensitive":"pens","__v":0},
                                                        {"_id":"58fc6c35c0015ab264f52909","name":"shirts","name_case_insensitive":"shirts","__v":0},
                                                        {"_id":"58fd7ae069e1bf37c014d247","name":"Shoe Laces","name_case_insensitive":"shoe laces","__v":0},
                                                        {"_id":"58fc74d9c0015ab264f5290b","name":"Shoes","name_case_insensitive":"shoes","__v":0},
                                                        {"_id":"58fc748bc0015ab264f5290a","name":"Shorts","name_case_insensitive":"shorts","__v":0},
                                                        {"_id":"58fc67edd83f84a1bc2c7672","name":"wallet","name_case_insensitive":"wallet","__v":0}]);        

    var ctrl = $componentController('listCategories',null);    


    ctrl.listCategories();
    $httpBackend.flush();
    
    expect(ctrl.categoryPages).toBe(3);
    expect(ctrl.categoryPage[1].name).toBe('Books');
    expect(ctrl.categoryPage[4].name).toBe('jeff category');
    expect(ctrl.categoryPage.length).toBe(5);
    expect(ctrl.hasNext()).toBe(true);
    expect(ctrl.hasPrevious()).toBe(false);


    ctrl.nextPage();
    expect(ctrl.categoryPages).toBe(3);
    expect(ctrl.categoryPage[0].name).toBe('Jumper');
    expect(ctrl.categoryPage[4].name).toBe('Shoe Laces');
    expect(ctrl.categoryPage.length).toBe(5);
    expect(ctrl.hasNext()).toBe(true);
    expect(ctrl.hasPrevious()).toBe(true);

    ctrl.nextPage();
    expect(ctrl.categoryPages).toBe(3);
    expect(ctrl.categoryPage[0].name).toBe('Shoes');
    expect(ctrl.categoryPage[2].name).toBe('wallet');
    expect(ctrl.categoryPage.length).toBe(3);
    expect(ctrl.hasNext()).toBe(false);
    expect(ctrl.hasPrevious()).toBe(true);

    ctrl.previousPage();
    expect(ctrl.categoryPages).toBe(3);
    expect(ctrl.categoryPage[0].name).toBe('Jumper');
    expect(ctrl.categoryPage[4].name).toBe('Shoe Laces');
    expect(ctrl.categoryPage.length).toBe(5);
    expect(ctrl.hasNext()).toBe(true);
    expect(ctrl.hasPrevious()).toBe(true);

    ctrl.previousPage();
    expect(ctrl.categoryPages).toBe(3);
    expect(ctrl.categoryPage[1].name).toBe('Books');
    expect(ctrl.categoryPage[4].name).toBe('jeff category');
    expect(ctrl.categoryPage.length).toBe(5);
    expect(ctrl.hasNext()).toBe(true);
    expect(ctrl.hasPrevious()).toBe(false);

    ctrl.gotoPage(2);
    expect(ctrl.categoryPages).toBe(3);
    expect(ctrl.categoryPage[1].name).toBe('Shorts');
    expect(ctrl.categoryPage[2].name).toBe('wallet');
    expect(ctrl.categoryPage.length).toBe(3);
    expect(ctrl.hasNext()).toBe(false);
    expect(ctrl.hasPrevious()).toBe(true);

    ctrl.gotoPage(0);
    expect(ctrl.categoryPage[1].name).toBe('Books');
    expect(ctrl.categoryPage[4].name).toBe('jeff category');
    expect(ctrl.categoryPage.length).toBe(5);
    expect(ctrl.hasNext()).toBe(true);
    expect(ctrl.hasPrevious()).toBe(false);
  });
  
 

});