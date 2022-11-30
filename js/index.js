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

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion-mkdocs-md.css');



document.getElementsByClassName('md-content')[0].innerHTML += `
<img 
    id="LogoIndex"
    src="https://static.wixstatic.com/media/9c0294_10806d3e86b04622b058669f09f2be9c~mv2.png/v1/fill/w_758,h_206,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/banni%C3%A8reinternet_edited.png"
    style= "position: fixed;
            top: 450px;
            left: 25px;
            padding-top: 25px;
            max-width: 200px;
            max-height: 100px;
            border-top: 1px solid #DDD;
            filter: grayscale(100%);
            opacity: 0.5;"
>
`;





document.getElementsByClassName('md-content')[0].innerHTML += `
<p style="color:#AAA; font-size: 15px; text-align: center">
    <u><a href="https://github.com/konsilion/katalog-template/" target="_blank"> Obtenir une plateforme similaire</a></u>
    &ensp;
    <u><a style="cursor: pointer;" href="./etc/parametres/home"> Paramètrages</a></u>
    &ensp;
    <u><a style="cursor: pointer;" href="https://github.com/Konsilion/katalog-template/issues/new/choose" target="_blank"> Reporter une erreur</a></u>
    <br>
    <br>
    Une plateforme open-source codé avec 🤍 par <u><a href="https://konsilion.fr" target="_blank">Konsilion</a></u>.
    <br><br>
    Un grand merci à <u><a href="https://multi.coop" target="_blank"> multi</a></u> et <u><a href="https://squidfunk.github.io/mkdocs-material/" target="_blank"> mkdocs-material</a></u> pour le support technique   
</p>
`;
