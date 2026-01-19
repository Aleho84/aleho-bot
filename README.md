# 🤖 Aleho Bot

[![Status](https://img.shields.io/badge/status-active-success.svg?style=plastic)](https://github.com/Aleho84/aleho-bot)
[![GitHub Version](https://img.shields.io/github/package-json/v/aleho84/aleho-bot?style=plastic)](https://github.com/Aleho84/aleho-bot)
[![GitHub Issues](https://img.shields.io/github/issues/aleho84/aleho-bot?style=plastic)](https://github.com/Aleho84/aleho-bot/issues)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/aleho84/aleho-bot?style=plastic)](https://github.com/Aleho84/aleho-bot/commits/main/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)](/LICENSE)

## Descripción General del Proyecto

Aleho Bot es un bot multifuncional diseñado para operar en plataformas de mensajería como Telegram y Discord. Su objetivo principal es proporcionar a los usuarios una variedad de herramientas y funcionalidades que simplifican tareas cotidianas y ofrecen información útil de manera rápida y eficiente. El proyecto está en constante evolución, buscando expandir sus capacidades y mejorar la experiencia del usuario.

## 🚀 Características Principales

*   **Consultas de Cotizaciones**: Obtén información actualizada sobre el valor de diversas criptomonedas (BTC, ETH) y divisas (Dólar, Euro).
*   **Generador de Contraseñas**: Crea contraseñas seguras y aleatorias para proteger tus cuentas.
*   **Juegos Gratuitos**: Mantente informado sobre los últimos juegos gratuitos disponibles en diferentes plataformas.
*   **Estado del Servidor**: Verifica el estado de servidores específicos.
*   **Interfaz de Administración Web**: Gestiona usuarios y revisa logs a través de una interfaz web intuitiva.

## 🛠️ Tecnologías Utilizadas

El proyecto Aleho Bot está construido sobre un stack tecnológico robusto y moderno:

*   **Lenguaje de Programación**: JavaScript
*   **Entorno de Ejecución**: Node.js
*   **Base de Datos**: MongoDB (con Mongoose para la modelación de datos)
*   **Framework Web**: Express.js
*   **Motor de Plantillas**: EJS (Embedded JavaScript)
*   **Integraciones**: Librerías específicas para la API de Telegram y Discord.

## 🏗️ Arquitectura del Proyecto

Aleho Bot sigue una arquitectura modular y en capas, inspirada en el patrón MVC (Model-View-Controller) para la gestión de la interfaz web y las APIs. La lógica del bot para cada plataforma (Discord y Telegram) está encapsulada en módulos separados, lo que facilita la adición de nuevas funcionalidades y el mantenimiento. Se utiliza un patrón DAO (Data Access Object) para abstraer la lógica de acceso a la base de datos, promoviendo una mayor organización y reusabilidad del código.

## ⚙️ Instalación

Para configurar y ejecutar Aleho Bot en tu entorno local, sigue los siguientes pasos:

1.  **Clonar el Repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/aleho-bot.git
    cd aleho-bot
    ```

2.  **Instalar Dependencias**:
    ```bash
    npm install
    ```

3.  **Configuración de Variables de Entorno**:
    Crea un archivo `.env` en la raíz del proyecto para almacenar tus variables de entorno. Aquí hay un ejemplo de las variables que podrías necesitar configurar:

    ```
    # Tokens de API para los bots
    TELEGRAM_BOT_TOKEN=TU_TOKEN_DE_TELEGRAM_AQUI
    DISCORD_BOT_TOKEN=TU_TOKEN_DE_DISCORD_AQUI

    # Configuración de la Base de Datos MongoDB
    MONGODB_URI=mongodb://localhost:27017/alehobot
    DB_USER=tu_usuario_db
    DB_PASSWORD=tu_password_db

    # Configuración del Servidor Web (si aplica)
    PORT=3000
    SESSION_SECRET=una_cadena_secreta_larga_y_aleatoria

    # Claves para APIs externas (ej. para cotizaciones, juegos, etc.)
    API_KEY_DOLAR_HOY=TU_API_KEY_DOLAR_HOY
    API_KEY_FREE_GAMES=TU_API_KEY_FREE_GAMES
    # ... y cualquier otra API_KEY que tu bot utilice
    ```
    Asegúrate de reemplazar los valores de ejemplo con tus propios tokens y credenciales. Puedes obtener los tokens de bot desde las plataformas de desarrolladores de Telegram y Discord, respectivamente.

4.  **Iniciar el Bot**:
    ```bash
    npm start
    ```
    O, si usas PM2 para gestionar procesos:
    ```bash
    pm2 start pm2.json
    ```

## 🚀 Uso

Una vez que el bot esté en funcionamiento, puedes interactuar con él a través de Telegram o Discord utilizando los comandos configurados. Para la interfaz de administración web, accede a `http://localhost:PUERTO` (el puerto se define en tu configuración).

## 🤝 Contribución

Las contribuciones son bienvenidas. Si deseas mejorar Aleho Bot, por favor, sigue estos pasos:

1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y commitea (`git commit -am 'feat: Añade nueva funcionalidad'`).
4.  Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5.  Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENCE` para más detalles.

## 📧 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactar al mantenedor del proyecto.

