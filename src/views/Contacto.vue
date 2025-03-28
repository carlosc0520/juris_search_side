<template>
    <div>
        <navbar />
        <main class="profile-page">
            <section class="relative block h-500-px">
                <div class="absolute top-0 w-full h-full bg-center bg-cover"
                    :style="{ backgroundImage: `url(${currentNoticia.IMAGEN2})` }">
                    <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
            </section>
            <section class="relative py-16 bg-blueGray-200">
                <div class="container mx-auto px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div class="px-6">
                            <div class="flex flex-wrap justify-center">
                                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div class="relative bg-white">
                                        <img alt="..." :src="team2"
                                            class="bg-white shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                                    </div>
                                </div>
                            </div>

                            <div class="flex-auto p-5 lg:p-10">
                                <h4 class="text-2xl font-semibold">
                                    CONTÁCTANOS
                                </h4>
                                <p class="leading-relaxed mt-1 mb-4 text-blueGray-500">
                                    ¿Tienes alguna duda o consulta? Escríbenos y te responderemos a
                                    la brevedad.
                                </p>
                                <div class="relative w-full mb-3 mt-8" :class="{ error: validation.hasError('modelo.NOMBRES') }">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="full-name">
                                        Nombres y apellidos <span class="text-red-500">*</span>
                                    </label>
                                    <input type="text"
                                        v-model="modelo.NOMBRES"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="" />
                                    <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                                        {{ validation.firstError('modelo.NOMBRES') }}
                                    </span>
                                </div>

                                <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.CORREO') }">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="email">
                                        Correo electrónico <span class="text-red-500">*</span>
                                    </label>
                                    <input type="email"
                                        v-model="modelo.CORREO"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="" />
                                    <span class="message" v-if="validation.hasError('modelo.CORREO')">
                                        {{ validation.firstError('modelo.CORREO') }}
                                    </span>
                                </div>

                                <div class="relative w-full mb-3"
                                    :class="{ error: validation.hasError('modelo.ASUNTO') }">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="email">
                                        Motivo <span class="text-red-500">*</span>
                                    </label>
                                    <input type="email" v-model="modelo.ASUNTO"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="" />
                                    <span class="message" v-if="validation.hasError('modelo.ASUNTO')">
                                        {{ validation.firstError('modelo.ASUNTO') }}
                                    </span>
                                </div>

                                <div class="relative w-full mb-3"
                                    :class="{ error: validation.hasError('modelo.MENSAJE') }">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="message">
                                        Mensaje <span class="text-red-500">*</span>
                                    </label>
                                    <textarea rows="4" cols="80" v-model="modelo.MENSAJE"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="" />
                                    <span class="message" v-if="validation.hasError('modelo.MENSAJE')">
                                        {{ validation.firstError('modelo.MENSAJE') }}
                                    </span>
                                </div>
                                <div class="text-center mt-6">
                                    <button @click="submit"
                                        class="bg-app-primary text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button">
                                        Enviar Mensaje
                                    </button>
                                </div>

                            </div>
                            <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full lg:w-9/12 px-4">
                                        <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            Estamos para ayudarte.
                                        </p>
                                        <a href="javascript:void(0)" class="font-normal text-emerald-500">
                                            Escríbenos
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
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
import LoginProxy from "@/proxies/LoginProxy";
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
            return Validator.value(value).required("Campo requerido");
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
    computed: {
        currentNoticia() {
            return this.noticias[this.currentIndex] || { title: '', description: '', image: '' };
        }
    },
    methods: {
        getNoticias() {
            LoginProxy.list({
                INIT: 0,
                ROWS: 4,
                DESC: null,
                CESTDO: 'A'
            })
                .then(async (response) => {
                    const processedResponse = await Promise.all(response.map(noticia => {
                        const type = noticia.IMAGEN.split('.').pop();
                        const imageData = noticia?.IMAGEN2?.data || null;

                        if(!imageData) return noticia;
                        const base64String = imageData.reduce((acc, byte) => acc + String.fromCharCode(byte), '');

                        noticia.IMAGEN2 = `data:image/${type};base64,${window.btoa(base64String)}`;
                        return noticia;
                    }));

                    this.noticias = processedResponse;
                    this.startRotation();
                })
                .catch((error) => {
                    toast.error(error?.message || 'Error al cargar las noticias', { toastId: 'error-noticias' });
                    this.noticias = []
                });
        },
        startRotation() {
            setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.noticias.length;
            }, 5000);
        },
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
    mounted() {
        this.getNoticias();
    },
};
</script>


<style>
input,
textarea {
    border: 1px solid #e2e8f0;
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    background-color: #f5f5f5 !important;
    color: rgb(44, 44, 44) !important;
}


.h-500-px{
    height: 500px;
}
</style>