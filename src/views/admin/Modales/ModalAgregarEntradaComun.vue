<template>
    <b-modal id="modalAgregarEntradaComun" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Agregar Jurisprudencia Común" bodyScrolling
        no-close-on-backdrop no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarEntradaComun" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-4 col-12 mb-3" :class="{ error: validation.hasError('modelo.TITLE') }">
                    <label for="name" class="form-label">Título de entrada <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.TITLE" id="TITLE" class="form-control mayus" />
                    <span class="message" v-if="validation.hasError('modelo.TITLE')">
                        {{ validation.firstError('modelo.TITLE') }}
                    </span>
                </div>
                <div class="col-md-4 col-12 mb-3">
                    <label for="RTITLE" class="form-label">Título Descriptivo </label>
                    <input type="text" v-model="modelo.RTITLE" id="description" class="form-control" />
                </div>
                <!-- cHECBOX switch -->
                <div class="col-md-4 col-12 mb-3">
                    <label for="ISBINDING" class="form-label pl-5">Vinculatoriedad
                    </label>
                    <b-form-checkbox switch v-model="modelo.ISBINDING" id="status" class="" size="lg"
                        buttonVariant="black-50" />
                </div>

                <h5 class="text-app-primary">Identificación</h5>
                <hr>

                <div class="col-md-4 col-12 mb-3" :class="{ error: validation.hasError('modelo.FRESOLUTION') }">
                    <label for="BLOG3" class="form-label">Fecha de resolución <span class="text-danger">*</span></label>
                    <date-picker v-model="modelo.FRESOLUTION" :value="modelo.FRESOLUTION" valueType="format"
                        :disabledDate="time => time.getTime() > Date.now()"
                        @change="(date) => modelo.FRESOLUTION = date"></date-picker>
                    <span class="message" v-if="validation.hasError('modelo.FRESOLUTION')">
                        {{ validation.firstError('modelo.FRESOLUTION') }}
                    </span>
                </div>

                <div class="col-md-8 col-12">
                </div>

                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.AMBIT') }">
                    <label for="name" class="form-label">Ámbito <span class="text-danger">*</span></label>

                    <el-tree-select v-model="modelo.AMBIT" :data="selects.ambitos" multiple :render-after-expand="false"
                        placeholder="Seleccione una opción" show-checkbox check-strictly check-on-click-node filterable
                        no-data-text="No hay opciones disponibles" clearable collapse-tags :max-collapse-tags="1" />

                    <span class="message" v-if="validation.hasError('modelo.AMBIT')">
                        {{ validation.firstError('modelo.AMBIT') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.DELITO') }">
                    <label for="DELITO" class="form-label">Delito <span class="text-danger">*</span></label>

                    <el-tree-select v-model="modelo.DELITO" :data="selects.delitos" multiple
                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox check-strictly
                        check-on-click-node filterable clearable collapse-tags :max-collapse-tags="1"
                        no-data-text="No hay opciones disponibles" popper-append-to-body class="custom-tree-select" />

                    <span class="message" v-if="validation.hasError('modelo.DELITO')">
                        {{ validation.firstError('modelo.DELITO') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.RECURSO') }">
                    <label for="RECURSO" class="form-label">Recurso <span class="text-danger"> *</span>
                    </label>

                    <el-tree-select v-model="modelo.RECURSO" :data="selects.recursos" multiple
                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox check-strictly
                        check-on-click-node filterable no-data-text="No hay opciones disponibles" clearable
                        collapse-tags :max-collapse-tags="1" />


                    <span class="message" v-if="validation.hasError('modelo.RECURSO')">
                        {{ validation.firstError('modelo.RECURSO') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="MATERIA" class="form-label">Materia</label>
                    <el-tree-select v-model="modelo.MATERIA" :data="selects.materias" multiple
                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox check-strictly
                        check-on-click-node filterable no-data-text="No hay opciones disponibles" clearable
                        collapse-tags :max-collapse-tags="1" />
                </div>


                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.JURISDICCION') }">
                    <label for="JURISDICCION" class="form-label">Jurisdicción <span class="text-danger">*</span></label>

                    <el-tree-select v-model="modelo.JURISDICCION" :data="selects.jurisdicion" multiple
                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox check-strictly
                        check-on-click-node filterable no-data-text="No hay opciones disponibles" clearable
                        collapse-tags :max-collapse-tags="1" />

                    <span class="message" v-if="validation.hasError('modelo.JURISDICCION')">
                        {{ validation.firstError('modelo.JURISDICCION') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="JURISDICCIONV" class="form-label">Jurisprudencia vinculante</label>

                    <el-tree-select v-model="modelo.JURISDICCIONV" :data="selects.jurisdicionV" multiple
                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox check-strictly
                        check-on-click-node filterable no-data-text="No hay opciones disponibles" clearable
                        collapse-tags :max-collapse-tags="1" />

                </div>

                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.OJURISDICCIONAL') }">
                    <label for="OJURISDICCIONAL" class="form-label">Órgano jurisdiccional <span
                            class="text-danger">*</span></label>

                    <el-tree-select v-model="modelo.OJURISDICCIONAL" :data="selects.jurisdiccionales" multiple
                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox check-strictly
                        check-on-click-node filterable no-data-text="No hay opciones disponibles" clearable
                        collapse-tags :max-collapse-tags="1" />

                    <span class="message" v-if="validation.hasError('modelo.OJURISDICCIONAL')">
                        {{ validation.firstError('modelo.OJURISDICCIONAL') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.MAGISTRATES') }">
                    <label class="form-label" for="MAGISTRATES">Magistrados <span class="text-danger">*</span></label>

                    <el-tree-select v-model="modelo.MAGISTRATES" :data="selects.magistrados" multiple
                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox check-strictly
                        check-on-click-node filterable no-data-text="No hay opciones disponibles" clearable
                        collapse-tags :max-collapse-tags="1" />

                    <span class="message" v-if="validation.hasError('modelo.MAGISTRATES')">
                        {{ validation.firstError('modelo.MAGISTRATES') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="VDESIDENTE" class="form-label">Voto Disidente
                        <small class="font-weight">(discrepa
                            del
                            fallo final adoptado.)</small>
                    </label>
                    <b-form-tags separator="," v-model="modelo.VDESIDENTE" tag-variant="primary" tag-pills tag-readonly
                        tag-class="bg-app-secondary-b text-app-primary-b" tag-size="sm"
                        placeholder="Agregar un voto disidente" addButtonText="Agregar" removeButtonText="Eliminar"
                        removeOnDeleteKey />
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="CVOTE" class="form-label">Voto Concurrente
                        <small class="font-weight">(disiente de la
                            argumentación jurídica, pero no del fallo final
                            adoptado.)</small>
                    </label>
                    <b-form-tags separator="," v-model="modelo.CVOTE" tag-variant="primary" tag-pills tag-readonly
                        tag-class="bg-app-secondary-b text-app-primary-b" tag-size="sm"
                        placeholder="Agregar un voto concurrente" addButtonText="Agregar" removeButtonText="Eliminar"
                        removeOnDeleteKey />
                </div>

                <h5 class="text-app-primary">DOCUMENTOS</h5>
                <hr>

                <div class="col-md-8 col-12 mb-3 flex flex-col"
                    :class="{ error: validation.hasError('modelo.ENTRIEFILE') }">
                    <label for="file" class="forml-label">Documento Principal <span class="text-danger">*</span></label>
                    <input class="custom-input" type="file" accept=".pdf" name="file_input" placeholder="Escribe aquí"
                        @change="modelo.ENTRIEFILE = $event.target.files[0]">
                    <span class="message" v-if="validation.hasError('modelo.ENTRIEFILE')">
                        {{ validation.firstError('modelo.ENTRIEFILE') }}
                    </span>
                </div>

                <h5 class="text-app-primary">CONTENIDO</h5>
                <hr>

                <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.ENTRIEFILERESUMEN') }">
                    <label for="KEYWORDS" class="form-label">Palabras clave <span class="text-danger">*</span></label>
                    <b-form-tags separator="," v-model="modelo.KEYWORDS" tag-variant="primary" tag-pills tag-readonly
                        tag-class="bg-app-secondary-b text-app-primary-b" tag-size="sm"
                        placeholder="Agregar un voto concurrente" addButtonText="Agregar" removeButtonText="Eliminar"
                        removeOnDeleteKey />
                    <span class="message" v-if="validation.hasError('modelo.KEYWORDS')">
                        {{ validation.firstError('modelo.KEYWORDS') }}
                    </span>
                </div>

                <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.TEMA') }">
                    <label for="theme" class="form-label">Tema <span class="text-danger">*</span></label>
                    <vue-editor v-model="modelo.TEMA" class="mb-0 pb-0"></vue-editor>
                    <span class="message" v-if="validation.hasError('modelo.TEMA')">
                        {{ validation.firstError('modelo.TEMA') }}
                    </span>
                </div>

                <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.SUBTEMA') }">
                    <label for="theme" class="form-label">Subtema <span class="text-danger">*</span></label>
                    <vue-editor v-model="modelo.SUBTEMA" class="mb-0 pb-0"></vue-editor>
                    <span class="message" v-if="validation.hasError('modelo.SUBTEMA')">
                        {{ validation.firstError('modelo.SUBTEMA') }}
                    </span>
                </div>

                <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.SHORTSUMMARY') }">
                    <label for="theme" class="form-label">Síntesis de los fundamentos jurídicos relevantes <span
                            class="text-danger">*</span></label>
                    <vue-editor v-model="modelo.SHORTSUMMARY" class="mb-0 pb-0"></vue-editor>
                    <span class="message" v-if="validation.hasError('modelo.SHORTSUMMARY')">
                        {{ validation.firstError('modelo.SHORTSUMMARY') }}
                    </span>
                </div>

                <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.RESUMEN') }">
                    <label for="theme" class="form-label">Fundamentos jurídicos relevantes <span
                            class="text-danger">*</span></label>
                    <vue-editor v-model="modelo.RESUMEN" class="mb-0 pb-0"></vue-editor>
                    <span class="message" v-if="validation.hasError('modelo.RESUMEN')">
                        {{ validation.firstError('modelo.RESUMEN') }}
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
import { BModal, BFormCheckbox, BFormTags, BButton } from 'bootstrap-vue-next';
import { VueEditor } from "vue3-editor";
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

// * PROXY
import adminEntriesProxy from "../../../proxies/AdminEntriesProxy.js";


export default {
    components: {
        BModal,
        BFormCheckbox,
        BFormTags,
        VueEditor,
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
                ISBINDING: false,
                AMBIT: [],
                FRESOLUTION: null,
                OJURISDICCIONAL: [],
                MAGISTRATES: [],
                VDESIDENTE: [],
                CVOTE: [],
                ENTRIEFILE: null,
                ENTRIEFILERESUMEN: null,
                KEYWORDS: [],
                TEMA: null,
                SUBTEMA: null,
                SHORTSUMMARY: null,
                RESUMEN: null,
                RECURSO: [],
                DELITO: [],
                MATERIA: [],
                JURISDICCION: [],
                JURISDICCIONV: [],
            },
        }
    },
    validators: {
        'modelo.TITLE': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.AMBIT': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
        'modelo.FRESOLUTION': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.OJURISDICCIONAL': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
        'modelo.JURISDICCION': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
        'modelo.MAGISTRATES': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
        // 'modelo.VDESIDENTE': function (value) {
        //     return Validator.value(value).required("Campo requerido");
        // },
        // 'modelo.CVOTE': function (value) {
        //     return Validator.value(value).required("Campo requerido");
        // },
        'modelo.ENTRIEFILE': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.KEYWORDS': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
        'modelo.TEMA': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.SUBTEMA': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.SHORTSUMMARY': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.RESUMEN': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.RECURSO': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
        'modelo.DELITO': function (value) {
            return Validator.value(value).required("Campo requerido").regex(/[^[]/, "Campo requerido");
        },
    },
    methods: {
        localStorageSave() {
            localStorage.setItem("commonEntrie", JSON.stringify(this.modelo));
        },
        UpdateLocaleStorage() {
            let data = JSON.parse(localStorage.getItem("commonEntrie"));
            this.modelo = data;
        },
        async submit(e) {
            e.preventDefault();

            if(this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });


            let validate = await this.$validate();
            if (!validate) return;

            const formData = new FormData();
            formData.append("files", this.modelo.ENTRIEFILE);
            formData.append("files", this.modelo.ENTRIEFILERESUMEN);
            formData.append("TITLE", this.modelo.TITLE);
            formData.append("RTITLE", this.modelo.RTITLE);
            formData.append("ISBINDING", this.modelo.ISBINDING);
            formData.append("AMBIT", this.modelo.AMBIT.join(","));
            formData.append("FRESOLUTION", this.modelo.FRESOLUTION);
            formData.append("OJURISDICCIONAL", this.modelo.OJURISDICCIONAL);
            formData.append("MAGISTRATES", this.modelo.MAGISTRATES.join(","));
            formData.append("VDESIDENTE", this.modelo.VDESIDENTE);
            formData.append("CVOTE", this.modelo.CVOTE);
            formData.append("KEYWORDS", this.modelo.KEYWORDS.join(","));
            formData.append("TEMA", this.modelo.TEMA);
            formData.append("SUBTEMA", this.modelo.SUBTEMA);
            formData.append("SHORTSUMMARY", this.modelo.SHORTSUMMARY);
            formData.append("RESUMEN", this.modelo.RESUMEN);
            formData.append("TYPE", "jurisprudences");
            formData.append("TIPO", "common");
            formData.append("DELITO", this.modelo.DELITO.join(",") || "");
            formData.append("RECURSO", this.modelo.RECURSO.join(",") || "");
            formData.append("MATERIA", this.modelo.MATERIA.join(",") || "");
            formData.append("JURISDICCION", this.modelo.JURISDICCION.join(","));
            formData.append("JURISDICCIONV", this.modelo.JURISDICCIONV.join(","));


            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");
            await adminEntriesProxy.create(formData)
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
                ISBINDING: false,
                AMBIT: [],
                FRESOLUTION: null,
                OJURISDICCIONAL: [],
                MAGISTRATES: [],
                VDESIDENTE: [],
                CVOTE: [],
                ENTRIEFILE: null,
                ENTRIEFILERESUMEN: null,
                KEYWORDS: [],
                TEMA: null,
                SUBTEMA: null,
                SHORTSUMMARY: null,
                RESUMEN: null,
                RECURSO: [],
                DELITO: [],
                MATERIA: [],
                JURISDICCION: [],
                JURISDICCIONV: [],
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
    },
}


</script>