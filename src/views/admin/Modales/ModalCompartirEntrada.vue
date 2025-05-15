<template>
    <b-modal id="modal-resolucion-compartir" v-model="show" 
     ok-title="Guardar" cancel-title="Cancelar"
     @ok="submit" @cancel="show = false"
    title="" centered size="xl">

        <p class="text-left">
            <span style="color: #1864FF">Comparte documentos con tus contactos</span>
            <br>
            <span style="color: #727370">Selecciona los contactos con los que deseas compartir tus documentos.</span>
        </p>

        <!-- // input de busqueda -->
        <div class="row">
            <div class="col-12 col-md-9">
                <div class="input-group mb-3" style="height: 50px;">
                    <input type="text" 
                    v-model="SEARCH"
                    class="form-control" placeholder="Buscar por nombre o email" aria-label="Buscar por nombre o email" aria-describedby="button-addon2">
                    <button
                    @click="getContactos()"
                    class="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
                </div>
            </div>

            <div class="col-12 col-md-3 mb-3">
                <!-- // select de Lector y Editor valor 1 y 2 -->
                <select class="form-select" v-model="ISPERM" aria-label="Default select example">
                    <option selected value="1">Lector</option>
                    <option value="2">Editor</option>
                </select>
            </div>

            <!-- // ha seleccionado n contactos -->
             <div class="col-12 col-md-12">
                <p class="text-left" style="color: #727370; font-size: 14px;">
                    <span style="color: #1864FF">{{ contactosSelected.length }}</span> contactos seleccionados
                </p>
            </div>

            <!-- // foto - RTAFTO, nombres - NOMBRES +  APELLIDOS y check para seleccionar -->
            <div class="col-12 col-md-12">
                <div class="row">
                    <div class="col-12 mb-3" v-for="(contacto, index) in contactos" :key="index">
                        <div class="row">
                            <div class="col-10 d-flex align-items-center gap-3">
                                <img :src="contacto.RTAFTO || 'https://placehold.co/50x50'" 
                                class="rounded-circle"
                                alt="" width="50px" height="50px">
                                <div>
                                    <p style="color: #262626; font-style: bold;" class="m-0">{{ contacto.NOMBRES + " " + contacto.APELLIDOS }}</p>
                                    <p class="m-0" style="font-size: 12px; color: #727370;">{{ contacto.EMAIL }}</p>
                                </div>
                            </div>
                            <div class="col-2 d-flex align-items-center">
                                <input type="checkbox" class="check-head form-check-input"
                                    :id="'check' + index"
                                    :checked="contacto.CHECKED"
                                    @change="onSelectedContactos(contacto, $event.target.checked)"
                                />
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
    name: "ModalCompartirEntrada",
    components: {
        BModal
    },
    data() {
        return {
            show: false,
            SEARCH: "",
            ISPERM: 1,
            contactos: [],
            contactosSelected: [],
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
            await UserProxy.getContactos({ESTADO: true, INIT: 0, ROWS: 10, DESC: this.SEARCH, IDFAV: this.data.ID})
                .then((response) => {
                    this.contactos = response.map(contacto => {
                        return {
                            ...contacto,
                            CHECKED: this.contactosSelected.some(contactoSelected => contactoSelected.ID === contacto.ID)
                        }
                    });
                })
                .catch(() => {
                    this.contactos = [];
                    toast.error("Error al obtener los contactos");
                })
        },
        onSelectedContactos(item, checked) {
            if(checked) {
                if(!this.contactosSelected.some(contacto => contacto.ID === item.ID)) {
                    this.contactosSelected.push(item);
                }
            } else {
                this.contactosSelected = this.contactosSelected.filter(contacto => contacto.ID !== item.ID);
            }
        },
        async submit(e) {
            e.preventDefault();

            if(this.contactosSelected.length === 0) {
                toast.error("Selecciona al menos un contacto");
                return;
            }

            const contactosSelected = this.contactosSelected.map(contacto => {
                return {
                    IDFAV: this.data.ID,
                    IDUSERSHARED: contacto.IDRECEPT,
                    ISPERM: this.ISPERM,
                    CESTDO: 'A'
                }
            });

            await UserProxy.setCompartirEntrada({
                CONTACTOS: JSON.stringify(contactosSelected),
            })
                .then((response) => {
                    if (response.STATUS) {
                        this.show = false;
                        toast.success("Documentos compartidos correctamente");
                    } else {
                        toast.error(response.MESSAGE);
                    }
                })
                .catch(() => {
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
                this.SEARCH = "";
                this.ISPERM = 1;
                this.contactos = [];
                this.contactosSelected = [];
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