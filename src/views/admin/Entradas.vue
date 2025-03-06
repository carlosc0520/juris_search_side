<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12">
      <div class="w-full mb-12">
        <b-tabs>
          <b-tab title="Jurisprudencia" @click="updateActive('jurisprudences')">
          </b-tab>
          <b-tab title="Legislación" @click="updateActive('legislations')">
          </b-tab>
        </b-tabs>

        <div class="bg-white p-4 shadow-lg">
          <div class="row">
            <div class="col-md-4 col-12 mb-3">
              <label for="name" class="form-label">Título</label>
              <input type="text" v-model="selectedFilter.name" id="name" class="form-control" />
            </div>

            <div class="col-md-4 col-12 mb-3">
              <label for="RTITLE: " class="form-label">Título alternativo</label>
              <input type="text" v-model="selectedFilter.RTITLE" id="RTITLE: " class="form-control" />
            </div>

            <div class="col-md-4 col-12 mb-3">
              <label for="BLOG3" class="form-label">Fecha de resolución</label>
              <date-picker v-model="selectedFilter.FRESOLUTION" :value="selectedFilter.FRESOLUTION" valueType="format"
                :disabledDate="time => time.getTime() > Date.now()"
                @change="(date) => selectedFilter.FRESOLUTION = date"></date-picker>
            </div>

            <div class="col-md-3 col-12 mb-3">
              <label for="FCRCN" class="form-label">Fecha de Ingreso </label>
              <date-picker v-model="selectedFilter.FCRCN" :value="selectedFilter.FCRCN" valueType="format"
                :disabledDate="time => time.getTime() > Date.now()"
                @change="(date) => selectedFilter.FCRCN = date"></date-picker>
            </div>

            <div class="col-md-3 col-12 mb-3">
              <label for="TEMA" class="form-label">Tema</label>
              <input type="text" v-model="selectedFilter.TEMA" id="TEMA" class="form-control" />
            </div>

            <div class="col-md-3 col-12 mb-3">
              <label for="BLOG2" class="form-label">Tipo de entrada</label>
              <b-form-select v-model="selectedFilter.BLOG" :options="[
                { text: '-- Seleccione ', value: null },
                { text: 'Común', value: 'common' },
                { text: 'Emblemático', value: 'emblematic' },
                { text: 'Ejecutivo', value: 'executive' }]">
              </b-form-select>
            </div>


            <div class="col-md-3 col-12 mb-3">
              <label for="CDESTDO" class="form-label">Estado</label>
              <b-form-select v-model="selectedFilter.CDESTDO" :options="[
                { text: '-- Seleccione ', value: null },
                { text: 'Activo', value: 'A' },
                { text: 'Inactivo', value: 'I' }]">
              </b-form-select>
            </div>


            <div class="col-md-12 col-12 mb-3">
              <div class="flex justify-end gap-4">
                <button class="bton btn-search" @click="getEntries(grid.currentPage, grid.perPage)">Buscar</button>
                <div v-if="active == 'jurisprudences'" class="dropdown bton btn-create">
                  <button class="text-white dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Ingresar
                  </button>
                  <ul class="dropdown-menu mt-2 p-0" aria-labelledby="dropdownMenuButton">
                    <li @click="modalEntradaComun.show = true">
                      <i class="fas fa-plus"></i>
                      Jurisprudencia Común
                    </li>
                    <li @click="modalAgregarEntradaEmble.show = true">
                      <i class="fas fa-plus"></i>
                      Jurisprudencia Emblemático
                    </li>
                  </ul>
                </div>
                <button v-else class="bton btn-create"
                  @click="modalAgregarEntradalegislacion.show = true">Ingresar</button>

                <div class="dropdown bton btn-export">
                  <button class="text-white dropdown-toggle" type="button" id="dropdownMenuButtonExportar"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Exportar
                  </button>
                  <ul class="dropdown-menu mt-2 p-0" aria-labelledby="dropdownMenuButtonExportar">
                    <li @click="onClickExportar(1)">
                      <i class="fas fa-file-pdf"></i>
                      Resumen Ejecutivo
                    </li>
                    <li @click="onClickExportar(2)">
                      <i class="fas fa-book"></i>
                      Resoluciones
                    </li>
                    <li @click="onClickExportar(3)">
                      <i class="fas fa-book"></i>
                      Exportar Pág.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <card-table v-if="active === 'jurisprudences'" :active="active" title="Entradas de Jurisprudencias"
            :search="getEntries" :fields="fields" :items="data" :grid="grid" :actions="actions"
            :deleteRole="role.IDR == 0" />

          <card-table v-if="active === 'legislations'" :active="active" title="Entradas de Legislación"
            :search="getEntries" :fields="fields.filter((field) => field.key !== 'TEMA')" :items="data" :grid="grid"
            :actions="actions" :deleteRole="role.IDR == 0" />
        </div>

      </div>
    </div>

    <LoadingOverlay :active="isLoading" :is-full-page="false" :loader="'bars'" />

    <ModalAgregarEntradaComun :role="role" :show="modalEntradaComun.show" :close="() => modalEntradaComun.show = false"
      :update="() => getEntries(grid.currentPage, grid.perPage)" :selects="selects" />

    <ModalEditarEntradaComun :role="role" :show="modalEditarEntradaComun.show"
      :close="() => modalEditarEntradaComun.show = false" :update="() => getEntries(grid.currentPage, grid.perPage)"
      :selects="selects" :data="modalEditarEntradaComun.data" />

    <ModalAgregarEntradaEmble :role="role" :show="modalAgregarEntradaEmble.show"
      :close="() => modalAgregarEntradaEmble.show = false" :update="() => getEntries(grid.currentPage, grid.perPage)"
      :selects="selects" />

    <ModalEditarEntradaEmble :role="role" :show="modalEditarEntradaEmble.show"
      :close="() => modalEditarEntradaEmble.show = false" :update="() => getEntries(grid.currentPage, grid.perPage)"
      :selects="selects" :data="modalEditarEntradaEmble.data" />

    <ModalAgregarEntradalegislacion :role="role" :show="modalAgregarEntradalegislacion.show"
      :close="() => modalAgregarEntradalegislacion.show = false"
      :update="() => getEntries(grid.currentPage, grid.perPage)" :selects="selects" />

    <ModalEditarEntradaLegislacion :role="role" :show="modalEditarEntradalegislacion.show"
      :close="() => modalEditarEntradalegislacion.show = false"
      :update="() => getEntries(grid.currentPage, grid.perPage)" :selects="selects"
      :data="modalEditarEntradalegislacion.data" />

    <ModalEliminar :role="role" :message="'¿Está seguro de cambiar el estado de este registro?'"
      :buttonOk="'Si, cambiar'" :action="deleteRow" :openDelete="modalEliminar.show"
      :closeHandler="() => modalEliminar.show = false" />


  </div>
