// ====== Modele de Datami widgets ======

const appId = window.location.pathname.split('/');
    
var katalog_folder = appId[appId.length - 3]

function DatamiKatalog(num,type_datami,title,descr,gitfile,model,cardview,token,url_origin) {
    
    var numItems = 6
    
    if (num > 0){
        numItems = 3
    }
    
    
    let htlm_init = `<!-- DATAMI WIDGET'S HTML BLOCK -->
                <datami-file
                    title="` + title + `"
                      gitfile="` + gitfile + `"
                      options='{
                      "height": "500px",
                      "separator": ";",
                      "lockcolumns": false,
                      "pagination": {
                        "itemsPerPage": ` + numItems + `
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
      case 'kloud':        
        html = `"customfilters": {
                        "activate": true,
                        "filterfields": [
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
 
    var html_final = ""

      
    if (type_datami == "DatamiExternal"){
        

        // html_final += "<a class='md-button md-button--secondary' href='" + url_origin + "' style='border-radius: 50px;'>Accédez au catalogue original</a>"
         
        html_final += htlm_init + html + html_end;

        
    } else {
    
        html_final += htlm_init + html + html_end;
    
    }
       
    document.getElementById(type_datami).innerHTML = html_final;


    setTimeout(function() {
        
        var child = document.getElementsByClassName("PreviewCsv")[num];
            
        if (type_datami == "DatamiExternal") {
                
            const btn = document.createElement("a");
                btn.setAttribute("href", "#")
                btn.setAttribute("target", "_blank")
                btn.setAttribute("class", "md-button md-button--secondary")
                btn.setAttribute("style", "float: right; border-radius: 25px; margin: 10px")
                btn.appendChild(document.createTextNode("Voir catalogue source"));

            child.parentNode.insertBefore(btn, child);
            
            // Ajout CSS ---------------------

            var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '#DatamiExternal {display: block !important;}';

            // ---------------------             
        
        }
        
        const elem = document.createElement("p");
            elem.setAttribute("id", "DescrKatalog")
            elem.setAttribute("style", "min-height: 50px;")
            elem.appendChild(document.createTextNode(descr));
        
        child.parentNode.insertBefore(elem, child);
        
    }, 1500);
}
// ---------------------





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
        style.innerHTML = ` .md-sidebar {display: none !important;} 
                            .md-content {margin: 50px auto; max-width: 100vw !important; padding: 0 25px;}
                            #ModifKatalog {display: none}
                            #HideNav {display: none}
                            #AddPage {display: none}`;
        document.getElementsByTagName('head')[0].appendChild(style);    
    // --------------------- 
  
};
