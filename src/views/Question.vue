<template>
    <div>
        <navbar />
        <main>
            <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div class="absolute top-0 w-full h-full bg-center bg-cover"
                    :style="{ backgroundImage: 'url(' + questionResource + ')', backgroundSize: 'cover', backgroundPosition: 'center' }">
                    <span id="blackOverlay" class="w-full h-full absolute opacity-75 bg-black"></span>
                </div>
                <div class="container relative mx-auto">
                    <div class="items-center flex flex-wrap">
                        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div class="pr-12">
                                <h1 class="text-white font-semibold text-5xl">
                                    Preguntas frecuentes
                                </h1>
                                <p class="mt-4 text-lg text-blueGray-200">
                                    Aquí encontrarás las preguntas más frecuentes que nuestros
                                    usuarios nos hacen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style="transform: translateZ(0);">
                    <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon class="text-blueGray-100 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </div>
            <section class="mt-4 bg-blueGray-100 -mt-24 py-24">
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>

                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap">
                        <div class="container relative mx-auto aparecer-r-to-l">
                            <div class="content-title-question" v-for="pregunta in preguntas" :key="pregunta.ID">
                                <button @click="togglePregunta(pregunta.ID)"
                                    class="flex justify-between items-center w-full p-4 bg-blueGray-100 text-left rounded-lg focus:outline-none font-bold sm:text-sm md:text-base lg:text-lg text-blueGray-800 hover:bg-white hover:text-blueGray-800">
                                    <span>{{ pregunta?.DESCRIPCION || "" }}</span>
                                    <i v-if="isOpen(pregunta.ID)" class="fas fa-chevron-up"></i>
                                    <i v-else class="fas fa-chevron-down"></i>
                                </button>
                                <transition name="slide-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                                    <div v-show="isOpen(pregunta.ID)"
                                        class="p-4 bg-white border-t border-gray-200 rounded-lg"
                                        v-html="pregunta?.HTMLTEXT || ''"></div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




        </main>
        <footer-component />
    </div>
</template>
<script>
import Navbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";

import team1 from "@/assets/img/team-1-800x800.jpg";
import team2 from "@/assets/img/team-2-800x800.jpg";
import team3 from "@/assets/img/team-3-800x800.jpg";
import team4 from "@/assets/img/team-4-470x470.png";
import questionResource from "@/assets/img/resources/resource-question.jpg";
// * 
import LoginProxy from "../proxies/LoginProxy";
import { toast } from 'vue3-toastify';

export default {
    data() {
        return {
            team1,
            team2,
            team3,
            team4,
            questionResource,

            //* 
            preguntas: [],
            openPreguntaId: null,
            loading: false,

        };
    },
    components: {
        Navbar,
        FooterComponent,
    },
    methods: {
        async preguntasAll() {
            this.loading = true;
            LoginProxy.listpreguntas({
                INIT: 0,
                ROWS: 100000,
                DESC: null,
                CESTDO: 'A'
            })
                .then((response) => {
                    this.preguntas = response || [];
                })
                .catch((error) => toast.error(error.message))
                .finally(() => {
                    this.loading = false;
                });
        },
        togglePregunta(id) {
            this.openPreguntaId = this.openPreguntaId === id ? null : id;
        },
        isOpen(id) {
            return this.openPreguntaId === id;
        },
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'translateX(-20px';
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = 1;
            el.style.transform = 'translateX(0)';
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = 0;
            el.style.transform = 'translateX(-20px';
            done();
        },
    },
    mounted() {
        this.preguntasAll();
    },
};
</script>

<style scoped>
.aparecer-r-to-l {
    animation: aparecer-r-to-l 1s;
}

@keyframes aparecer-r-to-l {
    0% {
        opacity: 0;
        transform: translateX(20px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>