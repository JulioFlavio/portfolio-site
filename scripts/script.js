async function pesquisaJson() {
  await fetch("db/habilidades.json")
  .then((response) => {
    return response.json();
  })
  .then(data => {
    
    substituiHabilidades(data.habilidades)
    substituiNivel(data.habilidades)

  })
}

function substituiHabilidades(minhasHabilidades) {
  minhasHabilidades.forEach(habilidade => {
    document.getElementById("habilidades").innerHTML += `
      <span class="habilidades bg-purple-500/25 dark:bg-blue-800/25 dark:text-blue-500">${habilidade.nome}</span>
    `});
}

function substituiNivel(minhasHabilidades) {
  minhasHabilidades.forEach(habilidade => {
    document.getElementById("nivel").innerHTML += `
      <div class="my-5 p-3 flex flex-wrap justify-between text-neutral-50 rounded-xl bg-linear-to-r from-${habilidade.cor1}-${habilidade.tom1} to-${habilidade.cor2}-${habilidade.tom2}">
        <h1 class="text-lg">${habilidade.icon} ${habilidade.nome}</h1>
        <span class="text-md bg-neutral-100/30 p-2 m-1 rounded-xl justify-self-end">${habilidade.nivel}</span>
        <p class="text-sm font-bold">${habilidade.descricao}</p>
      </div>
    `
  });

}

pesquisaJson()
// chama também "subsituiHabilidades" e "substituiNivel"

async function consultaRepositoriosGithub() {
  const resposta = await fetch("https://api.github.com/users/JulioFlavio/repos")
  const github = await resposta.json()
  
  console.log(github)
  github.forEach(repositorio => {
    document.getElementById("cards").innerHTML += `
      <div class="max-w-sm p-6 my-7 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="${repositorio.html_url}">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" target="_blank">${repositorio.name}</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${repositorio.description}</p>
          <a href="${repositorio.html_url}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Ver no GitHub
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a>
      </div>
    `
  });
}

consultaRepositoriosGithub()