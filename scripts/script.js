var arq = null
async function pesquisaJson() {
  await fetch("db/habilidades.json")
  .then((response) => {
    return response.json();
  })
  .then(data => {
    
    substituiNivel(data.habilidades)
    substituiHabilidades(data.habilidades)

  })
}

function substituiHabilidades(minhasHabilidades) {
  minhasHabilidades.forEach(habilidade => {
    document.getElementById("habilidades").innerHTML += `
      <span class="habilidades">${habilidade.nome}</span>
    `});
}

function substituiNivel(minhasHabilidades) {
  minhasHabilidades.forEach(habilidade => {
    document.getElementById("nivel").innerHTML += `
      <div class="my-5 p-3 flex flex-wrap justify-between text-neutral-50 rounded-xl bg-linear-to-r from-${habilidade.cor1}-${habilidade.tom1} to-${habilidade.cor2}-${habilidade.tom2}">
        <h1 class="text-lg">${habilidade.icon} ${habilidade.nome}</h1>
        <span class="text-md justify-self-end">${habilidade.nivel}</span>
        <p class="text-sm">${habilidade.descricao}</p>
      </div>
    `
  });

}

pesquisaJson()