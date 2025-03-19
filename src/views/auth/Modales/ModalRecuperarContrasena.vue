<template>
    <b-modal id="modalRecuperarContrasena" v-model="isShow" @ok="submit"
     @cancel="close" @hidden="close" size="md"
        ok-title="Enviar" cancel-title="Cancelar" title="Recuperar contraseña"
        bodyScrolling no-close-on-backdrop no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formRecuperarContrasena" @submit.prevent="submit">
            <div class="row">
                <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.EMAIL') }">
                    <label for="name" class="form-label">Email <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.EMAIL" id="EMAIL" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.EMAIL')">
                        {{ validation.firstError('modelo.EMAIL') }}
                    </span>
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