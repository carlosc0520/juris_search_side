<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12">
            <div class="w-full mb-12">
                <b-tabs>
                    <b-tab title="Noticias" @click="updateActive('noticias')">
                    </b-tab>
                    <b-tab title="Preguntas" @click="updateActive('preguntas')">
                    </b-tab>
                    <b-tab title="Planes" @click="updateActive('planes')">
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
                                <button class="bton btn-search" @click="() => {
                                    if (active === 'noticias') searchNoticia(grid.currentPage, grid.perPage);
                                    if (active === 'preguntas') searchPregunta(grid.currentPage, grid.perPage);
                                    if (active === 'planes') searchPlanes(grid.currentPage, grid.perPage);
                                }">Buscar</button>
                                <button class="bton btn-create" @click="() => {
                                    if (active === 'noticias') modalAgregarNoticia.show = true;
                                    if (active === 'preguntas') modalAgregarPregunta.show = true;
                                    if (active === 'planes') modalAgregarPlanes.show = true;
                                }">Crear</button>

                            </div>
                        </div>

                    </div>

                    <card-table v-if="active === 'noticias'" :active="active" title="Usuarios" :search="searchNoticia"
                        :fields="fieldsNoticias" :items="dataNoticia" :grid="grid" :actions="actionsNoticias" />

                    <card-table v-if="active === 'preguntas'" :active="active" title="Preguntas"
                        :search="searchPregunta" :fields="fieldsPreguntas" :items="dataPregunta" :grid="grid"
                        :actions="actionsPreguntas" />

                    <card-table v-if="active === 'planes'" :active="active" title="Planes" :search="searchPlanes"
                        :fields="fieldsPlanes" :items="dataPlanes" :grid="grid" :actions="actionsPlanes" />

                </div>

            </div>
        </div>

        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

        <!-- NOTICIAS -->
        <ModalNoticiaAgregar :role="role" :show="modalAgregarNoticia.show" :close="() => modalAgregarNoticia.show = false"
            :update="() => searchNoticia(grid.currentPage, grid.perPage)" />

        <ModalNoticiaEditar :role="role" :show="modalEditarNoticia.show" :close="() => modalEditarNoticia.show = false"
            :update="() => searchNoticia(grid.currentPage, grid.perPage)" :data="modalEditarNoticia.data" />

        <ModalEliminar :message="'¿Está cambiar el estado de la noticia?'" :buttonOk="'Si, eliminar'"
            :action="deleteRowNoticia" :openDelete="modalEliminarNoticia.show"
            :closeHandler="() => modalEliminarNoticia.show = false" />


        <!-- PREGUNTAS -->
        <ModalPreguntaAgregar :role="role" :show="modalAgregarPregunta.show" :close="() => modalAgregarPregunta.show = false"
            :update="() => searchPregunta(grid.currentPage, grid.perPage)" />

        <ModalPreguntaEditar :role="role" :show="modalEditarPregunta.show" :close="() => modalEditarPregunta.show = false"
            :update="() => searchPregunta(grid.currentPage, grid.perPage)" :data="modalEditarPregunta.data" />

        <ModalEliminar :message="'¿Está cambiar el estado de la pregunta?'" :buttonOk="'Si, eliminar'"
            :action="deleteRowPregunta" :openDelete="modalEliminarPregunta.show"
            :closeHandler="() => modalEliminarPregunta.show = false" />


        <!-- PLANES -->
        <ModalPlanAgregar :role="role" :show="modalAgregarPlanes.show" :close="() => modalAgregarPlanes.show = false"
            :update="() => searchPlanes(grid.currentPage, grid.perPage)" />

        <ModalPlanEditar :role="role" :show="modalEditarPlanes.show" :close="() => modalEditarPlanes.show = false"
            :update="() => searchPlanes(grid.currentPage, grid.perPage)" :data="modalEditarPlanes.data" />

        <ModalEliminar :message="'¿Está cambiar el estado del plan?'" :buttonOk="'Si, eliminar'"
            :action="deleteRowPlanes" :openDelete="modalEliminarPlanes.show"
            :closeHandler="() => modalEliminarPlanes.show = false" />

    </div>
