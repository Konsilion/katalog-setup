function DatamiConstruction(name,link,type) {

    var url = window.location.pathname + '../../../param.json';
    fetch(url)
        .then(response => response.json())
        .then(json => {
            DatamiWrite(json,name,link,type);
        });     
}


function DatamiWrite(param,name,link,type) {

    let html = ""
    
    let grid = document.getElementById('DatamiGrid');

    switch (type) {
        case '1':
            html = `<!-- DATAMI WIDGET'S HTML BLOCK -->
                        <datami-file
                          title="` + name + `"
                          gitfile="` + link + `"
                          options='{
                          "height": "500px",
                          "separator": ";",
                          "lockcolumns": false,
                          "pagination": {
                            "itemsPerPage": 25
                          },
                          "cardsview": {
                            "activate": true,
                            "default": true
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
                                "position": "tags", "block_title": "Catégories :"
                              }
                            }
                          }
                        }'
                          onlypreview="false"
                          usertoken="` + param.informations[0].token + `"
                          locale="fr"
                        ></datami-file> `;
            
        break;
      case '2':
        case '1':
            html = `<!-- DATAMI WIDGET'S HTML BLOCK -->
                        <datami-file
                          title="` + name + `"
                          gitfile="` + link + `"
                          options='{
                          "height": "500px",
                          "separator": ";",
                          "lockcolumns": false,
                          "pagination": {
                            "itemsPerPage": 25
                          },
                          "cardsview": {
                            "activate": true,
                            "default": true
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
                                "position": "tags", "block_title": "Catégories :"
                              }
                            }
                          }
                        }'
                          onlypreview="false"
                          usertoken="` + param.informations[0].token + `"
                          locale="fr"
                        ></datami-file> `;
                     
            
        break;    
      default:
            
        console.log(`La présentation Datami de type : ${type} n'est pas disponible.`);     
        break;
    }


    
    grid.innerHTML = html;
    
    document.getElementById('DatamiBloc').classList.toggle("hide");
    document.getElementById('IndexBloc').classList.toggle("hide");
    document.getElementsByClassName('md-sidebar')[0].classList.toggle("hide");
    document.getElementsByClassName('md-footer')[0].classList.toggle("hide");
}
