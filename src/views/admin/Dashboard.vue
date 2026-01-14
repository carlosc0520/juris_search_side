<template>
  <section class="dashboard-container mt-4 py-4">
    <div class="dashboard-wrapper">
      <!-- Header con Título -->
      <div class="dashboard-header">
        <div class="dashboard-header-content">
          <div class="header-title-section">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="header-icon">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <div>
              <h1 class="dashboard-title">Dashboard</h1>
              <p class="dashboard-subtitle">Vista general de estadísticas y métricas</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card stat-card-resoluciones">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Resoluciones</p>
            <p class="stat-value">{{ getTotalValue(head.ENTRADAS) }}</p>
          </div>
        </div>

        <div class="stat-card stat-card-usuarios">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Usuarios</p>
            <p class="stat-value">{{ getTotalValue(head.USUARIOS) }}</p>
          </div>
        </div>

        <div class="stat-card stat-card-busquedas">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Búsquedas</p>
            <p class="stat-value">{{ head.PALABRAS?.length || 0 }}</p>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="chart-tabs">
        <button 
          class="tab-button" 
          :class="{ 'active': active === 'Resoluciones' }" 
          @click="updateActive('Resoluciones')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="tab-icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Resoluciones
        </button>
        <button 
          class="tab-button" 
          :class="{ 'active': active === 'Usuarios' }" 
          @click="updateActive('Usuarios')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="tab-icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Usuarios
        </button>
      </div>

      <!-- Gráficos -->
      <div class="charts-grid">
        <div class="chart-container">
          <div v-if="active === 'Resoluciones'">
            <card-area-chart :DATA="head.ENTRADAS" title="Iteración de Resoluciones"/>
          </div>
          <div v-if="active === 'Usuarios'">
            <card-area-chart :DATA="head.USUARIOS" title="Iteración de Usuarios"/>
          </div>
        </div>

        <div class="table-container">
          <card-page-palabras TITLE="Últimas búsquedas" :data="head.PALABRAS" />
        </div>
      </div>

      <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />
    </div>
  </section>
</template>


<script>
import CardPagePalabras from "../../components/Cards/CardPagePalabras.vue";
import CardAreaChart from "@/components/Cards/CardAreaChart.vue";
import { toast } from 'vue3-toastify';
import searchIcon from "@/assets/img/icons/search.svg";
import helpersProxy from "../../proxies/helpersProxy";

// PROXIES
// import MantenimientoProxy from '../../proxies/MantenimientoProxy';

export default {
  components: {
    CardAreaChart,
    CardPagePalabras
  },
  data() {
    return {
      searchIcon,
      isLoading: false,
      active: "Resoluciones",
      head: {
        USUARIOS: 0,
        ENTRADAS: 0,
        PALABRAS: 0,
      },
    };
  },
  props: {
    role: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    updateActive(text) {
      this.active = text;
    },
    getTotalValue(data) {
      if (!Array.isArray(data) || data.length === 0) return 0;
      return data.reduce((sum, item) => sum + (item.VALUE || 0), 0);
    },
    async getHead() {
      await helpersProxy.getHead(2)
        .then((response) => {
          if (typeof response !== 'undefined') {
            this.head = {
              USUARIOS: JSON.parse(response?.[0]?.USUARIOS) || [],
              ENTRADAS: JSON.parse(response?.[0]?.ENTRADAS) || [],
              PALABRAS: JSON.parse(response?.[0]?.PALABRAS) || []
            }
          }
        })
        .catch((error) => toast.error(error, { toastId: 'error-head' }));
    },
  },
  mounted() {
    this.getHead();
  },
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 1rem;
}

.dashboard-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 2rem 0;
  margin-bottom: 2rem;
  margin-left: -1rem;
  margin-right: -1rem;
}

.dashboard-header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-title-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  flex-shrink: 0;
  color: #185CE6;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.dashboard-title {
  font-family: Lato, sans-serif;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #DF2DB2 0%, #185CE6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.2;
}

.dashboard-subtitle {
  font-family: Lato, sans-serif;
  color: #6B7280;
  font-size: 0.95rem;
  margin: 0.25rem 0 0 0;
  font-weight: 500;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 28px;
  height: 28px;
  color: white;
}

.stat-card-resoluciones .stat-icon {
  background: linear-gradient(135deg, #DF2DB2 0%, #E71FB3 100%);
}

.stat-card-usuarios .stat-icon {
  background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
}

.stat-card-busquedas .stat-icon {
  background: linear-gradient(135deg, #185CE6 0%, #1E40AF 100%);
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-family: Lato, sans-serif;
  font-size: 14px;
  color: #64748b;
  margin: 0 0 4px 0;
  font-weight: 500;
}

.stat-value {
  font-family: Lato, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1;
}

/* Chart Tabs */
.chart-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 1.5rem;
  background: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.tab-button {
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-family: Lato, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tab-icon {
  width: 20px;
  height: 20px;
}

.tab-button:hover {
  background: rgba(139, 92, 246, 0.08);
  color: #8B5CF6;
}

.tab-button.active {
  background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.chart-container,
.table-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem 0.5rem;
  }

  .dashboard-header-content {
    padding: 0 1rem;
  }

  .header-title-section {
    gap: 1rem;
  }

  .header-icon {
    width: 24px;
    height: 24px;
  }

  .dashboard-title {
    font-size: 1.5rem;
  }

  .dashboard-subtitle {
    font-size: 0.85rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stat-icon {
    width: 48px;
    height: 48px;
  }

  .stat-icon svg {
    width: 24px;
    height: 24px;
  }

  .stat-value {
    font-size: 28px;
  }

  .chart-tabs {
    flex-direction: column;
    gap: 8px;
  }

  .tab-button {
    padding: 10px 16px;
    font-size: 14px;
  }
}
</style>