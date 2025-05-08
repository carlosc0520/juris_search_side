<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <h3 class="font-semibold text-base text-blueGray-700">
          {{ TITLE }}
        </h3>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse table-auto scrollable-table">
        <thead>
          <tr>
            <th
              class="px-6 bg-blueGray-50 text-dark align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Palabra
            </th>
            <th
              class="px-6 bg-blueGray-50 text-dark align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Cantidad
            </th>
            <th
              class="px-6 bg-blueGray-50 text-dark align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Ultima vez
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
              {{ item.LABEL }}
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-center text-xs whitespace-nowrap p-4">
              {{ item.VALUE }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ formatoFecha(item.FECHA) }}
            </td>
          </tr>

        </tbody>
      </table>
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

<style></style>