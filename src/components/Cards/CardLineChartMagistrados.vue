<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
              {{ TITLE }}
            </h6>
            <h2 class="text-white text-xl font-semibold">
              {{ SUBTITLE }}  
            </h2>
          </div>
        </div>
      </div>
      <div class="p-4 flex-auto">
        <div class="relative h-350-px">
          <canvas id="bar-chart" height="350"></canvas>
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
      TITLE: {
        type: String,
        default: "",
      },
      SUBTITLE: {
        type: String,
        default: "",
      },
    },
    watch: {
      DATA: {
        handler: "createChart",
        immediate: true,
      },
    },
    methods: {
      createChart() {
        this.$nextTick(() => {
          const ctx = document.getElementById("bar-chart").getContext("2d");
          const colors = [
            "#4c51bf", "#f3a4b5", "#f6ad55", "#f9c74f", "#90be6d",
            "#43aa8b", "#577590", "#f9f871", "#f9844a", "#f8961e",
            "#f3722c", "#f94144", "#f3722c", "#f8961e", "#f9844a",
            "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#f9f871",
            "#f94144",
          ];
  
          const labels = this.DATA.map((item) => item.LABEL);
          const values = this.DATA.map((item) => item.VALUE);
  
          const config = {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Repeticiones",
                  data: values,
                  backgroundColor: colors.slice(0, values.length),
                  borderColor: colors.slice(0, values.length),
                  borderWidth: 1,
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              legend: {
                display: false,
              },
              tooltips: {
                mode: "index",
                intersect: false,
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      fontColor: "rgba(255,255,255,.7)",
                    },
                    gridLines: {
                      display: false,
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontColor: "rgba(255,255,255,.7)",
                      beginAtZero: true,
                    },
                    gridLines: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                ],
              },
            },
          };
  
          // Destruir gráfico existente si ya existe
          if (window.myBar) {
            window.myBar.destroy();
          }
  
          window.myBar = new Chart(ctx, config);
        });
      },
    },
  };
  </script>
  