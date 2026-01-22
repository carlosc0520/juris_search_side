<template>
    <b-modal id="modal-resolucion-visualizar" v-model="show" title="" hide-footer centered size="xl" modal-class="custom-modal">
        <!-- Botones de navegación laterales -->
        <button 
            v-if="show && showNavigation"
            @click="$emit('navigate', 'prev')" 
            :disabled="currentIndex <= 0"
            class="nav-btn-side nav-prev-side"
            title="Anterior (Resultado {{ currentIndex }} de {{ totalResults }})">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button 
            v-if="show && showNavigation"
            @click="$emit('navigate', 'next')" 
            :disabled="currentIndex >= totalResults - 1"
            class="nav-btn-side nav-next-side"
            title="Siguiente (Resultado {{ currentIndex + 2 }} de {{ totalResults }})">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>

        <div class="modal-header-custom">
            <h4 class="text-title">
                {{ datos.TITULO }}
            </h4>

            <p class="text-subtitle" v-if="!isFav">
                <span>{{ datos.TITLEALT }}</span>
            </p>
        </div>

        <b-tabs content-class="mt-4" v-model="activeTab" class="custom-tabs">
            <!-- TAB 1 -->
            <b-tab event-key="tab1" title="Documento" active>
                <b-row class="g-4">
                    <!-- Primera columna -->
                    <b-col v-if="datos.TYPE == 'jurisprudences'" cols="12" lg="4">
                        <div class="info-card">
                            <b-list-group class="info-list">
                                <b-list-group-item><strong>Delito:</strong>
                                    <span>{{datos.DELITO?.length > 0 ? datos.DELITO?.map(d => d.DESCP).join(', ') :
                                        '-'}}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Órgano Jurisdiccional:</strong>
                                    <span>{{datos.OJURISDICCIONAL?.length > 0 ? datos.OJURISDICCIONAL?.map(o =>
                                        o.DESCP).join(', ') : '-'}}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Tema:</strong>
                                    <p v-html="datos.TEMA"></p>
                                </b-list-group-item>
                                <b-list-group-item><strong>Subtema:</strong>
                                    <p v-html="datos.SUBTEMA"></p>
                                </b-list-group-item>
                                <b-list-group-item><strong>Palabras Clave:</strong>
                                    <span>{{datos.KEYWORDS?.split(',').map(p => p.trim()).join(', ')}}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Fecha Resolución:</strong>
                                    <span>{{ formateReverse(datos.FRESOLUTION) }}</span>
                                </b-list-group-item>
                            </b-list-group>

                            <div class="action-buttons" v-if="['2', '3', '4'].includes(role?.IDPLN)">
                                <button v-if="datos.IDFAV == null && isFav" @click="addFavorite(datos)"
                                    class="favorito-btn">
                                    <span class="favorito-icon">☆</span>
                                    <span class="favorito-text">Agregar a favoritos</span>
                                </button>
                                
                                <button v-if="datos.IDFAV != null && isFav" @click="deleteFavorite(datos)"
                                    class="favorito-btn favorito-active">
                                    <span class="favorito-icon">★</span>
                                    <span class="favorito-text">Quitar de favoritos</span>
                                </button>

                                <button class="button-download" @click="descargarResolucion(1)">
                                    <img src="@/assets/img/icons/download.svg" alt="Descargar"
                                        class="descargar-icon">
                                    <span>Descargar Resolución</span>
                                </button>
                            </div>
                        </div>
                    </b-col>

                    <b-col v-if="datos.TYPE != 'jurisprudences'" cols="12" lg="4">
                        <div class="info-card">
                            <b-list-group class="info-list">
                                <b-list-group-item><strong>Numeración:</strong>
                                    <span>{{ datos.NMRCN }}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Denominación oficial:</strong>
                                    <span>{{ datos.RTITLE }}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Tipo de Norma:</strong>
                                    <span>{{datos.TPONRMA?.length > 0 ? datos.TPONRMA?.map(o => o.DESCP).join(', ') :
                                        '-'}}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Órgano emisor:</strong>
                                    <span>{{datos.OEMISOR?.length > 0 ? datos.OEMISOR?.map(o => o.DESCP).join(', ') :
                                        '-'}}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Fecha de publicación:</strong>
                                    <span>{{ formateReverse(datos.FRESOLUTION) }}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Estado:</strong>
                                    <span>{{ datos.SITUACION }}</span>
                                </b-list-group-item>
                            </b-list-group>

                            <div class="action-buttons" v-if="['2', '3', '4'].includes(role?.IDPLN)">
                                <button v-if="datos.IDFAV == null" @click="addFavorite(datos)"
                                    class="favorito-btn">
                                    <span class="favorito-icon">☆</span>
                                    <span class="favorito-text">Agregar a favoritos</span>
                                </button>
                                
                                <button v-if="datos.IDFAV != null" @click="deleteFavorite(datos)"
                                    class="favorito-btn favorito-active">
                                    <span class="favorito-icon">★</span>
                                    <span class="favorito-text">Quitar de favoritos</span>
                                </button>

                                <button class="button-download" @click="descargarResolucion(1)">
                                    <img src="@/assets/img/icons/download.svg" alt="Descargar"
                                        class="descargar-icon">
                                    <span>Descargar Resolución</span>
                                </button>
                            </div>
                        </div>
                    </b-col>

                    <!-- Segunda columna -->
                    <b-col cols="12" lg="8">
                        <div class="pdf-container">
                            <!-- Efecto de carga -->
                            <div v-if="!pdfUrl || isLoadingNavigation" class="pdf-loader">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Cargando...</span>
                                </div>
                                <p class="loading-text">{{ isLoadingNavigation ? 'Cargando siguiente documento...' : 'Cargando documento...' }}</p>
                            </div>

                            <!-- PDF -->
                            <iframe v-else
                                :src="pdfUrl + '#zoom=100&view=fitH' + (['2', '3', '4'].includes(role?.IDPLN) ? '' : '&controls=0&toolbar=0')"
                                class="pdf-viewer"></iframe>
                        </div>
                    </b-col>
                </b-row>
            </b-tab>

            <!-- TAB 2 -->
            <b-tab v-if="datos.TYPE == 'jurisprudences' && ['2', '3', '4'].includes(role?.IDPLN)" event-key="tab2" title="Resumen Ejecutivo">
                <b-row class="g-4">
                    <!-- Primera columna -->
                    <b-col cols="12" lg="4">
                        <div class="info-card">
                            <b-list-group class="info-list">
                                <b-list-group-item><strong>Tipo de Recurso:</strong>
                                    <span>{{datos.RECURSO?.length > 0 ? datos.RECURSO?.map(d => d.DESCP).join(', ') :
                                        '-'}}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Delitos:</strong>
                                    <span>{{datos.DELITO?.length > 0 ? datos.DELITO?.map(d => d.DESCP).join(', ') :
                                        '-'}}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Vinculante:</strong>
                                    <span>{{ datos.INDICADOR ? 'Sí' : 'No' }}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Tema:</strong>
                                    <p v-html="datos.TEMA"></p>
                                </b-list-group-item>
                                <b-list-group-item><strong>Subtema:</strong>
                                    <p v-html="datos.SUBTEMA"></p>
                                </b-list-group-item>
                                <b-list-group-item><strong>Palabras Clave:</strong>
                                    <span>{{datos.KEYWORDS?.split(',').map(p => p.trim()).join(', ')}}</span>
                                </b-list-group-item>
                                <b-list-group-item><strong>Fecha Resolución:</strong>
                                    <span>{{ formateReverse(datos.FRESOLUTION) }}</span>
                                </b-list-group-item>
                            </b-list-group>

                            <div class="action-buttons" v-if="['2', '3', '4'].includes(role?.IDPLN)">
                                <button class="button-download-outline" @click="descargarResolucion(2)">
                                    <img src="@/assets/img/icons/download-dark.svg" alt="Descargar"
                                        class="descargar-icon">
                                    <span>Descargar Resumen</span>
                                </button>
                            </div>
                        </div>
                    </b-col>

                    <!-- Segunda columna -->
                    <b-col cols="12" lg="8">
                        <div class="pdf-container">
                            <div v-if="!pdfUrlResumen || isLoadingNavigation" class="pdf-loader">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Cargando...</span>
                                </div>
                                <p class="loading-text">{{ isLoadingNavigation ? 'Cargando siguiente resumen...' : 'Cargando resumen...' }}</p>
                            </div>
                            
                            <iframe v-else :src="pdfUrlResumen + '#zoom=100&view=fitH' + (['2', '3', '4'].includes(role?.IDPLN) ? '' : '&controls=0&toolbar=0')"
                                class="pdf-viewer"></iframe>
                        </div>
                    </b-col>
                </b-row>
            </b-tab>
        </b-tabs>
    </b-modal>
