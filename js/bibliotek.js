let biblioteks = [];
const bibliotekCardTemplate = document.querySelector("[bibliotek-card-template]")
const bibliotekCardContainer = document.querySelector("[biblioteks-grid-container]")
let url_remote = [];
let url_web = [];

OpenBibliotek();
    

const searchBibliotek = document.querySelector("[bibliotek-search]")

searchBibliotek.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  biblioteks.forEach(bibliotek => {
    const isVisible =
      bibliotek.name.toLowerCase().includes(value) || bibliotek.descr.toLowerCase().includes(value)
      bibliotek.element.classList.toggle("hide", !isVisible)
  })
})










window.onload = function() {


    Papa.parse(window.location.pathname + "../../../parametres.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            URLGenerator(results.data);
        }
    });
    

    

    Papa.parse(window.location.pathname + "../home.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlHomeGenerator(results.data);
        }
    });
    
    
    
    

    Papa.parse(window.location.pathname + "../biblioteks-list.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlBibliotekGenerator(results.data);
        }
    });
}





function URLGenerator(content) {   
    
    // content: infos.csv
    
    let data = content.slice(0);
    
    url_remote[0] = data[1][1];
    
    url_web[0] = data[0][1];
}


















function htmlHomeGenerator(content) {   
    
    // content: home.csv
    
    let data = content.slice(1);
    
    let GetElem = document.getElementById('BiblioteksTitle');
    
    let html = `<br>
                <h1 style="display: block;">
                    ` + data[1][0] + `
                    
                    <!-- <a href='` + url_remote + `home.csv' target='_blank'><img width="40px" class="top-logo fit-picture" src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png"></a> -->
                    <a class="a-slide" href='` + url_remote + `home.csv' target='_blank'><img  width="30px" class="top-logo" src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt=""></a>
                </h1>
                <p style="color:#AAA; font-size: 18px; font-weight: 350;">` + data[1][1] + `</p>`;
    
    GetElem.innerHTML += html;
    
    // url_remote[0] = data[1][2];
    
    // url_web[0] = data[1][4];
    
    document.querySelector("[biblioteks-btn-zone]").innerHTML = `<a class="add-slide" onclick="AddBibliotek('` + url_remote + `','` + data[1][3] + `');"><img  width="30px" class="top-logo" style="float:left;" src="https://cdn-icons-png.flaticon.com/512/4211/4211134.png" alt=""></a><br>`    

}









// -----> Créée les gridcards depuis le fichier data.csv
function htmlBibliotekGenerator(content) {   

    // content: bibliotek-list.csv
    
    
    let html = '';
    
    const data = content.slice(2);


    // -----> Boucle de création sur toutes les bibliothèque enregistrées
    data.forEach(function(row, index) {
        Papa.parse(data[index][0] + "bibliotek-info.csv", { 
            download: true,
            delimiter: ";",
            skipEmptyLines: true,
            complete: results => {
                htmlInfoBibliotekGenerator(results.data,index,data[index][0]);
            }
        });           
    });    
    

}









function htmlInfoBibliotekGenerator(info,index,path) {

        // path: chemin de la bibliotek en cours de création
    
        let modify_path = '';
        let import_path = '';
    
        const data = info.slice(2);
    
        const card = bibliotekCardTemplate.content.cloneNode(true).children[0]
        const name = card.querySelector("[bibliotek-name]")
        const descr = card.querySelector("[bibliotek-descr]")
        const link = card.querySelector("[bibliotek-link]")
        
        

         modify_path = url_remote + path.slice(-3)

         import_path = url_web + path.slice(-3)
   

        
        name.innerHTML = '<hr><a class="a-slide" href="' + modify_path + 'bibliotek-info.csv' + '" target="_blank"><img width="25px" class="top-logo fit-picture" src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="Bibliotek logo"> </a><h2>' + data[0][0] + '</h2>';
        
        descr.innerHTML = '<p style="color:#AAA; font-size: 17px; font-weight: 350;">' + data[0][1] + '</p>'
    
        if(path.startsWith('../')) {
            if(path.endsWith('#')) {
                link.innerHTML = '<br><p style="text-align: right; color:#AAA; font-size: 13px; font-weight: 300;"><b>Code d\'import :</b> ' + import_path.replace("#", "") + '</p>';
            } else {
                link.innerHTML = '<br><p style="text-align: right; color:#AAA; font-size: 13px; font-weight: 300;"><b>Code d\'import :</b> ' + import_path + '</p>';
            }
        } else {
            link.innerHTML = '<br><p style="text-align: right; color:#AAA; font-size: 13px; font-weight: 300;"><b>Code d\'import :</b> ' + path + '</p>';
        }

        bibliotekCardContainer.append(card)
      
        biblioteks[index] = {name: data[0][0], descr: data[0][1], element: card}
    
    
        // -----> Création des Katalogs depuis le lien de la bibliotek n°index
        Papa.parse(path + "katalogs/katalogs.csv", { 
            download: true,
            delimiter: ";",
            skipEmptyLines: true,
            complete: results => {
                htmlKatalogGenerator(results.data,(modify_path + "katalogs/katalogs.csv"),data[0][3],path,index);
            }
        });    
}
















        

