<template>
    <section class="news-portal">
        <!-- Header Section -->
        <div class="news-header">
            <div class="news-header-content">
                <div class="header-title-section">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="header-icon">
                        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                    </svg>
                    <div>
                        <h1 class="news-title">Centro de Noticias Jurídicas</h1>
                        <p class="news-subtitle">Descubre las últimas actualizaciones, análisis y noticias del mundo jurídico</p>
                    </div>
                </div>
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
        // Si hay un parámetro 'search' en la URL, ponerlo en el buscador
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            this.filter.NOMBRES = searchParam;
        }
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

/* Header Section - Similar to Settings.vue */
.news-header {
    background: white;
    padding: 2rem 0;
    margin-bottom: 2.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #F3F4F6;
}

.news-header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.header-title-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
}

.header-title-section > div {
    flex: 1;
    min-width: 0;
    max-width: 100%;
}

.header-icon {
    flex-shrink: 0;
    color: #185CE6;
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.news-title {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
    width: 100%;
}

.news-subtitle {
    color: #6B7280;
    font-size: 0.95rem;
    margin: 0.25rem 0 0 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    max-width: 100%;
    width: 100%;
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #F3F4F6;
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
    padding: 0.875rem 3rem 0.875rem 3rem;
    border-radius: 12px;
    border: 2px solid #E5E7EB;
    background: white;
    font-size: 0.95rem;
    color: #1F2937;
    transition: all 0.3s ease;
}

.search-input-modern:focus {
    outline: none;
    border-color: #185CE6;
    box-shadow: 0 0 0 3px rgba(24, 92, 230, 0.1);
}

.search-input-modern::placeholder {
    color: #9CA3AF;
}

.clear-btn-modern {
    position: absolute;
    right: 1rem;
    background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    color: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(223, 45, 178, 0.3);
}

.clear-btn-modern:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(223, 45, 178, 0.4);
}

.sort-select-modern {
    padding: 0.875rem 1.5rem;
    border-radius: 12px;
    border: 2px solid #E5E7EB;
    background: white;
    font-size: 0.95rem;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    transition: all 0.3s ease;
}

.sort-select-modern:hover {
    border-color: #185CE6;
    box-shadow: 0 0 0 3px rgba(24, 92, 230, 0.1);
}

.sort-select-modern:focus {
    outline: none;
    border-color: #185CE6;
    box-shadow: 0 0 0 3px rgba(24, 92, 230, 0.1);
}

/* Info Banner */
.info-banner {
    background: white;
    border-radius: 20px;
    padding: 1.75rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #F3F4F6;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;
    flex-wrap: wrap;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex: 1;
    min-width: 0;
}

.info-icon-wrapper {
    width: 56px;
    height: 56px;
    background: #185CE6;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(24, 92, 230, 0.25);
}

.info-icon-wrapper svg {
    color: white;
    width: 26px;
    height: 26px;
}

.info-number {
    font-size: 2rem;
    font-weight: 900;
    color: #185CE6;
    line-height: 1;
    margin-bottom: 0.25rem;
}

.info-label {
    font-size: 0.8rem;
    color: #6B7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1.3;
}

.info-divider {
    width: 2px;
    height: 60px;
    background: #185CE6;
    border-radius: 2px;
}

/* Loading State */
.loading-state {
    background: white;
    border-radius: 20px;
    padding: 5rem 2rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #F3F4F6;
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
    border-radius: 20px;
    padding: 5rem 2rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #F3F4F6;
}

.empty-illustration {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
    grid-template-columns: 1fr;
    gap: 2.5rem;
    margin-bottom: 3rem;
}

@media (min-width: 768px) {
    .news-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .news-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* News Card */
.news-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #F3F4F6;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
}

.news-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(223, 45, 178, 0.2);
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 10px rgba(223, 45, 178, 0.3);
}

.card-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(223, 45, 178, 0.4);
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
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #F3F4F6;
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

/* Responsive Design */
@media (max-width: 1024px) {
    .news-content {
        padding: 0 1.5rem;
    }

    .news-header-content {
        padding: 0 1.5rem;
    }
}

