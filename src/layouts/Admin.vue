<template>
  <div>
    <sidebar :is-collapsed="isCollapsed" :toggleSidebar="toggleSidebar" :menu="menu" />
    <div class="calculator relative bg-blueGray-100 transition-all duration-300"
      :class="isCollapsed ? 'ml-24 w-calc100-6rem' : 'ml-64 w-calc100-16rem'">
      <admin-navbar :RTAFTO="RTAFTO" />
      <header-stats v-if="isVisible" />
      <div class="px-4 md:px-10 mx-auto w-full">
        <router-view :RTAFTO="RTAFTO" :UPDATERTAFTO="UPDATERTAFTO" />
      </div>

      <hr>
      <footer-admin />
    </div>
  </div>
</template>

<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";

export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    Sidebar,
    HeaderStats,
    FooterAdmin,
  },
  data() {
    return {
      RTAFTO: "",
      isCollapsed: false,
      isVisible: true,
      menu:  [
        { name: 'Inicio', route: '/admin/dashboard', icon: 'fas fa-tv' },
        { name: 'Perfil', route: '/admin/settings', icon: 'fas fa-user' },
        { name: 'Jurisprudencia y legislación', route: '/admin/entradas', icon: 'fas fa-tools' },
        { name: 'Usuarios', route: '/admin/usuarios', icon: 'fas fa-users' },
        { name: 'Filtros', route: '/admin/filtros', icon: 'fas fa-table' },
        { name: 'Mantenimiento', route: '/admin/mantenimiento', icon: 'fas fa-wrench' },
        { name: 'Busqueda', route: '/admin/busqueda', icon: 'fas fa-search' },
        { name: "Favoritos", route: "/admin/favoritos", icon: "fas fa-star" },
        { name: "Boletines", route: "/admin/boletines", icon: "fas fa-newspaper" },
        { name: "Reportes", route: "/admin/reportes", icon: "fas fa-chart-line" }
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

<style >
html {
  min-height: 100%;
  position: relative;
}

body {
  margin: 0;
  background-color: #f2f6f9 !important
}

hr{
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
    width: calc(100% - 6rem)!important;
  }

  .w-calc100-16rem {
    width: calc(100% - 16rem)!important;
  }
}


/* // celular */
@media (max-width: 767px) {
  .calculator {
    margin: 0!important;
  }
}
</style>
