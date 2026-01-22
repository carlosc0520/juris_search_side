<template>
    <b-modal id="modalEditaCategoria" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Editar Categoria" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formEditaCategoria" @submit.prevent="submit">
            <div class="row">
                <div class="col-12 mb-3">
                    <label for="name" class="form-label">Descripción <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.DESCP') }" v-model="modelo.DESCP"
                        id="DESCP" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.DESCP')">
                        {{ validation.firstError('modelo.DESCP') }}
                    </span>
                </div>

                <div class="col-12 mb-3">
                    <label for="theme" class="form-label">Detalle </label>
                    <vue-editor v-model="modelo.DETALLE" class="mb-0 pb-0"></vue-editor>
                </div>
            </div>
        </form>
        <template #footer>
            <div class="modal-footer d-flex flex-wrap justify-content-center gap-3">
                <button type="button" class="btn btn-primary" @click="submit">
                    Guardar
                </button>
                <button type="button" class="btn btn-secondary" @click="close">
                    Cancelar
                </button>
            </div>
        </template>
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
                DESCP: null,
                DETALLE: null,
            },
        }
    },
    validators: {
        'modelo.DESCP': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });
            if (this.modelo.ID == null) return toast.warning('No se ha seleccionado una categoria', { toastId: 'warning-delete' });

            let validate = await this.$validate();
            if (!validate) return;

            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");

            await MantenimientoProxy.editCategoria(this.modelo)
                .then(response => {
                    const toastMessage = response.STATUS ? "Categoria editada correctamente" : response.MESSAGE || "Error al editar la categoria";
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al editar la categoria"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                ID: null,
                DESCP: null,
                DETALLE: null,
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
