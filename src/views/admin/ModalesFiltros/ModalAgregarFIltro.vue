<template>
    <b-modal id="modalAgregarFiltro" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Agregar Filtro" bodyScrolling no-close-on-backdrop
        no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarFiltro" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-6 col-12 mb-3" :class="{ error: validation.hasError('modelo.NIVEL') }">
                    <label for="NIVEL" class="form-label">Nivel <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.NIVEL" :disabled="true" id="NIVEL" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.NIVEL')">
                        {{ validation.firstError('modelo.NIVEL') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3 flex flex-col" :class="{ error: validation.hasError('modelo.TIPO') }">
                    <label for="file" class="forml-label">Tipo <span class="text-danger">*</span></label>
                    <b-form-select v-model="modelo.TIPO" :options="options" class="form-control"
                    :disabled="this.active != 1" />
                    <span class="message" v-if="validation.hasError('modelo.TIPO')">
                        {{ validation.firstError('modelo.TIPO') }}
                    </span>
                </div>

                <div class="col-12 mb-3" :class="{ error: validation.hasError('modelo.LABEL') }">
                    <label for="LABEL" class="form-label">Etiqueta <span class="text-danger">*</span></label>
                    <input type="text" v-model="modelo.LABEL" id="LABEL" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.LABEL')">
                        {{ validation.firstError('modelo.LABEL') }}
                    </span>
                </div>

            </div>
        </form>
    </b-modal>
</template>


<script>
import { BModal, BFormSelect } from 'bootstrap-vue-next';
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

// * PROXY
import FilterProxy from "../../../proxies/FilterProxy";


export default {
    components: {
        BModal,
        BFormSelect
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
        active: {
            type: Number,
            default: () => { }
        },
        data: {
            type: Object,
            default: () => { }
        },
        niveles: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            isShow: false,
            loadingSubmit: false,
            options: [
                { value: null, text: "-- Seleccione" },
                { value: 1, text: "JURISPRUDENCIA" },
                { value: 2, text: "LEGISLACIÓN" },
            ],
            modelo: {
                NIVEL: null,
                TIPO: null,
                IDPARENT: null,
                LABEL: null,
                ID: null,
            },
        }
    },
    validators: {
        'modelo.TIPO': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.LABEL': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();

            let validate = await this.$validate();
            if (!validate) return;


            if(this.active > 1) {
                if(!this.modelo.IDPARENT) {
                    toast.error("Debe seleccionar un filtro padre");
                    return;
                }
            }

            this.loadingSubmit = true;
            const loadingToast = toast.loading("Espere un momento...");
            await FilterProxy.create({
                ...this.modelo,
                IDPARENT: this.modelo.IDPARENT || null,
                NIVEL: this.modelo.NIVEL.split(" ")[1]
            })
                .then(response => {
                    const toastMessage = response.STATUS ? "Filtro creado con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al crear el filtro"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                NIVEL: null,
                TIPO: null,
                IDPARENT: null,
                LABEL: null,
                ID: null,
            }

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
                if (value) {
                    this.modelo = {
                        NIVEL: `NIVEL ${this.active}`,
                        TIPO: this.data?.TIPO == "JURISPRUDENCIA" ? 1 : this.data?.TIPO == "LEGISLACIÓN" ? 2 : null, 
                        IDPARENT: this.niveles[`ID${this.active - 1}`],
                        LABEL: null,
                        ID: null,
                    }
                }
            }
        }
    }
}


</script>