function htmlKatalogGenerator(content,add,contact,path,num_blibliotek) {
    

    let modify_url = '';

        if (path.startsWith('../')) {
            modify_url = url_remote + path.slice(-3)
        } else {
            modify_url = url_remote + path.slice(-3)
        }
    

    let consult_url = url_web + path.slice(-3)
    
    const card = bibliotekCardContainer.children[num_blibliotek]

    const grid = card.querySelector("[bibliotek-katalogs]")

    // -----> Création du code html des cards Katalogs
    let data = content.slice(2);
    
    let html = '';
    
    data.forEach(function(row, index) {

        html += `<div style="cursor: pointer;" class="card container">
                    <a onclick="KatalogConstruction('` + consult_url + `','` + data[index][0] + `','` + modify_url + `');" target="_blank" data-link>
                        <div class="img" style="background-size: cover; background-image: url('` + data[index][6] + `');"><img src="` + data[index][6] + `" data-img></div>
                        <div class="header" data-header>` + data[index][3] + `</div>
                        <div class="overlay">
                            <p data-descr>` + data[index][5] + `</p>
                        </div>
                    </a>
                </div>`;   
    });
        
    
    html += `<div style="cursor: pointer;" class="card container add-card">
                <div onclick="AddKatalog('` + add + `','` + contact + `','` + path + `');" class="add-img"><img style="filter: grayscale(15%) opacity(20%)" src="https://cdn-icons-png.flaticon.com/512/4732/4732392.png"></div>
            </div>`;     

    grid.innerHTML = html;
    
    
}




































function AddBibliotek(add_link, contact_link) {

    HideClassSwitch('PopupAdd');
    
    HideClassSwitch('Bibliotek');
    
    let ele = document.getElementById('AddStep2');
    
    w3RemoveClass(ele, 'hide');
    
    HideClassSwitch('AddStep2');
    
    // -----> Popup creation
    
    let GetElem = document.getElementById('AddStep1');
    
    html = `<a style="cursor: pointer;" onclick="BiblioteksAddQuit('AddStep2', 'hide'); HideClassSwitch('PopupAdd');HideClassSwitch('Bibliotek');"><i style="color: red;" class="fa-solid fa-xmark"></i> Fermer</a>
                <h2 style="text-align:center;"><b>Créer</b> ou <b>Importer</b> une Bibliothèque</h2>
                <hr>
                <div class="add-choice" style="justify-content: center;">
                    <div onclick="HideClassSwitch('AddStep2');" class="add-card container">
                        <div class="add-img">
                            <img style="filter: opacity(60%)" src="https://cdn-icons-png.flaticon.com/512/7084/7084011.png">
                        </div>
                    </div>
                    <a href="` + add_link + `biblioteks-list.csv" target="_blank" class="add-card container">
                        <div class="add-img">
                            <img style="filter: opacity(60%)" src="https://cdn-icons-png.flaticon.com/512/8364/8364955.png">
                        </div>
                    </a>
                </div>
                <details class="ksln-info"><summary>Vos Bibliotèques déjà enregistrées</summary>
                    <br>
                    <div id="DivBiblioteksIndex"></div>
                </details>`;

    GetElem.innerHTML = html;
    
    
    // -----> Popup ajout step 2

    findLastBibliotek(contact_link, add_link);
    

    PrintBiblioteksPopup();
    
    

}


function BiblioteksAddQuit(name, class_name) {

    let ele = document.getElementById(name);
    
    w3RemoveClass(ele, class_name);
}






function TestAddBibliotek() {
 
    let grid_preview = document.getElementById('AddZoneTest');
    
    const data = document.getElementsByClassName('InputAdd');    
    
    let html = "";
    
    html += '<div style="vertical-align: middle;"><h2 id="' + data[0].value + '"><img style="filter: grayscale(100%);" width="25px" class="fit-picture" src="https://cdn-icons-png.flaticon.com/512/6817/6817478.png">&ensp;' + data[0].value + '</h2>';

    html += '<p style="color:#AAA; font-size: 18px; font-weight: 350;"><br>' + data[1].value + '</p><br></div>';
    
    grid_preview.innerHTML = html;
}





function PrintBiblioteksPopup() {

    // -----> Liste des katalogs
    Papa.parse(window.location.pathname + "../biblioteks-list.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlBiblioteksTableGenerator(results.data);
        }
    });    
}



