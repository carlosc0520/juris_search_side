<template>
    <div class="pt-5 mb-5">
        <h3 class="text-initial text-gray-500 text-center font-bold">Encuentra documentos con información precisa</h3>
        <h6 class="text-gray-500 text-center">
            Puedes buscar por nombres de casos, número de documentos, etc. Además no te olvides de usar filtros
            avanzados para resultados más precisos
        </h6>

        <div class="mt-5">

            <div class="row mb-3">
                <div class="col-md-7 col-12 mb-3" style="height: inherit">
                    <!-- <input type="text" v-model="filter.GLOBAL" class="form-control" placeholder="Buscar..." /> -->
                    <div class="p-inputgroup">
                        <AutoComplete style="width: 100%" v-model="filter.GLOBAL" optionLabel="DESCP"
                        :suggestions="dataComplete" @complete="searchSugges" />
                    </div>

                </div>

                <div class="col-md-3 col-12 mb-3" style="height: inherit">
                    <b-form-select v-model="filter.TYPE" :options="[
                        { text: 'Jurisprudencia', value: 'jurisprudences' },
                        { text: 'Legislación', value: 'legislations' }]">
                    </b-form-select>
                </div>

                <div class="col-12 flex justify-start gap-4">
                    <button class="btn btn-view" type="button" data-toggle="collapse" data-target="#filterbar"
                        aria-expanded="false" aria-controls="filterbar" id="filter-btn" style="width: max-content"
                        @click="isCollapsed = !isCollapsed">
                        <span :class="!isCollapsed ? 'fas fa-angle-right' : 'fas fa-angle-left'" id="filter-angle">
                        </span>
                        <span id="btn-txt"> Filtros</span>
                    </button>

                    <button class="btn btn-search" type="button" id="filter-btn" @click="search"
                        style="width: max-content">
                        <i class="fas fa-search"></i>
                        BUSCAR
                    </button>
                </div>
            </div>

            <!-- <div class="mb-3 flex flex-col justify-start items-center md:flex-row gap-5">
                <div class="col-md-1 col-12">
                </div>

                <div class="col-md-1 col-12">
                </div>
            </div> -->

            <div id="content" class="my-5 mt-5">
                <div id="filterbar" style="margin-right: 20px;" class="mb-5" :class="isCollapsed ? 'collapse' : ''">

                    <div class=" border-bottom">
                        <div class="form-group text-center">
                            <div class="btn-group w-full buttons-filter" data-toggle="buttons">
                                <button @click="isFilter = 'generales'"
                                    :class="isFilter === 'generales' ? 'active' : ''" class="btn btn-success p-3"
                                    style="display: flex!important; align-items: center; justify-content: center;">
                                    Criterios generales
                                </button>
                                <button @click="isFilter = 'ppjj'" :class="isFilter === 'ppjj' ? 'active' : ''"
                                    :disabled="filter.TYPE === 'legislations'" class="btn btn-success p-3"
                                    style="display: flex!important; align-items: center; justify-content: center;">
                                    Compliance
                                </button>
                                <button @click="isFilter = 'dominio'" :class="isFilter === 'dominio' ? 'active' : ''"
                                    :disabled="filter.TYPE === 'legislations'" class="btn btn-success p-3"
                                    style="display: flex!important; align-items: center; justify-content: center;">
                                    Extinci&oacute;n de dominio
                                </button>
                            </div>
                        </div>
                    </div>


                    <div v-if="isFilter === 'generales'" class="row p-3">
                        <div class="col-12 mb-3">
                            <label for="FRESOLUTION1" class="form-label">Año de resolución</label>
                            <date-picker v-model="filter.FRESOLUTION1" valueType="format" type="year"
                                @change="filter.FRESOLUTION1 = $event" :value="filter.FRESOLUTION1" range></date-picker>
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
                                    placeholder="Seleccione una opción" show-checkbox check-strictly check-on-click-node
                                    filterable clearable collapse-tags :max-collapse-tags="1"
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
                                    :data="selects['JURISPRUDENCIA VINCULANTE']" multiple :render-after-expand="false"
                                    placeholder="Seleccione una opción" show-checkbox check-strictly check-on-click-node
                                    filterable clearable collapse-tags :max-collapse-tags="1"
                                    no-data-text="No hay opciones disponibles" popper-append-to-body
                                    class="custom-tree-select" />
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
                                @change="filter.FRESOLUTION2 = $event" :value="filter.FRESOLUTION2" range></date-picker>
                        </div>

                        <div class="col-12 mb-3">
                            <label for="DELITO" class="form-label">Materia</label>
                            <el-tree-select v-model="filter.MATERIA" :data="selects['MATERIA']" multiple
                                :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                check-strictly check-on-click-node filterable clearable collapse-tags
                                :max-collapse-tags="1" no-data-text="No hay opciones disponibles" popper-append-to-body
                                class="custom-tree-select" />
                        </div>

                        <div class="col-12 mb-3">
                            <label for="DELITO" class="form-label">Jurisdicción</label>
                            <el-tree-select v-model="filter.JURISDICCIÓN" :data="selects['JURISDICCIÓN']" multiple
                                :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                check-strictly check-on-click-node filterable clearable collapse-tags
                                :max-collapse-tags="1" no-data-text="No hay opciones disponibles" popper-append-to-body
                                class="custom-tree-select" />
                        </div>
                    </div>

                    <div v-if="['dominio', 'generales'].includes(isFilter) && filter.TYPE == 'jurisprudences'"
                        class="row p-3">
                        <div class="col-12 mb-3" v-if="isFilter == 'dominio'">
                            <label for="FRESOLUTION2" class="form-label">Año de resolución</label>
                            <date-picker v-model="filter.FRESOLUTION2" valueType="format" type="year"
                                @change="filter.FRESOLUTION2 = $event" :value="filter.FRESOLUTION2" range></date-picker>
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
                            <label for="SUBTEMA" class="form-label">Subtema <span class="text-danger">*</span></label>
                            <input type="text" v-model="filter.SUBTEMA" id="SUBTEMA" class="form-control" />
                        </div>

                        <div class="col-12 mb-3">
                            <label for="DELITO" class="form-label">Jurisdicción</label>
                            <el-tree-select v-model="filter.JURISDICCIÓN" :data="selects['JURISDICCIÓN']" multiple
                                :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox
                                check-strictly check-on-click-node filterable clearable collapse-tags
                                :max-collapse-tags="1" no-data-text="No hay opciones disponibles" popper-append-to-body
                                class="custom-tree-select" />
                        </div>
                    </div>
                </div>

                <div id="products">
                    <div class="row mx-0" v-if="resultados.length > 0">
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

                        <div class="col-12 p-0 mb-3" v-for="(item, index) in resultados" :key="index">
                            <div class="card d-flex m-0 flex-column align-items-center p-0">
                                <div class="card-header" style="width: 100%; background-color: #f7f7f7ff;">{{
                                    item.TITULO }}</div>
                                <div class="card-body card-container" style="width: 100%;">
                                    <div class="row p-1">
                                        <div class="col-12 p-2" v-if="typeSaarch != 'jurisprudences'">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                Tipo de Norma:</p>
                                            <div>
                                                <span v-for="(norma, index) in item.TPONRMA" style="font-size: 11px;"
                                                    :key="index" class="d-block text-left">{{ norma.DESCP }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="col-12 p-2" v-if="typeSaarch != 'jurisprudences'">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                Órgano emisor:
                                            </p>
                                            <div>
                                                <span v-for="(emisor, index) in item.OEMISOR" style="font-size: 11px;"
                                                    :key="index" class="d-block text-left">{{ emisor.DESCP }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-4 p-2" v-if="typeSaarch == 'jurisprudences'">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                Pretensión/Delito:</p>
                                            <div>
                                                <span v-for="(delito, index) in item.DELITO" style="font-size: 11px;"
                                                    :key="index" class="d-block text-left">{{ delito.DESCP }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-8 p-2" v-if="typeSaarch == 'jurisprudences'">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                Tema:
                                            </p>
                                            <div>
                                                <span style="font-size: 11px;" :key="index" class="d-block text-left"
                                                    v-html="texto_mostrado(item.TEMA)">
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 p-2" v-if="typeSaarch == 'jurisprudences'">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                Órgano jurisdiccional:
                                            </p>
                                            <div>
                                                <span v-for="(organo, index) in item.OJURISDICCIONAL"
                                                    style="font-size: 11px;" :key="index" class="d-block text-left">{{
                                                        organo.DESCP }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-8 p-2" v-if="typeSaarch == 'jurisprudences'">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                SubTema:
                                            </p>
                                            <div>
                                                <span style="font-size: 11px;" :key="index" class="d-block text-left"
                                                    v-html="texto_mostrado(item.SUBTEMA)">
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 p-2">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                Fecha Resolución:</p>
                                            <div>
                                                <span style="font-size: 11px;" :key="index" class="d-block text-left">{{
                                                    item.FRESOLUTION }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-4 p-2" v-if="typeSaarch == 'jurisprudences'">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                Palabras clave:
                                            </p>
                                            <div>
                                                <span style="font-size: 11px;" :key="index" class="d-block text-left">{{
                                                    item.KEYWORDS }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-8 p-2" v-if="typeSaarch == 'jurisprudences'">
                                            <p style="font-size: 13px; margin-bottom: 5px;" class="font-bold text-left">
                                                Síntesis:
                                            </p>
                                            <div>
                                                <span style="font-size: 11px;" :key="index" class="d-block text-left"
                                                    v-html="texto_mostrado(item.SHORTSUMMARY)">
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-12 p-2 container-buttons">
                                            <div style="display: flex; justify-content: start;gap:1rem">
                                                <!-- v-if="role?.PERM?.find((valor) => valor == '1')" -->
                                                <button class="btn btn-view" title="Previsualizar"
                                                    @click="print(item.ENTRIEFILE)">
                                                    <i class="fas fa-eye"></i>
                                                </button>

                                                <button class="btn btn-primary" @click="download(item)"
                                                    title="Descargar Documento">
                                                    <!-- v-if="role?.PERM?.find((valor) => valor == '2')" -->
                                                    <i class="fas fa-download"></i>
                                                </button>

                                                <!-- v-if="item.TYPE == 'jurisprudences' && role?.PERM?.find((valor) => valor == '2')" -->
                                                <button class="btn btn-export" @click="createPDF(item)"
                                                    v-if="typeSaarch == 'jurisprudences'"
                                                    title="Descargar Resumen Ejecutivo">
                                                    <i class="fas fa-file-pdf"></i>
                                                </button>

                                                <!-- v-if="role?.PERM?.find((valor) => valor == '3')" -->
                                                <div v-if="!item.IDFAV">
                                                    <button title="Agregar a favoritos"
                                                        class="btn btn-warning text-white" @click="favoriteAdd(item)">
                                                        <i class="fas fa-star"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>
                    <div v-else-if="!isLoading && !resultados.length" class="row mx-0">
                        <div class="sin_resultados col-12 border rounded-lg">
                            <img src="@/assets/img/resources/no-results.png" alt="No se encontraron resultados"
                                width="50" height="50" class="w-1/4 mx-auto" />
                            <p class="text-center text-gray-500 font-bold text-2xl mt-1">No se encontraron resultados
                            </p>
                            <span class="text-center text-gray-500 font-bold text-lg">Intenta con otra búsqueda</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
        <ModalMostrarPDF :openModal="openModal" :toggleModal="() => this.openModal = !this.openModal"
            :pdfUrl="pdfUrl" />

    </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { BFormSelect, BPagination, BFormTags, BFormCheckbox } from 'bootstrap-vue-next';
import ModalMostrarPDF from './Modales/ModalMostrarPDF.vue';


import { toast } from 'vue3-toastify';
import AutoComplete from 'primevue/autocomplete';

// PROXY
import MagistradoProxy from "../../proxies/Magistrados.Proxy";
import filterProxy from "../../proxies/FilterProxy.js";
import UserProxy from "../../proxies/UserProxy.js";
import AdminEntriesProxy from "../../proxies/AdminEntriesProxy.js";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import recursos from "./recursos";

export default {
    data() {
        return {
            typeSaarch: "jurisprudences",
            isLoading: false,
            isCollapsed: true,
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
                SUBTEMA: null
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

        };
    },
    components: {
        BFormSelect,
        BPagination,
        ModalMostrarPDF,
        BFormTags,
        BFormCheckbox,
        AutoComplete
    },

    methods: {
        searchSugges() {
            if (this.filter.GLOBAL?.length < 5) return;

            this.dataComplete.value = []
            AdminEntriesProxy.searchSugges({
                GLOBAL: this.filter.GLOBAL,
                TYPE: this.filter.TYPE
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
                            OJURISDICCIONAL: JSON.parse(item.OJURISDICCIONAL),
                            FRESOLUTION: item.FRESOLUTION ? item.FRESOLUTION.split("T")[0] : null,
                            TEMA: ![null, undefined, ""].includes(item?.TEMA) ? item.TEMA : null,
                            SUBTEMA: ![null, undefined, ""].includes(item?.SUBTEMA) ? item.SUBTEMA : null,
                            SHORTSUMMARY: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? this.setPalabras(item.SHORTSUMMARY.replace(/<[^>]*>?/gm, ''), 18) : null,
                        };
                    });

                    this.table.totalRows = response?.[0]?.TOTALROWS || 0;

                })
                .catch((errir) => {
                    console.log(errir);
                    toast.error("Ocurrió un error al buscar", { toastId: "error" })
                })
                .finally(() => this.isLoading = false);

        },

        // FILTROS
        async download(item) {
            let path = item?.ENTRIEFILE || "";
            this.isLoading = true;
            await AdminEntriesProxy.downloadFile({
                PATH: path
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    const extension = path.split('.').pop();
                    link.href = url;
                    link.setAttribute('download', (item?.TITULO || "") + "-" + " ENTRADA PRINCIPAL" + '.' + extension);
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(() => {
                    toast.error("Ocurrió un error al descargar el archivo", { toastId: "error" });
                })
                .finally(() => this.isLoading = false);
        },
        async createPDF(entrie) {
            this.isLoading = true;
            let data = await this.obtenerDatos(entrie.ID);
            try {
                let margin = [40, 10, 40, 10];
                let totalPages = 0;
                let fontSize = 11;
                let documentoPDF = {

                    header: () => {
                        return {
                            style: 'headerStyle',
                            columns: [
                                { width: '*', text: '', alignment: 'center', margin: [40, 40, 40, 40] },
                                {
                                    width: 'auto',
                                    stack: [
                                        {
                                            image: recursos.nuevoLogoJuris,
                                            width: 60,
                                            link: 'https://jurissearch.com/',
                                            alignment: 'center',
                                            margin: [0, 20, 0, 0]
                                        },
                                    ],
                                },
                                { width: '*', text: '', alignment: 'center', margin: [40, 40, 40, 40] },
                            ],
                        }
                    },

                    background: [
                        {
                            image: recursos.toIMG,
                            width: 620,
                            height: 600,
                            absolutePosition: { x: 5, y: 150 },
                            alignment: 'center',
                            opacity: 0.5,
                        }
                    ],

                    content: [
                        {
                            text: `${data.TITLE}`,
                            style: 'header',
                            alignment: 'left',
                            margin: [40, -20, 40, 10],
                            bold: true,
                            FontFace: 'Calibri',
                        },
                        {
                            columns: [
                                {
                                    ul: [
                                        `Tipo de Recurso:`,
                                        `Delitos:`,
                                        `Vinculante:`,
                                    ],
                                    margin: [margin[0], 0, 0, 0],
                                    fontSize,
                                    lineHeight: 1.5,
                                    width: '35%',
                                    FontFace: 'Calibri',
                                },
                                {
                                    ul: [
                                        `${data.RECURSO}`,
                                        `${data.DELITO}`,
                                        `${data.ISBINDING}`,
                                    ],
                                    margin: [0, 5, margin[0] + 20, 0],
                                    fontSize,
                                    lineHeight: 1.5,
                                    width: '65%',
                                    FontFace: 'Calibri',
                                },
                            ]
                        },

                        {
                            style: 'tableExample',
                            table: {
                                dontBreakRows: false,
                                widths: ['35%', '65%'],
                                body: [
                                    [
                                        {
                                            text: 'CONTENIDO',
                                            bold: true,
                                            colSpan: 2,
                                            fontSize,
                                            alignment: 'center',
                                            margin: [20, 15, 20, 15]
                                        },
                                        {},
                                    ],
                                    [
                                        {
                                            text: 'TEMA',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        this.renderContent(data.TEMA, fontSize, [10, 15, 10, 15]),
                                    ],
                                    [
                                        {
                                            text: 'SUBTEMA',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        this.renderContent(data.SUBTEMA, fontSize, [10, 15, 10, 15]),

                                    ],
                                    [
                                        {
                                            text: 'PALABRAS CLAVES',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        {
                                            text: data.KEYWORDS,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                    ],
                                    [
                                        {
                                            text: 'SÍNTESIS DE LOS FUNDAMENTOS JURÍDICOS RELEVANTES',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        this.renderContent(data.SHORTSUMMARY, fontSize, [10, 15, 10, 15]),
                                    ],
                                    [
                                        {
                                            text: 'FUNDAMENTOS JURÍDICOS RELEVANTES',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                            fillColor: '#fff2cc',
                                        },

                                        {
                                            ...this.renderContent(data.RESUMEN, fontSize, [10, 15, 10, 15]),
                                            fillColor: '#fff2cc',
                                            italics: true,

                                        }
                                    ],
                                    [
                                        {
                                            text: 'IDENTIFICACIÓN',
                                            bold: true,
                                            fontSize,
                                            colSpan: 2,
                                            alignment: 'center',
                                            margin: [10, 15, 10, 15],
                                        },
                                        {},
                                    ],
                                    [
                                        {
                                            text: 'ÁMBITO',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        {
                                            text: data.AMBIT,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                    ],
                                    [
                                        {
                                            text: 'FECHA DE RESOLUCIÓN',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        {
                                            text: data.FRESOLUTIONSTRING,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                    ],
                                    [
                                        {
                                            text: 'JURISDICCIÓN',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        {
                                            text: data?.JURISDICCION || '-',
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                    ],
                                    [
                                        {
                                            text: 'ÓRGANO JURISDICCIONAL',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        {
                                            text: data.OJURISDICCIONAL,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                    ],
                                    [
                                        {
                                            text: 'MAGISTRADOS',
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        {
                                            text: data.MAGISTRATES,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                    ],
                                    [
                                        {
                                            text: ['VOTO DEL DESIDENTE\n', {
                                                text: 'Voto que discrepa del fallo final adoptado.', fontSize: fontSize - 2, bold: false, italics: true
                                            }],
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        {
                                            text: data?.VDESIDENTE || '-',
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                    ],
                                    [
                                        {
                                            text: ['VOTO CONCURRENTE\n', {
                                                text: 'Voto que disiente de la argumentación jurídica, pero no del fallo final adoptado.',
                                                fontSize: fontSize - 1, bold: false,
                                                italics: true
                                            }],
                                            bold: true,
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                        {
                                            text: data?.CVOTE || '-',
                                            fontSize,
                                            margin: [10, 15, 10, 15],
                                        },
                                    ],
                                ],
                            },
                        }

                    ],
                    styles: {
                        FontFace: 'Calibri',
                        headerStyle: {
                            fontSize: 18,
                            bold: true,
                            margin: [0, 0, 0, 5],
                        },
                        tableExample: {
                            margin: [margin[0], 10, margin[2], 10],
                            FontFace: 'Calibri',
                        },
                        footer: {
                            FontFace: 'Calibri',
                            fontSize: 10,
                            margin: [40, 50, 40, 10],
                        },
                    },
                    footer: function (currentPage, pageCount) {
                        if (currentPage > totalPages) {
                            totalPages = currentPage;
                        }
                        return {
                            style: 'footer',
                            columns: [
                                { width: '*', text: ``, alignment: 'left', color: 'transparent' },
                                { width: 'auto', text: 'www.', alignment: 'center', color: 'gray' },
                                { width: 'auto', text: 'ccfirma', alignment: 'center', color: '#e81eb2', link: 'https://ccfirma.com/' },
                                { width: 'auto', text: '.com', alignment: 'center', color: 'gray' },
                                { width: '*', text: `Página ${currentPage} de ${pageCount}`, alignment: 'right' }
                            ],
                        };
                    },

                    pageMargins: [40, 100, 40, 80],
                }

                pdfMake.vfs = await pdfFonts.pdfMake.vfs;

                await pdfMake.createPdf(documentoPDF).download((`${data.TITLE} - RESUMEN EJECUTIVO`).toUpperCase() + '.pdf');

            } catch (error) {
                toast.error("Ocurrió un error al descargar el archivo", { toastId: "error" });
            } finally {
                this.isLoading = false;
            }
        },
        async obtenerDatos(id) {
            let data = {}
            await AdminEntriesProxy.getPrint({
                ID: id
            })
                .then((response) => {
                    let ambit = JSON.parse(response.AMBIT)?.[0]?.LABEL || '';
                    ambit = ambit ? ambit.replace(/\s*,/g, ',') : '';
                    let magistrados = JSON.parse(response.MAGISTRADOS)?.[0]?.LABEL || '';
                    magistrados = magistrados ? magistrados.replace(/\s*,/g, ',') : '';
                    let delitos = JSON.parse(response.DELITO)?.[0]?.LABEL || '';
                    delitos = delitos ? delitos.replace(/\s*,/g, ',') : '';
                    let ojurisdiccional = JSON.parse(response.OJURISDICCIONAL)?.[0]?.LABEL || '';
                    ojurisdiccional = ojurisdiccional ? ojurisdiccional.replace(/\s*,/g, ',') : '';
                    let recursos = JSON.parse(response.RECURSO)?.[0]?.LABEL || '';
                    recursos = recursos ? recursos.replace(/\s*,/g, ',') : '';
                    let materias = JSON.parse(response.MATERIA)?.[0]?.LABEL || '';
                    materias = materias ? materias.replace(/\s*,/g, ',') : '';
                    let jurisdiccion = JSON.parse(response.JURISDICCION)?.[0]?.LABEL || '';
                    jurisdiccion = jurisdiccion ? jurisdiccion.replace(/\s*,/g, ',') : '';

                    data = {
                        ID: response.ID,
                        TITLE: response.TITLE,
                        ISBINDING: response.ISBINDING === "1" ? "SI" : "NO",
                        AMBIT: ambit,
                        FRESOLUTION: response.FRESOLUTION ? new Date(response.FRESOLUTION).toLocaleDateString("es-PE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) : '',
                        OJURISDICCIONAL: ojurisdiccional,
                        MAGISTRATES: magistrados,
                        VDESIDENTE: response.VDESIDENTE,
                        CVOTE: response.CVOTE,
                        ENTRIEFILE: response.ENTRIEFILE,
                        ENTRIEFILERESUMEN: response.ENTRIEFILERESUMEN,
                        KEYWORDS: response.KEYWORDS?.replace(/\s*,/g, ', '),
                        TEMA: response.TEMA,
                        SUBTEMA: response.SUBTEMA,
                        SHORTSUMMARY: response.SHORTSUMMARY,
                        RESUMEN: response.RESUMEN,
                        NENTRIEFILERESUMEN: null,
                        NENTRIEFILE: null,
                        DELITO: delitos,
                        RECURSO: recursos,
                        MATERIA: materias,
                        JURISDICCION: jurisdiccion,
                        FRESOLUTIONSTRING: response.FRESOLUTIONSTRING,
                    }

                })
                .catch(() => {
                    data = {}
                    toast.error("Ocurrió un error al obtener los datos", { toastId: "error" });
                });

            return data;
        },
        async print(path) {
            this.isLoading = true;
            await AdminEntriesProxy.downloadFile({
                PATH: path
            })
                .then(async (response) => {
                    const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
                    this.pdfUrl = url;
                    this.openModal = true;

                })
                .catch(() => {
                    toast.error("Ocurrió un error al descargar el archivo", { toastId: "error" });
                })
                .finally(() => this.isLoading = false);
        },
        async favoriteAdd(item) {
            this.isLoading = true;
            await UserProxy.addFavorite(item.ID)
                .then((response) => {
                    const toastMessage = response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage, { toastId: "success" });
                        item.IDFAV = response.STATUS;
                    }
                    else toast.error(toastMessage, { toastId: "error" });
                })
                .catch(() => {
                    toast.error("Ocurrió un error al agregar a favoritos", { toastId: "error" });
                })
                .finally(() => this.isLoading = false);
        },
        renderContent(content, fontSize, margin) {
            let decodedContent = this.decodeHtmlEntities(content);

            if (Array.isArray(decodedContent)) {
                return {
                    ul: decodedContent,
                    fontSize,
                    alignment: 'justify',
                    margin
                };
            }

            return {
                text: decodedContent,
                fontSize,
                alignment: 'justify',
                margin
            };
        },
        decodeHtmlEntities(text) {
            if (text === null) return '';

            text = text.replace(/&[a-z]+;/g, '');

            try {
                text = text.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n');

                if (text.includes('<ul>')) {
                let t = text.split('<li>').map((item) => {
                    item = item.replace(/<\/?[^>]+(>|$)/g, '');
                    return item;
                }).filter((item) => item.trim() !== '');

                return t;
                }

                return text.replace(/<[^>]*>?/gm, '');
            } catch (error) {
                return text.replace(/<[^>]*>?/gm, '');
            }
        },
        setPalabras(palabra, cantidad = 15) {
            if (!palabra) return "";
            return palabra.split(" ").slice(0, cantidad).join(" ") + "..." || "";
        },
        texto_mostrado(texto) {
            if (texto === null) return '';
            let texto_sin_br = texto.replace(/<br>/g, '');
            texto_sin_br = texto_sin_br.replace(/<strong>/g, '');
            texto_sin_br = texto_sin_br.replace(/&[a-z]+;/g, '');
            texto_sin_br = texto_sin_br.replace(/<p><\/p>/g, '');
            return texto_sin_br.replace(/<p>/g, '');
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
                label: `${item.APELLIDOS}  ${item?.NOMBRES ? (", " + item.NOMBRES) : ''}`,
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
    // cambios de filter.TYPE
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
        }
    },
    mounted() {
        this.isLoading = true;
        this.filtersAll()
        this.handleSearch(1);
    }
};
</script>


<style>
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

.card-container li {
    /* // ponerle estilo de li */
    list-style: outside;
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