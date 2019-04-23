function addFavorite(id) {
    // var userName = getCookie("username");
    $.ajax({
        type: "POST",
        url: "../php/houseInfoHandler.php" 
        data: {
            'houseService' : 'addFavoriteHouse',
            'houseId': id,
            'userName': "buyer",
        },
        success: function(result) {
            // console.log(result);
            // alert("Add Favorite Success!");
        },
        error : function(error) {
            alert("bad request");
        }
    });
}

function changeModelForFavorite(){
    var userName = getCookie("username");
    $.ajax({
        type: "POST",
        url: "../php/userActionHandler.php" , //url
        data: {
            'userService' : 'getUserInfo', 
            'userName': userName,                    
        },
        success: function(result) {
            result = JSON.parse(result);
            user = result.msg;

            if (user.User_role == 1){ //seller
                console.log(user.User_role);
                getUploadedHouses(userName);
                document.getElementsByClassName("fav-container").style.display = "none";
            }
            else if (user.User_role == 2){ // buyer
                //console.log('buyer');
                getFavoriteHouses(userName);
            }
        },
        error : function(error) {
            alert("bad request");  
        }
    });    
}