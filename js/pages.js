// ============ KONSILION JSON INFORMATIONS =============

var url = '/konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-bottom" 
        onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/edit/master/docs/pages/' + pages);"> 
        Modifier cette page
        </button>
        `;    
});
