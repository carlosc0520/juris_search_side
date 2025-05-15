<template>
    <b-modal id="modal-resolucion-user-compartir" v-model="show" 
    ok-title="Guardar" cancel-title="Cancelar"
    @ok="submit" @cancel="show = false"
    :hide-footer="data.PROP == 0"

    title="" centered size="xl">

        <p class="text-left">
            <span style="color: #1864FF">
                Usuarios con los que se comparte la entrada
            </span>
        </p>

        <div class="row">
            <div class="col-12">
                <div class="input-group mb-3" style="height: 50px;">
                    <input type="text" 
                    v-model="SEARCH"
                    class="form-control" placeholder="Buscar por nombre o email" aria-label="Buscar por nombre o email" aria-describedby="button-addon2">
                    <button
                    @click="getContactos()"
                    class="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
                </div>
            </div>
              <div class="col-12 col-md-12">
                <div class="row">
                    <div class="col-12" v-for="(contacto, index) in contactos" :key="index">
                        <div class="row">
                            <div class="col-8 d-flex align-items-center gap-3 mb-3">
                                <img :src="contacto.RTAFTO || 'https://placehold.co/50x50'" 
                                class="rounded-circle"
                                alt="" width="50px" height="50px">
                                <div>
                                    <p style="color: #262626; font-style: bold;" class="m-0">{{ contacto.NOMBRES + " " + contacto.APELLIDOS }}</p>
                                    <p class="m-0" style="font-size: 12px; color: #727370;">{{ contacto.EMAIL }}</p>
                                </div>
                            </div>
                            <div class="col-4 d-flex align-items-center">
                                <select class="form-select" 
                                :disabled="data.PROP == 0"
                                v-model="contacto.ISPERM" aria-label="Default select example">
                                    <option value="1">Lector</option>
                                    <option value="2">Editor</option>
                                    <option value="3">Quitar Acceso</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </b-modal>

</template>


<script>
import { BModal } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';
import UserProxy from '@/proxies/UserProxy';

export default {
    name: "ModalUsuariosCompartidos",
    components: {
        BModal
    },
    data() {
        return {
            show: false,
            SEARCH: "",

            contactos: [],
        }
    }, 
    props: {
        openModal: {
            type: Boolean,
            default: false
        },
        toggleModal: {
            type: Function,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
         // * CONTACTOS
        async getContactos() {
            await UserProxy.getContactosSelecteds({
                    INIT: 0, ROWS: 10000, 
                    IDFAV: this.data.ID
                })
                .then((response) => {
                    this.contactos = response.map(contacto => {
                        return {
                            ...contacto,
                            ISPERM: contacto.ISPERM.toString(),
                        }
                    });
                })
                .catch(() => {
                    this.contactos = [];
                    toast.error("Error al obtener los contactos");
                })
        },
        async submit(e) {
            e.preventDefault();

           const contactosSelected = this.contactos.map(contacto => {
                return {
                    ID: contacto.ID,
                    IDFAV: contacto.IDFAV,
                    IDUSERSHARED: contacto.IDUSERSHARED,
                    ISPERM: contacto.ISPERM,
                    CESTDO: 'A'
                }
            });

            await UserProxy.setCompartirEntrada({
                CONTACTOS: JSON.stringify(contactosSelected),
            })
                .then((response) => {
                    if (response.STATUS) {
                        this.show = false;
                        toast.success("Permisos actualizados correctamente");
                    } else {
                        toast.error(response.MESSAGE);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error al compartir los documentos");
                })
        
        },
    },
    watch: {
        openModal() {
            this.show = this.openModal;
        },
        show(val) {
            if (!val) {
                this.toggleModal();
                this.contactos = [];
            } else {
                this.getContactos();
            }
        },
    },
}
</script>


<style scoped>
.input-group input{
    border-radius: 0.5rem;
    border: 1px solid #ced4da!important;
    padding: 5px!important;
}
</style>