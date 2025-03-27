<template>
  <div>
    <index-navbar />
    <div :style="{ backgroundImage: `url(${portada})` }" class="relative d-flex bg-contain bg-no-repeat lg:bg-cover lg:bg-center">
      <div class="degradado"></div>
      <div class="m-auto container z-2 py-40 pb-89">
        <div class="row">
          <div class="col">
            <h1>Encuentra en segundos la <span class="text-duo font-bold">jurisprudencia</span> y <span class="text-duo font-bold">legislación</span> peruana que buscas</h1>
            <span>Consulta jurisprudencia penal en esta herramienta online</span>
            <div class="pt-5">
              <button onclick="window.location='#mi-seccion'"
                class="bg-duo rounded-full text-white text-xs px-4 py-3 outline-none focus:outline-none ease-linear transition-all duration-150">
                Adquirir plan
              </button>
            </div> -->
          </div>
          <div class="col">
          </div>
        </div>
      </div>
    </div>

    <div class="mt-20"></div>
    <section class="background-custom relative">
      <div class="container-custom mx-auto px-lg-5">
        <p class="text-duo text-2xl text-center">
          Juris Search es una herramienta digital diseñada para simplificar la
          búsqueda selectiva de jurisprudencia en derecho penal, derecho penal económico y de la
          empresa
        </p>
      </div>
      <div class="m-auto image-container">
        <img :src="screen" alt="imagen-1" class="w-full image-outside mx-auto"
          style="transform: translateY(100px); width: 80%; z-index: 5" />
      </div>
    </section>


    <section class="mt-20 container-mision-v relative" id="conoce-proposito">
      <div class="mx-auto container pt-5">
        <h2 class="text-center">Conoce <span class="text-blue-500">nuestro próposito</span></h2>
      </div>
      <div class="pt-5 mx-auto container text-center">
        <button
          class="button-duo font-bold rounded-full px-4 py-3 outline-none focus:outline-none ease-linear transition-all duration-150 shadow">
          <span class="text-duo">Quienes somos</span>
        </button>
        <button
          @click="selectedSection = 'nuestros-valores'"
          :class="selectedSection === 'nuestros-valores' ? 'button-duo shadow rounded-full px-4 py-3 outline-none focus:outline-none ease-linear transition-all duration-150' : 'btn'"
          class="ms-4 font-bold px-4 py-3 outline-none focus:outline-none ease-linear transition-all duration-150 border-0">
          <span :class="selectedSection === 'nuestros-valores' ? 'text-duo' : ''">Nuestros valores</span>
        </button>
      </div>
      <div v-if="selectedSection === 'quienes-somos'" class="container mx-auto">
        <div class="flex flex-wrap items-center">
          <div class="w-full md:w-12/12 px-4 img-container">
            <div class="flex flex-wrap">
              <div class="w-full-container md:w-6/12 px-4">
                <div class="relative flex flex-col mt-4">
                  <div class="px-4 py-5 flex-auto container-valor">
                    <div class="container-imagen flex md:justify-start justify-center">
                      <div class="mb-3">
                        <img :src="visionVue" alt="vision" />
                      </div>
                    </div>
                    <h6 class="sm-text-center text-xl mb-2 font-semibold text-blue-500">
                      Visión
                    </h6>
                    <p class="mb-4 font-light">
                      Brindar a nuestros usuarios una plataforma digital intuitiva, completa y actualizada, que facilite
                      la consulta y búsqueda de jurisprudencia nacional y extranjera en derecho penal económico y de la
                      empresa.
                    </p>
                  </div>
                </div>
              </div>

              <div class="w-full-container md:w-6/12 px-4">
                <div class="relative flex flex-col min-w-0 mt-4">
                  <div class="px-4 py-5 flex-auto container-valor">
                    <div class="container-imagen flex  md:justify-start justify-center">
                      <div class="mb-3">
                        <img :src="misionVue" alt="mision" />
                      </div>
                    </div>
                    <h6 class="sm-text-center text-xl mb-1 font-semibold text-blue-500">
                      Misión
                    </h6>
                    <p class="mb-4 font-light">
                      Ser la herramienta digital líder en consulta y búsqueda de jurisprudencia en derecho penal
                      económico y de la empresa en Perú.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedSection === 'nuestros-valores'" class="container mx-auto">
        <div class="w-full md:w-12/12 px-4">
          <Carousel :breakpoints="carouselConfig.breakpoints" :wrap-around="carouselConfig.wrapAround" :autoplay="false" :settings="{ navigationEnabled: true }">
            <Slide class="p-2 mb-5" v-for="valor in valores" :key="valor.id">
              <div class="card border-0 p-3 mr-2" style="height: 100% !important;">
                <img :src="valor?.image" width="30" />
                <div>
                  <h4 class="text-sm text-primary">{{ valor?.name }}</h4>
                  <p class="text-sm">{{ valor?.description }}</p>
                </div>
              </div>
            </Slide>
  
            <template #addons>
              <CarouselNavigation>
                <template #prev>
                  <button>
                    <img :src="leftArrow" alt="left-arrow" />
                  </button>
                </template>
                <template #next>
                  <button>
                    <img :src="rightArrow" alt="left-arrow" />
                  </button>
                </template>
              </CarouselNavigation>
              <Pagination />
            </template> 
          </Carousel>
        </div>
      </div>
    </section>

    <section class="relative block" id="mi-nosotros">
      <div class="animation-b-t mt-0 container mx-auto px-4 lg:pt-24">
        <h2 style="text-align: center!important; margin-bottom: 20px!important;">Lo que te <span
            class="text-primary">ofrecemos</span></h2>
        <Carousel :breakpoints="carouselConfig.breakpoints" :wrap-around="carouselConfig.wrapAround"
          :autoplay="carouselConfig.autoplay" :settings="{ navigationEnabled: true }">
          <Slide v-for="slide in slides" :key="slide.id">
            <div class="slide-content">
              <img :src="slide?.image" class="slide-image" />
              <div class="text-container">
                <h4 class="slide-text text-sm">{{ slide?.text }}</h4>
                <p class="slide-description text-sm">{{ slide?.description }}</p>
              </div>
            </div>
          </Slide>

          <template #addons>
            <CarouselNavigation>
              <template #prev>
                <button>
                  <img :src="leftArrow" alt="left-arrow" />
                </button>
              </template>
              <template #next>
                <button>
                  <img :src="rightArrow" alt="left-arrow" />
                </button>
              </template>
            </CarouselNavigation>
          </template>
        </Carousel>
      </div>
    </section>

    <section class="py-4 pt-3" id="mi-seccion">
      <div id="pricing" class="py-6 px-6 mb-0 lg:px-20 my-2 md:my-6">
        <div class="text-center mb-6">
          <h2>Nuestros <span class="text-primary">planes</span></h2>
          <span class="text-muted-color text-md">
            Elige el plan que mejor se adapte a tus necesidades
          </span>
        </div>

        <div class="row flex flex-wrap justify-center gap-4 flex-row-reverse pt-4">
          <div class="bg-white col-md-3 col-sm-12 p-0 md:p-4 card-price border hover:border-primary rounded-3xl overflow-hidden" :class="{ 'scale-custom ms-3 border-primary': plan?.DESCRIPCION === 'PREMIUN' }"
            style="width: auto;;height: auto;" v-for="plan in planes" :key="plan.id">
            <div class="text-center p-3 text-primary" :class="{ 'bg-duo text-white': plan?.DESCRIPCION === 'PREMIUN' }">Plan {{ plan?.DESCRIPCION === 'PREMIUN' ? "popular" : "básico" }}</div>
            <div
              class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer duration-300 transition-all"
              style="border-radius: 10px; max-width: 300px;">
              <div class="flex justify-center items-center gap-2">
                <div v-if="plan?.DESCRIPCION === 'PREMIUM'">
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
              <button @click="goToPlan(plan)" class="btn btn-outline-primary py-3" style="border-radius: 30px"
                :class="{ 'shadow-lg pink-button text-white border-0': plan?.DESCRIPCION === 'PREMIUM' }">
                {{ plan?.DESCRIPCION === 'PREMIUM' ? "Adquirir Plan" : "Probar gratis" }}
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
      </div>

      <ModalCrearUsuario :show="modalCrearUsuario.show" :close="() => modalCrearUsuario.show = false"
        :update="() => { }" />
    </section>

    <!-- <section class="container-contactanos relative block py-24 lg:pt-0 bg-blueGray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center lg:-mt-64 -mt-32">
          <div class="contactos-container w-full lg:w-6/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
              <div class="flex-auto contacto p-5 lg:p-10">
                <h4 class="text-2xl font-semibold text-center">
                  CONTÁCTANOS
                </h4>
                <p class="leading-relaxed mt-1 mb-4 text-blueGray-500">
                  ¿Tienes alguna duda o consulta? Escríbenos y te responderemos a la brevedad.
                </p>
                <div class="relative w-full mb-3 mt-8" :class="{ error: validation.hasError('modelo.NOMBRES') }">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="full-name">
                    Nombres y apellidos <span class="text-red-500">*</span>
                  </label>
                  <input type="text" v-model="modelo.NOMBRES"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="" />
                  <span class="message" v-if="validation.hasError('modelo.NOMBRES')">
                    {{ validation.firstError('modelo.NOMBRES') }}
                  </span>
                </div>

                <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.CORREO') }">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                    Correo electrónico <span class="text-red-500">*</span>
                  </label>
                  <input type="email" v-model="modelo.CORREO"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="" />
                  <span class="message" v-if="validation.hasError('modelo.CORREO')">
                    {{ validation.firstError('modelo.CORREO') }}
                  </span>
                </div>

                <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.ASUNTO') }">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                    Motivo <span class="text-red-500">*</span>
                  </label>
                  <input type="email" v-model="modelo.ASUNTO"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="" />
                  <span class="message" v-if="validation.hasError('modelo.ASUNTO')">
                    {{ validation.firstError('modelo.ASUNTO') }}
                  </span>
                </div>

                <div class="relative w-full mb-3" :class="{ error: validation.hasError('modelo.MENSAJE') }">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="message">
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
            </div>
          </div>
        </div>
      </div>
      <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
    </section> -->

    <section class="relative block" id="mi-nosotros">
      <div class="animation-b-t mt-0 container mx-auto px-4 lg:pt-24">
        <h2>Resolvemos tus <span class="text-primary">preguntas frecuentes</span></h2>
      </div>

      <div class="m-auto container z-2">
        <div class="row">
          <div class="col-12 col-md-6">
            <img :src="preguntasFrecuentes" alt="imagen-1" class="w-full image-outside mx-auto p-4 p-md-0" />
          </div>
          <div class="col-12 col-md-6 bg-white py-0 my-0">
            <Question :resumeSection="true" />
            <router-link to="/questions" class="d-inline-flex border border-primary rounded-full px-4 py-3 ms-3 ms-md-0">
              Ver más preguntas frecuentes
              <img :src="nextIcon" alt="next-icon" class="ms-2" />
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="hidden d-none py-4 pt-5 mt-5 bg-comments" :style="{ backgroundImage: `url(${bgComments})` }"
      id="mi-seccion">
      <div id="pricing" class="py-6 px-6 mb-0 lg:px-20 my-2 md:my-6">
        <div class="text-center mb-6">
          <h2 style="text-align: center!important">Lo que <span class="text-primary">nuestros usuarios dicen</span></h2>
        </div>

        <div class="container mx-auto">
          <Carousel :breakpoints="carouselConfig.breakpoints" :wrap-around="carouselConfig.wrapAround"
            :autoplay="carouselConfig.autoplay" :settings="{ navigationEnabled: true }">
            <Slide v-for="comment in comments" :key="comment.id">
              <div class="flex justify-center p-3">
                <div class="bg-white text-center p-6 rounded-xl shadow" style="max-width: 400px;">
                  <img :src="comment.image" class="w-20 h-20 rounded-full mx-auto mb-4" />
                  <p class="text-gray-600 text-sm mb-4">
                    {{ comment.text }}
                  </p>
                  <h3 class="text-lg font-semibold text-gray-900">{{ comment.name }}</h3>
                  <p class="text-primary font-medium">{{ comment.profession }}</p>
                </div>
              </div>
            </Slide>

            <template #addons>
              <CarouselNavigation>
                <template #prev>
                  <button class="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <img :src="leftArrow" alt="left-arrow" class="w-5 h-5" />
                  </button>
                </template>
                <template #next>
                  <button class="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <img :src="rightArrow" alt="right-arrow" class="w-5 h-5" />
                  </button>
                </template>
              </CarouselNavigation>
            </template>
          </Carousel>
        </div>
      </div>
    </section>

    <section class="bg-dark mt-5">
      <div class="container-custom mx-auto p-5">
        <div class="flex flex-column gap-2 p-3">
          <h2 class="text-center text-white">¿Necesitas ayuda? Contáctanos y con gusto atenderemos tu consulta</h2>
          <router-link to="/contacto" 
            class="m-auto bg-duo rounded-full text-white text-xs px-4 py-3 outline-none focus:outline-none lg:mr-1 ml-3 ease-linear transition-all duration-150">
            Contáctanos ahora
          </router-link>
        </div>
      </div>
    </section>

    <footer-component />
  </div>
