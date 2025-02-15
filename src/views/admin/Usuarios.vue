<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12">
            <div class="w-full mb-12">
                <b-tabs>
                    <b-tab title="Subscriptores" @click="updateActive('2')">
                    </b-tab>
                    <b-tab title="Digitadores" @click="updateActive('1')">
                    </b-tab>
                    <b-tab title="Administradores" @click="updateActive('0')">
                    </b-tab>
                </b-tabs>

                <div class="bg-white p-4 shadow-lg">
                    <div class="row">
                        <div class="col-md-9 col-12 mb-3">
                            <label for="name" class="form-label">Busqueda</label>
                            <input type="text" v-model="filter.NOMBRES" id="name" class="form-control" />
                        </div>

                        <div class="col-md-3 col-12 mb-3">
                            <label for="CDESTDO" class="form-label">Estado</label>
                            <b-form-select v-model="filter.CDESTDO" :options="[
                                { text: '-- Seleccione ', value: null },
                                { text: 'Activo', value: 'A' },
                                { text: 'Inactivo', value: 'I' }]">
                            </b-form-select>
                        </div>


                        <div class="col-md-12 col-12 mb-3">
                            <div class="flex justify-end gap-4">
                                <button class="bton btn-search"
                                    @click="search(grid.currentPage, grid.perPage)">Buscar</button>
                                <button class="bton btn-create" @click="modalAgregarUsuario.show = true">Crear</button>

                            </div>
                        </div>

                    </div>

                    <card-table :active="active" title="Usuarios" :search="search" :fields="fields" :items="data"
                        :grid="grid" :actions="actions" />

                </div>

            </div>
        </div>

        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

        <ModalUsuarioInsertar :role="role" :show="modalAgregarUsuario.show" :close="() => modalAgregarUsuario.show = false"
            :update="() => search(grid.currentPage, grid.perPage)" :selects="selects" :userType="Number(active)" />

        <ModalUsuarioEditar :role="role" :show="modalEditarUsuario.show" :close="() => modalEditarUsuario.show = false"
            :update="() => search(grid.currentPage, grid.perPage)" :selects="selects" :data="modalEditarUsuario.data"
            :userType="Number(active)" />

        <ModalEliminar :message="'¿Está seguro de cambiar el estado de este registro?, el usuario perdera su acceso.'"
            :buttonOk="'Si, cambiar'" :action="deleteRow" :openDelete="modalEliminar.show"
            :closeHandler="() => modalEliminar.show = false" />


    </div>
</template>


<script>
import CardTable from "@/components/Cards/CardTable.vue";
import { BTabs, BTab, BFormSelect } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';

// MODALES
import ModalEliminar from "./Modales/ModalEliminar.vue";
import ModalUsuarioInsertar from "./ModalesUsuario/ModalUsuarioInsertar.vue";
import ModalUsuarioEditar from "./ModalesUsuario/ModalUsuarioEditar.vue";

// PROXIES
import userProxy from "../../proxies/UserProxy.js";
import MantenimientoProxy from "../../proxies/MantenimientoProxy.js";

export default {
    components: {
        CardTable,
        BTabs,
        BTab,
        BFormSelect,

        // MODALES
        ModalEliminar,
        ModalUsuarioInsertar,
        ModalUsuarioEditar
    },
    data() {
        return {
            currentPage: 10,
            data: [],
            grid: {
                items: [],
                currentPage: 1,
                perPage: 10,
                totalRows: 120,
                isLoading: true,
                pageOptions: [5, 10, 15, 50],
            },
            fields: [
                {
                    key: "RN",
                    label: "",
                },
                {
                    key: "APATERNO",
                    label: "Apellidos y Nombres",
                    sortable: true,
                    formatter: (value, key, item) => `${item.APATERNO} ${item.AMATERNO}, ${item.NOMBRES}`,
                },
                {
                    key: "EMAIL",
                    label: "Correo electrónico",
                    sortable: true,
                },
                {
                    key: "FCRCN",
                    label: "Subscriptor desde",
                    sortable: true,
                },
                {
                    key: "CDESTDO",
                    label: "Estado",
                    sortable: true,
                    class: "text-center w-130",
                },
                {
                    key: "ACCIONES",
                    label: "Acciones",
                    class: "text-center w-130",
                },
            ],
            actions: {
                edit: {
                    label: "Editar",
                    icon: "fas fa-edit",
                    class: "btn-edit",
                    action: null,
                },
                delete: {
                    label: "Eliminar",
                    icon: "fas fa-trash",
                    class: "btn-delete",
                    action: null,
                },
            },

            isLoading: false,
            // TABS
            active: "2",

            // OPENINGS MODALES
            modalAgregarUsuario: {
                show: false,
                data: null,
            },
            modalEditarUsuario: {
                show: false,
                data: null,
            },


            modalEliminar: {
                show: false,
                data: null,
            },

            // SELECTS
            filter: {
                NOMBRES: null,
                CDESTDO: null,
            },
            selects: {
                planes: [],
            }
        };
    },
    props: {
        role: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        async search(currentPage, perPage) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;

            this.grid.isLoading = true;
            await userProxy.list({
                ROWS: rows,
                INIT: init,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
            }, this.active)
                .then((dataresponse) => {
                    this.data = dataresponse
                    this.grid.totalRows = dataresponse[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.data = [];
                    toast.error(error?.MESSAGE || 'Error al cargar los usuarios', { toastId: 'error-usuarios' });
                })
                .finally(() => this.grid.isLoading = false);
        },
        updateActive(text) {
            this.active = text;
            this.selectedFilter = {
                NOMBRES: null,
                CDESTDO: 'A',
            };
            this.grid = {
                ...this.grid,
                perPage: 10,
                currentPage: 1,
                loading: false,
            };
            this.search(this.grid.currentPage, this.grid.perPage);
        },

        // ACTIONS ... 
        async edit(data) {
            if(!data.ID) return toast.warning('No se encontró el identificador del usuario', { toastId: 'warning-edit' }); 
            this.modalEditarUsuario.data = data;
            this.modalEditarUsuario.show = true;
        },
        async deleteRow() {
            if(this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            if (!this.modalEliminar.data.ID) return toast.warning('No se encontró el identificador del usuario', { toastId: 'warning-delete' });

            this.isLoading = true;
            await userProxy.delete(this.modalEliminar.data.ID)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al eliminar al usuario';

                    if (response.STATUS) {
                        toast.success('Usuario eliminado correctamente', { toastId: 'success-delete' });
                        this.search(this.grid.currentPage, this.grid.perPage);
                        this.modalEliminar.show = false;

                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar al usuario', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
        async getPlanes() {
            await MantenimientoProxy.listPlanes({ INIT: 0, ROWS: 10000 })
                .then((response) => {
                    this.selects.planes = response.map((item) => ({ value: item.ID, text: item.DESCRIPCION })) || []
                })
                .catch(() => {
                    this.selects.planes = [];
                    toast.error('Error al cargar los planes', { toastId: 'error-planes' });
                });
        },
    },
    mounted() {
        this.getPlanes();
        this.actions = {
            ...this.actions,
            edit: {
                ...this.actions.edit,
                action: (data) => this.edit(data),
            },
            delete: {
                ...this.actions.delete,
                action: (data) => {
                    this.modalEliminar.show = true;
                    this.modalEliminar.data = data;
                }
            },
        }

    }
};
</script>