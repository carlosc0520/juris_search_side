<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white border-0">
        <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full max-w-full flex-grow flex-1">
                    <h6 class="uppercase text-dark mb-1 text-xs font-semibold">
                        {{ title }}
                    </h6>
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
        title: {
            type: String,
            default: "Gráfico de Área",
        },
    },
    mounted() {
        this.renderChart();
    },
    watch: {
        DATA() {
            this.$nextTick(this.renderChart);
        },
    },
    methods: {
        renderChart() {
            if (!this.DATA.length) return;

            const colores = [
                "#4c51bf", "#f3a4b5", "#f6ad55", "#f9c74f", "#90be6d",
                "#43aa8b", "#577590", "#f9f871", "#f9844a", "#f8961e",
                "#f3722c", "#f94144", "#f3722c", "#f8961e", "#f9844a",
                "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#f9f871", "#f94144"
            ];
            const meses = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];

            // Obtener años únicos
            let years = [...new Set(this.DATA.map(item => item.YEAR))];

            // Construir datasets
            const datasets = years.map((year, index) => {
                const data = this.DATA.filter(item => item.YEAR === year);
                return {
                    label: year,
                    backgroundColor: colores[index] + "55", // relleno con opacidad
                    borderColor: colores[index],
                    data: meses.map((mes, i) => {
                        const found = data.find(item => item.MES === i + 1);
                        return found ? found.VALUE : 0;
                    }),
                    fill: true,        // ✅ para área tipo triángulo
                    tension: 0,        // ✅ sin curvas, solo líneas rectas
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 6,
                };
            });

            const ctx = document.getElementById("line-chart").getContext("2d");
            if (window.myLine) window.myLine.destroy(); // limpiar gráfico previo

            window.myLine = new Chart(ctx, {
                type: "line",
                data: {
                    labels: meses,
                    datasets: datasets,
                },
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: "white",
                            },
                            position: "bottom",
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                        },
                    },
                    interaction: {
                        mode: "nearest",
                        intersect: false,
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "rgba(255,255,255,.7)",
                            },
                            grid: {
                                color: "rgba(33, 37, 41, 0.3)",
                            },
                        },
                        y: {
                            ticks: {
                                color: "rgba(255,255,255,.7)",
                            },
                            grid: {
                                color: "rgba(255, 255, 255, 0.15)",
                            },
                        },
                    },
                },
            });
        },
    },
};
</script>