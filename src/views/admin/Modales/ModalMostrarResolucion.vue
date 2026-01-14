<template>
    <b-modal id="modal-resolucion-visualizar" v-model="show" title="" hide-footer centered size="xl">
        <h4 class="text-title text-left">
            {{ datos.TITULO }}
        </h4>

        <p class="text-left" v-if="!isFav">
            <span>{{ datos.TITLEALT }}</span>
        </p>

        <b-tabs content-class="mt-3" v-model="activeTab">
            <!-- TAB 1 -->
            <b-tab event-key="tab1" title="Documento" active>
                <b-row>
                    <!-- Primera columna -->
                    <b-col v-if="datos.TYPE == 'jurisprudences'" cols="12" lg="4">
                        <b-list-group>
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
                            <b-list-group-item v-if="datos.IDFAV == null && ['2', '3', '4'].includes(role?.IDPLN)">
                                <div class="d-flex align-items-center mt-3">
                                    <button @click="addFavorite(datos)" v-if="isFav"
                                        class="favorito-btn d-flex align-items-center gap-2">
                                        <img src="@/assets/img/icons/estrella.svg" alt="Agregar a favoritos"
                                            class="favorito-icon">
                                        <span class="favorito-text fw-bold">Agregar a favoritos</span>
                                    </button>
                                </div>
                            </b-list-group-item>
                            <b-list-group-item v-if="datos.IDFAV != null && ['2', '3', '4'].includes(role?.IDPLN)">
                                <div class="d-flex align-items-center mt-3" v-if="isFav">
                                    <button @click="deleteFavorite(datos)"
                                        class="favorito-btn d-flex align-items-center gap-2">
                                        <img src="@/assets/img/icons/estrella-full.svg" alt="Quitar de favoritos"
                                            class="favorito-icon">
                                        <span class="favorito-text fw-bold">Quitar de favoritos</span>
                                    </button>
                                </div>
                            </b-list-group-item>
                        </b-list-group>

                        <div style="padding: 0.5rem 1rem;" v-if="['2', '3', '4'].includes(role?.IDPLN)">
                            <button class="mt-3 button-download" @click="descargarResolucion(1)">
                                Descargar Resolución <img src="@/assets/img/icons/download.svg" alt="Descargar"
                                    class="descargar-icon">
                            </button>
                        </div>

                    </b-col>

                    <b-col v-if="datos.TYPE != 'jurisprudences'" cols="12" lg="4">
                        <b-list-group>
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
                            <b-list-group-item v-if="datos.IDFAV == null && ['2', '3', '4'].includes(role?.IDPLN)">
                                <div class="d-flex align-items-center mt-3">
                                    <button @click="addFavorite(datos)"
                                        class="favorito-btn d-flex align-items-center gap-2">
                                        <img src="@/assets/img/icons/estrella.svg" alt="Agregar a favoritos"
                                            class="favorito-icon">
                                        <span class="favorito-text fw-bold">Agregar a favoritos</span>
                                    </button>
                                </div>
                            </b-list-group-item>
                            <b-list-group-item v-if="datos.IDFAV != null && ['2', '3', '4'].includes(role?.IDPLN)">
                                <div class="d-flex align-items-center mt-3">
                                    <button @click="deleteFavorite(datos)"
                                        class="favorito-btn d-flex align-items-center gap-2">
                                        <img src="@/assets/img/icons/estrella-full.svg" alt="Quitar de favoritos"
                                            class="favorito-icon">
                                        <span class="favorito-text fw-bold">Quitar de favoritos</span>
                                    </button>
                                </div>
                            </b-list-group-item>

                        </b-list-group>

                        <div style="padding: 0.5rem 1rem;" v-if="['2', '3', '4'].includes(role?.IDPLN)">
                            <button class="mt-3 button-download" @click="descargarResolucion(1)">
                                Descargar Resolución <img src="@/assets/img/icons/download.svg" alt="Descargar"
                                    class="descargar-icon">
                            </button>
                        </div>

                    </b-col>

                    <!-- Segunda columna -->
                    <b-col cols="12" lg="8">
                        <div class="col-pdf">

                            <!-- Efecto de carga -->
                            <div v-if="!pdfUrl" class="pdf-loader">
                                <div class="skeleton"></div>
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
            <b-tab v-if="datos.TYPE == 'jurisprudences'
                && ['2', '3', '4'].includes(role?.IDPLN)
            " event-key="tab2" title="Resumen Ejecutivo">
                <b-row>
                    <!-- Primera columna -->
                    <b-col cols="12" lg="4">
                        <b-list-group>
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

                        <div style="padding: 0.5rem 1rem;" v-if="['2', '3', '4'].includes(role?.IDPLN)">
                            <button class="mt-3 button-download-2" @click="descargarResolucion(2)">
                                Descargar Resumen <img src="@/assets/img/icons/download-dark.svg" alt="Descargar"
                                    class="descargar-icon">
                            </button>
                        </div>

                    </b-col>

                    <!-- Segunda columna -->
                    <b-col cols="12" lg="8">
                        <div class="col-pdf">
                            <iframe :src="pdfUrlResumen + '#zoom=100&view=fitH' + (['2', '3', '4'].includes(role?.IDPLN) ? '' : '&controls=0&toolbar=0')"
                                style="border: 1px solid black; width: 100%; height: 100vh"></iframe>
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
.text-primary {
    color: #007bff;
}

.list-group {
    --bs-list-group-border-width: 0;
}

.list-group-item {
    display: flex;
    flex-direction: column;
}

.list-group-item strong {
    color: #727370;
    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
}

.list-group-item span,
.list-group-item p {
    font-family: Lato;
    font-size: 14px;
    font-weight: 300;
}

.button-download {
    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.button-download-2 {
    font-family: Lato;
    font-size: 14px;
    font-weight: 700;
    background-color: white;
    border: 1px solid #007bff;
    color: #007bff;
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.text-title {
    font-family: Lato;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #1864FF;
}

.pdf-loader {
    width: 100%;
    height: 100vh;
    background: linear-gradient(90deg, #f3f3f3 25%, #ecebeb 50%, #f3f3f3 75%);
    background-size: 400% 100%;
    animation: loading 1.5s infinite;
    border-radius: 5px;
}

@keyframes loading {
    0% {
        background-position: 100% 0;
    }

    100% {
        background-position: -100% 0;
    }
}

.pdf-viewer {
    border: 1px solid black;
    width: 100%;
    height: 100vh;
}


/* // mobil */
@media (max-width: 768px) {
    .tab-content .tab-pane .row {
        display: flex;
        flex-direction: row;
    }

    .col-pdf {
        margin-top: 20px;
    }
}
</style>