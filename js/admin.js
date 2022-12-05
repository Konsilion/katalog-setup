var url = '/konsilion.json';
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


// ============ LOGO =============

var url = window.location.pathname + '../konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <img 
            id="LogoIndex"
            src="` + json.logo + `"
            onclick="window.open(window.location.pathname + '../','_self')"
            style="cursor: pointer;">
        `;    
});
