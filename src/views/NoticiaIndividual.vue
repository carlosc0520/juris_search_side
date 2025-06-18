<template>
    <div>
        <navbar />
        <main>
            <section class="profile-page">
                <div class="mt-10"></div>
                <section class="container-noticias-large">
                    <div class="mb-3" style="width: -webkit-fill-available;">
                        <div class="breadcrums-letter">
                            <p>Newsletters</p>
                            <span>></span>
                            <p>{{ noticia.CATEGORIAS }}</p>
                            <span>></span>
                            <p>{{ noticia.TITULO }}</p>
                        </div>
                    </div>
                    <div class="flex flex-column gap-2">
                        <div class="autor-card" v-for="(autor, index) in noticia?.AUTORES" :key="index">
                            <!-- Columna 1: Imagen -->
                            <div class="autor-imagen" v-if="autor?.IMAGEN">
                                <img :src="autor?.IMAGEN"
                                    onerror="this.onerror=null;this.src='https://placehold.co/80x80'"
                                    alt="Foto del autor" />
                            </div>

                            <!-- Columna 2: Contenido -->
                            <div class="autor-info">
                                <div class="autor-nombre">{{ autor?.AUTOR }}</div>
                                <div class="autor-fecha">Publicado el: {{ noticia?.FCRCN }}</div>
                                <div class="autor-redes">
                                    <span>Redes:</span>
                                    <div class="redes-iconos">
                                        <a v-for="(red, i) in autor.REDES" :key="i" :href="red.red" target="_blank"
                                            rel="noopener noreferrer">
                                            <img :src="red.icon" alt="icono red social" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="display-contenedor">
                            <a class="imagen-noticia" :href="noticia?.ENLACE || ''" target="_blank"
                                rel="noopener noreferrer">
                                <img :src="noticia?.IMAGEN" alt="" class="rounded-lg w-1/2 h-1/2" />
                            </a>
                            <p class="text-descripcion" v-html="noticia?.DESCRIPCION || ''">
                            </p>
                        </div>
                    </div>

                </section>
            </section>

            <section class="bg-dark">
                <div class="container-custom mx-auto p-5">
                    <div class="flex flex-column gap-2 p-3">
                        <h2 class="text-center text-white">
                            Crea una cuenta y accede a material académico exclusivo
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
import { toast } from 'vue3-toastify';

// * PROXIES
import LoginProxy from "../proxies/LoginProxy";

export default {
    data() {
        return {
            urls: {
                instagram: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
                facebook: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
                linkedin: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
                whatsapp: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg",
            },
            noticia: [],
            isLoading: false,
        };
    },
    validators: {

    },
    components: {
        Navbar,
        FooterComponent
    },
    methods: {
        async listNoticia(id) {
            this.isLoading = true;
            await LoginProxy.list({
                ID: id,
                CESTDO: '',
                ROWS: 1,
                INIT: 0,
                DESC: '',
                IDCATEGORIA: null,
            })
                .then((response) => {
                    if (response.length > 0) {
                        let noticiaFind = response[0];
                        this.noticia = {
                            ...noticiaFind,
                            FCRCN: new Date(noticiaFind.FCRCN).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }),
                            AUTORES: JSON.parse(noticiaFind.AUTORES),
                            IMAGEN: noticiaFind.IMAGEN ? `https://jurissearch.com${noticiaFind.IMAGEN}` : null,
                        };

                        this.noticia.AUTORES = this.noticia.AUTORES.map((autor) => {
                            let autorFind = {
                                ...autor,
                                AUTORESREDES: autor.REDES.split(","),
                                REDES: autor.REDES.split(",").map((red) => {
                                    let iconUrl;
                                    if (red.includes("instagram")) {
                                        iconUrl = this.urls.instagram;
                                    } else if (red.includes("facebook")) {
                                        iconUrl = this.urls.facebook;
                                    } else if (red.includes("linkedin")) {
                                        iconUrl = this.urls.linkedin;
                                    } else if (red.includes("whatsapp")) {
                                        iconUrl = this.urls.whatsapp;
                                    }

                                    return {
                                        red: red,
                                        icon: iconUrl,
                                    };
                                }),
                                IMAGEN: autor.RUTA ? `https://jurissearch.com${autor.RUTA}` : null,
                            };

                            autorFind.REDES = autorFind.REDES.filter((red) => red.red !== "");
                            return autorFind;
                        });

                    } else {
                        this.$router.push("/noticias");
                        toast.error("Ocurrió un error al cargar las noticias", { toastId: "error" });
                    }
                })
                .catch(() => toast.error("Ocurrió un error al cargar las noticias", { toastId: "error" }))
                .finally(() => (this.isLoading = false));
        },
    },
    mounted() {
        const id = this.$route.params.id;
        if (isNaN(id)) {
            this.$router.push("/noticias");
        } else {
            this.listNoticia(id);
        }

    },
};
</script>


<style scoped>
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

.container-noticias-large {
    width: 80%;
    margin: 30px auto 60px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.breadcrums-letter {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;

    font-family: Lato;
    font-size: 15px;
}

.imagen-noticia {
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 768px) {
    .breadcrums-letter {
        display: grid;
        grid-template-columns: 4fr 1fr;
    }

}

.breadcrums-letter p {
    color: #262626;
    margin: 0px;
}

.breadcrums-letter p:last-child {
    font-weight: 600;
    color: #1864FF;
}

.breadcrums-letter span {
    color: #1864FF
}

.autor-card {
    display: flex;
    gap: 16px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    align-items: flex-start;
}

.autor-imagen img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.autor-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.autor-nombre {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.autor-fecha {
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
}

.autor-redes {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.redes-iconos {
    display: flex;
    gap: 6px;
}

.redes-iconos img {
    width: 15px !important;
    height: 15px !important;
    ;
    border-radius: 50%;
    transition: opacity 0.3s ease;
}

.redes-iconos img:hover {
    opacity: 0.7;
}

.text-descripcion {
    font-family: Lato;
    font-size: 16px;
    color: #454644;
    text-align: justify;
    margin-top: 20px;
}

ul li{
    margin-bottom: 10px;
    list-style: disc!important;
    text-align: justify!important;
}

.display-contenedor{
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .display-contenedor{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}
</style>