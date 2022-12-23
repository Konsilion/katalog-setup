// Ajout CSS - Peux mieux faire ---------------------

var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'h1 { display: none; }';
    document.getElementsByTagName('head')[0].appendChild(style);

// ---------------------





// ====== Modele de Datami widgets ======

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
                      "cardsview": {
                        "activate": true,
                        "default": ` + cardview + `
                      },
                      "schema": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/` + katalog_folder + `/schema.json"
                      },
                      "fields-custom-properties": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/` + katalog_folder + `/custom.json"
                      },
                      `;
    
    let html_end = ``;
    
    let html = ``;
    
    switch (model) {
      case 'projet':        
        html = `"customfilters": {
                        "activate": true,
                        "filterfields": [
                          "CATEGORIES",
                          "ETAT"
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
                            "position": "tags"
                          },
                          "CATEGORIES": {
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
                          "CATEGORIES": {
                            "position": "tags"
                          },
                          "ETAT": {
                            "position": "tags"
                          }
                        }
                      }
                    }'`;
        break;
       case 'tache':        
        html = `"customfilters": {
                        "activate": true,
                        "filterfields": [
                          "CATEGORIES",
                          "PROJETS"
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
                         "CATEGORIES": {
                            "position": "tags"
                          },                
                          "PROJETS": {
                            "position": "tags", 
                            "block_title": "Projet"
                          }
                        },
                        "detail": {
                          "DESIGNATION": {
                            "position": "title"
                          },
                          "DESCRIPTION": {
                            "position": "description"
                          },
                          "LIEN": {
                            "position": "links"
                          },
                          "CATEGORIES": {
                            "position": "tags"
                          },
                          "ETAT": {
                            "position": "tags"
                          }
                        }
                      }
                    }'`;
        break;           
            
      case 'ressource':
        html = `"customfilters": {
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
                      "CATEGORIES": {
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
                      "CATEGORIES": {
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
            elem.setAttribute("id", "DescrKatalog") 
            elem.appendChild(document.createTextNode(descr));

        var child = document.getElementsByClassName("PreviewCsv")[num];
            child.parentNode.insertBefore(elem, child);

    }, 1500);
}
// ---------------------









// ====== Recuperation du katalog.json pour creer le catalogue 'main' et les 'partenaires' ======

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
// ---------------------












// ====== Execution ======

const appId = window.location.pathname.split('/');
    
var katalog_folder = appId[appId.length - 3]

var ksln_json = window.location.pathname + '../../../konsilion.json';

var main_gitfile = "";

var main_token = "";

fetch(ksln_json)
    .then(response => response.json())
    .then(json => {    
            main_gitfile = `https://github.com/` + json.user + `/` + json.repo + `/` + `blob/master/docs/katalog/` + katalog_folder + `/data.csv`
            main_token = json.token;
    });


TakeTheJson();
// ---------------------
