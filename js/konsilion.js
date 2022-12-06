// ============= CSS ================

function linkRemoteCss(url){

// create new link tag
var link = document.createElement('link');

// set properties of link tag
link.href = url;
link.rel = 'stylesheet';
link.type = 'text/css';

// append link element to html
document.body.appendChild(link);

}

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion-mkdocs.css');

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion-datami.css');

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion.css');



// ============= PIED DE PAGE ================

document.getElementsByClassName('md-content')[0].innerHTML += `
<button id="ShowNav" onclick="ShowNav();" class="hide">Afficher le menu</button>

<button id="HideNav" onclick="HideNav();"> x </button>

<p style="color:#AAA; font-size: 15px; text-align: center">
    <u><a href="https://github.com/konsilion/katalog-template/" target="_blank"> Obtenir une plateforme similaire</a></u>
    &ensp;
    <br>
    <br>
    Une plateforme open-source codé avec 🤍 par Konsilion.
    <br><br>
    Un grand merci à <u><a href="https://multi.coop" target="_blank"> multi</a></u> et <u><a href="https://squidfunk.github.io/mkdocs-material/" target="_blank"> mkdocs-material</a></u> pour le support technique   
</p>
`;


function HideNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementsByClassName("md-header__inner md-grid")[0].classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "auto";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "auto";
    
};

function ShowNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementsByClassName("md-header__inner md-grid")[0].classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "0px";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "0px";
};
