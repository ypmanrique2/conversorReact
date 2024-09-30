import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Conversor() {
  const [texto, setTexto] = useState('') // Estado para guardar el input
  const [voz, setVoz] = useState('')

  function cambiarTexto(evento) {
    setTexto(evento.target.value)
  }

  function textoAVoz() {
    const configuracion = new SpeechSynthesisUtterance(texto)
    speechSynthesis.speak(configuracion)
  }

  function vozATexto() {
    const agente = new webkitSpeechRecognition()
    agente.start()
    agente.onresult = resultado
  }

  function resultado(informacion) {
    console.log(informacion.results[0][0].transcript)
    setVoz(informacion.results[0][0].transcript)
  }

    return (
      <>
        <h1>Conversor TTS y STT</h1>
        <h2>Conversor texto a voz</h2>
        <input type="text" value={texto} onChange={cambiarTexto} />
        <button onClick={textoAVoz}>Convertir</button>
        <h2>Conversor voz a texto</h2>
        <button onClick={vozATexto}>Grabar</button>
        {voz}
      </>
    )
}

export default Conversor