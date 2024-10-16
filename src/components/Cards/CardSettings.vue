<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
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
</template>

<script>
import { Validator } from 'simple-vue-validator';
import UserProxy from "../../proxies/UserProxy";
import { toast } from 'vue3-toastify';

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
      const loadingToast = toast.loading("Espere un momento...");
      await UserProxy.editarFoce(this.modelo)
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
        .catch(err => toast.error(err?.MESSAGE || "Error al actualziar sus datos"))
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
  },
  mounted() {
    this.modelo = { ...this.data };
  },
};

</script>
