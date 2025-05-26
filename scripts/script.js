async function habList() {
  await fetch("db/habilidades.json")
  .then((response) => {
    response.json().then((data) => {
      console.log(data)
      // fazer tudo aqui dentro do fetch, não consegui atribuir o fetch a uma variavel

      document.getElementById("habilidades").innerHTML += ``

      for (let i = 0; i < data.habilidades.length; i++) {
        document.getElementById("habilidades").innerHTML += `
          <span class="habilidades">${data.habilidades[i].nome}</span>
        `
      }

      
      
    })
  })

}

onload(habList());