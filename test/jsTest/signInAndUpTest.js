// The Unit Test for the javascript 

QUnit.module( "Test Syntax of Email" );
function checkEmailSyntax(email){
    if (email != '') {
        return email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/);
    }
}

QUnit.test("systax satisfied  ", function(assert) {
	email = "abc@gmail.com"
	assert.ok(checkEmailSyntax(email), "Passed!" );
});

QUnit.test("systax not satisfied (without @) ", function(assert) {
	email = "abc"
	assert.ok(checkEmailSyntax(email)== null , "Passed!" );
});

QUnit.test("systax not satisfied (without .com) ", function(assert) {
	email = "abc@gmail"
	assert.ok(checkEmailSyntax(email)== null , "Passed!" );
});



QUnit.module( "Test Syntax of Phone" );
function checkPhoneSyntax(phone){
    if (phone  != '') {
        return phone.trim().match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
    }
}

QUnit.test("systax satisfied", function(assert) {
	phone = "123-456-7890"
	assert.ok(checkPhoneSyntax(phone), "Passed!" );
});

QUnit.test("systax unsatisfied -- without '-' ", function(assert) {
	phone = "1234567890"
	assert.ok(checkPhoneSyntax(phone) == null, "Passed!" );
});

QUnit.test("systax unsatisfied -- length of phone != 10  ", function(assert) {
	phone = "123456789"
	assert.ok(checkPhoneSyntax(phone) == null, "Passed!" );
});

// var fixture = $( "#qunit-fixture" );

// QUnit.module("form tests", {
//   beforeEach: function() {
//     fixture.html("<form class=\"validate-form\"> <div class=\"wrap-input100 validate-input m-b-18\"> <span></span><input class=\"input100\" type=\"text\" name=\"username\"> </div> </form>");
//   	// fixture.load("../../source/html/signUp.html")
//   },
//   afterEach: function() {
//     // fixture.find("form").remove();
//     // any other cleanup (events maybe?)
//   }
// });

