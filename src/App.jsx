import { useState } from 'react';
import './App.css';
import Conversor from './Conversor';
//GA7-220501096-AA5-EV02
function App() {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [nuevoUsuario, setNuevoUsuario] = useState('');
    const [nuevaClave, setNuevaClave] = useState('');
  //const [usuarioId, setUsuarioId] = useState(''); //
    const [mensajeRegistro, setMensajeRegistro] = useState('');
    const [mensajeAccion, setMensajeAccion] = useState('');
    const [logueado, setLogueado] = useState(false);

    function cambiarUsuario(evento) {
        setUsuario(evento.target.value);
    }

    function cambiarClave(evento) {
        setClave(evento.target.value);
    }

    async function ingresar() {
        const peticion = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, clave })
        });
        const respuesta = await peticion.json();

        if (respuesta.logueado) {
            setLogueado(true);
        } else {
            alert('Datos incorrectos');
        }
    }

    async function registrar() {
        const peticion = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: nuevoUsuario, clave: nuevaClave })
        });

        const respuesta = await peticion.text();
        setMensajeRegistro(respuesta);
    }

/*     async function editarUsuario() {
        const peticion = await fetch(`http://localhost:3000/user/${usuarioId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: nuevoUsuario, clave: nuevaClave })
        });

        const respuesta = await peticion.text();
        setMensajeAccion(respuesta);
    }

    async function eliminarUsuario() {
        const peticion = await fetch(`http://localhost:3000/user/${usuarioId}`, {
            method: 'DELETE'
        });

        const respuesta = await peticion.text();
        setMensajeAccion(respuesta);
    } */

    return (
        <>
            {logueado ? (
                <Conversor />
            ) : (
                <>
                    <h1>Inicio de sesión</h1>
                    <label htmlFor="usuario">Usuario:
                        <input id="usuario" type="text" value={usuario} onChange={cambiarUsuario} />
                    </label>
                    <label htmlFor="clave">Clave:
                        <input id="clave" type="password" value={clave} onChange={cambiarClave} />
                    </label>
                    <button type="submit" onClick={ingresar}>Ingresar</button>

                    <h1>Registro</h1>
                    <label htmlFor="nuevoUsuario">Usuario:
                        <input id="nuevoUsuario" type="text" value={nuevoUsuario} onChange={(e) => setNuevoUsuario(e.target.value)} />
                    </label>
                    <label htmlFor="nuevaClave">Clave:
                        <input id="nuevaClave" type="password" value={nuevaClave} onChange={(e) => setNuevaClave(e.target.value)} />
                    </label>
                    <button type="submit" onClick={registrar}>Registrar</button>
                    {mensajeRegistro && <p>{mensajeRegistro}</p>}

{/*                     <h1>Editar Usuario</h1>
                    <label htmlFor="usuarioId">ID del usuario a editar:
                        <input id="usuarioId" type="text" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} />
                    </label>
                    <button onClick={editarUsuario}>Editar Usuario</button>

                    <h1>Eliminar Usuario</h1>
                    <label htmlFor="usuarioIdEliminar">ID del usuario a eliminar:
                        <input id="usuarioIdEliminar" type="text" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} />
                    </label>
                    <button onClick={eliminarUsuario}>Eliminar Usuario</button> */}

                    {mensajeAccion && <p>{mensajeAccion}</p>}
                </>
            )}
        </>
    );
}

export default App;