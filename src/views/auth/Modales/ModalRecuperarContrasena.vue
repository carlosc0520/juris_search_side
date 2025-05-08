<template>
    <b-modal id="modalRecuperarContrasena" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="md"
        ok-title="Enviar" cancel-title="Cancelar" title="Recuperar contraseña" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formRecuperarContrasena" @submit.prevent="submit">
            <div class="row">
                <div>
                    <p style="font-size: 14px; color: #898987; font-family: Lato;">
                        Introduzca su dirección de correo electrónico y le enviaremos un enlace para restablecer su
                        contraseña.
                    </p>
                </div>
                <div class="input-group" :class="{ error: validation.hasError('modelo.EMAIL') }">
                    <img src="@/assets/img/icons/email.svg" alt="Email Icon" class="input-icon">
                    <input type="email" placeholder="Correo electrónico" autocomplete="off" v-model="modelo.EMAIL"
                        class="input-field">
                </div>
            </div>
        </form>
    </b-modal>
</template>


<script>
import { BModal } from 'bootstrap-vue-next';
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

// * PROXY
import newUserProxy from "../../../proxies/NewUserProxy";


export default {
    components: {
        BModal
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        close: {
            type: Function,
            default: () => { }
        },
        update: {
            type: Function,
            default: () => { }
        },
    },
    data() {
        return {
            isShow: false,
            loadingSubmit: false,
            modelo: {
                EMAIL: null
            },
        }
    },
    validators: {
        'modelo.EMAIL': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();

            let validate = await this.$validate();
            if (!validate) return;

            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");

            await newUserProxy.recovery(this.modelo)
                .then((response) => {
                    const toastMessage = response.STATUS ? "Revise su correo para la confirmación" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch((error) => toast.error(error?.MESSAGE || 'Error al crear el usuario'))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });

        },
        reset() {
            this.modelo = {
                EMAIL: null
            }

            this.validation.reset();

        }
    },
    watch: {
        show: {
            handler(value) {
                if (!value) {
                    this.reset();
                }
                this.isShow = value;
            }
        }
    }
}


</script>


<style scoped>
.input-group {
    display: flex;
    align-items: center;
    /* background: #f3f4f6; */
    border: 1px solid #d1d5db;
    border-radius: 9999px;
    padding: 10px;
    margin-bottom: 12px;
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

</style>