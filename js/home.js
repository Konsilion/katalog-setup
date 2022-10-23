let biblioteks = [];
const bibliotekCardTemplate = document.querySelector("[bibliotek-card-template]")
const bibliotekCardContainer = document.querySelector("[biblioteks-grid-container]")



const searchBibliotek = document.querySelector("[bibliotek-search]")

searchBibliotek.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  biblioteks.forEach(bibliotek => {
    const isVisible =
      bibliotek.name.toLowerCase().includes(value) || bibliotek.descr.toLowerCase().includes(value)
      bibliotek.element.classList.toggle("hide", !isVisible)
  })
})









// Transformations CSV vers HTML
window.onload = function() {

    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(window.location.pathname + "../home.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlHomeGenerator(results.data);
        }
    });
    
    
    
    
    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(window.location.pathname + "../biblioteks-list.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlBibliotekGenerator(results.data);
        }
    });    
    
    
    
    
}


// ========== LES FONCTIONS DE CREATION HTML =============

// -----> Créée les gridcards depuis le fichier data.csv
function htmlHomeGenerator(content) {   
    
    let data = content.slice(1);
    
    let GetElem = document.getElementById('BiblioteksTitle');
    
    let html = `<br>
                <h1 style="display: block;">
                    ` + data[1][0] + `
                    &ensp;&ensp;<img style="float:right;margin: 15px 10px;" width="95px" class="fit-picture" src="https://cdn-icons-png.flaticon.com/512/2206/2206433.png" alt="Bibliotek logo">
                </h1>
                <p style="color:#AAA; font-size: 18px; font-weight: 350;">` + data[1][1] + `</p>`;  
    
    GetElem.innerHTML += html;        
}









// -----> Créée les gridcards depuis le fichier data.csv
function htmlBibliotekGenerator(content) {   
    
    let html = '';
    
    const data = content.slice(2);
    
    data.forEach(function(row, index) {
        
        const card = bibliotekCardTemplate.content.cloneNode(true).children[0]

        const name = card.querySelector("[bibliotek-name]")
        const descr = card.querySelector("[bibliotek-descr]")
        
        name.innerHTML = '<img style="filter: grayscale(40%) opacity(80%); float:right;margin: 15px 5px;" width="50px" class="fit-picture" src="https://cdn-icons-png.flaticon.com/512/2206/2206433.png" alt="Bibliotek logo">' + data[index][0]
        
        descr.innerHTML = '<p style="color:#AAA; font-size: 17px; font-weight: 350;">' + data[index][1] + '</p>'

        
        bibliotekCardContainer.append(card)
      
        biblioteks[index] = {name: data[index][0], descr: data[index][1], element: card}
 
        
        
        
        
        // -----> Création des Katalogs depuis le lien de la bibliotek n°index
        Papa.parse(data[index][2] + "katalogs/katalogs.csv", { 
            download: true,
            delimiter: ";",
            skipEmptyLines: true,
            complete: results => {
                htmlKatalogGenerator(results.data,data[index][0],data[index][1],data[index][2],data[index][3],data[index][4],index);
            }
        });
    });    

}




        

function htmlKatalogGenerator(content,name,descr,url,add,contact,num_blibliotek) {
    
    const card = bibliotekCardContainer.children[num_blibliotek]

    const grid = card.querySelector("[bibliotek-katalogs]")

    // -----> Création du code html des cards Katalogs
    let data = content.slice(1);
    
    let html = '';
    
    data.forEach(function(row, index) {
        
        html += `<div style="cursor: pointer;" class="card container">
                    <a onclick="KatalogConstruction('` + url + `','` + data[index][0] + `');" target="_blank" data-link>
                        <div class="img"><img src="` + data[index][6] + `" data-img></div>
                        <div class="header" data-header>` + data[index][3] + `</div>
                        <div class="overlay">
                            <p data-descr>` + data[index][5] + `</p>
                        </div>
                    </a>
                </div>`;   
    });
        
    
    html += `<div style="cursor: pointer;" class="card container add-card">
                <div onclick="AddKatalog('` + add + `','` + contact + `');" class="add-img"><img style="filter: grayscale(15%) opacity(20%)" src="https://cdn-icons-png.flaticon.com/512/4732/4732392.png"></div>
            </div>`;     
    
    
    
    grid.innerHTML = html;
    
}




































