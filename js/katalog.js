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
