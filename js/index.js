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

linkRemoteCss('../konsilion-mkdocs-md.css');



document.getElementsByClassName('md-content')[0].innerHTML += `
<img 
    id="LogoIndex"
    src="https://konsilion.fr/wp/wp-content/uploads/2022/04/Logo_Konsilion_V2-1024x325.png"
    style= "position: fixed;
            top: 600px;
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
    <u><a style="cursor: pointer;" href="./admin"> Paramètrages</a></u>
    &ensp;
    <u><a style="cursor: pointer;" href="https://github.com/Konsilion/katalog-template/issues/new/choose" target="_blank"> Reporter une erreur</a></u>
    <br>
    <br>
    Une plateforme open-source codé avec 🤍 par <u><a href="https://konsilion.fr" target="_blank">Konsilion</a></u>.
    <br><br>
    Un grand merci à <u><a href="https://multi.coop" target="_blank"> multi</a></u> et <u><a href="https://squidfunk.github.io/mkdocs-material/" target="_blank"> mkdocs-material</a></u> pour le support technique   
</p>
`;
