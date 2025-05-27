<template>
  <div class="form-login">
    <div class="flex justify-between items-center mb-4 px-5" style="width: 100%;">
      <img src="@/assets/img/logos/logo-full.png" @click="$router.push('/')" alt="Logo" class="h-10 cursor-pointer" />
      <div class="text-sm">
        <button @click.prevent="$router.push('/auth/login')" class="btn-registrate ml-2 text-blue-500 hover:underline">
          Iniciar sesión
        </button>
      </div>
    </div>

    <div v-if="paseForm == 1" class="bg-white p-8 rounded-xl shadow-lg w-5/6 form-login-with">
      <h3 class="text-lato-700 text-center">Registrar cuenta</h3>
      <div class="social-buttons mt-4">
        <button class="social-btn">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" class="icon">
          Registrarse con Google
        </button>

        <button class="social-btn">
          <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn Logo" class="icon">
          Registrarse con LinkedIn
        </button>
      </div>

      <div class="separator">
        <span>o registrar cuenta con</span>
      </div>

      <form class="mt-4">
        <div>
          <div class="input-group" :class="{ error: validation.hasError('form.EMAIL') }">
            <img src="@/assets/img/icons/email.svg" alt="Email Icon" class="input-icon">
            <input type="email" placeholder="Correo electrónico" autocomplete="off" v-model="form.EMAIL"
              class="input-field">
          </div>
          <span v-if="validation.hasError('form.EMAIL')" class="text-red-500 text-sm">
            {{ validation.firstError('form.EMAIL') }}
          </span>
        </div>

        <div>
          <div class="input-group" :class="{ error: validation.hasError('form.PASSWORD') }">
            <img src="@/assets/img/icons/look.svg" alt="Password Icon" class="input-icon">
            <input placeholder="Contraseña" class="input-field" id="password" :type="showPassword ? 'text' : 'password'"
              v-model="form.PASSWORD" autocomplete="off">
            <button type="button" class="eye-icon" @click="togglePassword(1)">
              <img v-if="!showPassword" src="@/assets/img/icons/eye.svg" alt="Eye Open Icon" class="eye-icon">
              <img v-else src="@/assets/img/icons/eye-look.svg" alt="Eye Close Icon" class="eye-icon">
            </button>
          </div>
          <span v-if="validation.hasError('form.PASSWORD')" class="text-red-500 text-sm">
            {{ validation.firstError('form.PASSWORD') }}
          </span>
        </div>

        <div>
          <div class="input-group" :class="{ error: validation.hasError('form.PASSWORDREO') }">
            <img src="@/assets/img/icons/look.svg" alt="Password Icon" class="input-icon">
            <input placeholder="Contraseña" class="input-field" id="password"
              :type="showPassword2 ? 'text' : 'password'" v-model="form.PASSWORDREO" autocomplete="off">
            <button type="button" class="eye-icon" @click="togglePassword(2)">
              <img v-if="!showPassword2" src="@/assets/img/icons/eye.svg" alt="Eye Open Icon" class="eye-icon">
              <img v-else src="@/assets/img/icons/eye-look.svg" alt="Eye Close Icon" class="eye-icon">
            </button>
          </div>
          <span v-if="validation.hasError('form.PASSWORDREO')" class="text-red-500 text-sm">
            {{ validation.firstError('form.PASSWORDREO') }}
          </span>
        </div>

        <button type="button" @click.prevent="signIn(2)" class="submit-btn mt-3 text-lato">
          Registrar cuenta
        </button>
      </form>

    </div>

    <div v-if="paseForm == 2" class="bg-white p-8 rounded-xl shadow-lg w-5/6 form-login-with">
      <h3 class="text-lato-700 text-center">Para completar tu registro con éxito, rellena los campos requeridos</h3>
      <form class="mt-4">
        <div class="row">
          <div class="col-md-6 col-12 mb-3">
            <label for="name" class="form-label">Nombres <span class="text-danger">*</span></label>
            <input type="text" :class="{ error: validation.hasError('modelo.NOMBRES') }" v-model="modelo.NOMBRES"
              id="NOMBRES" class="form-control" />
            <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
              {{ validation.firstError('modelo.NOMBRES') }}
            </span>
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label for="name" class="form-label">Apellido Paterno <span class="text-danger">*</span></label>
            <input type="text" :class="{ error: validation.hasError('modelo.APELLIDOP') }" v-model="modelo.APELLIDOP"
              id="APELLIDOP" class="form-control" />
            <span class="message" v-if="validation.hasError('modelo.APELLIDOP')">
              {{ validation.firstError('modelo.APELLIDOP') }}
            </span>
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label for="name" class="form-label">Apellido Materno <span class="text-danger">*</span></label>
            <input type="text" :class="{ error: validation.hasError('modelo.APELLIDOM') }" v-model="modelo.APELLIDOM"
              id="APELLIDOM" class="form-control" />
            <span class="message" v-if="validation.hasError('modelo.APELLIDOM')">
              {{ validation.firstError('modelo.APELLIDOM') }}
            </span>
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label for="FNACIMIENTO" class="form-label">Fecha Nacimiento </label>
            <date-picker v-model="modelo.FNACIMIENTO" :value="modelo.FNACIMIENTO" valueType="format"
              :disabledDate="time => time.getTime() > Date.now()"
              @change="(date) => modelo.FNACIMIENTO = date"></date-picker>
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label for="name" class="form-label">Nro. Celular <span class="text-danger">*</span></label>
            <vue-tel-input v-model="modelo.TELEFONO" id="TELEFONO" inputmode="numeric" pattern="[0-9]*"
              @input="(e) => modelo.TELEFONO = e" 
              inputOptions="{ placeholder: 'Ingrese su número de celular' }"></vue-tel-input>
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label for="PROFESION" class="form-label">Profesión</label>
            <input type="text" v-model="modelo.PROFESION" id="PROFESION" class="form-control" />
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label for="CARGO" class="form-label">Cargo</label>
            <input type="text" v-model="modelo.CARGO" id="CARGO" class="form-control" />
          </div>

          <div class="col-md-6 col-12 mb-3">
            <label for="DIRECCION" class="form-label">Dirección</label>
            <input type="text" v-model="modelo.DIRECCION" id="DIRECCION" class="form-control" />
          </div>
        </div>

        <div class="flex justify-between items-center">
          <button type="button" @click.prevent="paseForm = 1" class="btn btn-secondary mt-3 text-lato">
            Cancelar
          </button>
          <button type="button" @click.prevent="signIn(3)" class="btn btn-primary mt-3 text-lato">
            Guardar
          </button>
        </div>
      </form>

    </div>

    <LoadingOverlay :active="isloading" :is-full-page="false" :loader="'bars'" />
    <div class="flex md:flex-row gap-2 flex-col justify-between items-center mt-4 px-5 text-sm" style="width: 100%">
      <span style="color: #727370">© {{ new Date().getFullYear() }} Todos los derechos reservados</span>
      <div class="flex gap-4">
        <a @click.prevent="$router.push('/politicas&privacidad')"
          class="hover:underline text-gray-600 underline cursor-pointer" style="color: #262626">Políticas de
          Privacidad</a>
        <a @click.prevent="$router.push('/cookies')" class="hover:underline text-gray-600 underline cursor-pointer"
          style="color: #262626">Políticas de Cookies</a>
      </div>
    </div>
  </div>
