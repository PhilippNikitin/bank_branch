interface ImportMetaEnv {
    readonly VITE_APP_API_YANDEX_KEY: string
    readonly VITE_APP_API_2GIS_KEY: string
    readonly VITE_APP_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}