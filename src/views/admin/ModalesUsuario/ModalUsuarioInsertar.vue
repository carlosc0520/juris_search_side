<template>
    <b-modal id="modalAgregarUsuario" v-model="isShow" @ok="submit" @cancel="close" @hidden="close" size="xl"
        ok-title="Guardar" cancel-title="Cancelar" title="Agregar Usuario" bodyScrolling
        no-close-on-backdrop no-close-on-esc :hide-footer="loadingSubmit">

        <form id="formAgregarUsuario" @submit.prevent="submit">
            <div class="row">
                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Apellido Paterno <span class="text-danger">*</span></label>
                    <input type="text"  :class="{ error: validation.hasError('modelo.APATERNO') }" v-model="modelo.APATERNO" id="APATERNO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.APATERNO')">
                        {{ validation.firstError('modelo.APATERNO') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Apellido Materno <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.AMATERNO') }" v-model="modelo.AMATERNO" id="AMATERNO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.AMATERNO')">
                        {{ validation.firstError('modelo.AMATERNO') }}
                    </span>
                </div>

                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Nombres <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.NOMBRES') }" v-model="modelo.NOMBRES" id="NOMBRES" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                        {{ validation.firstError('modelo.NOMBRES') }}
                    </span>
                </div>

                
                <div class="col-md-6 col-12 mb-3">
                    <label for="name" class="form-label">Correo electrónico <span class="text-danger">*</span></label>
                    <input type="text" :class="{ error: validation.hasError('modelo.EMAIL') }" v-model="modelo.EMAIL" id="EMAIL" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.EMAIL')">
                        {{ validation.firstError('modelo.EMAIL') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label for="name" class="form-label">Teléfono <span class="text-danger">*</span></label>
                    <input type="number" :class="{ error: validation.hasError('modelo.TELEFONO') }" v-model="modelo.TELEFONO" id="TELEFONO" class="form-control" />
                    <span class="message" v-if="validation.hasError('modelo.TELEFONO')">
                        {{ validation.firstError('modelo.TELEFONO') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3">
                    <label for="BLOG3" class="form-label">Fecha Nacimiento <span class="text-danger">*</span></label>
                    <div style="height:44px;">
                      <date-picker
                        :class="{ error: validation.hasError('modelo.FNACIMIENTO') }"
                        v-model="modelo.FNACIMIENTO"
                        :value="modelo.FNACIMIENTO"
                        valueType="format"
                        :disabledDate="time => time.getTime() > Date.now()"
                        @change="(date) => modelo.FNACIMIENTO = date"
                        style="width:100%;height:100%;border:none;background:transparent;"
                      />
                    </div>
                    <span class="message" v-if="validation.hasError('modelo.FNACIMIENTO')">
                        {{ validation.firstError('modelo.FNACIMIENTO') }}
                    </span>
                </div>

                <div class="col-md-4 col-12 mb-3 flex flex-col" v-if="userType === 2">
                    <label for="file" class="forml-label">Plan </label>
                    <b-form-select v-model="modelo.IDPLAN" :options="selects.planes" class="form-control"  />
                </div>
            </div>
        </form>

        <!-- Modal footer with distributed buttons -->
        <!-- Moved inside b-modal slot for single root compliance -->
        <template #footer v-if="!loadingSubmit">
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
import { BModal, BFormSelect} from 'bootstrap-vue-next';
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';

// * PROXY
import userProxy from "../../../proxies/UserProxy.js";


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
                APATERNO: null,
                AMATERNO: null,
                NOMBRES: null,
                EMAIL: null,
                TELEFONO: null,
                FNACIMIENTO: null,
                IDPLAN: null,
                IDROLE: null,
            },
        }
    },
    validators: {
        'modelo.APATERNO': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.AMATERNO': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.NOMBRES': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.EMAIL': function (value) {
            return Validator.value(value).required("Campo requerido").email("Correo inválido");
        },
        'modelo.TELEFONO': function (value) {
            return Validator.value(value).required("Campo requerido").minLength(9, "Mínimo 9 caracteres").maxLength(15, "Máximo 15 caracteres");
        },
        'modelo.FNACIMIENTO': function (value) {
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
            this.modelo.IDROLE = this.userType;
            const loadingToast = toast.loading("Espere un momento...");
            await userProxy.create(this.modelo)
                .then(response => {
                    const toastMessage = response.STATUS ? "Usuario creado con éxito" : response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.reset();
                        this.update();
                        this.close();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch(err => toast.error(err?.MESSAGE || "Error al crear al usuario"))
                .finally(() => {
                    toast.remove(loadingToast);
                    this.loadingSubmit = false;
                });
        },
        reset() {
            this.modelo = {
                APATERNO: null,
                AMATERNO: null,
                NOMBRES: null,
                EMAIL: null,
                TELEFONO: null,
                FNACIMIENTO: null,
                IDPLAN: null,
                IDROLE: null,
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
            }
        }
    }
}


</script>
<style scoped src="@/assets/styles/modal-styles.css"></style>
