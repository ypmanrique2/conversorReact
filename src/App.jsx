import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Conversor from './Conversor'

function App() {
  const [usuario, setUsuario] = useState('') // Estado para guardar el usuario
  const [clave, setClave] = useState('') // Estado para guardar la clave
  const [logueado, setLogueado] = useState(false) // Estado para saber si el usuario está logueado

  function cambiarUsuario(evento) { // Funcion para cambiar el valor del usuario
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) { // Funcion para cambiar el valor de la clave
    setClave(evento.target.value)
  }

  function ingresar() { // Funcion para ingresar al dar clicl en el boton
    console.log("Usuario:", usuario);
    console.log("Clave:", clave);
    if (usuario === 'admin' && clave === 'admin') { // Si el usuario y la clave son admin
      alert('Datos correctos')
      setLogueado(true)
    } else { // Si el usuario y la clave no son admin
      alert('Datos incorrectos')
    }
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