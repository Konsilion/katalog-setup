// Mise à zéro des filtres et de la fonction de recherche avancée 'Et/Ou'
var param_results = [];
var filters = [];
var toggle = 0;
const fromDb = undefined;
var arr_filters = [];

let ressources = [];
const ressourceCardTemplate = document.querySelector("[data-ressource-template]")
const ressourceCardContainer = document.querySelector("[data-ressource-cards-container]")




const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  ressources.forEach(ressource => {
    const isVisible =
      ressource.name.toLowerCase().includes(value) || ressource.description.toLowerCase().includes(value) || ressource.author.toLowerCase().includes(value)
      ressource.element.classList.toggle("hide", !isVisible)
  })
})










// Transformations CSV vers HTML
function KatalogConstruction(location,name) {
    
    // ---> location : origine de la bibliotek   |   name : ID katalog

    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(location + "katalogs/ressources.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlGridGenerator(csvExtractionKatalog(results.data,name),location,name);
        }
    });
    

    // -----> Données de votre liste de projet - Gridcard

    Papa.parse(location + "katalogs/katalogs.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlParamGenerator(csvExtractionKatalog(results.data,name),location,name);
        }
    });
    
 
    // -----> Lancement du script starter - Ecoute des actions sur boutons par exemple
    var extra_js = document.createElement('script');

    extra_js.setAttribute('src','https://konsilion.github.io/katalog-setup/js/starter.js');

    document.head.appendChild(extra_js);
    
    KatalogSwitch();
}











function csvExtractionKatalog(content,name) {
    
    const data = content.slice(0);
    
    var new_arr = new Array();
    // or var arr = [];

    data.forEach(function(row, index) {
        
        if (data[index][0] == name){
            new_arr.push(data[index]);
        };    
    });

    return new_arr;  
}



function KatalogSwitch(){ 
    HideClassSwitch('LoaderContainer');
    HideClassSwitch('Bibliotek');
    
    setTimeout(function(){
        HideClassSwitch('Katalog');
        all_grid();
        HideClassSwitch('LoaderContainer');
    }, 1000);
};


function BibliotekSwitch(){
    ele = document.getElementById('FiltersZone');
    w3RemoveClass(ele, "show");
    w3AddClass(ele, "hide")
    
    w3RemoveClass(document.getElementById('FilterBtn'), "active");
    
    HideClassSwitch('Katalog');
    HideClassSwitch('Bibliotek');
};

function OpenBibliotek(){ 
    
    HideClassSwitch('Bibliotek');    
    HideClassSwitch('LoaderContainer');

    setTimeout(function(){
        HideClassSwitch('Bibliotek');
        all_grid();
        HideClassSwitch('LoaderContainer');
    }, 1000);
};








// ========== LES FONCTIONS DE CREATION HTML =============


// -----> Créée le filtres principaux
function htmlFilterGenerator(content,name) {

    const all = "'all'"
    
    let grid_filter = document.getElementById('Filter1Zone');
    
    //let html = '<button class="btn neumorphic-btn btn-reset" id="BtnReset" onclick="all_grid()"><i class="fa-solid fa-rotate-left"></i></button><br><br>';
    
    let html = '<hr><b>' + name + '</b><br>';
    
    const data = content.slice(0);
    
    data.forEach(function(row, index) {    
        html += '<button class="neumorphic-btn filtre ' + data[index][1] + '" onclick="modifFilters(this,\'' + data[index][1] + '\')"> ' + data[index][2] + '</button>';
    });
    
    grid_filter.innerHTML = html;
}



// -----> Créée le filtres secondaires
function html_s_FilterGenerator(content,name) {

    let grid_s_filter = document.getElementById('Filter2Zone');

    let html = '<b>' + name + '</b><br>';
    
    const data = content.slice(0);
    
    data.forEach(function(row, index) {
        
        html += '<button class="neumorphic-btn filtre ' + data[index][1] + '" onclick="modifFilters(this,\''+ data[index][1] +'\');"> ' + data[index][2] + '</button>'
    });
    
    grid_s_filter.innerHTML = html;
}



