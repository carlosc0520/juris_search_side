<template>
    <div class="landing-busqueda pt-5">

        <!-- // imagen centrada -->
        <div class="img-landing-busqueda pt-5">
            <img src="@/assets/img/logos/logo-full.png" alt="Logo" class="logo-busqueda" />
        </div>


        <div class="search-container mt-3">
            <!-- Input con AutoComplete -->
            <div class="search-box">
                <AutoComplete v-model="filter.GLOBAL" :suggestions="dataComplete" @complete="searchSugges"
                    optionLabel="DESCP" class="search-input"
                    placeholder="Busca por nombre de caso, palabra clave ó selecciona los filtros" />

                <!-- Botón para limpiar -->
                <button v-if="filter.GLOBAL" @click="filter.GLOBAL = null" class="btn-clear">
                    <img src="@/assets/img/icons/close.svg" alt="Close" />
                </button>

                <!-- Separador -->
                <div class="separator"></div>

                <!-- Icono de filtro -->
                <div class="dropdown">

                    <button class="btn-filter" @click="isCollapsed = !isCollapsed">
                        <img src="@/assets/img/icons/filter.svg" alt="Filter" />
                    </button>
                    <div id="filterbar" class="dropdown-menu filterbar-overlay" v-show="!isCollapsed" ref="filterMenu">
                        <div class="border-bottom">
                            <div class="form-group text-center mb-2">
                                <div class="btn-group w-100 d-flex flex-wrap justify-content-center gap-1"
                                    data-toggle="buttons">
                                    <button @click="filter.TYPE = 'jurisprudences'"
                                        :class="filter.TYPE === 'jurisprudences' ? 'active' : ''"
                                        class="btn btn-success p-3 flex-grow-1">
                                        JURISPRUDENCIA
                                    </button>
                                    <button @click="() => {
                                        filter.TYPE = 'legislations';
                                        isFilter = 'generales'; // Resetear el filtro al cambiar de tipo
                                    }" :class="filter.TYPE === 'legislations' ? 'active' : ''"
                                        class="btn btn-success p-3 flex-grow-1">
                                        LEGISLACIÓN
                                    </button>
                                </div>
                            </div>
                            <div class="form-group text-center">
                                <div class="btn-group w-100 d-flex flex-wrap justify-content-center gap-1"
                                    data-toggle="buttons">
                                    <button @click="isFilter = 'generales'"
                                        :class="isFilter === 'generales' ? 'active' : ''"
                                        class="btn btn-success p-3 flex-grow-1">
                                        Criterios generales
                                    </button>
                                    <button @click="isFilter = 'ppjj'" v-if="filter.TYPE === 'jurisprudences'"
                                        :class="isFilter === 'ppjj' ? 'active' : ''"
                                        :disabled="filter.TYPE === 'legislations'"
                                        class="btn btn-success p-3 flex-grow-1">
                                        Compliance
                                    </button>
                                    <button @click="isFilter = 'dominio'" v-if="filter.TYPE === 'jurisprudences'"
                                        :class="isFilter === 'dominio' ? 'active' : ''"
                                        :disabled="filter.TYPE === 'legislations'"
                                        class="btn btn-success p-3 flex-grow-1">
                                        Extinción de dominio
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div v-if="isFilter === 'generales'" class="row p-3">
                            <div class="col-12 mb-3">
                                <label for="FRESOLUTION1" class="form-label">Año de resolución</label>
                                <date-picker v-model="filter.FRESOLUTION1" valueType="format" type="year"
                                    @change="filter.FRESOLUTION1 = $event" :value="filter.FRESOLUTION1"
                                    range></date-picker>
                            </div>

                            <div v-if="filter.TYPE === 'jurisprudences'">
                                <div class="col-12 mb-3">
                                    <label for="DELITO" class="form-label">Delito</label>
                                    <el-tree-select v-model="filter.DELITO" :data="selects.DELITOS" multiple
                                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                        check-strictly check-on-click-node filterable clearable collapse-tags
                                        :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                        popper-append-to-body class="custom-tree-select" />
                                </div>

                                <div class="col-12 mb-3">
                                    <label for="DELITO" class="form-label">Recurso</label>
                                    <el-tree-select v-model="filter.RECURSO" :data="selects['TIPO DE RECURSO']" multiple
                                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                        check-strictly check-on-click-node filterable clearable collapse-tags
                                        :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                        popper-append-to-body class="custom-tree-select" />
                                </div>

                                <div class="col-12 mb-3">
                                    <label for="DELITO" class="form-label">Órgano Jurisdiccional</label>
                                    <el-tree-select v-model="filter.OJURISDICCIONAL"
                                        :data="selects['ÓRGANO JURISDICCIONAL']" multiple :render-after-expand="false"
                                        placeholder="Seleccione una opción" show-checkbox check-strictly
                                        check-on-click-node filterable clearable collapse-tags :max-collapse-tags="1"
                                        no-data-text="No hay opciones disponibles" popper-append-to-body
                                        class="custom-tree-select" />
                                </div>

                                <div class="col-12 mb-3">
                                    <label for="DELITO" class="form-label">Por Magistrado</label>
                                    <el-tree-select v-model="filter.MAGISTRATES" :data="selects['MAGISTRATES']" multiple
                                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                        check-strictly check-on-click-node filterable clearable collapse-tags
                                        :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                        popper-append-to-body class="custom-tree-select" />
                                </div>

                                <div class="col-12 mb-3">
                                    <label for="DELITO" class="form-label">Jurisprudencia Vinculante</label>
                                    <el-tree-select v-model="filter.JVINCULANTE"
                                        :data="selects['JURISPRUDENCIA VINCULANTE']" multiple
                                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                        check-strictly check-on-click-node filterable clearable collapse-tags
                                        :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                        popper-append-to-body class="custom-tree-select" />
                                </div>


                                <div class="col-12 mb-3 d-flex align-items-center">
                                    <label for="BLOG" class="form-label mr-3">Casos Emblematicos</label>
                                    <b-form-checkbox switch v-model="filter.BLOG" id="status" size="lg"
                                        button-variant="black-50" />
                                </div>
                            </div>
                            <div v-else>
                                <div class="col-12 mb-3">
                                    <label for="NMRCN" class="form-label">Numeración</label>
                                    <input type="text" v-model="filter.NMRCN" id="NMRCN" class="form-control" />
                                </div>

                                <div class="col-12 mb-3">
                                    <label for="TPONRMA" class="form-label">Tipo de norma</label>
                                    <el-tree-select v-model="filter.TPONRMA" :data="selects['TIPO DE NORMA']" multiple
                                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                        check-strictly check-on-click-node filterable clearable collapse-tags
                                        :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                        popper-append-to-body class="custom-tree-select" />
                                </div>

                                <div class="col-12 mb-3">
                                    <label for="OEMISOR" class="form-label">Órgano emisor </label>
                                    <el-tree-select v-model="filter.OEMISOR" :data="selects['ÓRGANO EMISOR']" multiple
                                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                        check-strictly check-on-click-node filterable clearable collapse-tags
                                        :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                        popper-append-to-body class="custom-tree-select" />
                                </div>
                            </div>
                        </div>

                        <div v-if="isFilter === 'ppjj' && filter.TYPE == 'jurisprudences'" class="row p-3">
                            <div class="col-12 mb-3">
                                <label for="FRESOLUTION2" class="form-label">Año de resolución</label>
                                <date-picker v-model="filter.FRESOLUTION2" valueType="format" type="year"
                                    @change="filter.FRESOLUTION2 = $event" :value="filter.FRESOLUTION2"
                                    range></date-picker>
                            </div>

                            <div class="col-12 mb-3">
                                <label for="DELITO" class="form-label">Materia</label>
                                <el-tree-select v-model="filter.MATERIA" :data="selects['MATERIA']" multiple
                                    :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                    check-strictly check-on-click-node filterable clearable collapse-tags
                                    :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                    popper-append-to-body class="custom-tree-select" />
                            </div>

                            <div class="col-12 mb-3">
                                <label for="DELITO" class="form-label">Jurisdicción</label>
                                <el-tree-select v-model="filter.JURISDICCIÓN" :data="selects['JURISDICCIÓN']" multiple
                                    :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                    check-strictly check-on-click-node filterable clearable collapse-tags
                                    :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                    popper-append-to-body class="custom-tree-select" />
                            </div>
                        </div>

                        <div v-if="['dominio', 'generales'].includes(isFilter) && filter.TYPE == 'jurisprudences'"
                            class="row p-3">
                            <div class="col-12 mb-3" v-if="isFilter == 'dominio'">
                                <label for="FRESOLUTION2" class="form-label">Año de resolución</label>
                                <date-picker v-model="filter.FRESOLUTION2" valueType="format" type="year"
                                    @change="filter.FRESOLUTION2 = $event" :value="filter.FRESOLUTION2"
                                    range></date-picker>
                            </div>

                            <div class="col-12 mb-3">
                                <label for="KEYWORDS" class="form-label">Palabras clave</label>
                                <b-form-tags separator="," v-model="filter.KEYWORDS" tag-variant="primary" tag-pills
                                    tag-readonly tag-class="bg-app-secondary-b text-app-primary-b" tag-size="sm"
                                    placeholder="Agregar una palabra clave" addButtonText="Agregar"
                                    removeButtonText="Eliminar" removeOnDeleteKey />
                            </div>

                            <div class="col-12 mb-3">
                                <label for="TEMA" class="form-label">Tema <span class="text-danger">*</span></label>
                                <input type="text" v-model="filter.TEMA" id="TEMA" class="form-control" />
                            </div>

                            <div class="col-12 mb-3">
                                <label for="SUBTEMA" class="form-label">Subtema <span
                                        class="text-danger">*</span></label>
                                <input type="text" v-model="filter.SUBTEMA" id="SUBTEMA" class="form-control" />
                            </div>

                            <div class="col-12 mb-3">
                                <label for="DELITO" class="form-label">Jurisdicción</label>
                                <el-tree-select v-model="filter.JURISDICCIÓN" :data="selects['JURISDICCIÓN']" multiple
                                    :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                    check-strictly check-on-click-node filterable clearable collapse-tags
                                    :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                                    popper-append-to-body class="custom-tree-select" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botón de búsqueda -->
            <button class="btn-search" type="button" id="filter-btn" @click="search">
                Realizar búsqueda
            </button>
        </div>

        <div v-if="resultados.length > 0" class="search-results">
            <p class="text-left mt-3 color-blue font-weight-bold">
                Se está mostrando {{ table.perPage }} registros, de {{ (table.currentPage - 1) *
                    table.perPage + 1 }} - {{
                    table.currentPage * table.perPage }} de {{ table.totalRows }} registros en total.
            </p>
            <div class="col-12 p-0">
                <b-pagination v-model="table.currentPage" :total-rows="table.totalRows"
                    @update:model-value="handleSearch" :per-page="table.perPage" aria-controls="my-table"
                    class="my-0" />
            </div>
            <div v-for="(item, index) in resultados" :key="index" class="result-item">
                <!-- Pretensión / Delito -->
                <p class="result-info">
                    <strong>Pretensión / Delito:</strong> {{item.DELITO.map((delito) => delito.DESCP).join(', ')}}
                </p>


                <!-- Título con flecha -->
                <div class="result-title" @click="openModalWithData(item)">
                    <span>{{ item.TITULO }}</span>
                    <img src="@/assets/img/icons/arrow-right.svg" alt="Arrow" />
                </div>


                <!-- Síntesis -->
                <p class="result-summary">{{ item.SHORTSUMMARY }}</p>
            </div>
            <div class="col-12 p-0">
                <b-pagination v-model="table.currentPage" :total-rows="table.totalRows"
                    @update:model-value="handleSearch" :per-page="table.perPage" aria-controls="my-table"
                    class="my-0" />
            </div>
            <p class="text-left mt-3 color-blue font-weight-bold">
                Se está mostrando {{ table.perPage }} registros, de {{ (table.currentPage - 1) *
                    table.perPage + 1 }} - {{
                    table.currentPage * table.perPage }} de {{ table.totalRows }} registros en total.
            </p>
        </div>

        <div v-if="resultados.length === 0 && !isLoading" class="no-results">
            <img src="@/assets/img/icons/no-results.svg" alt="No Results" />
            <p class="text-center text-lato" style="color: #727370">Aquí se reflejarán los resultados <br>de tu búsqueda
            </p>
        </div>

        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

        <ModalMostrarResolucion :openModal="openModal" :toggleModal="() => this.openModal = !this.openModal"
            :pdfUrl="pdfUrl" 
            :data="rowData"
            />

    </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { BPagination } from 'bootstrap-vue-next';


