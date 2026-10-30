# NebulaDev

Portafolio frontend de NebulaDev, desarrollado con React y Vite. El sitio usa
contenido local para seguir mostrando el portafolio cuando el backend no está
disponible; el backend se usa únicamente para enviar el formulario de contacto.

## Requisitos

- Node.js 22 o superior.
- npm.
- El backend Django/API solo es necesario para probar envíos reales del
  formulario; el resto del sitio funciona sin él.

## Inicio local

En PowerShell, desde la raíz del proyecto:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Vite muestra la URL local en la terminal, normalmente
`http://localhost:5173`. Si no vas a probar el backend, puedes omitir la copia
de `.env.example`; la aplicación mostrará el formulario como no disponible
cuando no pueda conectar.

Para probar el envío local, inicia el backend en `http://127.0.0.1:8000`,
configura CORS para permitir el origen del frontend (`http://localhost:5173` o
`http://127.0.0.1:5173`) y define en `.env.local`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

Reinicia Vite después de cambiar una variable `VITE_*`.

## Contenido y secciones

El contenido del portafolio se mantiene en `src/data/portfolioData.js`:

- Perfil, marca, descripción, contacto, misión, visión y valores.
- Servicios y tecnologías.
- Equipo.
- Proyectos y estadísticas.
- Enlaces de navegación.

El equipo conserva los cuatro integrantes y sus imágenes verificadas. Se
retiraron los dos perfiles adicionales que eran de ejemplo y los enlaces
sociales no verificados. Las estadísticas y proyectos de ejemplo se dejaron
vacíos para no mostrar métricas ni trabajos ficticios. El nivel porcentual de
las tecnologías no se muestra si no existe un dato confirmado.

El pie de página enlaza a las páginas legales, y el navbar conserva la
navegación principal del portafolio:

| Ruta | Página |
| --- | --- |
| `/` | Portafolio |
| `/contacto` | Formulario de contacto |
| `/terminos` | Términos de uso |
| `/privacidad` | Aviso de privacidad |
| `/cookies` | Política de cookies |
| Cualquier otra ruta | Página 404 |

El texto de las páginas legales está en `src/data/legalPages.jsx`. Debe
mantenerse alineado con las prácticas reales del backend y el alojamiento. El
backend guarda los datos del mensaje, la versión aceptada, la fecha y el estado
de seguimiento; el administrador autorizado consulta los mensajes. No envía
correos automáticamente ni administra los proyectos del portafolio. El plazo
de almacenamiento/eliminación debe documentarse según la configuración real
del backend.

## Formulario y backend

El frontend usa el endpoint:

```text
POST {VITE_API_BASE_URL}/contact/
```

Envía JSON con estos campos:

```json
{
  "name": "Nombre",
  "email": "persona@ejemplo.com",
  "subject": "Asunto opcional",
  "message": "Mensaje",
  "privacy_accepted": true
}
```

El nombre, correo, mensaje y aceptación del aviso son obligatorios; el asunto
es opcional. La casilla muestra **“He leído y acepto el Aviso de privacidad.”**,
empieza desmarcada y no se acepta automáticamente. Al pulsar **Leer aviso de
privacidad**, se abre una ventana superpuesta y los campos escritos permanecen
en el formulario. El backend no ofrece un endpoint público para obtener el
texto legal: el aviso vive en el frontend y debe mantenerse sincronizado con
Configuración de privacidad en el administrador. No se pide aceptar los
términos de uso para enviar una consulta.

Antes de probar el envío real, configura en el backend la versión del aviso y
confirma que coincida con la que muestra el frontend. El frontend solo considera
exitosa una respuesta `201`; un `200`, `202` o `204` no vacía el formulario ni
muestra confirmación. La API puede responder:

- `201`: el backend guardó/aceptó el mensaje y el frontend muestra confirmación.
- `400` o `422`: hay que corregir los datos.
- `429`: se alcanzó el límite de solicitudes; el frontend muestra el detalle
  que devuelva la API.
- `503`: falta una configuración requerida en el perfil del sitio; también se
  muestra el detalle del backend si está disponible.
- Error de conexión: el formulario informa que el mensaje no se envió y ofrece
  el correo alternativo.

El frontend comprueba disponibilidad consultando `GET /contact/`. Una respuesta
`405` (endpoint activo, pero método no permitido) o `429` se considera señal de
que el backend responde. Una comprobación exitosa no garantiza que el `POST`
vaya a ser aceptado.

El aviso emergente de cookies es informativo: **Entendido** lo cierra y guarda
la preferencia en el almacenamiento local del navegador. No equivale a aceptar
cookies no esenciales ni activa seguimiento. El backend usa cookies técnicas
para la sesión y protección de su panel de administración. El frontend no
integra analítica ni publicidad; revisa por separado las prácticas del hosting.

En producción, el formulario rechaza una URL del backend que no use HTTPS. El
backend público debe tener un certificado TLS válido y permitir por CORS el
origen exacto del frontend. La validación del navegador mejora la experiencia,
pero el backend sigue siendo responsable de validar y guardar cada solicitud.
Los mensajes y contraseñas no se almacenan en `localStorage`; el frontend solo
usa el almacenamiento local para recordar que se cerró el aviso informativo de
cookies.

## Verificaciones

```powershell
npm test
npm run lint
npm run build
```

Las pruebas usan respuestas HTTP simuladas: no hacen solicitudes al backend
real ni guardan mensajes. Comprueban el JSON, las respuestas `201`, `503`,
`429`, errores de red, el requisito HTTPS en producción, el texto legal y la
construcción de rutas con prefijo.

El build genera `dist/`. No edites ese directorio manualmente: es un artefacto
generado y se recrea en cada compilación.

## Repositorio y CI de GitHub

Este proyecto se prepara como repositorio de código fuente; el workflow
`.github/workflows/ci.yml` **no publica ni despliega una página**. GitHub Actions
ejecuta pruebas, lint y build al hacer push o abrir un pull request hacia `main`
o `master`.

Para preparar la publicación del código:

1. Crea un repositorio vacío en GitHub (sin README, licencia ni `.gitignore`
   iniciales si ya existen localmente).
2. Inicializa Git en la carpeta local, crea la rama `main`, agrega los archivos
   y realiza el primer commit.
3. Agrega la URL del repositorio GitHub como `origin` y sube `main`.
4. Revisa la pestaña **Actions** para confirmar que `npm ci`, pruebas, lint y
   build finalicen correctamente.

El `.gitignore` excluye `node_modules`, `dist`, `.env`, `.env.local` y otros
archivos locales. Solo `.env.example`, que contiene valores de ejemplo sin
secretos, debe subirse. Las variables `VITE_*` se incluyen en el JavaScript
público generado; no pongas claves privadas en ellas.

El formulario seguirá apuntando al backend local de desarrollo salvo que se
configure otra URL antes de compilar. El workflow de CI no publica el frontend
ni necesita secretos del backend.
