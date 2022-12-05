// ============= PIED DE PAGE ================

document.getElementsByClassName('md-content')[0].innerHTML += `
<button id="ShowNav" onclick="ShowNav();" class="hide">Afficher le menu<button>

<button id="HideNav" onclick="HideNav();">Masquer<button>

<p style="color:#AAA; font-size: 15px; text-align: center">
    <u><a href="https://github.com/konsilion/katalog-template/" target="_blank"> Obtenir une plateforme similaire</a></u>
    &ensp;
    <br>
    <br>
    Une plateforme open-source codé avec 🤍 par <u><a href="https://konsilion.fr" target="_blank">Konsilion</a></u>.
    <br><br>
    Un grand merci à <u><a href="https://multi.coop" target="_blank"> multi</a></u> et <u><a href="https://squidfunk.github.io/mkdocs-material/" target="_blank"> mkdocs-material</a></u> pour le support technique   
</p>
`;


// ============ LOGO =============

var url = '/konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <img 
            id="LogoIndex"
            src="` + json.logo + `">
        `;    
});


function HideNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementById("LogoIndex").classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "auto";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "auto";
    
};

function ShowNav() {
    document.getElementById("HideNav").classList.toggle("hide");
    document.getElementById("ShowNav").classList.toggle("hide");
    document.getElementById("LogoIndex").classList.toggle("hide");
    document.getElementsByClassName("md-sidebar--primary")[0].classList.toggle("hide");
    document.getElementsByClassName("md-main")[0].style.marginRight = "0px";
    document.getElementsByClassName("md-main")[0].style.marginLeft = "0px";
};