import { toast } from 'vue3-toastify';
import AutoComplete from 'primevue/autocomplete';

// PROXY
import MagistradoProxy from "../../proxies/Magistrados.Proxy.js";
import filterProxy from "../../proxies/FilterProxy.js";
import AdminEntriesProxy from "../../proxies/AdminEntriesProxy.js";
import ModalMostrarResolucion from './Modales/ModalMostrarResolucion.vue';

export default {
    data() {
        return {
            typeSaarch: "jurisprudences",
            isLoading: false,
            isCollapsed: true,
            showFilters: false,
            isFilter: "generales",
            resultados: [],
            table: {
                currentPage: 1,
                perPage: 10,
                totalRows: 0
            },
            default: {
                GLOBAL: null,
                FRESOLUTION1: [],
                DELITO: null,
                NMRCN: null,
                TPONRMA: null,
                OEMISOR: null,
                RECURSO: null,
                OJURISDICCIONAL: null,
                MAGISTRATES: null,
                JVINCULANTE: null,
                FRESOLUTION2: [],
                MATERIA: null,
                JURISDICCION: null,
                TITLE: null,
                CRITERIO: null,
                KEYWORDS: [],
                TEMA: null,
                BLOG: false,
                SUBTEMA: null,
            },

            filter: {
                GLOBAL: null,
                FRESOLUTION1: [],
                DELITO: null,
                NMRCN: null,
                TPONRMA: null,
                OEMISOR: null,
                RECURSO: null,
                OJURISDICCIONAL: null,
                MAGISTRATES: null,
                JVINCULANTE: null,
                FRESOLUTION2: [],
                MATERIA: null,
                JURISDICCION: null,
                TITLE: null,
                TYPE: "jurisprudences",
                CRITERIO: null,
                KEYWORDS: [],
                TEMA: null,
                BLOG: false,
                SUBTEMA: null,
                CURRENTPAGE: 1,
                PERPAGE: 10,
                INDICADOR: 2
            },
            selects: {
                "MAGISTRATES": [],
                "DELITOS": [],
                "ÁMBITO": [],
                "ÓRGANO JURISDICCIONAL": [],
                "RECURSOS": [],
                "MATERIAS": [],
                "NORMA": [],
                "JURISPRUDENCIA VINCULANTE": [],
                "JURISDICCIONES": [],
                "TIPO DE NORMA": [],
                "ÓRGANO EMISOR": [],
            },
            Search,
            pdfUrl: '',
            openModal: false,
            dataComplete: [],
            rowData: {}
        };
    },
    components: {
        BPagination,
        AutoComplete,
        ModalMostrarResolucion
    },
    props: {
        role: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        openModalWithData(item) {
            this.rowData = item;
            this.openModal = true;
        },
        searchSugges() {
            if (this.filter.GLOBAL?.length < 5) return;

            this.dataComplete.value = []
            AdminEntriesProxy.searchSugges({
                GLOBAL: this.filter.GLOBAL
            })
                .then((response) => {
                    this.dataComplete = response?.map((item) => {
                        return { DESCP: item?.DESCP.trim() }
                    });

                })
                .catch(() => {
                    this.dataComplete = []
                })
                .finally(() => this.isLoading = false);
        },
        // BUSQUEDA
        handleSearch(page) {
            let filtro = {
                INIT: ((page - 1) <= 0 ? 0 : (page - 1)) * this.table.perPage,
                ROWS: this.table.perPage
            };

            this.search(filtro);
        },
        async search(ffff = {}) {
            let filtro = { ...this.filter, ...ffff };

            this.typeSaarch = filtro.TYPE;
            this.isLoading = true;
            await AdminEntriesProxy.search({
                ...filtro,
                GLOBAL: filtro.GLOBAL?.DESCP || filtro.GLOBAL,
                FRESOLUTION: this.isFilter == 'generales' ? (filtro.FRESOLUTION1 ? filtro.FRESOLUTION1.join(",") : null) : (filtro.FRESOLUTION2 ? filtro.FRESOLUTION2.join(",") : null),
                DELITO: filtro.DELITO ? filtro.DELITO.join(",") : null,
                RECURSO: filtro.RECURSO ? filtro.RECURSO.join(",") : null,
                OJURISDICCIONAL: filtro.OJURISDICCIONAL ? filtro.OJURISDICCIONAL.join(",") : null,
                MAGISTRATES: filtro.MAGISTRATES ? filtro.MAGISTRATES.join(",") : null,
                JVINCULANTE: filtro.JVINCULANTE ? filtro.JVINCULANTE.join(",") : null,
                MATERIA: filtro.MATERIA ? filtro.MATERIA.join(",") : null,
                JURISDICCION: filtro.JURISDICCION ? filtro.JURISDICCION.join(",") : null,
                ROWS: filtro?.ROWS || 10,
                INIT: filtro?.INIT || 0,
                NMRCN: filtro.NMRCN,
                TYPE: filtro.TYPE,
                AMBIT: this.isFilter == 'generales' ? null : (this.isFilter == 'ppjj' ? '466' : (this.isFilter == 'dominio' ? '624' : null)),
                TPONRMA: filtro.TPONRMA ? filtro.TPONRMA.join(",") : null,
                OEMISOR: filtro.OEMISOR ? filtro.OEMISOR.join(",") : null,
                KEYWORDS: filtro.KEYWORDS ? filtro.KEYWORDS.join(",") : null,
                TEMA: filtro.TEMA,
                SUBTEMA: filtro.SUBTEMA,
                BLOG: filtro.BLOG ? 'emblematic' : null,
            })
                .then((response) => {
                    this.resultados = response?.map((item) => {
                        return {
                            ...item,
                            DELITO: JSON.parse(item.DELITO),
                            TPONRMA: JSON.parse(item.TPONRMA),
                            OEMISOR: JSON.parse(item.OEMISOR),
                            RECURSO: JSON.parse(item.RECURSO),
                            OJURISDICCIONAL: JSON.parse(item.OJURISDICCIONAL),
                            AMBIT: JSON.parse(item.AMBIT),
                            JURISDICCION: JSON.parse(item.JURISDICCION),
                            MAGISTRATES: JSON.parse(item.MAGISTRATES),
                            FRESOLUTION: item.FRESOLUTION ? item.FRESOLUTION.split("T")[0] : null,
                            TEMA: ![null, undefined, ""].includes(item?.TEMA) ? item.TEMA : null,
                            SUBTEMA: ![null, undefined, ""].includes(item?.SUBTEMA) ? item.SUBTEMA : null,
                            SHORTSUMMARY: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? this.setPalabras(item.SHORTSUMMARY.replace(/<[^>]*>?/gm, ''), 18) : null,
                        };
                    });

                    this.table.totalRows = response?.[0]?.TOTALROWS || 0;
                })
                .catch(() => toast.error("Ocurrió un error al buscar", { toastId: "error" }))
                .finally(() => this.isLoading = false);

        },
        setPalabras(palabra, cantidad = 15) {
            if (!palabra) return "";
            return palabra.split(" ").slice(0, cantidad).join(" ") + "..." || "";
        },
        async filtersAll() {
            this.isLoading = true;
            try {
                const [magistrados, filters] = await Promise.all([
                    MagistradoProxy.list({ ROWS: 1000, INIT: 0, DESC: null }).catch(() => []),
                    filterProxy.list({ NIVEL: 5 }, null).catch(() => []),
                ]);

                this.magistrados(magistrados);
                this.filtrosNiveles(filters);
            } catch (error) {
                toast.error("Ocurrió un error al cargar los filtros", { toastId: "error" });
            }
        },

        magistrados(magistrados) {
            this.selects["MAGISTRATES"] = magistrados.map(item => ({
                value: item.ID,
                label: `${item.APELLIDOS} ${item.NOMBRES}`,
            }));
        },

        filtrosNiveles(data) {
            data.forEach(item => {
                const NIVEL_2 = JSON.parse(item.NIVEL_2);
                this.selects[item.LABEL.toUpperCase()] = NIVEL_2.map(item => ({
                    value: item.VALUE,
                    label: item.LABEL,
                    children: item.NIVEL_3.map(item2 => ({
                        value: item2.VALUE,
                        label: item2.LABEL,
                        children: item2.NIVEL_4.map(item3 => ({
                            value: item3.VALUE,
                            label: item3.LABEL,
                            children: item3.NIVEL_5.map(item4 => ({
                                value: item4.VALUE,
                                label: item4.LABEL,
                                children: item4.NIVEL_6.map(item5 => ({
                                    value: item5.VALUE,
                                    label: item5.LABEL,
                                })),
                            })),
                        })),
                    })),
                }));
            });
        },


    },
    watch: {
        "filter.TYPE": {
            handler() {
                this.filter = {
                    ...this.filter,
                    ...this.default
                }
            },
            immediate: true,
        },
        "isFilter": {
            handler() {
                this.filter = {
                    ...this.filter,
                    ...this.default
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.isLoading = true;
        this.filtersAll();
        this.handleSearch(1);
    }
};
</script>


<style scoped>
.landing-busqueda {
    background-image: url("../../assets/img/backgrounds/bg-busqueda.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
}


.logo-busqueda {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-top: 20px;
    z-index: -1;
}

::v-deep(.p-autocomplete-input) {
    border: none !important;
    width: 100%;
    padding-right: 2rem;
}

/* Contenedor principal */
.search-container {
    display: flex;
    align-items: center;
    width: 80%;
    border-radius: 8px;
    position: relative;
    overflow: visible !important;
}

/* Contenedor del input */
.search-box {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 8px;
}

/* Estilos del input */
.search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 8px;
    font-size: 14px;
    width: 100%;
}

/* Botón para limpiar */
.btn-clear {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-left: 8px;
}

/* Separador */
.separator {
    width: 1px;
    height: 24px;
    background-color: #ddd;
    margin: 0 12px;
}

/* Botón de filtro */
.btn-filter {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

/* Botón de búsqueda */
.btn-search {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background 0.3s ease;
    border-radius: 10px;
}

.btn-search:hover {
    background-color: #0056b3;
}

.search-results {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 80%;
    margin: auto;
}

/* Cada resultado */
.result-item {
    padding: 12px;
}

/* Título */
.result-title {
    display: flex;
    font-family: Lato;
    justify-content: start;
    gap: 2px;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #1864FF;
    cursor: pointer;
}

/* Icono de flecha */
.result-title img {
    width: 16px;
    height: 16px;
}

/* Pretensión / Delito */
.result-info {
    font-size: 10px;
    font-family: Lato;
    margin: 6px 0;
    color: #727370;
}

/* Síntesis */
.result-summary {
    font-size: 13px;
    color: #555;
    line-height: 1.8;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu.filterbar-overlay {
    position: absolute;
    top: 100%;
    /* Justo debajo del botón */
    right: -20px;
    z-index: 1050;
    display: block;
    width: max-content !important;
    margin-top: 10px;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px;
}

.no-results {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}

/* Responsivo */
@media (max-width: 500px) {
    .search-container {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }

    .search-box {
        width: 100%;
        justify-content: space-between;
    }

    .btn-search {
        /* // ocultar */
        display: none;
    }

    .search-results {
        max-width: 100%;
    }

    .result-item {
        padding: 10px;
    }

    .result-title {
        font-size: 14px;
    }

    .result-info,
    .result-summary {
        font-size: 12px;
    }

    .dropdown-menu.filterbar-overlay {
        width: 100%;
        left: 0;
    }

    .dropdown-menu.filterbar-overlay .dropdown-item {
        padding: 8px 12px;
    }

    .no-results {
        margin-top: 10px;
    }

}




@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif
}


.text-initial {
    margin-top: 3rem;
}


/* //celular */
@media (min-width: 320px) and (max-width: 500px) {
    .text-initial {
        margin-top: 0rem;
    }
}

.buttons-filter {
    display: flex;
    flex-direction: row;
}


@media (max-width: 768px) {
    .buttons-filter {
        display: flex;
        flex-direction: column;
    }

    .buttons-filter button {
        width: auto !important;
        justify-content: center;
    }
}

.card-container li {
    /* // ponerle estilo de li */
    list-style: outside;
}

.sin_resultados {
    padding: 20px;
    border-radius: 0.375rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #718096;
    font-size: 1.5rem;
    border: none;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    background-color: #f5f8ffff;
}


.sin_resultados p {
    margin: 0px;
}

.sin_resultados span {
    font-size: 1rem !important;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
}

@media (max-width: 768px) {
    .sin_resultados {
        width: 90% !important;
        margin: 20px auto 0 auto !important;
    }

    .sin_resultados p {
        font-size: 1.2rem !important;
    }

    .sin_resultados span {
        font-size: 1rem !important;
    }
}

.container {
    margin: 40px auto
}

#header {
    width: 100%;
    height: 60px;
    box-shadow: 5px 5px 15px #e8e8e8
}

.col-lg-4,
.col-md-6 {
    padding-right: 0
}

button.btn.btn-hide {
    height: inherit;
    color: #fff;
    font-size: 0.82rem;
    padding-left: 40px;
    font-weight: bold;
    padding-right: 40px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px
}



select {
    outline: none;
    padding: 6px 12px;
    margin: 0px 4px;
    color: #999;
    font-size: 0.85rem;
    width: 140px
}

#select2 {
    border: 1px solid #777;
    color: #999
}

#pro {
    border: none;
    color: #333;
    font-weight: 700;
    padding-left: 0px;
    width: initial
}

#filterbar {
    width: 30%;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 15px;
    float: left
}

