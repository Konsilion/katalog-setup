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

document.getElementsByClassName('md-content')[0].innerHTML += `
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
        <button class="ksln-btn-bottom" 
        onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/edit/master/docs/pages/' + pages);"> 
        Modifier cette page
        </button>
        `;    
});