</template>



<script>
import github from "@/assets/img/github.svg";
import google from "@/assets/img/google.svg";
import logoJuris from "@/assets/img/logos/logo-completo.png";
// import LoginProxy from "../../proxies/LoginProxy";
import registerBg2 from "@/assets/img/register_bg_2.png";
import newUserProxy from "../../proxies/NewUserProxy";

// FUNCTIONS
import { toast } from 'vue3-toastify';
import { Validator } from 'simple-vue-validator';

export default {
  components: {
  },
  data() {
    return {
      paseForm: 1,
      showPassword: false,
      showPassword2: false,
      github,
      google,
      logoJuris,
      registerBg2,

      rememberMe: false,
      isloading: false,
      currentNoticia: 0,

      modalRecuperarContrasena: {
        show: false,
        data: null,
      },
      form: {
        EMAIL: '',
        PASSWORD: '',
        PASSWORDREO: '',
        IND: null,
        BANDERA: false
      },
      modelo: {
        NOMBRES: null,
        APELLIDOP: null,
        APELLIDOM: null,
        CORREO: null,
        TELEFONO: null,
        FNACIMIENTO: null,
        PROFESION: null,
        CARGO: null,
        DIRECCION: null,
      },

    };
  },
  validators: {
    'modelo.NOMBRES': function (value) {
      return Validator.value(value).required("Campo requerido");
    },
    'modelo.APELLIDOP': function (value) {
      return Validator.value(value).required("Campo requerido");
    },
    'modelo.APELLIDOM': function (value) {
      return Validator.value(value).required("Campo requerido");
    },
  },
  methods: {
    async signIn(paso = 1) {
      if (this.paseForm == 1) {
        if (this.form.PASSWORD.length < 6)
          return toast.error("La contraseña debe tener al menos 6 caracteres.");

        if (this.form.PASSWORD != this.form.PASSWORDREO)
          return toast.error("Las contraseñas no coinciden.");

        if (!this.form.EMAIL)
          return toast.error("El correo es requerido.");

        if (!this.form.EMAIL.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/))
          return toast.error("El correo no es válido.");
      }

      if (this.paseForm == 2) {
        let validate = await this.$validate();
        if (!validate) return;
        if (!this.modelo.TELEFONO) return toast.error("El teléfono es requerido.");

        let response = {
          EMAIL: this.form.EMAIL,
          PASSWORD: this.form.PASSWORD,
          NOMBRES: this.modelo.NOMBRES,
          APATERNO: this.modelo.APELLIDOP,
          AMATERNO: this.modelo.APELLIDOM,
          TELEFONO: this.modelo.TELEFONO,
          FNACIMIENTO: this.modelo.FNACIMIENTO,
          PROFESION: this.modelo.PROFESION,
          CARGO: this.modelo.CARGO,
          DIRECCION: this.modelo.DIRECCION,
          RTAFTO: null
        }

        this.isloading = true;
        const loadingToast = toast.loading("Espere un momento...");
        await newUserProxy.registrarFind(response)
          .then(response => {
            const toastMessage = response.STATUS ? "Se ha registrado con éxito" : "Ya existe un usuario con ese correo";
            if (response.STATUS) {
              toast.success(toastMessage);
              setTimeout(() => {
                this.$router.push("/auth/login");
              }, 1000);
            } else {
              toast.error(toastMessage);
            }

          })
          .catch(err => toast.error(err?.MESSAGE || "Error al crear al usuario"))
          .finally(() => {
            this.isloading = false;
            toast.remove(loadingToast);
          });

        return;
      }

      this.paseForm = paso;
    },
    togglePassword(indicador = 1) {
      if (indicador == 1) {
        this.showPassword = !this.showPassword;
      } else if (indicador == 2) {
        this.showPassword2 = !this.showPassword2;
      }
    }
  },
};
</script>

