<template>
  <nav class="top-0 left-0 bottom-0 bg-white px-2 z-50 flex flex-col items-center transition-all duration-300 py-2">
    <!-- Botón de menú y logo -->
    <div class="flex flex-col align-items-center justify-center w-24 h-24 bg-white rounded-lg mb-4">
      <button class="p-2 rounded-lg transition duration-300 hover:bg-gray-200 flex items-center justify-center mb-2"
        @click="toggleSidebar">
        <img src="@/assets/img/icons/menu.svg" alt="Menu" class="w-6 h-6" />
      </button>
      <router-link to="/">
        <img v-tooltip.left="{
          value: 'Haz click para dirigirte a la página de inicio.',
          // TAMAÑO DE LETRA PEQUEÑO
          style: {
            fontSize: '0.75rem',
            color: '#4A5568', // Gray 700
          },
        }" src="@/assets/img/logos/logo-nav.png" alt="Logo" class="w-24 h-24" />
      </router-link>
    </div>

    <!-- Menú -->
    <div class="flex flex-col w-full">
      <ul class="flex flex-col items-center w-full gap-2 p-0">
        <li v-for="(item, index) in menuItems" :key="index" class="w-full">
          <router-link :to="item.route" v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate"
              class="flex flex-col items-center rounded-lg transition-all duration-300 ease-in-out text-gray-700"
              :class="[isActive ? 'bg-palette-1' : 'bg-white']">

              <div class="w-10 h-10 flex items-center justify-center">
                <img :src="item.icon" alt="Icon"
                  class="w-6 h-6 opacity-80 transition-opacity duration-200 hover:opacity-100" />
              </div>

              <span class="text-xs font-semibold mt-1 text-center">{{ item.name }}</span>
            </a>
          </router-link>
          <hr v-if="index < menuItems.length - 1" class="border-gray-200 my-2 w-2/3">
        </li>
      </ul>
    </div>
  </nav>



</template>



<script>
import logo from '@/assets/img/logos/logo.png';

export default {
  data() {
    return {
      logo,
      collapseShow: false,
      menuItems: []
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
    role: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    toggleCollapseShow() {
      this.collapseShow = !this.collapseShow;
    },
  },
  mounted() {
    if (this.menu && this.menu.length > 0) {
      this.menuItems = this.menu;
      if (["1"].includes(this.role.IDPLN)) {
        this.menuItems = this.menuItems.filter(item => item.name !== 'Favoritos');
      }
    }
  },
};
</script>





<style scoped>
nav {
  z-index: 1000;
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

.align-sidebar {
  display: flex;
  justify-content: center;
  padding-left: 2rem !important;
}

.align-sidebar-responsive {
  display: flex;
  justify-content: center;
  align-items: center;
}

.h-svh {
  height: 100vh !important;
}
</style>