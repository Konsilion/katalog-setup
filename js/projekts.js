const ressourceCardTemplate = document.querySelector("[data-ressource-template]");
const ressourceCardContainer = document.querySelector("[data-ressource-cards-container]")
let ressources = [];
let katalog_json_file;

var url = window.location.pathname + '../projekts.json';
fetch(url)
    .then(response => response.json())
    .then(json => {
        IndexConstruction(json);
    });



function IndexConstruction(projekts) {
        

    for (let i = 0; i < projekts.projekts.length; i++) {
        
        const card = ressourceCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const link = card.querySelector("[data-link]")
        const img = card.querySelector("[data-img]")
        const author = card.querySelector("[data-author]")
        const descr = card.querySelector("[data-descr]")
                
        header.textContent = projekts.projekts[i].name
        link.setAttribute("onclick","DatamiConstruction('" + projekts.projekts[i].name + "','" + projekts.projekts[i].link + "');")
        if(projekts.projekts[i].image !== ""){
            img.src = projekts.projekts[i].image
        } else {
            img.src = "https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg"
        }
        author.textContent = "par : " + projekts.projekts[i].auteur
        descr.textContent = projekts.projekts[i].description
        
        ressourceCardContainer.append(card)
        
        ressources[i] = {name: projekts.projekts[i].name, description: projekts.projekts[i].description, author: projekts.projekts[i].auteur, element: card}        
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
    
    document.getElementById('EditBtn').setAttribute("href", data[0][0] + 'etc/projekts/projekts.csv')
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
