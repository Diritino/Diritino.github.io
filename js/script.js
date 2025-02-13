const images = ["T.png", "E.png", "A.png", "M.png", "O.png"]; // Imágenes para los botones
const coronaImages = ["corona1.png", "corona2.png", "corona3.png", "corona4.png", "corona5.png"]; // Imágenes para la página corona

// Esta función se ejecuta cuando se hace clic en los botones en index.html
function revealImage(index) {
    // Guardar el índice de la imagen seleccionada en el localStorage
    localStorage.setItem("selectedImageIndex", index);
    localStorage.setItem(`revealed${index}`, true); // Marcar la imagen como revelada

    // Ocultar el botón y mostrar la imagen correspondiente
    const button = document.getElementById(`btn${index}`);
    const image = document.createElement("img");
    image.src = `imgs/${images[index]}`;
    image.classList.add("revealed");
    image.onclick = () => goToCoronaPage(index);

    // Ajustar el tamaño de la imagen para que sea proporcional a la pantalla
    image.style.width = "100%";
    image.style.height = "auto";

    // Ocultar el botón y agregar la imagen dentro del mismo contenedor
    button.style.display = "none"; // Ocultar el botón
    button.parentNode.appendChild(image); // Agregar la imagen al mismo contenedor

    // Redirigir a la página corona.html para mostrar la imagen de la carpeta 'img'
    window.location.href = "html/corona.html"; // Redirigir a la página corona.html
}

// Función para cargar la imagen de la carpeta 'img' en corona.html
window.onload = function () {
    const selectedIndex = localStorage.getItem("selectedImageIndex");

    if (selectedIndex !== null) {
        // Cargar la imagen correspondiente de la carpeta 'img'
        const coronaImage = document.getElementById("coronaImage");
        coronaImage.src = `../img/${coronaImages[selectedIndex]}`;
        
        // Ajustar el tamaño de la imagen de la corona para que sea proporcional a la pantalla
        coronaImage.style.width = "100%";
        coronaImage.style.height = "auto";
    }

    checkCompletion();
};

// Función para regresar a index.html y cargar la imagen de la carpeta 'imgs'
function goBack() {
    const selectedIndex = localStorage.getItem("selectedImageIndex");

    if (selectedIndex !== null) {
        // Cargar la imagen correspondiente desde la carpeta 'imgs' en index.html
        const button = document.getElementById(`btn${selectedIndex}`);
        const image = button.parentNode.querySelector("img");
        if (image) {
            image.src = `imgs/${images[selectedIndex]}`;
        }
    }

    window.location.href = "../index.html"; // Regresar a index.html
}

// Función para ir a la página final
function goToFinal() {
    window.location.href = "html/final.html"; // Redirigir a la página final
}

// Función para reiniciar el juego
function resetGame() {
    // Limpiar el localStorage para reiniciar el juego
    localStorage.clear();

    // Restaurar los botones de interrogación en index.html
    const buttons = document.querySelectorAll(".question");
    buttons.forEach((button, index) => {
        button.style.display = "flex"; // Mostrar el botón
        const image = button.parentNode.querySelector("img");
        if (image) {
            image.remove(); // Eliminar la imagen si existe
        }
    });

    // Ocultar el botón "Ir a la página final" nuevamente
    document.getElementById("nextPage").classList.add("hidden");
}

// Cargar las imágenes previamente seleccionadas en index.html
window.onload = function () {
    // Reemplazar los botones de interrogación por las imágenes guardadas en el localStorage
    for (let i = 0; i < images.length; i++) {
        if (localStorage.getItem(`revealed${i}`) === "true") {
            const button = document.getElementById(`btn${i}`);
            const image = document.createElement("img");
            image.src = `imgs/${images[i]}`;
            image.classList.add("revealed");
            image.onclick = () => goToCoronaPage(i);

            // Ajustar el tamaño de la imagen dependiendo de la fila
            if (i === 0 || i === 1) {
                // Imágenes de la primera fila (más grandes)
                image.style.width = "45vw";  // Tamaño más grande para las imágenes de la fila 1
                image.style.height = "auto"; // Ajuste proporcional
            } else {
                // Imágenes de la segunda fila (más pequeñas pero homogéneas)
                image.style.width = "30.80vw";  // Tamaño más pequeño para las imágenes de la fila 2
                image.style.height = "28vw"; // Ajuste proporcional
            }

            // Ocultar el botón y agregar la imagen dentro del mismo contenedor
            button.style.display = "none"; // Ocultar el botón
            button.parentNode.appendChild(image); // Agregar la imagen al mismo contenedor
        }
    }

    checkCompletion();
};
function checkCompletion() {
    // Comprobar si todas las imágenes han sido reveladas
    const revealedCount = images.filter((_, i) => localStorage.getItem(`revealed${i}`) === "true").length;
    if (revealedCount === images.length) {
        document.getElementById("nextPage").classList.remove("hidden");
    }
}

// Función para ir a la página corona.html desde una imagen revelada
function goToCoronaPage(index) {
    localStorage.setItem("selectedImageIndex", index);
    window.location.href = "../html/corona.html";
}
