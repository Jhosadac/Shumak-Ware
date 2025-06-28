// En firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

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

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

// Iniciar sesión anónima al cargar la página
signInAnonymously(auth)
    .then((userCredential) => {
        console.log('Autenticación anónima exitosa');
    })
    .catch((error) => {
        console.error('Error en autenticación:', error.code, error.message);
    });

// En index.html
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
        
        if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
            throw new Error('El email no es válido');
        }

        // Esperar a que la autenticación esté lista
        const user = auth.currentUser;
        if (!user) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Espera más tiempo
        }

        const contacto = {
            nombre,
            email,
            mensaje,
            fecha: new Date().toISOString()
        };

        // Guardar en la base de datos con manejo de errores mejorado
        const referencia = ref(db, 'contactos');
        await push(referencia, contacto)
            .then(() => {
                console.log('Datos guardados exitosamente');
                alert('¡Datos guardados exitosamente!');
                e.target.reset(); // Limpiar el formulario después de guardar
            })
            .catch(error => {
                throw new Error(`Error al guardar datos: ${error.code || error.message}`);
            });
    } catch (error) {
        console.error('Error:', error.code, error.message);
        alert(`Error: ${error.message}`);
    }
});
