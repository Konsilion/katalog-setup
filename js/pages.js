// ============= IMPORT CSS =============

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

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion.css');




// ============ KONSILION JSON INFORMATIONS =============

var url = '/konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-bottom" 
        onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/edit/master/docs/pages/' + pages);"> 
        Modifier cette page
        </button>
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


fetch("https://konsilion.github.io/katalog-setup/js/konsilion.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  }) 
