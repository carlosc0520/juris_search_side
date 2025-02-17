<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            Usuarios
          </h6>
          <h2 class="text-blueGray-700 text-xl font-semibold">
            Total de Usuarios por Mes
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas id="bar-chart"
        height="350"
        ></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  props: {
    DATA: {
      type: Array,
      default: () => [],
    },
  },
  mounted: function () {

  },
  watch: {
    DATA: function () {
      this.$nextTick(function () {
        let colores = ["#4c51bf", "#f3a4b5", "#f6ad55", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#f9f871", "#f9844a", "#f8961e", "#f3722c", "#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#f9f871", "#f94144"];
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        if (this.DATA.length === 0) return 0;

        let years = this.DATA.map((item) => item.YEAR);
        years = years.filter((item, index) => years.indexOf(item) === index);
        let datasets = [];
        years.forEach((year, index) => {
          let data = this.DATA.filter((item) => item.YEAR === year);
          let dataset = {
            label: year,
            backgroundColor: colores[index],
            borderColor: colores[index],
            data: meses.map((mes) => {
              let item = data.find((item) => item.MES === meses.indexOf(mes) + 1);
              return item ? item.VALUE : 0;
            }),
            fill: false,
          };
          datasets.push(dataset);
        });

        // let labels = this.DATA.map((item) => meses[item.MES - 1]);
        let labels = meses;

        let config = {
          type: "bar",
          data: {
            labels: labels,
            datasets: datasets,
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                  },
                  ticks: {
                    beginAtZero: true,  // Empieza desde 0
                    stepSize: 1,        // Incrementos de 1 para solo enteros
                  },
                  gridLines: {
                    borderDash: [2],
                    drawBorder: false,
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.2)",
                    zeroLineColor: "rgba(33, 37, 41, 0.15)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };

        let ctx = document.getElementById("bar-chart").getContext("2d");
        new Chart(ctx, config);
      });
    },
  }
};
</script>
