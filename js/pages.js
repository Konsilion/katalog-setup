// ============ KONSILION JSON INFORMATIONS =============

var url = '/konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-bottom" 
        onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/edit/master/docs/pages/' + page);"> 
        Modifier cette page
        </button>
        `;    
});

// ============ LOGO =============

var url = window.location.pathname + '../../konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <img 
            id="LogoIndex"
            src="` + json.logo + `"
            onclick="window.open(window.location.pathname + '../../','_self')"
            style="cursor: pointer;">
        `;    
});
