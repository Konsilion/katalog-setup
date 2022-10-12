// Mise à zéro des filtres et de la fonction de recherche avancée 'Et/Ou'

var filters = [];
var toggle = 0;
const fromDb = undefined;
let arr_filters;


// Transformations CSV vers HTML
window.onload = function() {

    Papa.parse(window.location.pathname + "../data/parametres.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: param_result
    });  
    
    
    
    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(window.location.pathname + "../data/data.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlGridGenerator(results.data,param_result.data);
        }
    });    

    
    // -----> Vos paramètres
    Papa.parse(window.location.pathname + "../data/parametres.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlParamGenerator(results.data);
        }
    });     
       
    // -----> Lancement du script starter - Ecoute des actions sur boutons par exemple
    var extra_js = document.createElement('script');

    extra_js.setAttribute('src','https://konsilion.github.io/katalog-setup/js/starter.js');

    document.head.appendChild(extra_js);
}












// ========== LES FONCTIONS DE CREATION HTML =============


// -----> Créée le filtres principaux
function htmlFilterGenerator(content,param_content) {
    
    const all = "'all'"
    
    let grid_filter = document.getElementById('Filter1Zone');
    
    let html = "<b>" + param_content.slice(6)[0][1] + "</b><br><br>";
    
    const data = content.slice(1);
    
    data.forEach(function(row, index) {    
        html += '<button class="neumorphic-btn filtre ' + data[index][0] + '" onclick="modifFilters(this,\'' + data[index][0] + '\')"> ' + data[index][1] + '</button>';
    });

    grid_filter.innerHTML = html;
}



// -----> Créée le filtres secondaires
function html_s_FilterGenerator(content) {

    let grid_s_filter = document.getElementById('Filter2Zone');

    let html = '<b>Filtres secondaires</b><br><br>';
    
    const data = content.slice(1);
    
    data.forEach(function(row, index) {    
        html += '<button class="neumorphic-btn filtre ' + data[index][0] + '" onclick="modifFilters(this,\''+ data[index][0] +'\');"> ' + data[index][1] + '</button>'
    });
     
    
    grid_s_filter.innerHTML = html;
}



// -----> Créée les gridcards depuis le fichier data.csv
function htmlGridGenerator(content) {   
    
    let grid_preview = document.getElementById('CardPreview');
    
    let html = '<div style="text-align: center; justify-content: center;"  id="CardShow" class="grid-container">';
    
    const data = content.slice(1);
    
    data.forEach(function(row, index) {
            html += '<div class="container filterDiv ' + data[index][3] + '">';
               html += '<a href="' + data[index][2] + '" target="_blank">'; 
                    html += '<div class="column_catalog">';
                        if(data[index][4] !== ""){html += '<div class="img_grid"><img class="img_card" src="' + data[index][4] + '"></div>';} else {html += '<div class="img_grid"><img class="img_card" src="https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg"></div>';}
                        html += '<div class="card-title">';
                            html += '<p>' + data[index][0] + '</p>';
                        html += '</div>';
                    html += '</div>';
                html += '</a>';
                html += '<a href="' + data[index][2] + '" target="_blank"><div class="overlay"><div class="text"><p style="border-bottom:solid 1px grey;"><b>Auteur.ices : </b>' + data[index][5] + '</p><p>' + data[index][1] + '</p></div></div></a>';
            html += '<a style="display: none;"><p>' + data[index][1] + '</p></a></div>';
    });

    html += '</div>';

    grid_preview.innerHTML = html;
}





