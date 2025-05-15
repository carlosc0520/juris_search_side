<template>
  <section class="bg-landing mt-4 pt-5">
    <div class="container-table flex flex-col mt-4 pt-5">
      <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
        <a class="cursor-pointer" :class="active === 'informacionPersonal' ? 'active-tab' : ''"
          @click="updateActive('informacionPersonal')">
          Información Personal
        </a>
        <a class="cursor-pointer" :class="active === 'contactos' ? 'active-tab' : ''"
          @click="updateActive('contactos')">
          Contactos
        </a>
      </div>

      <div class="flex flex-col gap-4 mb-4">
        <div v-if="active === 'informacionPersonal'">
          <div class="flex flex-col md:flex-row justify-start gap-4 items-center mb-4">
            <div class="flex flex-row align-items-center gap-4">
              <div class="avatar-container">
                <img :src="this.modelo.RTAFTO || 'https://placehold.co/50x50'" alt="imagen_usuario" class="avatar" @click="openFileInput"
                  :onerror="team2" accept="image/*" />
                <input type="file" id="avatar-input" @change="changeAvatar" ref="avatarInput" class="avatar-input" />
              </div>
              <div class="text-left">
                <h4 class="text-lg font-bold">Sube tu foto de perfil</h4>
                <p class="">Así tus contactos te reconocerán</p>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <button class="btn btn-transparent" @click="openFileInput">Cambiar foto</button>
            </div>
          </div>

          <div class="linea"></div>

          <form class="row">
            <p class="text-blueGray-600 text-xl mb-3 font-bold">
              Datos personales
            </p>
            <div class="col-12 col-md-3 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Nombres completos <span class="text-red-500">*</span>
              </label>
              <input v-model="modelo.NOMBRES" :class="{ error: validation.hasError('modelo.NOMBRES') }" type="text"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="lucky.jesse" />
              <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                {{ validation.firstError('modelo.NOMBRES') }}
              </span>
            </div>


            <div class="col-12 col-md-3 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Apellido paterno <span class="text-red-500">*</span>
              </label>
              <input v-model="modelo.APATERNO" :class="{ error: validation.hasError('modelo.APATERNO') }" type="text"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="jesse@example.com" />
              <span class="message" v-if="validation.hasError('modelo.APATERNO')">
                {{ validation.firstError('modelo.APATERNO') }}
              </span>
            </div>

            <div class="col-12 col-md-3 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Apellido materno <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="modelo.AMATERNO" :class="{ error: validation.hasError('modelo.AMATERNO') }"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Lucky" />
              <span class="message" v-if="validation.hasError('modelo.AMATERNO')">
                {{ validation.firstError('modelo.AMATERNO') }}
              </span>
            </div>

            <div class="col-md-3 col-12 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Fecha Nacimiento <span class="text-danger">*</span></label>
              <date-picker v-model="modelo.FNACIMIENTO" :class="{ error: validation.hasError('modelo.FNACIMIENTO') }"
                :value="modelo.FNACIMIENTO" valueType="format" :disabledDate="time => time.getTime() > Date.now()"
                @change="(date) => modelo.FNACIMIENTO = date"></date-picker>
              <span class="message" v-if="validation.hasError('modelo.FNACIMIENTO')">
                {{ validation.firstError('modelo.FNACIMIENTO') }}
              </span>
            </div>

            <div class="col-md-3 col-12 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Profesión
              </label>
              <input type="text" v-model="modelo.PROFESION"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="New York" />
            </div>


            <div class="col-md-3 col-12 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Cargo
              </label>
              <input type="text" v-model="modelo.CARGO"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="United States" />
            </div>


            <div class="linea"></div>
            <p class="text-blueGray-600 text-xl mb-3 font-bold">
              Datos de contacto
            </p>

            <div class="col-md-3 col-12 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Correo electrónico <span class="text-red-500">*</span>
              </label>
              <input type="email" v-model="modelo.EMAIL" :class="{ error: validation.hasError('modelo.EMAIL') }"
                class=" px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Jesse" />
              <span class="message" v-if="validation.hasError('modelo.EMAIL')">
                {{ validation.firstError('modelo.EMAIL') }}
              </span>
            </div>

            <div class="col-md-3 col-12 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Teléfono <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="modelo.TELEFONO" :class="{ error: validation.hasError('modelo.TELEFONO') }"
                class=" px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
              <span class="message" v-if="validation.hasError('modelo.TELEFONO')">
                {{ validation.firstError('modelo.TELEFONO') }}
              </span>
            </div>

            <div class="col-md-6 col-12 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Dirección
              </label>
              <input autocomplete="off" type="text" v-model="modelo.DIRECCION"
                class=" px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Ejem: Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
            </div>

            <div class="linea"></div>

            <p class="text-blueGray-600 text-xl mb-3 font-bold">
              Datos de acceso
            </p>

            <div class="col-md-3 col-12 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Usuario
              </label>
              <input type="email" disabled v-model="modelo.EMAIL"
                class=" px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                value="Jesse" />
            </div>

            <div class="col-md-3 col-12 mb-3">
              <label class="block text-blueGray-600 text-xs font-bold mb-2">
                Contraseña <span class="text-red-500">*</span>
              </label>
              <div class="input-group mb-3" style="height: 50px;">
                <input style="padding: 10px!important;" :type="visualizar ? 'text' : 'password'"
                  v-model="modelo.PASSWORD" :class="[
                    'form-control placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150',
                    { error: validation.hasError('modelo.PASSWORD') }
                  ]" placeholder="Contraseña">
                <span class="input-group-text cursor-pointer" @click="visualizar = !visualizar">
                  <i :class="visualizar ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                </span>
              </div>

              <span class="message" v-if="validation.hasError('modelo.PASSWORD')">
                {{ validation.firstError('modelo.PASSWORD') }}
              </span>
            </div>

            <div class="col-12 mt-3">
              <button class="btn btn-primary rounded-full text-white " type="button" @click="save"
                :disabled="isLoading">
                <i class="fas fa-save"></i>
                Guardar
              </button>
            </div>
          </form>
        </div>

        <div v-if="active === 'contactos'">
          <AutoComplete v-model="contacto.search" :suggestions="contacto.data" @complete="searchSugges"
            optionLabel="DESCP" class="search-input"
            placeholder="Puedes añadir amigos con su nombre de usuario de Juris Search">
            <template #option="slotProps">
              <div class="flex justify-between items-center gap-4">
                <div class="d-flex align-items-center gap-2">
                  <img :src="slotProps.option.RTAFTO" alt="imagen_usuario" class="avatarMiniun"
                    @error="function (e) { e.target.src = 'https://placehold.co/50x50' }" />

                  <p class="text-sm text-gray-700">
                    {{ slotProps.option.DESCP }}
                    <span class="text-gray-500 text-xs">({{ slotProps.option.EMAIL.toLowerCase() }})</span>
                  </p>
                </div>

                <!-- // boton agregar o sino poner solo contacto Agregado -->
                <div class="flex justify-end">
                  <button class="btn btn-transparent" type="button" @click.stop="createContact(slotProps.option)">
                    Agregar Contacto
                  </button>


                </div>
              </div>
            </template>
          </AutoComplete>

          <div class="w-full mb-12">
            <card-table title="Contactos" :search="searchContacto" :fields="contacto.fields" :items="contacto.datos"
              :grid="contacto.grid" :actions="contacto.actions" />
          </div>
        </div>

      </div>
    </div>
    <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

  </section>
