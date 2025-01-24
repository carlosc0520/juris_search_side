<template>
    <b-modal id="modalAgregarNoticia" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Agregar Noticia" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarNoticia" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.TITULO') }">
                    <label for="name" class="form-label">Titulo <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.TITULO" id="TITULO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.TITULO')">
                        {{ validation.firstError('modelo.TITULO') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3 flex flex-col"
                    :class="{ error: validation.hasError('modelo.IMAGEN') }">
                    <label for="file" class="forml-label">Imagen <span class="text-danger">*</span></label>
                    <input class="custom-input" type="file" accept="image/*" name="file_input"
                        placeholder="Escribe aquí" @change="modelo.IMAGEN = $event.target.files[0]">
                    <span class="message" v-if="validation.hasError('modelo.IMAGEN')">
                        {{ validation.firstError('modelo.IMAGEN') }}
                    </span>
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
        selects: {
            type: Object,
            default: () => { }
        },
        userType: {
            type: Number,
            default: 0
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
                TITULO: null,
                DESCRIPCION: null,
                IMAGEN: null,
            },
        }
    },
    validators: {
        'modelo.TITULO': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.DESCRIPCION': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.IMAGEN': function (value) {
            return Validator.value(value).required("Campo requerido");
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

            let formData = new FormData();
            formData.append("TITULO", this.modelo.TITULO);
            formData.append("DESCRIPCION", this.modelo.DESCRIPCION);
            formData.append("files", this.modelo.IMAGEN);
            await MantenimientoProxy.create(formData)
                .then(response => {
                    const toastMessage = response.STATUS ? "Noticia creada con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al crear la noticia"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                TITULO: null,
                DESCRIPCION: null,
                IMAGEN: null,
            }

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