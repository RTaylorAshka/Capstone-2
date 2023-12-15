import { useEffect, useState } from 'react'
import HeaderButtons from './HeaderButtons'
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
import './App.css'
import SearchOptions from './SearchOptions'



ChartJS.register(
  Filler,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels
)


function App() {

  function updateSystem(system) {
    console.log(system ? "C" : "F")
  }


  let chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [
      {
        id: 1,
        label: '',
        data: [5, 6, 7, 5, 16, 10, 12, 8],
        borderColor: 'rgba(255, 165, 0, 0.3)',
        borderWidth: 2,
        pointStyle: false,
        fill: true,
        backgroundColor: 'rgba(255, 165, 0, 0.3)',
        datalabels: {
          color: 'rgb(255, 220, 155)',
          anchor: 'end',
          align: 'end',
          offset: 10,
          formatter: function (value, context) {
            return value + '°'
          }
        }
      }
    ],
  }

  let chartOptions = {
    maintainAspectRatio: false,
    scales: { y: { min: 0, max: 100, display: false }, x: { grid: { display: false }, ticks: { color: 'rgb(196, 227, 255)' } } }
  }



  return (
    <>



      <div className='container-fluid fill-height d-flex flex-column'>

        <HeaderButtons light={false} imperial={false} updateSystem={updateSystem} />

        <div className='row p-3 ps-5 pe-5'>
          <div className='col'>
            <span className='display-1'>00°F</span>

            <h1 className='display-6'>cloudy</h1>
          </div>
          <div className='col text-end'>

            <div className='row d-flex align-content-end'>
              <SearchOptions />
            </div>





            <div className='row d-flex align-content-end'>
              <h1 className='display-6 float-end'>Seattle, WA</h1>
              <p className='float-end'>Sunday 3:00AM</p>
            </div>






          </div>
        </div>
        <div className='row flex-fill d-flex align-content-end mb-3'>
          <div className='container-fluid m-0 p-0 h-75'>


            <div className='card clear sharp m-0 h-100'>
              <div className='card-header ms-2 clear'>
                <div className='btn-group ms-4'>
                  <button className='btn btn-light disabled'>Temprature</button>
                  <button className='btn btn-light'>Precipitation</button>
                </div>
              </div>
              <div className='card-body clear'>
                <Line
                  datasetIdKey='id'
                  data={chartData}
                  options={chartOptions}
                  plugins={[ChartDataLabels]}
                />
              </div>

            </div>

          </div>

          <div className="btn-group m-0 p-0 h-25">
            <button type="button" className="btn sharp btn-primary disabled">Day 1</button>
            <button type="button" className="btn sharp btn-primary">Day 2</button>
            <button type="button" className="btn sharp btn-primary">Day 3</button>
            <button type="button" className="btn sharp btn-primary">Day 4</button>
            <button type="button" className="btn sharp btn-primary">Day 5</button>
            <button type="button" className="btn sharp btn-primary">Day 6</button>
            <button type="button" className="btn sharp btn-primary">Day 7</button>
            <button type="button" className="btn sharp btn-primary">Day 8</button>
          </div>

        </div>
      </div >



    </>
  )
}

export default App