function AddBibliotek(add_link, contact_link) {

    HideClassSwitch('PopupAdd');
    
    HideClassSwitch('Bibliotek');
    
    // -----> Popup creation
    
    let GetElem = document.getElementById('AddStep1');
    
    html = `<a href="#" onclick="HideClassSwitch('AddStep2');HideClassSwitch('PopupAdd');HideClassSwitch('Bibliotek');"><i style="color: red;" class="fa-solid fa-xmark"></i> Fermer</a>
                <hr>
                <h2>Ajouter une <b>Bibliotek</b></h2>
                <hr>
                <div style="text-align:center;">
                    <input type="text" class="InputAdd" id="AddDesi" placeholder="Désignation">
                    <input type="text" class="InputAdd" id="AddDescr" placeholder="Description">
                    <input type="text" class="InputAdd" id="AddWeb" placeholder="Lien d'import de la bibliotek : https://...">
                    <br><button class="btn neumorphic-btn" onclick="TestAddBibliotek();">Copier le code d'ajout</button>
                </div><br>
                <div id="AddZoneTest"></div>`;

    GetElem.innerHTML = html;
    
    
    // -----> Popup ajout step 2
    
    GetElem = document.getElementById('AddStep2');
    
    html = `<hr>
                <p>Vous pouvez nous transmettre le code d'ajout par le biais de notre <b>formulaire contact</b>.</p>
                <a href="` + contact_link + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-solid fa-plus"></i> Ajouter la Bibliotek</button>
                </a>
                <hr>
                <p>Si vous possèdez un <b>compte GitHub</b>, vous pouvez ajouter directement cette Bibliotek.</p>
                <a href="` + add_link + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-brands fa-github"></i> Ajouter la Bibliotek</button>
                </a>`;
    
    GetElem.innerHTML = html;
}


function TestAddBibliotek() {
 
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









function AddKatalog(add_link, contact_link) {

    HideClassSwitch('PopupAdd');
    
    HideClassSwitch('Bibliotek');
    
    // -----> Popup creation
    
    let GetElem = document.getElementById('AddStep1');
    
    html = `<a href="#" onclick="HideClassSwitch('AddStep2');HideClassSwitch('PopupAdd');HideClassSwitch('Bibliotek');"><i style="color: red;" class="fa-solid fa-xmark"></i> Fermer</a>
                <hr>
                <h2>Ajouter un <b>Katalog</b></h2>
                <hr>
                <details class="ksln-info"><summary>Les différents filtres de ce Katalog</summary>
                    <br>
                    <div id="DivFlt1"></div>
                    <hr>
                    <div id="DivFlt2"></div>
                </details>
                <div style="text-align:center;">
                    <input type="text" class="InputAdd" id="AddID" placeholder="ID - unique">
                    <input type="text" class="InputAdd" id="AddLinkAdd" placeholder="Lien d'ajout de ressources : https://">
                    <input type="text" class="InputAdd" id="AddCopyright" placeholder="Copyright">
                    <input type="text" class="InputAdd" id="AddDesi" placeholder="Designation du Katalog">
                    <input type="text" class="InputAdd" id="AddContact" placeholder="Lien de contact : https://">
                    <input type="text" class="InputAdd" id="AddDescr" placeholder="Description">
                    <input type="text" class="InputAdd" id="AddImg" placeholder="Lien vers une image (optionnel) : https://">
                    <br><button class="btn neumorphic-btn" onclick="TestAddKatalog();">Copier le code d'ajout</button>
                </div><br>
                <div id="AddZoneTest"></div>`;

    GetElem.innerHTML = html;
    
    
    // -----> Popup ajout step 2
    
    GetElem = document.getElementById('AddStep2');
    
    html = `<hr>
                <p>Vous pouvez nous transmettre le code d'ajout par le biais de notre <b>formulaire contact</b>.</p>
                <a href="` + contact_link + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-solid fa-plus"></i> Ajouter votre projet</button>
                </a>
                <hr>
                <p>Si vous possèdez un <b>compte GitHub</b>, vous pouvez ajouter directement votre projet.</p>
                <a href="` + add_link + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-brands fa-github"></i> Ajouter votre projet</button>
                </a>`;
    
    GetElem.innerHTML = html;
}


function TestAddKatalog() {
 
    let html = "";
    
    let grid_preview = document.getElementById('AddZoneTest');
    
    const data = document.getElementsByClassName('InputAdd');
        
    html += '<div style="max-width: 350px;" class="container">';
            html += '<div class="column_catalog">';
                if(data[6].value !== ""){html += '<div class="img_grid"><img class="img_card" src="' + data[6].value + '"></div>';} else {html += '<div class="img_grid"><img class="img_card" src="https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg"></div>';}
                html += '<div class="card-title">';
                    html += '<p>' + data[3].value + '</p>';
                html += '</div>';
            html += '</div>';
        html += '<div class="overlay"><div class="text"><p>' + data[5].value + '</p></div></div>';
    html += '</div>';
    
    grid_preview.innerHTML = html;
        
    if(document.getElementById("AddStep2").classList.contains("hide")) {
        HideClassSwitch("AddStep2");
    };
    
    CopyAddCode();
    
}
