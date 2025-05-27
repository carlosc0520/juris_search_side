<template>
    <div>
        <navbar />
        <main>
            <section class="profile-page">
                <iframe src="https://www.instagram.com/juris.search/embed" class="mt-5 frame-instagram" frameborder="0"
                    scrolling="si" allowfullscreen></iframe>
            </section>
            <section class="bg-dark">
                <div class="container-custom mx-auto p-5">
                    <div class="flex flex-column gap-2 p-3">
                        <h2 class="text-center text-white">
                            Crea una cuenta y accede a material académico exclusivo </h2>
                        <router-link to="/#mi-seccion-planes"
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

export default {
    name: "Publicaciones",
    components: {
        Navbar,
        FooterComponent,
    },
    data() {
        return {

        };
    },
    validators: {

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

.profile-page iframe {
    width: 80%;
    height: 100vh;
    border: none;
    border-radius: 20px;
    margin: 20px auto;
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