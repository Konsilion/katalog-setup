// ============ KONSILION JSON INFORMATIONS =============



var url = window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[1];
fetch(url + '/konsilion.json')
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-bottom" 
        onclick="window.open('` + url + `/konsilion.json');"> 
        Modifier cette page
        </button>
        `;    
});
