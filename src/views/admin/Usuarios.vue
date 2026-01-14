<template>
    <section class="usuarios-container mt-4 pt-2">
        <!-- Header con Título -->
        <div class="usuarios-header">
            <div class="usuarios-header-content">
                <div class="header-title-section">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="header-icon">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <div>
                        <h1 class="usuarios-title">Usuarios</h1>
                        <p class="usuarios-subtitle">Gestión de subscriptores, digitadores y administradores</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="usuarios-content">
            <!-- Modern Tabs -->
            <div class="tabs-modern">
                <button
                    class="tab-button"
                    :class="{ 'tab-active': active === 'Subscriptores' }"
                    @click="updateActive('Subscriptores')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>
                    <span>Subscriptores</span>
                </button>
                <button
                    class="tab-button"
                    :class="{ 'tab-active': active === 'Digitadores' }"
                    @click="updateActive('Digitadores')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Digitadores</span>
                </button>
                <button
                    class="tab-button"
                    :class="{ 'tab-active': active === 'Administradores' }"
                    @click="updateActive('Administradores')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>Administradores</span>
                </button>
            </div>

            <!-- Filtros Modernos -->
            <div class="filters-section">
                <div class="search-input-wrapper">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                        type="text"
                        class="modern-input"
                        :placeholder="`Buscar por nombres, apellidos o correo electrónico...`"
                        v-model="filter.NOMBRES"
                        id="name" />
                </div>

                <div class="select-wrapper">
                    <b-form-select
                        v-model="filter.CDESTDO"
                        class="modern-select"
                        :options="[
                            { text: '-- Seleccione Estado ', value: null },
                            { text: 'Activo', value: 'A' },
                            { text: 'Inactivo', value: 'I' }]">
                    </b-form-select>
                </div>

                <div class="button-group">
                    <button class="modern-btn btn-search" @click="search(grid.currentPage, grid.perPage)">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <span>Buscar</span>
                    </button>
                    <button class="modern-btn btn-create" @click="modalAgregarUsuario.show = true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        <span>Crear</span>
                    </button>
                </div>
            </div>

            <!-- Tabla -->
            <div class="table-section">
                <card-table :active="active" title="Usuarios" :search="search" :fields="fields" :items="data"
                    :grid="grid" :actions="actions" />
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
/* Container Principal */
.usuarios-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Header */
.usuarios-header {
    background: white;
    border-bottom: 1px solid #E5E7EB;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
    margin-bottom: 2rem;
}

.usuarios-header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.header-title-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.header-icon {
    flex-shrink: 0;
    color: #185CE6;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

.usuarios-title {
    font-family: Lato, sans-serif;
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
}

.usuarios-subtitle {
    font-family: Lato, sans-serif;
    color: #6B7280;
    font-size: 0.95rem;
    margin: 0.25rem 0 0 0;
}

/* Content */
.usuarios-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
}

/* Modern Tabs */
.tabs-modern {
    display: flex;
    gap: 12px;
    margin-bottom: 2rem;
    background: white;
    padding: 8px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.tab-button {
    flex: 1;
    padding: 14px 24px;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-family: Lato, sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.tab-button:hover {
    background: rgba(139, 92, 246, 0.08);
    color: #8B5CF6;
}

.tab-button.tab-active {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.tab-button svg {
    width: 20px;
    height: 20px;
}

/* Filters Section */
.filters-section {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    display: grid;
    grid-template-columns: 2fr 1fr auto;
    gap: 1rem;
    align-items: center;
}

/* Search Input */
.search-input-wrapper {
    position: relative;
    flex: 1;
}

.search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
}

.modern-input {
    width: 100%;
    padding: 12px 14px 12px 44px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-family: Lato, sans-serif;
    font-size: 15px;
    color: #1e293b;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #f8fafc;
}

.modern-input:focus {
    outline: none;
    border-color: #8B5CF6;
    background: white;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.modern-input::placeholder {
    color: #94a3b8;
}

/* Select Wrapper */
.select-wrapper {
    position: relative;
}

.modern-select {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-family: Lato, sans-serif;
    font-size: 15px;
    color: #1e293b;
    background: #f8fafc;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modern-select:focus {
    outline: none;
    border-color: #8B5CF6;
    background: white;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* Button Group */
.button-group {
    display: flex;
    gap: 10px;
}

.modern-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 12px;
    font-family: Lato, sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}

.modern-btn svg {
    width: 18px;
    height: 18px;
}

.btn-search {
    background: linear-gradient(135deg, #8B5CF6 0%, #185CE6 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.btn-search:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
}

.btn-create {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(223, 45, 178, 0.3);
}

.btn-create:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(223, 45, 178, 0.4);
}

/* Table Section */
.table-section {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Responsive */
@media (max-width: 768px) {
    .usuarios-header-content {
        padding: 0 1rem;
    }

    .header-title-section {
        gap: 1rem;
    }

    .header-icon {
        width: 24px;
        height: 24px;
    }

    .usuarios-title {
        font-size: 1.5rem;
    }

    .usuarios-subtitle {
        font-size: 0.85rem;
    }

    .usuarios-content {
        padding: 0 1rem 1rem;
    }

    .tabs-modern {
        flex-direction: column;
        gap: 8px;
    }

    .tab-button {
        width: 100%;
        padding: 12px 20px;
    }

    .filters-section {
        grid-template-columns: 1fr;
        padding: 1rem;
    }

    .button-group {
        width: 100%;
    }

    .modern-btn {
        flex: 1;
        justify-content: center;
    }
}
</style>