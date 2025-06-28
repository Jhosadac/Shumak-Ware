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

// Solo inicializar una vez
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Exportar para usar en otros archivos
export { app, db };