</template>


<script>
import CardTable from "@/components/Cards/CardTable.vue";
import { BTabs, BTab, BFormSelect } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';


// MODALES
import ModalEliminar from "./Modales/ModalEliminar.vue";
import ModalNoticiaAgregar from "./ModalesMantenimiento/ModalNoticiaAgregar.vue";
import ModalNoticiaEditar from "./ModalesMantenimiento/ModalNoticiaEditar.vue";
import ModalPreguntaAgregar from "./ModalesMantenimiento/ModalPreguntaAgregar.vue";
import ModalPreguntaEditar from "./ModalesMantenimiento/ModalPreguntaEditar.vue";
import ModalPlanAgregar from "./ModalesMantenimiento/ModalPlanAgregar.vue";
import ModalPlanEditar from "./ModalesMantenimiento/ModalPlanEditar.vue";

// PROXIES
import MantenimientoProxy from '../../proxies/MantenimientoProxy';

export default {
    components: {
        CardTable,
        BTabs,
        BTab,
        BFormSelect,

        // MODALES
        ModalEliminar,
        ModalNoticiaAgregar,
        ModalNoticiaEditar,

        ModalPreguntaAgregar,
        ModalPreguntaEditar,

        ModalPlanAgregar,
        ModalPlanEditar
    },
    data() {
        return {
            currentPage: 10,
            dataNoticia: [],
            dataPregunta: [],
            dataPlanes: [],
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
            fieldsPreguntas: [
                { key: "RN", label: "" },
                { key: "DESCRIPCION", label: "Descripción", width: "50%" },
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
            fieldsPlanes: [
                { key: "RN", label: "" },
                { key: "DESCRIPCION", label: "Descripción", width: "30%" },
                {
                    key: "TIEMPO", label: "Duración", width: "20%", class: "text-center",
                    formatter: (value) => {
                        return value ? `${value} días` : '0 días';
                    }
                },
                {
                    key: "PRECIO", label: "Precio", width: "20%", class: "text-center",
                    formatter: (value) => {
                        return value ? `S/. ${value}` : 'S/. 0.00';
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
            actionsPreguntas: {
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
            actionsPlanes: {
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

            modalAgregarPregunta: {
                show: false,
                data: null,
            },
            modalEditarPregunta: {
                show: false,
                data: null,
            },

            modalAgregarPlanes: {
                show: false,
                data: null,
            },
            modalEditarPlanes: {
                show: false,
                data: null,
            },

            modalEliminarNoticia: {
                show: false,
                data: null,
            },
            modalEliminarPregunta: {
                show: false,
                data: null,
            },
            modalEliminarPlanes: {
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
            },
            isLoading: false,
            // TABS
            active: "noticias",
        };
    },
    props: {
        role: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        async searchNoticia(currentPage, perPage) {
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
        async searchPregunta(currentPage, perPage) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;

            this.grid.isLoading = true;
            await MantenimientoProxy.listPreguntas({
                ROWS: rows,
                INIT: init,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
            }, this.active)
                .then((response) => {
                    this.dataPregunta = response || [];
                    this.grid.totalRows = response[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.dataPregunta = [];
                    toast.error(error?.MESSAGE || 'Error al cargar las preguntas', { toastId: 'error-preguntas' });
                })
                .finally(() => this.grid.isLoading = false);
        },
        async searchPlanes(currentPage, perPage) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;

            this.grid.isLoading = true;
            await MantenimientoProxy.listPlanes({
                ROWS: rows,
                INIT: init,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
            }, this.active)
                .then((response) => {
                    this.dataPlanes = response || [];
                    this.grid.totalRows = response[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.dataPlanes = [];
                    toast.error(error?.MESSAGE || 'Error al cargar los planes', { toastId: 'error-planes' });
                })
                .finally(() => this.grid.isLoading = false);
        },
        async editNoticia(data) {
            if (!data.ID) return toast.warning('No se encontró el identificador de la noticia', { toastId: 'warning-edit' });
            this.modalEditarNoticia.data = data;
            this.modalEditarNoticia.show = true;
        },
        async editPregunta(data) {
            if (!data.ID) return toast.warning('No se encontró el identificador de la pregunta', { toastId: 'warning-edit' });
            this.modalEditarPregunta.data = data;
            this.modalEditarPregunta.show = true;
        },
        async editPlanes(data) {
            if (!data.ID) return toast.warning('No se encontró el identificador del plan', { toastId: 'warning-edit' });
            this.modalEditarPlanes.data = data;
            this.modalEditarPlanes.show = true;
        },

        async deleteRowNoticia() {
            if(this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            if (!this.modalEliminarNoticia.data.ID) return toast.warning('No se encontró el identificador de la noticia', { toastId: 'warning-delete' });

            this.isLoading = true;
            await MantenimientoProxy.delete(this.modalEliminarNoticia.data.ID)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al eliminar la noticia';

                    if (response.STATUS) {
                        toast.success('Noticia eliminada correctamente', { toastId: 'success-delete' });
                        this.searchNoticia(this.grid.currentPage, this.grid.perPage);
                        this.modalEliminarNoticia.show = false;

                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar la noticia', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
        async deleteRowPregunta() {
            if(this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            if (!this.modalEliminarPregunta.data.ID) return toast.warning('No se encontró el identificador de la pregunta', { toastId: 'warning-delete' });

            this.isLoading = true;
            await MantenimientoProxy.deletePregunta(this.modalEliminarPregunta.data.ID)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al eliminar la pregunta';

                    if (response.STATUS) {
                        toast.success('Pregunta eliminada correctamente', { toastId: 'success-delete' });
                        this.searchPregunta(this.grid.currentPage, this.grid.perPage);
                        this.modalEliminarPregunta.show = false;

                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar la pregunta', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
        async deleteRowPlanes() {
            if(this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

            if (!this.modalEliminarPlanes.data.ID) return toast.warning('No se encontró el identificador del plan', { toastId: 'warning-delete' });

            this.isLoading = true;
            await MantenimientoProxy.deletePlan(this.modalEliminarPlanes.data.ID)
                .then((response) => {
                    const toastMessage = response?.MESSAGE || 'Ocurrió un error al eliminar el plan';

                    if (response.STATUS) {
                        toast.success('Plan eliminado correctamente', { toastId: 'success-delete' });
                        this.searchPlanes(this.grid.currentPage, this.grid.perPage);
                        this.modalEliminarPlanes.show = false;

                    } else toast.error(toastMessage, { toastId: 'error-delete' });
                })
                .catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar el plan', { toastId: 'error-delete' }))
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

            if (text == 'noticias') this.searchNoticia(this.grid.currentPage, this.grid.perPage);
            if (text == 'preguntas') this.searchPregunta(this.grid.currentPage, this.grid.perPage);
            if (text == 'planes') this.searchPlanes(this.grid.currentPage, this.grid.perPage);
        },
    },
    mounted() {
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

        this.actionsPreguntas = {
            ...this.actionsPreguntas,
            edit: {
                ...this.actionsPreguntas.edit,
                action: (data) => this.editPregunta(data),
            },
            delete: {
                ...this.actionsPreguntas.delete,
                action: (data) => {
                    this.modalEliminarPregunta.show = true;
                    this.modalEliminarPregunta.data = data;
                }
            },
        }

        this.actionsPlanes = {
            ...this.actionsPlanes,
            edit: {
                ...this.actionsPlanes.edit,
                action: (data) => this.editPlanes(data),
            },
            delete: {
                ...this.actionsPlanes.delete,
                action: (data) => {
                    this.modalEliminarPlanes.show = true;
                    this.modalEliminarPlanes.data = data;
                }
            },
        }

    }
};
</script>