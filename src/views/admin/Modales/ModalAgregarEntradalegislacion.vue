<template>
    <b-modal id="modalAgregarEntradaLegislacion" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Agregar Legislación" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarEntradaLegislacion" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-4 col-12 mb-3">
                    <label for="name" class="form-label">Nombre de la Norma <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.TITLE') }" v-model="modelo.TITLE"
                        id="TITLE" class="form-control mayus" />
                    <span class="message" v-if="validation.hasError('modelo.TITLE')">
                        {{ validation.firstError('modelo.TITLE') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label for="RTITLE" class="form-label">Denominación oficial </label>
                    <input type="text" v-model="modelo.RTITLE" id="description" class="form-control" />
                </div>

                <div class="col-md-4 col-12 mb-3 flex-checkbox">
                    <label for="ISBINDING" class="form-label pl-5">Estado
                    </label>
                    <b-form-checkbox switch v-model="modelo.ISBINDING" id="status" class="" size="lg"
                        buttonVariant="black-50" />
                </div>

                <h5 class="text-app-primary">Contenido</h5>
                <hr>

                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Tipo de Norma <span class="text-danger">*</span></label>

                    <el-tree-select :class="{ error: validation.hasError('modelo.TPONRMA') }" v-model="modelo.TPONRMA"
                        :data="selects.norma" :render-after-expand="false" placeholder="Seleccione una opción"
                        show-checkbox check-strictly check-on-click-node filterable
                        no-data-text="No hay opciones disponibles" collapse-tags :max-collapse-tags="1" />

                    <span class="message" v-if="validation.hasError('modelo.TPONRMA')">
                        {{ validation.firstError('modelo.TPONRMA') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="OEMISOR" class="form-label">Órgano emisor <span class="text-danger">*</span></label>

                    <el-tree-select :class="{ error: validation.hasError('modelo.OEMISOR') }" v-model="modelo.OEMISOR"
                        :data="selects.oemisor" multiple :render-after-expand="false"
                        placeholder="Seleccione una opción" show-checkbox check-strictly check-on-click-node filterable
                        clearable collapse-tags :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                        popper-append-to-body class="custom-tree-select" />

                    <span class="message" v-if="validation.hasError('modelo.OEMISOR')">
                        {{ validation.firstError('modelo.OEMISOR') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="RTITLE" class="form-label">Numeración </label>
                    <input :class="{ error: validation.hasError('modelo.NMRCN') }" type="text" v-model="modelo.NMRCN"
                        id="description" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.NMRCN')">
                        {{ validation.firstError('modelo.NMRCN') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="BLOG3" class="form-label">Fecha de publicación <span class="text-danger">*</span></label>
                    <date-picker :class="{ error: validation.hasError('modelo.FRESOLUTION') }"
                        v-model="modelo.FRESOLUTION" :value="modelo.FRESOLUTION" valueType="format"
                        :disabledDate="time => time.getTime() > Date.now()"
                        @change="(date) => modelo.FRESOLUTION = date"></date-picker>
                    <span class="message" v-if="validation.hasError('modelo.FRESOLUTION')">
                        {{ validation.firstError('modelo.FRESOLUTION') }}
                    </span>
                </div>

                <div class="col-md-8 col-12 mb-3 flex flex-col">
                    <label for="file" class="forml-label">Documento Principal <span class="text-danger">*</span></label>
                    <input :class="{ error: validation.hasError('modelo.ENTRIEFILE') }" class="custom-input" type="file"
                        accept=".pdf" name="file_input" placeholder="Escribe aquí"
                        @change="modelo.ENTRIEFILE = $event.target.files[0]">
                    <span class="message" v-if="validation.hasError('modelo.ENTRIEFILE')">
                        {{ validation.firstError('modelo.ENTRIEFILE') }}
                    </span>
                </div>
            </div>
        </form>

        <div class="d-flex justify-end gap-4 mt-4">
            <b-button variant="danger" class="text-white" @click="localStorageSave">
                <span>Guardar</span>
            </b-button>
            <b-button variant="success" class="text-white" @click="UpdateLocaleStorage" :disabled="isLoading">
                <span>Actualizar</span>
            </b-button>
        </div>
    </b-modal>
</template>


<script>
import { BModal, BFormCheckbox, BButton } from 'bootstrap-vue-next';
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

// * PROXY
import adminEntriesProxy from "../../../proxies/AdminEntriesProxy.js";


export default {
    components: {
        BModal,
        BFormCheckbox,
        BButton
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
        selects: {
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
                TITLE: null,
                RTITLE: null,
                OEMISOR: [],
                ISBINDING: false,
                TPONRMA: [],
                NMRCN: null,
                FRESOLUTION: null,
                ENTRIEFILE: null,
            },
        }
    },
    validators: {
        'modelo.TITLE': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.NMRCN': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.TPONRMA': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
        'modelo.FRESOLUTION': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.ENTRIEFILE': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.OEMISOR': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
    },
    methods: {
        localStorageSave() {
            localStorage.setItem("legislationEntrie", JSON.stringify(this.modelo));
        },
        UpdateLocaleStorage() {
            let data = JSON.parse(localStorage.getItem("legislationEntrie"));
            this.modelo = data;
        },
        async submit(e) {
            e.preventDefault();
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            let validate = await this.$validate();
            if (!validate) return;

            const formData = new FormData();
            formData.append("files", this.modelo.ENTRIEFILE);
            formData.append("TITLE", this.modelo.TITLE);
            formData.append("RTITLE", this.modelo.RTITLE);
            formData.append("ISBINDING", this.modelo.ISBINDING);
            let tipoNormal = [];
            tipoNormal.push(this.modelo.TPONRMA);
            formData.append("TPONRMA", tipoNormal.join(",") || this.modelo.TPONRMA);
            formData.append("NMRCN", this.modelo.NMRCN);
            formData.append("FRESOLUTION", this.modelo.FRESOLUTION);
            formData.append("TYPE", "legislations")
            formData.append("TIPO", "executive")
            formData.append("OEMISOR", this.modelo.OEMISOR.join(",") || this.modelo.OEMISOR);


            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");
            await adminEntriesProxy.createSingle(formData)
                .then(response => {
                    const toastMessage = response.STATUS ? "Entrada creada con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al crear la entrada"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                TITLE: null,
                RTITLE: null,
                OEMISOR: [],
                ISBINDING: false,
                TPONRMA: [],
                NMRCN: null,
                FRESOLUTION: null,
                ENTRIEFILE: null,
            }

            let inputs = document.querySelectorAll("input[type='file']");
            if (inputs) inputs.forEach(input => input.value = "");

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