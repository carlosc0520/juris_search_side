<template>
    <section class="bg-landing mt-4 pt-5">
        <div class="container-table flex flex-col mt-4 pt-5">
            <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
                <a class="cursor-pointer tab-pointer" :class="active === 'documentos' ? 'active-tab' : ''"
                    @click="updateActive('documentos')">
                    <img src="@/assets/img/icons/documentos.svg" alt="favoritos" class="w-4 h-4 mr-2">
                    Documentos
                </a>
                <a class="cursor-pointer tab-pointer" :class="active === 'directorios' ? 'active-tab' : ''"
                    @click="updateActive('directorios')">
                    <img src="@/assets/img/icons/directorios.svg" alt="favoritos" class="w-4 h-4 mr-2">
                    Directorios
                </a>
            </div>

            <div class="row">
                <div class="col-12 mb-3 input-search" :class="active === 'documentos' ? 'col-md-6' : 'col-md-12'">
                    <img src="@/assets/img/icons/search.svg" alt="search" class="icon-search" />

                    <input type="text" class="form-control" style="height: 50px;"
                        :placeholder="active === 'documentos' ? 'Buscar por nombre documentos, título alternativo.' : 'Buscar por nombre de directorios'"
                        v-model="filter.SEARCH" id="name" />
                </div>

                <div class="col-md-3 col-12 mb-3" v-if="active === 'documentos'">
                    <b-form-select v-model="filter.IDDIRECTORIO" :options="[
                        ...directorios.map((item) => {
                            return {
                                text: item.DSCRPCN,
                                value: item.ID
                            }
                        })
                    ]">
                    </b-form-select>
                </div>

                <div class="col-md-3 col-12 mb-3" v-if="active === 'documentos'">
                    <b-form-select v-model="filter.SHARED" :options="[
                        { text: 'Todos', value: 'T' },
                        { text: 'Mis Documentos', value: 'M' },
                        { text: 'Documentos Compartidos', value: 'C' }
                    ]">
                    </b-form-select>
                </div>


                <div class="col-md-12 col-12 mb-3 btn-actions-view">
                    <button class="bton btn-search"
                        @click="active === 'documentos' ? searchDocuments() : searchDirectorios()">
                        Buscar
                    </button>
                    <button class="bton btn-create" @click="createDirectory" v-if="active === 'directorios'">
                        Nuevo
                    </button>
                </div>

                <div class="w-full mb-12">
                    <card-table v-if="active == 'documentos'" :search="searchDocuments" :fields="fieldsDocumentos"
                        :items="dataDocuments" :grid="grid" :actions="actionsDocuments" />
                </div>
            </div>

            <div class="row actions-container-tiem" v-if="active === 'directorios'">
                <div class="col-md-12 col-12 mb-3 class-actions">
                    <!-- <button>
                        <img src="@/assets/img/icons/shared.svg" alt="favoritos" class="w-4 h-4">
                        Compartir
                    </button> -->
                    <button @click="saveNameDirectory">
                        <img src="@/assets/img/icons/edit.svg" alt="favoritos" class="w-4 h-4">
                        Cambiar nombre
                    </button>
                    <button @click="deleteDirectorys">
                        <img src="@/assets/img/icons/delete.svg" alt="favoritos" class="w-4 h-4">
                        Eliminar
                    </button>
                </div>
                <div class="row g-0 col-12 class-antions-container">
                    <div v-for="(item, index) in directoriosUser" :key="index" class="col-md-3 col-12 mb-3">
                        <div class="card card-directorios">
                            <div class="card-body">
                                <div class="d-flex flex-column">
                                    <div class="contenedor-carpeta">
                                        <div class="contenedor-title-carpeta">
                                            <img src="@/assets/img/icons/carpeta.svg" alt="folder"
                                                class="icon-folder" />
                                            <h6 class="mb-0">
                                                {{ item.label }}
                                            </h6>
                                        </div>
                                        <input type="checkbox" @change="saveSelectedDirectory(item)"
                                            class="form-check-input" id="exampleCheck1" />
                                    </div>
                                    <div class="mt-5 contenedor-footer-carpeta">
                                        <p class="p-c1">
                                            {{ item.children.length }} {{ item.children.length == 1 ? 'documento' :
                                                'documentos' }}
                                        </p>
                                        <p class="p-c2">
                                            {{ item.fcrcn }}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="p-c3 m-0">
                                            Creado por: <span class=""> {{ item.ucrcn }} </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

            <ModalMostrarResolucion :openModal="openModal" :toggleModal="() => this.openModal = !this.openModal"
                :pdfUrl="pdfUrl" :data="rowData" :isFav="false" />

            <ModalCompartirEntrada :openModal="openModalCompartir"
                :toggleModal="() => this.openModalCompartir = !this.openModalCompartir" :data="rowDataCompartir" />

            <ModalUsuariosCompartidos :openModal="openModalUsuariosCompartidos"
                :toggleModal="() => this.openModalUsuariosCompartidos = !this.openModalUsuariosCompartidos"
                :data="rowDataUsuariosCompartidos" />
        </div>
    </section>

</template>

<script>
import { BFormSelect } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';
import UserProxy from '../../proxies/UserProxy';
import AdminEntriesProxy from '../../proxies/AdminEntriesProxy';
import CardTable from "@/components/Cards/CardTable.vue";
import ModalMostrarResolucion from './Modales/ModalMostrarResolucion.vue';
import ModalCompartirEntrada from './Modales/ModalCompartirEntrada.vue';
import ModalUsuariosCompartidos from './Modales/ModalUsuariosCompartidos.vue';

export default {
    components: {
        BFormSelect,
        CardTable,
        ModalMostrarResolucion,
        ModalCompartirEntrada,
        ModalUsuariosCompartidos
    },
    data() {
        return {
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
        }
    },
    // escucha de active
    watch: {
        active(newValue) {
            this.filter.SEARCH = '';
            this.filter.IDDIRECTORIO = null;
            this.filter.SHARED = 'T';
            if (newValue === 'documentos') {
                this.searchDocuments();
            } else if (newValue === 'directorios') {
                this.searchDirectorios();
            }
        }
    },
    mounted() {
        this.searchDocuments();
        this.getDirectorios();

        this.actionsDocuments = {
            ...this.actionsDocuments,
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
.tab-pointer {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
}

.contenedor-carpeta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contenedor-title-carpeta {
    display: flex;
    align-items: center;
    gap: 10px;
}

.contenedor-footer-carpeta {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.contenedor-footer-carpeta .p-c1 {
    font-size: 14px;
    color: #E71FB3;
}

.contenedor-footer-carpeta .p-c2 {
    font-size: 12px;
    color: #898987;
}

.p-c3 {
    font-size: 12px;
    color: #898987;
}

.class-actions {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
}

.class-actions button {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}


@media (min-width: 800px) {
    .class-antions-container {
        gap: 2rem !important
    }
}

@media (max-width: 759px) {
    .actions-container-tiem{
       --bs-gutter-y: 0.2rem;
         --bs-gutter-x: 0.2rem;
    }
}
</style>