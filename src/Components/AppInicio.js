import React, {useState} from 'react'
import '../index.css'
import { InputCSV } from './InputCSV'
import { QrLector } from './QrLector'

export const AppInicio = () => {

    // const scandata = localStorage.getItem('scan'); 
    const [scanData, setScanData] = useState()

    const pull_data = (data) => {
       setScanData(data);
    }

  return (
    <div className="card">
        <div className="card-header text-center">


            <h1>Administrador Inventario</h1>
            <hr/>
            <div className="row g-0 ">

                <div className="col-xs-8  col-md-6 col-lg-7">
                    <InputCSV scandata={scanData}/>
                </div>
                <div className="col-xs-8 col-md-5 col-lg-5">
                    <QrLector func={pull_data}/>
                </div>
            </div>
        </div>
    </div>
  )
}
