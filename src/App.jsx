import { useState } from 'react';
import './App.css';
import Conversor from './Conversor';

function App() {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [nuevoUsuario, setNuevoUsuario] = useState('');
    const [nuevaClave, setNuevaClave] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [nuevoUsuarioEditar, setNuevoUsuarioEditar] = useState('');
    const [nuevaClaveEditar, setNuevaClaveEditar] = useState('');
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
            body: JSON.stringify({ usuario, clave }) // Asegúrate de que los datos son correctos
        });
    
        // Verifica si la respuesta es JSON
        try {
            const respuesta = await peticion.json();
    
            if (respuesta.logueado) {
                setLogueado(true);
            } else {
                alert('Datos incorrectos');
            }
        } catch (error) {
            console.error('Error al procesar la respuesta del servidor', error);
            alert('Error al conectar con el servidor');
        }
    }

    async function registrar() {
        try {
            const peticion = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: nuevoUsuario, clave: nuevaClave })
            });
    
            if (!peticion.ok) {
                throw new Error('Error al registrar el usuario');
            }
    
            const respuesta = await peticion.json();
            setMensajeRegistro(respuesta.message);
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error al conectar con el servidor');
        }
    }

    async function editarUsuario() {
        if (!usuarioId || !nuevoUsuarioEditar || !nuevaClaveEditar) {
            alert('Por favor, asegúrate de que todos los campos están completos.');
            return;
        }
    
        try {
            const peticion = await fetch(`http://localhost:3000/user/${usuarioId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: nuevoUsuarioEditar, clave: nuevaClaveEditar })
            });
    
            if (!peticion.ok) {
                throw new Error('Error al actualizar el usuario');
            }
    
            const respuesta = await peticion.json();
            setMensajeAccion(respuesta.message);
        } catch (error) {
            console.error('Error en la edición:', error);
            alert('Error al editar el usuario');
        }
    }

    async function eliminarUsuario() {
        if (!usuarioId) {
            alert('Por favor, ingresa un ID de usuario para eliminar.');
            return;
        }

        const peticion = await fetch(`http://localhost:3000/user/${usuarioId}`, {
            method: 'DELETE'
        });

        const respuesta = await peticion.json();
        setMensajeAccion(respuesta.message);
    }

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

                    <h1>Editar Usuario</h1>
                    <label htmlFor="usuarioId">ID del usuario a editar:
                        <input id="usuarioId" type="text" value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} />
                    </label>
                    <label htmlFor="nuevoUsuarioEditar">Nuevo Usuario:
                        <input
                            id="nuevoUsuarioEditar"
                            type="text"
                            value={nuevoUsuarioEditar}
                            onChange={(e) => setNuevoUsuarioEditar(e.target.value)}
                        />
                    </label>
                    <label htmlFor="nuevaClaveEditar">Nueva Clave:
                        <input
                            id="nuevaClaveEditar"
                            type="password"
                            value={nuevaClaveEditar}
                            onChange={(e) => setNuevaClaveEditar(e.target.value)}
                        />
                    </label>
                    <button onClick={editarUsuario}>Editar Usuario</button>

                    <h1>Eliminar Usuario</h1>
                    <label htmlFor="usuarioIdEliminar">ID del usuario a eliminar:
                        <input
                            id="usuarioIdEliminar"
                            type="text"
                            value={usuarioId}
                            onChange={(e) => setUsuarioId(e.target.value)}
                        />
                    </label>
                    <button onClick={eliminarUsuario}>Eliminar Usuario</button>

                    {mensajeAccion && <p>{mensajeAccion}</p>}
                </>
            )}
        </>
    );
}

export default App;