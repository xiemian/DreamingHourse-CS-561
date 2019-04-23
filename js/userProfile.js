function generateItem(obj){

	var newP = document.createElement('p');
	var newDiv = document.createElement('div');
	var newA = document.createElement('a');
   
	var itemElem = document.createElement('article');
	itemElem.classList.add('item');
	var imgContainer = newDiv;
	imgContainer.classList.add('image-container');
	var newImg = document.createElement('img');
	newImg.classList.add('image');
	newImg.setAttribute('src','');
	newImg.src = obj.Url;
	imgContainer.appendChild(newImg);
	itemElem.appendChild(imgContainer);
	
    
    
	var itemContentElem = document.createElement('div');
	var itemTextElem = document.createElement('p');
	var itemAElem = document.createElement('a');

	itemContentElem.classList.add('item-content');
	itemElem.appendChild(itemContentElem);

	var itemLocation = document.createElement('p');
	itemLocation.classList.add('item-location');
	itemContentElem.appendChild(itemLocation)
	var address = document.createElement('a');
	address.classList.add('larger');
	address.setAttribute('hred', '#');
	// add address text to DOM 
	var addressText =  document.createTextNode(obj.Address + " " + obj.City + ", " + obj.State + " " + obj.Zipcode);
	address.appendChild(addressText);	
	itemLocation.appendChild(address);


	var price = document.createElement('p') ;
	price.classList.add('larger');
	price.classList.add('item-price');
	// add price text to DOM
	var priceText = document.createTextNode("$" + obj.Price);
	price.appendChild(priceText);
	itemContentElem.appendChild(price);

	var itemTitleContainer = document.createElement('div');
	itemTitleContainer.classList.add('item-title-container');
	itemContentElem.appendChild(itemTitleContainer);

	var faBedElem = document.createElement('i');
	faBedElem.classList.add('item-title');
	faBedElem.classList.add('fa');
	faBedElem.classList.add('fa-bed');
	var faBedText = document.createTextNode(" " + obj.Beds );
	faBedElem.appendChild(faBedText);
	itemTitleContainer.appendChild(faBedElem);

	var faBathElem = document.createElement('i');
	faBathElem.classList.add('item-title');
	faBathElem.classList.add('fa');
	faBathElem.classList.add('fa-bath');
	// add bed count text t to DOM
	var faBathText = document.createTextNode(" " + obj.Baths);
	faBathElem.appendChild(faBathText);
	itemTitleContainer.appendChild(faBathElem);

	// space 
	var itemTitleArea = document.createElement('p');
	itemTitleArea.classList.add('item-title');
	itemTitleContainer.appendChild(itemTitleArea);
	var space = document.createElement('a');

	var spaceText = document.createTextNode(obj.Space + " sqft");
	space.appendChild(spaceText);
	itemTitleArea.appendChild(space);

	// built year
	var itemTitleYear = document.createElement('p');
	itemTitleYear.classList.add('item-title');
	itemTitleYear.classList.add('item-builtTime');
	itemTitleContainer.appendChild(itemTitleYear);
	var builtTime = document.createElement('a');
	itemTitleYear.appendChild(builtTime);

	var buildYearText = document.createTextNode("Build in " + obj.Built);
	builtTime.appendChild(buildYearText);

	var itemDescriptionTitle = document.createElement('p');
	itemDescriptionTitle.classList.add('item-description-title');
	itemContentElem.appendChild(itemDescriptionTitle);
	var descriptionTitleText = document.createTextNode("Description ");
	itemDescriptionTitle.appendChild(descriptionTitleText);

	var itemDescriptionContainer = document.createElement('div');
	itemDescriptionContainer.classList.add('item-description-container');
	itemContentElem.appendChild(itemDescriptionContainer);

	var itemDescription = document.createElement('p');
	itemDescription.classList.add('item-description');
	itemDescriptionContainer.appendChild(itemDescription);
	var descriptionText = document.createTextNode(obj.description);
	itemDescription.appendChild(descriptionText);

    var houseId = document.createElement('p')
    var ID = document.createTextNode(obj.House_id)
	return itemElem;
}



