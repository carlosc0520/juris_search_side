<template>
    <b-modal id="modalAgregarUsuario" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Rellene el siguiente formulario para generar un usuario"
        bodyScrolling no-close-on-backdrop no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarUsuario" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-4 col-12 mb-3" :class="{ error: validation.hasError('modelo.NOMBRES') }">
                    <label for="name" class="form-label">Nombraaes <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.NOMBRES" id="NOMBRES" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                        {{ validation.firstError('modelo.NOMBRES') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3" :class="{ error: validation.hasError('modelo.APELLIDOP') }">
                    <label for="name" class="form-label">Apellido Paterno <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.APELLIDOP" id="APELLIDOP" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.APELLIDOP')">
                        {{ validation.firstError('modelo.APELLIDOP') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3" :class="{ error: validation.hasError('modelo.APELLIDOM') }">
                    <label for="name" class="form-label">Apellido Materno <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.APELLIDOM" id="APELLIDOM" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.APELLIDOM')">
                        {{ validation.firstError('modelo.APELLIDOM') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3" :class="{ error: validation.hasError('modelo.CORREO') }">
                    <label for="name" class="form-label">Correo <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.CORREO" id="CORREO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.CORREO')">
                        {{ validation.firstError('modelo.CORREO') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3" >
                    <label for="name" class="form-label">Nro. Celular <span class="text-danger">*</span></label>
                    <vue-tel-input 
                        v-model="modelo.TELEFONO"
                        id="TELEFONO"
                        @input="(e) => modelo.TELEFONO = e"
                        inputOptions="{ placeholder: 'Ingrese su número de celular' }"
                    ></vue-tel-input>
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label for="FNACIMIENTO" class="form-label">Fecha Nacimiento </label>
                    <date-picker v-model="modelo.FNACIMIENTO" :value="modelo.FNACIMIENTO" valueType="format"
                        :disabledDate="time => time.getTime() > Date.now()"
                        @change="(date) => modelo.FNACIMIENTO = date"></date-picker>
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label for="PROFESION" class="form-label">Profesión</label>
                    <input type="text" v-model="modelo.PROFESION" id="PROFESION" class="form-control" />
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label for="CARGO" class="form-label">Cargo</label>
                    <input type="text" v-model="modelo.CARGO" id="CARGO" class="form-control" />
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label for="DIRECCION" class="form-label">Dirección</label>
                    <input type="text" v-model="modelo.DIRECCION" id="DIRECCION" class="form-control" />
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
import newUserProxy from "../../proxies/NewUserProxy";


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
        }
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
        'modelo.CORREO': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Correo no válido");
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();

            let validate = await this.$validate();
            if (!validate) return;

            let telefono = document.querySelector('#TELEFONO input').value.trim();
            if (!telefono) {
                toast.error("El número de teléfono es requerido");
                return;
            }

            // si tiene letras 
            if (telefono.match(/[a-z]/i)) {
                toast.error("El número de teléfono no puede contener letras");
                return;
            }

            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");

            await newUserProxy.solicitud(this.modelo)
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
                NOMBRES: null,
                APELLIDOP: null,
                APELLIDOM: null,
                CORREO: null,
                TELEFONO: null,
                FNACIMIENTO: null,
                PROFESION: null,
                CARGO: null,
                DIRECCION: null,
            }
            
            this.validation.reset();

        }
    },
    watch: {
        show: {
            handler(value) {
                document.querySelector('#TELEFONO input').value = '';   

                if (!value) {
                    this.reset();
                }
                this.isShow = value;
            }
        }
    }
}


</script>