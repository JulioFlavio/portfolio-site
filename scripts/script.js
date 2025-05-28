async function pesquisaJson() {
  await fetch("db/informacoes.json")
  .then((response) => {
    return response.json();
  })
  .then(data => {
    
    preencheHabilidades(data.habilidades)
    preencheNivel(data.habilidades)
    preencheAprendizados(data.aprendizados)

  })
}

function preencheHabilidades(minhasHabilidades) {
  minhasHabilidades.forEach(habilidade => {
    document.getElementById("habilidades").innerHTML += `
      <span class="bg-purple-500/25 rounded-3xl py-3 px-5 dark:bg-blue-800/25 dark:text-blue-500">${habilidade.nome}</span>
    `});
}

function preencheNivel(minhasHabilidades) {
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

async function consultaRepositoriosGithub() {
  const resposta = await fetch("https://api.github.com/users/JulioFlavio/repos")
  const github = await resposta.json()
  
  github.forEach(repositorio => {
    document.getElementById("cards").innerHTML += `
      <div class="max-w-sm p-6 my-7 grow bg-white mx-5 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
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

function preencheAprendizados(meusAprendizados) {

  // Preenchendo com o primeiro elemento (primeira formação) sozinha pois ela terá uma pequena animação
  document.getElementById("formacoes").innerHTML += `
    <a href="#" class="block m-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <span class="relative -top-3 -left-3 flex size-3">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
      </span>
      <span class="text-purple-800 font-bold">${meusAprendizados[0].inicio} - ${meusAprendizados[0].conclusao}</span>
      <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${meusAprendizados[0].nome}</h3>
      <p class="font-normal text-purple-700 dark:text-purple-800">${meusAprendizados[0].instituicao}</p>
      <p class="font-normal text-gray-700 dark:text-gray-400">${meusAprendizados[0].descricao}</p>
    </a>
  `

  // Todos os outros aprendizados começando a partir do segundo
  for (let i = 1; i < meusAprendizados.length; i++) {
    document.getElementById("formacoes").innerHTML += `
      <a href="#" class="block grow m-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <span class="relative -top-3 -left-3 flex size-3">
          <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
        </span>
        <span class="text-purple-800 font-bold">${meusAprendizados[i].inicio} - ${meusAprendizados[i].conclusao}</span>
        <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${meusAprendizados[i].nome}</h3>
        <p class="font-normal text-purple-700 dark:text-purple-800">${meusAprendizados[i].instituicao}</p>
        <p class="font-normal text-gray-700 dark:text-gray-400">${meusAprendizados[i].descricao}</p>
      </a>
    `
  }
}

pesquisaJson()
// chama também "subsituiHabilidades" e "preencheNivel"
consultaRepositoriosGithub()

function efeitoDigitacaoVetor() {
  const frases = ["Desenvolvedor Front-End", "Software Developer", "Front-End Developer", "Front-End Engineer", "Web UI Developer"]
  const elemento = document.getElementById("titulos");
  const velocidade = 80;
  const pausaEntreFrases = 1500;
  let indiceTexto = 0;

  function digitarTexto(texto, callback) {
    let i = 0;
    elemento.textContent = "";

    function digitar() {
      if (i < texto.length) {
        elemento.textContent += texto.charAt(i);
        i++;
        setTimeout(digitar, velocidade);
      } else {
        setTimeout(() => apagarTexto(callback), pausaEntreFrases);
      }
    }

    digitar();
  }

  function apagarTexto(callback) {
    let i = elemento.textContent.length;

    function apagar() {
      if (i >= 0) {
        elemento.textContent = elemento.textContent.substring(0, i);
        i--;
        setTimeout(apagar, velocidade / 2);
      } else {
        callback();
      }
    }

    apagar();
  }

  function digitarProximo() {
    if (indiceTexto < frases.length) {
      digitarTexto(frases[indiceTexto], digitarProximo);
      indiceTexto++;
    } else {
      indiceTexto = 0; // reinicia loop
      digitarProximo();
    }
  }

  digitarProximo();
}
efeitoDigitacaoVetor();
