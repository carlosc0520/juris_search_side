<template>
    <div>
        <navbar />
        <main>
            <section class="profile-page">
                <div class="mt-10"></div>
                <div class="" style="width: -webkit-fill-available;">
                    <p class="mb-3 text-duo text-lato-400 text-2xl text-center" style="font-size: 40px;">
                        Newsletters
                    </p>
                    <div class="text-lato-400 text-center" style="background-color: #262626;">
                        <ul
                            class="py-3 w-full flex flex-row gap-4 justify-center items-center text-white text-sm font-semibold p-2">
                            <li class="cursor-pointer" :key="0" @click="active = 'Todos'"
                                :class="active === 'Todos' ? 'text-duo-claro' : ''">TODOS</li>
                            <li class="cursor-pointer" @click="active = cat.DESCP"
                                :class="active === cat.DESCP ? 'text-duo-claro' : ''" v-for="cat in categorias"
                                :key="cat.ID">
                                {{ cat.DESCP }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="container-noticias-search w-full mb-3 input-search">
                    <img :src="searchIcon" alt="search" class="icon-search" />

                    <input type="text" class="form-control" :placeholder="`Buscar por título de la noticia`"
                        v-model="filter.TITULO" id="name" @keyup.enter="listNoticias" />
                </div>
                <section class="container-noticias">
                    <div v-for="noticia in noticias" :key="noticia.ID" class="bg-white rounded-lg shadow-md">
                        <a :href="noticia.ENLACE" target="_blank" rel="noopener noreferrer">
                            <img :src="noticia.IMAGEN" alt="" class="w-full h-40 object-cover rounded-lg mb-4" />
                        </a>
                        <div class="px-3 pt-3 pb-4">
                            <p class="flex items-center gap-2 mb-2"
                                style="font-size: 14px; font-weight: 400; color: #262626;">
                                Categoría: {{ noticia.CATEGORIAS }}
                            </p>
                            <h3 class="text-xl font-semibold mb-2">{{ noticia.TITULO }}</h3>
                            <p class="mb-4" style="font-size: 15px; font-weight: 300; color: #454644;">{{ noticia.FCRCN
                            }}</p>
                            <button
                                class="bg-duo text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-duo-claro transition duration-300 ease-in-out"
                                @click="rounterIrA(noticia)">
                                Leer más
                            </button>
                        </div>
                    </div>
                </section>
                <div class="flex justify-start mb-3 gap-2 flex-col md:flex-row">
                    <b-pagination v-model="grid.currentPage" :total-rows="grid.totalRows"
                        @update:model-value="listNoticias" :per-page="grid.perPage" aria-controls="my-table"
                        class="my-0" />
                </div>

            </section>
            <section class="bg-dark">
                <div class="container-custom mx-auto p-5">
                    <div class="flex flex-column gap-2 p-3">
                        <h2 class="text-center text-white">
                            Suscríbete y te enviaremos un resumen semanal de las publicaciones más populares
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
import { BPagination } from 'bootstrap-vue-next';
// * PROXIES
import LoginProxy from "../proxies/LoginProxy";
import searchIcon from "@/assets/img/icons/search.svg";

export default {
    data() {
        return {
            grid: {
                currentPage: 1,
                totalRows: 0,
                perPage: 10,
            },
            searchIcon,
            noticias: [],
            categorias: [],
            isLoading: false,
            active: "Todos",
            filter: {
                TITULO: null,
            }
        };
    },
    validators: {

    },
    components: {
        Navbar,
        FooterComponent,
        BPagination
    },
    methods: {
        async listCategorias() {
            this.isLoading = true;
            await LoginProxy.listCategorias({ CESTDO: '', ROWS: 1000, INIT: 0 })
                .then((response) => {
                    if (response) {
                        this.categorias = response;
                    } else {
                        toast.error("Ocurrió un error al cargar las categorías", { toastId: "error" });
                    }
                })
                .catch(() => toast.error("Ocurrió un error al cargar las categorías", { toastId: "error" }))
                .finally(() => (this.isLoading = false));
        },
        async listNoticias() {
            this.isLoading = true;
            await LoginProxy.list({
                CESTDO: '',
                ROWS: this.grid.perPage,
                INIT: (this.grid.currentPage - 1) * this.grid.perPage,
                DESC: this.filter.TITULO,
                IDCATEGORIA: this.active === 'Todos' ? null : this.categorias.find(cat => cat.DESCP === this.active)?.ID,
            })
                .then((response) => {
                    if (response) {
                        this.noticias = response?.map((item) => {
                            return {
                                ...item,
                                FCRCN: new Date(item.FCRCN).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }),
                                IMAGEN: item.IMAGEN ? `https://jurissearch.com${item.IMAGEN}` : null,
                            };
                        });
                        this.grid.totalRows = response[0]?.TOTALROWS || 0;
                    } else {
                        toast.error("Ocurrió un error al cargar las noticias", { toastId: "error" });
                    }
                })
                .catch(() => toast.error("Ocurrió un error al cargar las noticias", { toastId: "error" }))
                .finally(() => (this.isLoading = false));
        },
        rounterIrA(noticia) {
            let title = noticia.TITULO.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-").substring(0, 50);
            this.$router.push({
                name: "noticiaNewsletter",
                params: {
                    title,
                    id: noticia.ID,
                },
            });

        },
    },
    mounted() {
        this.listCategorias();
        this.listNoticias();
    },
    watch: {
        "active"() {
            this.listNoticias();
        },
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

.container-noticias-search {
    width: 80%;
    margin: 30px auto 60px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.container-noticias {
    width: 80%;
    margin: 30px auto 60px auto;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    /* por defecto en pantallas pequeñas */
    gap: 1rem;
}

.container-noticias h3 {
    /* // formatear todo el ancho */
    text-align: justify;
    width: -webkit-fill-available;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1864FF;
}

@media (min-width: 768px) {
    .container-noticias {
        grid-template-columns: repeat(2, 1fr);
        /* en pantallas medianas */
    }
}

@media (min-width: 1024px) {
    .container-noticias {
        grid-template-columns: repeat(3, 1fr);
        /* en pantallas grandes */
    }
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