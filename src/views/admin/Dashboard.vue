<template>
  <div>
    <div class="flex flex-wrap row-container mt-4">
      <div class="xl:mb-0 px-4">
        <card-line-chart :DATA="head.ENTRADAS" />
      </div>
      <div class="px-4">
        <card-bar-chart :DATA="head.USUARIOS" />
      </div>
    </div>

    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <card-page-palabras :data="head.PALABRAS" />
      </div>
      <div class="d-none w-full xl:w-4/12 px-4">
        <card-page-visits />
      </div>
    </div>
  </div>
</template>

<style>
.row-container{
  display: grid;
  grid-template-columns: 7fr 5fr;
}

@media (max-width: 768px) {
  .row-container{
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}
</style>

<script>
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardPagePalabras from "../../components/Cards/CardPagePalabras.vue";
import helpersProxy from "../../proxies/helpersProxy";
import { toast } from 'vue3-toastify';

export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardBarChart,
    CardPageVisits,
    CardPagePalabras
    // CardSocialTraffic,
  },
  data() {
    return {
      head: {
        USUARIOS: 0,
        ENTRADAS: 0,
        PALABRAS: 0,
      },
    };
  },
  methods: {
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
