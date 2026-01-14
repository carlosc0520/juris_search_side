<template>
    <div>
        <navbar v-if="!resumeSection" />
        <main>
            <section class="question-landing" v-if="!resumeSection">
                <!-- Hero Section -->
                <div class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">❓ Preguntas Frecuentes</h1>
                        <p class="hero-subtitle">Resuelve tus dudas aquí. Si necesitas más ayuda, contáctanos.</p>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">Cargando preguntas...</p>
                </div>

                <!-- Questions Section -->
                <div v-else class="questions-container">
                    <div class="questions-wrapper aparecer-r-to-l">
                        <div class="question-item" v-for="(pregunta, index) in preguntas" :key="pregunta.ID">
                            <button @click="togglePregunta(pregunta.ID)" class="question-button"
                                :class="{ 'active': isOpen(pregunta.ID) }">
                                <div class="question-header">
                                    <div class="question-number">{{ index + 1 }}</div>
                                    <span class="question-text">{{ pregunta?.DESCRIPCION || "" }}</span>
                                </div>
                                <div class="question-icon">
                                    <svg v-if="isOpen(pregunta.ID)" class="icon" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 15l7-7 7 7" />
                                    </svg>
                                    <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            <transition name="slide-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                                <div v-show="isOpen(pregunta.ID)" class="question-answer"
                                    v-html="pregunta?.HTMLTEXT || ''"></div>
                            </transition>
                        </div>
                    </div>
                </div>

                <!-- CTA Section -->
                <div class="cta-section">
                    <div class="cta-content">
                        <h2 class="cta-title">¿Necesitas ayuda?</h2>
                        <p class="cta-text">Contáctanos y con gusto atenderemos tu consulta.</p>
                        <router-link to="/contacto" class="cta-button">
                            Escríbenos
                            <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </router-link>
                    </div>
                </div>
            </section>

            <!-- Resume Section (cuando se usa como componente) -->
            <section v-if="resumeSection" class="py-5">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap">
                        <div class="container relative mx-auto aparecer-r-to-l">
                            <div class="border-bottom content-title-question" v-for="pregunta in preguntas.slice(0, 3)"
                                :key="pregunta.ID">
                                <button @click="togglePregunta(pregunta.ID)"
                                    class="flex justify-between items-center w-full text-left rounded-lg focus:outline-none font-bold sm:text-sm md:text-base lg:text-lg text-blueGray-800 hover:bg-white hover:text-blueGray-800 py-10">
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
                    this.preguntas = (response || []).map(pregunta => ({
                        ...pregunta,
                        HTMLTEXT: pregunta.HTMLTEXT ? pregunta.HTMLTEXT.replace(/<p><br><\/p>/gi, '') : ''
                    }));
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
.question-landing {
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

/* Hero Section */
.hero-section {
    padding: 3.5rem 2rem;
    text-align: center;
}

.hero-content {
    max-width: 900px;
    margin: 0 auto;
}

.hero-title {
    font-size: 3rem;
    font-weight: 800;
    color: #1F2937;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.125rem;
    color: #4B5563;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
}

/* Loading */
.loading-container {
    text-align: center;
    padding: 4rem 2rem;
}

.loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(107, 163, 255, 0.3);
    border-top-color: #6ba3ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-text {
    color: #1F2937;
    font-size: 1.125rem;
    font-weight: 600;
}

/* Questions Container */
.questions-container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 2rem;
    flex: 1;
}

.questions-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.question-item {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.question-item:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

.question-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
}

.question-button:hover {
    background: rgba(107, 163, 255, 0.05);
}

.question-button.active {
    background: linear-gradient(135deg, rgba(240, 132, 212, 0.1) 0%, rgba(107, 163, 255, 0.1) 100%);
}

.question-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.question-number {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f084d4 0%, #6ba3ff 100%);
    color: white;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1rem;
    flex-shrink: 0;
}

.question-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1F2937;
    line-height: 1.5;
}

.question-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(107, 163, 255, 0.1);
    flex-shrink: 0;
    transition: all 0.3s ease;
}

.question-button:hover .question-icon {
    background: rgba(107, 163, 255, 0.2);
}

.question-button.active .question-icon {
    background: linear-gradient(135deg, #f084d4 0%, #6ba3ff 100%);
}

.icon {
    width: 20px;
    height: 20px;
    color: #6ba3ff;
    transition: all 0.3s ease;
}

.question-button.active .icon {
    color: white;
}

.question-answer {
    padding: 10px 1.5rem 1.5rem 1.5rem;
    color: #4B5563;
    line-height: 1.7;
    font-size: 1rem;
    border-top: 2px solid #F3F4F6;
}

.question-answer :deep(p) {
    margin-bottom: 0.75rem;
}

.question-answer :deep(ul),
.question-answer :deep(ol) {
    margin-left: 1.5rem;
    margin-bottom: 0.75rem;
}

.question-answer :deep(li) {
    margin-bottom: 0.5rem;
}

.question-answer :deep(strong) {
    color: #1F2937;
    font-weight: 600;
}

/* Slide Fade Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
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
    max-width: 600px;
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

.button-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
    transform: translateX(4px);
}

/* Animations */
.aparecer-r-to-l {
    animation: aparecer-r-to-l 0.8s ease-out;
}

@keyframes aparecer-r-to-l {
    0% {
        opacity: 0;
        transform: translateX(30px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Resume Section (componente) */
.content-title-question {
    font-family: Lato;
    font-style: normal;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .questions-container {
        padding: 0 1rem;
    }

    .question-text {
        font-size: 1rem;
    }

    .question-number {
        min-width: 35px;
        height: 35px;
        font-size: 0.9rem;
    }

    .cta-title {
        font-size: 1.5rem;
    }

    .cta-text {
        font-size: 1rem;
    }

    .cta-section {
        margin: 2rem 1rem 0;
    }
}
</style>