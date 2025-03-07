<template>
  <div class="min-h-screen bg-gray-200 text-gray-900 flex justify-center">
    <div class="log-grid w-full m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-col lg:flex-row">
      <div class="bg-gray-50 p-6 sm:p-12 flex justify-center items-center h-full relative">
        <div class="opacity-25 rotate-background" :style="`background-image: url('${registerBg2}');`"></div>

        <div class="relative flex flex-col min-w-0 break-words w-10/12 mb-6 rounded-lg z-10">
          <div class="rounded-t mb-0 px-6 py-6 text-center">
            <a class="inline-block uppercase hover">
              <img :src="logoJuris" alt="" class="w-1/2 md:w-64 mx-auto" @click="$router.push('/')" />
            </a>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>

          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>
                Inicia sesión con tus credenciales
              </small>
            </div>
            <form @submit.prevent="signIn">
              <div class="form-group" :class="{ error: validation.hasError('form.EMAIL') }">
                <label for="Email">
                  Email
                </label>
                <input type="text" class="form-control" v-model="form.EMAIL" id="Email" autocomplete="off" />
                <span class="message" v-if="validation.hasError('form.EMAIL')">
                  {{ validation.firstError('form.EMAIL') }}
                </span>
              </div>

              <div class="form-group" :class="{ error: validation.hasError('form.PASSWORD') }">
                <label for="Password">
                  Contraseña
                </label>
                <div class="input-group position-relative overflow-hidden" style="border-radius: 0.375rem !important;">
                  <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="form.PASSWORD" id="Password" autocomplete="off" />
                  <button id="btnToggleShowPassword" type="button" class="btn" @click="togglePassword">
                    <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                  </button>
                </div>
                <span class="message" v-if="validation.hasError('form.PASSWORD')">
                  {{ validation.firstError('form.PASSWORD') }}
                </span>
              </div>

              <div class="flex justify-end mt-2">
                <a href="#" class="text-blue-500"
                  @click="modalRecuperarContrasena.show = true;"
                >¿Olvidaste tu contraseña?</a>
              </div>

              <div class="text-center mt-10">
                <button
                  class="btn-search text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit">
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>


        <!-- // burbujitas -->
        <!-- Burbujitas (actualizado) -->
        <div class="bubbles-container">
          <!-- <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div> -->
        </div>

      </div>

      <div class="flex-1 brightness xl-w-auto text-center hidden lg:flex rounded-lg">
        <transition name="fade">
          <div v-if="noticias.length > 0"
            class="bg-image-noticia relative w-full bg-contain bg-end-image bg-no-repeat transition-opacity duration-500"
            :style="{ backgroundImage: `url(${noticias[currentNoticia]?.IMAGEN2 || ''})`, backgroundSize: 'cover' }">
            <div class="absolute layout-text p-4 text-left">
              <h2 class="text-lg font-bold text-white">{{ noticias[currentNoticia]?.TITULO || '' }}</h2>
              <p class="text-sm text-white">{{ noticias[currentNoticia]?.DESCRIPCION || '' }}</p>
            </div>
          </div>
        </transition>
      </div>

      <ModalRecuperarContrasena  :show="modalRecuperarContrasena.show" :close="() => modalRecuperarContrasena.show = false"
        :update="() => { }" />
      <LoadingOverlay :active="isloading" :is-full-page="false" :loader="'bars'" />
    </div>
  </div>
</template>

<script>
import github from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";
import logoJuris from "@/assets/img/logos/logo-completo.png";
import LoginProxy from "../../proxies/LoginProxy";
import registerBg2 from "@/assets/img/register_bg_2.png";
import ModalRecuperarContrasena from "./Modales/ModalRecuperarContrasena.vue";

// FUNCTIONS
import { toast } from 'vue3-toastify';
import { Validator } from 'simple-vue-validator';

