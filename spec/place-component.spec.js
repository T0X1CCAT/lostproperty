// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('place item tests', function() {
  
  var $componentController;
  var authentication;
  var $httpBackend;
  var toaster;
  var ctrl;

  // Before each test load our api.users module
  beforeEach(module('lostProperty'));

  beforeEach(inject(function(_$componentController_, _$httpBackend_, _toaster_, _authentication_ ) {
    $componentController = _$componentController_;
    authentication = _authentication_;
    toaster=_toaster_;

    $httpBackend = _$httpBackend_;
    spyOn(authentication, 'getToken').and.returnValue('token');
    spyOn(toaster,'pop').and.callThrough();
    ctrl = $componentController('place',null);
    
  }));

  it('toaster should receive call on delete item', function(){
     
    ctrl.deleteItem();

    expect(toaster.pop).toHaveBeenCalledWith('warning', "Hi ", "{template: 'confirmDeleteTmpl.html', data: 'MyData'}", 15000, 'templateWithData');
  });  
 

 it('delete confirmed should result in correct buttons being shown', function(){
    
    $httpBackend.whenPOST('/api/deleteItem?id=9').respond(200, {status:'ok'});        
    

    ctrl._id=9;
    ctrl.deleteItemConfirmed();
    $httpBackend.flush();
    expect(ctrl.showFoundButton).toBe(false);
    expect(ctrl.showUpdateButton).toBe(false);
    expect(ctrl.showDeleteButton).toBe(false);
    expect(toaster.pop).toHaveBeenCalledWith('success', "Result", 'Item has been deleted.');

 });


 it('should show correct buttons after item has been located', function(){
 
    $httpBackend.whenPOST('/api/itemLocated?id=9').respond(200, {status:'ok'});        
    

    ctrl._id=9;
    ctrl.itemLocated();
    $httpBackend.flush();
    expect(ctrl.showFoundButton).toBe(false);
    expect(ctrl.located).toBe(true);
    expect(toaster.pop).toHaveBeenCalledWith('success', "Result", 'Item successfully marked as having been found.');    
 });

 it('should show correct buttons after new item has been saved', function(){
 
    $httpBackend.whenPOST('/api/place').respond(200, {status:'ok'});        
    
    ctrl.saveItem();
    $httpBackend.flush();
    expect(ctrl.showFoundButton).toBe(true);
    expect(ctrl.showUpdateButton).toBe(true);
    expect(ctrl.showDeleteButton).toBe(true);
    expect(toaster.pop).toHaveBeenCalledWith('success', "Result", 'Item Saved.');    
 });

 it('should show correct buttons after item has been updated', function(){
 
    $httpBackend.whenPOST('/api/updateItem').respond(200, {status:'ok'});        
    
    ctrl.updateItem();
    $httpBackend.flush();

    expect(toaster.pop).toHaveBeenCalledWith('success', "Result", 'Item Updated.');    
 });

it('should load categories on init', function(){
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
    
    ctrl.$onInit();
    $httpBackend.flush();
    expect(ctrl.categories.length).toBe(13);
});

it('should set correct model and buttons on routerOnActivate lifecycle hook', function(){

    var itemDate = new Date();
    var params = {_id: 9,
                    itemDate: itemDate,
                    itemLocation: 'school hall',
                    itemDescription: 'iphone version 6 silver',
                    itemLostOrFound: 'lost',
                    itemName: 'iphone',
                    itemTime: '2017-05-30T11:36:36.314Z',
                    itemCategory: '',
                    located: false};
    $httpBackend.whenGET('/api/place?id=9').respond(200, params);        
    
    ctrl.$routerOnActivate({params:{id:9}});

    $httpBackend.flush();

    expect(ctrl._id).toBe(9);
    //expect(ctrl.itemDate).toBe(itemDate);
    expect(ctrl.itemLocation).toBe('school hall');
    expect(ctrl.itemDescription).toBe('iphone version 6 silver');
    expect(ctrl.itemLostOrFound).toBe('lost');
    expect(ctrl.itemName).toBe('iphone');
    expect(ctrl.itemTime).toBe('2017-05-30T11:36:36.314Z');
    expect(ctrl.located).toBe(false);
    expect(ctrl.showUpdateButton).toBe(true);
    expect(ctrl.showDeleteButton).toBe(true);

 });

});