fetch("../../katalog.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  })  


function ModifKatalog(user,repo,page,token) {

    let html = `<button class="ksln-btn-top" style="background-color: #bd0000; color: white;" 
                onclick="window.location.reload();">  
                Quitter
                </button>
    
                <datami-file
                  title="Parametrage du catalogue Web"
                  gitfile="https://github.com/` + user + `/` + repo +  `/edit/master/docs` + page + `/katalog.json"
                  options='{
                  "defaultDepth": 2,
                  "allowKeyEdit": true
                }'
                  onlypreview="false"
                  usertoken="` + window.atob(token) + `"
                  locale="fr"
                ></datami-file>
                `;
    
    document.getElementsByClassName('md-content')[0].innerHTML = html;
  
    // Ajout CSS ---------------------

    var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.md-sidebar {display: none !important;} .md-content {margin: 50px auto; max-width: 100vw !important; padding: 0 25px;}';
        document.getElementsByTagName('head')[0].appendChild(style);

    // ---------------------   
  
};
