// En firebase.js (usando la API modular v9+)
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Manejar el envio del formulario
document.getElementById('contactform').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Validación del lado del cliente
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (!nombre || !email || !mensaje) {
            throw new Error('Todos los campos son obligatorios');
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            throw new Error('El email no es válido');
        }

        const contacto = {
            nombre,
            email,
            mensaje,
            fecha: new Date().toISOString()
        };

        // Guardar en la base de datos
        const contactosRef = ref(database, 'contactos');
        await push(contactosRef, contacto);
        
        console.log('Datos guardados exitosamente');
        alert('¡Datos guardados exitosamente!');
        e.target.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
});
