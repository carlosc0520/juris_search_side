<template>
    <div>
        <navbar />
        <main>
            <section class="profile-page">
                <!-- Hero Section -->
                <div class="hero-header">
                    <div class="hero-content">
                        <h1 class="hero-title">📬 Contáctanos</h1>
                        <p class="hero-subtitle">
                            No dudes en contactarnos, nuestro equipo especializado responderá tus consultas
                            rápidamente.
                        </p>
                    </div>
                </div>

                <!-- Contact Container -->
                <section class="container-contacto">
                    <div class="contact-grid">
                        <!-- Info Cards Column -->
                        <div class="info-cards-wrapper">
                            <div class="info-card">
                                <div class="icon-wrapper">
                                    <img src="@/assets/img/contacto/question.png" alt="Ayuda" class="icon-img" />
                                </div>
                                <div class="info-content">
                                    <h3 class="info-title">¿Necesitas ayuda?</h3>
                                    <p class="info-text">Completa el formulario</p>
                                </div>
                            </div>

                            <div class="info-card">
                                <div class="icon-wrapper">
                                    <img src="@/assets/img/contacto/warning.png" alt="Preguntas" class="icon-img" />
                                </div>
                                <div class="info-content">
                                    <h3 class="info-title">¿Tienes preguntas?</h3>
                                    <p class="info-text">Te respondemos <span class="highlight">aquí</span></p>
                                </div>
                            </div>

                            <div class="info-card">
                                <div class="icon-wrapper">
                                    <img src="@/assets/img/contacto/phone.png" alt="Email" class="icon-img" />
                                </div>
                                <div class="info-content">
                                    <h3 class="info-title">Escríbenos</h3>
                                    <p class="info-text">jsearch@ccfirma.com</p>
                                </div>
                            </div>
                        </div>

                        <!-- Form Column -->
                        <div class="form-wrapper">
                            <form class="contact-form" @submit="submit">
                                <h2 class="form-title">
                                    Completa los campos para ponernos en contacto contigo a la brevedad
                                </h2>

                                <div class="form-group">
                                    <label class="form-label">Nombre y apellidos</label>
                                    <input type="text" v-model="modelo.NOMBRES"
                                        :class="{ 'error': validation.hasError('modelo.NOMBRES') }"
                                        placeholder="Ingresa tu nombre completo" class="form-input">
                                    <span class="error-message" v-if="validation.hasError('modelo.NOMBRES')">
                                        {{ validation.firstError('modelo.NOMBRES') }}
                                    </span>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Correo electrónico</label>
                                    <input type="email" v-model="modelo.CORREO"
                                        :class="{ 'error': validation.hasError('modelo.CORREO') }"
                                        placeholder="tucorreo@ejemplo.com" class="form-input">
                                    <span class="error-message" v-if="validation.hasError('modelo.CORREO')">
                                        {{ validation.firstError('modelo.CORREO') }}
                                    </span>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Motivo</label>
                                    <input type="text" v-model="modelo.ASUNTO"
                                        :class="{ 'error': validation.hasError('modelo.ASUNTO') }"
                                        placeholder="¿En qué podemos ayudarte?" class="form-input">
                                    <span class="error-message" v-if="validation.hasError('modelo.ASUNTO')">
                                        {{ validation.firstError('modelo.ASUNTO') }}
                                    </span>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Mensaje</label>
                                    <textarea v-model="modelo.MENSAJE"
                                        :class="{ 'error': validation.hasError('modelo.MENSAJE') }"
                                        placeholder="Escribe tu mensaje aquí..." class="form-textarea"></textarea>
                                    <span class="error-message" v-if="validation.hasError('modelo.MENSAJE')">
                                        {{ validation.firstError('modelo.MENSAJE') }}
                                    </span>
                                </div>

                                <button type="button" class="submit-button" @click="submit">
                                    <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
                <!-- CTA Section -->
                <div class="cta-section">
                    <div class="cta-content">
                        <h2 class="cta-title">Descubre el plan que se adapta a ti</h2>
                        <p class="cta-text">Accede a todos los beneficios de JurisSearch</p>
                        <router-link to="/#mi-seccion-planes" class="cta-button">
                            Ver Planes
                            <svg class="button-icon-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </router-link>
                    </div>
                </div>
            </section>
            <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

        </main>
        <footer-component />
    </div>
</template>

<script>
import Navbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';
import team2 from "@/assets/img/logos/logo-completo.png";

// * PROXIES
import SettingsProxy from "@/proxies/SettingsProxy.js";

