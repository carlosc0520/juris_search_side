<template>
  <div class="bg-blueGray-100">
    <index-navbar />
    <section class="mt-10 md:mt-5 header relative bg-blueGray-100 items-center flex h-screen max-h-860-px">
      <div class="container mx-auto items-center  flex flex-wrap" style="z-index: 10;">
        <div class="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div id="container-fluid-img" class="pt-32 sm:pt-0">
            <h2 class="font-semibold text-4xl text-blueGray-600">
              El mejor buscador de jurisprudencia y legislación Peruana
            </h2>
            <p class="mt-4 text-lg leading-relaxed text-blueGray-500">
              Juris Search es una herramienta tecnológica online diseñada para facilitar la búsqueda y consulta de
              jurisprudencia en materia penal, especialmente, en derecho penal económico y de la empresa. Contamos con
              una base completa y actualizada de jurisprudencia nacional sobre compliance y responsabilidad de personas
              jurídicas.
            </p>
            <div class="mt-12">
              <button onclick="window.location='#mi-seccion'" style="cursor: pointer" class=" text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 
                bg-app-primary
                uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                Adquirir Plan
              </button>
              <button onclick="window.location='#mi-nosotros'" style="cursor: pointer!important" class="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 hover:bg-blueGray-600 
                uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" target="_blank">
                Sobre Nosotros
              </button>
            </div>
          </div>
        </div>
      </div>

      <img id="img-inicio"
        class="imagen-logo-main absolute top-0 b-auto right-0 pt-16 sm:w-3/12 -mt-48 sm:mt-0 w-5/12 max-h-860-px"
        :src="patternVue" alt="..." />
    </section>

    <section class="md:mt-48 container-mision-v mt-10 md:mt-40 pb-20 relative bg-blueGray-100">
      <div class="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20" style="transform: translateZ(0);">
        <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          version="1.1" viewBox="0 0 2560 10320" x="0" y="0">
          <polygon class="text-blueGray-100 fill-current" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
      <div class="container mx-auto">
        <div class="flex flex-wrap items-center">
          <div class="animation-r-l w-12/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
            <div :class="[
              'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg',
            ]"
              :style="currentIndex % 2 === 0 ? 'background-color: var(--azul-primary-b)' : 'background-color: var(--lila-primary-b)'">
            
              <img :alt="currentNoticia.TITULO" :src="currentNoticia?.IMAGEN2 || 'https://via.placeholder.com/300'"
                class="align-middle rounded-t-lg w-full h-auto" />
              <blockquote class="relative p-8 mb-4">
                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95"
                  class="absolute left-0 w-full block h-95-px -top-94-px">
                  <polygon points="-30,95 583,95 583,65"
                  :style="currentIndex % 2 === 0 ? 'fill: var(--azul-primary-b)' : 'fill: var(--lila-primary-b)'">
                </polygon>
              </svg>
                <h4 class="text-xl font-bold text-black">
                  {{ currentNoticia.TITULO }}
                </h4>
                <p class="text-md  mt-2 text-primary-p{">
                  {{ currentNoticia.DESCRIPCION }}
                </p>
              </blockquote>
            </div>
          </div>

          <div class="w-full md:w-6/12 px-4 img-container">
            <div class="flex flex-wrap">
              <div class="w-full md:w-6/12 px-4">
                <div class="relative flex flex-col mt-4">
                  <div class="px-4 py-5 flex-auto container-valor">
                    <div class="flex md:justify-start justify-center">
                      <div
                        class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <img :src="visionVue" alt="vision" />
                      </div>
                    </div>
                    <h6 class="sm-text-center text-xl mb-1 font-semibold">
                      Visión
                    </h6>
                    <p class="mb-4 text-blueGray-500">
                      Brindar a nuestros usuarios una plataforma digital intuitiva, completa y actualizada, que facilite
                      la consulta y búsqueda de jurisprudencia nacional y extranjera en derecho penal económico y de la
                      empresa.
                    </p>
                  </div>
                </div>


              </div>
              <div class="w-full md:w-6/12 px-4">
                <div class="relative flex flex-col min-w-0 mt-4">
                  <div class="px-4 py-5 flex-auto container-valor">
                    <div class="flex md:justify-start justify-center">
                      <div
                        class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <img :src="misionVue" alt="mision" />
                      </div>
                    </div>
                    <h6 class="sm-text-center text-xl mb-1 font-semibold">
                      Misión
                    </h6>
                    <p class="mb-4 text-blueGray-500">
                      Ser la herramienta digital líder en consulta y búsqueda de jurisprudencia en derecho penal
                      económico y de la empresa en Perú.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-5 relative block bg-blueGray-100">
      <div class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
        style="transform: translateZ(0);">
        <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          version="1.1" viewBox="0 0 2560 100" x="0" y="0">
          <polygon class="text-blueGray-100 fill-current" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>

      <div class="container mx-auto px-4 lg:pt-16 lg:pb-20">

        <div class="animation-b-t flex flex-wrap text-center justify-center">
          <div class="w-full lg:w-6/12 px-4 md:mt-5">
            <h2 class="h2-init text-4xl font-semibold text-black">
              Nuestros Valores
            </h2>
            <p class="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
              En nuestra firma de abogados, valoramos la ética, la transparencia y la confianza. Defendemos la justicia
              con compromiso y responsabilidad.
            </p>
          </div>
        </div>

        <div class="flex flex-wrap mt-12 justify-center">
          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-accessible">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee="" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path data-v-577fd2ee="" d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1"></path>
                <circle data-v-577fd2ee="" cx="12" cy="7.5" r=".5" fill="currentColor"></circle>
              </svg>
            </div>
            <h6 class="text-xl mt-5 text-blueGray-500 font-semibold text-black">
              Accesibilidad
            </h6>
            <p class="mt-2 mb-4 text-blueGray-500">
              Promovemos el libre acceso a la información judicial.
            </p>
          </div>

          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-transfer">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee="" d="M20 10h-16l5.5 -6"></path>
                <path data-v-577fd2ee="" d="M4 14h16l-5.5 6"></path>
              </svg>
            </div>
            <h6 class="text-xl mt-5 text-blueGray-500 font-semibold text-black">
              Transparencia
            </h6>
            <p class="mt-2 mb-4 text-blueGray-500">
              Ofrecemos información judicial precisa, clara y confiable.
            </p>
          </div>

          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-code-circle">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee="" d="M10 14l-2 -2l2 -2"></path>
                <path data-v-577fd2ee="" d="M14 10l2 2l-2 2"></path>
                <path data-v-577fd2ee="" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
              </svg>
            </div>
            <h6 class="text-xl mt-5 text-blueGray-500 font-semibold text-black">
              Innovación
            </h6>
            <p class="mt-2 mb-4 text-blueGray-500">
              Nuestras herramientas digitales mejoran continuamente para favorecer la experiencia del usuario.
            </p>
          </div>

          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-users-group">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee="" d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                <path data-v-577fd2ee="" d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
                <path data-v-577fd2ee="" d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                <path data-v-577fd2ee="" d="M17 10h2a2 2 0 0 1 2 2v1"></path>
                <path data-v-577fd2ee="" d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                <path data-v-577fd2ee="" d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
              </svg>
            </div>
            <h6 class="text-xl mt-5 text-blueGray-500 font-semibold text-black">
              Colaboración
            </h6>
            <p class="mt-2 mb-4 text-blueGray-500">
              Unimos expertos en derecho, tecnología y gestión de la información.
            </p>
          </div>

          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-checklist">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee="" d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8">
                </path>
                <path data-v-577fd2ee="" d="M14 19l2 2l4 -4"></path>
                <path data-v-577fd2ee="" d="M9 8h4"></path>
                <path data-v-577fd2ee="" d="M9 12h2"></path>
              </svg>
            </div>
            <h6 class="text-xl mt-5 text-blueGray-500 font-semibold text-black">
              Compromiso ético
            </h6>
            <p class="mt-2 mb-4 text-blueGray-500">
              Contribuimos al fortalecimiento del Estado de Derecho y a la construcción de una sociedad más justa
              mediante el libre y fácil acceso a la información judicial
            </p>
          </div>

        </div>
      </div>
    </section>

    <section class="pb-20 relative block bg-blueGray-800" id="mi-nosotros">
      <div class="animation-b-t mt-0 container mx-auto px-4 lg:pt-24 lg:pb-64">
        <div class="flex flex-wrap text-center justify-center">
          <div class="w-full lg:w-6/12 px-4 md:mt-5">
            <h2 class="h2-init text-4xl font-semibold text-white font-bold">
              QUE OFRECEMOS
            </h2>
            <p class="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
              Como empresa de tecnología, ofrecemos soluciones digitales innovadoras para el sector legal. Nuestro
            </p>
          </div>
        </div>

        <div class="flex flex-wrap mt-12 justify-center">
          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-database-star">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee="" d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3">
                </path>
                <path data-v-577fd2ee="" d="M4 6v6c0 1.43 2.67 2.627 6.243 2.927"></path>
                <path data-v-577fd2ee="" d="M20 10.5v-4.5"></path>
                <path data-v-577fd2ee="" d="M4 12v6c0 1.546 3.12 2.82 7.128 2.982"></path>
                <path data-v-577fd2ee=""
                  d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z">
                </path>
              </svg>
            </div>
            <h6 class="text-xl mt-5 font-semibold text-white">
              Base de datos actualizada
            </h6>
            <p class="mt-2 mb-4 text-blueGray-400">
              Amplia colección de resoluciones y sentencias sobre la materia.
            </p>
          </div>

          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-device-desktop-search">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee="" d="M11.5 16h-7.5a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v6.5">
                </path>
                <path data-v-577fd2ee="" d="M7 20h4"></path>
                <path data-v-577fd2ee="" d="M9 16v4"></path>
                <path data-v-577fd2ee="" d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path data-v-577fd2ee="" d="M20.2 20.2l1.8 1.8"></path>
              </svg>
            </div>
            <h5 class="text-xl mt-5 font-semibold text-white">
              Búsqueda avanzada
            </h5>
            <p class="mt-2 mb-4 text-blueGray-400">
              Herramienta tecnológica de búsqueda avanzada que permite filtrar jurisprudencia específica de manera
              rápida y eficiente.
            </p>
          </div>

          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-brand-google-analytics">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee=""
                  d="M10 9m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v9.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z">
                </path>
                <path data-v-577fd2ee=""
                  d="M17 3m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v15.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z">
                </path>
                <path data-v-577fd2ee="" d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              </svg>
            </div>
            <h5 class="text-xl mt-5 font-semibold text-white">
              Análisis crítico
            </h5>
            <p class="mt-2 mb-4 text-blueGray-400">
              Comentarios de expertos acerca de las decisiones judiciales más relevantes, que proporcionan contexto y
              claridad.
            </p>
          </div>

          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-refresh">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee="" d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                <path data-v-577fd2ee="" d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
              </svg>
            </div>
            <h5 class="text-xl mt-5 font-semibold text-white">
              Continua actualización
            </h5>
            <p class="mt-2 mb-4 text-blueGray-400">
              Pataforma actualizada constantemente.
            </p>
          </div>

          <div class="animation-b-t w-full lg:w-4/12 px-4 text-center">
            <div
              class="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
              <svg data-v-577fd2ee="" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="#1660ff" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-artboard">
                <path data-v-577fd2ee="" stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path data-v-577fd2ee=""
                  d="M8 8m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"></path>
                <path data-v-577fd2ee="" d="M3 8l1 0"></path>
                <path data-v-577fd2ee="" d="M3 16l1 0"></path>
                <path data-v-577fd2ee="" d="M8 3l0 1"></path>
                <path data-v-577fd2ee="" d="M16 3l0 1"></path>
                <path data-v-577fd2ee="" d="M20 8l1 0"></path>
                <path data-v-577fd2ee="" d="M20 16l1 0"></path>
                <path data-v-577fd2ee="" d="M8 20l0 1"></path>
                <path data-v-577fd2ee="" d="M16 20l0 1"></path>
              </svg>
            </div>
            <h5 class="text-xl mt-5 font-semibold text-white">
              Interfaz Amigable
            </h5>
            <p class="mt-2 mb-4 text-blueGray-400">
              Diseño intuitivo y de fácil uso para la búsqueda y consulta de documentos jurídicos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative block py-24 lg:pt-0 bg-blueGray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center lg:-mt-64 -mt-32">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
              <div class="flex-auto p-5 lg:p-10">
                <h4 class="text-2xl font-semibold text-center">
                  CONTÁCTANOS
                </h4>
                <p class="leading-relaxed mt-1 mb-4 text-blueGray-500">
                  ¿Tienes alguna duda o consulta? Escríbenos y te responderemos a la brevedad.
                </p>
                <div class="relative w-full mb-3 mt-8" :class="{ error: validation.hasError('modelo.NOMBRES') }">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                    Nombres y apellidos <span class="text-red-500">*</span>
                  </label>
                  <input type="text" v-model="modelo.NOMBRES"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="" />
                  <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                    {{ validation.firstError('modelo.NOMBRES') }}
                  </span>
                </div>

                <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.CORREO') }">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                    Correo electrónico <span class="text-red-500">*</span>
                  </label>
                  <input type="email" v-model="modelo.CORREO"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="" />
                  <span class="message" v-if="validation.hasError('modelo.CORREO')">
                    {{ validation.firstError('modelo.CORREO') }}
                  </span>
                </div>

                <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.ASUNTO') }">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                    Motivo <span class="text-red-500">*</span>
                  </label>
                  <input type="email" v-model="modelo.ASUNTO"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="" />
                  <span class="message" v-if="validation.hasError('modelo.ASUNTO')">
                    {{ validation.firstError('modelo.ASUNTO') }}
                  </span>
                </div>

                <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.MENSAJE') }">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="message">
                    Mensaje <span class="text-red-500">*</span>
                  </label>
                  <textarea rows="4" cols="80" v-model="modelo.MENSAJE"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="" />
                  <span class="message" v-if="validation.hasError('modelo.MENSAJE')">
                    {{ validation.firstError('modelo.MENSAJE') }}
                  </span>
                </div>
                <div class="text-center mt-6">
                  <button @click="submit"
                    class="bg-app-primary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button">
                    Enviar Mensaje
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
    </section>

    <section class="py-4 pt-3" id="mi-seccion">
      <div id="pricing" class="py-6 px-6 mb-0 lg:px-20 my-2 md:my-6">
        <div class="text-center mb-6">
          <h2 class="h2-init text-4xl font-semibold text-black">
            Nuestros Planes
          </h2> <span class="text-muted-color text-2xl">
            Elige el plan que mejor se adapte a tus necesidades
          </span>
        </div>

        <div class="row flex flex-wrap justify-center gap-4">
          <div class="bg-white col-md-3 col-sm-12 p-0 md:p-4 card-price border-2 hover:border-primary rounded"
            style="height: auto;" v-for="plan in planes" :key="plan.id">
            <div
              class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer duration-300 transition-all"
              style="border-radius: 10px">
              <div class="text-uppercase text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">
                {{ plan?.DESCRIPCION || "" }}
              </div>
              <div class="my-8 flex flex-col items-center gap-4">
                <div class="flex items-center">
                  <span class="text-5xl font-bold mr-2 mt-3 text-surface-900 dark:text-surface-0">
                    S/. {{ plan?.PRECIO || "" }}
                  </span>
                  <span class="text-surface-600 dark:text-surface-200">por mes</span>
                </div>
                <button @click="goToPlan(plan)" class="btn btn-create btn-hover-s">
                  Empezar
                </button>
              </div>
              <ul
                class="my-8 mt-3 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8 ul-list-details">
                <li class="py-2" v-for="restriccion in plan.RESTRICIONES" :key="restriccion">
                  <i class="fa fa-check text-primary mr-2"></i>
                  <span class="text-xl leading-normal">
                    {{ restriccion }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ModalCrearUsuario :show="modalCrearUsuario.show" :close="() => modalCrearUsuario.show = false"
        :update="() => { }" />


    </section>

    <footer-component />
  </div>
</template>
<script>

import login from "@/assets/img/login.jpg";
import profile from "@/assets/img/profile.jpg";
import landing from "@/assets/img/landing.jpg";
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';


// * USADOS
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import patternVue from "@/assets/img/resources/imagen.png";
import misionVue from "@/assets/img/resources/mision.png";
import visionVue from "@/assets/img/resources/vision.png";


// * PROXIES
import LoginProxy from "@/proxies/LoginProxy";
import SettingsProxy from "@/proxies/SettingsProxy.js";
import MantenimientoProxy from "@/proxies/MantenimientoProxy.js";
import ModalCrearUsuario from "./Modales/ModalCrearUsuario.vue";

export default {
  data() {
    return {
      patternVue,
      login,
      profile,
      landing,

      // VARIABLES USADAS
      noticias: [],
      currentIndex: 0,
      misionVue,
      visionVue,
      modelo: {
        NOMBRES: null,
        CORREO: null,
        ASUNTO: null,
        MENSAJE: null,
      },
      isLoading: false,
      modalCrearUsuario: {
        show: false,
        data: null,
      },
      planes: [
      ]
    };
  },
  validators: {
    'modelo.NOMBRES': function (value) {
      return Validator.value(value).required("Campo requerido");
    },
    'modelo.CORREO': function (value) {
      return Validator.value(value).required("Campo requerido");
    },
    'modelo.ASUNTO': function (value) {
      return Validator.value(value).required("Campo requerido");
    },
    'modelo.MENSAJE': function (value) {
      return Validator.value(value).required("Campo requerido");
    },
  },
  components: {
    IndexNavbar,
    FooterComponent,
    ModalCrearUsuario
  },
  computed: {
    currentNoticia() {
      return this.noticias[this.currentIndex] || { title: '', description: '', image: '' };
    }
  },
  methods: {
    getNoticias() {
      LoginProxy.list({
        INIT: 0,
        ROWS: 4,
        DESC: null,
        CESTDO: 'A'
      })
        .then(async (response) => {
          const processedResponse = await Promise.all(response.map(noticia => {
            const type = noticia.IMAGEN.split('.').pop();
            const imageData = noticia?.IMAGEN2?.data || null;

            if(!imageData) return noticia;

            const base64String = imageData.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
            noticia.IMAGEN2 = `data:image/${type};base64,${window.btoa(base64String)}`;
            return noticia;
          }));

          this.noticias = processedResponse;
          this.startRotation();
        })
        .catch((error) => {
          toast.error(error?.message || 'Ocurrió un error al obtener las noticias', { toastId: 'error' });
          this.noticias = []
        });
    },
    getPlanes() {
      let restriciones = {
        1: "Visualización de resoluciones y sentencias",
        2: "Descarga de resoluciones y sentencias",
        3: "Configuración de carpetas",
      }

      MantenimientoProxy.listPlanesAbout({
        ROWS: 1000,
        INIT: 0,
        DESC: null
      }
      ).then((response) => {
        response = response.map((item) => {
          let res = [];
          try {
            res = item.RESTRICIONES.split(',');
          } catch (error) {
            res = [];
          }

          item.PRECIO = item.PRECIO.toFixed(2);
          item.TIEMPO = Number((item.TIEMPO / 30).toFixed(0));
          item.RESTRICIONES = res.map((item) => {
            return restriciones[item];
          });

          return item;
        });


        // ordenar por los que tiene  mas a menos restricciones
        response = response.sort((a, b) => {
          return a.RESTRICIONES.length - b.RESTRICIONES.length;
        });

        // inverso
        response = response.reverse();

        this.planes = response;
      })
        .catch((error) => {
          toast.error(error?.message || 'Ocurrió un error al obtener los planes', { toastId: 'error' });
        })
    },
    goToPlan() {
      this.modalCrearUsuario.show = true;
    },
    startRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.noticias.length;
      }, 5000);
    },
    async submit(e) {
      e.preventDefault();

      let validate = await this.$validate();
      if (!validate) return;

      this.isLoading = true;
      await SettingsProxy.create(this.modelo)
        .then((response) => {
          if (response.STATUS) {
            this.modelo = {
              NOMBRES: null,
              CORREO: null,
              ASUNTO: null,
              MENSAJE: null,
            };

            this.validation.reset();
            toast.success('Mensaje enviado correctamente', { toastId: 'success' });
          } else {
            toast.error('Ocurrió un error al enviar el mensaje', { toastId: 'error' });
          }
        })
        .catch(() => toast.error('Ocurrió un error al enviar el mensaje', { toastId: 'error' }))
        .finally(() => this.isLoading = false);
    },
    async getParams() {
      // promise de getNoticias y getPlanes
      await Promise.all([this.getNoticias(), this.getPlanes()]);
    }
  },

  mounted() {
    this.getParams();

    document.addEventListener('DOMContentLoaded', function () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      });

      const elementos = document.querySelectorAll('.animation-b-t');
      const elementos2 = document.querySelectorAll('.animation-r-l');
      const elementos3 = document.querySelectorAll('.animation-l-r');

      elementos.forEach(elemento => {
        observer.observe(elemento);
      });

      elementos2.forEach(elemento => {
        observer.observe(elemento);
      });

      elementos3.forEach(elemento => {
        observer.observe(elemento);
      });
    });



  },
};
</script>

