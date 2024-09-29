import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //hook,
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')

  function cambiarUsuario (evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave (evento) {
    setClave(evento.target.value)
  }

  function ingresar (evento) {
    console.log("Usuario:", usuario);
    console.log("Clave:", clave);
    if (usuario === 'admin' && clave === 'admin') {
      alert('Datos correctos')
    } else {
      alert('Datos incorrectos')
    }
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
      <button type="submit"onClick={ingresar}>Ingresar</button>
    </>
  )
}

export default App
