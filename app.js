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
    // guardar formulario nueva mision
    const btnNuevaMision = document.querySelector("#btnNuevaMision");
    const formularioMision = document.querySelector("#FormularioMision");
    
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
                alert("¡Misión creada con éxito!");
                taskForm.reset();
            }
        });
    }
});
