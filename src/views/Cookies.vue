<template>
    <div>
        <navbar />
        <main>
            <section class="cookies-hero">
                <div class="hero-container">
                    <div class="hero-content-center">
                        <h1 class="hero-title">Políticas de <span class="text-gradient">Cookies</span></h1>
                        <p class="hero-subtitle">
                            Conoce cómo utilizamos las cookies para mejorar tu experiencia de navegación
                        </p>
                    </div>
                </div>
            </section>

            <section class="cookies-content">
                <div class="cookies-container">
                    <div class="cookies-grid">
                        <aside class="cookies-sidebar">
                            <div class="sidebar-sticky">
                                <h3 class="sidebar-title">Navegación Rápida</h3>
                                <nav class="sidebar-nav">
                                    <a href="#why" class="nav-link">
                                        <span class="nav-icon">🍪</span>
                                        <span>¿Qué son las cookies?</span>
                                    </a>
                                    <a href="#types" class="nav-link">
                                        <span class="nav-icon">📊</span>
                                        <span>Tipos de cookies</span>
                                    </a>
                                </nav>
                            </div>
                        </aside>
                        <article class="cookies-main">
                            <div class="content-policy-modern">
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
                            </article>
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
/* Hero Section */
.cookies-hero {
    background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
    padding: 5rem 2rem 4rem;
    position: relative;
    overflow: hidden;
}

.cookies-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="white" opacity="0.03"/></svg>');
    background-size: 100px 100px;
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.hero-content-center {
    text-align: center;
}

.hero-icon {
    display: inline-flex;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(10px);
}

.hero-icon svg {
    width: 40px;
    height: 40px;
    color: white;
}

.hero-title {
    font-size: 3rem;
    font-weight: 800;
    color: white;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.text-gradient {
    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.95);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
}

/* Content Section */
.cookies-content {
    padding: 4rem 1rem;
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
    min-height: 100vh;
}

.cookies-container {
    max-width: 1400px;
    margin: 0 auto;
}

.cookies-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    align-items: start;
}

/* Sidebar Navigation */
.cookies-sidebar {
    position: relative;
}

.sidebar-sticky {
    position: sticky;
    top: 100px;
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 2px solid #f3f4f6;
}

.sidebar-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #E5E7EB;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    color: #4B5563;
    text-decoration: none;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.nav-link:hover {
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.05) 0%, rgba(24, 92, 230, 0.05) 100%);
    color: #185CE6;
    border-color: rgba(24, 92, 230, 0.2);
    transform: translateX(4px);
}

.nav-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
}

/* Main Content */
.cookies-main {
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.content-policy-modern {
    padding: 3rem;
}

.policy-intro-card {
    background: linear-gradient(135deg, rgba(223, 45, 178, 0.05) 0%, rgba(24, 92, 230, 0.05) 100%);
    padding: 2rem;
    border-radius: 16px;
    border: 2px solid rgba(24, 92, 230, 0.1);
    margin-bottom: 3rem;
}

.intro-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1rem;
}

.policy-text-modern {
    color: #4B5563;
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
}

.policy-text-modern:last-child {
    margin-bottom: 0;
}

.highlight {
    color: #185CE6;
    font-weight: 600;
}

/* Section Titles */
.text-politica {
    font-size: 1.5rem;
    font-weight: 700;
    color: #185CE6;
    margin: 3rem 0 1.5rem;
    padding-top: 2rem;
    border-top: 2px solid #E5E7EB;
    scroll-margin-top: 100px;
}

.text-politica:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
}

.policy-text {
    color: #4B5563;
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .cookies-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .sidebar-sticky {
        position: relative;
        top: 0;
    }

    .sidebar-nav {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.75rem;
    }
}

@media (max-width: 768px) {
    .cookies-hero {
        padding: 3rem 1rem 2.5rem;
    }

    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .hero-icon {
        width: 60px;
        height: 60px;
    }

    .hero-icon svg {
        width: 30px;
        height: 30px;
    }

    .cookies-content {
        padding: 2rem 0.5rem;
    }

    .content-policy-modern {
        padding: 2rem 1.5rem;
    }

    .policy-intro-card {
        padding: 1.5rem;
    }

    .intro-title {
        font-size: 1.5rem;
    }

    .text-politica {
        font-size: 1.25rem;
        margin: 2rem 0 1rem;
    }

    .policy-text,
    .policy-text-modern {
        font-size: 0.95rem;
    }

    .sidebar-nav {
        grid-template-columns: 1fr;
    }

    .nav-link {
        padding: 0.75rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 1.75rem;
    }

    .content-policy-modern {
        padding: 1.5rem 1rem;
    }

    .policy-intro-card {
        padding: 1.25rem;
    }
}
</style>