window.addEventListener("load", function () {
    /* All progress bar and main wrappers */
    var cartWrapper = document.getElementById("cart-wrapper");
    var shoppingWrapper = document.getElementById("shopping-cart");
    var collectionWrapper = document.getElementById("collection-slot");
    var paymentWrapper = document.getElementById("payment");

    var progressShopping = document.getElementById("progress-bar-shopping");
    var progressCollection = document.getElementById("progress-bar-collection");
    var progressPayment = document.getElementById("progress-bar-payment");
    var progressSuccess = document.getElementById("progress-bar-success");


    /* Shopping Cart */
    var checkAllCheckbox  = document.getElementById("checkAllCheckbox");
    var cartTotalElements  = document.querySelectorAll(".cart-total-price");
    var subTotalElement = document.getElementById("cart-sub-total");
    var discountElement = document.getElementById("cart-discount");
    var proceedBtn = document.getElementById("proceed-btn");
    var mainDeleteBtn = document.getElementById("main-delete");
    var subtotalItemElems = document.querySelectorAll(".subtotal-items");

    var total = +document.getElementById("cart-summary").getAttribute("data-cart-total");
    var subTotal = +document.getElementById("cart-summary").getAttribute("data-cart-sub-total");
    var discount = +document.getElementById("cart-summary").getAttribute("data-cart-discount") || 0;

    var allCheckboxes = document.querySelectorAll(".each-checkbox");
    var allQuantities = document.querySelectorAll(".each-quantity");
    var allTotals = document.querySelectorAll(".each-total");
    var allSubtractBtns = document.querySelectorAll(".each-subtract");
    var allAddBtns = document.querySelectorAll(".each-add");
    var allDeleteBtns = document.querySelectorAll(".each-delete");


    var myProductData = [];

    /* End shopping cart */


    /* Start collection slot */
    var allCollectionSlots = document.querySelectorAll(".each-collection-slot");
    var allCollectionDays = document.querySelectorAll(".each-collection-day");

    var summarySlotElements = document.querySelectorAll(".summary-slot");
    var summaryDayElements = document.querySelectorAll(".summary-day");
    
    var proceedCollectionBtn = document.getElementById("proceed-slot-btn");
    var backCollectionBtn = document.getElementById("back-collection");

    var slotNumber;
    var slotDay;

    /* End collection slot */


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

    var getTotalQuantity = function () {
        var totalQuantity = 0;
        myProductData.forEach(function(item) {
            totalQuantity += item.quantity;
        });
        return totalQuantity;
    }

    myProductData.forEach(function (item, index) {
        checkDisableBtns(item.quantity, allSubtractBtns[index], allAddBtns[index], getTotalQuantity());
    });


    var updateAllData = function (new_quantity, index) {
        myProductData[index].quantity = new_quantity;

        var item_price = myProductData[index].price;
        var total_without_discount =  new_quantity * item_price;
        myProductData[index].total = total_without_discount - total_without_discount * myProductData[index].discount / 100;

        subTotal = getSubTotal(myProductData);
        total = subTotal - subTotal * discount / 100;

        allQuantities[index].innerHTML = new_quantity;
        allTotals[index].innerHTML = "&pound;"+  myProductData[index].total.toFixed(2);
        subTotalElement.innerHTML = "&pound;"+subTotal.toFixed(2);
        cartTotalElements.forEach(function (elem) {
            elem.innerHTML = "&pound;"+total.toFixed(2);
        })
        subtotalItemElems.forEach(function (elem) {
            elem.innerHTML = getTotalQuantity();
        })
    }

    var getSelectedItems = function () {
        var selected_ids = [];
        allCheckboxes.forEach(function (item, index) {
            if(item.checked === true) {
                var id  = myProductData[index].id;
                selected_ids.push(id);
            }
        });
        return selected_ids;
    }



    allAddBtns.forEach(function (item, index) {
        item.onclick = function () {
            var new_quantity = myProductData[index].quantity + 1;

            updateAllData(new_quantity, index);

            checkDisableBtns(new_quantity, allSubtractBtns[index], allAddBtns[index]);

            checkProceedBtnDisable(proceedBtn, getTotalQuantity(), allAddBtns);
        }
    });

    allSubtractBtns.forEach(function (item, index) {
        item.onclick = function () {
            var new_quantity = myProductData[index].quantity - 1;

            updateAllData(new_quantity, index);

            checkDisableBtns(new_quantity, allSubtractBtns[index], allAddBtns[index]);

            checkProceedBtnDisable(proceedBtn, getTotalQuantity(), allAddBtns);
        }
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

    mainDeleteBtn.onclick = function () {
        var str = ""
        getSelectedItems().forEach(function (item) {
            str += item;
            str += "  ";
        })
        alert("You will delete: "+ str);
    }

    allDeleteBtns.forEach(function (item, index) {
        item.onclick = function () {
            alert("You will delte id: "+myProductData[index].id);
        }
    })
    

    proceedBtn.onclick = function () {
        shoppingWrapper.style.transform = "translateX(-100%)";
        collectionWrapper.style.transform = "translateX(-100%)";
        progressCollection.classList.add("active");
    }

    /* Collection Slot */

    allCollectionSlots.forEach(function (item) {
        item.onclick = function(){
            slotNumber = item.getAttribute("data-slot-number");
            allCollectionSlots.forEach(function (elem) {
                elem.classList.remove("active");
            });
            item.classList.add("active");

            summarySlotElements.forEach(function (elem) {
                elem.innerHTML = getSlotValueFromNumber(slotNumber);
            });

            checkProceedToPaymentBtn(slotNumber, slotDay, proceedCollectionBtn);
        }
    });

    allCollectionDays.forEach(function (item) {
        item.onclick = function () {
            slotDay = item.getAttribute("data-collection-day");
            allCollectionDays.forEach(function (elem) {
                elem.classList.remove("active");
            });
            item.classList.add("active");

            summaryDayElements.forEach(function (elem) {
                elem.innerHTML = slotDay;
            });

            checkProceedToPaymentBtn(slotNumber, slotDay, proceedCollectionBtn);
        }
    });

    proceedCollectionBtn.onclick = function(){
        collectionWrapper.style.transform = "translateX(-200%)";
        payment.style.transform = "translateX(-200%px)";
        progressPayment.classList.add("active");
    }

    backCollectionBtn.onclick = function () {
        var width = cartWrapper.offsetWidth;

        shoppingWrapper.style.transform = "translateX(0px)";
        collectionWrapper.style.transform = "translateX(0px)";
        progressCollection.classList.remove("active");        
    }
});