</template>
<script>

import login from "@/assets/img/login.jpg";
import profile from "@/assets/img/profile.jpg";
import landing from "@/assets/img/landing.jpg";
import beneficioBg1 from "@/assets/img/resources/beneficios-bg-card-1.png";
import beneficioBg2 from "@/assets/img/resources/beneficios-bg-card-2.png";
import beneficioBg3 from "@/assets/img/resources/beneficios-bg-card-3.png";
import beneficioBg4 from "@/assets/img/resources/beneficios-bg-card-4.png";
import beneficioBg5 from "@/assets/img/resources/beneficios-bg-card-5.png";
import valorImg1 from "@/assets/img/resources/accesibilidad-icon.png";
import valorImg2 from "@/assets/img/resources/transparencia-icon.png";
import valorImg3 from "@/assets/img/resources/innovacion-icon.png";
import valorImg4 from "@/assets/img/resources/compromisoetico-icon.png";
import valorImg5 from "@/assets/img/resources/colaboracion-icon.png";
import leftArrow from "@/assets/img/resources/left-arrow.png";
import rightArrow from "@/assets/img/resources/right-arrow.png";
import corona from "@/assets/img/resources/Corona.png";
import preguntasFrecuentes from "@/assets/img/resources/preguntas-frecuentes.png";
import nextIcon from "@/assets/img/resources/next-icon.png";
import userExample from "@/assets/img/resources/user-example.png";
import bgComments from "@/assets/img/resources/bg-comments.png";
import { Validator } from 'simple-vue-validator';
import { toast } from 'vue3-toastify';
import { Carousel, Slide, Navigation as CarouselNavigation, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// * USADOS
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import patternVue from "@/assets/img/resources/imagen.png";
import misionVue from "@/assets/img/resources/Arrow.png";
import visionVue from "@/assets/img/resources/Show.png";
import portada from "@/assets/img/resources/portada-inicio.jpg";
import screen from "@/assets/img/resources/screen-inicio.png";


// * PROXIES
import LoginProxy from "@/proxies/LoginProxy";
import SettingsProxy from "@/proxies/SettingsProxy.js";
import MantenimientoProxy from "@/proxies/MantenimientoProxy.js";
import ModalCrearUsuario from "./Modales/ModalCrearUsuario.vue";
import Question from "./Question.vue";
import { ref } from "vue";

export default {
  setup() {
    return {
      selectedSection: ref("quienes-somos")
    };
  },
  data() {
    return {
      patternVue,
      login,
      profile,
      landing,
      // VARIABLES USADAS
      noticias: [],
      currentIndex: 0,
      misionVue,
      visionVue,
      portada,
      valorImg1,
      valorImg2,
      valorImg3,
      valorImg4,
      valorImg5,
      screen,
      modelo: {
        NOMBRES: null,
        CORREO: null,
        ASUNTO: null,
        MENSAJE: null,
      },
      isLoading: false,
      modalCrearUsuario: {
        show: false,
        data: null,
      },
      planes: [
      ],
      carouselConfig: {
        wrapAround: true,
        autoplay: 5000,
        breakpoints: {
          320: { itemsToShow: 1 },
          768: { itemsToShow: 2 },
          1024: { itemsToShow: 3 },
        },
      },
      slides: [
        {
          id: 1,
          image: beneficioBg1,
          text: "Base de datos actualizada",
          description: "Amplia colección de resoluciones y sentencias sobre la materia.",
        },
        {
          id: 2,
          image: beneficioBg2,
          text: "Búsqueda avanzada",
          description: "Herramienta tecnológica de búsqueda avanzada que permite filtrar jurisprudencia específica de manera rápida y eficiente.",
        },
        {
          id: 3,
          image: beneficioBg3,
          text: "Análisis crítico",
          description: "comentarios de expertos acerca de las deciciones judiciales más relavantes, que proporcionan contexto y claridad."
        },
        {
          id: 4,
          image: beneficioBg4,
          text: "Continua actualización",
          description: "Herramienta tecnológica de búsqueda avanzada que permite filtrar jurisprudencia específica de manera rápida y eficiente.",
        },
        {
          id: 5,
          image: beneficioBg5,
          text: "Interfaz amigable",
          description: "Diseño intuitivo y de fácil uso para la busqueda y consulta de documentos jurídicos"
        },
      ],
      comments: [
        {
          id: 1,
          image: userExample,
          text: "Lorem ipsum dolor sit amet consectetur. Vulputate integer enim nunc fringilla risus id volutpat.",
          name: "Martín",
          profession: "Ingeniero Civil",
        },
      ],
      valores: [
        {
          id: 1,
          image: valorImg1,
          name: "Accesibilidad",
          description: "Promovemos el libre acceso a la información judicial.",
        },
        {
          id: 2,
          image: valorImg2,
          name: "Transparencia",
          description: "Ofrecemos información judicial precisa, clara y confiable.",
        },
        {
          id: 3,
          image: valorImg3,
          name: "Innovación",
          description: "Nuestras herramientas digitales mejoran continuamente para favorecer la experiencia del usuario.",
        },
        {
          id: 4,
          image: valorImg4,
          name: "Compromiso Ético",
          description: "Contribuimos el fortalezimiento del Estado de Derecho y a la construcción de una sociedad mas justa mediante el libre y fácil acceso a la información digital.",
        },
        {
          id: 5,
          image: valorImg5,
          name: "Compromiso Ético",
          description: "Contribuimos el fortalezimiento del Estado de Derecho y a la construcción de una sociedad mas justa mediante el libre y fácil acceso a la información digital.",
        },
      ],
      leftArrow,
      rightArrow,
      corona,
      preguntasFrecuentes,
      nextIcon,
      userExample,
      bgComments
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
    IndexNavbar,
    FooterComponent,
    ModalCrearUsuario,
    Carousel,
    CarouselNavigation,
    Pagination,
    Slide,
    Question
  },
  computed: {
    currentNoticia() {
      return this.noticias[this.currentIndex] || { title: '', description: '', image: '' };
    }
  },
  methods: {
    capitalizeFirst(text) {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
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

            if (!imageData) return noticia;

            const base64String = imageData.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
            noticia.IMAGEN2 = `data:image/${type};base64,${window.btoa(base64String)}`;
            return noticia;
          }));

          this.noticias = processedResponse;
          this.startRotation();
        })
        .catch((error) => {
          toast.error(error?.message || 'Ocurrió un error al obtener las noticias', { toastId: 'error' });
          this.noticias = []
        });
    },
    getPlanes() {
      MantenimientoProxy.listPlanesAbout({
        ROWS: 1000,
        INIT: 0,
        DESC: null
      }
      ).then((response) => {
        response = response.map((item) => {
          item.PRECIO = item.PRECIO.toFixed(2);
          item.TIEMPO = Number((item.TIEMPO / 30).toFixed(0));
          
          if(item.VALOR === '1'){
            item.RESTRICIONES = [
              "Accede a filtros de búsqueda especializados.",
              "Visualiza y descarga resoluciones.",
              "30 días de prueba",
            ]

            item.CDESTDO = "El plan básico dura un mes."
          }

          
          if(item.VALOR === '2'){
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
    goToPlan() {
      this.modalCrearUsuario.show = true;
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
    },
    async getParams() {
      // promise de getNoticias y getPlanes
      await Promise.all([this.getNoticias(), this.getPlanes()]);
    }
  },

  mounted() {
    this.getParams();

    document.addEventListener('DOMContentLoaded', function () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      });

      const elementos = document.querySelectorAll('.animation-b-t');
      const elementos2 = document.querySelectorAll('.animation-r-l');
      const elementos3 = document.querySelectorAll('.animation-l-r');

      elementos.forEach(elemento => {
        observer.observe(elemento);
      });

      elementos2.forEach(elemento => {
        observer.observe(elemento);
      });

      elementos3.forEach(elemento => {
        observer.observe(elemento);
      });
    });



  },
};
</script>

<style scoped>
/* Cuando el elemento es visible, se aplicará la animación */
.animation-b-t.visible {
  animation: frame3 1s ease-in-out;
}

/* Keyframes que definen los "frames" de la animación */
@keyframes frame3 {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}

/* Celulares en modo vertical */
@media only screen and (max-width: 480px) {

  /* Estilos para dispositivos móviles */
  .container-h-screen {
    margin-bottom: 1rem
  }

  .container-contactanos {
    margin: 0 !important;
  }

  .container-contactanos .contactos-container {
    padding: 0 !important;
  }

  .container-contactanos .contacto {
    padding: 2rem !important;
  }
}

/* Tabletas en modo vertical y horizontal */
@media only screen and (min-width: 481px) and (max-width: 768px) {

  /* Estilos para tabletas */
  .container-text {
    width: 100% !important;
  }

  .container-h-screen {
    height: 70vh;
  }

  .w-full-container {
    width: 100% !important;
    text-align: justify;
  }

  .w-full-container .container-imagen {
    justify-content: center;
  }
}

/* Laptops pequeñas y dispositivos medianos */
@media only screen and (min-width: 769px) and (max-width: 1024px) {

  /* Estilos para laptops */
  .container-text {
    width: 100% !important;
  }
}

/* Escritorios grandes o pantallas de alta resolución */
@media only screen and (min-width: 1025px) {
  /* Estilos para pantallas grandes */
}



@media (max-width: 768px) {
  #img-inicio {
    display: none;
  }

  #container-fluid-img {
    padding: 0 !important;
  }


  .h2-init {
    padding-top: 30px;
  }

  .container-mision-v {
    margin: 0 !important;
    padding: 0 !important;
  }

  .container-valor {
    padding: 0 !important;
  }
}

