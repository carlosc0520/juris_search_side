<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
            Análisis de Resoluciones
          </h6>
          <h2 class="text-white text-xl font-semibold">
            Cantidades de Resoluciones por Mes
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas id="line-chart" height="350"></canvas>
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

        let labels = meses;

        var config = {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets,
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "white",
              },
              align: "end",
              position: "bottom",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white",
                  },
                  gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
      });
    },
  }
};
</script>
