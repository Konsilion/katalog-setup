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





fetch("https://unpkg.com/papaparse@5.3.0/papaparse.min.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  
  })


fetch("https://konsilion.github.io/katalog-setup/js/katalog/katalog.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  })  


fetch("https://konsilion.github.io/katalog-setup/js/konsilion.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  }) 



fetch("https://datami-widget.multi.coop/js/app.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  })









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
