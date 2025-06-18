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

                                <!-- <div class="col-md-6">
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
                                </div> -->

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

                                <div class="col-12">
                                    <label for="titular_tarjeta" class="form-label">Titular de la tarjeta</label>
                                    <input type="text" class="form-control" id="titular_tarjeta" v-model="model.TITULAR"
                                        placeholder="Titular de la tarjeta">
                                    <span class="message" v-if="validation.hasError('model.TITULAR')">
                                        {{ validation.firstError('model.TITULAR') }}
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

                                <div class="col-md-12 mb-3">
                                    <label class="form-label">Número de tarjeta</label>
                                    <div id="card-number" ref="cardNumberElement" class="stripe-input"></div>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Fecha de vencimiento</label>
                                    <div id="card-expiry" ref="cardExpiryElement" class="stripe-input"></div>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Código CVC</label>
                                    <div id="card-cvc" ref="cardCvcElement" class="stripe-input"></div>
                                </div>

                                <div class="col-12">
                                    <span class="text-danger" v-if="errorPayment">{{ errorPayment }}</span>
                                </div>

                                <div class="col-12 d-flex justify-content-start mt-4">
                                    <button type="button" class="btn btn-primary" @click="handleSubmit">
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
        <LoadingOverlay :active="loading" :is-full-page="false" :loader="'bars'" />
    </section>
</template>

<script>
import { toast } from 'vue3-toastify';
// import { BFormSelect } from 'bootstrap-vue-next';
import MantenimientoProxy from "@/proxies/MantenimientoProxy.js";
import { Validator } from 'simple-vue-validator';
import corona from "@/assets/img/resources/Corona.png";
import { loadStripe } from '@stripe/stripe-js'
import UserProxy from '../../proxies/UserProxy';
import LoginProxy from '../../proxies/LoginProxy';

export default {
    name: "planes",
    components: {
        // BFormSelect,
    },
    data() {
        return {
            active: "planes",
            planes: [],
            errorPayment: null,
            model: {
                TITULAR: null,
                CORREO: null,
                NTARJETA: null,
                FVNMNTO: null,
                CVV: null,
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
        'model.TITULAR': function (value) {
            return Validator.value(value).required('Campo requerido');
        },
        'model.CORREO': function (value) {
            return Validator.value(value).required('Campo requerido').email('Correo electrónico inválido');
        },
    },
    methods: {
        async handleSubmit() {
            const validate = await this.$validate();
            if (!validate) return;

            this.loading = true;
            this.errorPayment = null;
            const res = await fetch('http://localhost:3000/payment/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.model.CORREO,
                    amount: this.planSelected.PRECIO * 1,
                }),
            });

            const { clientSecret } = await res.json();

            const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: this.cardNumber,
                    billing_details: {
                        name: this.model.TITULAR,
                        email: this.model.CORREO,
                    }
                },
            });

            if (error) {
                this.loading = false;
                this.errorPayment = error.message || 'Ocurrió un error al procesar el pago';
            } else {
                if (paymentIntent.status === 'succeeded') {
                    const loadingToast = toast.loading("Espere un momento...");
                    await UserProxy.paymentSubscription({
                        IDPLN: this.planSelected.ID,
                        DPLAN: this.planSelected.DESCRIPCION,
                        MESES: this.planSelected.TIEMPO,
                        TOTAL: this.planSelected.PRECIO,
                    })
                        .then(async response => {
                            const toastMessage = response.STATUS ? "Datos actualizados con éxito" : response.MESSAGE;
                            if (response.STATUS) {
                                this.$swal.fire({
                                    title: 'Pago realizado con éxito',
                                    html: `<p>Tu plan ha sido actualizado a <strong>${this.planSelected.DESCRIPCION}</strong>, por favor vuelve a iniciar sesión para ver los cambios.</p>`,
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        await LoginProxy.logout();

                                        localStorage.removeItem("user");
                                        localStorage.removeItem("accessToken");
                                        this.$router.push("/auth/login");
                                    }
                                });


                            } else {
                                toast.error(toastMessage);
                            }

                        })
                        .catch(err => {
                            this.loading = false;
                            toast.error(err?.MESSAGE || "Error al realizar el pago")
                        })
                        .finally(() => {
                            this.loading = false;
                            toast.remove(loadingToast);
                        });

                } else {
                    this.loading = false;
                    this.errorPayment = 'El pago no se pudo completar. Por favor, inténtalo de nuevo.';
                }
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
            }
            ).then((response) => {
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
        async active(newValue) {
            if (newValue === 'planes') {
                this.planSelected = null;
                this.getPlanes();
            }

            if (newValue === 'facturacion') {
                this.validation.reset();
                this.model = {
                    TITULAR: null,
                    CORREO: null,
                    NTARJETA: null,
                    FVNMNTO: null,
                    CVV: null,
                };
                this.errorPayment = null;

                this.stripe = await loadStripe('pk_test_51RX40d4TnxiUUAq0pBxvzmlVcgTALd3Go41M8rijj8ynroddeKPmz3uE7V7vW9h1Xh7PyxTeeHpw9hrl5kbMk4SK00lJCHtr7n');
                this.elements = this.stripe.elements();

                if (this.cardNumber) {
                    this.cardNumber.unmount();
                    this.cardNumber = null;
                }
                if (this.cardExpiry) {
                    this.cardExpiry.unmount();
                    this.cardExpiry = null;
                }
                if (this.cardCvc) {
                    this.cardCvc.unmount();
                    this.cardCvc = null;
                }

                this.$nextTick(() => {
                    this.cardNumber = this.elements.create('cardNumber');
                    this.cardNumber.mount(this.$refs.cardNumberElement);

                    this.cardExpiry = this.elements.create('cardExpiry');
                    this.cardExpiry.mount(this.$refs.cardExpiryElement);

                    this.cardCvc = this.elements.create('cardCvc');
                    this.cardCvc.mount(this.$refs.cardCvcElement);
                });
            }
        },
    },
    async mounted() {
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
</style>
