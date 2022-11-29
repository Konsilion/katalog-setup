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


linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion.css');

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion-mkdocs.css');

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion-datami.css');