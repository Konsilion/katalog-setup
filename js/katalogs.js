const ressourceCardTemplate = document.querySelector("[data-ressource-template]");
const ressourceCardContainer = document.querySelector("[data-ressource-cards-container]")
let ressources = [];
let katalog_json_file;

var url = window.location.pathname + '../katalogs.json';
fetch(url)
    .then(response => response.json())
    .then(json => {
        IndexConstruction(json);
    });



function IndexConstruction(katalogs) {
        

    for (let i = 0; i < katalogs.katalogs.length; i++) {
        
        const card = ressourceCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const link = card.querySelector("[data-link]")
        const img = card.querySelector("[data-img]")
        const author = card.querySelector("[data-author]")
        const descr = card.querySelector("[data-descr]")
                
        header.textContent = katalogs.katalogs[i].name
        link.setAttribute("onclick","DatamiConstruction('" + katalogs.katalogs[i].name + "','" + katalogs.katalogs[i].link + "');")
        if(katalogs.katalogs[i].image !== ""){
            img.src = katalogs.katalogs[i].image
        } else {
            img.src = "https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg"
        }
        author.textContent = "par : " + katalogs.katalogs[i].auteur
        descr.textContent = katalogs.katalogs[i].description
        
        ressourceCardContainer.append(card)
        
        ressources[i] = {name: katalogs.katalogs[i].name, description: katalogs.katalogs[i].description, author: katalogs.katalogs[i].auteur, element: card}        
    }
    
    Papa.parse(window.location.pathname + "../../../param.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            EditButtonRedirection(results.data);
        }
    });  
}


function EditButtonRedirection(param) {
    
    const data = param.slice(2);
    
    document.getElementById('EditBtn').setAttribute("href", data[0][0] + 'etc/katalogs/katalogs.csv')
}



function DatamiConstruction(name,link) {

    let grid = document.getElementById('DatamiGrid');
    
    let html = `<!-- DATAMI WIDGET'S HTML BLOCK -->
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
                  usertoken: ""
                  locale="fr"
                ></datami-file> `;
    
    grid.innerHTML = html;
    
    document.getElementById('DatamiBloc').classList.toggle("hide");
    document.getElementById('IndexBloc').classList.toggle("hide");
    document.getElementsByClassName('md-sidebar')[0].classList.toggle("hide");
}
