<template>
  <footer class="relative bg-app-tercery pt-8 pb-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap text-center lg:text-left">
        <div class="w-full lg:w-6/12 px-4">
          <h4 class="text-3xl font-semibold">¡Sigamos en contacto!</h4>
          <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
            Síguenos en nuestras redes sociales para más información.
          </h5>

          <!-- CELULAR Y CORREO -->
          <div class="flex flex-wrap mt-2">
            <!-- Celular -->
            <div class="w-full lg:w-6/12">
              <div class="flex items-center justify-start">
                <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12">
                  <i class="fas fa-mobile-alt text-xl"></i>
                </div>
                <div class="ml-4">
                  <a href="tel:+902430068" class="text-blueGray-500">+ 902 430 068</a> -
                  <a href="tel:+906522579" class="text-blueGray-500">+ 906 522 579</a>
                </div>
              </div>
            </div>

            <!-- Correo -->
            <div class="w-full lg:w-6/12">
              <div class="flex items-center justify-start">
                <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12">
                  <i class="fas fa-envelope text-xl"></i>
                </div>
                <div class="ml-4">
                  <a href="mailto:jsearch@ccfirma.com" class="text-blueGray-500">jsearch@ccfirma.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4 ml-auto">
              <span class="block uppercase text-left text-blueGray-500 text-sm font-semibold mb-2">
                Páginas
              </span>
              <ul class="list-unstyled text-left">
                <li>
                  <router-link to="/"
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Inicio
                  </router-link>
                </li>

                <li>
                  <router-link to="/noticias"
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Noticias
                  </router-link>
                </li>
                <li>
                  <router-link to="/contacto"
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Contacto
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <span class="block uppercase text-left text-blueGray-500 text-sm font-semibold mb-2">
                Otros Recursos
              </span>
              <ul class="list-unstyled text-left">
                <li>
                  <router-link to="/questions"
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Preguntas Frecuentes
                  </router-link>
                </li>
                <li>
                  <router-link to="/politicas&privacidad"
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Políticas de Privacidad
                  </router-link>
                </li>
                <li>
                  <router-link to="/cookies"
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Políticas de Cookies
                  </router-link>
                </li>
                <li>
                  <router-link to="/contacto"
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                    Contacto
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-6 lg:mb-0 mb-6">
            <!-- <button
              class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-twitter"></i>
            </button> -->
            <!-- <button
              class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button">
              <i class="fab fa-facebook-square"></i>
            </button>
            <button
              class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button">
              <i class="fab fa-dribbble"></i>
            </button>
            <button
              class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button">
              <i class="fab fa-github"></i>
            </button> -->
            <a href="https://www.instagram.com/juris.search/" target="_blank" rel="noreferrer">
              <button title="Instagram"
                class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="100%" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
              </button>
            </a>
          </div>
        </div>
      </div>
      <hr class="my-6 border-blueGray-300" />
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-blueGray-500 font-semibold py-1">
            Copyright © {{ date }} JURIS SEARCH
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>

export default {
  data() {
    return {
      date: new Date().getFullYear()
    };
  },
};
</script>
