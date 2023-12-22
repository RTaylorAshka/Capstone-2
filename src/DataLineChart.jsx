import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    Filler,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
    Filler,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ChartDataLabels
)

// Line chart for weather data
function DataLineChart({ data, mode, system }) {

    // Color setting for temp vs precipitation displays
    const colorModes = {
        'tempData': {
            borderColor: 'rgba(255, 165, 0, 0.3)',
            backgroundColor: 'rgba(255, 165, 0, 0.3)',
            color: 'rgb(255, 220, 155)',
            tension: 0
        },
        'precData': {
            borderColor: 'rgba(0, 217, 255, 0.3)',
            backgroundColor: 'rgba(0, 217, 255, 0.3)',
            color: 'rgb(128, 236, 255)',
            tension: 0.4
        },

    }

    // Max of Y axis based on units of measurement when showing temp data
    const tempMax = {
        'imperial': 150,
        'metric': 66
    }

    // Return Y axis max based on what is being viewed and what units
    const chartMax = () => {
        if (mode == 'tempData') {
            return tempMax[system]
        } else {
            return 100
        }
    }

    // Line chart configs
    let chartData = {
        labels: data.timeStamps,
        datasets: [
            {
                id: 1,
                label: '',
                data: data[mode],
                borderColor: colorModes[mode].borderColor,
                borderWidth: 2,
                tension: colorModes[mode].tension,
                pointStyle: false,
                fill: true,
                backgroundColor: colorModes[mode].backgroundColor,
                datalabels: {
                    color: colorModes[mode].color,
                    anchor: 'end',
                    align: 'end',
                    offset: 10,
                    formatter: function (value, context) {
                        return mode == 'tempData' ? `${value}°` : `${value}%`
                    }
                }
            }
        ],
    }

    let chartOptions = {
        maintainAspectRatio: false,
        scales: { y: { min: 0, max: chartMax(), display: false }, x: { grid: { display: false }, ticks: { color: 'rgb(196, 227, 255)' } } }
    }

    return (

        <div className='card-body clear'>
            <Line
                datasetIdKey='id'
                data={chartData}
                options={chartOptions}
                plugins={[ChartDataLabels]}
            />
        </div>

    )
}

export default DataLineChart