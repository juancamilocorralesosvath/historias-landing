# Anatomía de un cuento — "Paseo nocturno"

Página web interactiva para el Entregable 1 del curso **El Arte de Contar
Historias** (Universidad Icesi, profesora Catalina Villa Zapata).

Presenta la anatomía completa del cuento **"Paseo nocturno" (Partes I y II)**,
de Rubem Fonseca (*Feliz Año Nuevo*, 1975): datos básicos del texto, análisis
estructural, análisis semántico y una sección interactiva para que la
audiencia participe durante la presentación en clase.

Cuento original: https://www.literatura.us/idiomas/rf/rf_paseo1.html

## Grupo

- David Dulce
- Juan Camilo Corrales Osvath

## Contenido de la página

1. **Portada** — título, autor y datos generales del cuento.
2. **Datos básicos del texto** — título, autor, fecha/lugar de publicación,
   corriente literaria.
3. **Análisis estructural** — argumento, estructura narrativa, tiempo,
   espacio, personajes, narrador, tono, lenguaje y estilo (en acordeón, con
   citas textuales).
4. **Análisis semántico** — tema central, subtemas, símbolos, conflicto,
   interpretaciones.
5. **Participa** — mini-quiz de comprensión con retroalimentación inmediata y
   encuestas de interpretación abierta con resultados en vivo (pensadas para
   discutir con el resto del salón durante la presentación).

## Archivos

- `index.html` — estructura y contenido de la página.
- `styles.css` — todo el diseño visual (tipografías, colores, layout,
  animaciones).
- `script.js` — interactividad: acordeón, quiz, encuestas, scroll-reveal,
  barra de progreso y navegación activa.
- `.claude/launch.json` — configuración para levantar un servidor local de
  vista previa.

No usa frameworks ni pasos de compilación: es HTML, CSS y JS plano. La única
dependencia externa es Google Fonts (Fraunces + Inter), así que se necesita
conexión a internet para que carguen las tipografías.

## Cómo verla

Necesita servirse desde un servidor local (no abrir el archivo directamente
con doble clic) para que el CSS y el JS funcionen sin restricciones del
navegador:

```bash
cd "historias"
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000` en el navegador.
