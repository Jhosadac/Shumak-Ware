<?php
require_once '../db/connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre']);
    $email = trim($_POST['email']);
    $mensaje = trim($_POST['mensaje']);

    try {
        $stmt = $pdo->prepare("
            INSERT INTO mensajes (nombre, email, mensaje)
            VALUES (:nombre, :email, :mensaje)
        ");
        
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':mensaje', $mensaje);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => '¡Mensaje enviado exitosamente!'
            ]);
        } else {
            throw new Exception('Error al enviar el mensaje');
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Hubo un error al procesar su solicitud',
            'error' => $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido'
    ]);
}

exit;
