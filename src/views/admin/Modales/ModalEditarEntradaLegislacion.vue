<template>
    <b-modal id="modalEditarEntradaLegislacion" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Editar Legislación" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formEditarEmtradaLegislacion" @submit.prevent="submit">
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

                <!-- <div class="col-md-4 col-12 mb-3 flex-checkbox">
                    <label for="ISBINDING" class="form-label">Estado
                    </label>
                    <b-form-checkbox switch v-model="modelo.ISBINDING" id="status" class="" size="lg"
                        buttonVariant="black-50" />
                </div> -->

                <div class="col-md-4 col-12  mb-3">
                    <label for="SITUACION" class="form-label">Estado </label>
                    <select style="padding: .70rem !important" class="form-select" v-model="modelo.SITUACION" aria-label="Default select example">
                        <option selected value="">-- Seleccione</option>
                        <option value="Vigente">Vigente</option>
                        <option value="Modificado">Modificado</option>
                        <option value="Derogado">Derogado</option>
                    </select>
                </div>

                <h5 class="text-app-primary">Contenido</h5>
                <hr>

                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Tipo de Norma <span class="text-danger">*</span></label>

                    <el-tree-select :class="{ error: validation.hasError('modelo.TPONRMA') }" v-model="modelo.TPONRMA"
                        :data="selects.norma" :render-after-expand="false" placeholder="Seleccione una opción"
                        show-checkbox check-strictly check-on-click-node filterable
                        no-data-text="No hay opciones disponibles" collapse-tags :max-collapse-tags="1"
                        :clearable="false" />

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
                    <input type="text" :class="{ error: validation.hasError('modelo.NMRCN') }" v-model="modelo.NMRCN"
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
                    <input class="custom-input" type="file" accept=".pdf" name="file_input" placeholder="Escribe aquí"
                        @change="modelo.NENTRIEFILE = $event.target.files[0]">
                    <span v-if="modelo.ENTRIEFILE" class="text-gray-600 text-sm pt-2">
                        <b>Nombre de archivo: </b>{{ formatNameFile(modelo.ENTRIEFILE) }}
                    </span>
                    <a v-if="modelo.ENTRIEFILE" download @click="downloadFile(modelo.ENTRIEFILE, 'ENTRADA PRINCIPAL')"
                        class="text-blue-500 text-sm cursor-pointer flex items-center flex flex-row">
                        <small class="flex flex-row gap-2 pt-2">Descargar archivo
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-download"
                                width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4" />
                                <path d="M12 13l0 9" />
                                <path d="M9 19l3 3l3 -3" />
                            </svg>
                        </small>
                    </a>
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
import { BModal, BButton } from 'bootstrap-vue-next';
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

// * PROXY
import adminEntriesProxy from "../../../proxies/AdminEntriesProxy.js";


export default {
    components: {
        BModal,
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
                TITLE: null,
                ISBINDING: false,
                TPONRMA: [],
                NMRCN: null,
                FRESOLUTION: null,
                ENTRIEFILE: null,
                NENTRIEFILE: null,
                RTITLE: null,
                OEMISOR: [],
                SITUACION: "",
            },
        }
    },
    validators: {
        'modelo.ID': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
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
        formatNameFile(file) {
            if (!file) return "";

            const regex = file.split("/").pop();
            return regex ? regex : "";
        },
        localStorageSave() {
            localStorage.setItem("legislationEntrieEdit", JSON.stringify(this.modelo));
        },
        UpdateLocaleStorage() {
            let data = JSON.parse(localStorage.getItem("legislationEntrieEdit"));
            this.modelo = data;
        },
        async submit(e) {
            e.preventDefault();
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            let validate = await this.$validate();
            if (!validate) return;

            const formData = new FormData();
            formData.append("ID", this.modelo.ID);
            formData.append("ENTRIEFILE", this.modelo.ENTRIEFILE);
            formData.append("files", this.modelo.NENTRIEFILE);
            formData.append("TITLE", this.modelo.TITLE);
            formData.append("RTITLE", this.modelo.RTITLE);
            formData.append("ISBINDING", this.modelo.ISBINDING);
            let tipoNormal = [];
            tipoNormal.push(this.modelo.TPONRMA);
            formData.append("TPONRMA", tipoNormal.join(",") || this.modelo.TPONRMA);
            formData.append("NMRCN", this.modelo.NMRCN);
            formData.append("FRESOLUTION", this.modelo.FRESOLUTION);
            formData.append("TYPE", "legislations")
            formData.append("TIPO", this.typeEntrie);
            formData.append("SITUACION", this.modelo.SITUACION);
            formData.append("OEMISOR", this.modelo.OEMISOR.join(","));


            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");
            await adminEntriesProxy.edit(formData)
                .then(response => {
                    const toastMessage = response.STATUS ? "Entrada editada con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al editar la entrada"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        async downloadFile(path, tipo = "") {
            const loadingToast = toast.loading("Espere un momento...");
            this.loadingSubmit = true;
            await adminEntriesProxy.downloadFile({ PATH: path })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    const extension = path.split('.').pop();
                    link.setAttribute('download', (this.modelo.TITLE + "-" + tipo).toUpperCase() + '.' + extension);
                    document.body.appendChild(link);
                    link.click();
                    toast.success("Archivo descargado correctamente", { toastId: "success" });
                })
                .catch((error) => toast.error(error?.MESSAGE || "Error al descargar el archivo", { toastId: "error" }))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                ID: null,
                TITLE: null,
                ISBINDING: false,
                TPONRMA: [],
                NMRCN: null,
                FRESOLUTION: null,
                ENTRIEFILE: null,
                NENTRIEFILE: null,
                RTITLE: null,
                OEMISOR: [],
                SITUACION: ""
            }

            let inputs = document.querySelectorAll("input[type='file']");
            if (inputs) inputs.forEach(input => input.value = "");

            this.validation.reset();
        }
    },
    watch: {
        show: {
            handler(value) {
                if (value) {
                    this.modelo = {
                        ...this.data,
                        TPONRMA: this.data.TPONRMA.length > 0 ? this.data.TPONRMA[0] : null,
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