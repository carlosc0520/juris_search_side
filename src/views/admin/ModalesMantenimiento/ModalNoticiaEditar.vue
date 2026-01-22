<template>
    <b-modal id="modalEditarNoticia" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Editar Noticia" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formEditarNoticia" @submit.prevent="submit">
            <div class="row">
                <div class="col-12 mb-3">
                    <label for="name" class="form-label">Titulo <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.TITULO') }" v-model="modelo.TITULO"
                        id="TITULO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.TITULO')">
                        {{ validation.firstError('modelo.TITULO') }}
                    </span>
                </div>

                <div class="col-12 mb-3">
                    <label class="form-label">Imagen de portada <span class="text-danger">*</span></label>
                    <div class="dropzone" @dragover.prevent @drop.prevent="handleDrop" @click="triggerFileSelect">
                        <p v-if="!preview">Arrastra una imagen aquí o haz clic para seleccionar</p>
                        <img v-if="preview" :src="preview" class="preview" />
                        <input type="file" ref="fileInput" accept="image/*" @change="handleFile" hidden />
                    </div>
                    <span class="message" v-if="validation.hasError('modelo.IMAGEN')">
                        {{ validation.firstError('modelo.IMAGEN') }}
                    </span>
                </div>

                <div class="col-12 mb-3">
                    <label for="name" class="form-label">Enlace </label>
                    <input type="text" v-model="modelo.ENLACE"
                        id="ENLACE" class="form-control" />
                </div>


                <div class="col-md-6 col-12 mb-3">
                    <label class="form-label" for="IDAUTORES">Autores </label>

                    <el-tree-select :class="{ error: validation.hasError('modelo.IDAUTORES') }"
                        v-model="modelo.IDAUTORES" :data="selects.autores" multiple :render-after-expand="false"
                        placeholder="Seleccione una opción" show-checkbox check-strictly check-on-click-node filterable
                        no-data-text="No hay opciones disponibles" clearable collapse-tags :max-collapse-tags="1" />

                    <span class="message" v-if="validation.hasError('modelo.IDAUTORES')">
                        {{ validation.firstError('modelo.IDAUTORES') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label class="form-label" for="IDCATEGORIAS">Categorías </label>

                    <el-tree-select 
                        v-model="modelo.IDCATEGORIAS" :data="selects.categorias" multiple :render-after-expand="false"
                        placeholder="Seleccione una opción" show-checkbox check-strictly check-on-click-node filterable
                        no-data-text="No hay opciones disponibles" clearable collapse-tags :max-collapse-tags="1" />

                </div>

                <div class="col-12 mb-3">
                    <label for="theme" class="form-label">Descripción <span class="text-danger">*</span></label>
                    <vue-editor v-model="modelo.DESCRIPCION"
                        :class="{ error: validation.hasError('modelo.DESCRIPCION') }" class="mb-0 pb-0"></vue-editor>
                    <span class="message" v-if="validation.hasError('modelo.DESCRIPCION')">
                        {{ validation.firstError('modelo.DESCRIPCION') }}
                    </span>
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
        },
        selects: {
            type: Array,
            default: () => { }
        },
    },
    data() {
        return {
            isShow: false,
            loadingSubmit: false,
            preview: null,
            file: null,
            modelo: {
                ID: null,
                TITULO: null,
                DESCRIPCION: null,
                IMAGEN: null,
                IDAUTORES: [],
                IDCATEGORIAS: [],
                ENLACE: null,
            }
        }
    },
    validators: {
        'modelo.TITULO': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.DESCRIPCION': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.IDCATEGORIAS': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });
            if (this.modelo.ID == null) return toast.warning('No se ha seleccionado una categoria', { toastId: 'warning-delete' });
            if (!this.file && !this.modelo.IMAGEN) return toast.warning('No se ha seleccionado una imagen', { toastId: 'warning-delete' });

            let validate = await this.$validate();
            if (!validate) return;

            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");

            let formData = new FormData();
            formData.append('ID', this.modelo.ID);
            formData.append("TITULO", this.modelo.TITULO);
            formData.append("DESCRIPCION", this.modelo.DESCRIPCION);
            formData.append('IMAGEN', this.modelo.IMAGEN);
            formData.append("IDAUTORES", !this.modelo.IDAUTORES ? '' : this.modelo.IDAUTORES.join(",") || null);
            formData.append("IDCATEGORIAS", !this.modelo.IDCATEGORIAS ? '' : this.modelo.IDCATEGORIAS.join(",") || null);
            formData.append("ENLACE", this.modelo.ENLACE || null);
            if (this.file) {
                formData.append('files', this.file);
            }
            await MantenimientoProxy.edit(formData)
                .then(response => {
                    const toastMessage = response.STATUS ? "Noticia editado correctamente" : response.MESSAGE || "Error al editar el Noticia";
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al editar el Noticia"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        triggerFileSelect() {
            this.$refs.fileInput.click();
        },
        handleFile(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.preview = URL.createObjectURL(file);
                this.file = file;
            } else {
                this.preview = null;
                this.file = null;
            }
        },
        handleDrop(event) {
            const file = event.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.preview = URL.createObjectURL(file);
                this.file = file;
            } else {
                this.preview = null;
                this.file = null;
            }
        },
        async getImageBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },
        reset() {
            this.modelo = {
                ID: null,
                TITULO: null,
                DESCRIPCION: null,
                IMAGEN: null,
                IDAUTORES: null,
                IDCATEGORIAS: null,
                ENLACE: null,
            }
            this.preview = null;
            this.file = null;
            this.validation.reset();
        }
    },
    watch: {
        show: {
            handler(value) {
                if (value) {
                    this.modelo = {
                        ...this.data,
                        IDAUTORES: this.data.IDAUTORES ? this.data.IDAUTORES.split(",").map(Number) : [],
                        IDCATEGORIAS: this.data.IDCATEGORIAS ? this.data.IDCATEGORIAS.split(",").map(Number) : [],
                    }

                    this.preview = this.data.IMAGEN ? ("https://jurissearch.com/" + this.data.IMAGEN) : null;
                    this.file = null;
                    this.$nextTick(() => {
                        this.$refs.fileInput.value = null;
                    });
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
