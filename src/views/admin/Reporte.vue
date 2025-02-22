<template>
    <div :class="isUser ? '' : 'pt-5 mb-5'">
        <div :class="isUser ? '' : 'pt-5 mb-5'">
            <div class="row px-4">
                <div class="col-md-3 col-12 mb-3">
                    <label for="IND" class="form-label">
                        Estadística por:
                    </label>
                    <b-form-select v-model="formData.IND" :options="selects.IND" @change="() => {
                        search();
                    }">
                        <template #first>
                            <option :value="null" disabled>Seleccione una opción</option>
                        </template>
                    </b-form-select>
                </div>

                <div class="col-md-3 col-12 mb-3">
                    <label for="MAGISTRADOS" class="form-label">Magistrado</label>
                    <el-tree-select v-model="formData.MAGISTRADOS" :data="selects.MAGISTRADOS" multiple
                        :render-after-expand="false" placeholder="Seleccione una opción" show-checkbox check-strictly
                        check-on-click-node filterable clearable collapse-tags :max-collapse-tags="1"
                        no-data-text="No hay opciones disponibles" popper-append-to-body class="custom-tree-select" />
                </div>

                <div class="col-md-3 col-12 mb-3" v-if="![1].includes(formData.IND)">
                    <label for="DELITOS" class="form-label">Delito</label>
                    <el-tree-select :disabled="[1].includes(formData.IND)" v-model="formData.DELITOS"
                        :data="selects.DELITOS" multiple :render-after-expand="false"
                        placeholder="Seleccione una opción" show-checkbox check-strictly check-on-click-node filterable
                        clearable collapse-tags :max-collapse-tags="1" no-data-text="No hay opciones disponibles"
                        popper-append-to-body class="custom-tree-select" />
                </div>

                <div class="col-12 flex justify-end">
                    <button class="btn btn-search" type="button" id="filter-btn" @click="search"
                        style="width: max-content">
                        <i class="fas fa-search"></i>
                        BUSCAR
                    </button>
                </div>
            </div>
            <div class="flex flex-wrap mt-4">
                <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
                    <CardLineChartMagistrados :DATA="head.REPORTE"
                        :TITLE="head.REPORTE?.length > 0 ? (formData.IND === 1 ? 'Magistrados' : formData.IND === 2 ? 'Delitos' : '') : 'Palabras'"
                        :SUBTITLE="head.REPORTE?.length > 0 ? (formData.IND === 1 ? 'Top 20 Magistrados' : formData.IND === 2 ? 'Top 20 Delitos' : '') : 'Top Palabras'" />
                </div>
            </div>
            <!-- <div class="flex flex-wrap mt-4">
                <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
                    <card-page-palabras :data="head.REPORTE"
                        :TITLE="head.REPORTE?.length > 0 ? (formData.IND === 1 ? 'Magistrados' : formData.IND === 2 ? 'Delitos' : '') : 'Palabras'" />
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
// import CardPagePalabras from "../../components/Cards/CardPagePalabras.vue";
import CardLineChartMagistrados from "../../components/Cards/CardLineChartMagistrados.vue";

import helpersProxy from "../../proxies/helpersProxy";
import { toast } from 'vue3-toastify';
import { BFormSelect } from 'bootstrap-vue-next';
import MagistradoProxy from "../../proxies/Magistrados.Proxy";
import FilterProxy from "../../proxies/FilterProxy";
import UserProxy from "../../proxies/UserProxy";

export default {
    name: "reporte-page",
    components: {
        CardLineChartMagistrados,
        // CardPagePalabras,
        BFormSelect,
    },
    props: {
        isUser: {
            type: Boolean,
            default: () => false,
        },
    },
    data() {
        return {
            formData: {
                IND: 1,
                MAGISTRADOS: [],
                DELITOS: [],
            },
            selects: {
                IND: [
                    { value: 1, text: "Magistrados" },
                    { value: 2, text: "Delitos" },
                ],
                MAGISTRADOS: [],
                DELITOS: [],
            },
            head: {
                REPORTE: [],
            },
        };
    },
    methods: {
        async search() {
            this.head.REPORTE = [];

            await UserProxy.getReporte({
                ...this.formData,
                MAGISTRADOS: this.formData.MAGISTRADOS.join(','),
                DELITOS: this.formData.DELITOS.join(','),
            })
                .then((response) => {
                    switch (this.formData.IND) {
                        case 1:
                            this.head.REPORTE = response.slice(0, 20);
                            break;
                        case 2:
                            this.head.REPORTE = response.slice(0, 20);
                            break;
                        case 3:
                            this.head.REPORTE = response;
                            break;
                    }
                })
                .catch((error) => {
                    this.head.REPORTE = [];
                    toast.error(error, { toastId: 'error-search' })
                });
        },
        async getHead() {
            await helpersProxy.getHead(2)
                .then((response) => {
                    if (typeof response !== 'undefined') {
                        this.head = {
                            USUARIOS: JSON.parse(response?.[0]?.USUARIOS) || [],
                            ENTRADAS: JSON.parse(response?.[0]?.ENTRADAS) || [],
                            PALABRAS: JSON.parse(response?.[0]?.PALABRAS) || []
                        }
                    }
                })
                .catch((error) => toast.error(error, { toastId: 'error-head' }));
        },
        async selects_all() {
            try {
                const [magistradosResponse, filtrosResponse] = await Promise.all([
                    MagistradoProxy.list({ ROWS: 1000, INIT: 0, DESC: null }),
                    FilterProxy.list({ NIVEL: 5 }, null)
                ]);

                this.selects.MAGISTRADOS = magistradosResponse.map(item => ({
                    value: item.ID,
                    label: `${item.APELLIDOS}${item?.NOMBRES ? `, ${item.NOMBRES}` : ''}`
                }));

                if (filtrosResponse?.length) {
                    const DELITOS = filtrosResponse.find(item => item.LABEL === "DELITOS");
                    if (DELITOS?.NIVEL_2) {
                        DELITOS.NIVEL_2 = JSON.parse(DELITOS.NIVEL_2);
                        this.selects.DELITOS = await this.generate_select(DELITOS.NIVEL_2);
                    }
                } else {
                    this.selects.FILTROS = [];
                }
            } catch (error) {
                this.selects.MAGISTRADOS = [];
                this.selects.FILTROS = [];
            }
        },
        async generate_select(NIVEL_2) {
            return NIVEL_2.map(item => ({
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
        }
    },
    mounted() {
        this.selects_all();
        this.search();
    },
};
</script>
