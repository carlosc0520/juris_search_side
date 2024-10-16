<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div style="z-index: 111111111!important;" class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-xl bg-blueGray-200 border-0">
          <div class="flex-auto px-4 pt-5 lg:px-10 py-10 pt-0">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-xl font-bold">
                Regístrate con tus credenciales
              </h6>
            </div>
            <form>
              <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.NOMBRES') }">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nombres <span class="text-red-500">*</span>
                </label>
                <input type="email" v-model="modelo.NOMBRES" :disabled="true"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="" />
                <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                  {{ validation.firstError('modelo.NOMBRES') }}
                </span>
              </div>

              <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.CORREO') }">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Correo Electrónico <span class="text-red-500">*</span>
                </label>
                <input type="email" v-model="modelo.CORREO" :disabled="true"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="" />
                <span class="message" v-if="validation.hasError('modelo.CORREO')">
                  {{ validation.firstError('modelo.CORREO') }}
                </span>
              </div>

              <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.PASSWORD') }">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Contraseña <span class="text-red-500">*</span>
                </label>
                <input type="password" v-model="modelo.PASSWORD"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password" />
                <span class="message" v-if="validation.hasError('modelo.PASSWORD')">
                  {{ validation.firstError('modelo.PASSWORD') }}
                </span>
              </div>

              <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.PASSWORD_CONFIRM') }">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Confirmar Contraseña <span class="text-red-500">*</span>
                </label>
                <input type="password" v-model="modelo.PASSWORD_CONFIRM"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password" />
                <span class="message" v-if="validation.hasError('modelo.PASSWORD_CONFIRM')">
                  {{ validation.firstError('modelo.PASSWORD_CONFIRM') }}
                </span>
              </div>


              <div class="text-center mt-6">
                <button @click="submit"
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="bubbles-container">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
    </div>

  </div>
</template>
<script>
import github from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";
import { Validator } from 'simple-vue-validator';
import newUserProxy from "../../proxies/NewUserProxy";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'vue3-toastify';
import confetti from 'canvas-confetti';

export default {
  data() {
    return {
      github,
      google,
      modelo: {
        NOMBRES: null,
        CORREO: null,
        APELLIDOP: null,
        APELLIDOM: null,
        TELEFONO: null,
        FNACIMIENTO: null,
        PROFESION: null,
        CARGO: null,
        DIRECCION: null,
        PASSWORD: null,
        PASSWORD_CONFIRM: null,
      },
      token: null,
    };
  },
  validators: {
    'modelo.NOMBRES': function (value) {
      return Validator.value(value).required("Campo requerido");
    },
    'modelo.CORREO': function (value) {
      return Validator.value(value).required("Campo requerido").email("Correo inválido");
    },
    'modelo.PASSWORD': function (value) {
      return Validator.value(value).required("Campo requerido").minLength(8, "Mínimo 9 caracteres");
    },
    'modelo.PASSWORD_CONFIRM': function () {
      return Validator.custom(() => {
        if (this.modelo.PASSWORD !== this.modelo.PASSWORD_CONFIRM) {
          return "Las contraseñas no coinciden";
        }
        return ""
      });
    },

  },
  methods: {
    async submit(e) {
      e.preventDefault();

      let validate = await this.$validate();
      if (!validate) return;


      const response = {
        ...this.modelo,
        APATERNO: this.modelo.APELLIDOP,
        AMATERNO: this.modelo.APELLIDOM,
        EMAIL: this.modelo.CORREO,
        TOKEN: this.token,
      };

      const loadingToast = toast.loading("Espere un momento...");
      await newUserProxy.registrar(response)
        .then(response => {
          const toastMessage = response.STATUS ? "Se ha registrado con éxito" : "Ya existe un usuario con ese correo";
          if (response.STATUS) {

            confetti({
              particleCount: 200,
              spread: 200,
              origin: { y: 0.6 }
            });


            setTimeout(() => {
              confetti({
                particleCount: 200,
                spread: 200,
                origin: { y: 0.6 }
              });
              this.$router.push("/auth/login");
            }, 3000);
          } else {
            toast.error(toastMessage);
          }

        })
        .catch(err => toast.error(err?.MESSAGE || "Error al crear al usuario"))
        .finally(() => {
          toast.remove(loadingToast);
        });


    }
  },
  async created() {
    const token = this.$route?.params?.token;
    if (token) {
      const response = await newUserProxy.validar(token);
      if (response) {
        let decodeToken = await jwtDecode(token);
        this.token = token;
        this.modelo = {
          ...this.modelo,
          ...decodeToken,
        }
        return;
      }
    }

    this.$router.push("/auth/login");
  },
};
</script>


<style>
body {
  /* background-color: rgb(248, 242, 235) !important; */
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
    opacity: 0.2;
  }

  50% {
    opacity: 0.2;
  }

  100% {
    bottom: 100%;
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>