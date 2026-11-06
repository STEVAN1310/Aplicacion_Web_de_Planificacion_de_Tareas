function validFormFieldInput(data) {
    if (!data.name || !data.description || !data.date || !data.status) {
        return false; 
    }
    return true; 
}

// Capturar el envío del formulario
document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.querySelector("#taskForm");
    const alertError = document.querySelector("#alertError");
    const contenedorMisiones = document.querySelector("#contenedorMisiones");
    // guardar formulario nueva mision
    const btnNuevaMision = document.querySelector("#btnNuevaMision");
    const formularioMision = document.querySelector("#FormularioMision");
    let misionesGuardadas = JSON.parse(localStorage.getItem("misiones")) || [];

    function crearMision(data){
        const mision = document.createElement("div");
        mision.classList.add("mision-item");
        
        // crear la casilla de verificacion
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input", "m-2");
        
        // nombre de la mision
        const nombre = document.createElement("span");
        nombre.textContent = data.name;
        const estado = document.createElement("span");
        estado.textContent = data.status;
        estado.classList.add("badge", "bg-info", "ms-2");

        // crear descripcion
        const descripcion = document.createElement("p");
        descripcion.textContent = data.description

        // crear fecha
        const fecha = document.createElement("small");
        fecha.textContent = "Fecha de entrega: " + data.date;

        // Agregar elementos a la mision
        mision.append(checkbox, nombre, estado, descripcion, fecha);

        // Agregar la mision al contenedor
        contenedorMisiones.appendChild(mision);

// Si la misión ya está completada, cambiar el color
         if (data.status === "Completada"){
            estado.classList.replace("bg-info", "bg-success");
        }

// Detectar cuando se marca o desmarca la casilla
        checkbox.checked = data.status === "Completada";

         checkbox.addEventListener("change", () =>{
            if(checkbox.checked){
                estado.textContent = "Completada";
                estado.classList.remove("bg-info");
                estado.classList.add("bg-success");
            }else {
                estado.textContent = "Pendiente";
                estado.classList.remove("bg-success");
                estado.classList.add("bg-info");
            }
        
        data.status = checkbox.checked ? "Completada" : "Pendiente";
        localStorage.setItem("misiones", JSON.stringify(misionesGuardadas));
        });
    }

    // Recuperar las misiones guardadas
    misionesGuardadas.forEach((mision) => {
    crearMision(mision);
});

    btnNuevaMision.addEventListener("click", () => {
        formularioMision.classList.toggle("d-none");
    })

    if (taskForm) {
        taskForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Obtener los valores usando los id del HTML
            const name = document.querySelector("#newTaskNameInput").value.trim();
            const description = document.querySelector("#newTaskDescriptionInput").value.trim();
            const date = document.querySelector("#newTaskDateInput").value;
            const status = document.querySelector("#newTaskStatusInput").value;

            // Comprobar datos en consola
            console.log("name: " + name);
            console.log("description: " + description);
            console.log("date: " + date);
            console.log("status: " + status);

            // Crear objeto de datos para la función
            const formData = { name, description, date, status };

            // Validar usando la función requerida
            const isValid = validFormFieldInput(formData);

            if (!isValid) {
                // Mostrar alerta si hay errores
                alertError.classList.remove("d-none");
            } else {
                // Ocultar alerta si todo es válido
                alertError.classList.add("d-none");
                misionesGuardadas.push(formData);
                localStorage.setItem("misiones", JSON.stringify(misionesGuardadas));

                // llama la funcion crearMision
                crearMision(formData);
           
                alert("¡Misión creada con éxito!");
                taskForm.reset();

            }
        });
    }
});
