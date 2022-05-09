
import React, { useEffect,useState} from 'react'
import Papa from "papaparse";

const init = ()=> {
    return JSON.parse(localStorage.getItem('data'))
    || [];
}
const init_fields = ()=> {
    return JSON.parse(localStorage.getItem('fields'))
    || [];
}



export const InputCSV = ({scandata}) => {

    const [dataCVS, setDataCVS] = useState(init);
    const [fieldsCVS, setFieldsCVS] = useState(init_fields);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(dataCVS))
        localStorage.setItem('fields', JSON.stringify(fieldsCVS))
    }, [dataCVS, fieldsCVS]);


    
    useEffect(() => {
        console.log(scandata);
        handleChange(scandata);
    },[scandata])


    const handleCSVFile = (file) => {

        Papa.parse(file, {
            header:true,
            skipEmptyLines:true,

            complete: (csvdata)=>{
                setDataCVS(csvdata.data);
                setFieldsCVS(csvdata.meta.fields);
            }
        });

    }

    const handleChange = (scandata) => {
    //    const result =dataCVS.filter(scan=> scan.boleto === scandata);
       const result =dataCVS.map(scan =>
        (scan.Serie=== scandata)
            ? {...scan,Entregado:'yes'}
            : scan
        );
       setDataCVS(result);
    }

    

  return (
    <div className='card-body'>
        <h3>Ingresar el inventario</h3>
        <input
        type="file"
        className='form-control'
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files[0];
          console.log(files);
          if (files) {
                handleCSVFile(files);
            }
        }}
      />

      
        <table className="table table-hover">
            <thead>
                <tr>
                    {fieldsCVS.map((field,index) =>{
                        return (<th scope="col" key={index}>{field}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                    {dataCVS.map((data,index) =>{
                        return (
                    <tr key={index}>
                        <th scope="row" className="text-start">{index+1}. {data.Producto}</th>
                        <td>{data.Serie}</td>
                        <td>{data.Entregado}</td>
                    </tr>
                        )
                    })}

            </tbody>
        </table>
      


    </div>

  )
}
