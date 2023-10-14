# Запуск проекта

```console
npm install - установка зависимостей
npm run dev на vite - сборка
```
## Установка legacy-peer-deps
npm install --legacy-peer-deps react-flippy
---

## Скрипты


- `npm run dev` - Запуск frontend-части проекта на `vite`
- `npm run build` - Сборка проекта `production` в режиме
- `npm run lint` - Проверка ts файлов линтером
---

## Архитектура проекта

Проект написан в соответствии с методологией Feature-Sliced.

Документация FSD - [Feature-Sliced Design](https://feature-sliced.design/)


## Линтинг

Для контроля главных архитектурных принципов методлогии Feature-Slice используется  `eslint-plugin-fsd`, который содержит 3 правила:

1. `path-checker` - Запрет абсолютных импортов в рамках одного модуля

    ```powershell
        Cтруктура:
        pages/
            AnyPage/
                ui/
                    AnyPage/
                        AnyPage.tsx
                    AnyPageHeader/
                        AnyPageHeader.tsx
    ```

    ```typescript
        // Файл pages/AnyPage/ui/AnyPage

        import { AnyPageHeader } from './AnyPageHeader/AnyPageHeader' // корректный импорт 

        import { AnyPageHeader } from 'pages/AnyPage/ui/AnyPageHeader/AnyPageHeader' // некорректный импорт  
    ```

2. `layer-imports` - Проверка использования импортов в слоях

    ```powershell
        Cтруктура:
        pages/
            AnyPage/
                ui/
                    AnyPage/
                    AnyPageHeader/
                    ...
                index.ts
        widgets/
            Widget/
                ui/
                    Widget/
                    ...
                index.ts
        features/
            AnyFeature/
                ui/
                    AnyFeature/
                    ...
                index.ts
    ```

    ```typescript
        // Файл pages/AnyPage
        import { Widget } from 'widgets/Widgets' // корректный импорт 

        // Файл features/AnyFeature
        import { Widget } from 'widgets/Widgets' // некорректный импорт 
    ```

3. `public-api-imports` - Разрешает импорт в другие модули только из Public API модуля. Имеет autofix

    ```powershell
        Cтруктура:
        pages/
            AnyPage/
                ui/
                    AnyPage/
                        AnyPage.tsx
        features/
            AnyFeature/
                ui/
                    AnyFeature/
                        AnyFeature.tsx
                index.ts - PUBLIC API
    ```

    ```typescript
        // Файл pages/AnyPage/ui/AnyPage

        import { AnyFeature } from 'features/AnyFeature' // корректный импорт 

        import { AnyPageHeader } from 'features/AnyFeature/ui/AnyFeature/AnyFeature.tsx' // некорректный импорт  
    ```

---


## Конфигурация проекта

Для разработки проект содержит 1 конфиг:


- На [Vite](https://vitejs.dev/) - `vite.config.ts`
## Работа с картами
Для работы с картами используетя [React-Leaflet]

Для построения маршрутов [leaflet-routing-machine]

Для геокодирования [leaflet-geosearch]

## Стили

Для стилизации в проекте используетя UI библеотека [Chakra UI]


## Работа с данными

Взаимодействие с данными осуществляется с помощью [Zustand + React-Query].

Запросы на сервер выполняются с помощью [Axios].

