<template>
    <div>
        <navbar />
        <main>
            <section class="publicaciones-landing">
                <!-- Hero Section -->
                <div class="hero-section">
                    <div class="hero-content">
                        <h1 class="hero-title">📰 Publicaciones</h1>
                        <p class="hero-subtitle">Descubre nuestras últimas noticias y análisis jurídicos</p>
                    </div>
                </div>

                <!-- Filters and Search Section -->
                <div class="filters-container">
                    <div class="filters-wrapper">
                        <!-- Search Bar -->
                        <div class="search-box">
                            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" v-model="filter.NOMBRES" @input="debounceSearch"
                                placeholder="Buscar publicaciones por título..." class="search-input" />
                            <button v-if="filter.NOMBRES" @click="clearSearch" class="clear-button">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Sort Options -->
                        <div class="sort-box">
                            <label class="sort-label">Ordenar por:</label>
                            <select v-model="sortOrder" @change="applySorting" class="sort-select">
                                <option value="desc">Más recientes primero</option>
                                <option value="asc">Más antiguas primero</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Stats Bar -->
                <div class="stats-bar">
                    <div class="stat-item">
                        <span class="stat-number">{{ grid.totalRows }}</span>
                        <span class="stat-label">Publicaciones totales</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">{{ paginatedNoticias.length }}</span>
                        <span class="stat-label">Mostrando ahora</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">{{ Math.ceil(grid.totalRows / grid.perPage) }}</span>
                        <span class="stat-label">Páginas disponibles</span>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="grid.isLoading" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">Cargando publicaciones...</p>
                </div>

                <!-- Empty State -->
                <div v-else-if="paginatedNoticias.length === 0" class="empty-state">
                    <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="empty-title">No se encontraron publicaciones</h3>
                    <p class="empty-text">Intenta con otros términos de búsqueda</p>
                </div>

                <!-- News Grid -->
                <div v-else class="news-grid">
                    <article v-for="noticia in paginatedNoticias" :key="noticia.ID" class="news-card">
                        <div class="card-image-container">
                            <img :src="noticia.IMAGEN ? `${dominio}${noticia.IMAGEN}` : 'https://via.placeholder.com/400x250/6ba3ff/FFFFFF?text=JurisSearch'"
                                :alt="noticia.TITULO" class="card-image" />
                            <!-- <div class="card-overlay">
                                <span class="card-date-badge">
                                    {{ formatDate(noticia.FCRCN) }}
                                </span>
                            </div> -->
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">{{ noticia.TITULO }}</h3>
                            <div class="card-description" v-html="truncateHTML(noticia.DESCRIPCION, 180)"></div>
                            <div class="card-footer">
                                <div class="card-meta">
                                    <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="meta-text">{{ formatDateShort(noticia.FCRCN) }}</span>
                                </div>
                                <a v-if="noticia.ENLACE" :href="noticia.ENLACE" target="_blank" rel="noopener noreferrer"
                                    class="card-button">
                                    Ver más
                                    <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </article>
                </div>

                <!-- Pagination -->
                <div v-if="!grid.isLoading && paginatedNoticias.length > 0" class="pagination-container">
                    <div class="pagination-info">
                        Mostrando {{ startItem }} - {{ endItem }} de {{ grid.totalRows }} publicaciones
                    </div>
                    <div class="pagination-controls">
                        <button @click="goToPage(1)" :disabled="grid.currentPage === 1" class="pagination-button"
                            :class="{ 'disabled': grid.currentPage === 1 }">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                        <button @click="goToPage(grid.currentPage - 1)" :disabled="grid.currentPage === 1"
                            class="pagination-button" :class="{ 'disabled': grid.currentPage === 1 }">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" class="pagination-number"
                            :class="{ 'active': grid.currentPage === page }">
                            {{ page }}
                        </button>

                        <button @click="goToPage(grid.currentPage + 1)" :disabled="grid.currentPage === totalPages"
                            class="pagination-button" :class="{ 'disabled': grid.currentPage === totalPages }">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button @click="goToPage(totalPages)" :disabled="grid.currentPage === totalPages"
                            class="pagination-button" :class="{ 'disabled': grid.currentPage === totalPages }">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
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
import LoginProxy from "@/proxies/LoginProxy";
import { toast } from 'vue3-toastify';

