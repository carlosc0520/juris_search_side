<template>
  <div class="form-login">
    <div class="flex justify-between items-center mb-4 px-5" style="width: 100%;">
      <img src="@/assets/img/logos/logo-full.png" @click="$router.push('/')" alt="Logo" class="h-10 cursor-pointer" />
      <div class="text-sm">
        <span class="text-gray-600 no-tener-cuenta">¿No tienes una cuenta?</span>
        <button @click.prevent="$router.push('/auth/register')"
          class="btn-registrate ml-2">Regístrate</button>
      </div>
    </div>

    <div class="bg-white p-8 rounded-xl shadow-modern w-5/6 form-login-with">
      <h3 class="text-lato-700 text-center login-title">Ingresa a tu cuenta</h3>
      <div class="social-buttons mt-4">
        <button class="social-btn" @click="loginWithGoogle">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" class="icon">
          Ingresar con Google
        </button>

        <button class="social-btn" @click="loginWithLinkedin">
          <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn Logo" class="icon">
          Ingresar con LinkedIn
        </button>
      </div>

      <div class="separator">
        <span>o iniciar sesión con</span>
      </div>

      <form class="mt-4">
        <div class="input-group" :class="{ error: validation.hasError('form.EMAIL') }">
          <img src="@/assets/img/icons/email.svg" alt="Email Icon" class="input-icon">
          <input type="email" placeholder="Correo electrónico" autocomplete="off" v-model="form.EMAIL"
            class="input-field">
        </div>

        <div class="input-group" :class="{ error: validation.hasError('form.PASSWORD') }">
          <img src="@/assets/img/icons/look.svg" alt="Password Icon" class="input-icon">
          <input placeholder="Contraseña" class="input-field" id="password" :type="showPassword ? 'text' : 'password'"
            v-model="form.PASSWORD" autocomplete="off">
          <button type="button" class="eye-icon" @click="togglePassword">
            <img v-if="!showPassword" src="@/assets/img/icons/eye.svg" alt="Eye Open Icon" class="eye-icon">
            <img v-else src="@/assets/img/icons/eye-look.svg" alt="Eye Close Icon" class="eye-icon">
          </button>
        </div>

        <div class="options">
          <label class="remember-me text-lato-200">
          </label>
          <button type="button" class="forgot-password text-lato-200"
            @click.prevent="modalRecuperarContrasena.show = true">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button type="button" @click.prevent="signIn" class="submit-btn mt-3 text-lato">
          Iniciar sesión
        </button>
      </form>

      <ModalRecuperarContrasena :show="modalRecuperarContrasena.show"
        :close="() => modalRecuperarContrasena.show = false" :update="() => { }" />

      <LoadingOverlay :active="isloading" :is-full-page="false" :loader="'bars'" />
    </div>

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
import LoginProxy from "../../proxies/LoginProxy";
import registerBg2 from "@/assets/img/register_bg_2.png";
import ModalRecuperarContrasena from "./Modales/ModalRecuperarContrasena.vue";

// FUNCTIONS
import { toast } from 'vue3-toastify';
import { Validator } from 'simple-vue-validator';
import UserProxy from "../../proxies/UserProxy";

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
      // urlApi: 'http://localhost:3000'
      urlApi: 'https://api.jurissearch.com'
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
    async signIn() {
      let validate = await this.$validate();
      if (!validate) return;

      this.isloading = true;
      LoginProxy.login(this.form)
        .then((response) => {
          if (response?.status == 201) {
            let { TOKEN, NOMBRES, EMAIL, RTAFTO } = response.data;
            localStorage.setItem('accessToken', TOKEN);
            localStorage.setItem('user', JSON.stringify({ NOMBRES, EMAIL, RTAFTO }));
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
    async loginWithGoogle() {
      return 1
      // window.location.href = `${this.urlApi}/auth/google`;
    },
    async loginWithLinkedin() {
      return 1
      // window.location.href = `${this.urlApi}/auth/linkedin`;
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  },
  async mounted() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('onsuccess');
    if (success) {
      const message = urlParams.get('message');
      if (success === 'true') {
        // validar token 
        const accessToken = urlParams.get('accessToken');

        await UserProxy.validateTokenGoogle(accessToken)
          .then((response) => {
            if (response.STATUS) {
              const user = urlParams.get('user');

              this.$swal({
                title: "¡Éxito!",
                text: "Has iniciado sesión correctamente.",
                icon: "success",
                buttons: false,
              })
                .then(() => {
                  localStorage.setItem('accessToken', accessToken);
                  localStorage.setItem('user', user);
                  this.$router.push('/redirect');
                });
              return
            } else {
              this.$swal({
                title: "Error",
                text: response.MESSAGE || "Token inválido o expirado",
                icon: "error",
                buttons: false,
              })
                .then(() => {
                  this.$router.push('/auth/login');
                });
              return;
            }
          })
          .catch((error) => {
            this.$swal({
              title: "Error",
              text: error?.MESSAGE || "Token inválido o expirado",
              icon: "error",
              buttons: false,
            })
              .then(() => {
                this.$router.push('/auth/login');
              });
            return;
          });


      } else {
        this.$swal({
          title: "Error",
          text: message,
          icon: "error",
          buttons: false,
        })
          .then(() => {
            this.$router.push('/auth/login');
          });
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
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  background-color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-family: Lato, sans-serif;
}

.social-btn:hover {
  background: linear-gradient(135deg, rgba(223, 45, 178, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(24, 92, 230, 0.05) 100%);
  border-color: #E5E7EB;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.social-btn:active {
  transform: translateY(0);
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

.form-login-with {
  width: 500px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.98) !important;
}

.shadow-modern {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #6B7280;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .form-login-with {
    width: 90%;
    padding: 20px;
  }
  
  .login-title {
    font-size: 24px;
  }
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  font-size: 13px;
  color: #718096;
  font-weight: 500;
  font-family: Lato, sans-serif;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #cbd5e0, transparent);
  margin: 0 12px;
}

.input-group {
  display: flex;
  align-items: center;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  padding: 12px 18px;
  margin-bottom: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
}

.input-group:focus-within {
  border-color: #8B5CF6;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  transform: translateY(-1px);
}

.input-group.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
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
  font-size: 15px;
  color: #2d3748;
  font-family: Lato, sans-serif;
  font-weight: 500;
}

.input-field::placeholder {
  color: #a0aec0;
  font-weight: 400;
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
  background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
  color: white;
  font-size: 15px;
  font-weight: 700;
  padding: 14px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  font-family: Lato, sans-serif;
  letter-spacing: 0.3px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
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
  font-size: 13px;
  color: #8B5CF6;
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  font-family: Lato, sans-serif;
}

.forgot-password:hover {
  color: #DF2DB2;
  text-decoration: underline;
}


.btn-registrate {
  background: linear-gradient(135deg, #DF2DB2 0%, #E71FB3 100%);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(231, 31, 179, 0.25);
  font-family: Lato, sans-serif;
}

.btn-registrate:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 31, 179, 0.35);
}

.btn-registrate:active {
  transform: translateY(0);
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
</style>
