var MAX_QUANTITY_VALUE = 20;

/**
 * Check for each buttons and disable them if necessary
 * 
 * @param {*} quantityValue 
 * @param {*} subtractQuantityBtn 
 * @param {*} addQuantityBtn 
 */
var checkDisablePlus = function(quantityValue, subtractQuantityBtn, addQuantityBtn) {
    if(quantityValue <= 0){
        subtractQuantityBtn.classList.add("disabled");
    } else {
        subtractQuantityBtn.classList.remove("disabled");
    }

    if(quantityValue >= MAX_QUANTITY_VALUE){
        addQuantityBtn.classList.add("disabled");
    } else {
        addQuantityBtn.classList.remove("disabled");
    }
}

window.addEventListener("load", function () {
    var checkAllCheckbox  = document.getElementById("checkAllCheckbox");
    var totalElement = document.getElementById("cart-total");

    var total = +totalElement.getAttribute("data-cart-total");

    var allCheckboxes = document.querySelectorAll(".each-checkbox");
    var allQuantities = document.querySelectorAll(".each-quantity");
    var allPrices = document.querySelectorAll(".each-price");
    var allTotals = document.querySelectorAll(".each-total");
    var allSubtractBtns = document.querySelectorAll(".each-subtract");
    var allAddBtns = document.querySelectorAll(".each-add");
    var allDeleteBtns = this.document.querySelectorAll(".each-delete");

    var myProductData = [];

    /* Collect all initial data and make array of objects */
    allCheckboxes.forEach(function (item) {
        var obj = {};
        obj.id = item.getAttribute("data-product-id");
        obj.price = +item.getAttribute("data-product-price");
        obj.total = +item.getAttribute("data-product-total");
        obj.quantity = +item.getAttribute("data-product-quantity");
        obj.discount = +item.getAttribute("data-product-discount");
        myProductData.push(obj);
    });

    checkAllCheckbox.onclick = function () {
        allCheckboxes.forEach(function (item) {
            if(checkAllCheckbox.checked === true){
                item.checked = true;
            } else {
                item.checked = false;
            }
        })
    }

    allAddBtns.forEach(function (item, index) {
        item.onclick = function () {
            myProductData[index].quantity += 1;
            myProductData[index].total += myProductData[index].price;
            allQuantities[index].innerHTML = myProductData[index].quantity;
            allTotals[index].innerHTML = "&pound;"+  myProductData[index].total.toFixed(2);

            var new_total = 0;
            myProductData.forEach(function(elem){
                new_total += elem.total;
            });

            total = new_total;
            totalElement.innerHTML = "&pound;"+total.toFixed(2);

            checkDisablePlus(myProductData[index].quantity, allSubtractBtns[index], allAddBtns[index]);
        }
    });

    allSubtractBtns.forEach(function (item, index) {
        item.onclick = function () {
            myProductData[index].quantity -= 1;
            myProductData[index].total -= myProductData[index].price;
            allQuantities[index].innerHTML = myProductData[index].quantity;
            allTotals[index].innerHTML = "&pound;"+  myProductData[index].total.toFixed(2);

            var new_total = 0;
            myProductData.forEach(function(elem){
                new_total += elem.total;
            });

            total = new_total;
            totalElement.innerHTML = "&pound;"+total.toFixed(2);

            checkDisablePlus(myProductData[index].quantity, allSubtractBtns[index], allAddBtns[index]);
        }
    });
    
});