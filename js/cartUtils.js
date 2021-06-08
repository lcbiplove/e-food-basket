var MAX_QUANTITY_VALUE = 20;

/**
 * Check for each buttons and disable them if necessary
 * 
 * @param {*} quantityValue 
 * @param {*} subtractQuantityBtn 
 * @param {*} addQuantityBtn 
 */
 var checkDisableBtns = function(quantityValue, subtractQuantityBtn, addQuantityBtn) {
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
 * @param {*} myProductData 
 * @param {*} proceedBtn 
 */
var checkProceedBtnDisable = function (myProductData, proceedBtn) {
    if(getSubTotal(myProductData) <= 0){
        proceedBtn.classList.add("disabled");
    } else {
        proceedBtn.classList.remove("disabled");
    }
}