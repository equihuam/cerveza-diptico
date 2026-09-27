# ==============================================================================
# FICHA DE DEGUSTACIÓN CERVECERA (BJCP & SENSORIAL) - SHINY APP
# ==============================================================================
# Instrucciones de ejecución en R:
# 1. Instalar paquetes requeridos si no los tienes:
#    install.packages(c("shiny", "bslib", "DT", "readr"))
# 2. Correr la app:
#    shiny::runApp("app.R")
# ==============================================================================

library(shiny)
library(bslib)
library(DT)
library(readr)

# Tema personalizado cervecero
beer_theme <- bs_theme(
  version = 5,
  bootswatch = "lux",
  primary = "#c26910",
  secondary = "#4a3b32",
  success = "#2e7d32",
  base_font = font_google("Plus Jakarta Sans"),
  heading_font = font_google("Cinzel")
)

ui <- page_navbar(
  title = "🍺 Ficha de Degustación Cervecera",
  theme = beer_theme,
  fillable = FALSE,
  
  # PESTAÑA 1: FORMULARIO DE REGISTRO
  nav_panel(
    "📝 Registro de Cata",
    layout_columns(
      col_widths = c(12),
      
      # 1. IDENTIFICACIÓN
      card(
        card_header("1. Identificación de la Muestra"),
        layout_columns(
          col_widths = c(6, 6),
          textInput("beer_name", "Nombre de la Cerveza *", placeholder = "Ej. Sierra Nevada Pale Ale"),
          textInput("brewery", "Cervecería / Productor", placeholder = "Ej. Cervecería Colima")
        ),
        layout_columns(
          col_widths = c(4, 4, 4),
          selectInput("family", "Familia de Fermentación", 
                      choices = c("Lager (Baja)", "Ale (Alta)", "Espontánea / Mixta (Sour)", "Híbrida / Otra")),
          textInput("style", "Estilo Específico", placeholder = "Ej. American IPA, Stout, Witbier"),
          numericInput("abv", "Graduación (% ABV)", value = 5.0, min = 0, max = 25, step = 0.1)
        ),
        layout_columns(
          col_widths = c(6, 6),
          textInput("taster", "Catador(a) / Juez", placeholder = "Tu nombre"),
          dateInput("tasting_date", "Fecha de Cata", value = Sys.Date())
        )
      )
    ),
    
    layout_columns(
      col_widths = c(6, 6),
      
      # 2. APARIENCIA
      card(
        card_header("2. Fase Visual: Apariencia (Máx. 3 pts)"),
        selectInput("color", "Color (SRM)", 
                    choices = c("Pajizo / Pálido (2-4 SRM)", "Dorado (5-7 SRM)", "Ámbar / Cobre (8-14 SRM)", "Marrón (15-22 SRM)", "Negro (+25 SRM)")),
        selectInput("clarity", "Claridad", 
                    choices = c("Brillante / Cristalina", "Ligera turbidez (haze)", "Turbia (Hazy / Trigo)", "Opaca")),
        selectInput("foam", "Corona de Espuma", 
                    choices = c("Blanca, densa y persistente", "Marfil, retención media", "Canela / Tostada", "Baja / Disipación rápida")),
        sliderInput("score_app", "Puntuación Apariencia:", min = 0, max = 3, value = 3, step = 0.5)
      ),
      
      # 3. AROMA
      card(
        card_header("3. Fase Olfativa: Aroma (Máx. 12 pts)"),
        checkboxGroupInput("aroma_tags", "Descriptores aromáticos:",
                           choices = c("Pan / Cereal", "Caramelo / Toffee", "Café / Chocolate", "Cítrico", 
                                       "Fruta Tropical", "Resina / Pino", "Herbal / Floral", "Plátano / Frutal", 
                                       "Clavo / Especias", "Cuero / Ácido", "⚠️ Mantequilla (Diacetilo)", "⚠️ Cartón (Oxidación)"),
                           inline = TRUE),
        textAreaInput("notes_aroma", "Notas de Aroma", placeholder = "Intensidad de malta, lúpulo, ésteres..."),
        sliderInput("score_aroma", "Puntuación Aroma:", min = 0, max = 12, value = 10, step = 0.5)
      )
    ),
    
    layout_columns(
      col_widths = c(6, 6),
      
      # 4. SABOR
      card(
        card_header("4. Fase Gustativa: Sabor (Máx. 20 pts)"),
        selectInput("bitterness", "Amargor Percibido",
                    choices = c("Muy bajo", "Bajo - Medio", "Medio (Equilibrado)", "Alto / Dominante (IPA)", "Muy Intenso")),
        selectInput("finish", "Final en Boca",
                    choices = c("Seco y crujiente", "Semiseco / Balanceado", "Dulce / Maltoso", "Amargo persistente", "Ácido")),
        textAreaInput("notes_flavor", "Notas de Sabor", placeholder = "Armonía, balance de malta-amargor, persistencia..."),
        sliderInput("score_flavor", "Puntuación Sabor:", min = 0, max = 20, value = 16, step = 0.5)
      ),
      
      # 5. SENSACIÓN EN BOCA
      card(
        card_header("5. Sensación en Boca (Máx. 5 pts)"),
        selectInput("body", "Cuerpo", choices = c("Ligero", "Medio-Ligero", "Medio", "Medio-Pleno / Sedoso", "Pleno / Denso")),
        selectInput("carbonation", "Carbonatación", choices = c("Baja", "Media (Estándar)", "Alta / Efervescente")),
        selectInput("warmth", "Calidez de Alcohol", choices = c("Imperceptible", "Suave y agradable", "Punzante / Áspera")),
        sliderInput("score_mouth", "Puntuación Sensación:", min = 0, max = 5, value = 4, step = 0.5)
      )
    ),
    
    layout_columns(
      col_widths = c(12),
      
      # 6. IMPRESIÓN GENERAL & TOTAL
      card(
        card_header("6. Impresión General & Puntaje BJCP (50 pts)"),
        layout_columns(
          col_widths = c(6, 6),
          textInput("pairing", "Maridaje Sugerido", placeholder = "Ej. Quesos maduros, mariscos, tacos al pastor..."),
          textAreaInput("notes_overall", "Comentarios Generales", placeholder = "Veredicto y fidelidad al estilo...")
        ),
        sliderInput("score_overall", "Puntuación Impresión General (Máx. 10):", min = 0, max = 10, value = 8, step = 0.5),
        
        div(
          class = "p-3 my-3 text-center text-white rounded",
          style = "background: linear-gradient(135deg, #2d261e 0%, #171513 100%);",
          h3("Puntuación Total BJCP:", style = "color: #f7d59b; margin-bottom: 0;"),
          h1(textOutput("total_score_text"), style = "color: #f9b84a; font-size: 3.5rem; font-weight: bold; margin: 0.2rem 0;"),
          h5(textOutput("bjcp_level_text"), style = "color: #e5dfd5;")
        ),
        
        div(
          class = "d-flex gap-3 justify-content-center mt-3",
          actionButton("btn_save", "💾 Guardar Registro de Cata", class = "btn-primary btn-lg"),
          downloadButton("btn_download_csv", "📊 Descargar Todas en CSV / Excel", class = "btn-success btn-lg")
        )
      )
    )
  ),
  
  # PESTAÑA 2: HISTORIAL Y TABLA
  nav_panel(
    "📊 Historial de Degustaciones",
    card(
      card_header("Registros Guardados"),
      DTOutput("history_table"),
      div(
        class = "mt-3 d-flex justify-content-end",
        actionButton("btn_clear", "🗑️ Limpiar Historial", class = "btn-outline-danger btn-sm")
      )
    )
  ),
  
  # PESTAÑA 3: CATÁLOGO DE FICHAS DESCRIPTIVAS
  nav_panel(
    "📚 Catálogo de Fichas Descriptivas",
    card(
      card_header("Base de Conocimiento Cervecero (Cereales, Levaduras, Procesos y Anécdotas)"),
      p("Explora y consulta las fichas descriptivas de cervezas clásicas e internacionales precargadas."),
      DTOutput("catalog_table")
    )
  )
)

