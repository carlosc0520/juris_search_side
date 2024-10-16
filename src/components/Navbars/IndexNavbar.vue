<template>
  <nav
    class="nav-bottom-gray bg-blueGray-100 top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
    <div class="container m-0 py-2 px-4 mx-auto flex flex-wrap items-center justify-between flex align-center">
      <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button" v-on:click="setNavbarOpen">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div class="lg:flex flex-grow items-center" :class="[navbarOpen ? 'block' : 'hidden']"
        id="example-navbar-warning">
        <ul class="flex flex-col lg:flex-row list-none mr-auto p-0 m-0">
          <li>
            <router-link to="/">
              <a class="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4  uppercase contenedor-logo" href="#pablo">
                <img :src="logoJuris" alt="" width="100"  class="logo"/>
              </a>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link to="/"
              class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold">
              <i class="text-blueGray-400 text-lg leading-lg mr-2 fas fa-home" />
              Inicio
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link to="/noticias"
              class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold">
              <i class="text-blueGray-400 text-lg leading-lg mr-2 fas fa-newspaper" />
              Noticias
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link to="/contacto"
              class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold">
              <i class="text-blueGray-400 text-lg leading-lg mr-2 fas fa-envelope" />
              Contacto
            </router-link>
          </li>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto align-center mb-0">
          <li class="flex items-center">
            <!-- <index-dropdown /> -->
          </li>

          <li class="flex items-center m-0 p-0">
            <router-link to="/auth/login"
              class="p-0 m-0 bg-app-primary text-white active:bg-emerald-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 ease-linear transition-all duration-150">
              <i class="fas fa-sign-in-alt"></i>
              Iniciar Sesión
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import logoJuris from "@/assets/img/logos/logo-completo.png";

export default {
  data() {
    return {
      logoJuris,
      navbarOpen: false,
    };
  },
  methods: {
    setNavbarOpen: function () {
      this.navbarOpen = !this.navbarOpen;
    },
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
  width: 65px;
}

/* // pantalla mobivl ocultar .logo */
@media (max-width: 768px) {
  .logo {
    display: none;
  }
}


.nav-bottom-gray{
  /* // linea abajo */
  border-bottom: 1px solid #e3e3e3;
}

</style>