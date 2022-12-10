// ====== Création du widget Datami ======



const appId = window.location.pathname.split('/');
    
var katalog_folder = appId[appId.length - 3]
   
var ksln_json = window.location.pathname + '../../../konsilion.json';

var main_token = "";

var main_gitfile = "";







function TakeTheJson() {
    var url = window.location.pathname + '../katalog.json';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        var main = Object.keys(json.informations);
        var model = json.informations.model;
        var cardview = json.informations.cardview;
        DatamiKatalog(0,"DatamiMain",json.informations.name,json.informations.descr,main_gitfile,model,cardview,main_token);

        var list = Object.keys(json.external);        
        var count = Object.keys(json.external).length;
        for (let i = 0; i < count; i++) {
            DatamiKatalog(i+1,"DatamiExternal",list[i],json.external[list[i]].descr,json.external[list[i]].url,model,cardview,json.external[list[i]].token);
        }
    });
}




function DatamiKatalog(num,type_datami,title,descr,gitfile,model,cardview,token) {


    let htlm_init = `<!-- DATAMI WIDGET'S HTML BLOCK -->
                <datami-file
                    title="` + title + `"
                      gitfile="` + gitfile + `"
                      options='{
                      "height": "500px",
                      "separator": ";",
                      "lockcolumns": false,
                      "pagination": {
                        "itemsPerPage": 6
                      },
                      `;
    
    let html_end = ``;
    
    let html = ``;
    
    switch (model) {
      case '1':    
            
        html = `"cardsview": {
                        "activate": true,
                        "default": ` + cardview + `
                      },
                      "schema": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/` + katalog_folder + `.json"
                      },
                      "customfilters": {
                        "activate": true,
                        "filterfields": [
                          "CATEGORIE"
                        ],
                        "tagsSeparator": ","
                      },
                      "cardsdetail": false,
                      "cardssettings": {
                        "mini": {
                          "DESIGNATION": {
                            "position": "title"
                          },
                          "DESCRIPTION": {
                            "position": "resume"
                          },
                         "ETAT": {
                            "position": "resume"
                          },
                          "CATEGORIE": {
                            "position": "tags"
                          }
                        },
                        "detail": {
                          "DESIGNATION": {
                            "position": "title"
                          },
                          "DESCRIPTION": {
                            "position": "resume"
                          },
                          "LIEN": {
                            "position": "links"
                          },
                          "CATEGORIE": {
                            "position": "tags"
                          },
                          "ETAT": {
                            "position": "tags"
                          }
                        }
                      }
                    }'`;
        break;
      case '2':
        html = `"cardsview": {
                        "activate": true,
                        "default": ` + cardview + `
                      },
                      "schema": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/` + katalog_folder + `.json"
                      },
                      "fields-custom-properties": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/custom-ressources.json"
                      },
                      "customfilters": {
                        "activate": true,
                        "filterfields": [
                          "CATEGORIE",
                          "PROJETS"
                        ]
                      },
                      "cardsdetail": false,
                      "cardssettings": {
                        "mini": {
                          "DESIGNATION": {
                            "position": "title"
                          },
                         "PROJETS": {
                            "position": "tags", 
                            "block_title": "Projet"
                          },
                          "CATEGORIE": {
                            "position": "tags"
                          }
                        },
                        "detail": {
                          "DESIGNATION": {
                            "position": "title"
                          },
                          "DESCRIPTION": {
                            "position": "resume"
                          },
                          "LIEN": {
                            "position": "links"
                          },
                         "PROJETS": {
                            "position": "tags", 
                            "block_title": "Projet"
                          },
                          "CATEGORIE": {
                            "position": "tags"
                          },
                          "ETAT": {
                            "position": "tags"
                          }
                        }
                      }
                    }'
                    `;            
        break;
        default:
        html = ``;
    }
    
    html_end = `onlypreview="false"
                usertoken="` + window.atob(token) + `"
                locale="fr"
        ></datami-file><br><br> `;
      
    var html_final = htlm_init + html + html_end;
    
    document.getElementById(type_datami).innerHTML += html_final;

    setTimeout(function() {
        const elem = document.createElement("p");
            //elem.setAttribute("id", "DescrKatalog") 
            //elem.appendChild(document.createTextNode(descr));

        var child = document.getElementsByClassName("PreviewCsv")[num];
            //child.parentNode.insertBefore(elem, child);

    }, 1500);




}



TakeTheJson();






// ============ KONSILION JSON INFORMATIONS =============

var url = window.location.protocol + `//` + window.location.host + `/` + window.location.pathname.split('/')[1];

fetch(url + '/konsilion.json')
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');

    let page = ""

    for (let i = 2; i < (array.length - 3); i++) {
        i = i+1;

        page += '/' + array[i]
        
        i = i-1;
    } 

        document.getElementsByClassName('md-content')[0].innerHTML += `
        <button class="ksln-btn-bottom" 
        onclick="HideShow('` + json.user + `','` + json.repo + `','` + page + `');">  
        Modifier cette page
        </button>
        `;    
});

function HideShow(user,repo,page) {

    let html = `<button class="ksln-btn-bottom" 
                onclick="window.location.reload();">  
                Annuler le paramètrage
                </button>
    
                <datami-file
                  title="Schéma des données de l-observatoire"
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


