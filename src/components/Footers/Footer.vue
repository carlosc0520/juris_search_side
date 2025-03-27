<template>
  <footer class="relative bg-white pt-8">
    <div class="container mx-auto">
      <div class="flex items-center justify-center flex-wrap mb-3">
        <div class="lg:w-4/12">
          <div class="flex mb-3 mb-lg-0">
            <router-link to="/" class="">
              <img :src="logoJuris" alt="" class="w-36"/>
            </router-link>
          </div>
        </div>
        <div class="w-full lg:w-8/12">
          <div class="flex flex-wrap items-center justify-end">
            <ul class="list-unstyled flex flex-col flex-md-row flex-wrap justify-content-center justify-content-md-end align-items-center w-full gap-4 my-0">
              <li>
                <router-link to="/"
                  class="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm"
                  :class="{ 'text-primary font-semibold': route.path === '/' }">
                  Inicio
                </router-link>
              </li>
              <li>
                <router-link to="/noticias"
                  class="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm"
                  :class="{ 'text-primary font-semibold': route.path === '/noticias' }">
                  Noticias
                </router-link>
              </li>
              <li>
                <router-link to="/contacto"
                  class="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm"
                  :class="{ 'text-primary font-semibold': route.path === '/contacto' }">
                  Contáctanos
                </router-link>
              </li>
              <li>
                <router-link to="/questions"
                  class="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm"
                  :class="{ 'text-primary font-semibold': route.path === '/questions' }">
                  Preguntas Frecuentes
                </router-link>
              </li>
              <li>
                <a href="https://www.instagram.com/juris.search/" class="mr-2" target="_blank" rel="noreferrer">
                  <i class="fa-brands fa-instagram text-secondary text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/company/juris-search/" target="_blank" rel="noreferrer">
                  <i class="fa-brands fa-linkedin text-secondary text-xl"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="bg-secondary w-full" />
      <div class="mt-4 flex flex-wrap items-center md:justify-between justify-center">
        <div class="text-sm text-gray-500">
          © {{ date }} Juris Search | Todos los derechos reservados
        </div>
        <div>
          <ul class="list-unstyled flex flex-wrap gap-4">
            <li>
              <router-link to="/politicas&privacidad"
                class="text-blueGray-600 hover:text-blueGray-800 block text-sm"
                :class="{ 'text-primary font-semibold': route.path === '/politicas&privacidad' }">
                Políticas de Privacidad
              </router-link>
            </li>
            <li>
              <router-link to="/cookies"
                class="text-blueGray-600 hover:text-blueGray-800 block text-sm"
                :class="{ 'text-primary font-semibold': route.path === '/cookies' }">
                Políticas de Cookies
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { useRoute } from 'vue-router';
import logoJuris from "@/assets/img/resources/logo-jurissearch.png";

export default {
  setup() {
    const route = useRoute();
    return { route };
  },
  data() {
    return {
      date: new Date().getFullYear(),
      logoJuris,
    };
  },
};
</script>
