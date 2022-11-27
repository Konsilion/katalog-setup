const ressourceCardTemplate = document.querySelector("[data-ressource-template]");
const ressourceCardContainer = document.querySelector("[data-ressource-cards-container]")
let ressources = [];


const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  ressources.forEach(ressource => {
    const isVisible =
      ressource.name.toLowerCase().includes(value) || ressource.description.toLowerCase().includes(value) || ressource.author.toLowerCase().includes(value)
      ressource.element.classList.toggle("hide", !isVisible)
  })
})





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
        link.setAttribute("onclick","DatamiConstruction('" + projekts.projekts[i].name + "','" + projekts.projekts[i].link + "','" + projekts.projekts[i].type +"');")
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
    
    fetch(window.location.pathname + '../../../param.json')
        .then(response => response.json())
        .then(json => {
            EditButtonRedirection(json);
        });
}


function EditButtonRedirection(param) {

    document.getElementById('EditBtn').setAttribute("href", param.informations[0].link + 'etc/projekts/projekts.json') 
}
