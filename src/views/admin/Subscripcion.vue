<template>
    <section class="bg-landing mt-4 pt-5">
        <div class="container-table flex flex-col mt-4 pt-5">
            <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
                <a class="cursor-pointer" :class="active == 'planes' ? 'active-tab' : ''"
                    @click="updateActive('planes')">
                    Planes
                </a>
                <a class="cursor-pointer" :class="active == 'facturacion' ? 'active-tab' : ''"
                    @click="updateActive('facturacion')">
                    Facturación
                </a>
                <a class="cursor-pointer" :class="active == 'hpagos' ? 'active-tab' : ''"
                    @click="updateActive('hpagos')">
                    Historial de Pagos
                </a>
            </div>

            <div class="flex flex-col gap-4 mb-5">
                <div v-if="active == 'planes'" class="mb-5 row flex flex-wrap justify-center gap-4 flex-row-reverse pt-4">
                    <div class="bg-white col-md-3 col-sm-12 p-0 md:p-4 card-price border hover:border-primary rounded-3xl overflow-hidden"
                        :class="{ 'scale-custom ms-3 border-primary': plan?.DESCRIPCION === 'PREMIUM' }"
                        style="width: auto;;height: auto;" v-for="plan in planes" :key="plan.id">
                        <div class="text-center p-3 text-primary"
                            :class="{ 'bg-duo text-white': plan?.DESCRIPCION === 'PREMIUM' }">
                            Plan
                            {{ plan?.DESCRIPCION === 'PREMIUM' ? "recomendado" : "básico" }}</div>
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer duration-300 transition-all"
                            style="border-radius: 10px; max-width: 300px;">
                            <div class="flex justify-center items-center gap-2">
                                <div v-if="plan?.DESCRIPCION === 'PREMIUM'">
                                    <img :src="corona" />
                                </div>
                                <div class="text-surface-900 dark:text-surface-0 text-center font-bold text-capitalize">
                                    {{ capitalizeFirst(plan?.DESCRIPCION) }}
                                </div>
                            </div>
                            <div class="mb-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span>S/</span>
                                    <span class="text-5xl font-bold mr-2 mt-3 text-surface-900 dark:text-surface-0">
                                        {{ plan?.PRECIO || "" }}
                                    </span>
                                </div>
                            </div>
                            <button @click="goToPlan(plan)" class="btn btn-outline-primary py-3"
                                style="border-radius: 30px"
                                :class="{ 'shadow-lg pink-button text-white border-0': plan?.DESCRIPCION === 'PREMIUM' }">
                                {{ plan?.DESCRIPCION === 'PREMIUM' ? "Adquirir Plan" : "Probar gratis" }}
                            </button>
                            <ul
                                class="my-8 mt-3 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8 ul-list-details">
                                <li class="py-2" v-for="restriccion in plan.RESTRICIONES" :key="restriccion">
                                    <i class="fa fa-check text-primary mr-2"></i>
                                    <span class="leading-normal">
                                        {{ restriccion }}
                                    </span>
                                </li>
                            </ul>
                            <hr class="bg-dark mx-auto" />
                            <div class="flex gap-2 mt-3 text-xs text-secondary">
                                <span v-if="plan?.CDESTDO?.length > 0">*</span>
                                <p>{{ plan?.CDESTDO }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
    </section>
</template>

<script>
import MantenimientoProxy from "@/proxies/MantenimientoProxy.js";
import { toast } from 'vue3-toastify';

export default {
    name: "subscripcion",
    data() {
        return {
            active: "planes",
            planes: [],
        };
    },
    methods: {
        updateActive(tab) {
            this.active = tab;
        },
        // PLANES
        getPlanes() {
            MantenimientoProxy.listPlanesAbout({
                ROWS: 1000,
                INIT: 0,
                DESC: null
            }
            ).then((response) => {
                response = response.map((item) => {
                    item.PRECIO = item.PRECIO.toFixed(2);
                    item.TIEMPO = Number((item.TIEMPO / 30).toFixed(0));

                    if (item.VALOR === '1') {
                        item.RESTRICIONES = [
                            "Accede a filtros de búsqueda especializados.",
                            "Visualiza y descarga resoluciones.",
                            "30 días de prueba",
                        ]

                        item.CDESTDO = "El plan básico dura un mes."
                    }


                    if (item.VALOR === '2') {
                        item.RESTRICIONES = [
                            "Accede a filtros de búsqueda especializados.",
                            "Visualiza y descarga resoluciones.",
                            "Visualiza y descarga resúmenes ejecutivos.",
                            "Selecciona resoluciones favoritas.",
                            "Crea y comparte carpetas de resoluciones.",
                            "Accede a boletines quincenales y mensuales."
                        ]

                        item.CDESTDO = ""

                    }
                    return item;
                });


                // ordenar por los que tiene  mas a menos restricciones
                response = response.sort((a, b) => {
                    return a.RESTRICIONES.length - b.RESTRICIONES.length;
                });

                // inverso
                response = response.reverse();

                this.planes = response;
            })
                .catch((error) => {
                    toast.error(error?.message || 'Ocurrió un error al obtener los planes', { toastId: 'error' });
                })
        },
        capitalizeFirst(text) {
            if (!text) return "";
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        },
    },
    watch: {
        active(newValue) {
            alert(newValue);
            if (newValue === 'planes') {
                this.getPlanes();
            }
        },
    },
    mounted() {
        this.getPlanes();
    },
}
</script>

<style scoped>
.card-price:hover {
  border: 1px solid #a5bef5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>