#filterbar input[type="radio"] {
    visibility: hidden
}

#filterbar input[type='radio']:checked {
    background-color: #16c79a;
    border: none
}

#filterbar .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 115px
}

#filterbar .btn.btn-success:hover {
    background-color: #e7f0ff !important;
    color: #444
}

#filterbar .btn-success:not(:disabled):not(.disabled).active,
#filterbar .btn-success:not(:disabled):not(.disabled):active {
    background-color: #3b82f6 !important;
    color: #fff
}

label {
    cursor: pointer
}

.tick {
    display: block;
    position: relative;
    padding-left: 23px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0
}

.tick input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0
}

.check {
    position: absolute;
    top: 1px;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px
}

.tick:hover input~.check {
    background-color: #f3f3f3
}

.tick input:checked~.check {
    background-color: #ffffff
}

.check:after {
    content: "";
    position: absolute;
    display: none
}

.tick input:checked~.check:after {
    display: block;
    transform: rotate(45deg) scale(1)
}

.tick .check:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid rgb(0, 0, 0);
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) scale(2)
}

.box {
    padding: 10px
}

.box-label {
    color: #11698e;
    font-size: 0.9rem;
    font-weight: 800
}

#inner-box,
#inner-box2 {
    height: 150px;
    overflow-y: scroll
}

