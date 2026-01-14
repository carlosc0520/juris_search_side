<template>
    <b-modal id="modalEditaPlan" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Editar Plan" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formEditaPlan" @submit.prevent="submit">
            <div class="row">
                <div class="col-12 mb-3">
                    <label for="name" class="form-label">Descripción <span class="text-danger">*</span></label>
                    <input :class="{ error: validation.hasError('modelo.DESCRIPCION') }" type="text" v-model="modelo.DESCRIPCION" id="DESCRIPCION" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.DESCRIPCION')">
                        {{ validation.firstError('modelo.DESCRIPCION') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3 flex flex-col">
                    <label for="name" class="form-label">Valor <span class="text-danger">*</span></label>
                    <input :class="{ error: validation.hasError('modelo.VALOR') }" type="number" v-model="modelo.VALOR" id="VALOR" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.VALOR')">
                        {{ validation.firstError('modelo.VALOR') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3 flex flex-col">
                    <label for="name" class="form-label">Tiempo <span class="text-danger">*</span></label>
                    <input  :class="{ error: validation.hasError('modelo.TIEMPO') }" type="number" v-model="modelo.TIEMPO" id="TIEMPO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.TIEMPO')">
                        {{ validation.firstError('modelo.TIEMPO') }}
                    </span>
                </div>
 
                <div class="col-md-4 col-12 mb-3 flex flex-col">
                    <label for="name" class="form-label">Precio <span class="text-danger">*</span></label>
                    <input :class="{ error: validation.hasError('modelo.PRECIO') }" type="number" v-model="modelo.PRECIO" id="PRECIO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.PRECIO')">
                        {{ validation.firstError('modelo.PRECIO') }}
                    </span>
                </div>

                <div class="col-12 mb-3">
                    <label for=" theme" class="form-label">Restricciones </label>
                    <b-form-checkbox-group v-model="modelo.RESTRICIONES" id="restricciones" class="flex flex-column">
                        <b-form-checkbox value="1">Visualizar</b-form-checkbox>
                        <b-form-checkbox value="2">Descargar</b-form-checkbox>
                        <b-form-checkbox value="3">Agregar a favoritos</b-form-checkbox>
                    </b-form-checkbox-group>
                </div>
            </div>
        </form>
    </b-modal>
</template>


<script>
import { BModal, BFormCheckboxGroup, BFormCheckbox } from 'bootstrap-vue-next';
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

// * PROXY
import MantenimientoProxy from "../../../proxies/MantenimientoProxy";


export default {
    components: {
        BModal,
        BFormCheckboxGroup,
        BFormCheckbox
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
        data: {
            type: Object,
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
                ID: null,
                DESCRIPCION: null,
                VALOR: null,
                TIEMPO: null,
                RESTRICIONES: [],
                PRECIO: null
            },
        }
    },
    validators: {
        'modelo.ID': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.DESCRIPCION': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.VALOR': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.TIEMPO': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/^\d+$/, "Solo se permiten números");
        },
        'modelo.PRECIO': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/^\d+(\.\d{1,2})?$/, "Solo se permiten números");
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
            let restriccionesComas = this.modelo.RESTRICIONES;

            await MantenimientoProxy.editPlan({
                ...this.modelo,
                RESTRICIONES: restriccionesComas?.length > 0 ? restriccionesComas.join(",") : null
            })
                .then(response => {
                    const toastMessage = response.STATUS ? "Plan editado con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al editar el plan"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                ID: null,
                DESCRIPCION: null,
                VALOR: null,
                TIEMPO: null,
                RESTRICIONES: [],
                PRECIO: null
            }

            this.validation.reset();
        }
    },
    watch: {
        show: {
            handler(value) {
                if (value) {
                    this.modelo = {
                        ...this.data,
                        RESTRICIONES: this.data.RESTRICIONES?.split(","),
                    }
                }

                if (!value) {
                    this.reset();
                }
                this.isShow = value;

            }
        },
    }
}


</script>
<style scoped src="@/assets/styles/modal-styles.css"></style>
