<template>
  <nav :class="[
    'p-0 md:left-0 md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  bg-white flex flex-wrap items-center justify-between relative z-10 py-4 transition-all duration-300',
    isCollapsed ? 'w-24' : 'md:w-64',
  ]">
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
      <!-- Toggler para pantallas grandes (botón para colapsar/expandir) -->
      <button
        class="cursor-pointer text-black opacity-50 px-3 py-1 text-xl leading-none bg-transparent rounded border-transparent hidden md:block"
        type="button" :class="isCollapsed ? 'text-center' : 'text-end'" @click="toggleSidebar">
        <i :class="!isCollapsed ? 'fas fa-bars' : 'fas fa-times'"></i>
      </button>

      <!-- Botón para abrir menú en pantallas pequeñas -->
      <button
        class="cursor-pointer text-black opacity-50 px-3 py-1 text-xl leading-none bg-transparent rounded border-transparent md:hidden block"
        type="button" @click="toggleCollapseShow">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Brand // ocultar pantalla chica -->
      <router-link v-if="!isCollapsed" class="text-center md:block
        hidden
        text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-lg uppercase font-bold p-4 px-0"
        :class="isCollapsed ? 'hidden' : ''" to="/">
        <span style="color: var(--azul-primary); font-family: 'Font Awesome 5 Brands';">JURIS</span>&nbsp;
        <span style="color: var(--lila-primary); font-family: 'Font Awesome 5 Brands';">SEARCH</span>
      </router-link>
      <router-link v-else
        class="text-center md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-lg uppercase font-bold p-4 px-0"
        :class="isCollapsed ? 'hidden' : ''" to="/">
        <img :src="logo" alt="logo" />
      </router-link>
      <!-- User (en pantallas pequeñas) -->
      <!-- Collapse content para pantallas pequeñas -->
      <div :class="[
        'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded',
        collapseShow ? 'block bg-white h-svh' : 'hidden']"
        :style="{ height: collapseShow ? '100vh!important' : 'auto' }">
        <!-- Sidebar Header (colapsable en pantallas pequeñas) -->
        <div class="md:min-w-full md:hidden block  border-b border-solid border-blueGray-200 flex justify-end my-4"
          :class="isCollapsed ? 'hidden' : ''">
          <div class="flex flex-wrap">
            <div class="w-12/12 flex justify-end">
              <button type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent border-transparent"
                @click="toggleCollapseShow">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Heading -->
        <h6 class="px-4 md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline"
          :class="isCollapsed ? 'hidden' : ''">
          Panel de Administración
        </h6>

        <!-- Menú de items -->
        <ul class="md:flex-col md:min-w-full flex flex-col list-none"
        :class="isCollapsed ? 'align-sidebar-responsive' : 'align-sidebar'"
        >
          <li class="items-start" v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.route" v-slot="{ href, navigate, isActive }">
              <a :href="href" @click="navigate" class="text-xs uppercase py-3 font-bold block text-left flex gap-4"
                :class="[isActive ? 'text-emerald-500 hover:text-emerald-600' : 'text-blueGray-700 hover:text-blueGray-500']">
                <div class="text-center" style="width: 1rem;">
                  <i :class="item.icon + ' mr-0 md:mr-2 text-sm'"></i>
                </div>
                <span :class="isCollapsed ? 'hidden' : ''">{{ item.name }}</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
      <ul class="md:hidden m-0 flex-col md:flex-row list-none justify-end items-center mx-4">
        <user-dropdown />
      </ul>
    </div>
  </nav>
</template>

<script>
import logo from '@/assets/img/logos/logo.png';
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  data() {
    return {
      logo,
      collapseShow: false,
      menuItems: this.menu
    };
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    toggleSidebar: {
      type: Function,
      default: () => { },
    },
    menu: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    UserDropdown,
  },
  methods: {
    toggleCollapseShow() {
      this.collapseShow = !this.collapseShow;
    },
  },
};
</script>

<style scoped>
nav {
  z-index: 1000;
  box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);
  -webkit-box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);
  -moz-box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);

}

/* // escritorio */
@media (min-width: 768px) {
  .w-24 {
    width: 5rem;
  }

  .w-50 {
    width: 18rem !important;
  }
}

.align-sidebar{
  display: flex;
  justify-content: center;
  padding-left: 2rem!important;
}

.align-sidebar-responsive{
  display: flex;
  justify-content: center;
  align-items: center;
}

.h-svh{
  height: 100vh!important;
}
</style>