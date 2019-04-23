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

var fixture = $( "#qunit-fixture" );
QUnit.module("form tests", {
  beforeEach: function() {
    fixture.html("<form><input id=\"username\" class=\"input100\" type=\"text\" name=\"username\"></form>");
  },
  afterEach: function() {
    fixture.find("form").remove();
    // any other cleanup (events maybe?)
  }
});

QUnit.test("test form submission", function(assert) {
  // $("form").submit();
  assert.ok( square(2) == 4 , "Passed!" );
  // maybe make sure an Ajax call was made?
  // or that there is an error on the page?
});


// QUnit.test( "showValidate", function( assert ) {
// 	$( "p" ).after( "<div class=\"wrap-input100 validate-input m-b-18\"> <input class=\"input100\">");
// 	var input = $('.input100');
// 	$(input).val("Hello World!");
//     $('.validate-form').trigger('submit')
//     var thisAlert = $(input).parent();
// 	$(thisAlert).removeClass('alert-validate');
// 	// assert.ok( $(thisAlert).hasClass( 'alert-validate') , "Passed!" );
// 	assert.ok( $(thisAlert).hasClass( 'alert-validate')== false, "Passed!" );
// });
// $( "p" ).after( "<form class=\"login100-form validate-form\"> <div class=\"wrap-input100 validate-input m-b-18\"> <input class=\"input100\" type=\"text\" name=\"username\"> </div> </form>");
// $("p").load( "../source/html/signUp.html");
/*
*     When the input contains something, the class 'alert-validate' should be hiden from user
*/

// QUnit.module( "validate-form submit with some input" );
// QUnit.test( "-- username", function( assert ) {
// 	$( "p" ).after( "<div class=\"wrap-input100 validate-input m-b-18\"> <input class=\"input100\" type=\"text\" name=\"username\"> </div>");
// 	var input = $('.input100');
// 	$(input).val("Hello World!");
// 	$(thisAlert).addClass('alert-validate');
//     $('.validate-form').trigger('submit')
//     var thisAlert = $(input).parent();
// 	assert.ok( $(thisAlert).hasClass( 'alert-validate')== false, "Passed!" );
// 	$("p").next().remove()
// });

// QUnit.test( "-- password", function( assert ) {
// 	$( "p" ).after( "<div class=\"wrap-input100 validate-input m-b-18\"> <input class=\"input100\" type=\"password\" name=\"psw\"> </div>");
// 	var input = $('.input100');
// 	$(input).val("Hello World!");
// 	$(thisAlert).addClass('alert-validate');
//     $('.validate-form').trigger('submit')
//     var thisAlert = $(input).parent();
// 	assert.ok( $(thisAlert).hasClass( 'alert-validate')== false, "Passed!" );
// 	$("p").next().remove()
// });

// QUnit.test( "-- email", function( assert ) {
// 	$( "p" ).after( "<div class=\"wrap-input100 validate-input m-b-18\"> <input class=\"input100\" type=\"email\" name=\"email\"> </div>");
// 	var input = $('.input100');
// 	$(input).val("Hello World!");
// 	$(thisAlert).addClass('alert-validate');
//     $('.validate-form').trigger('submit')
//     var thisAlert = $(input).parent();
// 	assert.ok( $(thisAlert).hasClass( 'alert-validate')== false, "Passed!" );
// 	$("p").next().remove()
// });

/*
*     When the input contains nothing, the class 'alert-validate' should be shown to user
*/




// QUnit.test( "-- password", function( assert ) {
// 	$( "p" ).after( "<div class=\"wrap-input100 validate-input m-b-18\"> <input class=\"input100\" type=\"password\" name=\"psw\"> </div>");
// 	var input2 = $('.input100');
// 	var thisAlert2 = $(input2).parent();
// 	// $(thisAlert2).addClass('alert-validate');
//     $('.validate-form').trigger('submit')
// 	assert.ok( $(thisAlert2).hasClass('alert-validate'), "Passed!" );
// 	$("p").next().remove()
// });


// QUnit.test( "-- email", function( assert ) {
// 	$( "p" ).after( "<div class=\"wrap-input100 validate-input m-b-18\"> <input class=\"input100\" type=\"email\" name=\"email\"> </div>");
// 	var input2 = $('.input100');
// 	var thisAlert2 = $(input2).parent();
//     $('.validate-form').trigger('submit')
// 	assert.ok( $(thisAlert2).hasClass('alert-validate') == false , "Passed!" );
// 	$("p").next().remove()
// });


// QUnit.module( "Check input syntax error" );
// QUnit.test( "email systax erro validation", function( assert ) {
// 	$( "p" ).after( "<div class=\"wrap-input100 validate-input m-b-18\"> <input class=\"input100\" type=\"email\" name=\"email\"> </div>");
// 	var input2 = $('.input100');
// 	$(input2).val("iDontHaveAt");
// 	var thisAlert2 = $(input2).parent();
// 	$(thisAlert2).addClass('alert-validate');
//     $('.validate-form').trigger('submit')
// 	assert.ok( $(thisAlert2).hasClass('alert-validate') , "Passed!" );
// 	$("p").next().remove()
// });







