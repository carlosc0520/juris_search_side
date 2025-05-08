<template>
    <div>
        <navbar v-if="!resumeSection" />
        <main>
            <section class="profile-page" v-if="!resumeSection">
                <div class="mt-10"></div>
                <section class="relative md:px-0 px-2">
                    <div class="container-custom mx-auto px-lg-5">
                        <p class="mb-3 py-2 text-duo text-lato-400 text-2xl text-center" style="font-size: 40px;">
                            Preguntas Frecuentes
                        </p>
                        <p class="pb-3 text-lato-400 text-center" style="font-size: 18px;">
                            Resuelve tus dudas aquí. Si necesitas más ayuda, contáctanos.
                        </p>
                    </div>
                </section>
            </section>

            <section :class='{ "py-5": !resumeSection }' v-if="!loading">
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>

                <div :class="{ 'container mx-auto px-4': !resumeSection }">
                    <div class="flex flex-wrap">
                        <div class="container relative mx-auto aparecer-r-to-l">
                            <div class="border-bottom content-title-question"
                                v-for="pregunta in (resumeSection ? preguntas.slice(0, 3) : preguntas)"
                                :key="pregunta.ID">
                                <button @click="togglePregunta(pregunta.ID)"
                                    class="flex justify-between items-center w-full text-left rounded-lg focus:outline-none font-bold sm:text-sm md:text-base lg:text-lg text-blueGray-800 hover:bg-white hover:text-blueGray-800"
                                    :class="!resumeSection ? 'p-4' : 'py-10'">
                                    <span>{{ pregunta?.DESCRIPCION || "" }}</span>
                                    <i v-if="isOpen(pregunta.ID)" class="text-blue-500 fas fa-chevron-up"></i>
                                    <i v-else class="text-blue-500 fas fa-chevron-down"></i>
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
            <section class="bg-dark" v-if="!resumeSection">
                <div class="container-custom mx-auto p-5">
                    <div class="flex flex-column gap-2 p-3">
                        <h2 class="text-center text-white">
                            ¿Necesitas ayuda? Contáctanos y con gusto atenderemos tu consulta.
                        </h2>
                        <router-link to="/contacto"
                            class="m-auto bg-duo rounded-full text-white text-xs px-4 py-3 outline-none focus:outline-none lg:mr-1 ml-3 ease-linear transition-all duration-150">
                            Escríbenos
                        </router-link>
                    </div>
                </div>
            </section>


        </main>
        <footer-component v-if="!resumeSection" />
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
    props: {
        resumeSection: Boolean,
    },
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
            el.style.transform = 'translateX(-20px)';
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

.content-title-question {
    font-family: Lato;
    font-style: normal;
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