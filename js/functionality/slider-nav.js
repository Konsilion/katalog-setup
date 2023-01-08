// =======  SHOW/HIDE NAVIGATION LATERALE ====

document.getElementsByClassName('md-header')[0].innerHTML += `
<button id="ShowNav" onclick="ShowNav();" class="hide">Afficher le menu</button>
<button id="HideNav" onclick="HideNav();"> x </button>
`;


function HideNav() {
    // document.getElementById("HideNav").classList.toggle("hide");
    // document.getElementById("ShowNav").classList.toggle("hide");
    // document.getElementsByClassName("md-header__inner md-grid")[0].classList.toggle("hide");
    // document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    // document.getElementsByClassName("md-tabs")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "auto";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "auto";    
    //document.getElementsByClassName("ksln-btn-top")[0].classList.toggle("hide");
    //document.getElementsByClassName("ksln-btn-bottom")[0].classList.toggle("hide");

    // Ajout CSS ---------------------

    var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ` .md-header__inner md-grid {display: none !important;} 
                            .md-sidebar--primary {display: none !important;} 
                            .md-tabs {display: none !important;}    
                            .ksln-btn-top {display: none !important;} 
                            .ksln-btn-bottom {display: none !important;} 
                            #HideNav {display: none}
                            #ShowNav {display: block}
        document.getElementsByTagName('head')[0].appendChild(style);    
    // ---------------------
};

function ShowNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementsByClassName("md-header__inner md-grid")[0].classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("md-tabs")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "0px";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "0px";
    document.getElementsByClassName("ksln-btn-top")[0].classList.toggle("hide");
    document.getElementsByClassName("ksln-btn-bottom")[0].classList.toggle("hide");
};
