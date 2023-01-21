// ============ KONSILION JSON INFORMATIONS =============

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

    for (let i = num; i < (array.length - 3); i++) {
        i = i+1;

        page += '/' + array[i]
        
        i = i-1;
    } 

        document.getElementsByClassName('md-header')[0].innerHTML += `
        <button class="ksln-btn-bottom" id="AddPage" 
        onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/new/master/docs/pages');">  
        Créer une page
        </button>
        `;    
});
