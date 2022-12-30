// =======  SHOW/HIDE NAVIGATION LATERALE ====

document.getElementsByClassName('md-content')[0].innerHTML += `
<button id="ShowNav" onclick="ShowNav();" class="hide">Afficher le menu</button>
<button id="HideNav" onclick="HideNav();"> x </button>
`;


function HideNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementsByClassName("md-header__inner md-grid")[0].classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("ksln-btn-top")[0].classList.toggle("hide");
    document.getElementsByClassName("ksln-btn-bottom")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "auto";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "auto";
    
};

function ShowNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementsByClassName("md-header__inner md-grid")[0].classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("ksln-btn-top")[0].classList.toggle("hide");
    document.getElementsByClassName("ksln-btn-bottom")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "0px";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "0px";
};
