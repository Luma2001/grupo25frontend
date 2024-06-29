// import axios from "axios";
// const axios = require("axios");

document.addEventListener("DOMContentLoaded", () => {

    const tablaBody = document.querySelector("#tabla-body");
    const formAlumnos = document.querySelector("#ingresar-alumno");

    const fetchGrupos = async () => {

        try {
            const respuesta = await axios.get(`https://leom.alwaysdata.net/alumnos`)
            console.log(respuesta.data);
            const alumnos = respuesta.data

            tablaBody.innerHTML = "";

            alumnos.forEach(alumno => {
                // crear una nueva fila
                const fila = document.createElement("tr")
                // crear las celdas para el nombre, email, grupo y acciones.
                const celdaNombre = document.createElement("td")
                const celdaEmail = document.createElement("td")
                const celdaGrupo = document.createElement("td")
                const celdaAcciones = document.createElement("td")

                // asignar el contenido a las celdas
                celdaNombre.textContent = alumno.nombre
                celdaEmail.textContent = alumno.email
                celdaGrupo.textContent = alumno.grupo

                //asignar clase a celdas
                celdaAcciones.className="celda-acciones"
                celdaGrupo.className="celda-grupo"

                // crear el boton de editar
                const botonEditar = document.createElement("button")
                botonEditar.textContent = "Editar"
                botonEditar.addEventListener("click", () => {
                    window.location.href = `edit.html?id=${alumno.id}` // redirigir a la pagina de edicion con el id del post en la URL
                })

                // crear boton de eliminar
                const botonEliminar = document.createElement("button")
                botonEliminar.textContent = "Eliminar"
                botonEliminar.addEventListener("click", () => {
                    borrarAlumno(alumno.id)
                }) // 

                // agregar los botones a la celda de acciones
                celdaAcciones.appendChild(botonEliminar)
                celdaAcciones.appendChild(botonEditar)

                // agregar las celdas a la fila
                fila.appendChild(celdaNombre)
                fila.appendChild(celdaEmail)
                fila.appendChild(celdaGrupo)
                fila.appendChild(celdaAcciones)

                //agregar la fila al cuerpo de la tabla
                tablaBody.appendChild(fila)
            })

        } catch (error) {
            console.error("Error para obtener lista: ", error)
        }
    }

    const borrarAlumno = async (id) => {
        try {
            await axios.delete(`https://leom.alwaysdata.net/alumnos/${id}`);
            fetchGrupos();
        } catch (error) {
            console.error("error para borrar alumno:", error)
        }
    }

    fetchGrupos();

}) // fin addEventListener