#inner-box2 {
    height: 132px
}

#inner-box::-webkit-scrollbar,
#inner-box2::-webkit-scrollbar {
    width: 6px
}

#inner-box::-webkit-scrollbar-track,
#inner-box2::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 2px
}

#inner-box::-webkit-scrollbar-thumb,
#inner-box2::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 2px
}

#price {
    height: 45px
}

#size input[type="checkbox"] {
    visibility: hidden
}

#size input[type='checkbox']:checked {
    background-color: #16c79a;
    border: none
}

#size .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 40px;
    font-size: 0.8rem;
    border-radius: 0
}

#size .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#size .btn-success:not(:disabled):not(.disabled).active,
#size .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

#size label {
    margin: 10px;
    margin-left: 0px
}



#avail-size input[type="checkbox"] {
    visibility: hidden
}

#avail-size input[type='checkbox']:checked {
    background-color: #16c79a;
    border: none
}

#avail-size .btn.btn-success {
    background-color: #ddd;
    color: #333;
    border: none;
    width: 20px;
    font-size: 0.7rem;
    border-radius: 0;
    padding: 0
}

#avail-size .btn.btn-success:hover {
    background-color: #aff1e1;
    color: #444
}

#avail-size .btn-success:not(:disabled):not(.disabled).active,
#avail-size .btn-success:not(:disabled):not(.disabled):active {
    background-color: #16c79a;
    color: #fff
}

