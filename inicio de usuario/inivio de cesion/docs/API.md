# API de Urban Pulse

## Autenticación

### POST /api/auth/login
- Descripción: Valida credenciales con bcrypt y emite JWT.
- Body:
    {
        "email": "usuario@example.com",
        "password": "contraseña"
    }
- Respuesta exitosa:
    {
        "token": "jwt.token.value",
        "user": {
            "id": 1,
            "name": "Nombre Usuario",
            "email": "usuario@example.com"
        }
    }
- Errores comunes:
    - 400: Validación inválida
    - 401: Credenciales inválidas
    - 404: Usuario no encontrado

### POST /api/auth/register
- Descripción: Crea nuevo usuario con contraseña hasheada.
- Body:
    {
        "name": "Nombre",
        "email": "nuevo@example.com",
        "password": "contraseña"
    }
- Respuesta exitosa:
    {
        "message": "Cuenta creada con éxito..."
    }

## Usuarios

### GET /api/users/profile
- Requiere cabecera `Authorization: Bearer <token>`
- Respuesta:
    {
        "profile": {
            "id": 1,
            "name": "Nombre",
            "email": "usuario@example.com",
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    }

### GET /api/users/validate-email?email=correo@example.com
- Valida disponibilidad de email.
- Respuesta:
    { "available": true }
