import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Conversor from './Conversor'

function App() {
  // Estado para guardar el usuario
  const [usuario, setUsuario] = useState('') 
  // Estado para guardar la clave
  const [clave, setClave] = useState('') 
  // Estado para saber si el usuario está logueado
  const [logueado, setLogueado] = useState(false) 
  // Funcion para cambiar el valor del usuario
  function cambiarUsuario(evento) { 
    setUsuario(evento.target.value)
  }
  // Funcion para cambiar el valor de la clave
  function cambiarClave(evento) { 
    setClave(evento.target.value)
  }

  // Funcion para ingresar al dar clicl en el boton
  async function ingresar() { 
    console.log("Usuario:", usuario);
    console.log("Clave:", clave);
    const peticion = await fetch('http://localhost:3000/login?usuario='+ usuario +'&clave=' + clave)
    const Response = await peticion.json()
    console.log(Response.logueado,'Response')
    
    if (Response.logueado) {
      setLogueado(true)
    } else {
      alert('Datos incorrectos')
    }
    /*}
    if (usuario === 'admin' && clave === 'admin') { // Si el usuario y la clave son admin
      alert('Datos correctos')
      setLogueado(true)
    } else { // Si el usuario y la clave no son admin
      alert('Datos incorrectos')
    } */
  }

  if (logueado) {
    return (<Conversor />)
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <label htmlFor="usuario">Usuario:
        <input id="usuario" type="text" value={usuario} onChange={cambiarUsuario} />
      </label>
      <label htmlFor="clave">Clave:
        <input id="clave" type="password" value={clave} onChange={cambiarClave} />
      </label>
      <button type="submit" onClick={ingresar}>Ingresar</button>
    </>
  )
}

export default App