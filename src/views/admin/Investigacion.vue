<template>
    <section class="news-portal mt-4">
        <!-- Hero Banner -->
        <div class="hero-banner">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <div class="hero-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>Centro de Noticias Jurídicas</span>
                </div>
                <h1 class="hero-title">Mantente Informado</h1>
                <p class="hero-subtitle">Descubre las últimas actualizaciones, análisis y noticias del mundo jurídico</p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="news-content">
            <!-- Search Bar -->
            <div class="search-bar-modern">
                <div class="search-wrapper">
                    <svg class="search-icon-modern" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input type="text" v-model="filter.NOMBRES" @input="debounceSearch"
                        placeholder="¿Qué quieres descubrir hoy?" class="search-input-modern" />
                    <button v-if="filter.NOMBRES" @click="clearSearch" class="clear-btn-modern">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <select v-model="sortOrder" @change="applySorting" class="sort-select-modern">
                    <option value="desc">🕒 Más recientes</option>
                    <option value="asc">📅 Más antiguas</option>
                </select>
            </div>

            <!-- Info Banner -->
            <div class="info-banner">
                <div class="info-item">
                    <div class="info-icon-wrapper">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="info-number">{{ grid.totalRows }}</div>
                        <div class="info-label">Artículos disponibles</div>
                    </div>
                </div>
                <div class="info-divider"></div>
                <div class="info-item">
                    <div class="info-icon-wrapper">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="info-number">{{ paginatedNoticias.length }}</div>
                        <div class="info-label">Mostrando ahora</div>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="grid.isLoading" class="loading-state">
                <div class="loading-animation">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
                <p class="loading-message">Cargando las últimas noticias...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="paginatedNoticias.length === 0" class="empty-state-modern">
                <div class="empty-illustration">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                        <circle cx="12" cy="12" r="1" fill="currentColor"/>
                    </svg>
                </div>
                <h3 class="empty-title-modern">No encontramos noticias</h3>
                <p class="empty-text-modern">Prueba con otros términos de búsqueda o revisa más tarde</p>
            </div>

            <!-- News Grid -->
            <div v-else class="news-grid">
            <article v-for="noticia in paginatedNoticias" :key="noticia.ID" class="news-card">
                <div class="card-image-container">
                    <img :src="noticia.IMAGEN ? `https://www.jurissearch.com${noticia.IMAGEN}` : 'https://via.placeholder.com/400x250/4A5568/FFFFFF?text=Sin+Imagen'"
                        :alt="noticia.TITULO" class="card-image" />

                </div>
                <div class="card-content">
                    <h3 class="card-title">{{ noticia.TITULO }}</h3>
                    <div class="card-description" v-html="truncateHTML(noticia.DESCRIPCION, 150)"></div>
                    <div class="card-footer">
                        <div class="card-meta">
                            <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span class="meta-text">{{ formatDate(noticia.FCRCN) }}</span>
                        </div>
                        <a v-if="noticia.ENLACE" :href="noticia.ENLACE" target="_blank" class="card-button">
                            Leer más
                            <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
            </div>
        </div>

        <!-- Pagination -->
        <div v-if="!grid.isLoading && paginatedNoticias.length > 0" class="pagination-container">
            <div class="pagination-info">
                Mostrando {{ startItem }} - {{ endItem }} de {{ grid.totalRows }} noticias
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
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
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
</template>

<script>
import { toast } from 'vue3-toastify';
import MantenimientoProxy from '../../proxies/MantenimientoProxy';

