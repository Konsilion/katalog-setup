fetch("https://unpkg.com/papaparse@5.3.0/papaparse.min.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  
  })


fetch("https://konsilion.github.io/katalog-setup/js/katalog/katalog.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  })  


fetch("https://konsilion.github.io/katalog-setup/js/konsilion.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  }) 



fetch("https://datami-widget.multi.coop/js/app.js")
  .then((response) => response.text())
  .then((text) => eval(text))
  .then(() => {
  })
