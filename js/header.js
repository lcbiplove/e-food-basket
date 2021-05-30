window.addEventListener("load", function(){
    var menu_icon = document.getElementById("menu");
    var overlay = document.getElementById("overlay");
    var menu_container = document.getElementById("menu-container");

    function resetToDefault(){
        closeMenu();
        hideOverlay();
    }
    
    function showOverlay(){
        overlay.classList.add("overlay");
        document.body.style.overflow = "hidden";
    }
    function hideOverlay(){
        overlay.classList.remove("overlay");
        document.body.style = "";
    }
    function openMenu(){
        menu_container.classList.add("open");
        menu_icon.classList.add("open");
    }
    function closeMenu() {
        menu_container.classList.remove("open");
        menu_icon.classList.remove("open");
    }

    menu_icon.onclick = function(){
        if(this.classList.contains("open")){
            closeMenu();
            hideOverlay();
        } else {
            showOverlay();
            openMenu();
        }
        
    }
    overlay.onclick = function(){
        resetToDefault();
    }
});