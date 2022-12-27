// ============ KONSILION JSON INFORMATIONS =============

var url = window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[1];

console.log("Variable host : " + window.location.host);
console.log("Variable split 1 : " + window.location.pathname.split('/')[1]);
console.log("Variable split 0 : " + window.location.pathname.split('/')[0]);


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

    console.log("Variable page : " + page);
    
        document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-bottom"  
        onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/new/master/docs/pages');">  
        Créer une page
        </button>
        `;    
});
