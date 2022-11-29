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

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion-mkdocs-md.css');

linkRemoteCss('https://konsilion.github.io/katalog-setup/css/konsilion-datami.css');


document.getElementsByClassName('md-content')[0].innerHTML += `
<p style="color:#AAA; font-size: 15px; text-align: center">
    <u><a href="https://konsilion.fr/wp/recherche-et-developpement/katalog-installation" target="_blank"> Obtenir une plateforme similaire</a></u>
    &ensp;
    <u><a style="cursor: pointer;" onclick="VisualParam();"> Paramètrages</a></u>
    &ensp;
    <u><a style="cursor: pointer;" onclick="VisualRepo();"> Vers le répertoire de l'application</a></u>
    <br>
    <br>
    Une plateforme open-source codé avec 🤍 par <u><a href="https://konsilion.fr" target="_blank">Konsilion</a></u>.
    <br><br>
    Un grand merci à <u><a href="https://multi.coop" target="_blank"> multi</a></u> et <u><a href="https://squidfunk.github.io/mkdocs-material/" target="_blank"> mkdocs-material</a></u> pour le support technique   
</p>
`;


function VisualRepo() {
    var url = window.location.pathname + '../konsilion.json';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        GoToVisualRepo(json.repo);
    });
}

function GoToVisualRepo(repo) {
    window.open(repo);
}




function VisualParam() {
    var url = window.location.pathname + '../konsilion.json';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        GoToVisualParam(json.repo);
    });
}

function GoToVisualParam(repo) {
    window.open(repo + "/edit/master/mkdocs.yml");
}
