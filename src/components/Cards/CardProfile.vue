<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <img alt="..." :src="team2"
              class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20  max-w-150-px" />
          </div>
        </div>
        <div class="w-full px-4 text-center mt-20">
          <!-- <div class="flex justify-center py-4 lg:pt-4 pt-8">
            <div class="mr-4 p-3 text-center">
              <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
              <span class="text-sm text-blueGray-400">Friends</span>
            </div>
            <div class="mr-4 p-3 text-center">
              <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                10
              </span>
              <span class="text-sm text-blueGray-400">Photos</span>
            </div>
            <div class="lg:mr-4 p-3 text-center">
              <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                89
              </span>
              <span class="text-sm text-blueGray-400">Comments</span>
            </div>
          </div> -->
        </div>
      </div>
      <div class="text-center mt-4">
        <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
          {{ modelo.NOMBRES }} {{ modelo.APATERNO }} {{ modelo.AMATERNO }}
        </h3>
        <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {{ modelo.DIRECCION }}
        </div>
        <div class="mb-2 text-blueGray-600 mt-4">
          <span class="text-blueGray-400">Usuario </span>
          <span style="font-weight: bold;" :class="modelo.CDESTDO == 'A' ? 'text-emerald-500' : 'text-red-500'">
            {{ modelo.CDESTDO == 'A' ? 'Activo' : 'Inactivo' }}</span>
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200 text-left">
        <div class="flex flex-wrap">
          <div class="w-full px-4">
            <p>Activo desde: <span class="font-semibold"> {{ formatDate(modelo.FCRCN, "DD/MM/YYYY") }}</span></p>
            <p>Plan: <span class="font-semibold"> {{ modelo.DATOS?.DESCRIPCION }}</span></p>
            <p>Fecha de inicio: <span class="font-semibold"> {{ formatDate(modelo.DATOS?.FINICIO, "DD/MM/YYYY") }}</span>
            </p>
            <p>Fecha de fin: <span class="font-semibold">{{ formatDate(modelo.DATOS?.FFIN, "DD/MM/YYYY") }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import team2 from "@/assets/img/resources/perfil.png";
import moment from 'moment';

export default {
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      team2,
      modelo: {
        APATERNO: null,
        AMATERNO: null,
        NOMBRES: null,
        EMAIL: null,
        TELEFONO: null,
        FNACIMIENTO: null,
        CDESTDO: null,
        FCRCN: null,
        PASSWORD: null,
        PROFESION: null,
        CARGO: null,
        DIRECCION: null,
        DATOS: null
      }
    };
  },
  methods: {
    formatDate(fecha, formato) {
      return moment(fecha).format(formato);
    }
  },
  mounted() {
    this.modelo = { ...this.data };
  },
};
</script>