// -----> Créée les gridcards depuis le fichier data.csv
function htmlGridGenerator(content,location,name) {   
    
    const data = content.slice(0);
        
    document.getElementById("CardGrid").innerHTML = "";
    
        
    //document.getElementById("CardGrid").innerHTML += `
    //    <div onclick="AddResources('` + location + `','` + name + `');" style="cursor: pointer;" class="card container add-card">
    //        <div class="add-img"><img style="filter: grayscale(20%) opacity(40%)" src="https://cdn-icons-png.flaticon.com/512/7235/7235503.png"></div>
    //    </div>`;
    
    data.forEach(function(row, index) {
        const card = ressourceCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const link = card.querySelector("[data-link]")
        const img = card.querySelector("[data-img]")
        const author = card.querySelector("[data-author]")
        const descr = card.querySelector("[data-descr]")
        
        card.classList.add("filterDiv")
        card.classList.add.apply(card.classList, data[index][4].split(" "))
        header.textContent = data[index][1]
        link.href = data[index][3]
        if(data[index][5] !== ""){
            img.src = data[index][5]
        } else {
            img.src = "https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg"
        }
        author.textContent = "par : " + data[index][6]
        descr.textContent = data[index][2]
        
        ressourceCardContainer.append(card)
        
        ressources[index] = {name: data[index][1], description: data[index][2], author: data[index][6], element: card}
    });
}





// -----> Creation du code HTML du tableau des données
function htmlTableGenerator(content) {

    let csv_preview = document.getElementById('TabPreview');

    let html = '<table id="TableGrid" class="display table table-hover table-striped align-middle" style="width:100%">';

    if (content.length == 0 || typeof(content[0]) === 'undefined') {
        return null
    } else {
        var header = ["ID Katalog" , "Nom de la ressource" , "Description" , "Lien de redirection" , "ID Filters" ," Image" , "Auteur.ices"];
        const data = content.slice(0);

        html += '<thead class="table-dark">';
        html += '<tr>';
        header.forEach(function(colData) {
            html += '<th class="ellipsis">' + colData + '</th>';
        });
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        data.forEach(function(row) {
            if (header.length === row.length) {
                html += '<tr>';
                row.forEach(function(colData, index) {            
                    if (index == 3) {
                        html += '<td class="ellipsis"><a href="' + colData + '" target="_blank">' + colData + '</a></td>';
                    } else {
                        html += '<td class="ellipsis">' + colData + '</td>';
                    };
                });
                html += '</tr>';
            }
        });

        html += '</tbody>';
        html += '</table>';

        // insert table element into csv preview
        csv_preview.innerHTML = html;

        // initialise DataTable
        $('#TableGrid').dataTable({
            scrollX: true,
            scrollY: (window.innerHeight / 1.80) + "px",
            dom: 'Bfrtip',
            columnDefs: [
                { targets: [1, 2, 3, 6], visible: true},
                { targets: '_all', visible: false }
            ],
            order: [[0, 'asc']],
            buttons: [
                'colvis',
                'copy', 
                {
                    extend: 'csv',
                    text: 'Télécharger',
                    exportOptions: {
                        columns: ':visible'
                    }
                }
            ]
        })
    }
}









