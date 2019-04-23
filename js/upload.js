
(function ($) {
    "use strict";

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
    var bed_num = $('.bed-num');
    var bath_num = $('.bath-num');
    var check = true;

    $('.validate-form').on('submit',function(e){
        var address;
        var city;
        var state;
        var zipCode
        var price;
        var buildTime;
        var livingSpace;
        var lotSpace;
        var description;
        var bath;
        var bed;
        var userName;
        var picURL;
       
        userName = getCookie("username")
        for(var i=0; i<input.length; i++) {

            // get address 
            if ($(input[i]).attr('type') == 'text' && $(input[i]).attr('name') == 'address') {
                address = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            // city required 
            if ($(input[i]).attr('type') == 'text' && $(input[i]).attr('name') == 'city') {
                city = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            // state reuqired 
            if ($(input[i]).attr('type') == 'text' && $(input[i]).attr('name') == 'state') {
                state = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }
    //alert(check);


            // price required 
            if ($(input[i]).attr('type') == 'number' && $(input[i]).attr('name') == 'price') {
                price = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            // builtTime required 
            if ($(input[i]).attr('type') == 'number' && $(input[i]).attr('name') == 'buildTime') {
                buildTime = $(input[i]).val();
            }

            // living space required 
            if ($(input[i]).attr('type') == 'number' && $(input[i]).attr('name') == 'livingSpace') {
                livingSpace = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }      

            // lotSpace optional 
            if ($(input[i]).attr('type') == 'number' && $(input[i]).attr('name') == 'lotSpace') {
                lotSpace = $(input[i]).val();
            }

            // Description required 
            if ($(input[i]).attr('name') == 'description') {
                description = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }


            // Zipcode required 
            if ($(input[i]).attr('type') == 'text' && $(input[i]).attr('name') == 'zipCode') {
                zipCode = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }

            // picture URL required 
            if ($(input[i]).attr('type') == 'text' && $(input[i]).attr('name') == 'picURL') {
                picURL = $(input[i]).val();
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }
        }

        if (bed_num.val() == 0) {
            showValidate(bed_num);
            check = false;
        }
        else{
            bed_num = bed_num.val()
            hideValidate(bed_num);
        }

        if (bath_num.val() == 0) {
            showValidate(bath_num);
            check = false;
        }
        else{
            bath_num = bath_num.val()
            hideValidate(bath_num);
        }
    

        if (check == true) {
            $.ajax({
                type: "POST",
                url: "../php/houseInfoHandler.php" , //url
                data: {'houseService': 'uploadHouseInfo', 'userName': userName, 'address': address,'city': city, 'state': state, 'price': price, 'imageUrl': picURL, 'livingSpace': livingSpace, 'zipCode': zipCode,
                'buildTime': buildTime, 'lotSpace': lotSpace, 'description': description, 'bath': bath_num, 'bed': bed_num},
                success: function (serverResponse) {
                //     if (JSON.parse(result).msg == "SUCCESS") {
                //         //check = false;
                //         alert("sign up successful, directing to home page");
                //         // redirect to the index.html if log in successful
                //         var pageURL = window.location.pathname;
                //         console.log(pageURL);
                //         var elements = String(pageURL).split("/");i
                //         var len = elements.length;
                //         elements[elements.length - 1] = "login.html";
                //         var newURL = elements.join("/");
                //         console.log(newURL);    
                //         window.location.replace(newURL);
                //         // var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
                            alert("upload success");
                        
                //     }
                },
                error : function(ajaxError) {
                    alert("upload failed");
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
            url: "../php/houseActionHandler.php" , //url
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

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    
})(jQuery);

