<template>
    <section class="bg-landing mt-4 pt-5">
        <div class="container-table flex flex-col mt-4 pt-5">
            <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
                <a class="cursor-pointer" :class="active == '0' ? 'active-tab' : ''" @click="updateActive('0')">
                    Magistrados
                </a>
                <a class="cursor-pointer" :class="active == '1' ? 'active-tab' : ''" @click="updateActive('1')">
                    Filtros
                </a>
                <a class="disabled cursor-not-allowed" disabled :class="active == '2' ? 'active-tab' : ''">
                    Nivel 2
                </a>
                <a class="disabled cursor-not-allowed" disabled :class="active == '3' ? 'active-tab' : ''">
                    Nivel 3
                </a>
                <a class="disabled cursor-not-allowed" disabled :class="active == '4' ? 'active-tab' : ''">
                    Nivel 4
                </a>
                <a class="disabled cursor-not-allowed" disabled :class="active == '5' ? 'active-tab' : ''">
                    Nivel 5
                </a>
                <a class="disabled cursor-not-allowed" disabled :class="active == '6' ? 'active-tab' : ''">
                    Nivel 6
                </a>
            </div>

            <div class="row g-0 gutters">
                <h7 class="mb-2">{{
                    active == 0 ? '' :
                        active == 1 ? '' :
                            active == 2 ? `${this.title.ID2}` :
                                active == 3 ? `${this.title.ID2} > ${this.title.ID3}` :
                                    active == 4 ? `${this.title.ID2} > ${this.title.ID3} > ${this.title.ID4}` :
                                        active == 5 ? `${this.title.ID2} > ${this.title.ID3} > ${this.title.ID4} > ${this.title.ID5}` :
                                            active == 6 ? `${this.title.ID2} > ${this.title.ID3} > ${this.title.ID4} > ${this.title.ID5} >
                    ${this.title.ID6}` : ''
                }}</h7>
                <div class="row g-0 gutters">
                    <div class="col-12 mb-3 input-search" :class="active == 0 ? 'col-md-9' : 'col-md-6'">
                        <img :src="searchIcon" alt="search" class="icon-search" />

                        <input type="text" class="form-control"
                            :placeholder="active == 0 ? 'Buscar por nombres, apellidos' : 'Buscar por descripción'"
                            v-model="filter.NOMBRES" id="name" />
                    </div>

                    <div class="col-md-3 col-12 mb-3" v-if="active != 0">
                        <b-form-select v-model="filter.OPTION" :options="[
                            { text: 'JURISPRUDENCIA', value: '1' },
                            { text: 'LEGISLACIÓN', value: '2' }]">
                        </b-form-select>
                    </div>

                    <div class="col-md-3 col-12 mb-3">
                        <b-form-select v-model="filter.CDESTDO" :options="[
                            { text: '-- Seleccione Estado ', value: null },
                            { text: 'Activo', value: 'A' },
                            { text: 'Inactivo', value: 'I' }]">
                        </b-form-select>
                    </div>

                    <div class="col-md-12 col-12 mb-3">
                        <div class="display-buttons">
                            <button class="bton btn-search" @click="() => {
                                if (active == 0) searchMagistrados(grid.currentPage, grid.perPage);
                                else searchFiltros(grid.currentPage, grid.perPage,
                                    (Number(active) == 1) ? null : this.Niveles[`ID${Number(active) - 1}`]);
                            }">Buscar</button>
                            <button class="bton btn-create" @click="() => {
                                if (active == 0) modalAgregarMagistrados.show = true;
                                else modalAgregarFiltros.show = true;
                            }">Crear</button>

                            <button class="bton btn-regresar" v-if="[2, 3, 4, 5, 6].includes(Number(active))" @click="() => {
                                this.active = String(Number(active) - 1);
                                this.IDFILTER = (Number(this.active) == 1) ? null : this.Niveles[`ID${Number(this.active) - 1}`];
                                this.searchFiltros(grid.currentPage, grid.perPage,
                                    (Number(this.active) == 1) ? null : this.Niveles[`ID${Number(this.active) - 1}`]);
                            }">Regresar</button>

                        </div>
                    </div>

                </div>
            </div>

            <div class="w-full mb-12">
                <card-table v-if="active == 0" :active="active" title="Magistrados" :search="searchMagistrados"
                    :fields="fieldsMagistrados" :items="dataMagistrados" :grid="grid" :actions="actionsMagistrados" />

                <card-table v-if="active == 1" :active="active" title="Filtros" :search="searchFiltros"
                    :fields="fieldsFiltros" :items="dataFiltros" :grid="grid" :actions="actionsFiltros" />
                <card-table v-if="active == 2" :active="active" title="Filtros" :search="searchFiltros"
                    :fields="fieldsFiltros" :items="dataFiltros" :grid="grid" :actions="actionsFiltros" />
                <card-table v-if="active == 3" :active="active" title="Filtros" :search="searchFiltros"
                    :fields="fieldsFiltros" :items="dataFiltros" :grid="grid" :actions="actionsFiltros" />
                <card-table v-if="active == 4" :active="active" title="Filtros" :search="searchFiltros"
                    :fields="fieldsFiltros" :items="dataFiltros" :grid="grid" :actions="actionsFiltros" />
                <card-table v-if="active == 5" :active="active" title="Filtros" :search="searchFiltros"
                    :fields="fieldsFiltros" :items="dataFiltros" :grid="grid" :actions="actionsFiltros" />
                <card-table v-if="active == 6" :active="active" title="Filtros" :search="searchFiltros"
                    :fields="fieldsFiltros" :items="dataFiltros" :grid="grid" :actions="actionsFiltros" />

            </div>

        </div>

        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

        <ModalAgregarFIltro :show="modalAgregarFiltros.show" :close="() => modalAgregarFiltros.show = false"
            :update="() => searchFiltros(grid.currentPage, grid.perPage, active == 1 ? null : this.Niveles?.[`ID${Number(active) - 1}`])"
            :active="active" :data="dataFilter" :niveles="Niveles" />

        <ModalEditarFiltro :show="modalEditarFiltros.show" :close="() => modalEditarFiltros.show = false"
            :update="() => searchFiltros(grid.currentPage, grid.perPage, active == 1 ? null : this.Niveles?.[`ID${Number(active) - 1}`])"
            :active="active" :data="modalEditarFiltros.data" :niveles="Niveles" />

        <ModalAgregarMagistrado :show="modalAgregarMagistrados.show" :close="() => modalAgregarMagistrados.show = false"
            :update="() => searchMagistrados(grid.currentPage, grid.perPage)" />

        <ModalEditarMagistrado :show="modalEditarMagistrados.show" :close="() => modalEditarMagistrados.show = false"
            :update="() => searchMagistrados(grid.currentPage, grid.perPage)" :data="modalEditarMagistrados.data" />

        <ModalEliminar :message="'¿Está seguro de cambiar el estado de este registro?'" :buttonOk="'Si, cambiar'"
            :action="deleteRowMagistrados" :openDelete="modalEliminarMagistrados.show"
            :closeHandler="() => modalEliminarMagistrados.show = false" />

        <ModalEliminar :message="'¿Está seguro de cambiar el estado de este registro?'" :buttonOk="'Si, cambiar'"
            :action="deleteRowFiltros" :openDelete="modalEliminarFiltros.show"
            :closeHandler="() => modalEliminarFiltros.show = false" />
    </section>
