
// get the input from sign up form 
var input = $('.validate-input .input100');
var select_option = $('.select-options');

// check the user Name is duplicate or not 
function checkName(name){
    $.ajax({
        type: "POST",
        url: "../php/userActionHandler.php" , //url
        data: {'userService' : 'isDuplicate ', 'servicePara': user_name},
        success: function (result) {
            if (result == true) {
                alert("Your username has been used!");
            }
        },
        error : function(error) {
            
        }
    })
}


function validate(input) {
    if($(input).val().trim() == ''){
        return false;
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

// (function ($) {
    // "use strict";
    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/

    $('#username').focusout(function(){
        var name = $('#username').val();
        if (name != null && name != '') {
            checkName(name);
        }
    });
    function signUpSubmit(){
    $('.validate-form').on('submit',function(e){
        console.log("in signUp- submit")
        var check = true;
        var user_name;
        var password;
        var repassword;
        var email;
        var phone;
        var user_role;

        for(var i=0; i<input.length; i++) {

            if ($(input[i]).attr('type') == 'text' && $(input[i]).attr('name') == 'username') {
                user_name = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            if ($(input[i]).attr('type') == 'password' && $(input[i]).attr('name') == 'psw') {
                password = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            if ($(input[i]).attr('type') == 'password' && $(input[i]).attr('name') == 'psw-repeat') {
                repassword = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            if ($(input[i]).attr('type') == 'email' && $(input[i]).attr('name') == 'email') {
                email = $(input[i]).val();
            }

            if ($(input[i]).attr('type') == 'tel' && $(input[i]).attr('name') == 'phone') {
                phone = $(input[i]).val();
            }
        }

        if (email != '') {
            email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/);
        }

        if (phone != '') {
            phone.trim().match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
        }

        if (user_name != '' && email != '' && phone != '' && password != '' && repassword != '') {
            if (password != repassword) {
                check = false;
                alert("Your repeat password doesn't match your password!");
            }
        }

        if (select_option.val() == 0) {
            showValidate(select_option);
            check = false;
        }
        else{
            user_role = select_option.val()
            hideValidate(select_option);
        }

        if (check == true) {
            $.ajax({
                type: "POST",
                url: "../php/userActionHandler.php" , //url
                dataType : 'JSON',
                data: {'userService' : 'signUp', 'servicePara': {'userName':user_name, 'userPass':password, 'userRole':user_role, 'userPhone': phone, 'userEmail': email}},
                success: function (result) {
                    console.log(result);
                },
                error : function(error) {
                    
                }
            });
        }

      e.preventDefault(); 
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });    
    }
// })(jQuery);
function square(x){
    return x*x;
}