#avail-size label {
    margin: 10px;
    margin-left: 0px
}

#shirt {
    height: 170px
}

.middle {
    position: relative;
    width: 100%;
    margin-top: 25px
}

.slider {
    position: relative;
    z-index: 1;
    height: 5px;
    margin: 0 15px
}

.slider>.track {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    background-color: #ddd
}

.slider>.range {
    position: absolute;
    z-index: 2;
    left: 25%;
    right: 25%;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    background-color: #36a31b
}

.slider>.thumb {
    position: absolute;
    top: 2px;
    z-index: 3;
    width: 20px;
    height: 20px;
    background-color: #36a31b;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(63, 204, 75, 0.705);
    transition: box-shadow .3s ease-in-out
}

.slider>.thumb::after {
    position: absolute;
    width: 8px;
    height: 8px;
    left: 28%;
    top: 30%;
    border-radius: 50%;
    content: '';
    background-color: #fff
}

.slider>.thumb.left {
    left: 25%;
    transform: translate(-15px, -10px)
}

.slider>.thumb.right {
    right: 25%;
    transform: translate(15px, -10px)
}

.slider>.thumb.hover {
    box-shadow: 0 0 0 10px rgba(125, 230, 134, 0.507)
}

.slider>.thumb.active {
    box-shadow: 0 0 0 10px rgba(63, 204, 75, 0.623)
}

