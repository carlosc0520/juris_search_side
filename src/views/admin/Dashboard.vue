<template>
<div class="container-inicio pt-5">
    <div class="grid-container">
      <div class="chart">
        <card-line-chart :DATA="head.ENTRADAS" />
      </div>
      <div class="chart">
        <card-bar-chart :DATA="head.USUARIOS" />
      </div>
    </div>

    <div class="grid-container">
      <div class="full-width">
        <card-page-palabras :data="head.PALABRAS" />
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

.container-inicio {
  padding: 20px;
  max-width: 90%;
  margin: 0 auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.chart {
  padding: 10px;
  background: white;
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  max-width: 100%;
  overflow: hidden;
}

.full-width {
  grid-column: span 2;
}

.hidden-card {
  display: none; /* Oculto, pero puedes usar @media para mostrarlo en pantallas grandes */
}

/* Responsive */
@media (min-width: 1024px) {
  .hidden-card {
    display: block;
  }
}

@media (max-width: 768px) {

  .container-inicio{
    max-width: 90%;
  }
}
</style>

<script>
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
// import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
import CardPagePalabras from "../../components/Cards/CardPagePalabras.vue";
import helpersProxy from "../../proxies/helpersProxy";
import { toast } from 'vue3-toastify';

export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardBarChart,
    // CardPageVisits,
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
