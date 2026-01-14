<template>
  <div class="palabras-card">
    <div class="palabras-header">
      <div class="palabras-title-wrapper">
        <div class="palabras-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="palabras-title">{{ TITLE }}</h3>
      </div>
    </div>
    <div class="palabras-body">
      <div class="table-wrapper">
        <table class="palabras-table">
          <thead>
            <tr>
              <th>Palabra</th>
              <th>Cantidad</th>
              <th>Última vez</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td class="palabra-cell">
                <span class="palabra-badge">{{ item.LABEL }}</span>
              </td>
              <td class="cantidad-cell">
                <span class="cantidad-badge">{{ item.VALUE }}</span>
              </td>
              <td class="fecha-cell">{{ formatoFecha(item.FECHA) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import moment from 'moment';

export default {
  name: "CardPagePalabras",
  props: {
    data: Array,
    TITLE: String,
  },
  methods: {
    formatoFecha(fecha) {
      try {
        return moment.utc(fecha).format('DD/MM/YYYY, h:mm a');
      } catch (error) {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.palabras-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.palabras-header {
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.palabras-title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.palabras-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #185CE6 0%, #1E40AF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.palabras-icon svg {
  width: 22px;
  height: 22px;
  color: white;
}

.palabras-title {
  font-family: Lato, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.palabras-body {
  padding: 0;
}

.table-wrapper {
  overflow-x: auto;
}

.palabras-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Lato, sans-serif;
}

.palabras-table thead {
  background: rgba(139, 92, 246, 0.04);
}

.palabras-table th {
  padding: 14px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #f1f5f9;
}

.palabras-table tbody tr {
  transition: background-color 0.2s ease;
}

.palabras-table tbody tr:hover {
  background-color: #f8fafc;
}

.palabras-table td {
  padding: 16px 20px;
  font-size: 14px;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
}

.palabras-table tbody tr:last-child td {
  border-bottom: none;
}

.palabra-cell {
  font-weight: 600;
}

.palabra-badge {
  display: inline-block;
  padding: 6px 14px;
  background: linear-gradient(135deg, rgba(223, 45, 178, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border-radius: 20px;
  color: #8B5CF6;
  font-size: 13px;
  font-weight: 600;
}

.cantidad-cell {
  text-align: center;
}

.cantidad-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  padding: 4px 10px;
  background: linear-gradient(135deg, #185CE6 0%, #1E40AF 100%);
  border-radius: 12px;
  color: white;
  font-size: 13px;
  font-weight: 700;
}

.fecha-cell {
  color: #94a3b8;
  font-size: 13px;
}

@media (max-width: 768px) {
  .palabras-header {
    padding: 1.25rem 1.25rem 0.75rem 1.25rem;
  }

  .palabras-title {
    font-size: 16px;
  }

  .palabras-table th,
  .palabras-table td {
    padding: 12px 16px;
    font-size: 13px;
  }

  .palabra-badge {
    font-size: 12px;
    padding: 5px 12px;
  }

  .cantidad-badge {
    font-size: 12px;
  }

  .fecha-cell {
    font-size: 12px;
  }
}
</style>