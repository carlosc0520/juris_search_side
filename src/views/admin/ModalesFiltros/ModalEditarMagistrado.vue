<template>
    <b-modal id="modalEditaMagistrado" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Editar Magistrado" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formEditaMagistrado" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Nombres</label>
                    <input type="text" v-model="modelo.NOMBRES" id="NOMBRES" class="form-control" />
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Apellidos <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.APELLIDOS') }" v-model="modelo.APELLIDOS" id="APELLIDOS" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.APELLIDOS')">
                        {{ validation.firstError('modelo.APELLIDOS') }}
                    </span>
                </div>
            </div>
        </form>
        <template #footer v-if="!loadingSubmit">
            <div class="modal-footer modal-footer-responsive d-flex flex-wrap gap-3">
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

// * PROXY
import MagistradoProxy from "../../../proxies/Magistrados.Proxy";

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
        data: {
            type: Object,
            default: () => { }
        },
    },
    data() {
        return {
            isShow: false,
            loadingSubmit: false,
            modelo: {
                ID: null,
                APELLIDOS: null,
                NOMBRES: null,
            },
        }
    },
    validators: {
        'modelo.ID': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.APELLIDOS': function (value) {
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
            await MagistradoProxy.edit({ ...this.modelo, })
                .then(response => {
                    const toastMessage = response.STATUS ? "Magistrado editado con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al editar el magistrado"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                ID: null,
                APELLIDOS: null,
                NOMBRES: null,
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
