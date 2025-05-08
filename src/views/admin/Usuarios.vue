<template>
    <section class="bg-landing mt-4 pt-5">
        <div class="container-table flex flex-col mt-4 pt-5">
            <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
                <a class="cursor-pointer" :class="active === 'Subscriptores' ? 'active-tab' : ''"
                    @click="updateActive('Subscriptores')">
                    Subscriptores
                </a>
                <a class="cursor-pointer" :class="active === 'Digitadores' ? 'active-tab' : ''"
                    @click="updateActive('Digitadores')">
                    Digitadores
                </a>
                <a class="cursor-pointer" :class="active === 'Administradores' ? 'active-tab' : ''"
                    @click="updateActive('Administradores')">
                    Administradores
                </a>
            </div>


            <div class="row">
                <div class="col-md-9 col-12 mb-3 input-search">
                    <img :src="searchIcon" alt="search" class="icon-search" />

                    <input type="text" class="form-control"
                        :placeholder="`Buscar por nombres, apellidos o correo electrónico`" v-model="filter.NOMBRES"
                        id="name" />
                </div>

                <div class="col-md-3 col-12 mb-3">
                    <b-form-select v-model="filter.CDESTDO" :options="[
                        { text: '-- Seleccione Estado ', value: null },
                        { text: 'Activo', value: 'A' },
                        { text: 'Inactivo', value: 'I' }]">
                    </b-form-select>
                </div>


                <div class="col-md-12 col-12 mb-3 btn-actions-view">
                    <button class="bton btn-search" @click="search(grid.currentPage, grid.perPage)">
                        Buscar
                    </button>
                    <button class="bton btn-create" @click="modalAgregarUsuario.show = true">Crear</button>
                </div>
            </div>
            <div class="w-full mb-12">
                <card-table :active="active" title="Usuarios" :search="search" :fields="fields" :items="data"
                    :grid="grid" :actions="actions" />
            </div>
        </div>

        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

        <ModalUsuarioInsertar :role="role" :show="modalAgregarUsuario.show"
            :close="() => modalAgregarUsuario.show = false" :update="() => search(grid.currentPage, grid.perPage)"
            :selects="selects" :userType="Number(active == 'Administradores' ? 0 : active === 'Digitadores' ? 1 : 2)" />

        <ModalUsuarioEditar :role="role" :show="modalEditarUsuario.show" :close="() => modalEditarUsuario.show = false"
            :update="() => search(grid.currentPage, grid.perPage)" :selects="selects" :data="modalEditarUsuario.data"
            :userType="Number(active == 'Administradores' ? 0 : active === 'Digitadores' ? 1 : 2)" />

        <ModalEliminar :message="'¿Está seguro de cambiar el estado de este registro?, el usuario perdera su acceso.'"
            :buttonOk="'Si, cambiar'" :action="deleteRow" :openDelete="modalEliminar.show"
            :closeHandler="() => modalEliminar.show = false" />


    </section>
</template>

<script>
import CardTable from "@/components/Cards/CardTable.vue";
import { BFormSelect } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';
import searchIcon from "@/assets/img/icons/search.svg";

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
        BFormSelect,

        // MODALES
        ModalEliminar,
        ModalUsuarioInsertar,
        ModalUsuarioEditar
    },
    data() {
        return {
            searchIcon,
            active: "Subscriptores",
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
                    formatter: (value, key, item) => `${item?.APATERNO || ""} ${item?.AMATERNO || ""}, ${item?.NOMBRES || ""}`,
                },
                {
                    key: "EMAIL",
                    label: "Correo electrónico",
                    sortable: true,
                },
                {
                    key: "FCRCN",
                    label: "Fecha de Ingreso",
                    sortable: true,
                    class: "text-center w-130",
                },
                {
                    key: "UCRCN",
                    label: "U. Creación",
                    sortable: true,
                    class: "text-center w-130",
                },
                {
                    key: "FEDCN",
                    label: "Fecha de Edición",
                    sortable: true,
                    class: "text-center w-130",
                },
                {
                    key: "UEDCN",
                    label: "U. Edición",
                    sortable: true,
                    class: "text-center w-130",
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

            // SELECTS....
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
            }, this.active === 'Administradores' ? 0 : this.active === 'Digitadores' ? 1 : 2)
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
        async edit(data) {
            if (!data.ID) return toast.warning('No se encontró el identificador del usuario', { toastId: 'warning-edit' });
            this.modalEditarUsuario.data = data;
            this.modalEditarUsuario.show = true;
        },
        async deleteRow() {
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

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

<style scoped>
.container-table {
    max-width: 90%;
    margin: 0 auto;
}
</style>