// -----> Créée l'encadré des paramètres avancés
function htmlParamGenerator(content,location,name) {

    const data = content.slice(0);
    
    // -----> Filtres principaux
    Papa.parse(location + "katalogs/filters1.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            arr_filters = arr_filters.concat(results.data);
            htmlFilterGenerator(csvExtractionKatalog(results.data,name),data[0][7]);
        }
    });     
    
    
    // -----> Filtres secondaire
    Papa.parse(location + "katalogs/filters2.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            arr_filters = arr_filters.concat(results.data);
            html_s_FilterGenerator(csvExtractionKatalog(results.data,name),data[0][8]);
        }
    });  
    
    
    let param_zone = document.getElementById('SearchParam');   
    
    let html = '<details id="ParamDetail" class="tip"><summary>Paramètre avancé de recherche</summary>';       
      
    // -----> Activer la recherche croisée - A SORTIR DE CE BLOC PARAMETRES
    
    html += '<div class="item">';
        
    html += '<p style="font-style: italic; padding-left:15px;"> • Activer la recherche dite "Ou" moins exigeante que "Et", elle recoupe plus de résultats au détriment de la précision.</p>';
        
    html += '<label id="combo-search-switch" title="Recherche combinée" class="switch"><input onclick="toggle_search_or_and();" type="checkbox"><span id="span-toggle" class="slider round"></span></label></div>';  
    
    html += "</details>";
    
    param_zone.innerHTML = html;

    
    // -----> Copyright
    
    let copyright_zone = document.getElementById('CopyrightZone'); 
    
    html = '<p style="margin:10px;text-align:center;color:#CAC7C7;font-size:14px;"><img style="filter: grayscale(100%);height:40px;left-margin:100px;" src="https://konsilion.fr/wp/wp-content/uploads/2022/03/Logo_Konsilion_1.png"><br><br>' + data[0][2] + '</p>';

    copyright_zone.innerHTML = html;
    
        
    // -----> Ajouter la barre de navigation
    
    let btn_zone = document.getElementById('SubButtons'); 
    
    html = '<button id="ShowNav" class="btn neumorphic-btn active hide" onclick="ShowMobileNav();HideClassSwitch(\'KatalogDescr\')"><i class="fa-solid fa-eye"></i></button>';
    
    
    
    btn_zone.innerHTML = html;
    
    
    // -----> Titre et Butons navigation
    
    let katalog_title = document.getElementById('KatalogTitle'); 
    
    html = `<h2 style="color:#6D6D6D; font-size: 30px; margin:0px auto;">` + data[0][3] + `&emsp; 
                <img onclick="AddResources('` + location + `','` + name + `');" width="125px" class="top-logo fit-picture" src="../../images/Add_Ressources.png" alt="Bibliotek logo">
                <button id="ReturnKatalog" class="btn neumorphic-btn" onclick="BibliotekSwitch();">
                    <i class="fa-solid fa-person-walking-arrow-loop-left"></i>
                </button>
                <button class="btn neumorphic-btn" onclick="htmlTableSwitch('` + location + `','` + name + `');"><i class="fa-solid fa-table-list" id="BtnSwitch"></i></button>
                <p style="color:#AAA; font-size: 18px; font-weight: 350;"><br>` + data[0][5] + `</p>
            </h2>`;
    
    katalog_title.innerHTML = html;
    
    
    
    // -----> Popup creation
    
    let GetElem = document.getElementById('AddStep1');
    
    html = `<a style="cursor: pointer;" onclick="HideClassSwitch('PopupAdd');HideClassSwitch('Katalog');"><i style="color: red;" class="fa-solid fa-xmark"></i> Fermer</a>
                <hr>
                <h2>Décrivez-nous votre <b>ressource</b> :</h2>
                <hr>
                <details class="ksln-info"><summary>Les différents filtres de ce Katalog</summary>
                    <br>
                    <div id="DivFlt1"></div>
                    <hr>
                    <div id="DivFlt2"></div>
                </details>
                <div style="text-align:center;">
                    <input type="text" class="InputAdd" id="AddDesi" placeholder="Désignation">
                    <input type="text" class="InputAdd" id="AddDescr" placeholder="Description">
                    <input type="text" class="InputAdd" id="AddWeb" placeholder="Lien de redirection : https://...">
                    <input type="text" class="InputAdd" id="AddFilt" placeholder="Filtres à appliquer">
                    <input type="text" class="InputAdd" id="AddImg" placeholder="Lien vers une images (optionnel) : https://">
                    <input type="text" class="InputAdd" id="AddPers" placeholder="Auteur.ices et partenaires">
                    <br><button class="btn neumorphic-btn" onclick="TestAddRessource();">Copier le code d'ajout</button>
                </div><br>
                <div id="AddZoneTest"></div>`;

    GetElem.innerHTML = html;
    
    
    // -----> Popup ajout step 2
    
    GetElem = document.getElementById('AddStep2');
    
    console.log(location)
    
    html = `<hr>
                <p>Si vous possèdez un <b>compte GitHub</b>, vous pouvez ajouter directement votre ressource.</p>
                <a href="` + location + "katalogs/ressources.csv" + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-brands fa-github"></i> Directement en 2 clics</button>
                </a>
                <hr>
                <p>Vous pouvez nous transmettre le code d'ajout par le biais de notre <b>formulaire contact</b>.</p>
                <a href="` + data[0][4] + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-solid fa-plus"></i> Par une prise de contact</button>
                </a>`;
    
    GetElem.innerHTML = html;
    
    
    
    
    
}


function AddResources(location,name) {

    HideClassSwitch('PopupAdd');
    
    HideClassSwitch('Katalog');
    
    PrintFilterPopup(location, name);
}







function PrintFilterPopup(location, name) {

    // -----> Filtres principaux
    Papa.parse(location + "/katalogs/filters1.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlFiltersTableGenerator(csvExtractionKatalog(results.data,name),"Flt1");
        }
    });    

    // -----> Filtres secondaire
    Papa.parse(location + "/katalogs/filters2.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlFiltersTableGenerator(csvExtractionKatalog(results.data,name),"Flt2");
        }
    });
}

















// ========== LES FONCTIONS POUR ACTIONS SUR FILTRES DES GRIDCARDS =============


// -----> Supprime la class 'show' si existante sinon ajouter cette classe
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}



// -----> Change la valeur de la variable toggle 'Recherche Et/Ou'
function toggle_search_or_and() {
    if(toggle > 0){toggle = 0;} else {toggle = 1;};
    all_grid();
}



// -----> Affiche toute les gridcard enregistrées
function all_grid() {
  reset_grid();  
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    w3AddClass(x[i], "show")
  }
}



function reset_grid() {

    x = document.getElementsByClassName("filterDiv");
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");  
    }

    // Add or remove active class to the current button
    var btnContainer = document.getElementById("Filter2Zone");
    var btns = btnContainer.getElementsByClassName("neumorphic-btn");
    for (var i = 0; i < btns.length; i++) {   
        btns[i].className = btns[i].className.replace(" active", "");
    }
    
    // Add or remove active class to the current button
    var btnContainer = document.getElementById("Filter1Zone");
    var btns = btnContainer.getElementsByClassName("neumorphic-btn");
    for (var i = 0; i < btns.length; i++) {   
        btns[i].className = btns[i].className.replace(" active", "");
    }
    
    filters=[];
    
    listFilters();
}


// -----> Compare la liste des filtres en cours filters [] avec les classe des gridcards
function filterShow(c) {
    var x, i;
    //Recuperation de tous les éléments soumis à filtration 'filterDiv'  
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";  
    //Recherche 'Ou'
    if(toggle > 0){
        for (i = 0; i < x.length; i++) {
            w3RemoveClass(x[i], "show");  
            for (j = 0; j < c.length; j++) {
                if (x[i].className.indexOf(c[j]) > -1) w3AddClass(x[i], "show");
            }  
        }    
    } else {
    //Recherche 'Et'
        for (i = 0; i < x.length; i++) {
            w3RemoveClass(x[i], "show");
            var arr_class = Array.from(x[i].className.split(' '));
            if (filterStrictIndex(x[i],c)==true) w3AddClass(x[i], "show");
        } 
    };  
}



// -----> Compare strictement le contenu de la liste des filtres avec les éléments 'Fonction ET'
function filterStrictIndex(x,c) {
    for (i = 0; i < c.length; i++) {
        if (x.className.indexOf(c[i]) > -1) {} else {return false}
    };
    return true;
}



// -----> Afficher ou Masquer le cadre contenant les filtres
function HideShowFilters(element,id) {

    document.getElementById(element).classList.toggle("show");
    document.getElementById(element).classList.toggle("hide");
    document.getElementById(id).classList.toggle("active");
}



// -----> Je ne sais pas
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}


// -----> Je ne sais pas
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}



// -----> Montre les filtre actif par l'ajout de la classe "active"
function modifFilters(element,c) {
    // Ajouter ou supprimer filtre(s)   
    if(element.classList.contains("active")){
        // Désactiver le bouton et son filtre
        for( var i = 0; i < filters.length; i++){ 
            if ( filters[i] === c) { 
                filters.splice(i, 1); 
                i--; 
            }
        }
        w3RemoveClass(element," active");
    } else {
        //Ajout de la valeur filtre à filters variable 
        w3AddClass(element,"active");
        filters.push(c);
    }
    filterShow(filters);
    listFilters();
}






// -----> Affiche les filtres courant pour une meilleur visualisation
function listFilters(){
    
    let html = '';
    
    let filters_list = document.getElementById('FiltersList');
    
    for (var i = 0, len = filters.length; i < len; i++){   
        html += '<button class="neumorphic-tag active" onclick="TagFilterClick(this,\''+ filters[i] +'\');"><i style="color: red;" class="fa-solid fa-xmark"></i>  ' + VlookUp(arr_filters, filters[i]) + '</button>';
    };
    
    filters_list.innerHTML = html;
}



// -----> Recherche vertical array
function VlookUp(arr, value){
    for (var i = 0, len = arr.length; i < len; i++){ 
        if (arr[i][1] == value) return arr[i][2];
    };
}










// -----> Appel la fonction dans la page parente
function BackBtn(){
   //parent.CatalogBack();
   window.open("https://picojoule.fr/", "_self"); 
    
}




// -----> permet de cliquer sur les petits filtres pour les supprimer
function TagFilterClick(element,c) {

    modifFilters(element,c);
    
    c = c + ' filtre';

    x = document.getElementsByClassName(c);
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        w3RemoveClass(x[i], "active");
    }

}



// -----> Afficher masquer la nav-bar catalogue
function ShowMobileNav() {    
    if (document.getElementById("SubMenu").style.display == "block"){
        document.getElementById("SubMenu").style.display = "none";
        document.getElementById("ShowNav").classList.toggle("active");
    } else {
        document.getElementById("SubMenu").style.display = "block";
        document.getElementById("ShowNav").classList.toggle("active");
    }
}



// -----> Afficher masquer l'affichage en tableau ou en gridcard
function htmlTableSwitch(location,name){
    HideClassSwitch("TabPreview");
    HideClassSwitch("CardGrid");
    HideClassSwitch("FilterBtn");
    HideClassSwitch("FiltersList");
    //HideClassSwitch("BtnReset");
    HideClassSwitch("SearchInput");
    
    document.getElementById("ShowNav").classList.add("anotherclass");
    
    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(location + "katalogs/ressources.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlTableGenerator(csvExtractionKatalog(results.data,name));
        }
    });
    
    if(document.getElementById("FilterBtn").classList.contains("active")){
        HideClassSwitch("FiltersZone");
        document.getElementById("FilterBtn").classList.toggle("active");
    };
    
    if(document.getElementById("FilterBtn").classList.contains("active")){
        HideClassSwitch("FiltersZone");
        document.getElementById("FilterBtn").classList.toggle("active");
    };    
        
    if(document.getElementById("BtnSwitch").classList.contains('fa-table-list')){
        document.getElementById("BtnSwitch").classList.add('fa-image');
        document.getElementById("BtnSwitch").classList.remove('fa-table-list');
    } else {
        document.getElementById("BtnSwitch").classList.add('fa-table-list');
        document.getElementById("BtnSwitch").classList.remove('fa-image');
    };

}


//if ( document.getElementById("MyElement").classList.contains('MyClass') )


function HideClassSwitch(id){
    document.getElementById(id).classList.toggle("hide");
}





// -----> Creation du code HTML du tableau d'affichage des filtres
function htmlFiltersTableGenerator(content,id_ele) {

    let preview = document.getElementById("Div" + id_ele);

    let html = '<table id="table_' + id_ele + '" class="display table align-middle" style="width:100%">';

    if (content.length == 0 || typeof(content[0]) === 'undefined') {
        return null
    } else {
        
        const header = ["CODE","Designation"];
        const data = content.slice(0);
        
        html += '<thead class="table-dark">';
        html += '<tr>';
        html += '<th class="ellipsis">' + header[0] + '</th>';
        html += '<th class="ellipsis">' + header[1] + '</th>';
        html += '</tr>';
        html += '</thead>';
        
        html += '<tbody>';

        data.forEach(function(row) {
            html += '<tr>';
            row.forEach(function(colData, index) {            
                if(index != 0){
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
        initDataTable("#table_" + id_ele);
    }
}


function initDataTable(table_id) {
    $(table_id).dataTable({
        dom: 'Bfrtip',
        order: [[0, 'asc']],        
    })
}



function TestAddRessource() {
 
    let html = "";
    
    let grid_preview = document.getElementById('AddZoneTest');
    
    const data = document.getElementsByClassName('InputAdd');
        
    html += '<div style="max-width: 350px;" class="container">';
       html += '<a href="' + data[2].value + '" target="_blank">'; 
            html += '<div class="column_catalog">';
                if(data[4].value !== ""){html += '<div class="img_grid"><img class="img_card" src="' + data[4].value + '"></div>';} else {html += '<div class="img_grid"><img class="img_card" src="https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg"></div>';}
                html += '<div class="card-title">';
                    html += '<p>' + data[0].value + '</p>';
                html += '</div>';
            html += '</div>';
        html += '</a>';
        html += '<a href="' + data[2].value + '" target="_blank"><div class="overlay"><div class="text"><p style="border-bottom:solid 1px grey;"><b>Auteur.ices : </b>' + data[5].value + '</p><p>' + data[1].value + '</p></div></div></a>';
    html += '<a style="display: none;"><p>' + data[1].value + '</p></a></div>';
    
    grid_preview.innerHTML = html;

    CopyAddCode();
    
}


function CopyAddCode() {
     
    const data = document.getElementsByClassName('InputAdd');  

    let code = "";

    for (var i = 0, len = data.length; i < len; i++) {
            code += data[i].value + ';';
    }      
    
    code = code.slice(0, -1);
    
    // Copy the text inside the text field - 3x Car sinon il y a des manqués, c'est pas top mais ça passe
    navigator.clipboard.writeText(code);
    navigator.clipboard.writeText(code);
    navigator.clipboard.writeText(code);

    // Alert the copied text
    alert("Texte à transmettre dans la dernière étape (déjà copié) : " + code);
    
}




// ============== Fonction en essai =================

