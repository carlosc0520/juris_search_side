<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div class="px-6">
      <div class="flex justify-center">
        <div class="avatar-container">
          <input type="file" @change="changeAvatar" ref="avatarInput" class="avatar-input" />
          <img :src="this.modelo.RTAFTO" alt="imagen_usuario" class="avatar" @click="openFileInput" />
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
        DATOS: null,
        RTAFTO: null,
      },
    };
  },
  methods: {
    formatDate(fecha, formato) {
      return moment(fecha).format(formato);
    },
    openFileInput() {
      this.$refs.avatarInput.click();
    },
    changeAvatar(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.modelo.RTAFTO = e.target.result; 
        };
        reader.readAsDataURL(file);
      }
    }
  },
  mounted() {
    // poner un placeholder si no hay imagen
    this.modelo = { ...this.data, RTAFTO: this.data.RTAFTO || 'https://dummyimage.com/300x200/000/fff' };
  },
};
</script>


<style>
  .avatar-container {
    position: relative;
    width: 100px;
    height: 100px;
    display: inline-block;
  }

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }

  .avatar-input {
    display: none;
  }

</style>