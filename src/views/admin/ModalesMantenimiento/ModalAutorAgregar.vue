<template>
    <b-modal id="modalAgregarAutor" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Agregar Autor" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarAutor" @submit.prevent="submit">
            <div class="row">
                <div class="col-12 mb-3">
                    <label class="form-label">Imagen </label>
                    <div class="dropzone" @dragover.prevent @drop.prevent="handleDrop" @click="triggerFileSelect">
                        <p v-if="!preview">Arrastra una imagen aquí o haz clic para seleccionar</p>
                        <img v-if="preview" :src="preview" class="preview" />
                        <input type="file" ref="fileInput" accept="image/*" @change="handleFile" hidden />
                    </div>
                </div>

                <div class="col-12 col-md-6 mb-3">
                    <label for="name" class="form-label">Nombres <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.NOMBRES') }"
                        v-model="modelo.NOMBRES" id="NOMBRES" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                        {{ validation.firstError('modelo.NOMBRES') }}
                    </span>
                </div>

                <div class="col-12 col-md-6 mb-3">
                    <label for="name" class="form-label">Apellidos</label>
                    <input type="text" v-model="modelo.APELLIDOS" id="APELLIDOS" class="form-control" />
                </div>

                <div class="col-12 mb-3">
                    <label for="REDES" class="form-label">Redes sociales</label>
                    <b-form-tags separator="," v-model="modelo.REDES" tag-variant="primary" tag-pills tag-readonly
                        tag-class="bg-app-secondary-b text-app-primary-b" tag-size="sm"
                        placeholder="Agregar una red solcial" addButtonText="Agregar" removeButtonText="Eliminar"
                        removeOnDeleteKey />
                </div>
            </div>
        </form>
    </b-modal>
</template>

<script>
import { BModal, BFormTags } from 'bootstrap-vue-next';
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';
import MantenimientoProxy from "../../../proxies/MantenimientoProxy";

export default {
    components: {
        BModal,
        BFormTags
    },
    props: {
        show: Boolean,
        close: Function,
        update: Function,
        role: Object
    },
    data() {
        return {
            isShow: false,
            loadingSubmit: false,
            preview: null,
            file: null,
            modelo: {
                NOMBRES: null,
                APELLIDOS: null,
                REDES: [],
                DETALLE: null,
            }
        }
    },
    validators: {
        'modelo.NOMBRES': value => Validator.value(value).required("Campo requerido"),
    },
    methods: {
        async submit(e) {
            e.preventDefault();
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción');

            let validate = await this.$validate();
            if (!validate) return;

            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");

            let formData = new FormData();
            formData.append('NOMBRES', this.modelo.NOMBRES);
            formData.append('APELLIDOS', this.modelo.APELLIDOS);
            formData.append('REDES', this.modelo.REDES.join(','));
            formData.append('DETALLE', this.modelo.DETALLE);
            formData.append('RUTA', '');
            if (this.file) {
                formData.append('files', this.file);
            }
            await MantenimientoProxy.createAutor(formData)
                .then(response => {
                    const toastMessage = response.STATUS ? "Autor creado correctamente" : response.MESSAGE || "Error al crear el Autor";
                    response.STATUS ? toast.success(toastMessage) : toast.error(toastMessage);

                    if (response.STATUS) {
                        this.reset();
                        this.update();
                        this.close();
                    }
                })
                .catch(err => toast.error(err?.MESSAGE || "Error al crear el Autor"))
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
                NOMBRES: null,
                DETALLE: null,
                IMAGEN: null
            };
            this.preview = null;
            this.file = null;
            this.validation.reset();
        }
    },
    watch: {
        show: {
            handler(value) {
                if (!value) this.reset();
                this.isShow = value;
            }
        }
    }
}
</script>
