# Taxonomía y Cultura de la Cerveza (Quarto Website)

Sitio Web interactivo y proyecto editorial divulgativo sobre la taxonomía cervecera, bioquímica de cereales (malteados vs. crudos), catálogo de estilos y cata organoléptica. Desarrollado en **Quarto Website** con salida estática a `_site/` para despliegue en **Netlify** vía **GitHub**, manteniendo la capacidad de generar el díptico impreso en PDF dúplex de 2 páginas.

---

## 🛠️ Estructura del Proyecto

```text
cerveza-diptico/
├── diptico-cerveza.Rproj    # Proyecto RStudio para trabajo autónomo
├── _quarto.yml              # Configuración Quarto Website (salida en _site/)
├── _brand.yml               # Paleta de colores institucional / editorial
├── AGENT.md                 # Instrucciones operativas y políticas de Git
├── README.md                # Documentación del proyecto
├── render.ps1               # Script PowerShell para compilar todo el sitio y PDF
├── .gitignore               # Exclusión segura de credenciales y temporales
├── index.qmd                # Página principal / Díptico interactivo y PDF
├── app.R                    # Aplicación complementaria R Shiny
├── data/
│   └── fuentes_cerveza.md   # Base de conocimiento técnico cervecero
└── assets/
    ├── degustacion.html     # Bitácora interactiva de cata (Local Storage / PDF)
    ├── catalogo.html        # Catálogo navegable de estilos y cristalería
    ├── css/
    │   └── diptico.css      # Reglas de maquetación, interactividad y @media print
    └── js/
        └── diptico.js       # Control de vistas, filtros de fermentación y sync
```

---

## 💻 Flujo de Trabajo Autónomo (RStudio / PyCharm / CLI)

Puedes trabajar de manera 100% autónoma sin depender del asistente:

1. **En RStudio**:
   - Abre `diptico-cerveza.Rproj`.
   - En la pestaña **Build**, presiona **Render Website** (o abre `index.qmd` y presiona **Render**).
2. **En PyCharm / Terminal**:
   - Ejecuta en la terminal del proyecto:
     ```powershell
     quarto render
     ```
   - O corre el script automatizado:
     ```powershell
     .\render.ps1
     ```
3. **Manejo de Borradores (Drafts)**:
   - Cualquier archivo `.qmd` nuevo puede marcarse como borrador en su encabezado YAML:
     ```yaml
     ---
     title: "Mi Nuevo Análisis"
     draft: true
     ---
     ```
   - Quarto ignorará automáticamente las páginas marcadas como `draft: true` en el renderizado de producción.

---

## 🌐 Publicación en Netlify vía GitHub

- **Directorio de publicación en Netlify**: `_site`
- **Comando de compilación en Netlify**: *(dejar en blanco / none, ya que se publica el sitio compilado en tu máquina local)*.
- Cada vez que se haga un `git push` a la rama principal vinculada, Netlify detectará los cambios y actualizará el sitio en vivo en segundos.

---

## 🔒 Política de Confidencialidad y Control de Versiones

- **Directiva**: No se ejecutan `git commit` ni `git push` de forma automática. Siempre se propone el conjunto de cambios y el mensaje de commit antes de proceder.
- **Seguridad**: Ninguna contraseña, token de GitHub o clave 2FA reside en el repositorio. La autenticación la gestiona de forma segura tu entorno local (Git Credential Manager / SSH).