server <- function(input, output, session) {
  # Almacenamiento reactivo de catas
  tastings_data <- reactiveVal(data.frame(
    Fecha = character(),
    Cerveza = character(),
    Cerveceria = character(),
    Familia = character(),
    Estilo = character(),
    ABV = numeric(),
    Catador = character(),
    Puntos_Apariencia = numeric(),
    Puntos_Aroma = numeric(),
    Puntos_Sabor = numeric(),
    Puntos_Sensacion = numeric(),
    Puntos_Impresion = numeric(),
    Total_BJCP = numeric(),
    Categoria = character(),
    Descriptores_Aroma = character(),
    Maridaje = character(),
    stringsAsFactors = FALSE
  ))
  
  # Cálculo del puntaje total
  total_score <- reactive({
    (input$score_app %||% 0) + 
      (input$score_aroma %||% 0) + 
      (input$score_flavor %||% 0) + 
      (input$score_mouth %||% 0) + 
      (input$score_overall %||% 0)
  })
  
  output$total_score_text <- renderText({
    paste0(total_score(), " / 50")
  })
  
  output$bjcp_level_text <- renderText({
    pts <- total_score()
    if (pts >= 45) return("🌟 Excepcional / Clase Mundial (45 - 50 pts)")
    if (pts >= 38) return("✨ Excelente (38 - 44 pts)")
    if (pts >= 30) return("👍 Muy Buena (30 - 37 pts)")
    if (pts >= 21) return("👌 Buena (21 - 29 pts)")
    if (pts >= 14) return("⚠️ Aceptable / Regular (14 - 20 pts)")
    return("❌ Problemática / Defectos (< 14 pts)")
  })
  
  # Guardar cata
  observeEvent(input$btn_save, {
    if (is.null(input$beer_name) || trimws(input$beer_name) == "") {
      showNotification("Por favor ingresa el nombre de la cerveza.", type = "warning")
      return()
    }
    
    new_entry <- data.frame(
      Fecha = as.character(input$tasting_date),
      Cerveza = input$beer_name,
      Cerveceria = input$brewery,
      Familia = input$family,
      Estilo = input$style,
      ABV = input$abv,
      Catador = ifelse(trimws(input$taster) == "", "Anónimo", input$taster),
      Puntos_Apariencia = input$score_app,
      Puntos_Aroma = input$score_aroma,
      Puntos_Sabor = input$score_flavor,
      Puntos_Sensacion = input$score_mouth,
      Puntos_Impresion = input$score_overall,
      Total_BJCP = total_score(),
      Categoria = output$bjcp_level_text(),
      Descriptores_Aroma = paste(input$aroma_tags, collapse = ", "),
      Maridaje = input$pairing,
      stringsAsFactors = FALSE
    )
    
    updated <- rbind(tastings_data(), new_entry)
    tastings_data(updated)
    
    showNotification(paste0("¡Degustación de '", input$beer_name, "' guardada con éxito (", total_score(), " pts)!"), type = "message")
  })
  
  # Tabla interactiva
  output$history_table <- renderDT({
    datatable(tastings_data(), options = list(pageLength = 10, scrollX = TRUE))
  })
  
  # Descargar CSV
  output$btn_download_csv <- downloadHandler(
    filename = function() {
      paste0("degustaciones_cerveza_", Sys.Date(), ".csv")
    },
    content = function(file) {
      write_excel_csv(tastings_data(), file)
    }
  )
  
  # Limpiar historial
  observeEvent(input$btn_clear, {
    tastings_data(data.frame())
    showNotification("Historial de degustaciones limpiado.", type = "default")
  })
  
  # Cargar Catálogo de Fichas Descriptivas
  output$catalog_table <- renderDT({
    csv_path <- file.path("data", "fichas_cervezas.csv")
    if (file.exists(csv_path)) {
      df_cat <- read_csv(csv_path, show_col_types = FALSE)
      datatable(df_cat, filter = "top", options = list(pageLength = 8, scrollX = TRUE, autoWidth = TRUE))
    } else {
      datatable(data.frame(Mensaje = "No se encontró el archivo data/fichas_cervezas.csv"))
    }
  })
}

shinyApp(ui, server)
