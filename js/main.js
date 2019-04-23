
// (function ($) {
//     "use strict";

//     /*==================================================================
//     [ Focus Contact2 ]*/
//     $('.input100').each(function(){
//         $(this).on('blur', function(){
//             if($(this).val().trim() != "") {
//                 $(this).addClass('has-val');
//             }
//             else {
//                 $(this).removeClass('has-val');
//             }
//         })    
//     })

//     /*==================================================================
//     [ Validate ]*/
//     var input = $('.validate-input .input100');
//     var select_option = $('.select-options');

//     $('.validate-form').on('submit',function(){
//         var check = true;
//         var user_name;
//         var password;
//         var repassword;

//         for(var i=0; i<input.length; i++) {

//             if ($(input[i]).attr('type') == 'text' && $(input[i]).attr('name') == 'username') {
//                 user_name = $(input[i]).val();
//             }

//             if ($(input[i]).attr('type') == 'password' && $(input[i]).attr('name') == 'psw') {
//                 password = $(input[i]).val();
//             }

//             if ($(input[i]).attr('type') == 'password' && $(input[i]).attr('name') == 'psw-repeat') {
//                 repassword = $(input[i]).val();
//             }

//             if(validate(input[i]) == false){
//                 showValidate(input[i]);
//                 check = false;
//             }
//         }

//         if (password != null && repassword != null || password != '' && repassword != '') {
//             if (user_name == null || user_name == '') {
//                 check = false;
//                 alert("Please Fill Out Your Username!");
//             }
//             else{
//                 if (password != repassword) {
//                     check = false;
//                     alert("Repeated Password Is Different From Your Password!");
//                 }
//             }
//         }
//         else{
//             if (password == null) {
//                 check = false;
//                 alert("Please Fill Out Your Password!");
//             }
//             else{
//                 check = false;
//                 alert("Please Repeat Your Password!");
//             }
//         }

//         if (select_option.val() == 0) {
//             showValidate(select_option);
//             check = false;
//         }
//         else{
//             hideValidate(select_option);
//         }

//         if (check == true) {
//             $.ajax({
//                 type: "POST",
//                 dataType: "json",
//                 url: "" , //url
//                 data: $('#signUpForm').serialize(),
//                 success: function (result) {
//                     console.log(result);
//                     if (result.resultCode == 200) {
//                         alert("SUCCESS");
//                     }
//                     ;
//                 },
//                 error : function() {
//                     alert("Error!");
//                 }
//             });
//         }

//         return check;
//     });


//     $('.validate-form .input100').each(function(){
//         $(this).focus(function(){
//            hideValidate(this);
//         });
//     });

//     function validate (input) {
//         if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//             if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                 return false;
//             }
//         }
//         else {
//             if($(input).val().trim() == ''){
//                 return false;
//             }
//         }
//     }

//     function showValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).addClass('alert-validate');
//     }

//     function hideValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).removeClass('alert-validate');
//     }
    

// })(jQuery);