export default {
    name: "Publicaciones",
    components: {
        Navbar,
        FooterComponent,
    },
    data() {
        return {
            dominio: 'https://www.jurissearch.com',
            dataNoticia: [],
            filter: {
                NOMBRES: null,
            },
            sortOrder: 'desc',
            grid: {
                items: [],
                currentPage: 1,
                perPage: 9,
                totalRows: 0,
                isLoading: true,
                pageOptions: [9, 12, 18],
            },
            searchTimeout: null,
        };
    },
    computed: {
        sortedNoticias() {
            if (!this.dataNoticia || this.dataNoticia.length === 0) return [];

            const sorted = [...this.dataNoticia].sort((a, b) => {
                const dateA = new Date(a.FCRCN);
                const dateB = new Date(b.FCRCN);
                return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            });

            return sorted;
        },
        paginatedNoticias() {
            const start = (this.grid.currentPage - 1) * this.grid.perPage;
            const end = start + this.grid.perPage;
            return this.sortedNoticias.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.sortedNoticias.length / this.grid.perPage);
        },
        visiblePages() {
            const current = this.grid.currentPage;
            const total = this.totalPages;
            const delta = 2;
            const range = [];
            const rangeWithDots = [];

            for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
                range.push(i);
            }

            if (current - delta > 2) {
                rangeWithDots.push(1, '...');
            } else {
                rangeWithDots.push(1);
            }

            rangeWithDots.push(...range);

            if (current + delta < total - 1) {
                rangeWithDots.push('...', total);
            } else if (total > 1) {
                rangeWithDots.push(total);
            }

            return rangeWithDots.filter(p => p !== 1 || total > 0);
        },
        startItem() {
            return (this.grid.currentPage - 1) * this.grid.perPage + 1;
        },
        endItem() {
            return Math.min(this.grid.currentPage * this.grid.perPage, this.sortedNoticias.length);
        }
    },
    methods: {
        async listNoticias() {
            this.grid.isLoading = true;

            await LoginProxy.list({
                ROWS: 1000,
                INIT: 0,
                DESC: this.filter?.NOMBRES?.trim() || null,
                CESTDO: 'A',
                ORDER: this.sortOrder === 'desc' ? 0 : 1,
            })
                .then((response) => {
                    this.dataNoticia = response || [];
                    this.grid.totalRows = this.dataNoticia.length;
                })
                .catch((error) => {
                    this.dataNoticia = [];
                    toast.error(error?.MESSAGE || 'Error al cargar las publicaciones', { toastId: 'error-publicaciones' });
                })
                .finally(() => {
                    this.grid.isLoading = false;
                });
        },
        debounceSearch() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.grid.currentPage = 1;
                this.listNoticias();
            }, 500);
        },
        clearSearch() {
            this.filter.NOMBRES = null;
            this.grid.currentPage = 1;
            this.listNoticias();
        },
        applySorting() {
            this.grid.currentPage = 1;
        },
        goToPage(page) {
            if (page === '...' || page < 1 || page > this.totalPages) return;
            this.grid.currentPage = page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        formatDateShort(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },
        truncateHTML(html, maxLength) {
            if (!html) return '';
            const tmp = document.createElement('div');
            tmp.innerHTML = html;
            const text = tmp.textContent || tmp.innerText || '';
            if (text.length <= maxLength) return text;
            return text.substr(0, maxLength) + '...';
        }
    },
    mounted() {
        // Check for 'search' parameter in URL and set it to the search box if present
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            this.filter.NOMBRES = searchParam;
        }
        this.listNoticias();
    },
};
</script>

<style scoped>
.publicaciones-landing {
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
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
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

/* Filters Container */
.filters-container {
    background: white;
    padding: 2rem;
    margin: -2rem 2rem 2rem 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    position: relative;
    z-index: 10;
}

.filters-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.5rem;
    align-items: center;
}

/* Search Box */
.search-box {
    position: relative;
    display: flex;
    align-items: center;
}

.search-icon {
    position: absolute;
    left: 1rem;
    width: 1.25rem;
    height: 1.25rem;
    color: #9CA3AF;
}

.search-input {
    width: 100%;
    padding: 0.875rem 3rem 0.875rem 3rem;
    border: 2px solid #E5E7EB;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
}

.search-input:focus {
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}

.clear-button {
    position: absolute;
    right: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #9CA3AF;
    padding: 0.25rem;
    transition: color 0.2s;
}

