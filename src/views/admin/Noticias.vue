<template>
    <section class="bg-landing mt-4 pt-5">
        <div class="container-table flex flex-col mt-4 pt-5">
            <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
                <a class="cursor-pointer" :class="active === 'noticias' ? 'active-tab' : ''"
                    @click="updateActive('noticias')">
                    Noticias
                </a>
                <a class="cursor-pointer" :class="active === 'autores' ? 'active-tab' : ''"
                    @click="updateActive('autores')">
                    Autores
                </a>
                <a class="cursor-pointer" :class="active === 'categorias' ? 'active-tab' : ''"
                    @click="updateActive('categorias')">
                    Categorías
                </a>
            </div>
            <div class="row">
                <div class="col-md-9 col-12 mb-3 input-search">
                    <img :src="searchIcon" alt="search" class="icon-search" />

                    <input type="text" class="form-control"
                        :placeholder="`Buscar por ${active === 'noticias' ? 'noticia' : active === 'autores' ? 'autor' : 'categoría'}`"
                        v-model="filter.NOMBRES" id="name" />
                </div>

                <div class="col-md-3 col-12 mb-3">
                    <b-form-select v-model="filter.CDESTDO" :options="[
                        { text: '-- Seleccione Estado ', value: null },
                        { text: 'Activo', value: 'A' },
                        { text: 'Inactivo', value: 'I' }]">
                    </b-form-select>
                </div>

                <div class="col-md-12 col-12 mb-3 btn-actions-view">
                    <button class="bton btn-search" @click="() => {
                        if (active === 'noticias') searchNoticias(grid.currentPage, grid.perPage);
                        if (active === 'autores') searchAutores(grid.currentPage, grid.perPage);
                        if (active === 'categorias') searchCategorias(grid.currentPage, grid.perPage);
                    }
                    ">
                        Buscar
                    </button>
                    <button class="bton btn-create" @click="() => {
                        if (active === 'noticias') modalAgregarNoticia.show = true;
                        if (active === 'autores') modalAgregarAutor.show = true;
                        if (active === 'categorias') modalAgregarCategoria.show = true;
                    }">Crear</button>
                </div>
            </div>

            <div class="w-full mb-12">
                <card-table v-if="active == 'noticias'" :active="active" title="" :search="searchNoticias"
                    :fields="fieldsNoticias" :items="dataNoticia" :grid="grid" :actions="actionsNoticias" />
                <card-table v-if="active == 'autores'" :active="active" title="" :search="searchAutores"
                    :fields="fieldsAutores" :items="dataAutores" :grid="grid" :actions="actionsAutores" />
                <card-table v-if="active == 'categorias'" :active="active" title="" :search="searchCategorias"
                    :fields="fieldsCategorias" :items="dataCategorias" :grid="grid" :actions="actionsCategorias" />
            </div>

            <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

            <!-- NOTICIAS -->
            <ModalNoticiaAgregar :role="role" :show="modalAgregarNoticia.show"
                :close="() => modalAgregarNoticia.show = false" :selects="selects"
                :update="() => searchNoticias(grid.currentPage, grid.perPage)" />

            <ModalNoticiaEditar :role="role" :show="modalEditarNoticia.show"
                :close="() => modalEditarNoticia.show = false" :selects="selects"
                :update="() => searchNoticias(grid.currentPage, grid.perPage)" :data="modalEditarNoticia.data" />

            <ModalEliminar :message="'¿Está cambiar el estado de la noticia?'" :buttonOk="'Si, Cambiar'"
                :action="deleteRowNoticia" :openDelete="modalEliminarNoticia.show"
                :closeHandler="() => modalEliminarNoticia.show = false" />

            <!-- PREGUNTAS -->
            <ModalAutorAgregar :role="role" :show="modalAgregarAutor.show" :close="() => modalAgregarAutor.show = false"
                :update="() => searchAutores(grid.currentPage, grid.perPage)" />

            <ModalAutorEditar :role="role" :show="modalEditarAutor.show" :close="() => modalEditarAutor.show = false"
                :update="() => searchAutores(grid.currentPage, grid.perPage)" :data="modalEditarAutor.data" />

            <ModalEliminar :message="'¿Está cambiar el estado de la pregunta?'" :buttonOk="'Si, Cambiar'"
                :action="deleteAutor" :openDelete="modalEliminarAutor.show"
                :closeHandler="() => modalEliminarAutor.show = false" />

            <!-- CATEGORIAS -->
            <ModalCategoriaAgregar :role="role" :show="modalAgregarCategoria.show"
                :close="() => modalAgregarCategoria.show = false"
                :update="() => searchCategorias(grid.currentPage, grid.perPage)" />

            <ModalCategoriaEditar :role="role" :show="modalEditarCategoria.show"
                :close="() => modalEditarCategoria.show = false"
                :update="() => searchCategorias(grid.currentPage, grid.perPage)" :data="modalEditarCategoria.data" />

            <ModalEliminar :message="'¿Está seguro de cambiar el estado del registro?'" :buttonOk="'Si, Cambiar'"
                :action="deleteCategoria" :openDelete="modalEliminarCategoria.show"
                :closeHandler="() => modalEliminarCategoria.show = false" />
        </div>
    </section>
