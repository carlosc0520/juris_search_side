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
                <!-- <a class="cursor-pointer" :class="active == 'hpagos' ? 'active-tab' : ''"
                    @click="updateActive('hpagos')">
                    Historial de Pagos
                </a> -->
            </div>

            <div class="flex flex-col gap-4 mb-5">
                <div v-if="active == 'planes'"
                    class="mb-5 row flex flex-wrap justify-center gap-4 flex-row-reverse pt-4">
                    <div class="bg-white col-md-3 col-sm-12 p-0 md:p-4 card-price border hover:border-primary rounded-3xl overflow-hidden"
                        :class="{ 'scale-custom border-primary': plan?.ACTUAL === 1 }"
                        style="width: auto;;height: auto;" v-for="plan in planes" :key="plan.id">
                        <div class="text-center p-3 text-primary" :class="{ 'bg-duo text-white': plan?.ACTUAL === 1 }">
                            Plan
                            {{ plan?.DESCRIPCION === 'PREMIUM' ? "recomendado" : "básico" }}</div>
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer duration-300 transition-all"
                            style="border-radius: 10px; max-width: 300px;">
                            <div class="flex justify-center items-center gap-2">
                                <div v-if="plan?.ACTUAL === 1">
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
                            <button @click="() => {
                                plan?.ACTUAL === 1 ? null : goToPlan(plan)
                            }" class="btn btn-outline-primary py-3" style="border-radius: 30px"
                                :disabled="plan?.ACTUAL === 1"
                                :class="{ 'shadow-lg pink-button text-white border-0': plan?.ACTUAL === 1 }">
                                {{ plan?.ACTUAL === 1 ? "Tu Plan Actual" : "Cambiar Plan" }}
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

                <div v-if="active == 'facturacion'"
                    class="mb-5 row flex flex-wrap justify-center gap-4 flex-row-reverse pt-4">
                    <div class="row">
                        <div class="col-md-7 col-12 form-pago">
                            <form class="row g-3">
                                <p class="color-blue-oscuro">Titular de pago</p>
                                <div class="col-md-6">
                                    <label for="tipo_documento" class="form-label">Tipo de documento</label>
                                    <b-form-select id="tipo_documento" v-model="model.TPODCMNTO">
                                        <option value="DNI">DNI</option>
                                        <option value="RUC">RUC</option>
                                        <option value="CE">CE</option>
                                        <option value="PASAPORTE">PASAPORTE</option>
                                    </b-form-select>
                                </div>

                                <div class="col-md-6">
                                    <label for="numero_documento" class="form-label">Número de documento</label>
                                    <input type="text" class="form-control" id="numero_documento"
                                        v-model="model.NRODCMNTO" placeholder="Número de documento">
                                </div>

                                <div class="col-12">
                                    <label for="titular_tarjeta" class="form-label">Titular de la tarjeta</label>
                                    <input type="text" class="form-control" id="titular_tarjeta" v-model="model.TITULAR"
                                        placeholder="Titular de la tarjeta">
                                </div>

                                <div class="col-12 row g-3">
                                    <p class="color-blue-oscuro col-md-7 col-12">Añadir tarjeta de crédito o débito</p>
                                    <div class="col-md-5 col-12 d-flex justify-content-end gap-2 align-items-center">
                                        <img src="@/assets/img/pagos/visa.png" alt="visa"
                                            style="width: 60px; height: 30px;" class="img-fluid cursor-pointer" />
                                        <img src="@/assets/img/pagos/master.png" alt="mastercard"
                                            style="display: flex; width: 60px; height: 30px;"
                                            class="img-fluid cursor-pointer" />
                                    </div>

                                </div>

                                <div class="col-md-12">
                                    <label for="numero_tarjeta" class="form-label">Número de tarjeta</label>
                                    <input type="text" class="form-control" id="numero_tarjeta" v-model="model.NTARJETA"
                                        placeholder="Número de tarjeta">
                                </div>

                                <div class="col-md-6 col-12">
                                    <label for="fecha_vencimiento" class="form-label">Fecha de vencimiento</label>
                                    <input type="text" class="form-control" id="fecha_vencimiento"
                                        v-model="model.FVNMNTO" placeholder="MM/AA">
                                </div>

                                <div class="col-md-6 col-12">
                                    <label for="cvv" class="form-label">CVV</label>
                                    <input type="text" class="form-control" id="cvv" v-model="model.CVV"
                                        placeholder="CVV">
                                </div>

                                <div class="col-12 d-flex justify-content-start mt-4">
                                    <button :disabled="isOk" type="button" class="btn btn-primary"
                                        @click="pagarSubscripcion">
                                        Pagar subscripción
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-5 col-12 otros-medios">
                            <p class="color-blue-oscuro">Otros medios de pago</p>
                            <div class="d-flex justify-content-start align-items-center gap-2 flex-wrap">
                                <img src="@/assets/img/pagos/yape.png" alt="yape" style="width: 50px; height: 50px;"
                                    class="img-fluid cursor-pointer" />
                                <img src="@/assets/img/pagos/plin.png" alt="plin"
                                    style="display: flex; width: 50px; height: 50px;"
                                    class="img-fluid cursor-pointer" />
                                <img src="@/assets/img/pagos/bcp.png" alt="bcp"
                                    style="display: flex; width: 50px; height: 50px;"
                                    class="img-fluid cursor-pointer" />
                                <img src="@/assets/img/pagos/interbank.png" alt="interbank"
                                    style="display: flex; width: 50px; height: 50px;"
                                    class="img-fluid cursor-pointer" />
                            </div>
                            <p class="mt-4">
                                Realiza tu pago fácilmente a través de billeteras digitales o mediante transferencia
                                bancaria.
                            </p>
                            <div class="mt-2 d-flex justify-content-start gap-2 align-items-center">
                                <a href="https://wa.me/51949345646?text=Hola%2C%20estoy%20interesado%20en%20adquirir%20un%20plan%20para%20JurisSearch.%20¿Podrías%20brindarme%20más%20información%2C%20por%20favor%3F"
                                    target="_blank" class="m-0 cursor-pointer">
                                    <img src="@/assets/img/pagos/asesor.png" alt="asesor"
                                        style="width: 30px; height: 30px;"
                                        class="img-fluid cursor-pointer cursor-pointer" />
                                </a>
                                <a href="https://wa.me/51949345646?text=Hola%2C%20estoy%20interesado%20en%20adquirir%20un%20plan%20para%20JurisSearch.%20¿Podrías%20brindarme%20más%20información%2C%20por%20favor%3F"
                                    target="_blank" class="m-0 cursor-pointer color-blue-oscuro-suave">Hablar con un
                                    asesor</a>
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
import { toast } from 'vue3-toastify';
import { BFormSelect } from 'bootstrap-vue-next';
import MantenimientoProxy from "@/proxies/MantenimientoProxy.js";
import { Validator } from 'simple-vue-validator';

export default {
    name: "subscripcion",
    components: {
        BFormSelect,
    },
    data() {
        return {
            active: "facturacion",
            planes: [],
            isOk: true,
            model: {
                TPODCMNTO: null,
                NRODCMNTO: null,
                TITULAR: null,
                NTARJETA: null,
                FVNMNTO: null,
                CVV: null,
            }
        };
    },
    validators: {
        'model.TPODCMNTO': function (value) {
            return Validator.value(value).required('Campo requerido');
        },
    },
    methods: {
        updateActive(tab) {
            this.active = tab;
        },
        // PLANES
        getPlanes() {
            MantenimientoProxy.listPlanUser({
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

.color-blue-oscuro {
    color: #11235A;
    font-weight: 600;
}

.color-blue-oscuro-suave {
    color: #11235A;
    font-weight: 400;
}

.otros-medios {
    margin-top: 0px;
}

@media (max-width: 768px) {
    .otros-medios {
        margin-top: 20px;
    }

    .form-pago {
        margin: 0px;
    }

    .form-pago form {
        padding: 0px;
    }
}
</style>