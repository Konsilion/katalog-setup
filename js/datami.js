const appId = window.location.pathname.split('/');
var name = appId[appId.length - 3]

var title = document.getElementById("CallDatami").getAttribute("title");

var descr = document.getElementById("CallDatami").getAttribute("descr");

var model = document.getElementById("CallDatami").getAttribute("model");


var cardview = document.getElementById("CallDatami").getAttribute("cardview");





// Ajout CSS - Peux mieux faire ---------------------


var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'h1 { display: none; }';
    document.getElementsByTagName('head')[0].appendChild(style);



// --------------------------------------------------



function TakeTheToken() {
    var url = window.location.pathname + '../../../konsilion.json';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        DatamiKatalog(json.token,json.repo);
    });
}



function DatamiKatalog(token,repo) {

    
    let htlm_init = `<!-- DATAMI WIDGET'S HTML BLOCK -->
                <datami-file
                    title="` + title + `"
                      gitfile="` + repo + `/blob/master/docs/etc/` + name + `/data.csv"
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
                            "position": "tags", "block_title": "État "
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
                            "position": "tags", "block_title": "État "
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
                            "position": "tags", "block_title": "Type :"
                          }
                        }
                      }
                    }'`;
        break;
        default:
        html = ``;
    }
    
    
    html_end = `onlypreview="false"
                usertoken="` + token + `"
                locale="fr"
        ></datami-file> `;
      

    var html_final = htlm_init + html + html_end;
    
        
    console.log(html_final);
    
    
    document.getElementById('DatamiGrid').innerHTML += html_final;
    
    
    setTimeout(function() {
        const elem = document.createElement("p");
            elem.setAttribute("id", "DescrKatalog")
            elem.appendChild(document.createTextNode(descr));  


        var child = document.getElementsByClassName("PreviewCsv")[0];
            child.parentNode.insertBefore(elem, child);

    }, 1500);    
}

TakeTheToken();

document.getElementsByClassName('md-content')[0].innerHTML += `
<img 
    id="LogoIndex"
    src="https://konsilion.fr/wp/wp-content/uploads/2022/04/Logo_Konsilion_V2-1024x325.png"
    style= "position: fixed;
            top: 600px;
            left: 25px;
            padding-top: 25px;
            max-width: 200px;
            max-height: 100px;
            border-top: 1px solid #DDD;
            filter: grayscale(100%);
            opacity: 0.5;"
>
`;