</template>


<script>
import CardTable from "@/components/Cards/CardTable.vue";
import { BFormSelect } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';
import searchIcon from "@/assets/img/icons/search.svg";

// MODALES
import ModalEliminar from "./Modales/ModalEliminar.vue";
import ModalNoticiaAgregar from "./ModalesMantenimiento/ModalNoticiaAgregar.vue";
import ModalNoticiaEditar from "./ModalesMantenimiento/ModalNoticiaEditar.vue";

import ModalCategoriaAgregar from "./ModalesMantenimiento/ModalCategoriaAgregar.vue";
import ModalCategoriaEditar from "./ModalesMantenimiento/ModalCategoriaEditar.vue";

import ModalAutorAgregar from "./ModalesMantenimiento/ModalAutorAgregar.vue";
import ModalAutorEditar from "./ModalesMantenimiento/ModalAutorEditar.vue";

// PROXIES
import MantenimientoProxy from '../../proxies/MantenimientoProxy';

export default {
    components: {
        CardTable,
        BFormSelect,

        // MODALES
        ModalEliminar,
        ModalNoticiaAgregar,
        ModalNoticiaEditar,

        ModalCategoriaAgregar,
        ModalCategoriaEditar,

        ModalAutorAgregar,
        ModalAutorEditar,
    },
    data() {
        return {
            searchIcon,
            currentPage: 10,
            dataNoticia: [],
            dataAutores: [],
            dataCategorias: [],
            grid: {
                items: [],
                currentPage: 1,
                perPage: 10,
                totalRows: 120,
                isLoading: true,
                pageOptions: [5, 10, 15, 50],
            },
            fieldsNoticias: [
                { key: "RN", label: "" },
                { key: "TITULO", label: "Título", width: "30%" },
                { key: "DESCRIPCION", label: "Descripción", width: "30%" },
                {
                    key: "FCRCN",
                    label: "Fecha de Creación",
                    sortable: true,
                },
                {
                    key: "CDESTDO",
                    label: "Estado",
                    sortable: true,
                    class: "text-center w-130",
                },
                { key: "ACCIONES", label: "Acciones", class: "text-center" },
            ],
            fieldsAutores: [
                { key: "RN", label: "" },
                {
                    key: "AUTOR", label: "Nombres y Apellidos", width: "50%",
                    formatter: (value, key, item) => {
                        return `
                            <div class="d-flex align-items-center" style="gap: 1rem; max-width: 400px;">
                                <div style="flex-shrink: 0;">
                                    <img 
                                        src="https://jurissearch.com${item.RUTA}" 
                                        onerror="this.onerror=null; this.src='https://placehold.co/50x50" 
                                        alt="Foto del autor" 
                                        class="rounded-circle border"
                                        style="width: 50px; height: 50px; object-fit: cover;"
                                    />
                                </div>
                                <div>
                                    <h6 class="mb-1 text-dark">${item.NOMBRES} ${item.APELLIDOS}</h6>
                                </div>
                            </div>
                        `;
                    }
                },
                {
                    key: "FCRCN",
                    label: "Fecha de Creación",
                    sortable: true,
                },
                {
                    key: "CDESTDO",
                    label: "Estado",
                    sortable: true,
                    class: "text-center w-130",
                },
                { key: "ACCIONES", label: "Acciones", class: "text-center" },
            ],
            fieldsCategorias: [
                { key: "RN", label: "" },
                { key: "DESCP", label: "Descripción", width: "30%" },
                { key: "DETALLE", label: "Detalle", width: "40%" },
                {
                    key: "FCRCN",
                    label: "Fecha de Creación",
                    sortable: true,
                },
                {
                    key: "CDESTDO",
                    label: "Estado",
                    sortable: true,
                    class: "text-center w-130",
                },
                { key: "ACCIONES", label: "Acciones", class: "text-center" },
            ],
            actionsNoticias: {
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
            actionsAutores: {
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
            actionsCategorias: {
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

            // OPENINGS MODALES
            modalAgregarNoticia: {
                show: false,
                data: null,
            },
            modalEditarNoticia: {
                show: false,
                data: null,
            },

            modalAgregarAutor: {
                show: false,
                data: null,
            },
            modalEditarAutor: {
                show: false,
                data: null,
            },

            modalAgregarCategoria: {
                show: false,
                data: null,
            },
            modalEditarCategoria: {
                show: false,
                data: null,
            },

            modalEliminarNoticia: {
                show: false,
                data: null,
            },
            modalEliminarAutor: {
                show: false,
                data: null,
            },
            modalEliminarCategoria: {
                show: false,
                data: null,
            },

            // SELECTS
            filter: {
                NOMBRES: null,
                CDESTDO: null,
            },

            isLoading: false,
            active: "noticias",
            selects: {
                categorias: [],
                autores: [],
                planes: [],
            },
        };
    },
    props: {
        role: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        async searchNoticias(currentPage, perPage) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;

            this.grid.isLoading = true;
            await MantenimientoProxy.list({
                ROWS: rows,
                INIT: init,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
            }, this.active)
                .then((response) => {
                    this.dataNoticia = response || [];
                    this.grid.totalRows = response[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.dataNoticia = [];
                    toast.error(error?.MESSAGE || 'Error al cargar las noticias', { toastId: 'error-noticias' });
                })
                .finally(() => this.grid.isLoading = false);
        },
        async searchAutores(currentPage, perPage) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;

            this.grid.isLoading = true;
            await MantenimientoProxy.listAutores({
                ROWS: rows,
                INIT: init,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
            }, this.active)
                .then((response) => {
                    this.dataAutores = response || [];
                    this.grid.totalRows = response[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.dataAutores = [];
                    toast.error(error?.MESSAGE || 'Error al cargar las preguntas', { toastId: 'error-preguntas' });
                })
                .finally(() => this.grid.isLoading = false);
        },
        async searchCategorias(currentPage, perPage) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;

            this.grid.isLoading = true;
            await MantenimientoProxy.listCategorias({
                ROWS: rows,
                INIT: init,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
            }, this.active)
                .then((response) => {
                    this.dataCategorias = response || [];
                    this.grid.totalRows = response[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.dataCategorias = [];
                    toast.error(error?.MESSAGE || 'Error al cargar los planes', { toastId: 'error-planes' });
                })
                .finally(() => this.grid.isLoading = false);
        },
        async editNoticia(data) {
            if (!data.ID) return toast.warning('No se encontró el identificador de la noticia', { toastId: 'warning-edit' });
            this.modalEditarNoticia.data = data;
            this.modalEditarNoticia.show = true;
        },
        async editAutor(data) {
            if (!data.ID) return toast.warning('No se encontró el identificador de la pregunta', { toastId: 'warning-edit' });
            this.modalEditarAutor.data = data;
            this.modalEditarAutor.show = true;
        },
        async editCategoria(data) {
            if (!data.ID) return toast.warning('No se encontró el identificador de la categoria', { toastId: 'warning-edit' });
            this.modalEditarCategoria.data = data;
            this.modalEditarCategoria.show = true;
        },

        async selectAllPromises() {
            try {
                const [categorias, autores] = await Promise.all([
                    MantenimientoProxy.listCategorias({ CESTDO: '', ROWS: 1000, INIT: 0 }),
                    MantenimientoProxy.listAutores({ CESTDO: '', ROWS: 1000, INIT: 0 })
                ]);
                this.selects.categorias = categorias?.map(item => { return { value: item.ID, label: item?.DESCP } }) || [];
                this.selects.autores = autores?.map(item => { return { value: item.ID, label: (item?.NOMBRES || '') + ' ' + (item?.APELLIDOS || '') } }) || [];
            } catch (error) {
                toast.error(error?.MESSAGE || 'Error al cargar los selects', { toastId: 'error-selects' });
            }
        },

        async deleteRowNoticia() {
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            if (!this.modalEliminarNoticia.data.ID) return toast.warning('No se encontró el identificador de la noticia', { toastId: 'warning-delete' });

            this.isLoading = true;
            await MantenimientoProxy.delete(this.modalEliminarNoticia.data.ID)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al cambiar el estado de la noticia';

                    if (response.STATUS) {
                        toast.success('Registro cambiado de estado correctamente', { toastId: 'success-delete' });
                        this.searchNoticias(this.grid.currentPage, this.grid.perPage);
                        this.modalEliminarNoticia.show = false;

                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al cambiar el estado del registro', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
        async deleteAutor() {
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            if (!this.modalEliminarAutor.data.ID) return toast.warning('No se encontró el identificador de la pregunta', { toastId: 'warning-delete' });

            this.isLoading = true;
            await MantenimientoProxy.deleteAutor(this.modalEliminarAutor.data.ID)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al cambiar el estado del registro';

                    if (response.STATUS) {
                        toast.success('Registro cambiado de estado correctamente', { toastId: 'success-delete' });
                        this.searchAutores(this.grid.currentPage, this.grid.perPage);
                        this.modalEliminarAutor.show = false;

                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al cambiar el estado del registro', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
        async deleteCategoria() {
            if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            if (!this.modalEliminarCategoria.data.ID) return toast.warning('No se encontró el identificador de la categoria', { toastId: 'warning-delete' });

            this.isLoading = true;
            await MantenimientoProxy.deleteCategoria(this.modalEliminarCategoria.data.ID)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al cambiar el estado del registro';

                    if (response.STATUS) {
                        toast.success('Registro cambiado de estado correctamente', { toastId: 'success-delete' });
                        this.searchCategorias(this.grid.currentPage, this.grid.perPage);
                        this.modalEliminarCategoria.show = false;
                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al cambiar el estado del registro', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
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

            if (text == 'noticias') this.searchNoticias(this.grid.currentPage, this.grid.perPage);
            if (text == 'autores') this.searchAutores(this.grid.currentPage, this.grid.perPage);
            if (text == 'categorias') this.searchCategorias(this.grid.currentPage, this.grid.perPage);
        },
    },
    mounted() {
        this.selectAllPromises();
        this.actionsNoticias = {
            ...this.actionsNoticias,
            edit: {
                ...this.actionsNoticias.edit,
                action: (data) => this.editNoticia(data),
            },
            delete: {
                ...this.actionsNoticias.delete,
                action: (data) => {
                    this.modalEliminarNoticia.show = true;
                    this.modalEliminarNoticia.data = data;
                }
            },
        }

        this.actionsAutores = {
            ...this.actionsAutores,
            edit: {
                ...this.actionsAutores.edit,
                action: (data) => this.editAutor(data),
            },
            delete: {
                ...this.actionsAutores.delete,
                action: (data) => {
                    this.modalEliminarAutor.show = true;
                    this.modalEliminarAutor.data = data;
                }
            },
        }

        this.actionsCategorias = {
            ...this.actionsCategorias,
            edit: {
                ...this.actionsCategorias.edit,
                action: (data) => this.editCategoria(data),
            },
            delete: {
                ...this.actionsCategorias.delete,
                action: (data) => {
                    this.modalEliminarCategoria.show = true;
                    this.modalEliminarCategoria.data = data;
                }
            },
        }
    },
    watch: {
        active(newValue) {
            if (newValue == 'noticias') this.selectAllPromises();
        },
    },
};
</script>

<style scoped>
.container-table {
    max-width: 90%;
    margin: 0 auto;
}
</style>