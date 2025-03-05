# VK Mini Apps Template

## Описание

**VK Mini Apps Template** – это шаблон для быстрой разработки мини-приложений ВКонтакте.

Данный шаблон был разработан для использования вместе с [VK REST API Template](https://github.com/empty-devs/vk-rest-api-template).

## Технологии

- **React** + **TypeScript**
- **Zustand** (стейт-менеджер)
- **Vite** (сборщик)
- **VKRouter** (роутинг для VK Mini Apps)
- **VKUI** (компонентная библиотека от VK)
- **VK Bridge** (API между VK и клиентом)
- **ESLint** (линтер для поддержания качества кода)
- **Prettier** (форматирование кода)
- **PostCSS** (для работы со стилями)
- **Eruda** (консоль отладки в мобильных браузерах)
- **Lazy loading** для компонентов (ленивая загрузка)

## Установка и запуск

### 1. Установка зависимостей

```sh
yarn install
```

### 2. Настройка окружения

Перед запуском необходимо:

- Изменить `app_id` в файлах `vk-tunnel-config.json` и `vk-hosting-config.json`.
- Переименовать `.env.example` в `.env` и задать нужные параметры.

### 3. Запуск проекта

Для разработки запустите:

```sh
yarn dev
```

Чтобы запустить туннель:

```sh
yarn vk tunnel
```

## Скрипты

- `yarn dev` – запуск в режиме разработки
- `yarn vk tunnel` – запуск туннеля для разработки
- `yarn build` – сборка проекта
- `yarn odr` – альтернативная сборка с `vite.config.odr.mts`
- `yarn preview` – предпросмотр собранного проекта
- `yarn lint` – проверка кода линтером
- `yarn format` – форматирование кода
- `yarn deploy` – сборка и деплой в VK Mini Apps

## Полезные ссылки

- [VKUI](https://dev.vk.com/ru/libraries/vkui)
- [VK Tunnel](https://dev.vk.com/ru/libraries/tunnel)
- [VK Router](https://dev.vk.com/ru/libraries/router)
- [VK Bridge](https://dev.vk.com/ru/bridge/overview)
- [VK Deploy](https://dev.vk.com/ru/mini-apps/development/hosting/overview)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Vite](https://vite.dev/guide/)
- [React](https://react.dev/learn)

## Вклад

Ваши вклады приветствуются! Если вы хотите улучшить проект, пожалуйста, создайте pull request или откройте issue.

## Лицензия

Этот проект лицензирован под лицензией GPL-3.0. Подробнее см. в файле [LICENSE](LICENSE).

## Контакты

- **Автор:** Андрей Кузьмичев
- **Telegram:** [@bnull](https://t.me/bnull)

