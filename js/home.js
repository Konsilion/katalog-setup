// Mise à zéro des filtres et de la fonction de recherche avancée 'Et/Ou'

var filters = [];
var toggle = 0;
const fromDb = undefined;
//var arr_filters = [[]];
let arr_filters;


// Transformations CSV vers HTML
window.onload = function() {

    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(window.location.pathname + "../home.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlGridGenerator(results.data);
        }
    });    
}







// ========== LES FONCTIONS DE CREATION HTML =============


// -----> Créée les gridcards depuis le fichier data.csv
function htmlGridGenerator(content) {   
    
    let NewWindow = "";
    
    let Ilogo = "";
    
    let grid_preview = document.getElementById('grid-preview');
    
    let html = '<div style="text-align: center; justify-content: center; margin: 0px auto;"  id="grid-show" class="grid-container">';
    
    const data = content.slice(3);
    
    data.forEach(function(row, index) {
        
        if(data[index][3].startsWith("http")){
            NewWindow="_blank";
            Ilogo='<i style="color:var(--md-primary-fg-color);" class="fa-solid fa-share-nodes"></i>';
        } else {
            NewWindow="_self";
            Ilogo=''
        };

            html += '<div class="container">';
               html += '<a href="' + data[index][3] + '" target="' + NewWindow + '">'; 
                    html += '<div class="column_catalog">';
                        if(data[index][1] !== ""){html += '<div class="img_grid"><img class="img_card" src="' + data[index][2] + '"></div>';} else {html += '<div class="img_grid"><img class="img_card" src="https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg"></div>';}
                        html += '<div class="card-title">';
                            html += '<p><b>' + data[index][0] + '</b>&ensp;' + Ilogo + '</p>';
                        html += '</div>';
                    html += '</div>';
                html += '</a>';
                html += '<a href="' + data[index][3] + '" target="' + NewWindow + '"><div class="overlay"><div class="text"><p>' + data[index][1] + '</p></div></div></a>';
            html += '<a style="display: none;"><p>' + data[index][1] + '</p></a></div>';
    });

    html += '</div>';

    grid_preview.innerHTML = html;
}



function TestAddProject () {
 
    let html = "";
    
    let grid_preview = document.getElementById('TestZoneAdd');
    
    const data = document.getElementsByClassName('InputAdd');

            html += '<div style="max-width: 350px;" class="container">';
               html += '<a href="' + data[3].value + '" target="_blank">'; 
                    html += '<div class="column_catalog">';
                        if(data[2].value !== ""){html += '<div class="img_grid"><img class="img_card" src="' + data[2].value + '"></div>';} else {html += '<div class="img_grid"><img class="img_card" src="https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg"></div>';}
                        html += '<div class="card-title">';
                            html += '<p><b>' + data[0].value + '</b></p>';
                        html += '</div>';
                    html += '</div>';
                html += '</a>';
                html += '<a href="' + data[3].value + '" target="_blank"><div class="overlay"><div class="text"><p>' + data[1].value + '</p></div></div></a>';
            html += '<a style="display: none;"><p>' + data[1].value + '</p></a></div></div>';
    
    grid_preview.innerHTML = html;
        
    if(document.getElementById("AddStep2").classList.contains("hide")) {
        HideClassSwitch("CopyCodeAdd");
        HideClassSwitch("AddStep2");
    };
    
}



function HideClassSwitch(id){
    document.getElementById(id).classList.toggle("hide");
}


function CopyAddCode() {

    const data = document.getElementsByClassName('InputAdd');  

    let code = "";

    for (var i = 0, len = data.length; i < len; i++) {
            code += data[i].value + ';';
    }      
    
    code = code.slice(0, -1);
    
    // Copy the text inside the text field
    navigator.clipboard.writeText(code);
    navigator.clipboard.writeText(code);

    // Alert the copied text
    alert("Texte copier : " + code);
    
}
