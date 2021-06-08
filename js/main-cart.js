window.addEventListener("load", function () {
    var checkAllCheckbox  = document.getElementById("checkAllCheckbox");
    var totalElement = document.getElementById("cart-total");
    var subTotalElement = document.getElementById("cart-sub-total");
    var discountElement = document.getElementById("cart-discount");
    var proceedBtn = document.getElementById("proceed-btn");
    var mainDeleteBtn = this.document.getElementById("main-delete");

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

    var max_quantity_exceeded = false;

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

    var totalQuantity = function () {
        var totalQuantity = 0;
        myProductData.forEach(function(item) {
            totalQuantity += item.quantity;
        });

        return totalQuantity;
    }

    myProductData.forEach(function (item, index) {
        checkDisableBtns(item.quantity, allSubtractBtns[index], allAddBtns[index], totalQuantity());
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
        totalElement.innerHTML = "&pound;"+total.toFixed(2);
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

            checkProceedBtnDisable(proceedBtn, totalQuantity(), allAddBtns);
        }
    });

    allSubtractBtns.forEach(function (item, index) {
        item.onclick = function () {
            var new_quantity = myProductData[index].quantity - 1;

            updateAllData(new_quantity, index);

            checkDisableBtns(new_quantity, allSubtractBtns[index], allAddBtns[index]);

            checkProceedBtnDisable(proceedBtn, totalQuantity(), allAddBtns);
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
    
});