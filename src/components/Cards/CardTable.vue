<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6rounded pt-2 pb-4">


    <!-- <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg m-0"
            :class="[color === 'light' ? 'm-0 text-blueGray-700' : 'm-0 text-white']">
            {{ title }}
          </h3>
        </div>
      </div>
    </div> -->

    <div class="flex justify-start mb-3 gap-2 flex-col md:flex-row">
      <b-form-select v-model="perPage" :options="grid.pageOptions" class="ml-2"
        style="width: 70px;height: 37px; padding: 1px!important;" @change="() => myCallback(currentPage, perPage)" />

      <b-pagination v-model="currentPage" :total-rows="grid.totalRows" @update:model-value="myCallback"
        :per-page="grid.perPage" aria-controls="my-table" class="my-0" />

      <b-input type="number" v-model="currentPage" @input="currentPage" placeholder="Buscar..." class="ml-2"
        style="width: 70px;height: 37px" />
    </div>

    <div class="overflow-x-auto">
      <b-table :items="items" :fields="fields" :busy="grid.isLoading" busyLoadingText="Cargando..." no-local-sorting
        responsive="sm" :noProviderSorting="false" :noProviderFiltering="false" :noSortableIcon="true" class="mb-4">
        <template #emptyText>
          <div class="text-center my-3">
            <b-icon icon="exclamation-circle-fill"></b-icon>
            <p>No existen datos</p>
          </div>
        </template>

        <template #cell(FCRCN)="data">
          <span>{{ formatoFecha(data.value) }}</span>
        </template>

        <template #cell(CDESTDO)="data">
          <b-badge :variant="data.value === 'A' ? 'success' : 'danger'"
            :title="data.value === 'A' ? 'Activo' : 'Inactivo'" class="cursor-pointer">
            {{ data.value === 'A' ? 'A' : 'I' }}
          </b-badge>
        </template>

        <template #cell(TEMA)="data">
          <span v-html="data.value"></span>
        </template>

        <!-- ACCIONES -->
        <template #cell(ACCIONES)="data">
          <div class="flex items-center">
            <b-button v-if="actions.edit" :title="actions.edit.label" @click="actions.edit.action(data.item)"
              class="mr-2 btn-edit" size="sm">
              <i :class="actions.edit.icon"></i>
            </b-button>
            <b-button v-if="actions.delete && deleteRole" :title="actions.delete.label" @click="actions.delete.action(data.item)"
              class="mr-2 btn-delete" size="sm">
              <i :class="actions.delete.icon"></i>
            </b-button>

            <b-button v-if="actions.view" :title="actions.view.label" @click="actions.view.action(data.item)"
              class="mr-2 btn-view" size="sm">
              <i :class="actions.view.icon"></i>
            </b-button>

            <div v-if="actions.download">
              <b-button v-if="!actions.download.dropdown" :title="actions.download.label"
                @click="actions.download.action(data.item)" class="mr-2 btn-delete" size="sm">
                <i :class="actions.download.icon"></i>
              </b-button>

              <b-dropdown v-else :text="actions.download.label" variant="primary" size="sm" no-caret>
                <template #button-content>
                  <i :class="actions.download.icon"></i>
                </template>

                <b-dropdown-item v-for="(item, index) in actions.download.dropdown.items" :key="index"
                  @click="item.action(data.item)">
                  <i :class="item.icon"></i>
                  {{ item.label }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </template>
      </b-table>

    </div>

    <div class="flex justify-start mb-3 gap-2 flex-col md:flex-row">
      <b-form-select v-model="perPage" :options="grid.pageOptions" class="ml-2"
        style="width: 70px;height: 37px; padding: 1px!important;" @change="() => myCallback(currentPage, perPage)" />
      <b-pagination v-model="currentPage" :total-rows="grid.totalRows" @update:model-value="myCallback"
        :per-page="grid.perPage" aria-controls="my-table" class="my-0" />
      <b-input type="number" v-model="currentPage" @input="currentPage" placeholder="Buscar..." class="ml-2"
        style="width: 70px;height: 37px" />
    </div>
  </div>
</template>
<script>

import { BPagination, BTable, BBadge, BButton, BDropdown, BDropdownItem, BInput, BFormSelect } from 'bootstrap-vue-next';
import moment from 'moment';

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  components: {
    BPagination,
    BTable,
    BBadge,
    BButton,
    BDropdown,
    BDropdownItem,
    BInput,
    BFormSelect
  },
  props: {
    color: {
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
    title: {
      type: String,
      default: "Tabla"
    },
    search: {
      type: Function,
      default: () => { },
    },
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    grid: {
      type: Object,
      default: () => {
        return {
          items: [],
          currentPage: 1,
          perPage: 10,
          totalRows: 0,
          isLoading: true,
          pageOptions: [5, 10, 15, 50],
        };
      },
    },
    actions: {
      type: Object,
      default: () => { },
    },
    deleteRole: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    async myCallback(page) {
      await this.search(page, this.perPage)
    },
    formatoFecha(fecha) {
      try {
        return moment(fecha).format('DD/MM/YYYY, h:mm a');
      } catch (error) {
        return "";
      }
    }
  },
  mounted() {
    this.search(this.grid.currentPage, this.grid.perPage)
  }
};
</script>


<style>
/* "items-center w-full bg-transparent border-collapse */
table {
  width: 100% !important;
  border-collapse: collapse !important;
}

/* bg-blueGray-50 text-blueGray-500 border-blueGray-100 */
table th {
  background-color: #f8fafc !important;
  color: #64748b !important;
  border-color: #edf2f7 !important;
}

table th,
table td {
  padding: 1rem !important;
  text-align: left !important;
  border: 1px solid #edf2f7 !important;
}



table th,
table td {
  padding: 1rem 2rem !important;
}

table tbody tr td {
  background-color: white !important;
  border-color: #edf2f7 !important;
}

table thead tr th {
  background-color: #f7fafcff !important;
  border-color: #edf2f7 !important;
}
</style>