// -----> Creation du code HTML du tableau des données
function htmlTableGenerator(content) {

    let csv_preview = document.getElementById('TabPreview');

    let html = '<table id="TableGrid" class="display table table-hover table-striped align-middle" style="width:100%">';

    if (content.length == 0 || typeof(content[0]) === 'undefined') {
        return null
    } else {
        const header = content[0];
        const data = content.slice(1);

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
                    if (index == 2) {
                        html += '<td class="ellipsis"><a href="' + colData + '" target="_blank">' + colData + '</a></td>';
                        console.log(colData);
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
                { targets: [0, 1, 2, 5], visible: true},
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
function htmlParamGenerator(content) {

    const data = content.slice(0);
    
    let param_zone = document.getElementById('SearchParam');   
    
    let html = '<details id="ParamDetail" class="tip"><summary>Paramètre avancé de recherche</summary>';    
    
    // -----> Ajouter ce catalogue à votre site internet - lien iframe
    
    let ifram_code = '<code><</code><code>iframe src="' + data[1][1] +'" width="100%" height="900" frameborder="0" loading="lazy"><</code><code>/iframe></code>';
    
    html += '<details class="abstract"><summary>Utiliser ce catalogue sur votre site</summary>';
    
    html += '<ul><li><p>Voici la balise html permettant son import, largeur et hauteur sont modifiables :</p>';
    
    html += ifram_code;
    
    html += "</li><li><p>Plus d'informations et de contenus sur le dépôt git (lien en haut de cette page)</p></li></ul>";
    
    html += "</details>";
    
      
    // -----> Activer la recherche croisée - A SORTIR DE CE BLOC PARAMETRES
    
    html += '<details class="note"><summary>Activer la recherche combinée</summary>';
    
    html += '<div class="item">';
        
    html += '<p style="font-style: italic; padding-left:15px;"> • Activer la recherche dite "Ou" moins exigeante que "Et", elle recoupe plus de résultats au détriment de la précision.</p>';
        
    html += '<label id="combo-search-switch" title="Recherche combinée" class="switch"><input onclick="toggle_search_or_and();" type="checkbox"><span id="span-toggle" class="slider round"></span></label></div>';
    
    html += "</details>";   
    
    html += "</details>";
    
    param_zone.innerHTML = html;

    
    // -----> Copyright
    
    let copyright_zone = document.getElementById('CopyrightZone'); 
    
    html = '<p style="margin:10px;text-align:center;color:#CAC7C7;font-size:14px;"><img style="filter: grayscale(100%);height:40px;left-margin:100px;" src="' + data[5][1] + '"><br><br>' + data[2][1] + '</p>';

    copyright_zone.innerHTML = html;
    
        
    // -----> Ajouter les boutons de navigation
    
    let btn_zone = document.getElementById('SubButtons'); 

    // html = '<div><button class="btn neumorphic-btn" onclick="BackBtn();"><i class="fa-regular fa-circle-left"></i>  Retour</button>';

    //html = '<div><h2 style="margin 0px !important; color:#3B5F7F; font-size: 30px;"><b>Katalog</b> - Modèles numériques.</h2></div>'
    
    html = '<button class="btn neumorphic-btn" id="BtnAdd" onclick="PrintFilterPopup();HideClassSwitch(\'PopupAdd\');HideClassSwitch(\'Content\')"><i class="fa-solid fa-plus"></i></button>';
    
    html += '<button class="btn neumorphic-btn" id="FilterBtn" onclick="HideShowFilters(\'FiltersZone\');"><i class="fa-solid fa-filter"></i></button>'; 
    
    html += '<button class="btn neumorphic-btn btn-reset" id="BtnReset" onclick="all_grid()"><i class="fa-solid fa-rotate-left"></i></button>';

    html += '<br><br><input type="text" id="SearchInput" onkeyup="SearchBar()" placeholder="Rechercher ..." title="Rechercher"></div>';
    
    btn_zone.innerHTML = html;
    
    
    // -----> Titre
    
    let katalog_title = document.getElementById('KatalogTitle'); 
    
    html = `<h2 style="color:#3B5F7F; font-size: 30px;"><b>Katalog</b> - ` + data[3][1] + `&emsp;
                <br><p>` + data[8][1] + `</p>
                <br id="BrMobile"><br id="BrMobile">
                <button id="ReturnKatalog" class="btn neumorphic-btn" onclick="parent.ReturnKatalog();">
                    <i class="fa-solid fa-person-walking-arrow-loop-left"></i>
                </button>
                <button id="ShowNav" class="btn neumorphic-btn active" onclick="ShowMobileNav();">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn neumorphic-btn" onclick="htmlTableSwitch();">
                    <i class="fa-solid fa-image" id="BtnSwitch"></i>
                </button>
            </h2>`;
    
    katalog_title.innerHTML = html;
    
    
    // -----> Popup ajout step 2
    
    let GetElem = document.getElementById('AddStep2');
    
    html = `<hr>
                <p>Vous pouvez nous transmettre le code d'ajout par le biais de notre <b>formulaire contact</b>.</p>
                <a href="` + data[4][1] + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-solid fa-plus"></i> Ajouter votre projet</button>
                </a>
                <hr>
                <p>Si vous possèdez un <b>compte GitHub</b>, vous pouvez ajouter directement votre projet.</p>
                <a href="` + data[0][1] + `" target="_blank">
                    <button class="neumorphic-btn" style="width:100%;"><i class="fa-brands fa-github"></i> Ajouter votre projet</button>
                </a>`;
    
    GetElem.innerHTML = html;
    
    
    
    // -----> Popup creation
    
    GetElem = document.getElementById('AddStep1');
    
    html = `<a href="#" onclick="HideClassSwitch('PopupAdd');HideClassSwitch('Content')"><i style="color: red;" class="fa-solid fa-xmark"></i> Fermer</a>
                <hr>
                <h2>Décrivez-nous votre projet : </h2>
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
                    <br><button class="btn neumorphic-btn" onclick="TestAddProject();">Valider</button><button id="CopyCodeAdd" class="btn neumorphic-btn hide" onclick="CopyAddCode()">Copier le code d'ajout</button>
                </div>
                <div id="AddZoneTest"></div>`;
    
    
    GetElem.innerHTML = html;
}



function PrintFilterPopup() {

    // -----> Filtres principaux
    Papa.parse(window.location.pathname + "../data/filtres.csv", { 
        download: true,
        delimiter: ",",
        skipEmptyLines: true,
        complete: results => {
            arr_filters = results.data;
            htmlFiltersTableGenerator(results.data,"Flt1");
        }
    });    
    
    // -----> Filtres secondaire
    Papa.parse(window.location.pathname + "../data/s_filtres.csv", { 
        download: true,
        delimiter: ",",
        skipEmptyLines: true,
        complete: results => {
            arr_filters = arr_filters.concat(results.data);
            htmlFiltersTableGenerator(results.data,"Flt2");
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
    
    //Delete content of search bar
    
    document.getElementById("SearchInput").value = "";
    
    SearchBar();
    
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
function HideShowFilters(element) {

    document.getElementById(element).classList.toggle("show");
    document.getElementById(element).classList.toggle("hide");
    document.getElementById("FilterBtn").classList.toggle("active");
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
        if (arr[i][0] == value) return arr[i][1];
    };
}





// -----> Recherche par nom de projet - (pas trop maitrisé mais fonctionne)
function SearchBar() {
    var input, filter, li, a, i, txtValue;
    input = document.getElementById("SearchInput");
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName("filterDiv");
    for (i = 0; i < li.length; i++) {
        // Nom de la vignette
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        // Auteur de la vignette
        a1 = li[i].getElementsByTagName("a")[1];
        txtValue1 = a1.textContent || a1.innerText;
        // Description de la vignette
        a2 = li[i].getElementsByTagName("a")[2];
        txtValue2 = a2.textContent || a2.innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
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
function htmlTableSwitch(){
    HideClassSwitch("TabPreview");
    HideClassSwitch("CardPreview");
    HideClassSwitch("FilterBtn");
    HideClassSwitch("FiltersList");
    HideClassSwitch("BtnReset");
    HideClassSwitch("SearchInput");
    
    // -----> Données de votre liste de projet - Gridcard
    Papa.parse(window.location.pathname + "../data/data.csv", { 
        download: true,
        delimiter: ";",
        skipEmptyLines: true,
        complete: results => {
            htmlTableGenerator(results.data);
        }
    });  
    
    
    if(document.getElementById("FilterBtn").classList.contains("active")){
        HideClassSwitch("FiltersZone");
        document.getElementById("FilterBtn").classList.toggle("active");
    }
    
    if(document.getElementById("FilterBtn").classList.contains("active")){
        HideClassSwitch("FiltersZone");
        document.getElementById("FilterBtn").classList.toggle("active");
    }    
        
    if(document.getElementById("BtnSwitch").classList.contains('fa-image')){
        document.getElementById("BtnSwitch").classList.add('fa-table-list');
        document.getElementById("BtnSwitch").classList.remove('fa-image');
    } else {
        document.getElementById("BtnSwitch").classList.add('fa-image');
        document.getElementById("BtnSwitch").classList.remove('fa-table-list');
    }
    
    
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
        const header = content[0];
        const data = content.slice(1);
        
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
                    if (index == 2) {
                        html += '<td class="ellipsis"><a href="' + colData + '" target="_blank">' + colData + '</a></td>';
                        console.log(colData);
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



function TestAddProject () {
 
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
        
    if(document.getElementById("AddStep2").classList.contains("hide")) {
        HideClassSwitch("CopyCodeAdd");
        HideClassSwitch("AddStep2");
    };
    
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

    // Alert the copied text
    alert("Texte copier : " + code);
    
}




// ============== Fonction en essai =================



