<template>
  <!-- Header -->
  <div class="relative md:pt-32 pb-32 pt-12" style="background-color: var(--azul-primary);">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <card-stats statSubtitle="USUARIOS" :statTitle="head?.USUARIOS || 0" statPercentColor="text-emerald-500"
              statDescripiron="Since last month" statIconName="fas fa-users" statIconColor="bg-red-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <card-stats statSubtitle="JURISPRUDENCIA Y LEGISLACIÓN" :statTitle="head?.ENTRADAS || 0" statArrow="down" statPercent="3.48"
              statPercentColor="text-red-500" statDescripiron="Since last week" statIconName="fas fa-blog"
              statIconColor="bg-orange-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <card-stats statSubtitle="VISTAS LANDINGS" :statTitle="head?.VISTAS || 0" statArrow="down" statPercent="1.10"
              statPercentColor="text-orange-500" statDescripiron="Since yesterday" statIconName="fas fa-chart-pie"
              statIconColor="bg-pink-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import helpersProxy from "../../proxies/helpersProxy";
import { toast } from 'vue3-toastify';

export default {
  components: {
    CardStats,
  },
  data() {
    return {
      head: {
        USUARIOS: 0,
        ENTRADAS: 0,
        VISTAS: 0
      },
    };
  },
  methods: {
    async getHead() {
      await helpersProxy.getHead(1)
        .then((response) => {
          if (typeof response !== 'undefined') {
            this.head = {
              ...response[0]
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
