
(function ($) {
    "use strict";

    var EMAIL = new RegExp('^([a-zA-Z0-9_\\-\.]+)@([a-zA-Z0-9_\\-\.]+)\.([a-zA-Z]{2,5})$');
    // var PHONE = new RegExp('^[2-9]\d{2}-\d{3}-\d{4}$');

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
    var input = $('.validate-input .input100');
    var select_option = $('.select-options');
    var check = true;

    $('#username').focusout(function(){
        var name = $('#username').val();
        if (name != null && name != '') {
            check = checkName(name);
        }
    });

    $('.validate-form').on('submit',function(e){
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
            if (!EMAIL.test(email)) {
                check = false;
            }
        }

        // if (phone != '') {
        //     if (!PHONE.test(phone)) {
        //         console.log('phone');
        //         check = false;
        //     }
        // }

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
                data: {'userService' : 'signUp','userName':user_name, 'userPassword':password, 'userRole':user_role, 'userPhone': phone, 'userEmail': email},
                success: function (result) {
                    if (JSON.parse(result).msg == "SUCCESS") {
                        //check = false;
                        alert("sign up successful, directing to home page");
                        // redirect to the index.html if log in successful
                        var pageURL = window.location.pathname;
                        console.log(pageURL);
                        var elements = String(pageURL).split("/");i
                        var len = elements.length;
                        elements[elements.length - 1] = "login.html";
                        var newURL = elements.join("/");
                        console.log(newURL);    
                        window.location.replace(newURL);
                        // var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
                        
                        // console.log(lastURLSegment);
                    }
                },
                error : function(error) {
                    alert("sign up failed, please review your information and try again");

                    
                }
            });
        }
        else{
            alert("Fail in signing up! Please review your information again.");
        }

      e.preventDefault();  
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function checkName(name){
        var check = true;
        $.ajax({
            async: false,
            type: "POST",
            url: "../php/userActionHandler.php" , //url
            data: {'userService' : 'isDuplicate', 'userName': name},
            success: function (result) {
                if (JSON.parse(result).msg == true) {
                    check = false;
                    alert("Username has beed used!");
                }
            },
            error : function(error) {
                
            }
        })
        return check;

    }

    function validate (input) {
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

    function square(x){
        return x*x;
    }
    
    
})(jQuery);

