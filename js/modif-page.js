// ============ KONSILION JSON INFORMATIONS =============

var url = window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[1];

fetch(url + '/konsilion.json')
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');

    let page = ""

    for (let i = 2; i < (array.length - 2); i++) {
        i = i+1;

        page += '/' + array[i]
        
        i = i-1;
    }
    
    var page = array[array.length-2]; 
          
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-bottom" 
        onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/edit/master/docs` + page + `.md');">  
        Modifier cette page
        </button>
        `;    
});
