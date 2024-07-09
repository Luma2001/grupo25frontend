document.addEventListener("DOMContentLoaded",()=>{
    //obtenemos formulario de edición
        const formulario = document.getElementById("editar-alumno");

    //obtenemos los parámetros de la URL. Acá le indicamos dónde está ese parámetro
        const parametrosURL = new URLSearchParams(window.location.search)
    
    //obtenemos el ID del alumno que queremos editar
        const idAlumno = parametrosURL.get("id")

    //obtenemos los DATOS del alumno por su ID
        const fetchAlumno = async (id) =>{
            try {
                const respuesta = await axios.get(`https://leom.alwaysdata.net/alumnos/${id}`);
                const alumno = respuesta.data;
                console.log(alumno);            
                //Asignamos los valores obtenidos a los inputs del formulario
                    document.getElementById("nombre-nuevo").value = alumno.nombre;
                    document.getElementById("email-nuevo").value =  alumno.email;
                    document.getElementById("grupo-nuevo").value = alumno.grupo;
            } catch (error) {
                console.error("error para cargar alumno:", error)
            }
        }/*fin fetchAlumno */

    //Llamamos a la función fetchAlumno para obtener los datos del alumno que queremos editar
        if(idAlumno){fetchAlumno(idAlumno)}    

    //LLamo a formulario para controlar el evento submit
        formulario.addEventListener("submit",async(e)=>{
            e.preventDefault();
            const datosActualizados ={
                nombre: document.getElementById("nombre-nuevo").value,
                email: document.getElementById("email-nuevo").value,
                grupo: document.getElementById("grupo-nuevo").value
            }
            console.log(datosActualizados);
            try {
                await axios.put(`https://leom.alwaysdata.net/alumnos/${idAlumno}`,datosActualizados)
                alert("Datos actualizados correctamente");
                window.location.href = `index.html?#tabla-grupos`
            } catch (error) {
                console.error("error para actualizar datos de alumno:", error)
            }
        })    


})

