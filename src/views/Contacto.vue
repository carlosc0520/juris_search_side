<template>
    <div>
        <navbar />
        <main>
            <section class="profile-page">
                <div class="mt-10"></div>
                <section class="relative">
                    <div class="container-custom mx-auto px-lg-5">
                        <p class="mb-3 text-duo text-lato-400 text-2xl text-center" style="font-size: 40px;">
                            Contáctanos
                        </p>
                        <p class="text-lato-400 text-center" style="font-size: 18px;">
                            No dudes en contactarnos, nuestro equipo especializado<br> responderá tus consultas
                            rápidamente.
                        </p>
                    </div>
                </section>

                <section class="container-contacto">
                    <div class="grid">
                        <!-- Primera columna -->
                        <div class="flex flex-col logos-items gap-4 justify-center items-center">
                            <div class="info-item flex flex-row gap-4">
                                <div class="icon">
                                    <img src="@/assets/img/contacto/question.png" alt="Logo" class="h-10 w-10" />
                                </div>
                                <div class="flex flex-col gap-2">
                                    <p class="text-lato-700 font-semibold text-principal">¿Necesitas ayuda?</p>
                                    <p class="text-lato-400 text-secondary">Completa el formulario</p>
                                </div>
                            </div>
                            <div class="info-item flex flex-row gap-4">
                                <div class="icon">
                                    <img src="@/assets/img/contacto/warning.png" alt="Logo" class="h-10 w-10" />
                                </div>
                                <div class="flex flex-col gap-2">
                                    <p class="text-lato-700 font-semibold text-principal">¿Tienes preguntas?</p>
                                    <p class="text-lato-400 text-secondary">Te respondemos <span>aquì</span></p>
                                </div>
                            </div>
                            <div class="info-item flex flex-row gap-4">
                                <div class="icon">
                                    <img src="@/assets/img/contacto/phone.png" alt="Logo" class="h-10 w-10" />
                                </div>
                                <div class="flex flex-col gap-2">
                                    <p class="text-lato-700 font-semibold text-principal">Escríbenos</p>
                                    <p class="text-lato-400 text-secondary">jsearch@ccfirma.com</p>
                                </div>
                            </div>
                            <div class="info-item flex flex-row gap-4">
                                <div class="icon">
                                    <img src="@/assets/img/contacto/message.png" alt="Logo" class="h-10 w-10" />
                                </div>
                                <div class="flex flex-col gap-2">
                                    <p class="text-lato-700 font-semibold text-principal">Llámanos</p>
                                    <p class="text-lato-400 text-secondary">+51 902 430 068</p>
                                </div>
                            </div>
                        </div>

                        <!-- Segunda columna -->
                        <div>
                            <form class="form flex flex-col gap-3" @submit="submit">
                                <h2 class="text-lato-700 mb-2"
                                    style="font-size: 24px; max-width: 80%;   line-height: 1.2;">
                                    Completa los campos para ponernos en contacto contigo a la brevedad
                                </h2>
                                <div>
                                    <input type="text" v-model="modelo.NOMBRES"
                                        :class="{ error: validation.hasError('modelo.NOMBRES') }"
                                        placeholder="Nombre y apellidos">
                                    <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                                        {{ validation.firstError('modelo.NOMBRES') }}
                                    </span>
                                </div>

                                <div>
                                    <input type="email" v-model="modelo.CORREO"
                                        :class="{ error: validation.hasError('modelo.CORREO') }"
                                        placeholder="Correo electrónico">
                                    <span class="message" v-if="validation.hasError('modelo.CORREO')">
                                        {{ validation.firstError('modelo.CORREO') }}
                                    </span>
                                </div>

                                <div>
                                    <input type="text" v-model="modelo.ASUNTO"
                                    :class="{ error: validation.hasError('modelo.ASUNTO') }" placeholder="Motivo">
                                    <span class="message" v-if="validation.hasError('modelo.ASUNTO')">
                                        {{ validation.firstError('modelo.ASUNTO') }}
                                    </span>
                                </div>

                                <div>
                                    <textarea placeholder="Mensaje" v-model="modelo.MENSAJE"
                                    :class="{ error: validation.hasError('modelo.MENSAJE') }"></textarea>
                                    <span class="message" v-if="validation.hasError('modelo.MENSAJE')">
                                        {{ validation.firstError('modelo.MENSAJE') }}
                                    </span>
                                </div>
                                <button class="text-lato-600 button" @click="submit">Enviar Mensaje</button>
                            </form>
                        </div>
                    </div>
                </section>

            </section>
            <section class="bg-dark">
                <div class="container-custom mx-auto p-5">
                    <div class="flex flex-column gap-2 p-3">
                        <h2 class="text-center text-white">
                            Descubre el plan que se adapta a ti y accede a todos los beneficios
                        </h2>
                        <router-link to="/contacto"
                            class="m-auto bg-duo rounded-full text-white text-xs px-4 py-3 outline-none focus:outline-none lg:mr-1 ml-3 ease-linear transition-all duration-150">
                            Ver Planes
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
    },
};
</script>


<style>
.profile-page {
    background-image: url("../assets/img/backgrounds/bg-contacto.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
}

input,
textarea {
    border: 1px solid #e2e8f0;
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    background-color: #f5f5f5 !important;
    color: rgb(44, 44, 44) !important;
}


.h-500-px {
    height: 500px;
}

.container-contacto {
    width: 80%;
    margin: 30px auto 60px auto;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 20px;
}

.container-contacto .grid {
    display: grid;
    gap: 20px;
    margin: 20px auto;
}

@media (min-width: 768px) {
    .container-contacto .grid {
        grid-template-columns: 5fr 8fr;
    }
}

/* // mobile */
@media (max-width: 768px) {
    .container-contacto .grid>div:nth-child(1) {
        order: 2;
    }

    /* .container-contacto .logos-items{
        ju
    } */
}

.container-contacto .info-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: -webkit-fill-available;
}

.container-contacto .info-item .text-principal {
    margin: 0;
    font-size: 18px;
    color: #1864FF;
}

/* // la p hermano */
.container-contacto .info-item .text-secondary {
    margin: 0;
    font-size: 16px;
    color: #262626;
}

.container-contacto .icon {
    padding: 10px;
    background: #EDF6FF;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-contacto .form input,
.container-contacto .form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.container-contacto .form textarea {
    height: 80px;
}

.container-contacto .button {
    background: #007bff;
    color: white;
    padding: 15px 15px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    width: fit-content;
}
</style>