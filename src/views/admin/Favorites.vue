<template>
    <section class="favorites-container mt-4 pt-2">
        <div class="favorites-header">
            <div class="favorites-header-content">
                <div class="header-title-section">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="header-icon">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <div>
                        <h1 class="favorites-title">Mis Favoritos</h1>
                        <p class="favorites-subtitle">Gestiona tus documentos y directorios favoritos</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="favorites-content">
            <div class="tabs-modern">
                <button 
                    class="tab-button" 
                    :class="{ 'tab-active': active === 'documentos' }"
                    @click="updateActive('documentos')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span>Documentos</span>
                </button>
                <button 
                    class="tab-button" 
                    :class="{ 'tab-active': active === 'directorios' }"
                    @click="updateActive('directorios')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                    </svg>
                    <span>Directorios</span>
                </button>
            </div>

            <div class="tab-content">
                <!-- DOCUMENTOS SECTION -->
                <div v-if="active === 'documentos'" class="fade-in">
                    <div class="filters-card">
                        <div class="filters-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                            <h3>Filtros de Búsqueda</h3>
                        </div>
                        
                        <div class="filters-grid">
                            <div class="form-group form-group-full">
                                <label class="form-label">Buscar documentos</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="M21 21l-4.35-4.35"/>
                                    </svg>
                                    <input 
                                        v-model="filter.SEARCH" 
                                        class="form-input" 
                                        type="text"
                                        placeholder="Buscar por nombre, título alternativo..." />
                                </div>
                            </div>

                            <div class="form-group" v-if="active === 'documentos' || !visibleDirectorios.visible">
                                <label class="form-label">Directorio</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                                    </svg>
                                    <select 
                                        v-model="filter.IDDIRECTORIO" 
                                        :disabled="!visibleDirectorios.visible"
                                        class="form-input form-select">
                                        <option 
                                            v-for="item in directorios" 
                                            :key="item.ID" 
                                            :value="item.ID">
                                            {{ item.DSCRPCN }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group" v-if="active === 'documentos' || !visibleDirectorios.visible">
                                <label class="form-label">Tipo</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                        <polyline points="9 22 9 12 15 12 15 22"/>
                                    </svg>
                                    <select v-model="filter.SHARED" class="form-input form-select">
                                        <option value="T">Todos</option>
                                        <option value="M">Mis Documentos</option>
                                        <option value="C">Documentos Compartidos</option>
                                    </select>
                                </div>
                            </div>

                            <div class="filters-actions">
                                <button class="btn-search" @click="active === 'documentos' || !visibleDirectorios.visible ? searchDocuments() : searchDirectorios()">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="M21 21l-4.35-4.35"/>
                                    </svg>
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="documents-table-card">
                        <card-table 
                            :search="searchDocuments" 
                            :fields="fieldsDocumentos"
                            :items="dataDocuments" 
                            :grid="grid" 
                            :actions="actionsDocuments" />
                    </div>
                </div>

                <!-- DIRECTORIOS SECTION -->
                <div v-if="active === 'directorios'" class="fade-in">
                    <!-- Filters for directorios search -->
                    <div class="filters-card">
                        <div class="filters-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                            <h3>Filtros de Búsqueda</h3>
                        </div>
                        
                        <div class="filters-grid">
                            <div class="form-group form-group-full">
                                <label class="form-label">Buscar directorios</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="M21 21l-4.35-4.35"/>
                                    </svg>
                                    <input 
                                        v-model="filter.SEARCH" 
                                        class="form-input" 
                                        type="text"
                                        placeholder="Buscar por nombre de directorios..." />
                                </div>
                            </div>

                            <div class="filters-actions">
                                <button class="btn-search" @click="searchDirectorios()">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="M21 21l-4.35-4.35"/>
                                    </svg>
                                    Buscar
                                </button>
                                <button class="btn-create" @click="createDirectory">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                    Nuevo
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Directory actions when directory is visible -->
                    <div class="directory-actions-bar" v-if="visibleDirectorios.visible">
                        <button class="action-bar-btn" @click="saveNameDirectory">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Cambiar nombre
                        </button>
                        <button class="action-bar-btn action-bar-btn-delete" @click="deleteDirectorys">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                            Eliminar
                        </button>
                    </div>

                    <!-- Directories Grid -->
                    <div v-if="visibleDirectorios.visible" class="directories-grid">
                        <div 
                            v-for="(item, index) in directoriosUser" 
                            :key="index" 
                            class="directory-card"
                            @click="isVisibleTable(item)">
                            <div class="directory-card-header">
                                <div class="directory-icon-lg">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                                    </svg>
                                </div>
                                <div class="directory-checkbox">
                                    <input 
                                        type="checkbox" 
                                        @click.stop 
                                        @change="saveSelectedDirectory(item)"
                                        class="checkbox-input" />
                                </div>
                            </div>
                            <div class="directory-card-body">
                                <h4 class="directory-name">{{ item.label }}</h4>
                                <div class="directory-stats">
                                    <div class="stat-item">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                                            <polyline points="14 2 14 8 20 8"/>
                                        </svg>
                                        <span>{{ item.children.length }} {{ item.children.length == 1 ? 'documento' : 'documentos' }}</span>
                                    </div>
                                    <div class="stat-item">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                            <line x1="16" y1="2" x2="16" y2="6"/>
                                            <line x1="8" y1="2" x2="8" y2="6"/>
                                            <line x1="3" y1="10" x2="21" y2="10"/>
                                        </svg>
                                        <span>{{ item.fcrcn }}</span>
                                    </div>
                                </div>
                                <div class="directory-creator">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    <span>{{ item.ucrcn }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Back button and table view for selected directory -->
                    <div v-else class="directory-detail-view">
                        <button class="btn-back" @click="visibleDirectorios.visible = true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                            Regresar
                        </button>
                        <div class="documents-table-card">
                            <card-table 
                                :search="searchDocuments" 
                                :fields="fieldsDocumentos"
                                :items="dataDocuments" 
                                :grid="grid" 
                                :actions="actionsDocuments" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

            <ModalMostrarResolucion :openModal="openModal" :toggleModal="() => this.openModal = !this.openModal"
                :pdfUrl="pdfUrl" :data="rowData" :isFav="false" :role="role" />

            <ModalCompartirEntrada :openModal="openModalCompartir"
                :toggleModal="() => this.openModalCompartir = !this.openModalCompartir" :data="rowDataCompartir" />

            <ModalUsuariosCompartidos :openModal="openModalUsuariosCompartidos"
                :toggleModal="() => this.openModalUsuariosCompartidos = !this.openModalUsuariosCompartidos"
                :data="rowDataUsuariosCompartidos" />
    </section>

</template>

<script>
import { toast } from 'vue3-toastify';
import UserProxy from '../../proxies/UserProxy';
import AdminEntriesProxy from '../../proxies/AdminEntriesProxy';
import CardTable from "@/components/Cards/CardTable.vue";
import ModalMostrarResolucion from './Modales/ModalMostrarResolucion.vue';
import ModalCompartirEntrada from './Modales/ModalCompartirEntrada.vue';
import ModalUsuariosCompartidos from './Modales/ModalUsuariosCompartidos.vue';

export default {
    components: {
        CardTable,
        ModalMostrarResolucion,
        ModalCompartirEntrada,
        ModalUsuariosCompartidos
    },
    props: {
        role: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            // directorios
            visibleDirectorios: {
                visible: true,
            },
            isLoading: false,
            active: 'documentos',

            filter: {
                TYPE: "jurisprudences",
                IDDIRECTORIO: null,
                SEARCH: '',
                SHARED: 'T',
                CDESTDO: 'T',
            },
            grid: {
                items: [],
                currentPage: 1,
                perPage: 10,
                totalRows: 120,
                isLoading: true,
                pageOptions: [5, 10, 15, 50],
            },
            pdfUrl: '',
            openModal: false,
            rowData: {},

            openModalCompartir: false,
            rowDataCompartir: {},

            openModalUsuariosCompartidos: false,
            rowDataUsuariosCompartidos: {},

            selectedDirectorios: [],
            directorios: [],
            directoriosUser: [],
            dataDocuments: [],
            fieldsDocumentos: [
                // {
                //     key: "CHECK", label: 'CHECK',
                //     class: "text-center",
                // },
                {
                    key: "TITLEALT", label: 'Archivos',
                    formatter: (value, key, item) => {
                        return `
                        <div class="d-flex flex-column">
                            <p class="mb-0">
                                <small>${this.formatearNulidad(item.TITLEALT, 'Ingrese un titulo alternativo')}</small>
                            </p>
                            <p class="mb-0" style="color:#1864FF;">
                                <strong>${item.TITULO}</strong>
                            </p>
                        </div>
                        `
                    }
                },
                {
                    key: "AUTOR", label: 'Propietario',
                    formatter: (value, key, item) => {
                        return `
                        <div style="display: flex; align-items: center; gap: 5px">
                            <img src="${item.RTAFTO || 'https://placehold.co/50x50'}" alt="user" style="width: 50px; height: 50px; border-radius: 50%;cursor: pointer;" />
                            <p class="mb-0">
                                <small>${item?.PROP == 1 ? 'Yo' : this.formatearNulidad(item.AUTOR, 'Sin autor')}</small>
                            </p>
                        </div>
                        `
                    }
                },
                {
                    key: "FEDCN", label: 'Ult. Modificación',
                },
                {
                    key: "DDIRECTORIO", label: 'Directorio',
                    formatter: (value, key, item) => {
                        return `
                        <div style="background-color: #E7E7E6; border-radius: 5px; padding: 6px;">
                            <p class="mb-0" style="color:#262626;text-align: center;">
                              ${this.formatearNulidad(item.DDIRECTORIO, 'Sin directorio')}
                            </p>
                        </div>
                        `
                    }
                },
                { key: "ACCIONES", label: "Acciones", class: "text-center" },

            ],
            actionsDocuments: {
                checkeoud: {
                    label: "",
                    icon: "fas fa-check",
                    class: "btn-check",
                    action: null,
                    actionFull: null
                },
                view: {
                    label: "Ver",
                    icon: "fas fa-eye",
                    class: "btn-view",
                    action: null
                },
                shared: {
                    label: "Compartir",
                    icon: "fas fa-share-alt",
                    class: "btn-shared",
                    action: null,
                },
                users: {
                    label: "Usuarios",
                    icon: "fas fa-users",
                    class: "btn-users",
                    action: null,
                },
                delete: {
                    label: "Eliminar",
                    icon: "fas fa-trash",
                    class: "btn-delete",
                    action: null,
                },
                updateShared: {
                    label: "Actualizar",
                    icon: "fas fa-sync-alt",
                    class: "btn-update",
                    action: null,
                }
            },

        }
    },
    methods: {
        formatearNulidad(valor, defect = '-') {
            if ([undefined, null, 'null', 'undefined'].includes(valor)) {
                return defect;
            }

            return valor;
        },
        updateActive(tab) {
            this.active = tab;
        },
        formatearFecha(fecha) {
            if (!fecha) return '';
            const date = new Date(fecha);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        openModalWithData(item) {
            this.rowData = item;
            this.openModal = true;
        },
        setPalabras(palabra, cantidad = 15, isBandera = true) {
            if (!palabra) return "";
            return palabra.split(" ").slice(0, cantidad).join(" ") + (isBandera ? "..." : "") || "";
        },
        // DOCUMENTOS ...
        async searchDocuments() {
            this.grid.isLoading = true;
            await AdminEntriesProxy.searchFavorites({
                GLOBAL: this.filter.SEARCH,
                TYPE: this.filter.TYPE,
                ROWS: this.grid.perPage,
                INIT: this.grid.perPage * (this.grid.currentPage - 1),
                IDDIRECTORIO: this.filter.IDDIRECTORIO,
                SHARED: this.filter.SHARED,
            })
                .then((response) => {
                    this.dataDocuments = response.map((item) => {
                        return {
                            ...item,
                            checked: false,
                            DELITO: JSON.parse(item.DELITO),
                            OJURISDICCIONAL: JSON.parse(item.OJURISDICCIONAL),
                            OEMISOR: JSON.parse(item.OEMISOR),
                            TPONRMA: JSON.parse(item.TPONRMA),
                            RECURSO: JSON.parse(item.RECURSO),
                            AMBIT: JSON.parse(item.AMBIT),
                            JURISDICCION: JSON.parse(item.JURISDICCION),
                            MAGISTRATES: JSON.parse(item.MAGISTRATES),
                            FRESOLUTION: item.FRESOLUTION ? item.FRESOLUTION.split("T")[0] : null,
                            TEMA: ![null, undefined, ""].includes(item?.TEMA) ? item.TEMA : null,
                            SUBTEMA: ![null, undefined, ""].includes(item?.SUBTEMA) ? item.SUBTEMA : null,
                            SHORTSUMMARY: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? item.SHORTSUMMARY : null,
                            SHORTSUMMARY2: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? this.setPalabras(item.SHORTSUMMARY.replace(/<[^>]*>?/gm, ''), 18) : null,
                            SHORTSUMMARY3: ![null, undefined, ""].includes(item?.SHORTSUMMARY) ? this.setPalabras(item.SHORTSUMMARY.replace(/<[^>]*>?/gm, ''), 10000, false) : null,
                        }
                    });
                    this.grid.totalRows = response[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    toast.error(error?.MESSAGE || 'Error al cargar los documentos', { toastId: 'error-documentos' });
                })
                .finally(() => this.grid.isLoading = false);
        },

        // DIRECTORIOS ... 
        async searchDirectorios() {
            this.isLoading = true;
            await UserProxy.listDirectory({
                TYPE: this.filter.TYPE,
                DSCRPCN: this.filter.SEARCH,
            })
                .then((response) => {
                    this.directoriosUser = response?.map((item) => {
                        let childrens = JSON.parse(item.ENTRADAS) || [];
                        return {
                            key: item.id,
                            fcrcn: this.formatearFecha(item.FCRCN),
                            label: item.DSCRPCN,
                            icon: 'fa fa-folder',
                            isDirectory: true,
                            ucrcn: item.UCRCN,
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
                    this.directoriosUser = [];
                })
                .finally(() => this.isLoading = false);
        },
        async getDirectorios() {
            await UserProxy.listDirectoryAll()
                .then((response) => {
                    if (response.length > 0) {
                        response.unshift({
                            ID: null,
                            DSCRPCN: "-- Seleccione",
                        });
                    }
                    this.directorios = (typeof response === 'string') ? [] : response
                })
                .catch(() => {
                    this.directorios = [];
                    toast.error("Error al obtener los directorios");
                })
                .finally(() => this.isLoading = false);
        },

        // * ACTIONS ... 
        saveSelectedDirectory(item) {
            if (this.selectedDirectorios.some((i) => i.directorio === item.directorio)) {
                this.selectedDirectorios = this.selectedDirectorios.filter((i) => i.directorio !== item.directorio);
            } else {
                this.selectedDirectorios.push(item);
            }
        },
        async createDirectory() {
            this.$swal({
                title: "Crear directorio",
                html: `¿Está seguro de que desea crear un nuevo directorio?`,
                input: "text",
                inputPlaceholder: "Nombre del directorio",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "No, cancelar",
                confirmButtonText: "Sí, crear",
                inputValidator: (value) => {
                    if (!value) {
                        return "Debe ingresar un nombre";
                    }
                },
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    this.isLoading = true;
                    await UserProxy.createDirectory({
                        DSCRPCN: result.value,
                        CDESTDO: 'A'
                    })
                        .then((response) => {
                            if (response.STATUS) {
                                toast.success("Directorio creado con éxito");
                                this.searchDirectorios();
                                this.getDirectorios();
                            } else {
                                toast.error(response.MESSAGE);
                            }
                        })
                        .catch((err) => toast.error(err?.MESSAGE || 'Error al crear el directorio'))
                        .finally(() => this.isLoading = false);
                }
            }).catch((err) => toast.error(err?.MESSAGE || 'Error al crear el directorio'));
        },
        async saveNameDirectory() {
            if (this.selectedDirectorios.length === 0) {
                toast.warning("Debes seleccionar un directorio");
                return;
            }

            if (this.selectedDirectorios.length > 1) {
                toast.warning("Solo puedes cambiar el nombre de un directorio a la vez");
                return;
            }

            this.$swal({
                title: "Cambiar nombre",
                html: `¿Está seguro de que desea cambiar el nombre del directorio <strong>${this.selectedDirectorios[0].label}</strong>?`,
                input: "text",
                inputPlaceholder: "Nuevo nombre del directorio",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "No, cancelar",
                confirmButtonText: "Sí, cambiar",
                inputValidator: (value) => {
                    if (!value) {
                        return "Debe ingresar un nuevo nombre";
                    }
                },
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    this.isLoading = true;

                    await UserProxy.updateDirectory({
                        ID: this.selectedDirectorios[0].directorio,
                        DSCRPCN: result.value,
                    })
                        .then((response) => {
                            if (response.STATUS) {
                                toast.success("Nombre cambiado con éxito");
                                this.searchDirectorios();
                            } else {
                                toast.error(response.MESSAGE);
                            }
                        })
                        .catch((err) => toast.error(err?.MESSAGE || 'Error al cambiar el nombre'))
                        .finally(() => this.isLoading = false);
                }
            }).catch((err) => toast.error(err?.MESSAGE || 'Error al cambiar el nombre'));

        },
        async deleteDirectorys() {
            if (this.selectedDirectorios.length === 0) {
                toast.warning("Debes seleccionar un directorio");
                return;
            }

            this.$swal({
                title: "Eliminar directorios",
                html: `<p>¿Está seguro de que desea eliminar ${this.selectedDirectorios.length} directorios?<p>
                <p style="color: red;font-size: 11px;">
                    Si elimina un directorio, se eliminarán todos los documentos que contenga la carpeta
                </p>    
                <ul style="list-style: none; padding-left: 0;">
                    ${this.selectedDirectorios.map((item) => `<li
                        style="padding: 5px 0; font-size: 14px; color: #000000;">
                        <i class="fa fa-folder"></i>
                        <strong>${item.label}</strong>
                    </li>`).join('')}
                </ul>
                    `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "No, cancelar",
                confirmButtonText: "Sí, eliminar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.isLoading = true;
                    let DIRECTORIOS_STRING = this.selectedDirectorios
                        .map((item) => item.directorio)
                        .filter((val) => /^[0-9]+$/.test(val))
                        .join(',');

                    await UserProxy.deleteDirectory(
                        DIRECTORIOS_STRING,
                    )
                        .then((response) => {
                            if (response.STATUS) {
                                toast.success("Directorios eliminados con éxito");
                                this.searchDirectorios();
                                this.selectedDirectorios = [];
                            } else {
                                toast.error(response.MESSAGE);
                            }
                        })
                        .catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar los directorios'))
                        .finally(() => this.isLoading = false);
                }
            }).catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar los directorios'));
        },
        async updateSharedActions(item) {
            if (item.IDENTRIE === null || item.IDENTRIE === null) {
                toast.warning("No se puede actualizar el documento");
                return;
            }

            if (this.directorios.length === 0) {
                toast.warning("No hay directorios disponibles");
                return;
            }

            if (item.ID === null || item.ID === null) {
                toast.warning("No se puede actualizar el documento");
                return;
            }

            this.$swal.fire({
                title: "Actualizar Datos",
                html: `
                    <div class="row" style="text-align: left;">
                        <div class="col-md-12 mb-3">
                            <label
                            class="mb-1"
                            style="text-align: left; font-size: 14px; color: #000000;"
                            for="swal-input-name">Nombre del directorio</label>
                            <select 
                            value="${item.IDDIRECTORIO || ''}"
                            id="swal-select-status" class="swal2-select"
                            style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; width: 100%;">
                                ${this.directorios.map((directory) => `
                                    <option 
                                    ${item.IDDIRECTORIO === directory.ID ? 'selected' : ''}
                                    value="${directory.ID}">${directory.DSCRPCN}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label 
                            class="mb-1"
                            style="text-align: left; font-size: 14px; color: #000000;"
                            for="swal-input-name">Titulo alternativo</label>
                            <input 
                                value="${item.TITLEALT || ''}"
                                id="swal-input-name" class="m-0 swal2-input" placeholder="Ingrese un nombre"
                                style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; width: 100%;" />
                        </div>
                    </div>
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "No, cancelar",
                confirmButtonText: "Sí, guardar",
                customClass: {
                    popup: 'crear-directorio-swal'
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    let name = document.getElementById('swal-input-name').value.trim();
                    let directorio = document.getElementById('swal-select-status').value;

                    if (['null', 'undefined', undefined].includes(directorio)) {
                        directorio = 0;
                    }

                    if ([null, undefined, ''].includes(name)) {
                        name = "";
                    }

                    await UserProxy.saveAddDirectory({
                        IDDIRECTORIO: directorio,
                        IDENTRIE: item.IDENTRIE,
                        TITLEALT: name,
                        IDFAV: item.ID,
                    })
                        .then((response) => {
                            if (response.STATUS) {
                                toast.success("Datos actualizados con éxito");
                                this.searchDocuments();
                                return true;
                            } else {
                                toast.error(response.MESSAGE);
                            }
                        })
                        .catch((err) => {
                            toast.error(err?.MESSAGE || 'Error al actualizar los datos')
                            return false;
                        })
                        .finally(() => this.isLoading = false);
                }
            })
        },
        isVisibleTable(item) {
            this.filter.IDDIRECTORIO = item.directorio;
            this.filter.SEARCH = '';
            this.filter.SHARED = 'T';
            this.visibleDirectorios.visible = false;
        },
    },
    // escucha de active
    watch: {
        active(newValue) {
            this.filter.SEARCH = '';
            this.filter.IDDIRECTORIO = null;
            this.filter.SHARED = 'T';
            if (newValue === 'documentos') {
                this.searchDocuments();
                this.getDirectorios();
            } else if (newValue === 'directorios') {
                this.visibleDirectorios.visible = true;
                this.searchDirectorios();
            }
        },
    },
    mounted() {
        this.searchDocuments();
        this.getDirectorios();

        this.actionsDocuments = {
            ...this.actionsDocuments,
            execute: {
                action: (item) => {
                    this.openModalWithData(item);
                }
            },
            view: {
                ...this.actionsDocuments.view,
                action: (item) => {
                    this.openModalWithData(item);
                }
            },
            delete: {
                ...this.actionsDocuments.delete,
                action: (item) => {
                    this.$swal({
                        title: "Eliminar documento",
                        html: `
                            ¿Está seguro de que desea eliminar el documento <strong>${item.TITULO}</strong>?
                            ${item.CANT > 0 ? `<p style="color: #FF0000;">Este documento se ha compartido con ${item.CANT} usuarios, si lo elimina, se eliminará para todos los usuarios que lo tengan compartido.
                                </p>` : ''}
                        `,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "No, cancelar",
                        confirmButtonText: "Sí, eliminar",
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            this.isLoading = true;
                            await UserProxy.deleteFavorite(item.ID)
                                .then((response) => {
                                    if (response.STATUS) {
                                        toast.success("Entrada eliminada de favoritos con éxito");
                                        this.searchDocuments();
                                    } else {
                                        toast.error(response.MESSAGE);
                                    }
                                })
                                .catch((err) => {
                                    toast.error(err?.MESSAGE || 'Error al eliminar la entrada de favoritos')
                                })
                                .finally(() => this.isLoading = false);
                        }
                    }).catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar la entrada de favoritos'));
                }
            },
            checkeoud: {
                ...this.actionsDocuments.checkeoud,
                action: (check, item) => {
                    this.dataDocuments = this.dataDocuments.map((doc) => {
                        if (doc.ID === item.ID) {
                            return {
                                ...doc,
                                checked: check
                            }
                        }
                        return doc;
                    });
                },
                actionFull: (check) => {
                    this.dataDocuments = this.dataDocuments.map((item) => {
                        return {
                            ...item,
                            checked: check
                        }
                    });
                }
            },
            shared: {
                ...this.actionsDocuments.shared,
                action: (item) => {
                    this.rowDataCompartir = item;
                    this.openModalCompartir = true;
                }
            },
            users: {
                ...this.actionsDocuments.users,
                action: (item) => {
                    this.rowDataUsuariosCompartidos = item;
                    this.openModalUsuariosCompartidos = true;
                }
            },
            updateShared: {
                ...this.actionsDocuments.updateShared,
                action: (item) => {
                    this.updateSharedActions(item);
                }
            }
        }
    },

}
</script>

<style scoped>
/* ===== FAVORITES MODERN UI ===== */
.favorites-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
    padding-bottom: 4rem;
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.favorites-header {
    background: white;
    border-bottom: 1px solid #E5E7EB;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
    margin-bottom: 2rem;
}

.favorites-header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.header-title-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.header-icon,
.favorites-icon {
    flex-shrink: 0;
    color: #185CE6;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.favorites-title {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
}

.favorites-subtitle {
    color: #6B7280;
    font-size: 0.95rem;
    margin: 0.25rem 0 0 0;
}

.favorites-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.tabs-modern {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 0.5rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tab-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: transparent;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    color: #6B7280;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-button svg {
    transition: transform 0.3s ease;
}

.tab-button:hover {
    background: rgba(24, 92, 230, 0.05);
    color: #185CE6;
}

.tab-button:hover svg {
    transform: translateY(-2px);
}

.tab-button.active,
.tab-button.tab-active {
    background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
    color: white !important;
    box-shadow: 0 4px 15px rgba(223, 45, 178, 0.3);
}

.tab-button.active:hover,
.tab-button.tab-active:hover {
    background: linear-gradient(135deg, #c528a0 0%, #1450c9 100%);
}

.tab-content {
    min-height: 400px;
}

.fade-in {
    animation: fadeIn 0.4s ease-in;
}

.filters-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.filters-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f7fafc;
}

.filters-header svg {
    color: #E71FB3;
}

.filters-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a202c;
    margin: 0;
}

.filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    align-items: end;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group-full {
    grid-column: 1 / -1;
}

.form-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 0.5rem;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 1rem;
    color: #a0aec0;
    pointer-events: none;
    z-index: 1;
}

