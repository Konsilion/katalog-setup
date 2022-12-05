// Ajout CSS - Peux mieux faire ---------------------

//var style = document.createElement('style');
//    style.type = 'text/css';
//    style.innerHTML = 'h1 { display: none; }';
//    document.getElementsByTagName('head')[0].appendChild(style);

// ---------------------

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
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/schema.json"
                      },
                      "fields-custom-properties": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/custom.json"
                      },
                      "customfilters": {
                        "activate": true,
                        "filterfields": [
                          "IDs - FILTRES"
                        ],
                        "tagsSeparator": ","
                      },
                      "cardsdetail": false,
                      "cardssettings": {
                        "mini": {
                          "NOM DE LA RESSOURCE": {
                            "position": "title"
                          },
                          "DESCRIPTION": {
                            "position": "resume"
                          },
                          "IDs - FILTRES": {
                            "position": "tags"
                          }
                        },
                        "detail": {
                          "NOM DE LA RESSOURCE": {
                            "position": "title"
                          },
                          "DESCRIPTION": {
                            "position": "resume"
                          },
                          "LIEN": {
                            "position": "links"
                          },
                          "IDs - FILTRES": {
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
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/schema.json"
                      },
                      "fields-custom-properties": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/custom.json"
                      },
                      "customfilters": {
                        "activate": true,
                        "filterfields": [
                          "IDs - FILTRES"
                        ],
                        "tagsSeparator": ","
                      },
                      "cardsdetail": false,
                      "cardssettings": {
                        "mini": {
                          "NOM DE LA RESSOURCE": {
                            "position": "title"
                          },
                          "IDs - FILTRES": {
                            "position": "tags"
                          }
                        },
                        "detail": {
                          "NOM DE LA RESSOURCE": {
                            "position": "title"
                          },
                          "LIEN": {
                            "position": "links"
                          },
                          "IDs - FILTRES": {
                            "position": "tags"
                          }
                        }
                      }
                    }'
                    `;            
        break;
      case '3':
        html = `"cardsview": {
                        "activate": true,
                        "default": ` + cardview + `
                      },
                      "schema": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/schema.json"
                      },
                      "fields-custom-properties": {
                        "file": "https://github.com/Konsilion/katalog-setup/blob/master/json/custom.json"
                      },
                      "customfilters": {
                        "activate": true,
                        "filterfields": [
                          "IDs - FILTRES"
                        ],
                        "tagsSeparator": ","
                      },
                      "cardsdetail": false,
                      "cardssettings": {
                        "mini": {
                          "NOM DE LA RESSOURCE": {
                            "position": "title"
                          },
                          "DESCRIPTION": {
                            "position": "resume"
                          },
                          "IMAGE": {
                            "position": "image"
                          }
                        },
                        "detail": {
                          "NOM DE LA RESSOURCE": {
                            "position": "title"
                          },
                          "DESCRIPTION": {
                            "position": "resume"
                          },
                          "IMAGE": {
                            "position": "image"
                          },
                          "LIEN": {
                            "position": "links"
                          },
                          "IDs - FILTRES": {
                            "position": "tags"
                          }
                        }
                      }
                    }'`;
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

fetch(ksln_json)
    .then(response => response.json())
    .then(json => {    
        document.getElementsByClassName('md-content')[0].innerHTML += `
            <button class="ksln-btn-bottom" 
            onclick="window.open('https://github.com/` + json.user + `/` + json.repo +  `/edit/master/docs/katalog/` + katalog_folder + `/katalog.json');"> 
            Paramètrer ce catalogue
            </button>
            `;
    
            main_gitfile = `https://github.com/` + json.user + `/` + json.repo + `/` + `blob/master/docs/katalog/` + katalog_folder + `/data.csv`
    
            main_token = json.token;
    });


// ============ LOGO =============

var url = window.location.pathname + '../../../konsilion.json';
fetch(url)
.then(response => response.json())
.then(json => {

    var array = window.location.pathname.split('/');
    var page = array[array.length-2];   
    
    document.getElementsByClassName('md-content')[0].innerHTML += `
        <img 
            id="LogoIndex"
            src="` + json.logo + `"
            onclick="window.open(window.location.pathname + '../../../','_self')"
            style="cursor: pointer;">
        `;    
});




TakeTheJson();