.clear-button:hover {
    color: #EF4444;
}

/* Sort Box */
.sort-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    white-space: nowrap;
}

.sort-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
}

.sort-select {
    padding: 0.75rem 1rem;
    border: 2px solid #E5E7EB;
    border-radius: 10px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    outline: none;
}

.sort-select:focus {
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}

/* Stats Bar */
.stats-bar {
    max-width: 1200px;
    margin: 0 auto 2rem auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.stat-item {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.10);
}

.stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 800;
    color: #1F2937;
    margin-bottom: 0.25rem;
}

.stat-label {
    display: block;
    font-size: 0.875rem;
    color: #6B7280;
    font-weight: 500;
}

/* Loading */
.loading-container {
    text-align: center;
    padding: 4rem 2rem;
    color: #1F2937;
    max-width: 480px;
    margin: 3rem auto;
}

.loading-spinner {
    width: 70px;
    height: 70px;
    border: 6px solid #e5e7eb;
    border-top: 6px solid #3B82F6;
    border-right: 6px solid #DF2DB2;
    border-bottom: 6px solid #e5e7eb;
    border-left: 6px solid #DF2DB2;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin: 0 auto 1.5rem;
    background: none;
    box-shadow: 0 2px 12px rgba(59,130,246,0.10);
    display: block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-text {
    color: #3B82F6;
    font-size: 1.125rem;
    font-weight: 700;
    margin-top: 1.5rem;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: rgba(255,255,255,0.85);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(59,130,246,0.10), 0 1.5px 8px rgba(223,45,178,0.07);
    color: #1F2937;
    max-width: 480px;
    margin: 3rem auto;
    border: 2px solid #e5e7eb;
    transition: box-shadow 0.3s;
}

.empty-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    opacity: 0.8;
}

.empty-title {
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: #3B82F6;
    letter-spacing: -1px;
    text-shadow: 0 2px 8px rgba(59,130,246,0.08);
}

.empty-text {
    font-size: 1.125rem;
    color: #4B5563;
    opacity: 1;
    margin-bottom: 0;
}

/* News Grid */
.news-grid {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
}

/* News Card */
.news-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
}

.news-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-image-container {
    position: relative;
    overflow: hidden;
    height: 220px;
    background: linear-gradient(135deg, #f084d4 0%, #3B82F6 100%);
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.news-card:hover .card-image {
    transform: scale(1.15) rotate(2deg);
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 1rem;
}

.card-date-badge {
    background: rgba(59, 130, 246, 0.95);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.card-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.card-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 1rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 3.4rem;
}

.card-description {
    color: #6B7280;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #E5E7EB;
}

.card-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6B7280;
    font-size: 0.875rem;
}

.meta-icon {
    width: 1.125rem;
    height: 1.125rem;
}

.meta-text {
    font-weight: 500;
}

.card-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #f084d4 0%, #3B82F6 100%);
    color: white;
    padding: 0.625rem 1.25rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
}

.card-button:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(240, 132, 212, 0.4);
}

.button-icon {
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s ease;
}

.card-button:hover .button-icon {
    transform: translateX(4px);
}

/* Pagination */
.pagination-container {
    max-width: 1200px;
    margin: 3rem auto 0;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.pagination-info {
    color: #1F2937;
    font-weight: 600;
    font-size: 0.95rem;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pagination-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.pagination-button,
.pagination-number {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    color: #374151;
}

.pagination-button:hover:not(.disabled),
.pagination-number:hover {
    background: #3B82F6;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.pagination-number.active {
    background: linear-gradient(135deg, #f084d4 0%, #3B82F6 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(240, 132, 212, 0.4);
}

.pagination-button.disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .filters-wrapper {
        grid-template-columns: 1fr;
    }

    .news-grid {
        grid-template-columns: 1fr;
        padding: 0 1rem;
    }

    .filters-container {
        margin: -2rem 1rem 2rem 1rem;
    }

    .stats-bar {
        padding: 0 1rem;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
    }

    .stat-item {
        padding: 1rem 0.5rem;
    }

    .stat-number {
        font-size: 1.5rem;
        margin-bottom: 0.25rem;
    }

    .stat-label {
        font-size: 0.7rem;
        line-height: 1.2;
    }

    .pagination-container {
        flex-direction: column;
        text-align: center;
    }

    .pagination-controls {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>