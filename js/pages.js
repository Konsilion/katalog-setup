// ============ KONSILION JSON INFORMATIONS =============

console.log(window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/konsilion.json')

window.open(window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/konsilion.json')


var url = window.location.pathname + '../../konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-bottom" 
        onclick="window.open('` + window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[1] + `/konsilion.json');"> 
        Modifier cette page
        </button>
        `;    
});