</template>

<script>
import CardTable from "@/components/Cards/CardTable.vue";
import { BFormSelect } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';
import searchIcon from "@/assets/img/icons/search.svg";

// MODALES
import ModalEliminar from "./Modales/ModalEliminar.vue";
import ModalAgregarMagistrado from "./ModalesFiltros/ModalAgregarMagistrado.vue";
import ModalEditarMagistrado from "./ModalesFiltros/ModalEditarMagistrado.vue";
import ModalAgregarFIltro from "./ModalesFiltros/ModalAgregarFIltro.vue";
import ModalEditarFiltro from "./ModalesFiltros/ModalEditarFiltro.vue";

// PROXIES
import MagistradoProxy from "../../proxies/Magistrados.Proxy";
import FilterProxy from '../../proxies/FilterProxy';

export default {
    components: {
        CardTable,
        BFormSelect,

        // MODALES
        ModalEliminar,

        ModalAgregarMagistrado,
        ModalEditarMagistrado,

        ModalAgregarFIltro,
        ModalEditarFiltro
    },
    data() {
        return {
            searchIcon,
            currentPage: 10,
            dataMagistrados: [],
            dataFiltros: [],
            active: "0",

            grid: {
                items: [],
                currentPage: 1,
                perPage: 10,
                totalRows: 120,
                isLoading: true,
                pageOptions: [5, 10, 15, 50],
            },
            fieldsMagistrados: [
                {
                    key: "RN",
                    label: "",
                },
                {
                    key: "NOMBRES_C",
                    label: "Nombres y Apellidos"
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
            actionsMagistrados: {
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

            fieldsFiltros: [
                {
                    key: "RN",
                    label: "",
                },
                {
                    key: "VALUE",
                    label: "",
                    class: "d-none"
                },
                {
                    key: "LABEL",
                    label: "Descripción",
                    width: "30%"
                },
                {
                    key: "TIPO",
                    label: "Tipo",
                    class: "text-left"
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
            actionsFiltros: {
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
                view: {
                    label: "Ver",
                    icon: "fas fa-eye",
                    class: "btn-view",
                    action: null,
                },
            },

            isLoading: false,

            // OPENINGS MODALES
            modalAgregarMagistrados: {
                show: false,
                data: null,
            },
            modalEditarMagistrados: {
                show: false,
                data: null,
            },
            modalEliminarMagistrados: {
                show: false,
                data: null,
            },


            modalAgregarFiltros: {
                show: false,
                data: null,
            },
            modalEditarFiltros: {
                show: false,
                data: null,
            },
            modalEliminarFiltros: {
                show: false,
                data: null,
            },

            // SELECTS
            filter: {
                NOMBRES: null,
                CDESTDO: null,
                OPTION: '1',
            },
            Niveles: {
                ID1: null,
                ID2: null,
                ID3: null,
                ID4: null,
                ID5: null,
                ID6: null,
            },
            title: {
                ID2: null,
                ID3: null,
                ID4: null,
                ID5: null,
                ID6: null,
            },
            dataFilter: {},
            IDFILTER: null,
        };
    },
    methods: {
        async searchMagistrados(currentPage, perPage) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;

            this.grid.isLoading = true;
            await MagistradoProxy.list({
                ROWS: rows,
                INIT: init,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
            }, this.active)
                .then((dataresponse) => {
                    this.dataMagistrados = dataresponse
                    this.grid.totalRows = dataresponse[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.data = [];
                    toast.error(error?.MESSAGE || 'Error al cargar los magistrados', { toastId: 'error-magistrados' });
                })
                .finally(() => this.grid.isLoading = false);
        },
        async searchFiltros(currentPage, perPage, ID = null) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;
            ID = this.IDFILTER || ID;


            this.grid.isLoading = true;
            await FilterProxy.list({
                ROWS: rows,
                INIT: init,
                NIVEL: Number(this.active) == 5 ? 6 : Number(this.active) == 6 ? 7 : Number(this.active),
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
                ID: ID || null,
            }, this.filter.OPTION, 2)
                .then((dataresponse) => {
                    this.dataFiltros = dataresponse
                    this.grid.totalRows = dataresponse[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.data = [];
                    toast.error(error?.MESSAGE || 'Error al cargar los filtros', { toastId: 'error-filtros' });
                })
                .finally(() => this.grid.isLoading = false);
        },
        updateActive(text) {
            this.active = text;
            this.selectedFilter = {
                NOMBRES: null,
                CDESTDO: null,
                OPTION: null,
            };
            this.grid = {
                ...this.grid,
                perPage: 10,
                currentPage: 1,
                loading: false,
            };

            if (text == '0') this.searchMagistrados(this.grid.currentPage, this.grid.perPage);
            else {
                this.searchFiltros(this.grid.currentPage, this.grid.perPage);
                if (text == "1") {
                    this.Niveles = {
                        ID1: null,
                        ID2: null,
                        ID3: null,
                        ID4: null,
                        ID5: null,
                        ID6: null,
                    }
                }
            }
        },

        // ACTIONS ... 
        async editMagistrados(data) {
            if (!data.ID) return toast.warning('No se encontró el identificador del magistrado', { toastId: 'warning-edit' });
            this.modalEditarMagistrados.data = data;
            this.modalEditarMagistrados.show = true;
        },
        async deleteRowMagistrados() {
            if (!this.modalEliminarMagistrados.data.ID) return toast.warning('No se encontró el identificador del magistrado', { toastId: 'warning-delete' });

            this.isLoading = true;
            await MagistradoProxy.delete(this.modalEliminarMagistrados.data.ID)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al eliminar al magistrado';

                    if (response.STATUS) {
                        toast.success('Magistrado eliminado correctamente', { toastId: 'success-delete' });
                        this.searchMagistrados(this.grid.currentPage, this.grid.perPage);
                        this.modalEliminarMagistrados.show = false;

                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar al magistrado', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
        async editFiltros(data) {
            if (!data.VALUE) return toast.warning('No se encontró el identificador del filtro', { toastId: 'warning-edit' });
            this.modalEditarFiltros.data = data;
            this.modalEditarFiltros.show = true;
        },
        async deleteRowFiltros() {
            if (!this.modalEliminarFiltros.data.VALUE) return toast.warning('No se encontró el identificador del filtro', { toastId: 'warning-delete' });

            this.isLoading = true;
            await FilterProxy.delete(this.modalEliminarFiltros.data.VALUE)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al eliminar el filtro';

                    if (response.STATUS) {
                        toast.success('Filtro eliminado correctamente', { toastId: 'success-delete' });
                        this.searchFiltros(this.grid.currentPage, this.grid.perPage, this.active == 1 ? null : this.Niveles?.[`ID${Number(this.active) - 1}`]);
                        this.modalEliminarFiltros.show = false;

                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar al filtro', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
        async viewFiltros(data) {
            this.dataFilter = data;
            if (this.active == 6) return;
            this.filter = {
                NOMBRES: null,
                CDESTDO: null,
                OPTION: '1',
            }
            this.Niveles = { ...this.Niveles, [`ID${Number(this.active)}`]: data?.VALUE || null }
            this.active = Number(this.active) + 1
            this.title = { ...this.title, [`ID${Number(this.active)}`]: data?.LABEL || "" }
            this.IDFILTER = data?.VALUE || null;
            // this.searchFiltros(this.grid.currentPage, this.grid.perPage, data.VALUE);
        },
    },
    mounted() {
        this.actionsMagistrados = {
            ...this.actionsMagistrados,
            edit: {
                ...this.actionsMagistrados.edit,
                action: (data) => this.editMagistrados(data),
            },
            delete: {
                ...this.actionsMagistrados.delete,
                action: (data) => {
                    this.modalEliminarMagistrados.show = true;
                    this.modalEliminarMagistrados.data = data;
                }
            },
        }

        this.actionsFiltros = {
            ...this.actionsFiltros,
            edit: {
                ...this.actionsFiltros.edit,
                action: (data) => this.editFiltros(data),
            },
            delete: {
                ...this.actionsFiltros.delete,
                action: (data) => {
                    this.modalEliminarFiltros.show = true;
                    this.modalEliminarFiltros.data = data;
                }
            },
            view: {
                ...this.actionsFiltros.view,
                action: (data) => this.viewFiltros(data),
            },
        }


    },
    // cuando cambie active
    watch: {
        active: function (newVal) {
            this.grid = {
                ...this.grid,
                perPage: 10,
                currentPage: 1,
                loading: false,
            };

            if (newVal == 0) {
                this.searchMagistrados(this.grid.currentPage, this.grid.perPage);
            }

            if (newVal > 0) {
                // this.dataFilter = {};
                // this.searchFiltros(this.grid.currentPage, this.grid.perPage);
            }
        }
    }
};
</script>

<style>
.no-click {
    pointer-events: none !important;
    cursor: not-allowed !important;
}

/* // button itnernos que su arias-controls no sea 0 o 1 aria-controls */
.tabs-pointer button[aria-controls="2"],
.tabs-pointer button[aria-controls="3"],
.tabs-pointer button[aria-controls="4"],
.tabs-pointer button[aria-controls="5"],
.tabs-pointer button[aria-controls="6"] {
    pointer-events: none !important;
    cursor: no-drop !important;
    color: #ccc !important;
}

.container-table {
    max-width: 90%;
    margin: 0 auto;
}
</style>