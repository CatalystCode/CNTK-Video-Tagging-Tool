import { IAppStrings } from "../strings";

export const spanish: IAppStrings = {
    appName: "Herramienta Visual de Etiquetado de Objetos",
    common: {
        displayName: "Nombre para Mostrar",
        description: "Descripción",
        submit: "Enviar",
        cancel: "Cancelar",
        provider: "Proveedor",
    },
    homePage: {
        newProject: "Nuevo Proyecto",
        openProject: "Abrir Proyecto",
        recentProjects: "Proyectos Recientes",
    },
    appSettings: {
        storageTitle: "Configuración de Almacenamiento",
        uiHelp: "Donde se guardan sus configuraciones",
    },
    projectSettings: {
        sourceConnection: {
            title: "Conexión de Origen",
            description: "De donde se gargan sus activos",
        },
        targetConnection: {
            title: "Conexión de Destino",
            description: "Donde se guarda su proyecto y sus datos exportados",
        },
        addConnection: "Agregar Conexión",
    },
    tags: {
        title: "Etiquetas",
        modal: {
            name: "Nombre de Etiqueta",
            color: "Color de Etiqueta",
        },
        colors: {
            white: "Blanco",
            gray: "Gris",
            red: "Rojo",
            maroon: "Granate",
            yellow: "Amarillo",
            olive: "Olivo",
            lime: "Lima",
            green: "Verde",
            aqua: "Aqua",
            teal: "Trullo",
            blue: "Azul",
            navy: "Azul Marino",
            fuschia: "Fuschia",
            purple: "Púrpura",
        },
    },
    connections: {
        title: "Conexiones",
        details: "Detalles de Conexión",
        settings: "Configuración de Conexión",
        connectionPageInstructions: "Por favor seleccione una conexión para editar",
        providers: {
            azureBlob: {
                title: "Almacenamiento de Azure Blob",
            },
            bing: {
                title: "Búsqueda de Imágenes Bing",
                options: "Opciones de Búsqueda de Imágenes Bing",
                apiKey: "Clave API",
                query: "Consulta",
                aspectRatio: "Relación de Aspecto",
            },
            local: {
                title: "Sistema de Archivos Local",
                folderPath: "Ruta de la carpeta",
                selectFolder: "Seleccione la carpeta",
            },
        },
    },
    editorPage: {
        width: "Anchura",
        height: "Altura",
        toolbar: {
            select: "Seleccionar",
            pan: "Pan",
            drawRectangle: "Dibujar Rectángulo",
            drawPolygon: "Dibujar Polígono",
            saveProject: "Guardar Proyecto",
            exportProject: "Exprtar Proyecto",
        },
    },
    exportPage: {
        providers: {
            vottJson: "VoTT JSON",
            azureCV: "Azure Custom Vision Service",
            tfRecords: "Tensorflow Records",
        },
    },
};
