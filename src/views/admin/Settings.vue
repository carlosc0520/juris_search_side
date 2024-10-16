<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full lg:w-8/12 px-4">
        <CardSettings :data="modelo" v-if="!isLoading" 
          :getUser="getUser" :setLoading="(ban) => isLoading = ban" :isLoading="isLoading"
        />
        <el-skeleton :rows="6" v-else />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <CardProfile :data="modelo" v-if="!isLoading" />
        <el-skeleton :rows="6" v-else />
      </div>
    </div>
    <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

  </div>
</template>


<script>
import CardSettings from "@/components/Cards/CardSettings.vue";
import CardProfile from "@/components/Cards/CardProfile.vue";
import UserProxy from "../../proxies/UserProxy";
import { toast } from 'vue3-toastify';
 

export default {
  components: {
    CardSettings,
    CardProfile,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    async getUser() {
      this.isLoading = true;
      await UserProxy.getUsuario()
        .then((response) => {
          this.modelo = {
            APATERNO: response.APATERNO,
            AMATERNO: response.AMATERNO,
            NOMBRES: response.NOMBRES,
            EMAIL: response.EMAIL,
            TELEFONO: response.TELEFONO,
            FNACIMIENTO: response.FNACIMIENTO,
            CDESTDO: response.CDESTDO,
            PASSWORD: response.PASSWORD,
            FCRCN: response.FCRCN?.split("T")[0],
            PROFESION: response.PROFESION,
            CARGO: response.CARGO,
            DIRECCION: response.DIRECCION,
            DATOS: JSON.parse(response.DATOS)?.[0] || {},
          }
        })
        .catch((error) => {
          toast.error(error?.MESSAGE || 'Error al cargar los magistrados', { toastId: 'error-magistrados' })
        })
        .finally(() => this.isLoading = false);
    },
  },

  mounted() {
    this.getUser();
  },
};
</script>
