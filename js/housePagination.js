
/**
 * @function: Create new HTML nodes for Item (show house infomation)
 * @param obj: an JSON that contains house infomation
 * @return: a DOM object (essential to list a single house info) 
 */
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




    var favContainerElem =  document.createElement('div');
    favContainerElem.classList.add('fav-container');


    var favElem = document.createElement('label');

    var checkInput = document.createElement('input');
    checkInput.setAttribute('type','checkbox');


    checkInput.addEventListener('click',function(){
            // console.log("inside");
           addFavorite(obj.House_id);

    });

    favElem.appendChild(checkInput);
    var checkSpan = document.createElement('span');
    checkSpan.classList.add('checkmark');
    favElem.appendChild(checkSpan);
    itemElem.appendChild(favContainerElem);
    favContainerElem.appendChild(favElem);


    return itemElem;
}

/**
 * @function: Call getHouseinfo API to get a new page of house from database
 * @param: pageNum, itemPerPage
 * @return: a list of DOM object {size = itemPerPage}
*/       
       
function getNewHouses(pageNum, itemPerPage,  filtered= 0){
    var i, formData, zipCode, city, state, minPrice, maxPrice, minSquare, maxSquare, bed, bath;
    var itemContainer = document.querySelector('.item-container');
    while (itemContainer.firstChild) {
        itemContainer.removeChild(itemContainer.firstChild);
    }
    /*
    */
    /*Read Form Data*/
    formData = document.getElementById('filter');  
    zipCode     = formData.elements['zipCode'].value;
    city        = formData.elements['city'].value;
    state       = formData.elements['state'].value;
    minPrice    = formData.elements['minPrice'].value;
    maxPrice    = formData.elements['maxPrice'].value;
    minSquare   = formData.elements['minSquare'].value;
    maxSquare   = formData.elements['maxSquare'].value;
    bed         = formData.elements['beds'].value;
    bath        = formData.elements['baths'].value;
    price = {"min": minPrice, "max": maxPrice};
    livingSpace = {"min": minSquare, "max": maxPrice};
    filterVariables = { "zipCode" : zipCode, 
                        "city": city, 
                        "state": state, 
                        "price": price, 
                        "livingSpace": livingSpace,
                        "bed" : bed,
                        "bath": bath}  
    filterVariables = { "zipCode" : 90077, 
                        "city": "Los Angeles", 
                        "state": " CA ", 
                        "price": {"min": -1, "max": 999999999}, 
                        "livingSpace": {"min": -1, "max": 999999999},
                        "bed" : 0,
                        "bath": 0} 
    console.log(filtered);
    /*Communicate with Server to get house info*/
    var itemContainer = document.querySelector('.item-container');
    $.ajax({
                type: "POST",
                url: "../php/houseInfoHandler.php" , //url
                data: {
                    'houseService' : 'getHouseInfo', 
                    'filtered': filtered,
                    'filterVariables': JSON.stringify(filterVariables),
                    'pageNum': pageNum,
                    'itemPerPage': itemPerPage
                },

                success: function(result) {
                    result = JSON.parse(result);                   
                    if (result.msg === "SUCCESS" && result.status === 200){
                        while (itemContainer.hasChildNodes()){
                             itemContainer.removeChild(itemContainer.firstChild);
                        }
                        for (var i = 0; i < itemPerPage; i++){
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

function generatePagination(itemPerPage, pageNum, filteredSearch = 0){
    getNewHouses(pageNum, itemPerPage, filteredSearch);
    
    var paginationDiv = document.getElementById('pagination');
    while (paginationDiv.hasChildNodes()){
        paginationDiv.removeChild(paginationDiv.firstChild);
    }
    var i;
    var link2PreviousPage = document.createElement("a");
    var node = document.createTextNode('<<');
    link2PreviousPage.appendChild(node);
    link2PreviousPage.setAttribute('href', 'javascript: void(0);');
    link2PreviousPage.addEventListener('click',function(){
            updatePageNumbers(-1, filteredSearch);
        });
    paginationDiv.appendChild(link2PreviousPage);
    for (i = 1 ; i <= itemPerPage; i++){
        var link2Page = document.createElement("a");
        var node = document.createTextNode(i);
        link2Page.appendChild(node);
        link2Page.setAttribute('href', 'javascript: void(0);');
        link2Page.setAttribute('class', 'pageNum');
        if (i === pageNum){
            link2Page.className += ( ' active');
        }
        link2Page.addEventListener('click',function(){
            var pageNumber = this.textContent;
            changeActive(pageNumber, filteredSearch);
        });
        paginationDiv.appendChild(link2Page);
    }
    var link2NextPage = document.createElement("a");
    var node = document.createTextNode('>>');
    link2NextPage.appendChild(node);
    link2NextPage.setAttribute('href', 'javascript: void(0);');
    link2NextPage.addEventListener('click',function(){
            updatePageNumbers(1, filteredSearch);
        });
    paginationDiv.appendChild(link2NextPage);
}

function changeActive(nextPageNumber, filteredSearch){
    
    var pageLinks = document.getElementsByClassName('pageNum');
    var currentMinPageNumber =Number(pageLinks[0].textContent);
    var currentMaxPageNumber =Number( pageLinks[pageLinks.length - 1].textContent);
    var nextPageNumber = Number(nextPageNumber);
    var i, currentPageNumber;
    for (i = 0 ; i < pageLinks.length; i++){
        if (pageLinks[i].getAttribute('class').indexOf('active') > -1){
            currentPageNumber = i + Number(currentMinPageNumber);
        }
    }
     //console.log(currentMinPageNumber, currentMaxPageNumber, currentPageNumber, nextPageNumber);
    if (nextPageNumber >= currentMinPageNumber && nextPageNumber <= currentMaxPageNumber) {
        
        // change active tag
        pageLinks[currentPageNumber- currentMinPageNumber].classList.remove('active');
        pageLinks[nextPageNumber - currentMinPageNumber].classList.add('active');
        // reload page based on nextPageNumber ------------------> todo
        getNewHouses(nextPageNumber, 5, filteredSearch);
    }
}

function updatePageNumbers(direction, filteredSearch){
    var pageLinks = document.getElementsByClassName('pageNum');
    var currentMinPageNumber =Number(pageLinks[0].textContent);
    var currentMaxPageNumber =Number( pageLinks[pageLinks.length - 1].textContent);
    var i, currentPageNumber;
    
    var Max = 20;
    for (i = 0 ; i < pageLinks.length; i++){
        if (pageLinks[i].getAttribute('class').indexOf('active') > -1){
            currentPageNumber = i + Number(currentMinPageNumber);
        }
    }
    var nextPageNumber = currentPageNumber + direction;

    if (direction < 0) {
        if ((currentPageNumber + direction) >= currentMinPageNumber){
            pageLinks[currentPageNumber- currentMinPageNumber].classList.remove('active');
            pageLinks[currentPageNumber- currentMinPageNumber - 1].classList.add('active');
            // reload page based on nextPageNumber ------------------> todo
            getNewHouses(nextPageNumber, 5, filteredSearch);
            
        }else {
            if (currentMinPageNumber != 1){
               for (i = 0 ; i < pageLinks.length; i++){
                    tmp = pageLinks[i].textContent;
                    pageLinks[i].textContent = Number(tmp) - 1;
               }
                // reload page based on nextPageNumber ------------------> todo
                getNewHouses(nextPageNumber, 5, filteredSearch);
            }
        }
    }else {
        if ((currentPageNumber + direction) <=  currentMaxPageNumber){
            pageLinks[currentPageNumber- currentMinPageNumber].classList.remove('active');
            pageLinks[currentPageNumber- currentMinPageNumber + 1].classList.add('active'); 
                      
            // reload page based on nextPageNumber ------------------> todo 
            getNewHouses(nextPageNumber, 5, filteredSearch);             
        }else {
           if (currentMaxPageNumber != Max){
               for (i = 0 ; i < pageLinks.length; i++){
                    tmp = pageLinks[i].textContent;
                    pageLinks[i].textContent = Number(tmp) + 1;
               }
               // reload page based on nextPageNumber ------------------> todo
               getNewHouses(nextPageNumber, 5, filteredSearch); 
           } 
        }
    }
}


function filteredSearch ( ) {
    generatePagination(5, 1, 1);
}