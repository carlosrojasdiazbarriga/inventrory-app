import React, { useState , useEffect} from 'react'
import {QrReader} from "react-qr-reader";


export const QrLector = (props) => {

  
  const [selected, setSelected] = useState("environment");
  const [data, setData] = useState('No result');

  props.func(data);//enviar la data del qr

  useEffect(() => {
    localStorage.setItem('scan', JSON.stringify(data))
}, [data]);

  const previewStyle = {
    height: 'auto',
    width:'60%',
    display: "flex",
    justifycontent: "center",
    marginLeft:'25%'
  };

  return (
    <div className="App card-body ">
      <h3>Escaneá el codigo QR</h3>
      <h4>Apuntá con la camara al codigo, se detectará automáticamente</h4>
      <select 
        onChange={(e) => setSelected(e.target.value)}
        className="form-select"
        >
        <option value={"environment"}>Cámara trasera</option>
        <option value={"user"}>Cámara delantera</option>
      </select>
        <QrReader
        facingMode={selected}
        containerStyle = {previewStyle}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
          
          if (!!error) {
            // console.info(error);
          }
        }}
        />
        <p>{data}</p>

    </div>
  );
}
