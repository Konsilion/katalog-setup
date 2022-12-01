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


var url = window.location.pathname + '../konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {
    
    document.getElementById("IndexLink").setAttribute("href", "https://github.com/" + json.user + "/" + json.repo + "/edit/master/docs/index.md");
    document.getElementById("PageLink").setAttribute("href", "https://github.com/" + json.user + "/" + json.repo + "/new/master/docs/pages");
    document.getElementById("InitLink").setAttribute("href", "https://github.com/" + json.user + "/" + json.repo + "/edit/master/docs/konsilion.json");
    document.getElementById("ConfigLink").setAttribute("href", "https://github.com/" + json.user + "/" + json.repo + "/edit/master/mkdocs.yml");

    document.getElementsByClassName('md-content')[0].innerHTML += `
    <button class="ksln-btn-bottom" 
        onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/upload/master/docs/stg');"> 
        Déposer un fichier
    </button>
    `;
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <img 
            id="LogoIndex"
            src="` + json.logo + `"
            style= "position: fixed;
                    top: 45px;
                    left: 25px;
                    max-width: 200px;
                    max-height: 45px;
                    filter: grayscale(100%);
                    opacity: 0.5;"
        >
        `;      
});


function myFunction() {
    // Copy the text inside the text field
    navigator.clipboard.writeText(`
    
    # Titre de votre page
    
    ---
    
    <script type="text/javascript" src="https://konsilion.github.io/katalog-setup/js/admin.js"></script>
    <script type="text/javascript" src="https://konsilion.github.io/katalog-setup/js/pages.js"></script>
    `);

    // Alert the copied text
    alert("Scripts copié et à coller dans l'étape suivante au bas de la page.");
}       
