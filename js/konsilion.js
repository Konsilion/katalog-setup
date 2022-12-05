function HideMeNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "auto";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "auto";
    
};

function ShowMeNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "0px";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "0px";
};

window.HideMeNav = HideMeNav();

function linkRemoteCss(url){
    // create new link tag
    var link = document.createElement('link');

    // set properties of link tag
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';

    // append link element to html
    document.body.appendChild(link);
};

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion.css');