<style scoped>
.form-login {
  background-image: url("../../assets/img/resources/bg-comments.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100dvh;
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  /* Equivalente a rounded-full */
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  background-color: white;
  transition: background 0.3s;
}

.social-btn:hover {
  background-color: #f3f4f6;
}

.icon {
  width: 20px;
  height: 20px;
}


form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 16px 0;
  font-size: 14px;
  color: #6b7280;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: #d1d5db;
  margin: 0 10px;
}

.input-group {
  display: flex;
  align-items: center;
  /* background: #f3f4f6; */
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  padding: 10px;
}

.input-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
}

/* Estilo del botón de ojo */
.eye-icon {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
}

.eye-icon img {
  width: 18px;
  height: 18px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.eye-icon:hover img {
  opacity: 1;
}

/* Botón de enviar */
.submit-btn {
  width: 100%;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #1e40af;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin: 0;
}

.remember-me input {
  accent-color: #2563eb;
}

.forgot-password {
  font-size: 12px;
  color: #2563eb;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}


.btn-registrate {
  background: #E71FB3;
  color: white;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

@media (max-width: 768px) {
  .no-tener-cuenta {
    display: none;
  }

  .form-login {
    padding: 10px 10px;
    justify-content: space-around;
  }
}

#btnToggleShowPassword {
  border: none;
  right: 0;
  z-index: 5;
  top: .4rem;
}

.form-login-with {
  width: 500px;
}

@media (max-width: 768px) {
  .form-login-with {
    width: 90%;
    padding: 20px;
  }
}
</style>
