document.querySelector('.mobile-menu-button').addEventListener('click', function() {
  const menu = document.querySelector('header ul');
  menu.classList.toggle('hidden');
  menu.classList.toggle('absolute');
  menu.classList.toggle('top-16');
  menu.classList.toggle('left-0');
  menu.classList.toggle('w-full');
  menu.classList.toggle('bg-gray-800');
  menu.classList.toggle('p-4');
  menu.classList.toggle('flex');
  menu.classList.toggle('flex-col');
});

UrlApi = "https://api.github.com/users/JulioFlavio"

function aviso_beta() {
  Swal.fire({
  title: "Aviso!",
  text: "Este site ainda está em construção, esta é uma breve demonstração que pode apresentar erros.",
  icon: "question",
  confirmButtonText: "Prosseguir",
  background: "oklch(27.8% 0.033 256.848)",
  color: "white"
});
}

async function github() {
  const informacoes = await fetch(UrlApi, {
    headers: {
      'Authorization': ''
    }
  })

  
  const infoUsuario = await informacoes.json();
  // console.log(infoUsuario)

}

async function repositorios() {
  const repos = await fetch(UrlApi + "/repos", {
    headers: {
      'Authorization': ''
    }
  })
  
  const infoRepos = await repos.json()
  // console.log(infoRepos)
  
  for (i = 0; i < infoRepos.length; i++) {
    document.getElementById("repositorios").innerHTML += `
      <div class="col-start-${i + 1} transition ease-in-out hover:-translate-y-1.5 my-5">
    
        <div class="max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div class="p-5">
              <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${infoRepos[i].name}</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${infoRepos[i].description}</p>
              <!-- <div class="topicos m-0">
                <span>HTML</span>
                <span>CSS</span>
                <span>Responsivo</span>
              </div> -->
              <br>
              <a href="${infoRepos[i].clone_url}" class="inline-flex items-center px-3 py-2 text-lg font-bold text-center dark:bg-white/0 dark:text-blue-700 rounded-lg focus:none focus:outline-none focus:ring-blue-300 dark:hover:text-blue-800 dark:focus:ring-blue-800">
                  Ver no GitHub
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
          </div>
        </div>

      </div>
    `
  }

}


function efeitoDigitacaoVetor() {
    const frases = ["Desenvolvedor Front-End", "Software Developer"];
    const elemento = document.getElementById("titulos");
    const velocidade = 100;
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
  


window.onload(aviso_beta(), github(), repositorios(), efeitoDigitacaoVetor());