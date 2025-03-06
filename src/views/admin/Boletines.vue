<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12">
            <div class="w-full mb-12">
                <div class="bg-white p-4 shadow-lg">
                    <div class="row">
                        <div class="col-md-12 col-12 mb-3">
                            <label for="name" class="form-label">Busqueda</label>
                            <input type="text" v-model="filter.NOMBRES" id="name" class="form-control" />
                        </div>

                        <div class="col-md-12 col-12 mb-3">
                            <div class="flex justify-end gap-4">
                                <button class="bton btn-search"
                                    @click="search(grid.currentPage, grid.perPage)">Buscar</button>
                                <button class="bton btn-create" @click="modalAgregarBoletin.show = true">Crear</button>

                            </div>
                        </div>

                    </div>

                    <card-table :active="active" title="Usuarios" :search="search" :fields="fields" :items="data"
                        :grid="grid" :actions="actions" />

                </div>

            </div>
        </div>

        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

        <ModalAgregarBoletin :role="role" :show="modalAgregarBoletin.show"
            :close="() => modalAgregarBoletin.show = false" :update="() => search()" />


    </div>
</template>


<script>
import CardTable from "@/components/Cards/CardTable.vue";
import { toast } from 'vue3-toastify';

// MODALES
import ModalAgregarBoletin from "./ModalesBoletines/ModalAgregarBoletin.vue";

// // PROXIES
import boletinProxy from "../../proxies/boletinProxy.js";

export default {
    components: {
        CardTable,
        // MODALES
        ModalAgregarBoletin,
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
                    key: "TITLE",
                    label: "DESCRIPCION",
                    sortable: true
                },
                {
                    key: "IMAGEN",
                    label: "IMAGEN",
                    sortable: true,
                },
                {
                    key: "BOLETIN",
                    label: "BOLETIN",
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
            ],
            actions: {},
            isLoading: false,
            // OPENINGS MODALES
            modalAgregarBoletin: {
                show: false,
                data: null,
            },
            // SELECTS
            filter: {
                NOMBRES: null,
                CDESTDO: null,
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
        async search(currentPage, perPage) {
            const init = (currentPage - 1) * perPage;
            const rows = perPage;

            this.grid.isLoading = true;
            await boletinProxy.list({
                ROWS: rows,
                INIT: init,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: this.filter?.CDESTDO || null,
            }, this.active)
                .then((response) => {
                    this.data = response || [];
                    this.grid.totalRows = response[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.data = [];
                    toast.error(error?.MESSAGE || 'Error al cargar los boletines', { toastId: 'error-planes' });
                })
                .finally(() => this.grid.isLoading = false);
        },
    },
    watch: {
        'modalAgregarBoletin.show': {
            handler() {
            }
        }
    },
    mounted() {

    }
};
</script>