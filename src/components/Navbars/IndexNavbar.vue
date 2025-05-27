<template>
  <section>
    <div v-if="toggleShowAlert" class="z-50 w-full">
      <div class="d-flex justify-content-between align-items-center frame-getPremium text-white p-2 text-xs">
        <div></div>
        <div class="d-flex flex-col lg:flex-row justify-content-center align-items-center gap-2">
          <span>Adquiere más funcionalidades con el</span>
          <button @click="scrollToSection('mi-seccion-planes')"
            class="rounded-full px-3 py-1 d-flex justify-content-center align-items-center border border-white text-xs">
            Plan Premium
            <img class="ps-1" src="../../assets/img/resources/Corona.png" />
          </button>
        </div>
        <button @click="toggleShowAlert = false">
          <img src="../../assets/img/resources/close.png" />
        </button>
      </div>
    </div>
    <nav
      class="nav-bottom-gray bg-white w-full flex flex-wrap items-center justify-between px-2 navbar-expand-lg p-lg-2">
      <div class="container m-0 px-4 mx-auto flex flex-wrap items-center justify-between flex align-center">
        <div class="w-full lg:hidden relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <button
            class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button" v-on:click="setNavbarOpen">
            <i class="fas fa-bars"></i>
          </button>

          <button>
            <router-link to="/auth/login"
              class="leading-none lg:hidden bg-duo rounded-full text-white text-xs px-4 py-3 outline-none focus:outline-none lg:mr-1 ml-3 ease-linear transition-all duration-150">
              Iniciar sesión
            </router-link>
          </button>
        </div>
        <div class="lg:flex flex-grow items-center justify-between" :class="[navbarOpen ? 'block' : 'hidden']"
          id="example-navbar-warning">
          <router-link to="/">
            <a class="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4  uppercase contenedor-logo"
              href="#pablo">
              <img :src="logoJuris" alt="" class="logo" />
            </a>
          </router-link>
          <ul class="flex flex-col lg:flex-row list-none mr-auto p-0 m-0">
            <!-- <li class="flex items-center lg:hidden">
              <router-link to="/auth/login"
                class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs">
                Iniciar sesión
              </router-link>
            </li> -->
            <li class="flex items-center">
              <router-link to="/" :class="{ 'text-primary': route.path === '/' }"
                class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs">
                Inicio
              </router-link>
            </li>
            <li class="flex items-center">
              <a href="#conoce-proposito" @click.prevent="scrollToSection('conoce-proposito')"
                class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs">
                Conócenos
              </a>
            </li>
            <li class="flex items-center">
              <router-link to="/publicaciones" :class="{ 'text-primary': route.path === '/publicaciones' }"
                class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs">
                Publicaciones
              </router-link>
            </li>
            <li class="flex items-center">
              <router-link to="/contacto" :class="{ 'text-primary': route.path === '/contacto' }"
                class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs">
                Contáctanos
              </router-link>
            </li>
          </ul>
          <ul class="flex flex-col items-center lg:flex-row list-none m-0 sm-hidden">
            <!-- <li class="flex items-end">
              <router-link to="/auth/login"
                class="p-0 m-0 text-xs font-medium px-4 py-2 outline-none focus:outline-none lg:mr-1 ml-3 ease-linear transition-all duration-150">
                Iniciar sesión
              </router-link>
            </li> -->
            <li class="flex items-end">
              <router-link to="/auth/login"
                class="bg-duo rounded-full text-white text-xs px-4 py-3 outline-none focus:outline-none lg:mr-1 ml-3 ease-linear transition-all duration-150">
                Iniciar sesión
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import logoJuris from "@/assets/img/resources/logo-jurissearch.png";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    return { route };
  },
  data() {
    return {
      logoJuris,
      navbarOpen: false,
      toggleShowAlert: true
    };
  },
  methods: {
    setNavbarOpen: function () {
      this.navbarOpen = !this.navbarOpen;
    },
    scrollToSection: (seccion = "conoce-proposito") => {
      const section = document.querySelector("#" + seccion);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  },
  components: {
    // IndexDropdown,
  },
};
</script>


<style>
.contenedor-logo {
  display: flex;
  align-items: center;
}

.logo {
  width: 100px;
}

/* // pantalla mobivl ocultar .logo */
@media (max-width: 768px) {
  .logo {
    display: none;
  }
}


.nav-bottom-gray {
  /* // linea abajo */
  padding: 5px 5px;
  border-bottom: 1px solid #e3e3e3;
}

/* // celular */
@media (max-width: 768px) {
  .nav-bottom-gray {
    padding: 15px 5px;
  }

  .sm-hidden {
    display: none;
  }
}
</style>