export default {
    name: 'Investigacion',
    data() {
        return {
            dominio: 'https://www.jurissearch.com/',
            dataNoticia: [],
            filter: {
                NOMBRES: null,
            },
            sortOrder: 'desc',
            grid: {
                items: [],
                currentPage: 1,
                perPage: 10,
                totalRows: 0,
                isLoading: true,
                pageOptions: [10, 15, 50],
            },
            searchTimeout: null,
        };
    },
    computed: {
        sortedNoticias() {
            if (!this.dataNoticia || this.dataNoticia.length === 0) return [];

            const duplicatedData = [];
            this.dataNoticia.forEach((item, index) => {
                duplicatedData.push({
                    ...item,
                    INDEX: index,
                    ID: item.ID,
                });
            });

            return duplicatedData.sort((a, b) => {
                const dateA = new Date(a.FCRCN);
                const dateB = new Date(b.FCRCN);
                return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            });
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
        async searchNoticias() {
            this.grid.isLoading = true;

            await MantenimientoProxy.list({
                ROWS: 1000,
                INIT: 0,
                DESC: this.filter?.NOMBRES || null,
                CESTDO: 'A',
                ORDER: this.sortOrder === 'desc' ? 0 : 1,
            }, this.active)
                .then((response) => {
                    this.dataNoticia = response || [];
                    this.grid.totalRows = this.dataNoticia.length;
                })
                .catch((error) => {
                    this.dataNoticia = [];
                    toast.error(error?.MESSAGE || 'Error al cargar las noticias', { toastId: 'error-noticias' });
                })
                .finally(() => {
                    this.grid.isLoading = false;
                });
        },
        debounceSearch() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.grid.currentPage = 1;
                this.searchNoticias();
            }, 500);
        },
        clearSearch() {
            this.filter.NOMBRES = null;
            this.searchNoticias();
        },
        applySorting() {
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
        this.searchNoticias();
    },
};
</script>

<style scoped>
/* ===== NEWS PORTAL UI ===== */
.news-portal {
    min-height: 100vh;
    background: linear-gradient(180deg, #fff5f8 0%, #f0f4ff 50%, #ffffff 100%);
    padding-bottom: 4rem;
}

/* Hero Banner */
.hero-banner {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    position: relative;
    overflow: hidden;
    padding: 4rem 0;
    margin-bottom: 3rem;
    box-shadow: 0 10px 40px rgba(223, 45, 178, 0.3);
}

.hero-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
    opacity: 0.5;
    animation: float 20s linear infinite;
}

@keyframes float {
    from { transform: translateY(0); }
    to { transform: translateY(-100px); }
}

.hero-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.hero-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.hero-title {
    font-size: 3rem;
    font-weight: 900;
    color: white;
    margin: 0;
    text-shadow: 0 2px 20px rgba(0,0,0,0.2);
    letter-spacing: -0.5px;
}

.hero-subtitle {
    color: rgba(255, 255, 255, 0.95);
    font-size: 1.125rem;
    margin: 0.5rem 0 0 0;
    font-weight: 300;
    max-width: 600px;
}

/* Main Content */
.news-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Search Bar Modern */
.search-bar-modern {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(223, 45, 178, 0.1);
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.search-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    min-width: 300px;
}

.search-icon-modern {
    position: absolute;
    left: 1.25rem;
    color: #DF2DB2;
    pointer-events: none;
    z-index: 1;
}

