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

    <div class="bg-white p-8 rounded-xl shadow-lg w-5/6 form-login-with">
      <h3 class="text-lato-700 text-center">Crea una nueva contraseña</h3>
      <p class="text-center" style="font-size: 14px; color: #898987; font-family: Lato;">
        Introduzca su nueva contraseña a continuación para completar el
        proceso. Asegúrese de que es segura
      </p>
      <form class="mt-4">
        <div>
          <div class="input-group" :class="{ error: validation.hasError('modelo.PASSWORD') }">
            <img src="@/assets/img/icons/look.svg" alt="Password Icon" class="input-icon">
            <input placeholder="Contraseña" class="input-field" id="password" :type="showPassword ? 'text' : 'password'"
              v-model="modelo.PASSWORD" autocomplete="off">
            <button type="button" class="eye-icon" @click="togglePassword(1)">
              <img v-if="!showPassword" src="@/assets/img/icons/eye.svg" alt="Eye Open Icon" class="eye-icon">
              <img v-else src="@/assets/img/icons/eye-look.svg" alt="Eye Close Icon" class="eye-icon">
            </button>
          </div>
          <span v-if="validation.hasError('modelo.PASSWORD')" class="text-red-500 text-sm">
            {{ validation.firstError('modelo.PASSWORD') }}
          </span>
        </div>

        <div>
          <div class="input-group" :class="{ error: validation.hasError('modelo.PASSWORD_CONFIRM') }">
            <img src="@/assets/img/icons/look.svg" alt="Password Icon" class="input-icon">
            <input placeholder="Contraseña" class="input-field" id="password"
              :type="showPassword2 ? 'text' : 'password'" v-model="modelo.PASSWORD_CONFIRM" autocomplete="off">
            <button type="button" class="eye-icon" @click="togglePassword(2)">
              <img v-if="!showPassword2" src="@/assets/img/icons/eye.svg" alt="Eye Open Icon" class="eye-icon">
              <img v-else src="@/assets/img/icons/eye-look.svg" alt="Eye Close Icon" class="eye-icon">
            </button>
          </div>
          <span v-if="validation.hasError('modelo.PASSWORD_CONFIRM')" class="text-red-500 text-sm">
            {{ validation.firstError('modelo.PASSWORD_CONFIRM') }}
          </span>
        </div>

        <button type="button" @click.prevent="submit" class="submit-btn mt-3 text-lato">
          Enviar
        </button>
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
import { Validator } from 'simple-vue-validator';
import newUserProxy from "../../proxies/NewUserProxy";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'vue3-toastify';

export default {
  components: {
  },
  data() {
    return {
      showPassword: false,
      showPassword2: false,
      github,
      google,
      modelo: {
        CORREO: null,
        PASSWORD: null,
        PASSWORD_CONFIRM: null,
      },
      token: null,

    };
  },
  validators: {
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
        EMAIL: this.modelo.CORREO,
        TOKEN: this.token,
      };

      const loadingToast = toast.loading("Espere un momento...");
      await newUserProxy.recoveryUser(response)
        .then(response => {
          const toastMessage = response.STATUS ? "Se ha cambiado la contraseña correctamente" : response.MESSAGE;
          if (response.STATUS) {
            toast.success("Se ha cambiado la contraseña correctamente", {
              autoClose: 2000,
            });
            setTimeout(() => {
              this.$router.push("/auth/login");
            }, 2000);
          } else {
            toast.error(toastMessage);
          }

        })
        .catch(err => toast.error(err?.MESSAGE || "Error al cambiar la contraseña"))
        .finally(() => {
          toast.remove(loadingToast);
        });


    },
    togglePassword(index) {
      if (index === 1) {
        this.showPassword = !this.showPassword;
      } else if (index === 2) {
        this.showPassword2 = !this.showPassword2;
      }
    },
  },
  async created() {
    const token = this.$route?.params?.token;
    if (token) {
      const response = await newUserProxy.validar_recovery(token);
      if (response) {
        let decodeToken = await jwtDecode(token);
        this.token = token;
        this.modelo = {
          ...this.modelo,
          ...decodeToken,
          CORREO: decodeToken?.EMAIL,
        }
        return;
      }
    }

    this.$router.push("/auth/login");
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
.form-login {
  display: flex;
  padding: 10px;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .no-tener-cuenta {
    display: none;
  }

  .form-login {
    padding: 10px 10px;
    justify-content: flex-start;
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
