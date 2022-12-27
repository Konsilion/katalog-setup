fetch("https://konsilion.github.io/katalog-setup/js/katalog/katalog.js")
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
                  title="Parametrage de la page"
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
  
    fetch("https://konsilion.github.io/katalog-setup/js/functionality/slider-nav.js")
      .then((response) => response.text())
      .then((text) => eval(text))
      .then(() => {
      })    
  
};
