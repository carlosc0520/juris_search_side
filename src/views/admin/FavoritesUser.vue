<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12">
            <div class="w-full mb-12">
                <b-tabs>
                    <b-tab title="Documentos" @click="(e) => this.active = 'FILES'">
                    </b-tab>
                    <b-tab v-if="role?.PERM?.some((valor) => valor == '3')" title="Carpetas"
                        @click="(e) => this.active = 'DIRECTORIOS'">
                    </b-tab>
                </b-tabs>


                <div v-if="active === 'FILES'" class="bg-white bg-white p-4 shadow-lg mb-3">
                    <div class="p-2 mb-4">
                        <h3 class="bg-white p-0 m-0  text-center font-bold">Encuentra documentos con información precisa
                        </h3>
                        <h6 class="bg-white p-0 m-0  text-center">
                            Puedes buscar por nombres de casos, número de documentos, etc. Además no te olvides de usar
                            filtros
                            avanzados para resultados más precisos
                        </h6>
                    </div>
                    <div class="row">
                        <!-- // input y select y boton buscar -->
                        <div class="col-md-9 col-12 mb-3">
                            <label for="TITLE" class="form-label">Busqueda</label>
                            <input type="text" v-model="filtro.TITLE" id="TITLE" class="form-control" />
                        </div>

                        <div class="col-md-3 col-12 mb-3">
                            <label for="TYPE" class="form-label">Tipo</label>
                            <b-form-select v-model="filtro.TYPE" :options="[
                                { text: 'Jurisprudencia', value: 'jurisprudences' },
                                { text: 'Legislación', value: 'legislations' }]">
                            </b-form-select>
                        </div>

                        <div class="col-md-12 col-12 mb-3">
                            <div class="flex justify-end gap-4">
                                <button class="bton btn-search" @click="() => searchFavorites()">Buscar</button>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div v-if="data.length === 0" class="row mx-0">
                            <div class="sin_resultados col-12 border rounded-lg">
                                <img src="@/assets/img/resources/no-results.png" alt="No se encontraron resultados"
                                    width="50" height="50" class="w-1/4 mx-auto" />
                                <p class="text-center text-gray-500 font-bold text-2xl mt-1">No se encontraron
                                    resultados
                                </p>
                                <span class="text-center text-gray-500 font-bold text-lg">Intenta con otra
                                    búsqueda</span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="col-12 p-0">
                                <!-- <b-pagination v-model="table.currentPage" :total-rows="table.totalRows"
                                    :per-page="table.perPage" @change="handleSearch" size="sm"></b-pagination> -->

                                <b-pagination v-model="table.currentPage" :total-rows="table.totalRows"
                                    @update:model-value="handleSearch" :per-page="table.perPage"
                                    aria-controls="my-table" class="my-0" />
                            </div>

                            <p class="text-left mt-3 color-blue font-weight-bold">
                                Se está mostrando {{ table.perPage }} registros, de {{ (table.currentPage - 1) *
                                    table.perPage + 1 }} - {{
                                    table.currentPage * table.perPage }} de {{ table.totalRows }} registros en total.
                            </p>

                            <div class="col-12 p-0 mb-3" v-for="(item, index) in data" :key="index">
                                <div class="card d-flex m-0 flex-column align-items-center p-0">
                                    <div class="card-header" style="width: 100%; background-color: #f7f7f7ff;">{{
                                        item.TITULO }}</div>
                                    <div class="card-body card-container" style="width: 100%;">
                                        <div class="row p-1">
                                            <div class="col-12 p-2" v-if="typeSaarch != 'jurisprudences'">
                                                <p style="font-size: 13px; margin-bottom: 5px;"
                                                    class="font-bold text-left">
                                                    Tipo de Norma:</p>
                                                <div>
                                                    <span v-for="(norma, index) in item.TPONRMA"
                                                        style="font-size: 11px;" :key="index"
                                                        class="d-block text-left">{{ norma.DESCP }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="col-12 p-2" v-if="typeSaarch != 'jurisprudences'">
                                                <p style="font-size: 13px; margin-bottom: 5px;"
                                                    class="font-bold text-left">
                                                    Órgano emisor:
                                                </p>
                                                <div>
                                                    <span v-for="(emisor, index) in item.OEMISOR"
                                                        style="font-size: 11px;" :key="index"
                                                        class="d-block text-left">{{ emisor.DESCP }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="col-12 col-md-4 p-2" v-if="typeSaarch == 'jurisprudences'">
                                                <p style="font-size: 13px; margin-bottom: 5px;"
                                                    class="font-bold text-left">
                                                    Pretensión/Delito:</p>
                                                <div>
                                                    <span v-for="(delito, index) in item.DELITO"
                                                        style="font-size: 11px;" :key="index"
                                                        class="d-block text-left">{{ delito.DESCP }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="col-12 col-md-4 p-2">
                                                <p style="font-size: 13px; margin-bottom: 5px;"
                                                    class="font-bold text-left">
                                                    Fecha Resolución:</p>
                                                <div>
                                                    <span style="font-size: 11px;" :key="index"
                                                        class="d-block text-left">{{
                                                            item.FRESOLUTION }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="col-12 col-md-4 p-2" v-if="typeSaarch == 'jurisprudences'">
                                                <p style="font-size: 13px; margin-bottom: 5px;"
                                                    class="font-bold text-left">
                                                    Órgano jurisdiccional:
                                                </p>
                                                <div>
                                                    <span v-for="(organo, index) in item.OJURISDICCIONAL"
                                                        style="font-size: 11px;" :key="index"
                                                        class="d-block text-left">{{
                                                            organo.DESCP }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="col-12 p-2" v-if="typeSaarch == 'jurisprudences'">
                                                <p style="font-size: 13px; margin-bottom: 5px;"
                                                    class="font-bold text-left">
                                                    Tema:
                                                </p>
                                                <div>
                                                    <span style="font-size: 11px;" :key="index"
                                                        class="d-block text-left" v-html="texto_mostrado(item.TEMA)">
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="col-12 p-2" v-if="typeSaarch == 'jurisprudences'">
                                                <p style="font-size: 13px; margin-bottom: 5px;"
                                                    class="font-bold text-left">
                                                    Palabras clave:
                                                </p>
                                                <div>
                                                    <span style="font-size: 11px;" :key="index"
                                                        class="d-block text-left">{{
                                                            item.KEYWORDS }}
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="col-12 p-2">
                                                <label for="TITLEALT" class="form-label font-bold">Título
                                                    alternativo</label>

                                                <div class="col-12 p-0">
                                                    <div class="input-group">
                                                        <div class="form-floating w-75">
                                                            <input type="text" class="p-2 form-control" id="TITLEALT"
                                                                placeholder="Escribe el título alternativo"
                                                                v-model="item.TITLEALT" />

                                                        </div>
                                                        <span class="input-group-text"
                                                            style="background-color: #fbfbfb;cursor: pointer;"
                                                            @click="saveTitleEntrie(item)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                height="16" fill="currentColor" class="bi bi-floppy"
                                                                viewBox="0 0 16 16">
                                                                <path d="M11 2H9v3h2z" />
                                                                <path
                                                                    d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-12 p-2">
                                                <label for="IDDIRECTORIO"
                                                    class="form-label font-bold">Directorio</label>
                                                <div class="col-12 p-0">
                                                    <div class="input-group">
                                                        <div class="form-floating w-75">
                                                            <b-form-select v-model="item.IDDIRECTORIO"
                                                                style="background-color: #fbfbfb;">
                                                                <option v-for="directorio in directorios"
                                                                    :value="directorio.ID" :key="directorio.ID">
                                                                    {{ directorio.DSCRPCN }}
                                                                </option>
                                                            </b-form-select>
                                                        </div>
                                                        <span class="input-group-text"
                                                            style="background-color: #fbfbfb;cursor: pointer;"
                                                            @click="saveDirectorio(item)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                height="16" fill="currentColor" class="bi bi-floppy"
                                                                viewBox="0 0 16 16">
                                                                <path d="M11 2H9v3h2z" />
                                                                <path
                                                                    d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="col-12 flex justify-start gap-4 p-2">
                                                <div style="display: flex; justify-content: start;gap:1rem">
                                                    <button class="btn btn-view" title="Previsualizar"
                                                        @click="print(item.ENTRIEFILE)">
                                                        <i class="fas fa-eye"></i>
                                                    </button>

                                                    <button class="btn btn-primary" @click="download(item)"
                                                        title="Descargar Documento">
                                                        <!-- v-if="role?.PERM?.find((valor) => valor == '2')" -->
                                                        <i class="fas fa-download"></i>
                                                    </button>

                                                    <button class="btn btn-export" @click="createPDF(item)"
                                                        v-if="typeSaarch == 'jurisprudences'"
                                                        title="Descargar Resumen Ejecutivo">
                                                        <i class="fas fa-file-pdf"></i>
                                                    </button>

                                                    <button title="Eliminar de mis favoritos" class="btn btn-delete"
                                                        @click="deleteFavorite(item.ID, false)">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="active === 'DIRECTORIOS'" class="bg-white bg-white p-4 shadow-lg mb-3 directorio">
                    <div class="p-2 mb-4">
                        <h3 class="bg-white p-0 m-0  text-center font-bold">Encuentra documentos con información precisa
                        </h3>
                        <h6 class="bg-white p-0 m-0  text-center">
                            Puedes buscar por nombres de casos, número de documentos, etc. Además no te olvides de usar
                            filtros
                            avanzados para resultados más precisos
                        </h6>
                    </div>
                    <div class="row">
                        <div class="row gx-3 align-items-center">
                            <div class="col-12 mb-3">
                                <label for="TYPE" class="form-label">Tipo</label>
                                <b-form-select v-model="filtro.TYPE" :options="[
                                    { text: 'Jurisprudencia', value: 'jurisprudences' },
                                    { text: 'Legislación', value: 'legislations' }
                                ]" @change="() => {
                                    this.selected = {};
                                    search();
                                }">
                                </b-form-select>
                            </div>
                            <div class="col-12 d-flex justify-end align-items-center gap-2">
                                <button class="btn btn-create" @click="modalAgregar.show = true">Agregar</button>
                                <button class="btn btn-share" @click="onShared">Compartir</button>
                            </div>
                        </div>

                        <div class="mt-3">
                            <p>Selección Actual: <span v-if="selectedKey">
                                    {{ selectedKey.isDirectory ? 'Directorio' : 'Documento' }} - {{ selectedKey.label }}
                                </span></p>
                        </div>

                        <div class="row col-md-4 col-12 mb-3">
                            <div class="col-12">
                                <Tree v-model="selectedKey" :value="data" selectionMode="single" :filter="true"
                                    filterMode="lenient" class="w-full md:w-[30rem]" @node-select="onNodeSelect" />
                            </div>

                        </div>
                        <div class="col-md-8 col-12 mb-3 p-2 bg-white rounded p-4">
                            <div v-if="Object.keys(selected).length == 0" class="row mx-0">
                                <div class="sin_resultados col-12 border rounded-lg">
                                    <img src="@/assets/img/resources/no-results.png" alt="No se encontraron resultados"
                                        width="50" height="50" class="w-1/4 mx-auto" />
                                    <p class="text-center text-gray-500 font-bold text-2xl mt-1">No se encontraron
                                        resultados
                                    </p>
                                    <span class="text-center text-gray-500 font-bold text-lg">Intenta con otra
                                        búsqueda</span>
                                </div>
                            </div>
                            <div v-else>
                                <div class="col-12 p-0 mb-3">
                                    <div class="card d-flex m-0 flex-column align-items-center p-0">
                                        <div class="card-header" style="width: 100%; background-color: #f7f7f7ff;">{{
                                            selected.TITULO }}</div>
                                        <div class="card-body card-container" style="width: 100%;">
                                            <div class="row p-1">
                                                <div class="col-12 p-2" v-if="typeSaarch != 'jurisprudences'">
                                                    <p style="font-size: 13px; margin-bottom: 5px;"
                                                        class="font-bold text-left">
                                                        Tipo de Norma:</p>
                                                    <div>
                                                        <span v-for="(norma, index) in selected.TPONRMA"
                                                            style="font-size: 11px;" :key="index"
                                                            class="d-block text-left">{{ norma.DESCP }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-12 p-2" v-if="typeSaarch != 'jurisprudences'">
                                                    <p style="font-size: 13px; margin-bottom: 5px;"
                                                        class="font-bold text-left">
                                                        Órgano emisor:
                                                    </p>
                                                    <div>
                                                        <span v-for="(emisor, index) in selected.OEMISOR"
                                                            style="font-size: 11px;" :key="index"
                                                            class="d-block text-left">{{ emisor.DESCP }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-12 col-md-4 p-2" v-if="typeSaarch == 'jurisprudences'">
                                                    <p style="font-size: 13px; margin-bottom: 5px;"
                                                        class="font-bold text-left">
                                                        Pretensión/Delito:</p>
                                                    <div>
                                                        <span v-for="(delito, index) in selected.DELITO"
                                                            style="font-size: 11px;" :key="index"
                                                            class="d-block text-left">{{ delito.DESCP }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-12 col-md-4 p-2">
                                                    <p style="font-size: 13px; margin-bottom: 5px;"
                                                        class="font-bold text-left">
                                                        Fecha Resolución:</p>
                                                    <div>
                                                        <span style="font-size: 11px;" class="d-block text-left">{{
                                                            selected.FRESOLUTION }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-12 col-md-4 p-2" v-if="typeSaarch == 'jurisprudences'">
                                                    <p style="font-size: 13px; margin-bottom: 5px;"
                                                        class="font-bold text-left">
                                                        Órgano jurisdiccional:
                                                    </p>
                                                    <div>
                                                        <span v-for="(organo, index) in selected.OJURISDICCIONAL"
                                                            style="font-size: 11px;" :key="index"
                                                            class="d-block text-left">{{
                                                                organo.DESCP }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-12 p-2" v-if="typeSaarch == 'jurisprudences'">
                                                    <p style="font-size: 13px; margin-bottom: 5px;"
                                                        class="font-bold text-left">
                                                        Tema:
                                                    </p>
                                                    <div>
                                                        <span style="font-size: 11px;" :key="index"
                                                            class="d-block text-left"
                                                            v-html="texto_mostrado(selected.TEMA)">
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-12 p-2" v-if="typeSaarch == 'jurisprudences'">
                                                    <p style="font-size: 13px; margin-bottom: 5px;"
                                                        class="font-bold text-left">
                                                        Palabras clave:
                                                    </p>
                                                    <div>
                                                        <span style="font-size: 11px;" :key="index"
                                                            class="d-block text-left">{{
                                                                selected.KEYWORDS }}
                                                        </span>
                                                    </div>
                                                </div>

                                                <!-- // poner titulo alternativo -->
                                                <div class="col-12 p-2">
                                                    <p style="font-size: 13px; margin-bottom: 5px;"
                                                        class="font-bold text-left">
                                                        Título alternativo
                                                    </p>
                                                    <div>
                                                        <span style="font-size: 11px;" :key="index"
                                                            class="d-block text-left">{{
                                                                selected.TITLEALT }}
                                                        </span>
                                                    </div>
                                                </div>


                                                <div class="col-12 flex justify-start gap-4 p-2">
                                                    <div style="display: flex; justify-content: start;gap:1rem">
                                                        <button class="btn btn-view" title="Previsualizar"
                                                            @click="print(selected.ENTRIEFILE)">
                                                            <i class="fas fa-eye"></i>
                                                        </button>

                                                        <button class="btn btn-primary" @click="download(selected)"
                                                            title="Descargar Documento">
                                                            <!-- v-if="role?.PERM?.find((valor) => valor == '2')" -->
                                                            <i class="fas fa-download"></i>
                                                        </button>

                                                        <button class="btn btn-export" @click="createPDF(selected)"
                                                            v-if="typeSaarch == 'jurisprudences'"
                                                            title="Descargar Resumen Ejecutivo">
                                                            <i class="fas fa-file-pdf"></i>
                                                        </button>

                                                        <button title="Eliminar de mis favoritos" class="btn btn-delete"
                                                            @click="deleteFavoriteDirectorio()">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalAgregarFavorito :show="modalAgregar.show" :close="() => modalAgregar.show = false"
            :update="() => search()" />
        <ModalShared :show="modalShared.show" :data="modalShared.data" :close="() => modalShared.show = false"
            :update="() => search()" />

        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

    </div>
</template>

<script>
import Tree from 'primevue/tree';
import { toast } from 'vue3-toastify';
import { BTabs, BTab, BFormSelect, BPagination } from 'bootstrap-vue-next';

import ModalAgregarFavorito from './ModalesFavoritos/ModalAgregarFavorito.vue';
import ModalShared from './ModalesFavoritos/ModalCompartirFavorito.vue';
import UserProxy from '../../proxies/UserProxy';
import AdminEntriesProxy from '../../proxies/AdminEntriesProxy';
import createPDFHelper from "../../assets/helpers/generatePdfHelper.js";
// import he from 'he';

export default {
    components: {
        Tree,
        ModalAgregarFavorito,
        BTabs,
        BTab,
        BPagination,
        BFormSelect,
        ModalShared
    },
    data() {
        return {
            typeSaarch: "jurisprudences",
            modalAgregar: {
                show: false,
                data: null
            },
            modalShared: {
                show: false,
                data: null
            },
            isLoading: false,
            directorios: [],
            nodes: [],
            selectedKey: null,
            active: "FILES",
            filtro: {
                TITLE: "",
                TYPE: "jurisprudences",
                CARPETA: "C"
            },

            data: [],
            selected: {},
            table: {
                currentPage: 1,
                perPage: 10,
                totalRows: 0
            },
        }
    },  // data
    props: {
        role: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        async getDirectorios() {
            await UserProxy.listDirectoryAll()
                .then((response) => this.directorios = (typeof response === 'string') ? [] : response)
                .catch(() => {
                    this.directorios = [];
                    toast.error("Error al obtener los directorios");
                })
                .finally(() => this.isLoading = false);
        },
        texto_mostrado(texto) {
            if (texto === null) return '';
            let texto_sin_br = texto.replace(/<br>/g, '');
            texto_sin_br = texto_sin_br.replace(/<strong>/g, '');
            texto_sin_br = texto_sin_br.replace(/&[a-z]+;/g, '');
            texto_sin_br = texto_sin_br.replace(/<p><\/p>/g, '');
            return texto_sin_br.replace(/<p>/g, '');
        },
        async search() {
            this.isLoading = true;
            await UserProxy.listDirectory({
                TYPE: this.filtro.TYPE,
                DSCRPCN: this.filtro.TITLE,
            })
                .then((response) => {
                    this.data = response?.map((item) => {
                        let childrens = JSON.parse(item.ENTRADAS) || [];
                        return {
                            key: item.id,
                            label: item.DSCRPCN + (childrens.length > 0 ? ` (${childrens.length})` : " (0)"),
                            icon: 'fa fa-folder',
                            isDirectory: true,
                            directorio: item.ID,
                            shared: item.SHARED,
                            children: childrens.map((entrie) => {
                                return {
                                    key: entrie.ID,
                                    id: entrie.ID,
                                    directorio: item.ID,
                                    isDirectory: false,
                                    label: entrie.TITULO,
                                    icon: 'fa fa-file',
                                }
                            })
                        };
                    });

                })
                .catch((error) => {
                    toast.error(error?.MESSAGE || 'Error al cargar los directorios', { toastId: 'error-directorios' });
                    this.data = [];
                })
                .finally(() => this.isLoading = false);
        },
        handleSearch(page) {
            this.table = {
                ...this.table,
                INIT: ((page - 1) <= 0 ? 0 : (page - 1)) * this.table.perPage,
                ROWS: this.table.perPage
            }

            this.searchFavorites();
        },
        async searchFavorites() {

            this.typeSaarch = this.filtro.TYPE;
            this.isLoading = true;
            await AdminEntriesProxy.searchFavorites({
                GLOBAL: this.filtro.TITLE,
                TYPE: this.filtro.TYPE,
                ROWS: this.table?.ROWS || 10,
                INIT: this.table?.INIT || 0
            })
                .then((response) => {
                    this.data = response?.map((item) => {
                        return {
                            ...item,
                            IDDIRECTORIO: item.IDDIRECTORIO,
                            TPONRMA: JSON.parse(item.TPONRMA),
                            OEMISOR: JSON.parse(item.OEMISOR),
                            DELITO: JSON.parse(item.DELITO),
                            OJURISDICCIONAL: JSON.parse(item.OJURISDICCIONAL),
                            FRESOLUTION: item.FRESOLUTION ? item.FRESOLUTION.split("T")[0] : null,
                            TEMA: item.TEMA ? item.TEMA.replace(/<[^>]*>?/gm, '') : ''
                        };
                    });

                    this.table.totalRows = response?.[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    toast.error(error?.MESSAGE || 'Error al cargar los documentos', { toastId: 'error-documentos' });
                    this.data = [];
                })
                .finally(() => this.isLoading = false);

            await this.getDirectorios();
        },
        async saveTitleEntrie(item) {
            if (item.TITLEALT === null) return toast.error('No se puede guardar el título alternativo', { toastId: 'error-title' });
            if (item.ID === null) return toast.error('No se puede guardar el título alternativo', { toastId: 'error-title' });

            this.isLoading = true;
            await AdminEntriesProxy.saveTitleEntrie({
                ID: item.IDFAV,
                TITLEALT: item.TITLEALT
            })
                .then((response) => {
                    const toastMessage = response.MESSAGE;
                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.searchFavorites();
                    } else {
                        toast.error(toastMessage);
                    }

                })
                .catch((error) => toast.error(error?.MESSAGE || 'Error al guardar el título alternativo', { toastId: 'error-title' }))
                .finally(() => this.isLoading = false);
        },
        async saveDirectorio(item) {
            if (item.ID === null) return toast.error('No se puede guardar el directorio', { toastId: 'error-directorio' });
            if (item.IDDIRECTORIO === null) return toast.error('No se puede guardar el directorio', { toastId: 'error-directorio' });

            this.isLoading = true;
            await UserProxy.saveAddDirectory({
                IDDIRECTORIO: item.IDDIRECTORIO,
                IDENTRIE: item.ID
            })
                .then((response) => {
                    const toastMessage = response.MESSAGE;

                    if (response.STATUS) {
                        toast.success(toastMessage);
                        this.searchFavorites();
                    } else {
                        toast.error(toastMessage);
                    }
                })
                .catch((error) => toast.error(error?.MESSAGE || 'Error al guardar el directorio', { toastId: 'error-directorio' }))
                .finally(() => this.isLoading = false);
        },
        async onNodeSelect(e) {
            this.selectedKey = e;
            if (e && e.isDirectory == false) {
                if (!e.key) return toast.warning('No se encontró el identificador del documento', { toastId: 'warning-documento' });

                this.typeSaarch = this.filtro.TYPE;
                this.isLoading = true;
                await AdminEntriesProxy.searchFavoritesEntrie({
                    GLOBAL: null,
                    TYPE: null,
                    ROWS: 1,
                    INIT: 0,
                    ID: e.key
                })
                    .then((response) => {
                        if (response) {
                            this.selected = {
                                ...response[0],
                                DELITO: JSON.parse(response[0].DELITO),
                                OEMISOR: JSON.parse(response[0]?.OEMISOR || '[]'),
                                TPONRMA: JSON.parse(response[0]?.TPONRMA || '[]'),
                                OJURISDICCIONAL: JSON.parse(response[0].OJURISDICCIONAL),
                                FRESOLUTION: response[0].FRESOLUTION ? response[0].FRESOLUTION.split("T")[0] : null,
                                TEMA: response?.[0].TEMA ? response[0].TEMA.replace(/<[^>]*>?/gm, '') : ''
                            };
                        } else {
                            this.selected = null;
                        }

                    })
                    .catch((error) => {
                        toast.error(error?.MESSAGE || 'Error al cargar el documento', { toastId: 'error-documento' });
                        this.selected = {};
                    })
                    .finally(() => this.isLoading = false);
            }
        },

        // ACTION
        async print(path) {
            this.isLoading = true;
            await AdminEntriesProxy.downloadFile({ PATH: path })
                .then(async (response) => {
                    const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = url;
                    document.body.appendChild(iframe);
                    iframe.onload = () => {
                        iframe.contentWindow.print();
                    };
                })
                .catch((error) => toast.error(error?.MESSAGE || 'Error al imprimir el documento', { toastId: 'error-print' }))
                .finally(() => this.isLoading = false);
        },
        async download(item) {
            this.isLoading = true;
            let path = item.ENTRIEFILE;
            await AdminEntriesProxy.downloadFile({ PATH: item.ENTRIEFILE })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    const extension = path.split('.').pop();
                    link.href = url;
                    link.setAttribute('download', (item?.TITULO || "") + "-" + " ENTRADA PRINCIPAL" + '.' + extension);
                    document.body.appendChild(link);
                    link.click();
                })
                .catch((error) => toast.error(error?.MESSAGE || 'Error al descargar el documento', { toastId: 'error-download' }))
                .finally(() => this.isLoading = false);
        },
        async createPDF(entrie) {
            this.isLoading = true;
            let data = await this.obtenerDatos(entrie.ID);
            await createPDFHelper.generate(data);
            this.isLoading = false;
        },
        async obtenerDatos(id) {
            let data = {}
            await AdminEntriesProxy.getPrint({ ID: id })
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
                    }

                })
                .catch((error) => {
                    data = {}
                    toast.error(error?.MESSAGE || 'Error al obtener los datos', { toastId: 'error-datos' });
                });

            return data;
        },
        async deleteFavorite(IDENTRIE, bandera = false) {
            this.isLoading = true;
            await UserProxy.addFavorite(IDENTRIE)
                .then((response) => {
                    const toastMessage = response.MESSAGE;
                    if (response.STATUS) {
                        toast.success("Documento eliminado de favoritos");
                        if (bandera) {
                            this.search();
                            this.selected = {};
                        }
                        else this.searchFavorites();
                    } else {
                        toast.error(toastMessage);
                    }
                })
                .catch((error) => toast.error(error?.MESSAGE || 'Error al eliminar de favoritos', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
        async deleteFavoriteDirectorio() {
            if (this.selectedKey?.directorio && this.selectedKey?.id) {
                this.isLoading = true;
                await UserProxy.deleteFavoriteDirectorio(this.selectedKey.directorio, this.selectedKey.id)
                    .then((response) => {
                        const toastMessage = response.MESSAGE;
                        if (response.STATUS) {
                            toast.success("Documento eliminado del directorio");
                            this.selected = {};
                            this.search();
                        } else {
                            toast.error(toastMessage);
                        }
                    })
                    .catch((error) => toast.error(error?.MESSAGE || 'Error al eliminar del directorio', { toastId: 'error-delete' }))
                    .finally(() => this.isLoading = false);
                return
            }

            return toast.warning('No se ha seleccionado un directorio', { toastId: 'error-delete' });
        },
        onShared() {
            if (!this.selectedKey) {
                return toast.warning('No se ha seleccionado un directorio', { toastId: 'error-share' });
            }

            if (!this.selectedKey.isDirectory) {
                return toast.warning('No se puede compartir un documento', { toastId: 'error-share' });
            }

            if (this.selectedKey.shared == 1) {
                return toast.warning('No tienes permiso para compartir este directorio', { toastId: 'error-share' });
            }

            this.modalShared.data = this.selectedKey;
            this.modalShared.show = true;
        }
    },
    watch: {
        active: {
            handler(value) {
                this.filtro = {
                    TITLE: null,
                    TYPE: "jurisprudences",
                    CARPETA: "C"
                };

                if (value === 'DIRECTORIOS') {
                    this.selected = {};
                    this.selectedKey = null;
                    this.search();
                }

                if (value === 'FILES') {
                    this.data = [];
                    this.searchFavorites();
                }
            }
        },
    },
    mounted() {
        this.searchFavorites();
    },
};
</script>


<style>
.p-tree {
    margin-top: 1rem !important;
    background: transparent !important;
    padding: 0px !important;
}

.p-tree-node-content {
    color: #495057 !important;
}

.p-tree-root {
    padding-top: 1rem !important;
}

.p-tree-node-selectable:hover {
    background-color: #e6e6e6 !important;
}

.card {
    height: fit-content !important;
}

.card h3 {
    font-size: 1rem;
}

/* // activar scrrol pantalla chica a .directorio */
@media (max-width: 768px) {
    /* .directorio {
        overflow-y: auto;
        max-height: 70vh;
    } */
}
</style>