</template>

<script>
import { BModal, BTabs, BTab, BRow, BCol, BListGroup, BListGroupItem } from 'bootstrap-vue-next';
import AdminEntriesProxy from '../../../proxies/AdminEntriesProxy';
import { toast } from 'vue3-toastify';
import createPDFHelper from "../../../assets/helpers/generatePdfHelper.js";
import { ref } from "vue";
import UserProxy from '../../../proxies/UserProxy.js';

export default {
    name: "ModalMostrarResolucion",
    props: {
        openModal: {
            type: Boolean,
            default: false
        },
        toggleModal: {
            type: Function,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        isFav: {
            type: Boolean,
            default: true
        },
        role: {
            type: Object,
            default: () => { }
        },
        currentIndex: {
            type: Number,
            default: 0
        },
        totalResults: {
            type: Number,
            default: 0
        },
        showNavigation: {
            type: Boolean,
            default: false
        }
    },
    components: {
        BModal,
        BTabs, BTab, BRow, BCol, BListGroup, BListGroupItem
    },
    data() {
        return {
            show: false,
            activeTab: ref("tab1"),
            pdfUrl: '',
            pdfUrlResumen: '',
            isLoadingNavigation: false,
            datos: {
                pretension: '',
                organo: '',
                tema: '',
                subtema: '',
                palabrasClave: '',
                fechaResolucion: ''
            },
        };
    },
    methods: {
        formateReverse(date) {
            try {
                if (!date) return null;
                const parts = date.split('-');
                return `${parts[2]}-${parts[1]}-${parts[0]}`;
            } catch (error) {
                console.error("Error al formatear la fecha:", error);
                return null;
            }
        },
        async print(path) {
            await AdminEntriesProxy.downloadFile({
                PATH: path
            })
                .then(async (response) => {
                    const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
                    this.pdfUrl = url;
                })
                .catch(() => {
                    toast.error("Ocurrió un error al descargar el archivo", { toastId: "error" });
                })
        },
        async printResumen(item) {
            try {
                this.pdfUrlResumen = "data:application/pdf;base64," + (await createPDFHelper.generate(item, true));
            } catch (error) {
                console.error("Error al generar el PDF:", error);
            }
        },
        descargarResolucion(tipo) {
            if (tipo === 1) {
                const linkSource = this.pdfUrl;
                const downloadLink = document.createElement("a");
                const fileName = this.data.TITULO + " - Resolución.pdf";
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
            } else {
                const linkSource = this.pdfUrlResumen;
                const downloadLink = document.createElement("a");
                const fileName = this.data.TITULO + " - Resumen.pdf";
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
            }
        },
        async addFavorite(item) {
            if (item.IDFAV) return

            this.isLoading = true;
            await UserProxy.addFavorite(item.ID)
                .then((response) => {
                    const toastMessage = response.MESSAGE;
                    if (response.STATUS) {
                        toast.success("Documento agregado a favoritos", { toastId: "success" });
                        item.IDFAV = 1;
                    }
                    else toast.error(toastMessage, { toastId: "error" });
                })
                .catch(() => {
                    toast.error("Ocurrió un error al agregar a favoritos", { toastId: "error" });
                })
                .finally(() => this.isLoading = false);
        },
        async deleteFavorite(item) {
            let IDENTRIE = item.ID;
            this.isLoading = true;
            await UserProxy.addFavorite(IDENTRIE)
                .then((response) => {
                    const toastMessage = response.MESSAGE;
                    if (response.STATUS) {
                        toast.success("Documento eliminado de favoritos");
                        item.IDFAV = null;
                    } else {
                        toast.error(toastMessage);
                    }
                })
                .catch((error) => toast.error(error?.MESSAGE || 'Error al eliminar de favoritos', { toastId: 'error-delete' }))
                .finally(() => this.isLoading = false);
        },
    },
    watch: {
        openModal() {
            this.show = this.openModal;
        },
        data: {
            async handler(newVal) {
                if (newVal && this.show) {
                    this.isLoadingNavigation = true;
                    this.pdfUrl = '';
                    this.pdfUrlResumen = '';
                    this.datos = newVal;
                    
                    try {
                        await this.print(newVal.ENTRIEFILE);
                        await this.printResumen(newVal);
                    } finally {
                        this.isLoadingNavigation = false;
                    }
                }
            },
            deep: true
        },
        show(val) {
            if (!val) {
                this.toggleModal();
                this.pdfUrl = '';
                this.pdfUrlResumen = '';
                this.datos = {}
                this.activeTab = "tab1";

            } else {
                this.print(this.data.ENTRIEFILE);
                this.printResumen(this.data);
                this.datos = this.data
            }
        },
    }
}
</script>

<style scoped>
/* Modal Header */
.modal-header-custom {
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #f0f0f0;
    margin-bottom: 1rem;
}

/* Botones de navegación laterales */
.nav-btn-side {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid #dee2e6;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1060;
    backdrop-filter: blur(10px);
}

.nav-prev-side {
    left: 20px;
}

.nav-next-side {
    right: 20px;
}

.nav-btn-side:hover:not(:disabled) {
    background: #f8f9fa;
    border-color: #1864FF;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(24, 100, 255, 0.25);
}

.nav-btn-side:active:not(:disabled) {
    transform: translateY(-50%) scale(0.95);
}

.nav-btn-side:disabled {
    background: rgba(233, 236, 239, 0.5);
    border-color: #dee2e6;
    cursor: not-allowed;
    opacity: 0.4;
}

.nav-btn-side svg {
    stroke: #495057;
    transition: stroke 0.3s ease;
}

.nav-btn-side:hover:not(:disabled) svg {
    stroke: #1864FF;
}

.nav-btn-side:disabled svg {
    stroke: #adb5bd;
}

@media (max-width: 768px) {
    .nav-btn-side {
        width: 40px;
        height: 40px;
    }
    
    .nav-prev-side {
        left: 10px;
    }
    
    .nav-next-side {
        right: 10px;
    }
}

.text-title {
    font-family: 'Lato', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1864FF;
    margin-bottom: 0.5rem;
    line-height: 1.4;
}

.text-subtitle {
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    color: #6c757d;
    margin-bottom: 0;
    margin-top: 0.5rem;
}

/* Custom Tabs */
.custom-tabs :deep(.nav-tabs) {
    border-bottom: 2px solid #e9ecef;
    gap: 0.5rem;
}

.custom-tabs :deep(.nav-link) {
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    color: #6c757d;
    border: none;
    border-bottom: 3px solid transparent;
    padding: 0.75rem 1.5rem;
    transition: all 0.3s ease;
}

.custom-tabs :deep(.nav-link:hover) {
    color: #1864FF;
    border-bottom-color: #1864FF;
}

.custom-tabs :deep(.nav-link.active) {
    color: #1864FF;
    background: transparent;
    border-bottom-color: #1864FF;
}

/* Info Card */
.info-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    height: 100%;
    transition: box-shadow 0.3s ease;
}

