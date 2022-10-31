let klouds = [];
const kloudCardTemplate = document.querySelector("[kloud-card-template]")
const kloudCardContainer = document.querySelector("[klouds-grid-container]")

let url_remote = "";
let url_web = "";


// Transformations CSV vers HTML
window.onload = function() {


    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(window.location.pathname + "../../../parametres.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            GetURLs(results.data);
        }
    });    
    
    
    
    
    
    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(window.location.pathname + "../home.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlTitleKloudGenerator(results.data);
        }
    });
    

    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(window.location.pathname + "../klouds-list.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlKloudGenerator(results.data,(window.location.pathname + "../klouds-list.csv"));
        }
    });    
}



function GetURLs(bibl_info){

    let data = bibl_info.slice(0);

    url_web = data[0][1];
    
    url_remote = data[1][1];
    
}





// ========== LES FONCTIONS DE CREATION HTML =============

// -----> Créée les gridcards depuis le fichier data.csv
function htmlTitleKloudGenerator(content) {   

    let data = content.slice(1);
    
    let GetElem = document.getElementById('KloudsTitle');
    
    let html = `<br>
                <h1 style="display: block;">
                    ` + data[1][0] + `
                    <a class="a-slide" href="` + url_remote + `../klouds/home.csv" target="_blank"><img style="" width="30px" class="top-logo fit-picture" src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Bibliotek logo"></a>
                </h1>
                <p style="color:#AAA; font-size: 18px; font-weight: 350;">` + data[1][1] + `</p>`; 
    
    GetElem.innerHTML += html;

}









// -----> Créée les gridcards depuis le fichier data.csv
function htmlKloudGenerator(content) {   
    
    let card = document.getElementById("KloudsGrid");

    // -----> Création du code html des cards Katalogs
    let data = content.slice(2);
    
    let html = '';
    
    data.forEach(function(row, index) {
        
        html += `<div style="cursor: pointer;" class="card container">
                    <a href="` + data[index][2] + `");" target="_blank" data-link>
                        <div class="img"><img src="` + data[index][3] + `" data-img></div>
                        <div class="header" data-header>` + data[index][0] + `</div>
                        <div class="overlay">
                            <p data-descr>` + data[index][1] + `</p>
                        </div>
                    </a>
                </div>`;
        
    });

    html += `<div style="cursor: pointer;" class="card container add-card">
                <a href="` + url_remote + `../klouds/klouds-list.csv" target="_blank"><div class="add-img"><img style="filter: grayscale(100%) opacity(20%)" src="https://cdn-icons-png.flaticon.com/512/892/892258.png"></div></a>
            </div>`;
    
    
    card.innerHTML += html;

}






































function AddKloud(add_link, contact_link) {

    HideClassSwitch('PopupAdd');
    
    HideClassSwitch('Kloud');
    
    // -----> Popup creation
    
    let GetElem = document.getElementById('AddStep1');
    
    html = `<a href="#" onclick="HideClassSwitch('AddStep2');HideClassSwitch('PopupAdd');HideClassSwitch('Kloud');"><i style="color: red;" class="fa-solid fa-xmark"></i> Fermer</a>
                <hr>
                <h2>Ajouter un <b>Kloud</b></h2>
                <hr>
                <div style="text-align:center;">
                    <input type="text" class="InputAdd" id="AddDesi" placeholder="Désignation">
                    <input type="text" class="InputAdd" id="AddDescr" placeholder="Description">
                    <input type="text" class="InputAdd" id="AddWeb" placeholder="Lien d'import de la kloud : https://...">
                    <br><button class="btn neumorphic-btn" onclick="TestAddKloud();">Copier le code d'ajout</button>
                </div><br>
                <div id="AddZoneTest"></div>`;

    GetElem.innerHTML = html;
    
    
    // -----> Popup ajout step 2
    
    GetElem = document.getElementById('AddStep2');
    
    html = `<hr>
                <p>Vous pouvez nous transmettre le code d'ajout par le biais de notre <b>formulaire contact</b>.</p>
                <a href="` + contact_link + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-solid fa-plus"></i> Ajouter la Kloud</button>
                </a>
                <hr>
                <p>Si vous possèdez un <b>compte GitHub</b>, vous pouvez ajouter directement cette Kloud.</p>
                <a href="` + add_link + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-brands fa-github"></i> Ajouter la Kloud</button>
                </a>`;
    
    GetElem.innerHTML = html;
}


function TestAddKloud() {
 
    let grid_preview = document.getElementById('AddZoneTest');
    
    const data = document.getElementsByClassName('InputAdd');    
    
    let html = "";
    
    html += '<div style="vertical-align: middle;"><h2 id="' + data[0].value + '"><img style="filter: grayscale(100%);" width="25px" class="fit-picture" src="https://cdn-icons-png.flaticon.com/512/6817/6817478.png">&ensp;' + data[0].value + '';

    html += '<p style="color:#AAA; font-size: 18px; font-weight: 350;"><br>' + data[1].value + '</p><br></div>';
                    
    if(document.getElementById("AddStep2").classList.contains("hide")) {
        HideClassSwitch("AddStep2");
    };
    
    grid_preview.innerHTML = html;
    
    CopyAddCode();
    
}
