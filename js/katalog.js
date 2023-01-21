// Ajout CSS - Peux mieux faire ---------------------

var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `h1 { display: none; }    
                        #DatamiExternal .ButtonEditFile {
                          display: none;
                        }
                        .md-main {
                        background-color: #fbfbfb;
                        }
                        .md-content {
                        background-color: rgba(255,255,255,0);
                        }
                        `;
    document.getElementsByTagName('head')[0].appendChild(style);

// ---------------------

// ====== Recuperation du katalog.json pour creer le catalogue 'main' et les 'partenaires' ======

function TakeTheJson() {
    
    var url = window.location.pathname + '../katalog.json';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        

        var list = Object.keys(json);
        
        var model = json[list[0]].model;
        var cardview = json[list[0]].cardview;
        
        console.log(model);
        
        var count = Object.keys(json).length;
        
        for (let i = 0; i < count; i++) {
            if (i == 0) {
                
                DatamiKatalog(i,"DatamiMain",list[i],json[list[i]].descr,main_gitfile,model,cardview,main_token,"");           
            
            } else {
                if (i == 1) {                
                    document.getElementById("DatamiMain").innerHTML += `<h2>Catalogues externes</h2><hr>`;
                    document.getElementById("DatamiMain").innerHTML += `<button id="HideDatamiExternal" class="md-button md-button--secondary" style="display: none" onclick="HideDatamiExternal();">Masquer</button>`;
                    document.getElementById("DatamiMain").innerHTML += `<button id="FullDatamiExternal" class="md-button md-button--secondary" style="display: none" onclick="FullDatamiExternal();"><i class="fa-solid fa-expand"></i></button>`;
                    document.getElementById("DatamiMain").innerHTML += `<button id="MinimizeDatamiExternal" class="md-button md-button--secondary" style="display: none" onclick="MinimizeDatamiExternal();"><i class="fa-solid fa-compress"></i></button>`;
                }
                document.getElementById("DatamiMain").innerHTML += `<button class="md-button md-button--primary" onclick="DatamiKatalog(` + i + `,'DatamiExternal','` + list[i] + `','` + json[list[i]].descr + `','` + json[list[i]].url_csv + `','` + model + `','` + cardview + `','','` + json[list[i]].url_origin + `');ShowDatamiExternal();">` + list[i] + `</button>`;
            }
        }
    });
}
// ---------------------



// ====== Modele de Datami widgets ======

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



// ====== Execution ======

const appId = window.location.pathname.split('/');
    
var katalog_folder = appId[appId.length - 3]

// var ksln_json = window.location.pathname + '../../../konsilion.json';

var main_gitfile = "";

var main_token = "";

//fetch(ksln_json)
//    .then(response => response.json())
//    .then(json => {    




main_gitfile = URLKatalogRepo + `/blob/master/docs/katalog/` + katalog_folder + `/data.csv`

console.log("Voici URL : " + main_gitfile);


//    });


TakeTheJson();
// ---------------------
