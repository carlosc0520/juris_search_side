<template>
    <section class="bg-landing mt-4 pt-5">
        <div class="container-table flex flex-col mt-4 pt-5">
            <div class="flex mb-3 gap-4 flex-col md:flex-row contenedor-tab">
                <a class="cursor-pointer" :class="active == 'pageSecurity' ? 'active-tab' : ''" @click="updateActive('pageSecurity')">
                    Pago Seguro
                </a>
            </div>

            <div class="flex flex-col gap-4 mb-5">
                <div :class="active == 'pageSecurity' ? 'flex' : 'd-none'" class="mb-5 row">
                    <div class="col-md-6 col-12 form-pago">
                        <form @submit.prevent="handleSubmit" class="bg-white rounded shadow-md row p-4">
                            <div class="col-12 mb-3">
                                <label for="NOMBRES">Nombres</label>
                                <input v-model="modelo.NOMBRES" id="NOMBRES" type="text" placeholder="Tus nombres" />
                                <span v-if="validation.hasError('modelo.NOMBRES')" class="text-danger small">
                                    {{ validation.firstError('modelo.NOMBRES') }}
                                </span>
                            </div>

                            <div class="col-md-6 col-12 mb-3">
                                <label for="EMAIL">Correo electrónico</label>
                                <input v-model="modelo.EMAIL" id="EMAIL" type="email" placeholder="tucorreo@ejemplo.com" />
                                <span v-if="validation.hasError('modelo.EMAIL')" class="text-danger small">
                                    {{ validation.firstError('modelo.EMAIL') }}
                                </span>
                            </div>

                            <div class="col-md-6 col-12 mb-3">
                                <label>Número de Tarjeta</label>
                                <div id="card-number" ref="cardNumber" class="stripe-input"></div>
                                <span v-if="validation.hasError('cardNumber')" class="text-danger small">
                                    {{ validation.firstError('cardNumber') }}
                                </span>
                            </div>

                            <div class="col-md-6 col-12 mb-3">
                                <label>Fecha de Vencimiento</label>
                                <div id="card-expiry" ref="cardExpiry" class="stripe-input"></div>
                                <span v-if="validation.hasError('cardExpiry')" class="text-danger small">
                                    {{ validation.firstError('cardExpiry') }}
                                </span>
                            </div>

                            <div class="col-md-6 col-12 mb-3">
                                <label>CVC</label>
                                <div id="card-cvc" ref="cardCvc" class="stripe-input"></div>
                                <span v-if="validation.hasError('cardCvc')" class="text-danger small">
                                    {{ validation.firstError('cardCvc') }}
                                </span>
                            </div>

                            <p v-if="error" style="color: red;">{{ error }}</p>

                            <p class="mt-4 text-muted" style="font-size: 0.7rem;">
                                Al hacer clic en "Pagar", aceptas nuestros <a href="#">Términos de Servicio</a> y <a href="#">Política de Privacidad</a>.
                            </p>
                            <button type="submit" :disabled="loading" class="mt-3 btn btn-primary">
                                {{ loading ? 'Procesando...' : 'Pagar' }}
                            </button>
                        </form>
                    </div>

                    <div class="col-md-6 col-12">
                        <div class="bg-white p-4 rounded shadow-md">
                            <h3>Resumen del Pedido</h3>
                            <p class="mt-4"><strong>Producto:</strong> {{ modelo.PRODUCTO }}</p>
                            <p><strong>Meses:</strong> {{ modelo.MES }} </p>
                            <p><strong>Precio:</strong> {{ modelo.PRECIO }} </p>
                            <p><strong>Total:</strong> {{ modelo.TOTAL }} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
    </section>
</template>

<script>
import { Validator } from 'simple-vue-validator';
import { loadStripe } from '@stripe/stripe-js';

export default {
    name: "pago-seguro",
    validators: {
        'modelo.NOMBRES': (value) => Validator.value(value).required('Campo requerido'),
        'modelo.EMAIL': (value) => Validator.value(value).required('Campo requerido').email('Correo inválido'),
        'cardNumber': (value) => Validator.value(value).required('Campo requerido'),
        'cardExpiry': (value) => Validator.value(value).required('Campo requerido'),
        'cardCvc': (value) => Validator.value(value).required('Campo requerido'),
    },
    data() {
        return {
            active: "pageSecurity",
            isLoading: false,
            stripe: null,
            elements: null,
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null,
            error: '',
            loading: false,
            modelo: {
                NOMBRES: '',
                EMAIL: '',
                PRODUCTO: "",
                MES: null,
                PRECIO: null,
                TOTAL: null,
            },
        };
    },
    methods: {
        async handleSubmit() {
            const validate = await this.$validate();
            if (!validate) return;

            if (!this.stripe || !this.elements) {
                console.error('Stripe no está cargado correctamente.');
                return;
            }

            this.error = '';
            this.loading = true;

            try {
                const res = await fetch('https://api.jurissearch.com/payment/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: this.modelo.EMAIL,
                        amount: parseFloat(this.modelo.precio)
                    }),
                });

                const { clientSecret } = await res.json();

                const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: this.cardNumber,
                        billing_details: {
                            name: this.modelo.NOMBRES,
                            email: this.modelo.EMAIL,
                        },
                    },
                });
                console.log('Resultado del pago:', { error });

                this.loading = false;

                if (error) {
                    this.error = error.message;
                } else if (paymentIntent.status === 'succeeded') {
                    alert('¡Pago exitoso!');
                }
            } catch (err) {
                console.error('Error al procesar el pago:', err);
                this.loading = false;
                this.error = 'Error al procesar el pago.';
            }
        },
        async mountStripeElements() {
            if (!this.elements || !this.$refs.cardNumber || this.cardNumber) return;

            const style = {
                base: {
                    fontSize: '16px',
                    color: '#32325d',
                    '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#fa755a' },
            };

            this.cardNumber = this.elements.create('cardNumber', { style });
            this.cardNumber.mount(this.$refs.cardNumber);

            this.cardExpiry = this.elements.create('cardExpiry', { style });
            this.cardExpiry.mount(this.$refs.cardExpiry);

            this.cardCvc = this.elements.create('cardCvc', { style });
            this.cardCvc.mount(this.$refs.cardCvc);
        },
        updateActive(tab) {
            this.active = tab;
        }
    },
    watch: {
        active(newVal) {
            if (newVal === 'pageSecurity') {
                this.mountStripeElements();
            }
        },
    },
    async mounted() {
        this.stripe = await loadStripe('pk_test_51RX40d4TnxiUUAq0pBxvzmlVcgTALd3Go41M8rijj8ynroddeKPmz3uE7V7vW9h1Xh7PyxTeeHpw9hrl5kbMk4SK00lJCHtr7n');
        this.elements = this.stripe.elements();
        if (this.active === 'pageSecurity') this.mountStripeElements();
    }
}
</script>

<style scoped>
input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.stripe-input {
    width: 100%;
    min-height: 40px;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