.info-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* List Group */
.info-list {
    --bs-list-group-border-width: 0;
    margin-bottom: 1.5rem;
}

.list-group-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0;
    border-bottom: 1px solid #f0f0f0 !important;
    background: transparent;
    transition: background-color 0.2s ease;
}

.list-group-item:last-child {
    border-bottom: none !important;
}

.list-group-item strong {
    color: #495057;
    font-family: 'Lato', sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.list-group-item span,
.list-group-item p {
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    font-weight: 400;
    color: #212529;
    line-height: 1.6;
    margin: 0;
}

/* Action Buttons Container */
.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 2px solid #f0f0f0;
}

/* Favorito Button */
.favorito-btn {
    font-family: 'Lato', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    background: #fff;
    color: #666;
    border: 1.5px solid #e0e0e0;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    transition: all 0.2s ease;
}

.favorito-btn:hover {
    border-color: #ffc107;
    background: #fffbf0;
    color: #333;
}

.favorito-btn.favorito-active {
    background: #fff8e1;
    border-color: #ffc107;
    color: #f57c00;
}

.favorito-btn.favorito-active:hover {
    background: #ffecb3;
}

.favorito-icon {
    font-size: 1.1rem;
    line-height: 1;
    transition: transform 0.2s ease;
}

.favorito-btn:hover .favorito-icon {
    transform: scale(1.15);
}