.img-container img {
  max-height: 40px;
  max-width: 40px;

}

.ul-list-details li {
  list-style-type: none;
}

.card-price:hover {
  border: 1px solid #a5bef5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.imagen-logo-main {
  margin-top: 10rem;
  padding: 0 !important;
  margin-right: 5rem;
  margin-left: 5rem;
  border-radius: 10px;
  width: 40%;
  height: auto;
  box-shadow: -1px 1px 5px 4px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: -1px 1px 5px 4px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: -1px 1px 5px 4px rgba(0, 0, 0, 0.3);
  opacity: 0.8;
  animation: frame 1s ease-in-out;
}


.animation-r-l {
  animation: frame2 1s ease-in-out;
}

@keyframes frame {
  from {
    opacity: 0;
    transform: translateX(100%);
  }

  to {
    opacity: 0.8;
    transform: translateX(0);
  }
}

@keyframes frame2 {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }

  to {
    opacity: 0.8;
    transform: translateX(0);
  }
}

:deep(.carousel__viewport) {
  gap: 20px;
}

.slide-content {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
}

.slide-image {
  width: 100%;
  display: block;
}

.text-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  padding: 10px;
  transition: all 0.5s ease;
}

.slide-text {
  margin: 0;
  color: white;
  transition: transform 0.5s ease;
}

.slide-description {
  color: white;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.5s ease, max-height 0.5s ease;
}

.slide-content:hover .text-container {
  bottom: 20px;
}

.slide-content:hover .slide-text {
  transform: translateY(-10px);
}

.slide-content:hover .slide-description {
  opacity: 1;
  max-height: 100px;
}

/* Botones de navegación */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
}

.prev-button {
  left: -30px;
  /* Ajusta la posición izquierda */
}

.next-button {
  right: -30px;
  /* Ajusta la posición derecha */
}

.bg-comments {
  background-size: cover;
  background-position: center top;
}
</style>