// -----> Creation du code HTML du tableau d'affichage des filtres
function htmlBiblioteksTableGenerator(content) {

    const save_columns = [0]
    
    let preview = document.getElementById("DivBiblioteksIndex");

    let html = '<table id="table_table_biblioteks_index" class="display table align-middle" style="width:100%">';

    if (content.length == 0 || typeof(content[0]) === 'undefined') {
        return null
    } else {
        
        const header = ["Codes d'imports renseignés"];
        const data = content.slice(2);
        
        html += '<thead class="table-dark">';
        html += '<tr>';
        html += '<th class="ellipsis">' + header[0] + '</th>';
        html += '</tr>';
        html += '</thead>';
        
        html += '<tbody>';

        data.forEach(function(row) {
            html += '<tr>';
            row.forEach(function(colData, index) {            
                if(colData.startsWith('../')) {
                    html += '<td class="ellipsis"><b>' + colData.replace("../", window.location.href.replace("#", "")) + '</b></td>';
                } else {
                    html += '<td class="ellipsis">' + colData + '</td>';
                }
            });
            html += '</tr>';
        });

        html += '</tbody>';
        html += '</table>';

        // insert table element into csv preview
        preview.innerHTML = html;

        // initialise DataTable
        initDataTable("#table_table_biblioteks_index");
    }
}










function AddKatalog(add_link, contact_link, url) {

    HideClassSwitch('PopupAdd');
    
    HideClassSwitch('Bibliotek');

    // -----> Popup creation
    
    let GetElem = document.getElementById('AddStep1');
    
    html = `<a style="cursor: pointer;" onclick="HideClassSwitch('PopupAdd');HideClassSwitch('Bibliotek');"><i style="color: red;" class="fa-solid fa-xmark"></i> Fermer</a>
                <hr>
                <h2>Ajouter un <b>Katalog</b></h2>
                <hr>
                <details class="ksln-info"><summary>Le registre des Katalogs actuels</summary>
                    <br>
                    <div id="DivKatalogsIndex"></div>
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
                <p>Si vous possèdez un <b>compte GitHub</b>, vous pouvez ajouter directement cette Bibliotek.</p>
                <a href="` + add_link + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-brands fa-github"></i> Directement</button>
                </a>
                <br><br><br>
                <p>Vous pouvez nous transmettre le lien d'import cliquant sur le <b>bouton ci-dessous</b>.</p>
                <a href="` + contact_link + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-solid fa-plus"></i> Par prise de contact</button>
                </a>`;
    
    GetElem.innerHTML = html;
    
    
    PrintKatalogsPopup(url);
}


function PrintKatalogsPopup(location) {

    // -----> Liste des katalogs
    Papa.parse(location + "katalogs/katalogs.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlKatalogsTableGenerator(results.data);
        }
    });    
}



// -----> Creation du code HTML du tableau d'affichage des filtres
function htmlKatalogsTableGenerator(content) {

    const save_columns = [0,3,5]
    
    let preview = document.getElementById("DivKatalogsIndex");

    let html = '<table id="table_katalogs_index" class="display table align-middle" style="width:100%">';

    if (content.length == 0 || typeof(content[0]) === 'undefined') {
        return null
    } else {
        
        const header = ["ID","Designation","Description"];
        const data = content.slice(2);
        
        html += '<thead class="table-dark">';
        html += '<tr>';
        html += '<th class="ellipsis">' + header[0] + '</th>';
        html += '<th class="ellipsis">' + header[1] + '</th>';
        html += '<th class="ellipsis">' + header[2] + '</th>';
        html += '</tr>';
        html += '</thead>';
        
        html += '<tbody>';

        data.forEach(function(row) {
            html += '<tr>';
            row.forEach(function(colData, index) {            
                if(save_columns.includes(index)) {
                    html += '<td class="ellipsis">' + colData + '</td>';
                }
            });
            html += '</tr>';
        });

        html += '</tbody>';
        html += '</table>';

        // insert table element into csv preview
        preview.innerHTML = html;

        // initialise DataTable
        initDataTable("#table_table_katalogs_index");
    }
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
        
    CopyAddCode();
    
}





function findLastBibliotek(contact,add) {

    // -----> Liste des katalogs
    Papa.parse(window.location.pathname + "../biblioteks-list.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            findLastBibliotekResult(results.data,contact,add);
        }
    });      
}

function findLastBibliotekResult(content,contact,add) {

    
    let max = 00;
    
    const data = content.slice(2);
    
    let preview = document.getElementById("AddStep2");

    if (content.length == 0 || typeof(content[0]) === 'undefined') {
        return null
    } else {
        
        let html = '<div>';

        data.forEach(function(row,index) {
            if(data[index][0].startsWith('../')){  
                if(max < data[index][0].split('/')[1]){max = data[index][0].split('/')[1];}
            }
        });

                    
        html += 'Vous devez renseigner ce code d\'import dans une nouvelle ligne<b> : &ensp;&ensp;../0' + (+max + 1) + '/</b>';  
        
        html += '</div>';
        
        
        html += `<div style="text-align:center;">
                <a href="` + add + `biblioteks-list.csv" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-brands fa-github"></i> Directement</button>
                </a>
                <a href="` + contact + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-solid fa-plus"></i> Par prise de contact</button>
                </a>
            </div><br>`;        

            
        // insert table element into csv preview
        preview.innerHTML = html;
    }
    
    
    
    
    
    

}