@media (max-width: 768px) {
    .news-header {
        padding: 1.25rem 0;
    }

    .news-header-content {
        padding: 0 1rem;
    }

    .header-title-section {
        gap: 0.875rem;
        flex-wrap: wrap;
        width: 100%;
    }

    .header-title-section > div {
        flex: 1;
        min-width: 0;
        max-width: 100%;
    }

    .header-icon {
        width: 26px;
        height: 26px;
    }

    .news-title {
        font-size: 1.35rem;
        line-height: 1.3;
        word-break: break-word;
        overflow-wrap: break-word;
        max-width: 100%;
        width: 100%;
    }

    .news-subtitle {
        font-size: 0.8rem;
        line-height: 1.4;
        overflow-wrap: break-word;
        max-width: 100%;
        width: 100%;
    }

    .news-content {
        padding: 0 1rem;
    }

    .search-bar-modern {
        padding: 1.25rem;
        border-radius: 16px;
        gap: 0.875rem;
    }

    .search-wrapper {
        min-width: 100%;
    }

    .search-input-modern {
        padding: 0.875rem 3rem 0.875rem 3rem;
        font-size: 0.9rem;
    }

    .search-icon-modern {
        left: 1rem;
        width: 18px;
        height: 18px;
    }

    .clear-btn-modern {
        right: 1rem;
        width: 28px;
        height: 28px;
    }

    .clear-btn-modern svg {
        width: 16px;
        height: 16px;
    }

    .sort-select-modern {
        width: 100%;
        padding: 0.875rem 1.25rem;
        font-size: 0.9rem;
    }

    .info-banner {
        padding: 1.25rem;
        border-radius: 16px;
        flex-direction: row;
        gap: 1rem;
        justify-content: space-between;
    }

    .info-item {
        flex-direction: column;
        text-align: center;
        gap: 0.875rem;
        flex: 1;
    }

    .info-icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 12px;
    }

    .info-icon-wrapper svg {
        width: 22px;
        height: 22px;
    }

    .info-number {
        font-size: 1.75rem;
    }

    .info-label {
        font-size: 0.7rem;
        letter-spacing: 0.3px;
    }

    .info-divider {
        display: none;
    }

    .loading-state,
    .empty-state-modern {
        padding: 4rem 1.5rem;
        border-radius: 16px;
    }

    .loading-message,
    .empty-title-modern {
        font-size: 1.1rem;
    }

    .empty-text-modern {
        font-size: 1rem;
    }

    .news-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 2.5rem;
    }

    .news-card {
        border-radius: 16px;
    }

    .card-image-container {
        height: 240px;
    }

    .card-content {
        padding: 1.5rem;
    }

    .card-title {
        font-size: 1.25rem;
        margin-bottom: 0.875rem;
    }

    .card-description {
        font-size: 0.95rem;
        margin-bottom: 1.25rem;
    }

    .card-footer {
        padding-top: 1rem;
    }

    .card-button {
        padding: 0.625rem 1.25rem;
        font-size: 0.8rem;
    }

    .pagination-container {
        margin-top: 2.5rem;
        padding: 1.5rem;
        border-radius: 16px;
        flex-direction: column;
        text-align: center;
        gap: 1.25rem;
    }

    .pagination-info {
        font-size: 0.95rem;
    }

    .pagination-button,
    .pagination-number {
        min-width: 44px;
        height: 44px;
        font-size: 0.95rem;
    }
}

@media (max-width: 480px) {
    .news-header {
        padding: 1rem 0;
    }

    .news-header-content {
        padding: 0 0.875rem;
    }

    .header-title-section {
        gap: 0.625rem;
        align-items: flex-start;
        width: 100%;
    }

    .header-title-section > div {
        flex: 1;
        min-width: 0;
        max-width: calc(100% - 30px);
    }

    .header-icon {
        width: 22px;
        height: 22px;
        margin-top: 0.125rem;
    }

    .news-title {
        font-size: 1.05rem;
        line-height: 1.3;
        overflow-wrap: break-word;
        word-wrap: break-word;
        max-width: 100%;
        width: 100%;
    }

    .news-subtitle {
        font-size: 0.72rem;
        overflow-wrap: break-word;
        word-wrap: break-word;
        max-width: 100%;
        width: 100%;
        line-height: 1.3;
    }

    .news-content {
        padding: 0 0.875rem;
    }

    .search-bar-modern {
        padding: 1rem;
        border-radius: 14px;
    }

    .search-input-modern {
        padding: 0.75rem 2.75rem 0.75rem 2.75rem;
        font-size: 0.85rem;
    }

    .search-icon-modern {
        left: 0.875rem;
        width: 16px;
        height: 16px;
    }

    .clear-btn-modern {
        right: 0.875rem;
        width: 26px;
        height: 26px;
    }

    .clear-btn-modern svg {
        width: 14px;
        height: 14px;
    }

    .sort-select-modern {
        padding: 0.75rem 1rem;
        font-size: 0.85rem;
    }

    .info-banner {
        padding: 1rem;
        border-radius: 14px;
        gap: 0.75rem;
        justify-content: space-between;
    }

    .info-item {
        flex-direction: column;
        text-align: center;
        gap: 0.625rem;
        flex: 1;
    }

    .info-icon-wrapper {
        width: 42px;
        height: 42px;
        border-radius: 10px;
    }

    .info-icon-wrapper svg {
        width: 20px;
        height: 20px;
    }

    .info-number {
        font-size: 1.5rem;
    }

    .info-label {
        font-size: 0.65rem;
        letter-spacing: 0.2px;
        line-height: 1.2;
    }

    .info-divider {
        display: none;
    }

    .loading-state,
    .empty-state-modern {
        padding: 3rem 1rem;
        border-radius: 14px;
    }

    .loading-dot {
        width: 12px;
        height: 12px;
    }

    .loading-message {
        font-size: 1rem;
    }

    .empty-illustration svg {
        width: 100px;
        height: 100px;
    }

    .empty-title-modern {
        font-size: 1rem;
    }

    .empty-text-modern {
        font-size: 0.9rem;
    }

    .news-grid {
        gap: 1.25rem;
        margin-bottom: 2rem;
    }

    .news-card {
        border-radius: 14px;
    }

    .card-image-container {
        height: 200px;
    }

    .card-content {
        padding: 1.25rem;
    }

    .card-title {
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
    }

    .card-description {
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    .card-footer {
        padding-top: 0.875rem;
    }

    .card-meta {
        gap: 0.5rem;
        font-size: 0.8rem;
    }

    .meta-icon {
        width: 1rem;
        height: 1rem;
    }

    .card-button {
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
        gap: 0.375rem;
    }

    .button-icon {
        width: 1rem;
        height: 1rem;
    }

    .pagination-container {
        margin-top: 2rem;
        padding: 1.25rem;
        border-radius: 14px;
    }

    .pagination-info {
        font-size: 0.85rem;
    }

    .pagination-button,
    .pagination-number {
        min-width: 40px;
        height: 40px;
        font-size: 0.85rem;
        gap: 0.5rem;
    }

    .pagination-button svg {
        width: 18px;
        height: 18px;
    }
}
</style>