</template>


<script>
import CardTable from "@/components/Cards/CardTable.vue";
import { BTabs, BTab, BFormSelect } from 'bootstrap-vue-next';
import { toast } from 'vue3-toastify';
import adminEntriesProxy from "../../proxies/AdminEntriesProxy.js";

// MODALES
import ModalAgregarEntradaComun from "./Modales/ModalAgregarEntradaComun.vue";
import ModalEditarEntradaComun from "./Modales/ModalEditarEntradaComun.vue";
import ModalAgregarEntradaEmble from "./Modales/ModalAgregarEntradaEmble.vue";
import ModalEditarEntradaEmble from "./Modales/ModalEditarEntradaEmble.vue";
import ModalAgregarEntradalegislacion from "./Modales/ModalAgregarEntradalegislacion.vue";
import ModalEditarEntradaLegislacion from "./Modales/ModalEditarEntradaLegislacion.vue";

// PROXIES
import MagistradoProxy from "../../proxies/Magistrados.Proxy";
import filterProxy from "../../proxies/FilterProxy.js";
import ModalEliminar from "./Modales/ModalEliminar.vue";
import createPDFHelper from "../../assets/helpers/generatePdfHelper.js";

export default {
  components: {
    CardTable,
    BTabs,
    BTab,
    BFormSelect,

    // MODALES
    ModalAgregarEntradaComun,
    ModalEditarEntradaComun,
    ModalAgregarEntradaEmble,
    ModalEditarEntradaEmble,
    ModalAgregarEntradalegislacion,
    ModalEditarEntradaLegislacion,
    ModalEliminar
    // ModalAgregarEntradaEmble,
  },
  data() {
    return {
      currentPage: 10,
      data: [],
      grid: {
        items: [],
        currentPage: 1,
        perPage: 10,
        totalRows: 120,
        isLoading: true,
        pageOptions: [5, 10, 15, 50],
      },
      fields: [
        {
          key: "RN",
          label: "",
        },
        {
          key: "FRESOLUTION",
          label: "Publicación",
          sortable: true,
          formatter: (value) => {
            // 2024-11-06T05:00:00.000Z, lo quiero en formato DD/MM/YYYY
            return value.split('T')[0].split('-').reverse().join('/');

            // console.log(value);
            // console.log(moment.utc(value).format('DD/MM/YYYY'));
            // return moment.utc(value).format('DD/MM/YYYY');
          },
        },
        {
          key: "TITLE",
          label: "Título",
          class: "w-130",
          sortable: true,
        },
        {
          key: "RTITLE",
          label: `Título alternativo`,
          class: "text-left",
          sortable: true,
          formatter: (value) => [null, undefined, "null"].includes(value) ? "" : value,
        },
        {
          key: "TEMA",
          label: "Tema",
        },
        {
          key: "BLOG",
          label: "Tipo de entrada",
          sortable: true,
          class: "text-center w-130",
          width: "30px",
        },
        {
          key: "FCRCN",
          label: "Fecha de Ingreso",
          sortable: true,
          class: "text-center w-130",
        },
        {
          key: "UCRCN",
          label: "U. Creación",
          sortable: true,
          class: "text-center w-130",
        },
        {
          key: "FEDCN",
          label: "Fecha de Edición",
          sortable: true,
          class: "text-center w-130",
        },
        {
          key: "UEDCN",
          label: "U. Edición",
          sortable: true,
          class: "text-center w-130",
        },
        {
          key: "CDESTDO",
          label: "Estado",
          sortable: true,
          class: "text-center w-130",
        },
        {
          key: "ACCIONES",
          label: "Acciones",
          class: "text-center w-130",
        },
      ],
      actions: {
        edit: {
          label: "Editar",
          icon: "fas fa-edit",
          class: "btn-edit",
          action: null,
        },
        delete: {
          label: "Eliminar",
          icon: "fas fa-trash",
          class: "btn-delete",
          action: null,
        },
        download: {
          label: "Descargar",
          icon: "fas fa-download",
          class: "btn-download",
          action: null,
          dropdown: {
            label: "Descargar",
            items: {
              "RESOLUCIÓN": {
                label: "RESOLUCIÓN",
                icon: "fas fa-file-pdf",
                action: null,
              },
              "DOC. RESUMEN": {
                label: "DOC. RESUMEN",
                icon: "fas fa-file-word",
                action: null,
              },
              "PDF. RESUMEN": {
                label: "PDF. RESUMEN",
                icon: "fas fa-file-word",
                action: null,
              }
            }
          }
        }
      },

      isLoading: false,
      // TABS
      active: "jurisprudences",
      selectedFilter: {
        name: null,
        CDESTDO: 'A',
        BLOG: null,
        FRESOLUTION: null,
        TEMA: null,
        RTITLE: null,
        FCRCN: null,
      },

      // OPENINGS MODALES
      modalEntradaComun: {
        show: false,
        data: null,
      },
      modalEditarEntradaComun: {
        show: false,
        data: null,
      },

      modalAgregarEntradaEmble: {
        show: false,
        data: null,
      },
      modalEditarEntradaEmble: {
        show: false,
        data: null,
      },

      modalAgregarEntradalegislacion: {
        show: false,
        data: null,
      },

      modalEditarEntradalegislacion: {
        show: false,
        data: null,
      },

      modalEliminar: {
        show: false,
        data: null,
      },

      // SELECTS
      selects: {
        magistrados: [],
        ambitos: [],
        jurisdiccionales: [],
        delitos: [],
        recursos: [],
        materias: [],
        jurisdicion: [],
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
    async getEntries(currentPage, perPage) {
      const init = (currentPage - 1) * perPage;
      const rows = perPage;

      this.grid.isLoading = true;
      await adminEntriesProxy.listdata({
        ROWS: rows,
        INIT: init,
        DESC: this.selectedFilter?.name || null,
        CESTDO: this.selectedFilter?.CDESTDO || null,
        BLOG: this.selectedFilter?.BLOG || null,
        FRESOLUTION: this.selectedFilter?.FRESOLUTION || null,
        TEMA: this.selectedFilter?.TEMA || null,
        RTITLE: this.selectedFilter?.RTITLE || null,
        FCRCN: this.selectedFilter?.FCRCN || null,
      }, this.active)
        .then((entries) => {
          this.data = entries
          this.grid.totalRows = entries[0]?.TOTALROWS || 0;
        })
        .catch((error) => {
          this.data = [];
          toast.error(error?.MESSAGE || 'Error al cargar las entradas', { toastId: 'error-entries' });
        })
        .finally(() => this.grid.isLoading = false);
    },
    updateActive(text) {
      this.active = text;
      this.selectedFilter = {
        name: null,
        CDESTDO: 'A',
        BLOG: null,
        FRESOLUTION: null,
        TEMA: null,
        RTITLE: null,
        FCRCN: null,
      };
      this.grid = {
        ...this.grid,
        perPage: 10,
        currentPage: 1,
        loading: false,
      };
      this.getEntries(this.grid.currentPage, this.grid.perPage);
    },
    async onClickExportar(typeFilter) {
      if (typeFilter == 3) {
        if (this.data.length == 0) {
          toast.warning('No se encontraron datos para exportar', { toastId: 'warning-export' });
          return
        }

        let paths = this.data.map((item) => {
          return {
            ENTRIEFILE: item.ENTRIEFILE,
            TITLE: item.TITLE,
            FCRCN: item.FCRCN,
            FLGDOC: item.FLGDOC,
          }
        });

        this.isLoading = true;
        await adminEntriesProxy.getDocumentZipAll({
          paths: JSON.stringify(paths),
        })
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Reporte.zip`);
            document.body.appendChild(link);
            link.click();

          })
          .catch((error) => toast.error(error?.MESSAGE || 'Error al obtener el archivo', { toastId: 'error-export' }))
          .finally(() => this.isLoading = false);
        return
      }


      if (!this.selectedFilter.RTITLE) {
        toast.warning('Debe seleccionar un filtro para exportar', { toastId: 'warning-export' });
        return;
      }

      this.isLoading = true;
      if (typeFilter == 1) {
        await adminEntriesProxy.listSearchDataFull({ RTITLE: this.selectedFilter.RTITLE, TYPE: this.active, BLOG: this.selectedFilter.BLOG })
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Reporte-${this.selectedFilter.RTITLE}-${this.active}.zip`);
            document.body.appendChild(link);
            link.click();

          })
          .catch((error) => toast.error(error?.MESSAGE || 'Error al obtener el archivo', { toastId: 'error-export' }))
          .finally(() => this.isLoading = false);
        return
      }

      await adminEntriesProxy.getDocumentZip({ RTITLE: this.selectedFilter.RTITLE, TYPE: this.active, BLOG: this.selectedFilter.BLOG })
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Reporte-${this.selectedFilter.RTITLE}-${this.active}.zip`);
          document.body.appendChild(link);
          link.click();

        })
        .catch((error) => toast.error(error?.MESSAGE || 'Error al obtener el archivo', { toastId: 'error-export' }))
        .finally(() => this.isLoading = false);

    },

    // ACTIONS ... 
    async edit(data) {
      if (data.BLOG === 'common' || data.BLOG === 'undefined') {
        this.modalEditarEntradaComun.data = await this.obtenerDatosEdit(data.ID);
        if (this.modalEditarEntradaComun.data) this.modalEditarEntradaComun.show = true;
      }

      if (data.BLOG === 'emblematic') {
        this.modalEditarEntradaEmble.data = await this.obtenerDatosEdit(data.ID);
        if (this.modalEditarEntradaEmble.data) this.modalEditarEntradaEmble.show = true;
      }

      if (data.BLOG === "executive") {
        this.modalEditarEntradalegislacion.data = await this.obtenerDatosEdit(data.ID);
        if (this.modalEditarEntradalegislacion.data) this.modalEditarEntradalegislacion.show = true;
      }
    },
    async deleteRow() {
      if (this.role.IDR == 1) return toast.warning('No tiene permisos para realizar esta acción', { toastId: 'warning-delete' });

      if (!this.modalEliminar.data.ID) return toast.warning('No se encontró el ID de la entrada');

      this.isLoading = true;
      await adminEntriesProxy.delete(this.modalEliminar.data.ID)
        .then((response) => {
          const toastMessage = response?.MESSAGE || 'Ocurrió un error al eliminar la entrada';

          if (response.STATUS) {
            toast.success('Entrada eliminada correctamente', { toastId: 'success-delete' });
            this.getEntries(this.grid.currentPage, this.grid.perPage);
            this.modalEliminar.show = false;

          } else toast.error(toastMessage, { toastId: 'error-delete' });
        })
        .catch((err) => toast.error(err?.MESSAGE || 'Error al eliminar la entrada', { toastId: 'error-delete' }))
        .finally(() => this.isLoading = false);
    },
    async downloadFile(item) {
      let tipo = 'ENTRADA PRINCIPAL';
      let path = item?.ENTRIEFILE || "";

      this.isLoading = true;
      await adminEntriesProxy.downloadFile({ PATH: path })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = url;
          const extension = path.split('.').pop();
          link.setAttribute('download', (item?.TITLE || "") + "-" + tipo + '.' + extension);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => toast.error(error?.MESSAGE || 'Error al obtener el archivo', { toastId: 'error-download' }))
        .finally(() => this.isLoading = false);
    },
    async viewEntrie(entrie, type) {
      this.isLoading = true;
      try {
        let blog = entrie.BLOG;
        let data = await this.obtenerDatos(entrie.ID);

        if (Object.keys(data).length === 0) {
          toast.warning('No se encontraron datos para la entrada', { toastId: 'warning-entrie' });
          this.isLoading = false;
          return;
        }

        if (['common', 'emblematic'].includes(blog)) {
          if (type == 1) this.generateWord(entrie, blog);
          if (type == 2) createPDFHelper.generate(data, blog);
        }

      } catch (error) {
        toast.error(error?.MESSAGE || 'Error al obtener el archivo');
      } finally {
        this.isLoading = false;
      }
    },
    async generateWord(data) {
      await adminEntriesProxy.getDocument({
        ID: data.ID
      })
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${data.TITLE.toUpperCase()} - RESUMEN EJECUTIVO.docx`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => toast.error(error?.MESSAGE || 'Error al obtener el archivo', { toastId: 'error-export' }))
        .finally(() => this.isLoading = false);
    },
    async obtenerDatos(id) {
      let data = {}
      await adminEntriesProxy.getPrint({
        ID: id
      })
        .then((response) => {
          let ambit = JSON.parse(response.AMBIT)?.[0]?.LABEL || '';
          ambit = ambit ? ambit.replace(/\s*,/g, ',') : '';
          let magistrados = JSON.parse(response.MAGISTRADOS)?.[0]?.LABEL || '';
          magistrados = magistrados ? magistrados.replace(/\s*,/g, ',') : '';
          let delitos = JSON.parse(response.DELITO)?.[0]?.LABEL || '';
          delitos = delitos ? delitos.replace(/\s*,/g, ',') : '';
          let ojurisdiccional = JSON.parse(response.OJURISDICCIONAL)?.[0]?.LABEL || '';
          ojurisdiccional = ojurisdiccional ? ojurisdiccional.replace(/\s*,/g, ',') : '';
          let recursos = JSON.parse(response.RECURSO)?.[0]?.LABEL || '';
          recursos = recursos ? recursos.replace(/\s*,/g, ',') : '';
          let materias = JSON.parse(response.MATERIA)?.[0]?.LABEL || '';
          materias = materias ? materias.replace(/\s*,/g, ',') : '';
          let jurisdiccion = JSON.parse(response.JURISDICCION)?.[0]?.LABEL || '';
          jurisdiccion = jurisdiccion ? jurisdiccion.replace(/\s*,/g, ',') : '';


          data = {
            ID: response.ID,
            TITLE: response.TITLE,
            ISBINDING: response.ISBINDING === "1" ? "SI" : "NO",
            AMBIT: ambit,
            FRESOLUTION: response.FRESOLUTION ? new Date(response.FRESOLUTION).toLocaleDateString("es-PE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }) : '',
            OJURISDICCIONAL: ojurisdiccional,
            MAGISTRATES: magistrados,
            VDESIDENTE: response.VDESIDENTE,
            CVOTE: response.CVOTE,
            ENTRIEFILE: response.ENTRIEFILE,
            ENTRIEFILERESUMEN: response.ENTRIEFILERESUMEN,
            KEYWORDS: response.KEYWORDS?.replace(/\s*,/g, ', '),
            TEMA: response.TEMA,
            SUBTEMA: response.SUBTEMA,
            SHORTSUMMARY: response.SHORTSUMMARY,
            RESUMEN: response.RESUMEN,
            NENTRIEFILERESUMEN: null,
            NENTRIEFILE: null,
            DELITO: delitos,
            RECURSO: recursos,
            MATERIA: materias,
            JURISDICCION: jurisdiccion,
            FRESOLUTIONSTRING: response.FRESOLUTIONSTRING
          }

        })
        .catch((error) => {
          data = {}
          toast.error(error?.MESSAGE || 'Error al obtener los datos', { toastId: 'error-entries' });
        });

      return data;
    },
    async obtenerDatosEdit(id) {
      try {
        this.isLoading = true;
        const response = await adminEntriesProxy.get({ ID: id });

        let ambit = !response.AMBIT ? [] : response.AMBIT.split(",").map((item) => parseInt(item)) || [];
        let ojurisdiccional = !response.OJURISDICCIONAL ? [] : response.OJURISDICCIONAL.split(",").map((item) => parseInt(item)) || [];
        let magistrados = !response.MAGISTRATES ? [] : response.MAGISTRATES.split(",").map((item) => parseInt(item)) || [];
        let delitos = !response.DELITO ? [] : response.DELITO.split(",").map((item) => parseInt(item)) || [];
        let recursos = !response.RECURSO ? [] : response.RECURSO.split(",").map((item) => parseInt(item)) || [];
        let materias = !response.MATERIA ? [] : response.MATERIA.split(",").map((item) => parseInt(item)) || [];
        let norma = !response?.TPONRMA ? [] : response?.TPONRMA?.split(",")?.map((item) => parseInt(item)) || [];
        let oemisor = !response?.OEMISOR ? [] : response?.OEMISOR?.split(",")?.map((item) => parseInt(item)) || [];
        let jurisdiccion = !response?.JURISDICCION ? [] : response?.JURISDICCION?.split(",")?.map((item) => parseInt(item)) || [];

        if (!response?.ID) {
          toast.warning('No se encontraron datos para la entrada', { toastId: 'warning-entrie' });
          return null;
        }

        let retorno = {
          ID: response.ID,
          TITLE: response.TITLE,
          RTITLE: response?.RTITLE || "",
          ISBINDING: response.ISBINDING,
          AMBIT: ambit,
          FRESOLUTION: response.FRESOLUTION,
          OJURISDICCIONAL: ojurisdiccional,
          MAGISTRATES: magistrados,
          VDESIDENTE: response?.VDESIDENTE?.split(",").filter((item) => item.trim() !== "") || [],
          CVOTE: response?.CVOTE?.split(",").filter((item) => item.trim() !== "") || [],
          KEYWORDS: response?.KEYWORDS?.split(",")?.filter((item) => item.trim() !== "") || [],
          ENTRIEFILE: response.ENTRIEFILE,
          ENTRIEFILERESUMEN: response.ENTRIEFILERESUMEN,
          TEMA: this.stripHTML(response.TEMA),
          SUBTEMA: this.stripHTML(response.SUBTEMA),
          SHORTSUMMARY: this.stripHTML(response.SHORTSUMMARY),
          RESUMEN: this.stripHTML(response.RESUMEN),
          NENTRIEFILERESUMEN: null,
          NENTRIEFILE: null,
          RESUMEN2: response.RESUMEN2,
          CASO: response.CASO,
          DELITO: delitos,
          RECURSO: recursos,
          TPONRMA: norma,
          NMRCN: response.NMRCN,
          OEMISOR: oemisor,
          MATERIA: materias,
          JURISDICCION: jurisdiccion,
        };

        return retorno;

      } catch (error) {
        toast.error(error?.MESSAGE || 'Error al obtener los datos', { toastId: 'error-entries' });
        return null;
      } finally {
        this.isLoading = false;
      }
    },
    stripHTML(html) {
      if ([undefined, null, ''].includes(html)) return '';
      html = html.replace(/\r\n/g, "\n");
      html = html.replace(/style="[^"]*"/g, "");
      html = html.replace(/>\s+</g, "><");
      return html;
    },
    // COMUN
    async getAllFilters() {
      try {
        const [magistradosResponse, filtersResponse, filtersResponse2] = await Promise.all([
          MagistradoProxy.list({ ROWS: 1000, INIT: 0, DESC: null }),
          filterProxy.list({ NIVEL: 5 }, "1"),
          filterProxy.list({ NIVEL: 5 }, "2"),
        ]);

        this.selects.magistrados = magistradosResponse.map(item => ({
          value: item.ID,
          label: (item.APELLIDOS + " " + item.NOMBRES).replace(/null/g, ""),
        }));


        if (filtersResponse && filtersResponse.length > 0) {
          const ambitos = this.configFilter(filtersResponse, "ÁMBITO");
          const jurisdiccionales = this.configFilter(filtersResponse, "ÓRGANO JURISDICCIONAL");
          const delitos = this.configFilter(filtersResponse, "DELITOS");
          const recursos = this.configFilter(filtersResponse, "TIPO DE RECURSO");
          const materias = this.configFilter(filtersResponse, "MATERIA");
          const jurisdicion = this.configFilter(filtersResponse, "JURISDICCIÓN");

          this.selects.ambitos = this.mapNivel(ambitos?.NIVEL_2);
          this.selects.jurisdiccionales = this.mapNivel(jurisdiccionales?.NIVEL_2);
          this.selects.delitos = this.mapNivel(delitos?.NIVEL_2);
          this.selects.recursos = this.mapNivel(recursos?.NIVEL_2);
          this.selects.materias = this.mapNivel(materias?.NIVEL_2);
          this.selects.jurisdicion = this.mapNivel(jurisdicion?.NIVEL_2);
        }


        if (filtersResponse2 && filtersResponse2.length > 0) {
          const norma = this.configFilter(filtersResponse2, "TIPO DE NORMA");
          this.selects.norma = this.mapNivel(norma?.NIVEL_2);

          let oemisor = this.configFilter(filtersResponse2, "ÓRGANO EMISOR");
          this.selects.oemisor = this.mapNivel(oemisor?.NIVEL_2);
        }

      } catch (error) {
        toast.error(error?.MESSAGE || 'Error al cargar los datos', { toastId: 'error-filters' });
        this.selects.magistrados = [];
      }
    },
    mapNivel(nivel) {
      return nivel?.map(item => ({
        value: item.VALUE,
        label: item.LABEL,
        children: this.mapNivel2(item.NIVEL_3),
      })) || [];
    },
    mapNivel2(nivel) {
      return nivel?.map(item => ({
        value: item.VALUE,
        label: item.LABEL,
        children: this.mapNivel3(item.NIVEL_4),
      })) || [];
    },
    mapNivel3(nivel) {
      return nivel?.map(item => ({
        value: item.VALUE,
        label: item.LABEL,
        children: this.mapNivel4(item.NIVEL_5),
      })) || [];
    },
    mapNivel4(nivel) {
      return nivel?.map(item => ({
        value: item.VALUE,
        label: item.LABEL,
        children: this.mapNivel5(item.NIVEL_6),
      })) || [];
    },
    mapNivel5(nivel) {
      return nivel?.map(item => ({
        value: item.VALUE,
        label: item.LABEL,
      })) || [];
    },

    configFilter(data, label) {
      try {
        return data.filter(item => item.LABEL.toUpperCase() === label.toUpperCase())
          .map(item => ({
            ...item,
            NIVEL_2: JSON.parse(item.NIVEL_2)
          }))[0] || {};
      } catch (error) {
        return {};
      }
    }
  },
  mounted() {
    this.getAllFilters();
    // agregar a la lista de acciones
    this.actions = {
      ...this.actions,
      edit: {
        ...this.actions.edit,
        action: (data) => this.edit(data),
      },
      delete: {
        ...this.actions.delete,
        action: (data) => {
          this.modalEliminar.show = true;
          this.modalEliminar.data = data;
        }
      },
      download: {
        ...this.actions.download,
        action: null,
        dropdown: {
          ...this.actions.download.dropdown,
          items: {
            ...this.actions.download.dropdown.items,
            "RESOLUCIÓN": {
              ...this.actions.download.dropdown.items["RESOLUCIÓN"],
              action: (data) => this.downloadFile(data),
            },
            "DOC. RESUMEN": {
              ...this.actions.download.dropdown.items["DOC. RESUMEN"],
              action: (data) => this.viewEntrie(data, 1),
            },
            "PDF. RESUMEN": {
              ...this.actions.download.dropdown.items["PDF. RESUMEN"],
              action: (data) => this.viewEntrie(data, 2),
            }
          }
        }
      }
    }

  }
};
</script>