export default {
    data() {
        return {
            team2,
            noticias: [],
            currentIndex: 0,
            modelo: {
                NOMBRES: null,
                CORREO: null,
                ASUNTO: null,
                MENSAJE: null,
            },
            isLoading: false,
        };
    },
    validators: {
        'modelo.NOMBRES': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.CORREO': function (value) {
            return Validator.value(value).required("Campo requerido")
                .email("El correo electrónico no es válido");
        },
        'modelo.ASUNTO': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
        'modelo.MENSAJE': function (value) {
            return Validator.value(value).required("Campo requerido");
        },
    },
    components: {
        Navbar,
        FooterComponent,
    },
    methods: {
        async submit(e) {
            e.preventDefault();

            let validate = await this.$validate();
            if (!validate) return;

            this.isLoading = true;
            await SettingsProxy.create(this.modelo)
                .then((response) => {
                    if (response.STATUS) {
                        this.modelo = {
                            NOMBRES: null,
                            CORREO: null,
                            ASUNTO: null,
                            MENSAJE: null,
                        };

                        this.validation.reset();
                        toast.success('Mensaje enviado correctamente', { toastId: 'success' });
                    } else {
                        toast.error('Ocurrió un error al enviar el mensaje', { toastId: 'error' });
                    }
                })
                .catch(() => toast.error('Ocurrió un error al enviar el mensaje', { toastId: 'error' }))
                .finally(() => this.isLoading = false);

        }
    }
};
</script>


<style scoped>
.profile-page {
    background-image: url("../assets/img/backgrounds/bg-contacto.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 3rem;
}

/* Hero Header */
.hero-header {
    padding: 4rem 2rem 3rem;
    text-align: center;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.hero-title {
    font-size: 3rem;
    font-weight: 800;
    color: #1F2937;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
}

.hero-subtitle {
    font-size: 1.125rem;
    color: #374151;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
}

/* Contact Container */
.container-contacto {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    padding: 2.5rem;
    border-radius: 24px;
}

.contact-grid {
    display: grid;
    gap: 3rem;
    align-items: start;
}

@media (min-width: 992px) {
    .contact-grid {
        grid-template-columns: 1fr 1.8fr;
    }
}

/* Info Cards */
.info-cards-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.info-card {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
    border-radius: 16px;
    border: 2px solid #f3f4f6;
    transition: all 0.3s ease;
}

.info-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(107, 163, 255, 0.15);
    border-color: #6ba3ff;
}

.icon-wrapper {
    padding: 1rem;
    background: linear-gradient(135deg, #EDF6FF 0%, #dbeafe 100%);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(107, 163, 255, 0.2);
}

.icon-img {
    height: 2.5rem;
    width: 2.5rem;
}

.info-content {
    flex: 1;
}

.info-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 700;
    color: #1864FF;
}

.info-text {
    margin: 0;
    font-size: 1rem;
    color: #4B5563;
    line-height: 1.5;
}

.highlight {
    color: #6ba3ff;
    font-weight: 600;
}

/* Form Wrapper */
.form-wrapper {
    background: #f9fafb;
    padding: 2rem;
    border-radius: 20px;
    border: 2px solid #f3f4f6;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1F2937;
    line-height: 1.4;
    margin: 0 0 1rem 0;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.25rem;
}

.form-input,
.form-textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #E5E7EB;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: white !important;
    color: #1F2937 !important;
    outline: none;
}

.form-input:focus,
.form-textarea:focus {
    border-color: #6ba3ff;
    box-shadow: 0 0 0 3px rgba(107, 163, 255, 0.1);
}

.form-input.error,
.form-textarea.error {
    border-color: #EF4444;
}

.form-textarea {
    min-height: 120px;
    resize: vertical;
    font-family: inherit;
}

.error-message {
    color: #EF4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-weight: 500;
}

.submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: linear-gradient(135deg, #6ba3ff 0%, #4f8ff7 100%);
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(107, 163, 255, 0.3);
    width: 100%;
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(107, 163, 255, 0.4);
    background: linear-gradient(135deg, #4f8ff7 0%, #3b7ce6 100%);
}

.submit-button:active {
    transform: translateY(0);
}

.button-icon {
    width: 1.25rem;
    height: 1.25rem;
}

/* CTA Section */
.cta-section {
    background: rgba(33,37,41, 1);
    padding: 3rem 2rem;
    margin: 3rem 2rem 0;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.cta-content {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
}

.cta-title {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    margin-bottom: 0.75rem;
}

.cta-text {
    font-size: 1.125rem;
    color: white;
    opacity: 0.95;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    color: #6ba3ff;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    background: #f8f9fa;
}

.button-icon-arrow {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
}

.cta-button:hover .button-icon-arrow {
    transform: translateX(4px);
}

/* Responsive Design */
@media (max-width: 991px) {
    .contact-grid {
        grid-template-columns: 1fr;
    }

    .info-cards-wrapper {
        order: 2;
    }

    .form-wrapper {
        order: 1;
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .container-contacto {
        width: 95%;
        padding: 1.5rem;
    }

    .form-wrapper {
        padding: 1.5rem;
    }

    .form-title {
        font-size: 1.25rem;
    }

    .info-card {
        padding: 1.25rem;
    }

    .icon-wrapper {
        padding: 0.875rem;
    }

    .icon-img {
        height: 2rem;
        width: 2rem;
    }

    .info-title {
        font-size: 1rem;
    }

    .info-text {
        font-size: 0.875rem;
    }
}

@media (max-width: 480px) {
    .hero-header {
        padding: 2rem 1rem 2rem;
    }

    .container-contacto {
        padding: 1rem;
    }

    .form-wrapper {
        padding: 1rem;
    }

    .contact-grid {
        gap: 2rem;
    }

    .submit-button {
        padding: 0.875rem 1.5rem;
    }
}
</style>