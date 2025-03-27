<template>
  <div>
    <div :class="isCollapsed ? 'hidden' : 'block'">
      <sidebar :is-collapsed="isCollapsed" :toggleSidebar="toggleSidebar" :menu="menu" />
    </div>

    <div class="relative bg-blueGray-100 transition-all duration-300">
      <admin-navbar :RTAFTO="RTAFTO" :toggleSidebar="toggleSidebar" />
      <div class="mx-auto w-full bg-view-user">
        <router-view :RTAFTO="RTAFTO" :UPDATERTAFTO="UPDATERTAFTO" />
      </div>

    </div>
  </div>
</template>

<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import homeIcon from '@/assets/img/icons/home.svg';
import busquedaIcon from '@/assets/img/icons/busqueda.svg';
import perfilIcon from '@/assets/img/icons/perfil.svg';
import mantenimientoIcon from '@/assets/img/icons/mantenimiento.svg';
import filtersIcon from '@/assets/img/icons/filters.svg';
import usersIcon from '@/assets/img/icons/users.svg';
import jurisIcon from '@/assets/img/icons/juris.svg';
import estrellaIcon from '@/assets/img/icons/estrella.svg';

export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    Sidebar,
  },
  data() {
    return {
      RTAFTO: "",
      isCollapsed: false,
      isVisible: true,
      menu: [
        { name: 'Inicio', route: '/admin/dashboard', icon: homeIcon },
        { name: 'Busqueda', route: '/admin/busqueda', icon: busquedaIcon },
        { name: 'Perfil', route: '/admin/settings', icon: perfilIcon },
        { name: 'Resoluciones', route: '/admin/entradas', icon: jurisIcon },
        { name: 'Usuarios', route: '/admin/usuarios', icon: usersIcon },
        { name: 'Filtros', route: '/admin/filtros', icon: filtersIcon },
        { name: 'Mantenimiento', route: '/admin/mantenimiento', icon: mantenimientoIcon },
        { name: "Favoritos", route: "/admin/favoritos", icon: estrellaIcon },

        // { name: 'Busqueda', route: '/admin/busqueda', icon: 'fas fa-search' },
        // { name: 'Perfil', route: '/admin/settings', icon: 'fas fa-user' },
        // { name: 'Usuarios', route: '/admin/usuarios', icon: 'fas fa-users' },
        // { name: 'Filtros', route: '/admin/filtros', icon: 'fas fa-table' },
        // { name: 'Mantenimiento', route: '/admin/mantenimiento', icon: 'fas fa-wrench' },
        // { name: "Boletines", route: "/admin/boletines", icon: "fas fa-newspaper" },
        // { name: "Reportes", route: "/admin/reportes", icon: "fas fa-chart-line" }
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    UPDATERTAFTO() {
      this.RTAFTO = JSON.parse(localStorage.getItem("user"))?.RTAFTO;
    },
  },
  // wathc al router
  watch: {
    $route(to) {
      this.isVisible = !['/admin/busqueda', '/admin/reportes'].includes(to.path);
    },
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    let RTAFTO = user?.RTAFTO;
    if (RTAFTO?.includes("comnull")) RTAFTO = null;
    this.RTAFTO = RTAFTO;
    this.isVisible = !['/admin/busqueda', '/admin/reportes'].includes(this.$route.path);
  },
};
</script>

<style>
html {
  min-height: 100%;
  position: relative;
}

body {
  margin: 0;
  background-color: #f2f6f9 !important
}

hr {
  margin-top: 0;
  margin-bottom: 0;
  border: 0;
  border-top: 1.5px solid rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 0 auto;
}


@media (min-width: 768px) {
  .ml-24 {
    margin-left: 6rem;
  }

  .ml-64 {
    margin-left: 16rem;
  }

  .w-calc100-6rem {
    width: calc(100% - 6rem) !important;
  }

  .w-calc100-16rem {
    width: calc(100% - 16rem) !important;
  }
}


/* // celular */
@media (max-width: 767px) {
  .calculator {
    margin: 0 !important;
  }
}
</style>
