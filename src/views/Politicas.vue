<template>
    <div>
        <navbar />
        <main class="my-4 text-blueGray-700 antialiased">
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
                                    Políticas y Privacidad
                                </h1>
                                <p class="mt-4 text-lg text-blueGray-200">
                                    Conoce nuestras políticas de privacidad y términos de uso.
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
            <section class="flex justify-center">
                <div class="main-policy fade-in">
                    <div class="container">
                        <div class="section-politicas row">
                            <div class="col-md-4 col-12">
                                <h5 class="policy-card-title">Secciones</h5>
                                <div class="policy-card">
                                    <div class="policy-redirect">
                                        <a href="#starting" class="d-flex align-items-center justify-content-between">
                                            <span>Principios</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#rights" class="d-flex align-items-center justify-content-between">
                                            <span>Derechos</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#info" class="d-flex align-items-center justify-content-between">
                                            <span>Datos Personales Recolectados y Tratados</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#incharge" class="d-flex align-items-center justify-content-between">
                                            <span>Encargado de Tratamiento</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#time" class="d-flex align-items-center justify-content-between">
                                            <span>Tiempo de almacenamiento</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#purpose" class="d-flex align-items-center justify-content-between">
                                            <span>Finalidad</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#storage" class="d-flex align-items-center justify-content-between">
                                            <span>Almacenamiento</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#transfer" class="d-flex align-items-center justify-content-between">
                                            <span>Trasferencia a terceras partes y flujo transfronterizo</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#security" class="d-flex align-items-center justify-content-between">
                                            <span>Seguridad</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#cookies" class="d-flex align-items-center justify-content-between">
                                            <span>Cookies</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#age" class="d-flex align-items-center justify-content-between">
                                            <span>Menores de Edad</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                    <div class="policy-redirect">
                                        <a href="#link" class="d-flex align-items-center justify-content-between">
                                            <span>Enlaces a otros sitios web</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 col-12">
                                <div class="content-policy">
                                    <h1 class="title">Políticas de privacidad</h1>
                                    <p class="policy-text">
                                        De acuerdo con la Ley N° 29733, ley de protección de datos
                                        personales y su reglamento, a continuación, te informamos sobre la
                                        Política de Privacidad empleada para la recolección y tratamiento
                                        de sus datos personales por parte de la JURIS SEARCH PENAL &
                                        COMPLIANCE (en adelante “Juris Search”), con domicilio legal
                                        ubicado en la Avenida Víctor Andrés Belaunde Nro. 370, San Isidro.
                                    </p>
                                    <p class="policy-text">
                                        Al acceder a nuestro sitio web o suscribirse a nuestros servicios
                                        online acepta haber leído y prestado su consentimiento de forma
                                        informada, libre, previa, expresa e inequívoca. Asimismo, la
                                        política de privacidad de Juris Search puede actualizarse en
                                        cualquier momento en cuyo caso se le informará y se publicará la
                                        versión actualizada en el presente sitio web.
                                    </p>

                                    <p class="policy-sub-title" id="starting">
                                        Principios
                                    </p>
                                    <p class="policy-text">
                                        Juris Search recolecta y procesa sus datos personales respetando los principios:

                                    </p>
                                    <p class="policy-text">
                                    <ul>
                                        <li>Consentimiento. Previamente a la recolección y tratamiento de los datos,
                                            siempre solicitamos el consentimiento del titular de los datos personales.
                                        </li>
                                        <li>Finalidad. La recopilación y tratamiento de los datos personales siguen una
                                            finalidad explícita, determinada y lícita.</li>
                                        <li>Proporcionalidad. La recolección y tratamiento de los datos personales es
                                            razonable y no excesiva.</li>
                                        <li>Calidad. Los datos personales deben de ser, en la medida de lo posible,
                                            exactos, veraces y actualizados.</li>
                                        <li>Seguridad. Se garantizará la seguridad de los datos personales, evitando el
                                            acceso no autorizado.</li>
                                        <li>Legalidad. Rechazamos la obtención fraudulenta o ilícita de los datos
                                            personales.</li>
                                    </ul>
                                    </p>
                                    <p class="policy-sub-title" id="rights">
                                        Derechos
                                    </p>
                                    <p class="policy-text">
                                        Puede ejercer sus derechos de acceso, rectificación, oposición, cancelación
                                        (derechos “ARCO”)
                                        sobre sus datos personales. Para su ejercicio, puede enviarnos un correo a
                                        datospersonales@jurissearch.com.
                                    </p>
                                    <p class="policy-text">
                                        Revisaremos su solicitud y le responderemos dentro del plazo legal (8 días
                                        hábiles
                                        ante el derecho de información, 20 días hábiles ante el derecho de acceso y 10
                                        días hábiles para otros derechos, contándose desde el día siguiente de la
                                        presentación de su solicitud). En el correo debe incluir su nombre y apellidos
                                        completos, copia de DNI o firma digital para acreditar que es el titular de
                                        los datos personales. Asimismo, debe especificar su petición y el correo o
                                        domicilio donde desea que se le envié las comunicaciones.
                                    </p>
                                    <p class="policy-sub-title" id="info">
                                        Datos Personales Recolectados y Tratados
                                    </p>
                                    <p class="policy-text">
                                        Puede ejercer sus derechos de acceso, rectificación, oposición, cancelación
                                        (derechos “ARCO”)
                                        sobre sus datos personales. Para su ejercicio, puede enviarnos un correo
                                        a datospersonales@jurissearch.com.
                                    </p>
                                    <p class="policy-text">
                                        Juris Search recolecta y trata sus datos personales a través de la información
                                        suministrada
                                        en nuestro sitio web. Dichos datos pueden incluir su nombre y apellidos, correo
                                        electrónico, dirección de domicilio, teléfono, negocio u ocupación, fecha de
                                        nacimiento, dirección IP, identificador único de dispositivo (UDID), sus
                                        opiniones en encuestas y las estadísticas que genera por el uso de nuestro
                                        buscador de jurisprudencia.
                                    </p>

                                    <p class="policy-sub-title" id="incharge">
                                        Encargado de Tratamiento
                                    </p>
                                    <p class="policy-text">
                                        Juris Search no terceriza el tratamiento de sus datos personales, siendo la
                                        propia empresa la encargada del tratamiento.
                                    </p>
                                    <p class="policy-sub-title" id="time">
                                        Tiempo de almacenamiento
                                    </p>
                                    <p class="policy-text">
                                        Juris Search almacena sus datos personales hasta el cumplimiento de los fines de
                                        su recolección
                                        y/o tratamiento, hasta que se cumplan los plazos exigidos por ley o en el
                                        momento en que, como
                                        titular de los datos personales, solicite su eliminación.
                                    </p>
                                    <p class="policy-sub-title" id="purpose">
                                        Finalidad
                                    </p>
                                    <p class="policy-text">
                                        Juris Search recolecta y trata sus datos personales parar el cumplimiento de los
                                        siguientes fines:
                                    </p>
                                    <p class="policy-text">
                                    <ul>
                                        <li>Comercial. A fin de interactuar y perfilar a potenciales clientes o
                                            administrar la relación con clientes establecidos. </li>
                                        <li>Marketing. A fin de realizar investigaciones de mercado, hábitos de consumo,
                                            análisis estadístico y satisfacción de clientes mediante encuestas.</li>
                                        <li>Eficiencia del sitio web. A fin de hacer su uso más intuitivo y responsivo.
                                            Analizar el uso que los usuarios dan a nuestro sitio web.</li>
                                    </ul>
                                    </p>
                                    <p class="policy-sub-title" id="storage">
                                        Almacenamiento
                                    </p>
                                    <p class="policy-text">
                                        Juris Search almacena la información de sus usuarios en nuestros propios
                                        servidores ubicados en Lima, Perú.
                                    </p>
                                    <p class="policy-sub-title" id="time">
                                        Tiempo de almacenamiento
                                    </p>
                                    <p class="policy-text">
                                        Juris Search almacena sus datos personales hasta el cumplimiento de los fines de
                                        su recolección
                                        y/o tratamiento, hasta que se cumplan los plazos exigidos por ley o en el
                                        momento en que, como
                                        titular de los datos personales, solicite su eliminación.
                                    </p>
                                    <p class="policy-sub-title" id="transfer">
                                        Trasferencia a terceras partes y flujo transfronterizo
                                    </p>
                                    <p class="policy-text">
                                        Juris Search se encuentra comprometido con su privacidad. Solo comparte
                                        información en caso sea solicitado por (i) las autoridades competentes en
                                        cumplimiento de sus funciones y (ii) bajo requerimiento judicial. Asimismo,
                                        precisamos que su información personal no es objeto de transferencia a nivel
                                        internacional (flujo transfronterizo).
                                    </p>
                                    <p class="policy-sub-title" id="security">
                                        Seguridad
                                    </p>
                                    <p class="policy-text">
                                        Juris Search cuenta con medidas de seguridad para garantizar la protección de
                                        sus datos personales y que estos no sean alterados, perdidos, accedidos o
                                        procesados de forma no autorizada.
                                    </p>
                                    <p class="policy-sub-title" id="cookies">
                                        Cookies
                                    </p>
                                    <p class="policy-text">
                                        Una cookie es un archivo que se envía su ordenador, celular o tablet al
                                        navegador web para almacenar información sobre tu navegación. Nuestro sitio web
                                        usa cookies para recolectar información sobre su interacción en el sitio web a
                                        fin de mejorar su y analizar las visitas a la web. Para más información, revise
                                    </p>
                                    <p class="policy-sub-title" id="age">
                                        Menores de Edad
                                    </p>
                                    <p class="policy-text">
                                        El sitio web de Juris Search no está diseñado ni dirigido a menores de 18 años.
                                        En caso se recolecten los datos de menores de edad sin autorización, se
                                        adoptarán las medidas adecuadas para eliminar dichos datos tan pronto como sea
                                        posible.
                                    </p>
                                    <p class="policy-sub-title" id="link">
                                        Enlaces a otros sitios web
                                    </p>
                                    <p class="policy-text">
                                        Este sitio web puede contener enlaces a otros sitios web. Cuando usted hace
                                        click en dichos enlaces y abandona nuestra web no nos hacemos responsables de
                                        las condiciones de privacidad ni de la protección de sus datos en otros sitios.
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
    font-family: 'Inter-Medium', sans-serif;
    font-weight: 600;
    font-size: 15px;
}

.policy-card {
    border-radius: 5px;
    border: 1px solid #dfdfdf;
    /* $color-light-gray */
}

.policy-redirect {
    padding: 12px 15px;
    border-bottom: 1px solid #dfdfdf;
    cursor: pointer;
}

.policy-redirect a {
    font-family: 'Inter-Medium', sans-serif;
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
    font-family: 'Inter-Bold', sans-serif;
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
    font-family: 'Inter-SemiBold', sans-serif;
    margin-top: 32px;
}

.policy-text {
    color: #00171f;
    font-size: 15px !important;
    font-family: 'Inter-Regular', sans-serif;
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