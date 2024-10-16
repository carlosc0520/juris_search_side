<template>
    <div>
        <navbar />
        <main class="bg-white">
            <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div class="absolute top-0 w-full h-full bg-center bg-cover" 
                :style="`background-image: url(${backgroundImage}); background-size: cover; background-position: center;`">
                    <span id="blackOverlay" class="w-full h-full absolute opacity-75 bg-black"></span>
                </div>
                <div class="container relative mx-auto p-5">
                    <div class="items-center flex flex-wrap">
                        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div class="">
                                <h1 class="text-white font-semibold text-5xl">
                                    últimas noticias
                                </h1>
                                <p class="mt-4 text-lg text-blueGray-200">
                                    Aqui encontrarás las últimas noticias de Juris Search.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style="transform: translateZ(0);">
                    <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0" fill="white">
                        <polygon class="text-white white bg-white fill-current" points="2560 0 2560 100 0 100">
                        </polygon>
                    </svg>
                </div>
            </div>



            <div class="container mx-auto px-4 mt-5 my-0">
                <h2 class="text-center text-xl font-bold mb-2">Síguenos en Instagram</h2>
                <p class="text-center">Descubre nuestras últimas publicaciones y actualizaciones.</p>
                <iframe src="https://www.instagram.com/juris.search/embed" class="frame-instagram m-0" frameborder="0"
                    scrolling="no" allowfullscreen></iframe>
            </div>
        </main>
        <footer-component />
    </div>
</template>
<script>
import FooterComponent from "@/components/Footers/Footer.vue";
import Navbar from "@/components/Navbars/IndexNavbar.vue";

import team1 from "@/assets/img/team-1-800x800.jpg";
import team2 from "@/assets/img/team-2-800x800.jpg";
import team3 from "@/assets/img/team-3-800x800.jpg";
import backgroundImage from "@/assets/img/resources/imagen.png";
import team4 from "@/assets/img/team-4-470x470.png";

export default {
    data() {
        return {
            team1,
            team2,
            team3,
            team4,
            backgroundImage
        };
    },
    components: {
        Navbar,
        FooterComponent,
    },
};
</script>

<style>
.frame-instagram {
    width: 100%;
    height: 100%;
    min-height: 1100px;
    border: 0;
    margin: 20px 0 50px 0;
    overflow: hidden;
}

@media (max-width: 768px) {
    .frame-instagram {
        min-height: 500px;
    }
}
</style>