.search-input-modern {
    width: 100%;
    padding: 1rem 3.5rem 1rem 3.5rem;
    border-radius: 50px;
    border: 2px solid #E5E7EB;
    background: white;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.search-input-modern:focus {
    outline: none;
    border-color: #DF2DB2;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(223, 45, 178, 0.15);
}

.clear-btn-modern {
    position: absolute;
    right: 1.25rem;
    background: linear-gradient(135deg, #DF2DB2 0%, #E71FB3 100%);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.clear-btn-modern:hover {
    transform: rotate(90deg) scale(1.1);
    box-shadow: 0 4px 12px rgba(223, 45, 178, 0.4);
}

.sort-select-modern {
    padding: 1rem 1.5rem;
    border-radius: 50px;
    border: 2px solid #E5E7EB;
    background: white;
    font-size: 1rem;
    font-weight: 600;
    color: #4A5568;
    cursor: pointer;
    transition: all 0.3s ease;
}

.sort-select-modern:hover {
    border-color: #DF2DB2;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(223, 45, 178, 0.15);
}

/* Info Banner */
.info-banner {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;
    flex-wrap: wrap;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.info-icon-wrapper {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.info-icon-wrapper svg {
    color: white;
}

.info-number {
    font-size: 2.25rem;
    font-weight: 900;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
}

.info-label {
    font-size: 0.875rem;
    color: #6B7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 0.5rem;
}

.info-divider {
    width: 2px;
    height: 60px;
    background: linear-gradient(180deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    border-radius: 2px;
}

/* Loading State */
.loading-state {
    background: white;
    border-radius: 24px;
    padding: 5rem 2rem;
    text-align: center;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.loading-animation {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
}

.loading-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    animation: pulse 1.5s ease-in-out infinite;
}

.loading-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
}

.loading-message {
    color: #6B7280;
    font-size: 1.25rem;
    font-weight: 600;
}

/* Empty State */
.empty-state-modern {
    background: linear-gradient(135deg, white 0%, #fef5fb 100%);
    border-radius: 24px;
    padding: 5rem 2rem;
    text-align: center;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.empty-illustration {
    margin-bottom: 2rem;
}

.empty-illustration svg {
    color: #DF2DB2;
    opacity: 0.3;
}

.empty-title-modern {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 0.75rem;
}

.empty-text-modern {
    font-size: 1.125rem;
    color: #9CA3AF;
}

/* News Grid */
.news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 2.5rem;
    margin-bottom: 3rem;
}

/* News Card */
.news-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
}

.news-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 50px rgba(223, 45, 178, 0.25);
}

.card-image-container {
    position: relative;
    overflow: hidden;
    height: 280px;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover .card-image {
    transform: scale(1.15) rotate(2deg);
}

.card-content {
    padding: 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.card-title {
    font-size: 1.375rem;
    font-weight: 800;
    color: #1a202c;
    margin-bottom: 1rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: all 0.3s ease;
}

.news-card:hover .card-title {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.card-description {
    color: #6B7280;
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    flex: 1;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.25rem;
    border-top: 2px solid #F3F4F6;
}

.card-meta {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    color: #9CA3AF;
    font-size: 0.875rem;
}

.meta-icon {
    width: 1.125rem;
    height: 1.125rem;
    color: #DF2DB2;
}

.meta-text {
    font-weight: 600;
}

.card-button {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    color: white;
    padding: 0.875rem 1.5rem;
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.card-button:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 30px rgba(223, 45, 178, 0.5);
}

.button-icon {
    width: 1.125rem;
    height: 1.125rem;
    transition: transform 0.4s ease;
}

.card-button:hover .button-icon {
    transform: translateX(6px);
}

/* Pagination */
.pagination-container {
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    background: white;
    padding: 2rem;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.pagination-info {
    font-weight: 700;
    font-size: 1rem;
    background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.pagination-controls {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.pagination-button,
.pagination-number {
    min-width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid #E5E7EB;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 700;
    color: #6B7280;
    font-size: 1rem;
    padding: 0 1rem;
}

.pagination-button:hover:not(.disabled),
.pagination-number:hover {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    border-color: transparent;
    color: white;
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 20px rgba(223, 45, 178, 0.4);
}

.pagination-number.active {
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    color: white;
    border-color: transparent;
    box-shadow: 0 8px 25px rgba(223, 45, 178, 0.5);
    transform: scale(1.15);
}

.pagination-button.disabled {
    opacity: 0.2;
    cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-content,
    .news-content {
        padding: 0 1rem;
    }

    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .hero-badge {
        padding: 0.375rem 1rem;
        font-size: 0.75rem;
    }

    .search-wrapper {
        min-width: 100%;
    }

    .info-banner {
        flex-direction: column;
        gap: 1.5rem;
    }

    .info-divider {
        width: 60px;
        height: 2px;
    }

    .news-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .card-image-container {
        height: 220px;
    }

    .pagination-container {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
    }

    .pagination-button,
    .pagination-number {
        min-width: 42px;
        height: 42px;
        font-size: 0.875rem;
    }
}
</style>
