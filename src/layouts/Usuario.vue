<template>
    <div>
        <sidebar :is-collapsed="isCollapsed" :toggleSidebar="toggleSidebar" :menu="menu" />
        <div class="calculator relative bg-blueGray-100 transition-all duration-300"
            :class="isCollapsed ? 'ml-24 w-calc100-6rem ' : 'ml-64 w-calc100-16rem '">
            <admin-navbar />
            <div class="px-4 md:px-10 mx-auto w-full bg-view-user">
                <div class="padding-view-usuario">
                    <router-view />
                </div>
            </div>

            <footer-admin />
        </div>
    </div>
</template>

<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";

export default {
    name: "admin-layout",
    components: {
        AdminNavbar,
        Sidebar,
        FooterAdmin,
    },
    data() {
        return {
            isCollapsed: false,
            menu: [
                { name: 'Inicio', route: '/usuario/dashboard', icon: 'fas fa-tv' },
                { name: 'Perfil', route: '/usuario/settings', icon: 'fas fa-user' },
                { name: 'Busqueda', route: '/usuario/busqueda', icon: 'fas fa-search' },
                { name: "Favoritos", route: "/usuario/favoritos", icon: "fas fa-star" },
                { name: "Reportes", route: "/usuario/reportes", icon: "fas fa-chart-bar" },
            ],
        };
    },
    methods: {
        toggleSidebar() {
            this.isCollapsed = !this.isCollapsed;
        },
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
    background-color: #f9fafb !important;
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
        width: calc(100% - 6rem);
    }

    .w-calc100-16rem {
        width: calc(100% - 16rem);
    }
}

.padding-view-usuario{
    padding-top: 6rem;
}

@media (max-width: 768px) {
    .padding-view-usuario{
        padding-top: 1rem;
    }
}

@media (max-width: 767px) {
  .calculator {
    margin: 0!important;
  }
}

</style>