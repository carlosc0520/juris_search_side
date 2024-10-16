<template>
  <div>
    <!-- <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart :DATA="head.ENTRADAS" />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart :DATA="head.USUARIOS" />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-page-visits />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-social-traffic />
      </div>
    </div> -->
    <div class="container mx-auto px-4 my-0">
      <h2 class="text-center text-xl font-bold mb-2">Síguenos en Instagram</h2>
      <p class="text-center">Descubre nuestras últimas publicaciones y actualizaciones.</p>
      <iframe src="https://www.instagram.com/juris.search/embed" class="frame-instagram m-0" frameborder="0"
        scrolling="no" allowfullscreen></iframe>
    </div>
  </div>
</template>
<script>
// import CardLineChart from "@/components/Cards/CardLineChart.vue";
// import CardBarChart from "@/components/Cards/CardBarChart.vue";
// import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
// import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
// import helpersProxy from "../../proxies/helpersProxy";
// import { toast } from 'vue3-toastify';

export default {
  name: "dashboard-page",
  components: {
    // CardLineChart,
    // CardBarChart,
    // CardPageVisits,
    // CardSocialTraffic,
  },
  data() {
    return {
      head: {
        USUARIOS: 0,
        ENTRADAS: 0
      },
    };
  },
  methods: {
    // async getHead() {
    //   await helpersProxy.getHead(2)
    //     .then((response) => {
    //       if (typeof response !== 'undefined') {
    //         this.head = {
    //           USUARIOS: JSON.parse(response?.[0]?.USUARIOS) || [],
    //           ENTRADAS: JSON.parse(response?.[0]?.ENTRADAS) || []
    //         }
    //       }
    //     })
    //     .catch((error) => toast.error(error, { toastId: 'error-head' }));
    // },
  },
  mounted() {
    // this.getHead();
  },
};
</script>

<style scoped>
.frame-instagram {
  width: 100%;
  height: 100%;
  min-height: 1100px;
  border: 0;
  margin: 20px 0 50px 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);
  -webkit-box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);
  -moz-box-shadow: 8px 2px 14px 1px rgba(214, 214, 214, 0.45);
}

@media (max-width: 768px) {
  .frame-instagram {
    min-height: 500px;
  }
}
</style>