.form-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 1rem;
    color: #2d3748;
    background: white;
    transition: all 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: #E71FB3;
    box-shadow: 0 0 0 3px rgba(231, 31, 179, 0.1);
}

.form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 3rem;
    cursor: pointer;
}

.filters-actions {
    display: flex;
    gap: 1rem;
}

.btn-search, .btn-create {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-search {
    background: linear-gradient(135deg, #E71FB3 0%, #FF6B9D 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(231, 31, 179, 0.3);
}

.btn-search:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 31, 179, 0.4);
}

.btn-create {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

.btn-create:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
}

.documents-table-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.directory-actions-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.action-bar-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #f7fafc;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-weight: 600;
    color: #2d3748;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-bar-btn:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
}

.action-bar-btn-delete {
    color: #e53e3e;
}

.directories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.directory-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
}

.directory-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #E71FB3;
}

.directory-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.directory-icon-lg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #E71FB3 0%, #FF6B9D 100%);
    border-radius: 12px;
}

.directory-icon-lg svg {
    color: white;
}

.checkbox-input {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: #E71FB3;
}

.directory-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 1rem;
}

.directory-stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #718096;
}

.directory-creator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #718096;
    padding-top: 0.75rem;
    border-top: 1px solid #e2e8f0;
}

.btn-back {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    margin-bottom: 1.5rem;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-weight: 600;
    color: #2d3748;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-back:hover {
    background: #f7fafc;
    transform: translateX(-4px);
}

@media (max-width: 768px) {
    .favorites-container { padding: 1rem; }
    .filters-grid { grid-template-columns: 1fr; }
    .directories-grid { grid-template-columns: 1fr; }
}
</style>