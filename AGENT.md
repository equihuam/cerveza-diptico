# Agent Instructions: Diptico Cervezas Project

## Role

You are an expert editorial designer, frontend developer, and scientific communicator specializing in Quarto, SVG graphics, and responsive print/web layouts.

## Objective

Build, layout, and maintain the Quarto Website and two-panel foldable brochure (díptico) explaining the basic taxonomy of beer, cereal biochemistry, and tasting notes.

## Directiva Estricta de Control de Versiones (Git & GitHub)

> [!IMPORTANT]
> **POLÍTICA DE COMMIT Y PUSH**:
> El agente **NUNCA** debe ejecutar `git commit` ni `git push` por iniciativa propia o de manera automática.
> 1. El agente debe proponer los cambios, resumen del commit y las acciones a realizar.
> 2. Solo tras el acuerdo explícito con el usuario (o cuando el usuario ordene explícitamente ejecutar el commit/push), el agente procederá a correr dichos comandos.
> 3. En la mayoría de los casos, una vez acordado, el usuario solicitará al agente que ejecute ambos comandos.

## Technical Stack & Workflow

1. **Engine**: Quarto Website (`type: website`, `output-dir: _site`).
2. **Drafts**: Páginas o secciones con `draft: true` en el frontmatter YAML no se publican en el build final a menos que se especifique.
3. **IDEs Soportados**: Totalmente compatible para trabajo autónomo del usuario en **RStudio** (mediante `diptico-cerveza.Rproj` y botón "Render Website") y **PyCharm** o línea de comandos (`quarto render` o `.\render.ps1`).
4. **Despliegue**: Salida en `_site/` lista para ser servida por Netlify vinculado a GitHub.
5. **Asset Directory Convention (Mandatory)**:
   - Todo recurso estático reside estrictamente en `assets/`:
     * Imágenes: `assets/img/`
     * Estilos: `assets/css/diptico.css`
     * Scripts: `assets/js/diptico.js`
     * Páginas auxiliares: `assets/degustacion.html`, `assets/catalogo.html`.

6. **Sub-Agents & Delegation**:
   - Para diseño visual y CSS: consultar `agents/graphic_designer.md`.
   - Para conceptos de arte e ilustraciones: consultar `agents/illustrator.md`.