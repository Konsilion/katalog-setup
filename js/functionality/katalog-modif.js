function ModifKatalog(page) {

    let html = `<button class="ksln-btn-top" style="background-color: #bd0000; color: white;" 
                onclick="window.location.reload();">  
                Quitter
                </button>
    
                <datami-file
                  title="Parametrage du catalogue Web"
                  gitfile="` + URLKatalogRepo + `/edit/master/docs` + page + `/katalog.json"
                  options='{
                  "defaultDepth": 2,
                  "allowKeyEdit": true
                }'
                  onlypreview="false"
                  locale="fr"
                ></datami-file>
                `;
    
    document.getElementsByClassName('md-content')[0].innerHTML = html;
  
    // Ajout CSS ---------------------

    var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ` .md-sidebar {display: none !important;} 
                            .md-content {margin: 50px auto; max-width: 100vw !important; padding: 0 25px;}
                            #ModifKatalog {display: none}
                            #HideNav {display: none}
                            #AddPage {display: none}`;
        document.getElementsByTagName('head')[0].appendChild(style);    
    // --------------------- 
  
};



// ============ KONSILION JSON INFORMATIONS =============

var num = 0;

if (window.location.host.split('.')[1] == "github") {
    num = 1;
} else {
    num = 0;
}

var url = window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[num];

var array = window.location.pathname.split('/');

let page = ""

for (let i = num; i < (array.length - 3); i++) {
    i = i+1;

    page += '/' + array[i]

    i = i-1;
} 

document.getElementsByClassName('md-header')[0].innerHTML += `
<button id="ModifKatalog" class="ksln-btn-top" 
onclick="ModifKatalog('` + page + `');">  
Paramétrer ce catalogue
</button>
`;    
