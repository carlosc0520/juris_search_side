/* global Culqi */
<template>
    <section class="bg-landing mt-4 pt-5">
        <div class="container-table flex flex-col mt-4 pt-5">
            <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
                <a class="cursor-pointer" :class="active == 'planes' ? 'active-tab' : ''"
                    @click="updateActive('planes')">
                    Planes
                </a>
                <a class="cursor-pointer disabled" :class="active == 'facturacion' ? 'active-tab' : ''"
                    :disabled="true">
                    Pago Seguro
                </a>
                <a class="cursor-pointer" :class="active == 'pagos' ? 'active-tab' : ''" @click="updateActive('pagos')">
                    Facturación
                </a>
            </div>

            <div class="flex flex-col gap-4 mb-5">
                <div v-if="active == 'planes'"
                    class="mb-5 row flex flex-wrap justify-center gap-5 flex-row-reverse pt-4">
                    <div class="bg-white col-md-3 col-sm-12 p-0 md:p-4 card-price border hover:border-primary rounded-3xl overflow-hidden"
                        :class="{ 'scale-custom border-primary': plan?.ACTUAL === 1 }"
                        style="width: auto;;height: auto;" v-for="plan in planes" :key="plan.id">
                        <div class="text-center p-3 text-primary flex flex-row justify-center items-center gap-2"
                            :class="{
                                'bg-duo text-white': plan?.PRINCIPAL,
                                'bg-duo-gray': !plan?.PRINCIPAL
                            }">
                            <div v-if="plan?.PRINCIPAL">
                                <img :src="corona" />
                            </div>
                            {{ capitalizeFirst(plan?.DESCRIPCION) }}
                        </div>
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer duration-300 transition-all"
                            style="border-radius: 10px; max-width: 300px;">
                            <div class="mb-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span>S/</span>
                                    <span style="font-size: 2rem; font-weight: 700;"
                                        class="font-bold mr-2 mt-3 text-surface-900 dark:text-surface-0">
                                        {{ plan?.PRECIO || "" }} /
                                        <span style="font-size: 1.3rem; font-weight: 400; color: #6c757d;">{{
                                            plan.PERIODO || "" }}</span>
                                    </span>
                                </div>
                            </div>
                            <button @click="() => {
                                plan?.ACTUAL === 1 ? null : toUpdatePlan(plan)
                            }" class="btn btn-outline-primary py-3" style="border-radius: 30px"
                                :disabled="plan?.ACTUAL === 1"
                                :class="{ 'shadow-lg pink-button text-white border-0': plan?.ACTUAL === 1 }">
                                {{ plan?.ACTUAL === 1 ? "Tu Plan Actual" : "Cambiar Plan" }}
                            </button>
                            <ul
                                class="my-8 mt-3 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8 ul-list-details">
                                <li class="py-2" v-for="restriccion in plan.DETALLE.RESTRICIONES" :key="restriccion">
                                    <i class="fa fa-check text-primary mr-2"></i>
                                    <span class="leading-normal">
                                        {{ restriccion }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div v-if="active == 'facturacion'"
                    class="mb-5 row flex flex-wrap justify-center gap-5 flex-row-reverse pt-4">
                    <div class="row">
                        <div class="col-md-7 col-12 form-pago">
                            <form class="row g-3">
                                <p class="color-blue-oscuro">Datos Generales</p>

                                <div class="col-md-6 col-12">
                                    <label for="meses_subscripcion" class="form-label">Meses</label>
                                    <input disabled type="text" class="form-control" id="meses_subscripcion"
                                        v-model="planSelected.PERIODO" placeholder="Número de documento">
                                </div>

                                <div class="col-md-6 col-12">
                                    <label for="total_subscripcion" class="form-label">Total</label>
                                    <input disabled type="text" class="form-control" id="total_subscripcion"
                                        v-model="planSelected.PRECIO">
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

                                <p class="color-blue-oscuro">Datos del titular de la tarjeta</p>

                                <div class="col-12 col-md-6">
                                    <label for="nombres_titular" class="form-label">Nombres</label>
                                    <input type="text" class="form-control" id="nombres_titular"
                                        v-model="model.NOMBRES">
                                    <span class="message" v-if="validation.hasError('model.NOMBRES')">
                                        {{ validation.firstError('model.NOMBRES') }}
                                    </span>
                                </div>

                                <div class="col-12 col-md-6">
                                    <label for="apellidos_titular" class="form-label">Apellidos</label>
                                    <input type="text" class="form-control" id="apellidos_titular"
                                        v-model="model.APELLIDOS">
                                    <span class="message" v-if="validation.hasError('model.APELLIDOS')">
                                        {{ validation.firstError('model.APELLIDOS') }}
                                    </span>
                                </div>

                                <div class="col-12">
                                    <label for="correo_electronico" class="form-label">Correo electrónico</label>
                                    <input type="email" class="form-control" id="correo_electronico"
                                        v-model="model.CORREO" placeholder="Correo electrónico">
                                    <span class="message" v-if="validation.hasError('model.CORREO')">
                                        {{ validation.firstError('model.CORREO') }}
                                    </span>
                                </div>

                                <div class="col-12 col-md-6">
                                    <label for="correo_electronico" class="form-label">Teléfono</label>
                                    <input type="text" class="form-control" id="telefono_titular"
                                        @input="model.TELEFONO = $event.target.value.replace(/[^0-9]/g, '')"
                                        v-model="model.TELEFONO" placeholder="Número de teléfono">
                                    <span class="message" v-if="validation.hasError('model.TELEFONO')">
                                        {{ validation.firstError('model.TELEFONO') }}
                                    </span>
                                </div>

                                <div class="col-12 col-md-6">
                                    <label for="dni_titular" class="form-label">DNI</label>
                                    <input type="number" class="form-control" id="dni_titular" v-model="model.DNI"
                                        placeholder="Número de documento">
                                </div>

                                <div class="col-12 d-flex justify-content-start mt-4">
                                    <button type="button" class="btn btn-primary" @click="handleSubmit"
                                        :disabled="culqi.loading">
                                        Generar Orden de Pago
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

                <div v-if="active == 'pagos'"
                    class="mb-5 row flex flex-wrap justify-center gap-5 flex-row-reverse pt-4">
                    <div class="col-12 row">
                        <div class="col-md-4 col-12 mb-3">
                            <label for="BLOG3" class="form-label">
                                Fecha de pago
                            </label>
                            <date-picker v-model="facturacion.FCRCN" :value="facturacion.FCRCN" valueType="format"
                                :disabledDate="time => time.getTime() > Date.now()"
                                @change="(date) => facturacion.FCRCN = date"></date-picker>
                        </div>

                        <div class="col-md-12 col-12 mb-3 btn-actions-view">
                            <button class="bton btn-search" @click="getFacturaciones">
                                Buscar
                            </button>
                        </div>

                        <card-table :active="active" title="Pagos" :search="getFacturaciones"
                            :fields="facturacion.fields" :items="facturacion.grid.items" :grid="facturacion.grid"
                            :actions="facturacion.actions" />

                    </div>
                </div>
            </div>
            <LoadingOverlay :active="loading" :is-full-page="false" :loader="'bars'" />
        </div>
    </section>
</template>

<script>
/* global Culqi */
import { toast } from 'vue3-toastify';
import MantenimientoProxy from "@/proxies/MantenimientoProxy.js";
import { Validator } from 'simple-vue-validator';
import corona from "@/assets/img/resources/Corona.png";
import SubscriptionProxy from '@/proxies/SubscriptionProxy.js';
import CardTable from "@/components/Cards/CardTable.vue";
import moment from 'moment';

export default {
    name: "planes",
    components: {
        CardTable
    },
    data() {
        return {
            culqi: {
                amount: 185,
                email: 'ccarbajalmt0520@gmail.com',
                description: 'SUBSCRIPCIÓN JURISSEARCH',
                loading: false,
                message: ''
            },
            facturacion: {
                FCRCN: null,
                actions: {
                    edit: {
                        label: "Editar",
                        icon: "fas fa-edit",
                        class: "btn-edit",
                        action: null,
                    },
                },
                fields: [
                    {
                        key: "RN",
                        label: "",
                    },
                    {
                        key: "DPLAN",
                        label: "Plan",
                    },
                    {
                        key: "TOTAL",
                        label: "Total",
                    },
                    {
                        key: "RTAFTO",
                        label: "Medio de Pago",
                    },
                    {
                        key: "FCHA",
                        label: "Fecha de Pago",
                    },
                    {
                        key: "BAN",
                        label: "Estado",
                    }
                ],
                grid: {
                    items: [],
                    currentPage: 1,
                    perPage: 10,
                    totalRows: 120,
                    isLoading: true,
                    pageOptions: [5, 10, 15, 50],
                },
            },
            active: "planes",
            planes: [],
            errorPayment: null,
            model: {
                NOMBRES: null,
                APELLIDOS: null,
                CORREO: null,
                TELEFONO: null,
                DNI: null,
            },
            planSelected: null,
            corona,
            planesSuggets: {
                "1": {
                    RESTRICIONES: [
                        "Acceso a filtros de búsqueda especializada.",
                        "Visualiza resoluciones completas.",
                        "Descarga 1 resolución por día.",
                        "Prueba gratuita de 30 días con opción a upgrade.",
                    ],
                    descripcion: "Ideal para estudiantes, curiosos o quienes recién descubren el poder del análisis jurisprudencial.",
                },
                "2": {
                    RESTRICIONES: [
                        "Accede a todos los filtros avanzados.",
                        "Visualiza y descarga resoluciones sin límites.",
                        "Accede a resúmenes ejecutivos elaborados por expertos.",
                        "Marca resoluciones como favoritas.",
                        "Crea, organiza y comparte carpetas temáticas.",
                        "Accede a boletines quincenales y mensuales con lo más relevante en jurisprudencia penal y de compliance.",
                        "Recibe alertas de noticias relevantes y cambios normativos.",
                    ],
                    descripcion: "Para penalistas, asesores y compliance officers que viven de la estrategia jurídica.",
                },
                "3": {
                    RESTRICIONES: [
                        "Todo lo del Plan Premium.",
                        "Presenta tu correo institucional o constancia de matrícula.",
                        "Accede a recursos para prácticas preprofesionales, tesis y exámenes",
                        "Invitaciones a webinars y/o eventos.",
                    ],
                    descripcion: "Para estudiantes de Derecho con hambre de conocimiento.",
                },
                "4": {
                    RESTRICIONES: [
                        "Todo lo del Plan Premium.",
                        "Invitaciones a webinars y/o eventos.",
                        "Acceso anticipado a nuevas funciones.",
                        "Bonus: Informe Top 20 resoluciones del año, edición digital exclusiva.",
                        "Facturación mensual o anual. Puedes cancelar en cualquier momento.",
                        "Alertas de noticias.",
                    ],
                    descripcion: "Para quienes viven del litigio, la estrategia o el cumplimiento normativo.",
                },
            },
            stripe: null,
            elements: null,
            card: null,
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null,
            loading: false,
        };
    },
    validators: {
        'model.NOMBRES': function (value) {
            return Validator.value(value).required('Campo requerido');
        },
        'model.APELLIDOS': function (value) {
            return Validator.value(value).required('Campo requerido');
        },
        'model.CORREO': function (value) {
            return Validator.value(value).required('Campo requerido').email('Correo electrónico inválido');
        },
        'model.TELEFONO': function (value) {
            return Validator.value(value).required('Campo requerido').minLength(9, 'Mínimo 9 dígitos').maxLength(15, 'Máximo 15 dígitos');
        }
    },
    methods: {
        async handleSubmit() {
            const validate = await this.$validate();
            if (!validate) return;

            const CULQI_PUBLIC_KEY = 'pk_test_xn4SkqpCLsx62ZOL';
            const amountNumber = Number(this.planSelected?.PRECIO);

            if (isNaN(amountNumber) || amountNumber <= 0) {
                toast.error('Monto del plan no válido', { toastId: 'error' });
                return;
            }

            this.culqi.loading = true;
            const loadingToast = toast.loading('Generando orden de pago...', {
                timeout: false,
                closeOnClick: false,
            });

            try {
                // 🧾 Crear orden desde backend
                const response = await SubscriptionProxy.create({
                    amount: amountNumber,
                    description: this.planSelected.DESCRIPCION,
                    email: this.model.CORREO,
                    nombres: this.model.NOMBRES,
                    apellidos: this.model.APELLIDOS,
                    telefono: this.model.TELEFONO,
                    dni: this.model.DNI
                });

                toast.remove(loadingToast);

                if (!response.success) {
                    toast.error(response?.message || '❌ Error al crear la orden de pago.', { toastId: 'error' });
                    this.culqi.loading = false;
                    return;
                }

                // 💳 Configurar Culqi Checkout
                Culqi.publicKey = CULQI_PUBLIC_KEY;
                Culqi.settings({
                    title: 'JURIS SEARCH',
                    currency: 'PEN',
                    description: this.planSelected.DESCRIPCION,
                    amount: amountNumber * 100, // siempre en céntimos
                    order: response.data.id,
                    logo: 'https://jurissearch.com/img/logo-full.e849dab8.png',
                    paymentMethods: {
                        tarjeta: true,
                        yape: true,
                    },
                    style: {
                        maincolor: '#0052cc',
                        buttontext: '#ffffff',
                        maintext: '#4A4A4A',
                        desctext: '#4A4A4A'
                    },
                    options: {
                        // modal: true,
                        lang: 'es',
                        paymentMethodsOrder: ['yape', 'tarjeta']
                    }
                });

                Culqi.open();
                this.culqi.loading = false; 

                // ⚡ Callback de Culqi
                window.culqi = async () => {
                    if (Culqi.token) {
                        const token = Culqi.token.id;

                        try {
                            const chargeRes = await SubscriptionProxy.chargeWithToken({
                                token,
                                order_id: response.data.id,
                                email: this.model.CORREO,
                                amount: amountNumber,
                                id_plan: this.planSelected.ID,
                                tipo: token.substring(0, 4)
                            });


                            Culqi.close(); // cierra siempre el iframe

                            // 🟣 Pago con Yape
                            if (token.startsWith('ype_')) {
                                if (chargeRes?.success) {
                                    this.$swal({
                                        title: chargeRes?.data?.outcome?.user_message || '✅ Pago con Yape exitoso',
                                        text: chargeRes?.data?.outcome?.merchant_message || '✅ Tu pago con Yape ha sido procesado exitosamente.',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar'
                                    }).then(() => {
                                        this.active = 'planes';
                                    });

                                } else {
                                    this.$swal({
                                        title: 'Error en el pago con Yape',
                                        text: chargeRes?.message || '❌ Ocurrió un error al procesar el pago con Yape.',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
                                }
                            }

                            // 💳 Pago con tarjeta
                            else if (token.startsWith('tkn_')) {
                                if (!chargeRes.success) {
                                    this.$swal({
                                        title: chargeRes?.title === 'operacion_denegada'
                                            ? 'Operación denegada'
                                            : 'Pago rechazado',
                                        text: chargeRes?.message || 'El pago fue rechazado. Intenta con otra tarjeta o medio de pago.',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
                                    return;
                                }

                                this.$swal({
                                    title: chargeRes?.data?.outcome?.user_message || 'Pago exitoso',
                                    text: chargeRes?.data?.outcome?.merchant_message || '',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                }).then(() => {
                                    this.active = 'planes';
                                    console.log('✅ Pago completado:', chargeRes);
                                });
                            }

                        } catch (err) {
                            Culqi.close();
                            console.error('Error al procesar pago:', err);
                            this.$swal({
                                title: 'Error en el pago',
                                text: `${err.merchant_message || ''} ${err.user_message || ''}`.trim() ||
                                    'Ocurrió un error al procesar el pago.',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        } finally {
                            this.culqi.loading = false;
                        }
                    } else {
                        // 🟡 Usuario cerró el iframe sin pagar
                        Culqi.close();
                        this.$swal({
                            title: 'Pago cancelado',
                            text: 'Has cerrado el formulario sin completar el pago.',
                            icon: 'info',
                            confirmButtonText: 'Aceptar'
                        });
                        this.culqi.loading = false;
                    }
                };
            } catch (error) {
                toast.remove(loadingToast);
                toast.error(error?.message || '⚠️ Ocurrió un error al procesar la suscripción.', {
                    toastId: 'error',
                });
                this.culqi.loading = false;
            }
        },

        async toUpdatePlan(plan) {
            if (!plan.ID) {
                toast.error('Plan no válido', { toastId: 'error' });
                return;
            }
            this.planSelected = plan;
            this.active = 'facturacion';
        },

        updateActive(tab) {
            this.active = tab;
        },
        getPlanes() {
            MantenimientoProxy.listPlanUser({
                ROWS: 1000,
                INIT: 0,
                DESC: null
            })
                .then((response) => {
                    response = response.map((item) => {
                        item.PRECIO = item.PRECIO.toFixed(2);
                        item.TIEMPO = Number((item.TIEMPO / 30).toFixed(0));
                        item["DETALLE"] = this.planesSuggets?.[item.VALOR] || {
                            RESTRICIONES: [],
                            descripcion: ""
                        };
                        item["PERIODO"] = item?.TIEMPO + (item?.TIEMPO <= 1 ? ' mes' : ' meses');

                        return item;
                    });

                    const principalIndex = response.findIndex(item => item.PRINCIPAL);
                    if (principalIndex !== -1 && principalIndex < response.length - 1) {
                        const principalItem = response.splice(principalIndex, 1)[0];
                        response.splice(response.length - 1, 0, principalItem);
                    }

                    this.planes = response.filter(item => item.ID > 1);
                })
                .catch((error) => {
                    toast.error(error?.message || 'Ocurrió un error al obtener los planes', { toastId: 'error' });
                })
        },
        async getFacturaciones() {
            const init = (this.facturacion.grid.currentPage - 1) * this.facturacion.grid.perPage;
            const rows = this.facturacion.grid.perPage;

            this.facturacion.grid.isLoading = true;
            await SubscriptionProxy.payment_list({
                ROWS: rows,
                INIT: init,
                FCRCN: this.facturacion?.FCRCN || null
            })
                .then((response) => {
                    console.log("response", response);
                    this.facturacion.grid.items = response.map(item => {
                        item.TOTAL = 'S/ ' + Number(item.TOTAL).toFixed(2);
                        item.RTAFTO = item.TIPO === 'YAPE' ? '<i class="pi pi-mobile mr-2" style="font-size:1em;"></i> Yape' :
                            item.TIPO === 'TARJETA' ? '<i class="pi pi-credit-card mr-2" style="font-size:1em;"></i> Tarjeta' :
                                item.TIPO === 'PLIN' ? '<i class="pi pi-mobile mr-2" style="font-size:1em;"></i> Plin' :
                                    item.TIPO === 'TRANSFERENCIA' ? '<i class="pi pi-unlock mr-2" style="font-size:1em;"></i> Transferencia' :
                                        item.TIPO;
                        item.FCHA = item.FCRCN ? moment(item.FCRCN).format('DD/MM/YYYY, h:mm a') : '';
                        item.BAN = '<span class="badge bg-success text-white">Pagado</span>';
                        return item;
                    })
                        || [];
                    this.facturacion.grid.totalRows = response?.[0]?.TOTALROWS || 0;
                })
                .catch((error) => {
                    this.facturacion.grid.items = [];
                    this.facturacion.grid.totalRows = 0;
                    console.error("error", error);
                })
                .finally(() => this.facturacion.grid.isLoading = false);
        },
        capitalizeFirst(text) {
            if (!text) return "";
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        },
    },
    watch: {
        async active(newValue) {
            if (newValue === 'planes') {
                this.planSelected = null;
                this.getPlanes();
            }

            if (newValue === 'facturacion') {
                this.validation.reset();
                // this.model = {
                //     NOMBRES: "Carlos Ruben",
                //     APELLIDOS: "Carbajal Matias",
                //     CORREO: "ccarbajalmt0520@gmail.com",
                //     TELEFONO: "950181301",
                //     DNI: "70812345"
                // };
                this.model = {
                    NOMBRES: null,
                    APELLIDOS: null,
                    CORREO: null,
                    TELEFONO: null,
                    DNI: null
                };
                this.errorPayment = null;
                this.culqi.message = '';
                this.culqi.loading = false;
                this.loading = false;
            }

            if (newValue === 'pagos') {
                this.getFacturaciones(1, this.facturacion.grid.perPage);
                this.facturacion.grid.currentPage = 1;
                this.facturacion.grid.perPage = 10;
                this.facturacion.grid.isLoading = false;
            }
        }
    },
    async mounted() {
        if (typeof window.Culqi === 'undefined') {
            console.warn('SDK de Culqi no disponible. ¿Agregaste el <script> en index.html?')
        }
        this.getPlanes();
    },
}
</script>

<style scoped>
.stripe-input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 44px;
    background-color: #fff;
}

#card-element {
    width: 100%;
    min-width: 300px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
}


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

.swal2-container {
    z-index: 99999 !important;
}
</style>
