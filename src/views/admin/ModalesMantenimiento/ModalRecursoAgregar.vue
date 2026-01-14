<template>
    <b-modal id="modalAgregarRecurso" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Agregar Recurso" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarRecurso" @submit.prevent="submit">
            <div class="row">
                <div class="col-12 mb-3">
                    <label for="name" class="form-label">Nombres <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.NOMBRES') }"
                        v-model="modelo.NOMBRES" id="NOMBRES" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                        {{ validation.firstError('modelo.NOMBRES') }}
                    </span>
                </div>

                <div class="col-12 mb-3">
                    <label class="form-label">Agregar algun recurso <span class="text-danger">*</span></label>
                    <div class="dropzone" @dragover.prevent @drop.prevent="handleDrop" @click="triggerFileSelect">
                        <p>
                            {{ !preview ? 'Arrastra un recurso aquí o haz clic para seleccionar' : preview }}
                        </p>
                        <input type="file" ref="fileInput" @change="handleFile" hidden />
                    </div>
                    <span class="message" v-if="validation.hasError('modelo.IMAGEN')">
                        {{ validation.firstError('modelo.IMAGEN') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label class="form-label" for="VLR1">Valor 1 </label>
                    <input type="text" v-model="modelo.VLR1" id="VLR1" class="form-control" />
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label class="form-label" for="VLR2">Valor 2 </label>
                    <input type="text" v-model="modelo.VLR2" id="VLR2" class="form-control" />
                </div>  

                <div class="col-md-4 col-12 mb-3">
                    <label class="form-label" for="VLR3">Valor 3 </label>
                    <input type="text" v-model="modelo.VLR3" id="VLR3" class="form-control" />
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
import MantenimientoProxy from "../../../proxies/MantenimientoProxy";


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
        userType: {
            type: Number,
            default: 0
        },
        role: {
            type: Object,
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
                NOMBRES: null,
                VLR1: null,
                VLR2: null,
                VLR3: null,
            },
        }
    },
    validators: {
        'modelo.NOMBRES': function (value) {
            return Validator.value(value).required("Campo requerido");
        }
    },
    methods: {
        async submit(e) {
            e.preventDefault();
            let validate = await this.$validate();
            if (!validate) return;

            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });
            if (!this.file) return toast.warning('No se ha seleccionado una imagen', { toastId: 'warning-delete' });


            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");

            let formData = new FormData();
            formData.append("NOMBRES", this.modelo.NOMBRES);
            formData.append("VLR1", this.modelo.VLR1);
            formData.append("VLR2", this.modelo.VLR2);
            formData.append("VLR3", this.modelo.VLR3);
            formData.append("files", this.file);

            await MantenimientoProxy.createRecurso(formData)
                .then(response => {
                    const toastMessage = response.STATUS ? "Recurso creada con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al crear la Recurso"))
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
            if (file) {
                this.preview = file.name;
                this.file = file;
            } else {
                this.preview = null;
                this.file = null;
            }
        },
        handleDrop(event) {
            const file = event.dataTransfer.files[0];
            if (file) {
                this.preview = file.name;
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
                VLR1: null,
                VLR2: null,
                VLR3: null, 
            }
            this.preview = null;
            this.file = null;

            document.querySelector("input[type='file']").value = "";
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
<style scoped src="@/assets/styles/modal-styles.css"></style>
