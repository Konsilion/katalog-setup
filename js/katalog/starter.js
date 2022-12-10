fetch("https://unpkg.com/papaparse@5.3.0/papaparse.min.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  
  })


fetch("https://konsilion.github.io/katalog-setup/js/katalog/katalog.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  })  


fetch("https://datami-widget.multi.coop/js/app.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  })



function HideShow(user,repo,page) {

    let html = `<button class="ksln-btn-bottom" style="background-color: #bd0000; color: white;" 
                onclick="window.location.reload();">  
                Annuler le paramètrage
                </button>
    
                <datami-file
                  title="Parametrage de la page"
                  gitfile="https://github.com/` + user + `/` + repo +  `/edit/master/docs` + page + `/katalog.json"
                  options='{
                  "defaultDepth": 2,
                  "allowKeyEdit": true
                }'
                  onlypreview="false"
                  locale="fr"
                ></datami-file>
                `;
    
    document.getElementsByClassName('md-content')[0].innerHTML = html;  
};
