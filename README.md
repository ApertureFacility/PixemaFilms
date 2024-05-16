# Интернет-кинотеатр
Проект разработан на React, Redux-Toolkit и TypeScript.

## Обзор
- Сайт выполняет поиск фильмов на английском языке и отображает результаты по запросу пользователя.
- Каждый фильм имеет свою страницу с детальной информацией.
- Предусмотрена возможность регистрации и добавления фильма в избранное.

## Демо
Проект развернут на Netlify:[https://pixemawizzard.netlify.app/]

## Функциональность

### Поиск фильмов на английском языке
- Поиск выполняется по запросу пользователя.
- Результаты поиска отображаются на странице.

#### Страница фильма
- На странице фильма отображается полная информация о фильме.
- Предусмотрена возможность добавления фильма в избранное.
- Кнопка "Добавить в избранное" активна только для зарегистрированных пользователей.
- При поиске товара выполняется запрос к ombdApi, после чего отображаются соответствующие фильмы.
- Если при выполнении запроса сервер возвращает ошибку, отображается всплывающее уведомление.
- Предусмотрены фильтры по году и жанру.

#### Страница настроек
- Если сервер возвращает ошибку, отображается уведомление.

### Избранное
- Товары, добавленные в "Избранное", сохраняются в Local Storage под ключом "tt". Затем на соответствующей вкладке выполняется поиск данных с этим ключом и, если они найдены, отображаются.

#### Хедер
    - Хедер динамический. В нем отображается первая буква имени пользователя. Если пользователь не залогинен, отображается "G" (Guest)
#### Каталог фильмов
    - Переключение между страницами фильмов осуществляется путем изменения запроса. После этого происходит перерисовка новых фильмов в соответствии с выбранной страницей.

## Технологии
- React
- Redux-Toolkit
- TypeScript
- Адаптивная верстка

## Установка
Для запуска на локальной машине выполните следующие шаги:

1. Установите npm зависимости:

```sh
npm install
2.Запустите проект:
Npm start
