<template>
    <div v-if="chartId !== null">
        <Doughnut
            :id="chartId"
            :options="chartOptions"
            :data="chartData"
            :plugins=" chartPlugins"
        />
    </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
    name: 'AuiDoughnutChart',
    components: { Doughnut },
    props: {
        chartId: {
            type: String,
            required: true,
            default: null
        },
        maxValue: {
            type: Number,
            required: true
        },
        currentValue: {
            type: Number,
            required: true
        }

    },
    data () {
        const color = this.getColor()
        const remainingAllowance = this.getRemainingAllowance()

        return {
            chartData: {
                datasets: [
                    {
                        label: 'Legend',
                        data: [70, 25, 15],
                        backgroundColor: [
                            'rgb(0, 128, 0)',
                            'rgb(255, 205, 86)',
                            'rgb(255, 99, 132)'
                        ],
                        circumference: 180,
                        rotation: 270.5,
                        cutout: '85%'
                    },
                    {
                        label: this.chartId,
                        data: [this.currentValue, remainingAllowance],
                        backgroundColor: [
                            color,
                            'rgb(211, 211, 211)'
                        ],
                        circumference: 180,
                        rotation: 270,
                        cutout: '60%',
                        maxValue: this.maxValue,
                        currentValue: this.currentValue
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                aspectRatio: 1.3,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    title: {
                        display: true,
                        text: this.chartId
                    }

                }
            },
            chartPlugins: [{
                id: 'gaugeChartText',
                afterDatasetsDraw (chart) {
                    const { ctx, data, chartArea: { left, right } } = chart
                    ctx.save()

                    const xCenter = chart.getDatasetMeta(1).data[1].x
                    const yCenter = chart.getDatasetMeta(1).data[1].y
                    const maxValue = data.datasets[1].maxValue
                    const currentValue = data.datasets[1].currentValue

                    ctx.font = '10px sans-serif'
                    ctx.fillStyle = '#666'

                    // Minimum text
                    ctx.textBaseLine = 'top'
                    ctx.textAlign = 'left'
                    ctx.fillText('0', left, yCenter + 10)

                    // Maximum text
                    ctx.textAlign = 'right'
                    ctx.fillText(maxValue, right, yCenter + 10)

                    // Middle text
                    ctx.font = '40px sans-serif'
                    ctx.textAlign = 'center'
                    ctx.textBaseLine = 'bottom'
                    ctx.fillText(currentValue, xCenter, yCenter)
                    ctx.save()
                }
            }]
        }
    },
    methods: {
        getColor () {
            let color = 'rgb(0, 128, 0)'
            if (this.maxValue !== 'unlimited') {
                const percentage = (this.currentValue / this.maxValue) * 100
                if (percentage > 70) {
                    color = 'rgb(255, 205, 86)'
                }
                if (percentage > 85) {
                    color = 'rgb(255, 99, 132)'
                }
            }

            return color
        },
        getRemainingAllowance () {
            if (this.maxValue === 'unlimited') {
                return this.currentValue + 100
            }

            const remainingAllowance = this.maxValue - this.currentValue
            return (this.maxValue - this.currentValue < 0) ? 0 : remainingAllowance
        }
    }
}
</script>
