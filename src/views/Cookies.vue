<template>
    <div>
        <navbar />
        <main>
            <section class="profile-page">
                <div class="mt-10"></div>
                <section class="relative md:px-0 px-2">
                    <div class="container-custom mx-auto px-lg-5">
                        <p class="mb-3 py-2 text-duo text-lato-400 text-2xl text-center" style="font-size: 40px;">
                            Políticas de Cookies
                        </p>
                        <p class="pb-3 text-lato-400 text-center" style="font-size: 18px;">
                            En esta sección encontrarás la política de cookies de Juris Search.                        </p>
                    </div>
                </section>
            </section>

            <section class="flex justify-center">
                <div class="main-policy fade-in">
                    <div class="container">
                        <div class="section-politicas row">
                            <div class="col-md-4 col-12">
                                <h3 class="text-politica">Políticas de Cookies</h3>
                                <div class="policy-card">
                                    <div class="policy-redirect">
                                        <a href="#why" class="d-flex align-items-center justify-content-between">
                                            <span>¿Qué son las cookies y para que las usamos?</span>
                                            <i class="fas fa-chevron-right"></i>

                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#types" class="d-flex align-items-center justify-content-between">
                                            <span>¿Qué tipo de cookies utilizamos?</span>
                                            <i class="fas fa-chevron-right"></i>

                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 col-12">
                                <div class="content-policy">
                                    <h3 class="text-politica">Políticas de Cookies</h3>
                                    <p class="policy-text">
                                        A continuación, se informa sobre la Política de Cookies utilizada
                                        por parte de JURIS SEARCH PENAL & COMPLIANCE (en adelante “Juris
                                        Search”), con domicilio legal ubicado en la Avenida Víctor Andrés
                                        Belaunde Nro. 370, San Isidro.
                                    </p>
                                    <p class="policy-text">
                                        Al acceder a nuestro sitio web o suscribirse a nuestros servicios
                                        online acepta haber leído y prestado su consentimiento de forma
                                        informada, libre, previa, expresa e inequívoca. Asimismo, la
                                        Política de Cookies de Juris Search puede actualizarse en
                                        cualquier momento en cuyo caso se le informará y se publicará la
                                        versión actualizada en el presente sitio web.
                                    </p>

                                    <p class="text-politica" id="why">
                                        ¿Qué son las cookies y para que las usamos?
                                    </p>

                                    <p class="policy-text">
                                        Una cookie es un archivo que envía su ordenador, celular o tablet
                                        al navegador web para almacenar información sobre su navegación.
                                        Nuestro sitio web usa Cookies para recolectar información sobre su
                                        interacción con el sitio web a fin de mejorar su experiencia de
                                        navegación y poder realizar analítica sobre las visitas a la web.
                                    </p>

                                    <p class="text-politica" id="types">
                                        ¿Qué tipo de cookies utilizamos?
                                    </p>
                                    <p class="policy-text">
                                        Usamos cookies propias y de terceros. A continuación, se detalla
                                        el tipo de cookie utilizadas, así como la función que cumple:
                                    </p>
                                    <p class="policy-text">
                                        Juris Search recolecta y trata sus datos personales a través de la
                                        información suministrada en nuestro sitio web. Dichos datos pueden
                                        incluir su nombre y apellidos, correo electrónico, dirección de
                                        domicilio, teléfono, negocio u ocupación, fecha de nacimiento,
                                        dirección IP, identificador único de dispositivo (UDID), sus
                                        opiniones en encuestas y las estadísticas que genera por el uso de
                                        nuestro buscador de jurisprudencia.
                                    </p>
                                </div>
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


export default {
    data() {
        return {
            team1,
            team2,
            team3,
            team4,
            questionResource,

        };
    },
    components: {
        Navbar,
        FooterComponent,
    },
    methods: {

    },
    mounted() {

    },
};
</script>

<style scoped>
.text-politica {
    font-family: Lato;
    font-size: 20px;
    color: #1864FF;
    margin-bottom: 10px;
}
.section-politicas {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 15px;
    margin: 0 auto;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}


@media (max-width: 768px) {
    .section-politicas {
        flex-direction: column;
    }
}


.main-policy {
    min-height: 100vh;
    display: flex;
    padding-top: 100px;
}

.policy-card-title {
    font-family: Lato;
    font-weight: 600;
    font-size: 15px;
}

.policy-card {
    border-radius: 5px;
}

.policy-redirect {
    padding: 12px 15px;
    border-bottom: 1px solid #dfdfdf;
    cursor: pointer;
}

.policy-redirect a {
    font-family: Lato;
    color: #00171f;
    text-decoration: none;
    display: flex;
    justify-content: space-between;

}

.policy-redirect a span {
    font-weight: bold;
}

@media (max-width: 768px) {
    .policy-redirect a {
        font-size: 14px;
    }
}

.content-policy {
    max-width: 800px;
    margin: auto;
    padding-left: 80px;
}

.title {
    font-family: Lato;
    line-height: 39px;
    padding: 0;
    font-size: 40px;
    color: #00171f;
    max-width: 680px;
    margin: 0;
    margin-bottom: 24px;
}

.policy-sub-title {
    color: #0673f2;
    font-size: 15px;
    font-family: Lato;
    margin-top: 32px;
}

.policy-text {
    color: #00171f;
    font-size: 15px !important;
    font-family: Lato;
}

ul li {
    color: #00171f;
    font-size: 15px !important;
    list-style-type: disc;
    margin: 0 10px;
    padding: 5px;
}

@media (max-width: 768px) {
    .content-policy {
        margin-top: 30px;
        padding-left: 0;
    }

    .title {
        font-size: 15px;
        margin-bottom: 0;
    }

    .policy-text {
        font-size: 12px !important;
    }

    ul li {
        font-size: 12px !important;
    }
}
</style>