<style>
/* Cuando el elemento es visible, se aplicará la animación */
.animation-b-t.visible {
  animation: frame3 1s ease-in-out;
}

/* Keyframes que definen los "frames" de la animación */
@keyframes frame3 {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}


/* .animation-b-t {
  animation: frame3 1s ease-in-out;
}

.animation-b-t.visible {
  animation: frame 1s ease-in-out;
}



@keyframes frame3 {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 0.8;
    transform: translateY(0);
  }
} */

@media (max-width: 768px) {
  #img-inicio {
    /* // ocutlar */
    display: none;
  }

  #container-fluid-img {
    padding: 0 !important;
  }


  .h2-init {
    padding-top: 30px;
  }

  .container-mision-v {
    margin: 0 !important;
    padding: 0 !important;
  }

  .container-valor {
    padding: 0 !important;
  }
}

.img-container img {
  max-height: 40px;
  max-width: 40px;

}

/* // estilo de check a ul-list-details */
.ul-list-details li {
  list-style-type: none;
}

.card-price:hover {
  border: 1px solid #a5bef5;
  /* shadow */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.imagen-logo-main {
  /* // redondear imagen */
  margin-top: 10rem;
  padding: 0 !important;
  margin-right: 5rem;
  margin-left: 5rem;
  border-radius: 10px;
  width: 40%;
  height: auto;
  /* border-radius: 50%; */
  box-shadow: -1px 1px 5px 4px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: -1px 1px 5px 4px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -1px 1px 5px 4px rgba(0, 0, 0, 0.3);
  opacity: 0.8;
  /* // que aparesca de derecha a izquierda usa frame */
  animation: frame 1s ease-in-out;
}


.animation-r-l {
  animation: frame2 1s ease-in-out;
}

@keyframes frame {
  from {
    opacity: 0;
    transform: translateX(100%);
  }

  to {
    opacity: 0.8;
    transform: translateX(0);
  }
}

@keyframes frame2 {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }

  to {
    opacity: 0.8;
    transform: translateX(0);
  }
}


</style>