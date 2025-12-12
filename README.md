# 🛠️ Sistema de Gestión - Carpintería Los Roble (Refactorizado)

> **Versión:** 2.0.0 (Refactorización MVC)
> **Estado:** Estable / Producción
> **Tecnologías:** Node.js, Express, MySQL, JWT, OpenAI API.

## 📋 Descripción del Proyecto
Este proyecto consiste en la refactorización completa del sistema legacy de gestión para "Carpintería Los Roble". Se ha migrado de una arquitectura monolítica a una **Arquitectura Modelo-Vista-Controlador (MVC)** escalable, segura y modular.

El sistema incluye un **Dashboard Administrativo** integrado con un **Asistente Virtual (Chatbot IA)** y autenticación segura.

---

## 🚀 Características Técnicas (Refactorización)

### 1. Arquitectura MVC
El código se ha reestructurado para separar responsabilidades, facilitando el mantenimiento futuro:

```text
/proyecto-raiz
│
├── /controllers    Lógica de Negocio (Login, Registro)
├── /routes         Tw Rutas y Endpoints (API)
├── /middleware     Seguridad (Verificación de Tokens)
├── /views          Interfaz de Usuario (HTML/Dashboard)
└── db.js           Conexión a Base de Datos

2. Seguridad Implementada
El sistema utiliza autenticación JWT para proteger las rutas sensibles.
Variables de Entorno: Credenciales sensibles separadas en archivo .env.

3. Base de Datos
El proyecto incluye un script de instalación automática en el archivo database.sql.
Pasos para instalar:
1. Abra su gestor de base de datos (phpMyAdmin, Workbench, HeidiSQL).
2. Importe el archivo database.sql incluido en la raíz.
3. Asegúrese de que las credenciales en el archivo .env coincidan con su configuración.

Guía de Instalación
Prerrequisitos
Node.js (v14 o superior)
MySQL Server (XAMPP, Wamp o nativo)
Git

Paso 1: Clonar e Instalar Dependencias
git clone <URL_DEL_REPOSITORIO>
cd refactorizacion
npm install

Paso 2: Configuración de Base de Datos
El proyecto incluye un script de instalación automática.
Abra su gestor de base de datos (phpMyAdmin, Workbench).
Importe el archivo database.sql ubicado en la raíz del proyecto.
Esto creará la base de datos mi_base_datos y la tabla users.

Paso 3: Variables de Entorno (.env)
Cree un archivo .env en la raíz y configure sus credenciales:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=          # Deje vacío si usa XAMPP por defecto
DB_NAME=mi_base_datos
JWT_SECRET=coloque_una_clave_segura_aqui

Paso 4: Iniciar el Servidor
npm start

El servidor iniciará en: http://localhost:3000

Configuración del Chatbot (IA)
El archivo bot.js contiene la lógica del chat flotante.
NOTA IMPORTANTE: Para activar la inteligencia artificial, debe colocar su API KEY de OpenAI en la línea correspondiente de bot.js.
Por seguridad, no se incluye ninguna API Key activa en este repositorio.

Estructura de Archivos
index.js: Punto de entrada del servidor.
db.js: Configuración del Pool de conexiones MySQL.
controllers/: Funciones lógicas (Register, Login).
routes/: Definición de rutas de la API.
middleware/: Validadores de seguridad (verifyToken).
database.sql: Script SQL para recrear la base de datos.


