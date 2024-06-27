// import axios from "axios";
// const axios = require("axios");


document.addEventListener("DOMContentLoaded", ()=>{

    const tablaBody = document.querySelector(".tablaBody");
    const formAlumnos = document.querySelector("#ingresarAlumno");

    const fetchGrupos = async ()=>{

        try {
            const respuesta = await axios.get(`http://localhost:3030/grupos`)
                console.log(respuesta.data);
            const grupos = respuesta.data

            tablaBody.innerHTML="";

            grupos.forEach(element => {
                
            });(grupo=>{        
                    //crear una nueva fila
                    const fila = document.createElement("tr")
                    //crear las celdas para el nombre, email, grupo y acciones.
                    const celdaNombre = document.createElement("td")
                    const celdaEmail = document.createElement("td")
                    const celdaGrupo = document.createElement("td")
                    const celdaAcciones = document.createElement("td")

                    // asignar el contenido a las celdas
                    celdaNombre.textContent = grupo.nombre
                    celdaEmail.textContent = grupo.email
                    celdaGrupo.textContent = grupo.grupo

                    // crear el boton de editar
                    const botonEditar = document.createElement("button")
                    botonEditar.textContent = "Editar"
                    botonEditar.addEventListener("click", ()=>{
                        window.location.href = `edit.html?id=${grupo.id}`/*   redirigir a la pagina de edicion con el id del post en la URL */
                    })

                                    
                    // crear boton de eliminar
                    const botonEliminar = document.createElement("button")
                    botonEliminar.textContent = "Eliminar"
                    botonEliminar.addEventListener("click", ()=>{
                        borrarAlumno(grupo.id)
                    }) // ojo con esto

                    
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
            console.error("Error para obtener lista: ",error)
        }

    }

    const borrarAlumno = async (id)=>{
        try {
            await axios.delete (`http://localhost:3030/grupos/S{id}`);
            fetchGrupos();
        } catch (error) {
            console.error("error para borrar alumno:",error)
        }
    }


    fetchGrupos();

})/*fin addEventListener */