export default {
  components: {
    ModalRecuperarContrasena
  },
  data() {
    return {
      showPassword: false,
      github,
      google,
      logoJuris,
      registerBg2,

      rememberMe: false,
      noticias: [],
      isloading: false,
      currentNoticia: 0,

      modalRecuperarContrasena: {
        show: false,
        data: null,
      },
      form: {
        EMAIL: '',
        PASSWORD: '',
        IND: null,
        BANDERA: false
      },

    };
  },
  validators: {
    'form.EMAIL': function (value) {
      return Validator.value(value).required("Campo requerido").email("Email no válido");
    },
    'form.PASSWORD': function (value) {
      return Validator.value(value).required("Campo requerido").minLength(6, "La contraseña debe tener al menos 6 caracteres");
    }

  },
  methods: {
    fetchNoticias() {
      this.isloading = true;
      LoginProxy.list({
        INIT: 0,
        ROWS: 4,
        DESC: null,
        CESTDO: 'A'
      })
        .then(async (response) => {
          this.noticias = await Promise.all(response.map(async noticia => {
            const type = noticia.IMAGEN.split('.').pop();
            let base64String = '';

            if (!noticia.IMAGEN2) return noticia;

            for (let i = 0; i < noticia.IMAGEN2.data.length; i++) {
              base64String += String.fromCharCode(noticia.IMAGEN2.data[i]);
            }
            noticia.IMAGEN2 = `data:image/${type};base64,${window.btoa(base64String)}`;
            return noticia;
          }));
        })
        .catch((error) => {
          toast.error(error?.message || 'Error al cargar las noticias')
        })
        .finally(() => {
          this.isloading = false;
          this.startImageRotation();
        });
    },
    startImageRotation() {
      setInterval(() => {
        this.currentNoticia = (this.currentNoticia + 1) % this.noticias.length;
      }, 4000);
    },

    async signIn() {
      let validate = await this.$validate();
      if (!validate) return;

      this.isloading = true;
      LoginProxy.login(this.form)
        .then((response) => {
          if (response?.status == 201) {
            let { TOKEN, NOMBRES, EMAIL, RTAFTO } = response.data;
            localStorage.setItem('accessToken', TOKEN);
            localStorage.setItem('user', JSON.stringify({ NOMBRES, EMAIL, RTAFTO}));
            this.$router.push('/redirect');
          }
        })
        .catch((err) => {
          if (err?.OPTION == 1) {
            this.$swal({
              title: err?.MESSAGE,
              text: '¿Confirme si desea continuar?',
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              cancelButtonText: "No, cancelar",
              confirmButtonText: "Sí, continuar",
              dangerMode: true,
            })
              .then((result) => {
                if (result.isConfirmed) {
                  this.form.BANDERA = true;
                  this.signIn();
                }
              })
              .catch((err) => toast.error(err?.MESSAGE || 'Error al iniciar sesión'));

            return;
          }


          toast.error(err?.MESSAGE || 'Error al iniciar sesión')
        })
        .finally(() => {
          this.isloading = false;
        });

    },
    updateOpen(){
      console.log("aaaaaaaa")
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  },
  mounted() {
    this.fetchNoticias();
  },
};
</script>

<style>
.log-grid {
  display: grid;
  grid-template-columns: 3fr 4fr;
}

.log-grid input {
  margin: 0;
}


@media (max-width: 1024px) {
  .log-grid {
    display: block;
  }
}


input {
  background-color: #f2f6f9 !important;
}

input:focus {
  background-color: #f2f6f9 !important;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bg-image-noticia {
  mask-image: linear-gradient(right, rgb(160, 114, 114) 98%, transparent);
}

.layout-text {
  bottom: 40%;
  left: 0;
  width: 100%;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.layout-text h2 {
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
}

.layout-text p {
  letter-spacing: 0.1rem;
  font-size: 1rem;
}


/* // * animation */
.opacity-25 {
  opacity: 0.25;
}

.bubbles-container {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bubble {
  position: absolute;
  bottom: -80px;
  width: 70px;
  height: 50px;
  border-radius: 50%;
  animation: rise 5s infinite ease-in;
  opacity: 0.1;
}

/* background-color: #e81eb2ff;
background-color: #1764ffff; */

/* // par fusia impar azul */
.bubble:nth-child(odd) {
  background-color: #1764ffff;
}

.bubble:nth-child(even) {
  background-color: #e81eb2ff;
}


.bubble:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
}

.bubble:nth-child(2) {
  left: 20%;
  animation-delay: 2s;
}

.bubble:nth-child(3) {
  left: 30%;
  animation-delay: 1s;
}

.bubble:nth-child(4) {
  left: 40%;
  animation-delay: 4s;
}

.bubble:nth-child(5) {
  left: 50%;
  animation-delay: 6s;
}

.bubble:nth-child(6) {
  left: 60%;
  animation-delay: 5s;
}

.bubble:nth-child(7) {
  left: 70%;
  animation-delay: 3s;
}

.bubble:nth-child(8) {
  left: 80%;
  animation-delay: 6s;
}

.bubble:nth-child(9) {
  left: 90%;
  animation-delay: 5s;
}

.bubble:nth-child(10) {
  left: 95%;
  animation-delay: 4s;
}

@keyframes rise {
  0% {
    bottom: 0;
    transform: translateY(0);
    opacity: 0.1;
  }

  50% {
    opacity: 0.1;
  }

  100% {
    bottom: 100%;
    transform: translateY(-100%);
    opacity: 0;
  }
}

#btnToggleShowPassword {
  border: none;
  position: absolute;
  right: 0;
  z-index: 5;
  top: .4rem;
}
</style>
