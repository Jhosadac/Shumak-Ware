// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyApq_K7pJmtrLNZcewzxaVXWnVf4Sxynv4",
    authDomain: "shumak-ware.firebaseapp.com",
    databaseURL: "https://shumak-ware-default-rtdb.firebaseio.com",
    projectId: "shumak-ware",
    storageBucket: "shumak-ware.firebasestorage.app",
    messagingSenderId: "64196160181",
    appId: "1:64196160181:web:76852cef50c12a498e6cfc",
    measurementId: "G-8L85H7B12E"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
const database = firebase.database();
const contactFormDB = database.ref("contactForm");

// Manejar el envio del formulario
document.getElementById('contactForm').addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  
  try {
    // Obtener valores
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    if (!nombre || !email || !mensaje) {
        throw new Error('Todos los campos son obligatorios');
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        throw new Error('El email no es válido');
    }

    saveData(nombre, email, mensaje);

    // Resetear formulario
    e.target.reset();
    
  } catch (error) {
    console.error('Error:', error);
    alert(`Error: ${error.message}`);
  }
}

// Función para guardar datos
function saveData(nombre, email, mensaje) {
  // Crear nueva referencia con ID único
  const newContactRef = contactFormDB.push();
  
  newContactRef.set({
    nombre: nombre,
    correo: email,
    mensaje: mensaje,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  })
  .then(() => {
    console.log("Datos guardados correctamente");
    alert("¡Mensaje enviado con éxito!");
  })
  .catch((error) => {
    console.error("Error al guardar:", error);
    alert("Error al enviar el mensaje: " + error.message);
  });
}
