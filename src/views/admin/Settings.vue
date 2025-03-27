<template>
  <div class="container-inicio pt-5">
    <CardSettings :data="modelo" v-if="!isLoading"
      :getUser="getUser" :setLoading="(ban) => isLoading = ban" :isLoading="isLoading"
    />
    <el-skeleton :rows="6" v-else />
    <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
  </div>
</template>

<script>
import CardSettings from "@/components/Cards/CardSettings.vue";
import UserProxy from "../../proxies/UserProxy";
import { toast } from 'vue3-toastify';
 

export default {
  components: {
    CardSettings,
  },
  data() {
    return {
      isLoading: true,
      modelo: {
        APATERNO: "",
        AMATERNO: "",
        NOMBRES: "",
        EMAIL: "",
        TELEFONO: "",
        FNACIMIENTO: "",
        CDESTDO: "",
        PASSWORD: "",
        FCRCN: "",
        PROFESION: "",
        CARGO: "",
        DIRECCION: "",
        DATOS: {},
        RTAFTO: "",
      },
    };
  },
  props: {
    UPDATERTAFTO: {
      type: Function,
      default: () => {},
    },
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
            RTAFTO: response.RTAFTO,
          }

          let USUARIO = JSON.parse(localStorage.getItem("user")) || {};
          USUARIO.RTAFTO = this.modelo.RTAFTO;
          localStorage.setItem("user", JSON.stringify(USUARIO));
          this.UPDATERTAFTO();
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

<style scoped>
.container-inicio{
  margin: 0 auto;
  max-width: 80%!important;
}
</style>
