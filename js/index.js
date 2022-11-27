const titre = document.querySelector("[titre-plateforme]")
const descr = document.querySelector("[descr-plateforme]")

var url = window.location.pathname + './param.json';
fetch(url)
    .then(response => response.json())
    .then(json => {
        HomeConstruction(json);
    });



function HomeConstruction(param) {
    
    titre.textContent = param.informations[0].name
    descr.textContent = param.informations[0].description
    document.getElementById('EditBtn').setAttribute("href", param.informations[0].link + 'param.json')
    document.getElementById('ParamBtn').setAttribute("href", param.informations[0].link + '../mkdocs.yml')
}
