# Proyecto: Integración con GitHub

Este proyecto permite conectar una aplicación con GitHub para crear repositorios y subir archivos automáticamente utilizando la API de GitHub.

## Características

- Autenticación con GitHub mediante OAuth.
- Creación automática de repositorios en la cuenta del usuario.
- Subida de archivos al repositorio utilizando la API REST de GitHub.

## Tecnologías Utilizadas

- **Frontend:** React
- **Backend:** Node.js con Express
- **API:** GitHub REST API

## Configuración Inicial

1. **Registrar una aplicación en GitHub:**
   - Accede a [GitHub Developer Settings](https://github.com/settings/developers).
   - Crea una nueva aplicación OAuth y anota el `Client ID` y el `Client Secret` generados.
   - Configura la URL de callback como:
     - `http://localhost:3000/auth/github/callback` (para desarrollo local).

2. **Claves API:**
   Asegúrate de guardar tus claves Github API de forma segura:

   - **Client ID:** Ov23ligXCHOu2y0vfZrF
   - **Client Secret:** c2658060efa489ccb2dec5812f7098fbb06cdf74

   > **Nota:** Nunca expongas estas claves directamente en el código fuente ni las subas a repositorios públicos. Usa variables de entorno para protegerlas.

3. **Configurar Variables de Entorno:**
   Crea un archivo `.env` en tu servidor y agrega las siguientes variables:

   ```env
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=206555428807-57e3ca1q5159divc5fafapusj2it4c35.apps.googleusercontent.com

# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=dev:sensible-capybara-356 # team: dhren, project: bolt-649fa

NEXT_PUBLIC_CONVEX_URL=https://sensible-capybara-356.convex.cloud

NEXT_PUBLIC_GEMINI_API_KEY= AIzaSyAZBRyQTljYcycRzA98Z96ZGIB_OFOorYc

NEXT_PUBLIC_PAYPAL_CLIENT_ID=AZk-jcPlp3xQB38faQA1ENEfPDz2USaOMJwtHlNQjaRtB_eYhmo528eDtfK87ijBOV-zp7w2wV6cCO-O
   ```

## Ejecución del Proyecto

### Backend

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor:
   ```bash
   node server.js
   ```

### Frontend

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia la aplicación React:
   ```bash
   npm start
   ```

## Uso

1. Haz clic en el botón **Conectar con GitHub** en el frontend.
2. Autentícate con tu cuenta de GitHub.
3. Crea un repositorio nuevo y sube los archivos del proyecto.

## Seguridad

- Las claves `Client ID` y `Client Secret` deben mantenerse privadas.
- Usa variables de entorno para evitar que se expongan accidentalmente.

## Licencia

Este proyecto está bajo la licencia MIT.

---

**Advertencia:** Este archivo README está diseñado para ser usado en un entorno seguro y privado. No subas las claves de la API a repositorios públicos.

