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

    <!-- <div class="flex justify-start mb-3 gap-2 flex-col md:flex-row">
      <b-form-select v-model="perPage" :options="grid.pageOptions" class="ml-2"
        style="width: 70px;height: 37px; padding: 1px!important;" @change="() => myCallback(currentPage, perPage)" />

      <b-pagination v-model="currentPage" :total-rows="grid.totalRows" @update:model-value="myCallback"
        :per-page="grid.perPage" aria-controls="my-table" class="my-0" />

      <b-input type="number" v-model="currentPage" @input="currentPage" placeholder="Buscar..." class="ml-2"
        style="width: 70px;height: 37px" />
    </div> -->

    <div class="overflow-x-auto">
      <div class="table-perOptions">
        <b-form-select v-model="perPage" :options="grid.pageOptions" style="width: 70px;"
          @change="() => myCallback(currentPage, perPage)" />
        <p style="font-size: 14px; color: #727370 !important; margin: 0; padding: 0; font-family: Lato;">
          Se están mostrando {{ items.length }} de {{ grid.perPage }} registros por página (total: {{ grid.totalRows }}
          registros)
        </p>
      </div>

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

        <template #head(CHECK)>
          <div class="flex items-center justify-center">
            <input type="checkbox" class="check-head form-check-input"
              @change="(e) => actions.checkeoud.actionFull(e.target.checked)" />
          </div>
        </template>


        <template #cell(CHECK)="data">
          <input type="checkbox" class="check-item form-check-input" :checked="data.item?.checked"
            v-model="data.item.checked" @change="(e) => actions.checkeoud.action(e.target.checked, data.item)" />
        </template>

        <template #cell(FEDCN)="data">
          <span>{{ formatoFecha(data.value) }}</span>
        </template>

        <template #cell(CDESTDO)="data">
          <b-badge :style="{
            border: data.value === 'A' ? '1px solid #27AE60!important' : '1px solid #FF4D4D!important',
            backgroundColor: data.value === 'A' ? '#C7FFDE!important' : '#FFB2B2!important',
            color: '#727370 !important',
          }" :title="data.value === 'A' ? 'Activo' : 'Inactivo'" class="cursor-pointer">
            {{ data.value === 'A' ? 'Activo' : 'Inactivo' }}
          </b-badge>
        </template>


        <template #cell(ESTADO)="data">
          <b-badge :style="{
            border: data.value ? '1px solid #27AE60!important' : '1px solid #FF4D4D!important',
            backgroundColor: data.value ? '#C7FFDE!important' : '#FFB2B2!important',
            color: data.value ? '#727370 !important' : '#727370 !important',
          }" :title="data.value ? 'Aceptado' : 'Pendiente'" class="cursor-pointer">
            {{ data.value ? 'Aceptado' : 'Pendiente' }}
          </b-badge>
        </template>

        <template #cell(IMAGEN)="data">
          <div style="width: 100px; height: 100px;">
            <a :href="data.value" target="_blank">
              <img :src="data.value" alt="imagen" style="width: 100%; height: 100%; object-fit: cover;">
            </a>
          </div>
        </template>

        <template #cell(TITLEALT)="data">
          <div v-html="data.value"></div>
        </template>

        <template #cell(DDIRECTORIO)="data">
          <div v-html="data.value"></div>
        </template>


        <template #cell(BOLETIN)="data">
          <a :href="data.value" target="_blank">
            <span>{{
              data.value.length > 30 ? data.value.substring(0, 30) + '...' : data.value
            }}</span>
          </a>
        </template>

        <!-- // HTML -->
        <template #cell(TEMA)="data">
          <span v-html="data.value"></span>
        </template>

        <template #cell(DETALLE)="data">
          <span v-html="data.value"></span>
        </template>

        <template #cell(AUTOR)="data">
          <span v-html="data.value"></span>
        </template>

        <template #cell(DESCRIPCION)="data">
          <span v-html="data.value"></span>
        </template>

        <template #cell(RTAFTO)="data">
          <span v-html="data.value"></span>
        </template>

        <!-- ACCIONES -->
        <template #cell(ACCIONES)="data">
          <div class="flex items-center justify-center gap-0">
            <b-button v-if="actions.edit" :title="actions.edit.label" @click="actions.edit.action(data.item)"
              style="width: 45px!important; height: 45px!important; background-color: transparent; border: none!important">
              <img src="@/assets/img/icons/edit.svg" alt="edit" width="40" height="40" />
            </b-button>
            <b-button v-if="actions.delete && deleteRole && (data.item?.PROP === undefined || data.item.PROP === 1)"
              :title="actions.delete.label" @click="actions.delete.action(data.item)"
              style="width: 45px!important; height: 45px!important; background-color: transparent; border: none!important">
              <img src="@/assets/img/icons/delete.svg" alt="delete" width="40" height="40" />
            </b-button>
            
            <b-button v-if="actions.shared && (data.item?.PROP === undefined || data.item.PROP === 1)" :title="actions.shared.label" @click="actions.shared.action(data.item)"
              style="width: 45px!important; height: 45px!important; background-color: transparent; border: none!important">
              <img src="@/assets/img/icons/shared.svg" alt="share" width="40" height="40" />
            </b-button>

            <b-button v-if="actions.users" :title="actions.users.label" @click="actions.users.action(data.item)"
              style="width: 45px!important; height: 45px!important; background-color: transparent; border: none!important">
              <img src="@/assets/img/icons/usersshared.svg" alt="users" width="40" height="40" />
            </b-button>
  
            <b-button v-if="actions.updateShared && (data.item?.PROP === undefined || data.item.PROP === 1)" :title="actions.updateShared.label" @click="actions.updateShared.action(data.item)"
              style="width: 45px!important; height: 45px!important; background-color: transparent; border: none!important">
              <img src="@/assets/img/icons/settings.svg" alt="users" width="40" height="40" />
            </b-button>

            <b-button v-if="actions.view" :title="actions.view.label" @click="actions.view.action(data.item)"
              style="width: 45px!important; height: 45px!important; background-color: transparent; border: none!important">
              <img src="@/assets/img/icons/eyeView.svg" alt="visualizar" width="40" height="40" />
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
      <b-pagination v-model="currentPage" :total-rows="grid.totalRows" @update:model-value="myCallback"
        :per-page="grid.perPage" aria-controls="my-table" class="my-0" />
      <!-- <b-input type="number" v-model="currentPage" @input="currentPage" placeholder="Buscar..." class="ml-2"
        style="width: 70px;height: 37px" /> -->
    </div>
  </div>
</template>
<script>

import { BPagination, BTable, BBadge, BButton, BDropdown, BDropdownItem, BFormSelect } from 'bootstrap-vue-next';
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
        return moment.utc(fecha).local().format('DD/MM/YYYY, h:mm a');
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
  font-family: Lato;
  font-size: 16px !important;
}

table th,
table td {
  padding: .7rem 1.5rem !important;
}

table tbody tr td {
  padding: 15px;
  color: #727370 !important;
  background-color: #ffffff !important;
}

table thead tr th {
  padding: 5px;
  background-color: #EDF6FF !important;
  color: #11235A !important;
  vertical-align: middle !important;
}

table tbody tr {
  border-bottom: 1px solid #e2e8f0 !important;
}

.table-perOptions {
  display: flex;
  justify-content: start;
  margin-bottom: 1rem;
  gap: 1rem;
  flex-direction: row;
  align-items: center;
}

/* // en celular */
@media (max-width: 768px) {
  .table-perOptions {
    flex-direction: column;
    align-items: start;
  }
}
</style>