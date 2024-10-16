<template>
    <b-modal id="modalEditarNoticia" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Editar Noticia" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formEditarNoticia" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.TITULO') }">
                    <label for="name" class="form-label">Titulo <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.TITULO" id="TITULO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.TITULO')">
                        {{ validation.firstError('modelo.TITULO') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3 flex flex-col"
                    :class="{ error: validation.hasError('modelo.IMAGENE') }">
                    <label for="file" class="forml-label">Imagen </label>
                    <input class="custom-input" type="file" accept="image/*" name="file_input" placeholder="Escribe aquí"
                        @change="modelo.IMAGENE = $event.target.files[0]">
                    <span class="message" v-if="validation.hasError('modelo.IMAGENE')">
                        {{ validation.firstError('modelo.IMAGENE') }}
                    </span>
                    <a style="cursor: pointer;" @click="descargarAtob"
                        class="text-blue-500 text-sm cursor-pointer flex items-center">
                        <small class="flex flex-row gap-2 pt-2">Ver Imagen
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

                <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.DESCRIPCION') }">
                    <label for="name" class="form-label">Descripción <span class="text-danger">*</span></label>
                    <b-form-textarea style="background-color: white!important;" v-model="modelo.DESCRIPCION"
                        id="DESCRIPCION" class="form-control m-0" />
                    <span class="message" v-if="validation.hasError('modelo.DESCRIPCION')">
                        {{ validation.firstError('modelo.DESCRIPCION') }}
                    </span>
                </div>

            </div>
        </form>
    </b-modal>
</template>


<script>
import { BModal, BFormTextarea } from 'bootstrap-vue-next';
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

// * PROXY
import MantenimientoProxy from "../../../proxies/MantenimientoProxy";


export default {
    components: {
        BModal,
        BFormTextarea
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
                TITULO: null,
                DESCRIPCION: null,
                IMAGEN: null,
                IMAGENE: null,
            },
        }
    },
    validators: {
        'modelo.ID': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.TITULO': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.DESCRIPCION': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();

            let validate = await this.$validate();
            if (!validate) return;

            let formData = new FormData();
            formData.append("ID", this.modelo.ID);
            formData.append("TITULO", this.modelo.TITULO);
            formData.append("DESCRIPCION", this.modelo.DESCRIPCION);
            formData.append("IMAGEN", this.modelo.IMAGEN);
            formData.append("files", this.modelo.IMAGENE);

            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");
            await MantenimientoProxy.edit(formData)
                .then(response => {
                    const toastMessage = response.STATUS ? "Noticia editada con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al editar la noticia"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        async descargarAtob() {
            this.loadingSubmit = true;
            const loadingToast = toast.loading("Descargando imagen...");
            await MantenimientoProxy.getImage({
                ...this.data,
                KEY: this.data.IMAGEN
            })
                .then((response) => {
                    const extension = this.data.IMAGEN.split('.').pop() || 'png';
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `${this.data.TITULO}.${extension}`);
                    document.body.appendChild(link);
                    link.click();
                    toast.success("Imagen descargada con éxito", { toastId: "descargarAtob" });
                })
                .catch((error) => toast.error(error?.MESSAGE || "Error al descargar la imagen"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                ID: null,
                TITULO: null,
                DESCRIPCION: null,
                IMAGEN: null,
                IMAGENE: null,
            }

            document.querySelector("input[type='file']").value = "";
            this.validation.reset();
        }
    },
    watch: {
        show: {
            handler(value) {
                if (value) {
                    this.modelo = {
                        ...this.data
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