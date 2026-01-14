<template>
    <div class="chart-card">
        <div class="chart-header">
            <div class="chart-title-wrapper">
                <div class="chart-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                </div>
                <h3 class="chart-title">{{ title }}</h3>
            </div>
        </div>
        <div class="chart-body">
            <div class="chart-canvas-wrapper">
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
                { border: "#DF2DB2", bg: "rgba(223, 45, 178, 0.15)" },
                { border: "#8B5CF6", bg: "rgba(139, 92, 246, 0.15)" },
                { border: "#185CE6", bg: "rgba(24, 92, 230, 0.15)" },
                { border: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
                { border: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
                { border: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
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
                const colorIndex = index % colores.length;
                return {
                    label: year,
                    backgroundColor: colores[colorIndex].bg,
                    borderColor: colores[colorIndex].border,
                    data: meses.map((mes, i) => {
                        const found = data.find(item => item.MES === i + 1);
                        return found ? found.VALUE : 0;
                    }),
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointHoverRadius: 7,
                    pointBackgroundColor: colores[colorIndex].border,
                    pointBorderColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: colores[colorIndex].border,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 3,
                };
            });

            const ctx = document.getElementById("line-chart").getContext("2d");
            if (window.myLine) window.myLine.destroy();

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
                            display: true,
                            position: "top",
                            align: "end",
                            labels: {
                                color: "#64748b",
                                font: {
                                    family: "Lato, sans-serif",
                                    size: 13,
                                    weight: 600,
                                },
                                padding: 15,
                                boxWidth: 12,
                                boxHeight: 12,
                                usePointStyle: true,
                                pointStyle: "circle",
                            },
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            titleColor: "#1e293b",
                            bodyColor: "#64748b",
                            borderColor: "#e2e8f0",
                            borderWidth: 1,
                            padding: 12,
                            boxPadding: 6,
                            usePointStyle: true,
                            titleFont: {
                                family: "Lato, sans-serif",
                                size: 14,
                                weight: 600,
                            },
                            bodyFont: {
                                family: "Lato, sans-serif",
                                size: 13,
                            },
                        },
                    },
                    interaction: {
                        mode: "nearest",
                        intersect: false,
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "#94a3b8",
                                font: {
                                    family: "Lato, sans-serif",
                                    size: 12,
                                    weight: 500,
                                },
                                padding: 8,
                            },
                            grid: {
                                display: false,
                            },
                            border: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: "#94a3b8",
                                font: {
                                    family: "Lato, sans-serif",
                                    size: 12,
                                    weight: 500,
                                },
                                padding: 8,
                            },
                            grid: {
                                color: "rgba(226, 232, 240, 0.5)",
                                drawBorder: false,
                            },
                            border: {
                                display: false,
                            },
                        },
                    },
                },
            });
        },
    },
};
</script>

<style scoped>
.chart-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    overflow: hidden;
}

.chart-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    border-bottom: 1px solid #f1f5f9;
}

.chart-title-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
}

.chart-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #DF2DB2 0%, #8B5CF6 50%, #185CE6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.chart-icon svg {
    width: 22px;
    height: 22px;
    color: white;
}

.chart-title {
    font-family: Lato, sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.chart-body {
    padding: 1.5rem;
}

.chart-canvas-wrapper {
    position: relative;
    height: 350px;
}

@media (max-width: 768px) {
    .chart-header {
        padding: 1.25rem 1.25rem 0.75rem 1.25rem;
    }

    .chart-title {
        font-size: 16px;
    }

    .chart-body {
        padding: 1.25rem;
    }

    .chart-canvas-wrapper {
        height: 300px;
    }
}
</style>