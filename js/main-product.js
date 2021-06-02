window.addEventListener("load", function(){
    imageZoom("preview-img", "zoom-img-result");   
    
    var previewImage = document.getElementById("preview-img");
    var productIndicators = document.querySelectorAll(".product-img-indicator");

    productIndicators.forEach(function(item){
        item.onclick = function(){
            var shopByContainer = document.querySelector(".shop-by-images-container");

            productIndicators.forEach(function(item){
                item.classList.remove("active");
            });

            this.classList.add("active");

            shopByContainer.scrollTo({
                behavior: 'smooth',
                left: this.offsetLeft
            });
            previewImage.setAttribute("src", this.getAttribute("src"));
            imageZoom("preview-img", "zoom-img-result");
        }
    });

});

