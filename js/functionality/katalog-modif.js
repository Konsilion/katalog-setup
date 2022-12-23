// ============ KONSILION JSON INFORMATIONS =============

var url = window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[1];

console.log(url);

fetch(url + '/konsilion.json')
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');

    let page = ""

    for (let i = 1; i < (array.length - 3); i++) {
        i = i+1;

        page += '/' + array[i]
        
        i = i-1;
    } 

        document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-top" 
        onclick="ModifKatalog('` + json.user + `','` + json.repo + `','` + page + `','` + json.token + `');">  
        Paramétrer ce catalogue
        </button>
        `;    
});
