import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anyos, setAnyos] = useState();
  const [id, setId] = useState();

  const [empleadosList, setEmpleados] = useState([]);

  const [editar, setEditar] = useState(false);

  const add = () => {
    axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anyos: anyos
    }).then(() => {
      getEmpleados();
      alert("Empleado registrado");
      limpiarCampos();
    })
  }

  // const add = async () => {
  //   const res = await fetch("http://localhost:3001/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       nombre: nombre,
  //       edad: edad,
  //       pais: pais,
  //       cargo: cargo,
  //       anyos: anyos
  //     })
  //   });
  //   const respuesta = await res.json();
  //   console.log(respuesta);
  // }

  const getEmpleados = () => {
    axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    })
  }

  useEffect(() => {
    getEmpleados();
  }, []);

  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnyos(val.anyos);
    setId(val.id);
  }

  const update = () => {
    axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anyos: anyos
    }).then(() => {
      getEmpleados();
      limpiarCampos();
    })
  }

  const limpiarCampos = () => {
    setId("");
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnyos("");
    setEditar(false);
  }

  return (
    <div className = "container">
      <div className = "card text-center">
        <div className = "card-header">
          Gestion de Usuarios
        </div>

        <div className = "card-body">
          <div className = "input-group mb-3">
            <span className = "input-group-text" id="basic-addon1">Nombre:</span>
            <input type = "text" 
              onChange = {(event) => {
                setNombre(event.target.value);
              }}
              className = "form-control" value = {nombre} placeholder = "Nombre" aria-label = "Nombre" aria-describedby = "basic-addon1" control-id = "ControlID-1"/>
          </div>

          <div className = "input-group mb-3">
            <span className = "input-group-text" id="basic-addon2">Edad:</span>
            <input type = "number" 
              onChange = {(event) => {
                setEdad(event.target.value);
              }}
              className = "form-control" value = {edad} placeholder = "Edad" aria-label = "Edad" aria-describedby = "basic-addon2" control-id = "ControlID-2"/>
          </div>

          <div className = "input-group mb-3">
            <span className = "input-group-text" id="basic-addon3">Pais:</span>
            <input type = "text" 
              onChange = {(event) => {
                setPais(event.target.value);
              }}
              className = "form-control" value = {pais} placeholder = "Pais" aria-label = "Pais" aria-describedby = "basic-addon3" control-id = "ControlID-3"/>
          </div>

          <div className = "input-group mb-3">
            <span className = "input-group-text" id="basic-addon4">Cargo:</span>
            <input type = "text" 
              onChange = {(event) => {
                setCargo(event.target.value);
              }}
              className = "form-control" value = {cargo} placeholder = "Cargo" aria-label = "Cargo" aria-describedby = "basic-addon4" control-id = "ControlID-4"/>
          </div>

          <div className = "input-group mb-3">
            <span className = "input-group-text" id="basic-addon5">Anyos:</span>
            <input type = "number" 
              onChange = {(event) => {
                setAnyos(event.target.value);
              }}
              className = "form-control" value = {anyos} placeholder = "Anyos" aria-label = "Anyos" aria-describedby = "basic-addon5" control-id = "ControlID-5"/>
          </div>
        </div>
          
        <div className = "card-footer text-body-secondary">
          {
            editar == true?
            <div>
              <button className = 'btn btn-warning m-2' onClick = {update}>Actualizar</button>
              <button className = 'btn btn-info m-2' onClick = {limpiarCampos}>Cancelar</button>
            </div>
            :<button className = 'btn btn-success' onClick = {add}>Registrar</button>
          }
        </div>
      </div>

      <table className = "table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Anyos</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {
            empleadosList.map((val, key) => {
              return <tr key = {val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anyos}</td>
                  <td>
                    <div className = "btn-group" role = "group" aria-label = "Basic example">
                      <button type = "button"
                        onClick = { () => {
                          editarEmpleado(val);
                        }}
                        className = "btn btn-info">Editar</button>
                      <button type = "button" className = "btn btn-danger">Eliminar</button>
                    </div>
                  </td>
                </tr>
            })
          }

          
        </tbody>
      </table>
    </div>
  );
}

export default App;