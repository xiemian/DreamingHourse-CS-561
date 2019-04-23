var allItemElems = [];
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

function logOut(){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    curUser = getCookie("username")
    if (curUser == ""){
        alert("Log out successfully!");
        location.reload();
    }
    else{
        alert("Log out failed, please try again.");
    }
}    
// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

  var userName = getCookie('username');
  if (userName !==""){
    document.getElementById('before_login_show_sign_up').style.display = "none";
    document.getElementById('before_login_show_sign_in').style.display = "none";
    var user = document.getElementById('after_login_show_user_name');
    user.style.display = "block";
    document.getElementById('user_name').innerHTML = userName;
    changeModelForFavorite();
  }
  
  

});
