// ============ KONSILION JSON INFORMATIONS =============

var url = window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[1];

fetch(url + '/konsilion.json')
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');

    let page = ""

    for (let i = 1; i < (array.length - 2); i++) {
        i = i+1;

        page += '/' + array[i]
        
        i = i-1;
    } 
          
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-top" 
        onclick="HideShow('` + json.user + `','` + json.repo + `','` + page + `','` + json.token + `');">  
        Modifier cette page
        </button>
        `;    
});

function HideShow(user,repo,page,token) {

    let html = `<button class="ksln-btn-top" style="background-color: #bd0000; color: white;"
                onclick="window.location.reload();">  
                Annuler la modification
                </button>
    
                <datami-file
                    title="Modification de la page"
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
};