input[type=range] {
    position: absolute;
    pointer-events: none;
    -webkit-appearance: none;
    z-index: 2;
    height: 10px;
    width: 100%;
    opacity: 0
}

input[type=range]::-webkit-slider-thumb {
    pointer-events: all;
    width: 30px;
    height: 30px;
    border-radius: 0;
    border: 0 none;
    background-color: red;
    -webkit-appearance: none
}

.del {
    text-decoration: line-through;
    color: red
}

@media(min-width:1199.6px) {
    #filterbar {
        width: 25%
    }
}

@media(max-width:1199.5px) {
    #filterbar {
        width: 28%
    }

    .card {
        height: 350px
    }

    .price {
        font-size: 0.9rem
    }

    .product-name {
        font-size: 0.8rem
    }
}

@media(max-width: 991.5px) {
    .navbar-nav {
        min-width: 290px;
        position: absolute;
        left: -168px;
        bottom: -146px;
        padding: 20px 10px;
        display: block;
        background-image: none;
        z-index: 2;
        background-color: #1d1c1cb2
    }

    #filterbar {
        width: 36%
    }

    #sort {
        background-color: inherit;
        color: #fff;
        margin: 0;
        margin-bottom: 20px;
        width: 100%
    }

    #sort option,
    #pro option {
        color: #000
    }

    #pro,
    #select2,
    .result {
        background-color: inherit;
        color: #fff
    }

    .card {
        height: 345px
    }

    .price {
        font-size: 0.85rem
    }
}

@media(max-width: 767.5px) {
    #filterbar {
        width: 50%
    }
}

@media(max-width: 525.5px) {
    #filterbar {
        float: none;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 5px
    }

    #content.my-5 {
        margin-top: 20px !important;
        margin-bottom: 20px !important
    }

    .col-lg-4,
    .col-md-6 {
        padding-left: 0
    }
}

@media(max-width: 500.5px) {
    .pagination {
        display: none
    }
}

.card h3 {
    font-size: 1rem;
}
</style>