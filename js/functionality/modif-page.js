// ============ Modification de la page avec remplacement par un widget Datami =============

function ModifPage(user,repo,page,token) {

    let html = `<button id="Quit" class="ksln-btn-top" style="background-color: #bd0000; color: white;"
                onclick="window.location.reload();">  
                Quitter
                </button>
    
                <datami-file
                    title="Modification de la page Web"
                    gitfile="https://github.com/` + user + `/` + repo +  `/edit/master/docs` + page + `.md"
                    options='{}'
                    onlypreview="false"
                    usertoken="` + window.atob(token) + `"
                    locale="fr"
                ></datami-file>
                `;
    
    document.getElementsByClassName('md-content')[0].innerHTML = html;
    
    fetch("https://datami-widget.multi.coop/js/app.js")
      .then((response) => response.text())
      .then((text) => eval(text))
      .then(() => {
      })
    
    // Ajout CSS ---------------------

    var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ` .md-sidebar {display: none !important;} 
                            .md-content {margin: 50px auto; max-width: 100vw !important; padding: 0 25px;}
                            #ModifPage {display: none}
                            #HideNav {display: none}
                            #AddPage {display: none}`;
        document.getElementsByTagName('head')[0].appendChild(style);    
    // ---------------------

};

// ---------------------------







// ============ Execution =============


var num = 0;

if (window.location.host.split('.')[1] == "github") {
    num = 1;
} else {
    num = 0;
}


var url = window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[num];

fetch(url + '/konsilion.json')
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');

    let page = ""

    for (let i = num; i < (array.length - 2); i++) {
        i = i+1;

        page += '/' + array[i]
        
        i = i-1;
    } 
          
    document.getElementsByClassName('md-header')[0].innerHTML += `
        <button id="ModifPage" class="ksln-btn-top" 
        onclick="ModifPage('` + json.user + `','` + json.repo + `','` + page + `','` + json.token + `');">  
        Modifier cette page
        </button>
        `;    
});
// ---------------------------
