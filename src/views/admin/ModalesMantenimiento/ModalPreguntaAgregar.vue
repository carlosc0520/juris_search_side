<template>
    <b-modal id="modalAgregarPregunta" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Agregar Pregunta" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarPregunta" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Descripción <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.DESCRIPCION') }" v-model="modelo.DESCRIPCION" id="DESCRIPCION" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.DESCRIPCION')">
                        {{ validation.firstError('modelo.DESCRIPCION') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3 flex flex-col">
                    <label for="name" class="form-label">Orden <span class="text-danger">*</span></label>
                    <input type="number" :class="{ error: validation.hasError('modelo.ORDEN') }" v-model="modelo.ORDEN" id="ORDEN" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.ORDEN')">
                        {{ validation.firstError('modelo.ORDEN') }}
                    </span>
                </div>

                <div class="col-12 mb-3">
                    <label for="theme" class="form-label">Respuesta <span class="text-danger">*</span></label>
                    <vue-editor :class="{ error: validation.hasError('modelo.HTMLTEXT') }" v-model="modelo.HTMLTEXT" class="mb-0 pb-0"></vue-editor>
                    <span class="message" v-if="validation.hasError('modelo.HTMLTEXT')">
                        {{ validation.firstError('modelo.HTMLTEXT') }}
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
import { VueEditor } from "vue3-editor";

// * PROXY
import MantenimientoProxy from "../../../proxies/MantenimientoProxy";


export default {
    components: {
        BModal,
        VueEditor
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
        role: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            isShow: false,
            loadingSubmit: false,
            modelo: {
                DESCRIPCION: null,
                HTMLTEXT: null,
                ORDEN: null
            },
        }
    },
    validators: {
        'modelo.DESCRIPCION': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.HTMLTEXT': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.ORDEN': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/^\d+$/, "Solo se permiten números");
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();
            if(this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });
            
            let validate = await this.$validate();
            if (!validate) return;


            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");

            await MantenimientoProxy.createPregunta(this.modelo)
                .then(response => {
                    const toastMessage = response.STATUS ? "Pregunta creada con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al crear la pregunta"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                DESCRIPCION: null,
                HTMLTEXT: null,
                ORDEN: null
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