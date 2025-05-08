<template>
  <section class="bg-landing mt-4 pt-5">
    <div class="container-table flex flex-col mt-4 pt-5">
      <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
        <a class="cursor-pointer" :class="active === 'Resoluciones' ? 'active-tab' : ''" @click="updateActive('Resoluciones')">
          Resoluciones
        </a>
        <a class="cursor-pointer" :class="active === 'Usuarios' ? 'active-tab' : ''" @click="updateActive('Usuarios')">
          Usuarios
        </a>
      </div>

      <div class="w-full mb-12">
        <div v-if="active === 'Resoluciones'">
          <card-area-chart :DATA="head.ENTRADAS" title="Iteración de Resoluciones"/>
        </div>
        <div v-if="active === 'Usuarios'">
          <card-area-chart :DATA="head.USUARIOS" title="Iteración de Usuarios"/>
        </div>
        <card-page-palabras TITLE="Ultimas búsquedas" :data="head.PALABRAS" />
      </div>

      <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
    </div>
  </section>
</template>


<script>
import CardPagePalabras from "../../components/Cards/CardPagePalabras.vue";
import CardAreaChart from "@/components/Cards/CardAreaChart.vue";
import { toast } from 'vue3-toastify';
import searchIcon from "@/assets/img/icons/search.svg";
import helpersProxy from "../../proxies/helpersProxy";

// PROXIES
// import MantenimientoProxy from '../../proxies/MantenimientoProxy';

export default {
  components: {
    CardAreaChart,
    CardPagePalabras
  },
  data() {
    return {
      searchIcon,
      isLoading: false,
      active: "Resoluciones",
      head: {
        USUARIOS: 0,
        ENTRADAS: 0,
        PALABRAS: 0,
      },
    };
  },
  props: {
    role: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    updateActive(text) {
      this.active = text;
      // if (text == 'noticias') this.searchNoticias(this.grid.currentPage, this.grid.perPage);
      // if (text == 'autores') this.searchAutores(this.grid.currentPage, this.grid.perPage);
      // if (text == 'categorias') this.searchCategorias(this.grid.currentPage, this.grid.perPage);
    },
    async getHead() {
      await helpersProxy.getHead(2)
        .then((response) => {
          if (typeof response !== 'undefined') {
            this.head = {
              USUARIOS: JSON.parse(response?.[0]?.USUARIOS) || [],
              ENTRADAS: JSON.parse(response?.[0]?.ENTRADAS) || [],
              PALABRAS: JSON.parse(response?.[0]?.PALABRAS) || []
            }
          }
        })
        .catch((error) => toast.error(error, { toastId: 'error-head' }));
    },
  },
  mounted() {
    this.getHead();
  },
};
</script>

<style scoped>
.container-table {
  max-width: 90%;
  margin: 0 auto;
}
</style>