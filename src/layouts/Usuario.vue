<template>
  <div class="navbarDesign" :class="{ collapsed: isCollapsed }">
    <div class="sidebar" :class="isCollapsed ? 'w-content-0' : 'w-content-10'">
            <sidebar :is-collapsed="isCollapsed" :toggleSidebar="toggleSidebar" :menu="menu" :role="role"/>
        </div>
    <div class="main-content transition-all duration-300" :class="isCollapsed ? 'w-content-100' : 'w-content-90'">
            <admin-navbar :RTAFTO="RTAFTO" :toggleSidebar="toggleSidebar" />
            <div class="content-wrapper">
                <router-view :RTAFTO="RTAFTO" :UPDATERTAFTO="UPDATERTAFTO" />
            </div>
        </div>
    </div>
</template>

<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";

// * icons
// import homeIcon from '@/assets/img/icons/home.svg';
import busquedaIcon from '@/assets/img/icons/busqueda.svg';
import perfilIcon from '@/assets/img/icons/perfil.svg';
import estrellaIcon from '@/assets/img/icons/estrella.svg';
import subscripcionIcon from '@/assets/img/icons/subscripcion.svg';

export default {
    name: "admin-layout",
    components: {
        AdminNavbar,
        Sidebar,
    },
    props: {
        role: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            RTAFTO: JSON.parse(localStorage.getItem("user"))?.RTAFTO,
            isCollapsed: false,
            menu: [
                { name: 'Busqueda', route: '/usuario/busqueda', icon: busquedaIcon },
                { name: 'Perfil', route: '/usuario/settings', icon: perfilIcon },
                // { name: 'Publicación', route: '/usuario/dashboard', icon: homeIcon },
                { name: 'Favoritos', route: '/usuario/favoritos', icon: estrellaIcon },
                { name: 'Subscripción', route: '/usuario/subscripcion', icon: subscripcionIcon },
                // { name: "Reportes", route: "/usuario/reportes", icon: reportIcon },
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
    mounted() {
        let user = JSON.parse(localStorage.getItem("user"));
        let RTAFTO = user?.RTAFTO;
        if (RTAFTO?.includes("comnull")) RTAFTO = null;
        this.RTAFTO = RTAFTO;
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

.padding-view-usuario {
    padding-top: 6rem;
}

@media (max-width: 768px) {
    .padding-view-usuario {
        padding-top: 1rem;
    }
}

@media (max-width: 767px) {
    .calculator {
        margin: 0 !important;
    }
}
</style>