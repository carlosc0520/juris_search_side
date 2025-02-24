<template>
  <div class="d-grid gap-3 mt-5 grid-personalize-columns">
    <div class="relative flex flex-col min-w-0 break-words mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div class="rounded-t bg-white mb-0 px-6 py-6">
        <div class="text-center flex justify-between">
          <h6 class="text-blueGray-700 text-xl font-bold">Mi Perfil</h6>
          <button
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            @click="save"
            :disabled="isLoading"
            >
            Guardar
          </button>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form class="row">
          <h6 class="col-12 text-blueGray-400 text-sm mt-3 mb-6 font-bold">
            Información Personal
          </h6>

          <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.NOMBRES') }">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Nombres completos <span class="text-red-500">*</span>
            </label>
            <input v-model="modelo.NOMBRES" type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="lucky.jesse" />
            <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
              {{ validation.firstError('modelo.NOMBRES') }}
            </span>
          </div>


          <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.APATERNO') }">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Apellido paterno <span class="text-red-500">*</span>
            </label>
            <input v-model="modelo.APATERNO" type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="jesse@example.com" />
            <span class="message" v-if="validation.hasError('modelo.APATERNO')">
              {{ validation.firstError('modelo.APATERNO') }}
            </span>
          </div>

          <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.AMATERNO') }">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Apellido materno <span class="text-red-500">*</span>
            </label>
            <input type="text" v-model="modelo.AMATERNO"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="Lucky" />
            <span class="message" v-if="validation.hasError('modelo.AMATERNO')">
              {{ validation.firstError('modelo.AMATERNO') }}
            </span>
          </div>

          <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.EMAIL') }">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Correo electrónico <span class="text-red-500">*</span>
            </label>
            <input type="email" v-model="modelo.EMAIL"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="Jesse" />
            <span class="message" v-if="validation.hasError('modelo.EMAIL')">
              {{ validation.firstError('modelo.EMAIL') }}
            </span>
          </div>


          <hr class="mt-6 border-b-1 border-blueGray-300" />

          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold">
            Información de Contacto
          </h6>

          <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.TELEFONO') }">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Teléfono <span class="text-red-500">*</span>
            </label>
            <input type="text" v-model="modelo.TELEFONO"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
            <span class="message" v-if="validation.hasError('modelo.TELEFONO')">
              {{ validation.firstError('modelo.TELEFONO') }}
            </span>
          </div>

          <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.FNACIMIENTO') }">
            <label for="BLOG3" class="form-label">Fecha Nacimiento <span class="text-danger">*</span></label>
            <date-picker v-model="modelo.FNACIMIENTO" :value="modelo.FNACIMIENTO" valueType="format"
              :disabledDate="time => time.getTime() > Date.now()"
              @change="(date) => modelo.FNACIMIENTO = date"></date-picker>
            <span class="message" v-if="validation.hasError('modelo.FNACIMIENTO')">
              {{ validation.firstError('modelo.FNACIMIENTO') }}
            </span>
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Dirección
            </label>
            <input type="text" v-model="modelo.DIRECCION"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Profesión
            </label>
            <input type="text" v-model="modelo.PROFESION"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="New York" />
          </div>


          <div class="col-md-6 col-12 mb-3">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Cargo
            </label>
            <input type="text" v-model="modelo.CARGO"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="United States" />
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label class="block text-blueGray-600 text-xs font-bold mb-2">
              Contraseña
            </label>
            <input type="password" v-model="modelo.PASSWORD"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              value="New York" />
          </div>

        </form>
      </div>
    </div>

    <div class="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg">
      <div class="px-6">
        <div class="flex justify-center">
          <div class="avatar-container">
            <input type="file" id="avatar-input" @change="changeAvatar" ref="avatarInput" class="avatar-input" />
            <img :src="this.modelo.RTA" alt="imagen_usuario" class="avatar" @click="openFileInput" 
             :onerror="team2"
            />
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
  </div>
</template>

<script>
import { Validator } from 'simple-vue-validator';
import UserProxy from "../../proxies/UserProxy";
import { toast } from 'vue3-toastify';
import moment from 'moment';  
import team2 from "@/assets/img/resources/perfil.png";

export default {
  props: {
    data: {
      type: Object,
      default: () => { },
    },
    getUser: {
      type: Function,
      default: () => { },
    },
    setLoading: {
      type: Function,
      default: () => { },
    },
    isLoading: {
      type: Boolean,
      default: false,
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
        DATOS: null,
        RTAFTO: null,
        RTA: null
      }
    };
  },
  validators: {
    'modelo.NOMBRES': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.APATERNO': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.AMATERNO': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.EMAIL': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.TELEFONO': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
    'modelo.FNACIMIENTO': function (value) {
      return Validator.value(value).required('Campo requerido');
    },
  },
  methods: {
    async save(e) {
      e.preventDefault();
      let validate = await this.$validate();
      if (!validate) return;

      this.setLoading(true);
      let formData = new FormData();
      Object.keys(this.modelo).forEach(key => {
        if (key !== 'RTA') formData.append(key, this.modelo[key]);
      });

      formData.append('files', this.$refs.avatarInput.files[0]);

      const loadingToast = toast.loading("Espere un momento...");
      await UserProxy.editarFoce(formData)
        .then(async response => {
          const toastMessage = response.STATUS ? "Datos actualizados con éxito" : response.MESSAGE;
          if (response.STATUS) {
            toast.success(toastMessage);
            this.reset();
            await this.getUser();
          } else {
            toast.error(toastMessage);
          }

        })
        .catch(err => toast.error(err?.MESSAGE || "Error al actualizar sus datos"))
        .finally(() => {
          toast.remove(loadingToast);
          this.setLoading(false);
        });
    },
    reset() {
      this.modelo = {
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
      };
    },
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
          this.modelo.RTA = e.target.result; 
        };
        reader.readAsDataURL(file);
      }
    }
  },
  mounted() {
    this.modelo = { ...this.data,
      RTA: this.data.RTAFTO || this.team2,
      RTAFTO: this.data.RTAFTO
     };

     for (let key in this.modelo) {
       if ([null, 'null'].includes(this.modelo[key])) this.modelo[key] = '';
     }
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

  @media (min-width: 992px) {
    .grid-personalize-columns {
        grid-template-columns: 8fr 4fr !important;
  }

  .grid-personalize-columns {
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: start;
  }
}
</style>