function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
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
// User stored cookie to get user info
function getUserInfo(){
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
                   
                    document.getElementById('userName').placeholder = user.User_name;
                    document.getElementById('userEmail').placeholder = user.Email;
                    document.getElementById('userPhone').placeholder = user.Phone;
                    document.getElementById('userRole').placeholder = ( (user.User_role <2) ? 'Seller' : 'Buyer');
                    if (user.User_role == 1){ //seller
                        console.log(user.User_role);
                        getUploadedHouses(userName);
                        document.getElementById('sellerAction').style.display = "inline";
                        document.getElementById('buyerAction').style.display = "none";
                    }
                    else if (user.User_role == 2){ // buyer
                        //console.log('buyer');
                        getFavoriteHouses(userName);
                        document.getElementById('sellerAction').style.display = "none";
                        document.getElementById('buyerAction').style.display = "inline";
                    }
                },
                error : function(error) {
                    alert("bad request");  
                }
            });    
}

function getUploadedHouses(userName){
    console.log(userName);
    var itemContainer = document.getElementById('uploadedHousesPlace');
    $.ajax({
                type: "POST",
                url: "../php/houseInfoHandler.php" , //url
                data: {
                    'houseService' : 'getUploadHouse', 
                    'userName': userName,
                    'pageNum': 1,
                    'itemPerPage': 10,
                },
                success: function(result) {
                    result = JSON.parse(result); 
                    console.log(result);
                    if (result.msg === "SUCCESS" && result.status === 200){
                        
                        for (var i = 0; i < 10; i++){
                            var item = generateItem(result.foundHouse[i]);
                            itemContainer.appendChild(item);
                        }
                    }
                },
                error : function(error) {
                    alert("bad request");  
                }
            }); 
}

function getFavoriteHouses(userName){
   
    var itemContainer = document.getElementById('favoriteHousesPlace');
   
    $.ajax({
                type: "POST",
                url: "../php/houseInfoHandler.php" , //url
                data: {
                    'houseService' : 'getSavedHouses', 
                    'userName': userName,   
                },
                success: function(result) {
                    //console.log(result);
                    result = JSON.parse(result); 
                    //console.log(result);
                    if (result.msg === "SUCCESS" && result.status === 200){
                        for (var i = 0; i < 10; i++){
                            if (result.foundHouse[i]){
                                var item = generateItem(result.foundHouse[i]);
                                itemContainer.appendChild(item);
                            }
                        }
                    }
                },
                error : function(error) {
                    alert("bad request");  
                }
            });     
}

/*
 * This function displays the modal for adding a photo to a user page.
 */
function displayAddPhotoModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPhotoModalElem = document.getElementById('create-item-modal');

  // Show the modal and its backdrop.
  backdropElem.classList.remove('hidden');
  addPhotoModalElem.classList.remove('hidden');

}


/*
 * This function closes the modal for adding a photo to a user page, clearing
 * the values in its input elements.
 */
function closeAddPhotoModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPhotoModalElem = document.getElementById('create-item-modal');

  // Hide the modal and its backdrop.
  backdropElem.classList.add('hidden');
  addPhotoModalElem.classList.add('hidden');

  clearPhotoInputValues();

}

/*
 * This function clears the values of all input elements in the photo modal.
 */
function clearPhotoInputValues() {

  var inputElems = document.getElementsByClassName('wrap-input100 validate-input m-b-26');
  for (var i = 0; i < inputElems.length; i++) {
    var input = inputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

document.addEventListener('DOMContentLoaded', function(){
    getUserInfo();
    
    var addPhotoButton = document.getElementById('create-item-button');
    if (addPhotoButton) {
        addPhotoButton.addEventListener('click', displayAddPhotoModal);
    }

    var modalCloseButton = document.querySelector('#create-item-modal .modal-close-button');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeAddPhotoModal);
    }

    var modalCancalButton = document.querySelector('#create-item-modal .modal-cancel-button');
    if (modalCancalButton) {
        modalCancalButton.addEventListener('click', closeAddPhotoModal);
    }

}, false);