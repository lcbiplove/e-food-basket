var MAX_QUANTITY_VALUE = 20;

/**
 * Check for each buttons and disable them if necessary
 * 
 * @param {*} quantityValue 
 * @param {*} subtractQuantityBtn 
 * @param {*} addQuantityBtn 
 */
 var checkDisableBtns = function(quantityValue, subtractQuantityBtn, addQuantityBtn, totalQuantity) {
    if(quantityValue <= 1){
        subtractQuantityBtn.classList.add("disabled");
    } else {
        subtractQuantityBtn.classList.remove("disabled");
    }

    if(totalQuantity >= MAX_QUANTITY_VALUE){
        addQuantityBtn.classList.add("disabled");
    } else {
        addQuantityBtn.classList.remove("disabled");
    }
}

/**
 * Returns total price from array of obj
 * 
 * @param {*} myProductData 
 * @returns int total price
 */
var getSubTotal = function (myProductData) {
    var new_total = 0;
    myProductData.forEach(function(elem){
        new_total += elem.total;
    });
    return new_total;
}

/**
 * Check if proceed button should be disabled
 * 
 * @param {*} proceedBtn 
 * @param {*} totalQuantity 
 * @param {*} allAddBtns 
 */
var checkProceedBtnDisable = function (proceedBtn, totalQuantity, allAddBtns) {
    if(totalQuantity >= MAX_QUANTITY_VALUE){
        alert("You cannot add more than "+MAX_QUANTITY_VALUE +" items");
        proceedBtn.classList.add("disabled");
        allAddBtns.forEach(function (item) {
           item.classList.add("disabled"); 
        });
    }
    else {
        proceedBtn.classList.remove("disabled");
    }
}