.favorito-btn.favorito-active .favorito-icon {
    color: #ffc107;
}

/* Download Button */
.button-download {
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    background: linear-gradient(135deg, #1864FF 0%, #0047CC 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(24, 100, 255, 0.3);
}

.button-download:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(24, 100, 255, 0.4);
    background: linear-gradient(135deg, #0047CC 0%, #003399 100%);
}

.button-download:active {
    transform: translateY(0);
}

/* Download Outline Button */
.button-download-outline {
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    background: white;
    border: 2px solid #1864FF;
    color: #1864FF;
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.button-download-outline:hover {
    background: #1864FF;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(24, 100, 255, 0.3);
}

.descargar-icon {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
}

.button-download:hover .descargar-icon,
.button-download-outline:hover .descargar-icon {
    transform: translateY(2px);
}

/* PDF Container */
.pdf-container {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1rem;
    height: calc(100vh - 150px);
    min-height: 600px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* PDF Loader */
.pdf-loader {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 8px;
    gap: 1rem;
}

.loading-text {
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    color: #6c757d;
    margin: 0;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}

/* PDF Viewer */
.pdf-viewer {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    background: white;
}

/* Responsive */
@media (max-width: 991px) {
    .info-card {
        margin-bottom: 1.5rem;
    }

    .pdf-container {
        height: 500px;
    }
}

@media (max-width: 768px) {
    .text-title {
        font-size: 1.25rem;
    }

    .custom-tabs :deep(.nav-link) {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }

    .info-card {
        padding: 1rem;
    }

    .action-buttons {
        gap: 0.5rem;
    }

    .button-download,
    .button-download-outline,
    .favorito-btn {
        font-size: 0.85rem;
        padding: 0.65rem 1rem;
    }
}
</style>