</template>

<script>
import CardTable from "@/components/Cards/CardTable.vue";

import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

import UserProxy from "@/proxies/UserProxy";
import moment from 'moment';
import team2 from "@/assets/img/resources/perfil.png";
import AutoComplete from 'primevue/autocomplete';

export default {
  components: {
    AutoComplete,
    CardTable,
  },
  data() {
    return {
      team2,
      isLoading: true,
      visualizar: false,
      active: "informacionPersonal",
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
      contacto: {
        search: null,
        data: null,
        datos: [],
        grid: {
          items: [],
          currentPage: 1,
          perPage: 10,
          totalRows: 120,
          isLoading: false,
          pageOptions: [5, 10, 15, 50],
        },
        fields: [
          { key: "RN", label: "", },
          {
            key: "RTAFTO",
            label: "Avatar",
            formatter: (value) => {
              return `<img src="${value || 'https://placehold.co/50x50'}" 
              style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; cursor: pointer;"
              alt="imagen_usuario" class="avatarMiniun" @error="function (e) { e.target.src = 'https://placehold.co/50x50' }" />`;
            },
          },
          { key: "NOMBRES", label: "Nombres" },
          { key: "APELLIDOS", label: "Apellidos" },
          { key: "EMAIL", label: "Correo" },
          { key: "ESTADO", label: "Estado" },
          {
            key: "ACCIONES",
            label: "Acciones",
            class: "text-center w-130",
          },
        ],
        actions: {
          delete: {
            label: "Eliminar",
            icon: "fas fa-trash",
            class: "btn-delete",
            action: null,
          },
        },
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
    'modelo.PASSWORD': function (value) {
      return Validator.value(value)
        .required('Campo requerido')
        .minLength(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
          'La contraseña debe tener al menos 1 letra, 1 número y 1 caracter especial'
        );
    }
  },
  props: {
    UPDATERTAFTO: {
      type: Function, default: () => { },
    },
  },
  methods: {
    async save(e) {
      e.preventDefault();
      let validate = await this.$validate();
      if (!validate) return;

      let formData = new FormData();
      Object.keys(this.modelo).forEach(key => {
        if (key !== 'RTAFTO') formData.append(key, this.modelo[key]);
      });

      formData.append('files', this.$refs.avatarInput.files[0]);

      this.isLoading = true;
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
          this.isLoading = false;
        });
    },
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
        })
        .catch((error) => {
          toast.error(error?.MESSAGE || 'Error al cargar los magistrados', { toastId: 'error-magistrados' })
        })
        .finally(() => this.isLoading = false);
    },
    updateActive(text) {
      this.active = text;
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
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.modelo.RTAFTO = e.target.result;
        };
        reader.readAsDataURL(file);
      } else if (file) {
        toast.warning("El archivo seleccionado no es una imagen", { toastId: 'error-avatar' });
      }
    },
    // CONTACTO
    async searchSugges() {
      if (this.contacto.search.length < 6) return;

      await UserProxy.list({
        ROWS: 10000,
        INIT: 0,
        DESC: this.contacto.search.trim(),
        CESTDO: 'A'
      }, '10')
        .then((dataresponse) => {
          this.contacto.data = dataresponse.map((item) => {
            return {
              ...item,
              DESCP: this.formatearTexto((item?.NOMBRES || '') + " " + (item?.APATERNO || '') + " " + (item?.AMATERNO || '')),
            };
          });
        })
        .catch((error) => {
          this.contacto.data = null;
          toast.error(error?.MESSAGE || 'Error al cargar los contactos', { toastId: 'error-contactos' });
        })
    },
    formatearTexto(texto) {
      return texto
        .split(" ")
        .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(" ");
    },
    searchContacto() {
      this.contacto.grid.isLoading = true;
      console.log({
        ROWS: this.contacto.grid.perPage,
        INIT: (this.contacto.grid.currentPage - 1) * this.contacto.grid.perPage,
        CDESTDO: 'A'
      })
      UserProxy.getContactos({
        ROWS: this.contacto.grid.perPage,
        INIT: (this.contacto.grid.currentPage - 1) * this.contacto.grid.perPage,
        CDESTDO: 'A'
      })
        .then((dataresponse) => {
          console.log(dataresponse);
          this.contacto.datos = dataresponse.map((item, index) => {
            return {
              RN: index + 1,
              ...item,
              DESCP: this.formatearTexto((item?.NOMBRES || '') + " " + (item?.APATERNO || '') + " " + (item?.AMATERNO || '')),
            };
          });
          this.contacto.grid.totalRows = dataresponse[0]?.TOTALROWS || 0;
        })
        .catch((error) => {
          this.contacto.datos = null;
          toast.error(error?.MESSAGE || 'Error al cargar los contactos', { toastId: 'error-contactos' });
        })
        .finally(() => this.contacto.grid.isLoading = false);
    },
    async createContact(data) {
      this.$swal({
        title: "Agregar contacto",
        text: `¿Está seguro de agregar a ${data.DESCP} como contacto?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, cancelar",
        confirmButtonText: "Sí, continuar",
        dangerMode: true,
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            await UserProxy.createContacto({
              IDRECEPT: data.ID,
              ESTADO: 'false',
              CDESTDO: 'A'
            })
              .then((response) => {
                const toastMessage = response.STATUS ? "Solicitud de contacto creado con éxito" : response.MESSAGE;
                if (response.STATUS) {
                  toast.success(toastMessage);
                  this.contacto.search = null;
                  this.contacto.data = null;
                  this.searchContacto();
                } else {
                  toast.error(toastMessage);
                }
              })
              .catch((error) => {
                toast.error(error?.MESSAGE || 'Error al agregar contacto', { toastId: 'error-contactos' });
              })
              .finally(() => this.isLoading = false);
          }
        })
        .catch((err) => toast.error(err?.MESSAGE || 'Error al iniciar sesión'));

      return;
    },
    async deleteContacto(item){
      this.$swal({
        title: "Eliminar contacto",
        text: `¿Está seguro de eliminar a ${item.NOMBRES} ${item.APELLIDOS} como contacto?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, cancelar",
        confirmButtonText: "Sí, continuar",
        dangerMode: true,
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            await UserProxy.deleteContacto(item.ID)
              .then((response) => {
                const toastMessage = response.STATUS ? "Contacto eliminado con éxito" : response.MESSAGE;
                if (response.STATUS) {
                  toast.success(toastMessage);
                  this.contacto.search = null;
                  this.contacto.data = null;
                  this.searchContacto();
                } else {
                  toast.error(toastMessage);
                }
              })
              .catch((error) => {
                toast.error(error?.MESSAGE || 'Error al eliminar contacto', { toastId: 'error-contactos' });
              })
              .finally(() => this.isLoading = false);
          }
        })
        .catch((err) => toast.error(err?.MESSAGE || 'Error al iniciar sesión'));
      return;
    }
  },
  watch: {
    active(newValue) {
      if (newValue === 'contactos') {
        this.searchContacto();
      }
    },
  },
  mounted() {
    this.contacto.actions = {
      ...this.contacto.actions,
      delete: {
        ...this.contacto.actions.delete,
        action: (item) => {
          this.deleteContacto(item);
        },
      },
    }
    this.getUser();
  },
};
</script>

<style scoped>
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

.container-inicio {
  margin: 0 auto;
  max-width: 80% !important;
}

@media (max-width: 768px) {

  .container-inicio {
    max-width: 90%;
    padding: 3.25rem 0px !important;
    max-width: 95% !important;
  }
}

.linea {
  width: 100%;
  height: 1px;
  background-color: #c0c0c0;
  margin: 1rem 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 14px;
  width: 100%;
}

.avatarMiniun {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.p-autocomplete-option {
  display: block !important;
}
</style>
