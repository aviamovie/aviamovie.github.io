# SURS — рефакторинг под Lampa 3.x (тестовая сборка)

Источник рефакторинга — `v3/surs.js`, `v3/surs_nav_buttons.js`, `v3/surs_strmngs_row.js`.
Сверено с [`yumata/lampa-source`](https://github.com/yumata/lampa-source): `UPGRADE.md` (2.4.7 → 3.0.0), `docs/ru/*`, `src/core/content_rows.js`, `src/core/api/*`, `src/interaction/card/*`.

## Установка для теста

Настройки → Плагины → `https://aviamovie.github.io/test/lampa3/index.js`

Не ставить одновременно с `https://aviamovie.github.io/surs.js`: оба регистрируют одни и те же источники.

## Файлы

| Файл | Что это |
|---|---|
| `index.js` | загрузчик тестовой сборки (на Lampa < 3.0 грузит `v2/surs.js`) |
| `surs.js` | ядро: источники SURS / NEW / KIDS / RUS, настройки, боковое меню (3824 → ~1000 строк) |
| `surs_nav_buttons.js` | горизонтальное меню-кнопки |
| `surs_strmngs_row.js` | ряды «Глобальные / Российские стриминги» |
| `v3/surs_genres_row.js` | без изменений, он уже работает через `ContentRows` |

## Главное архитектурное изменение: `Lampa.ContentRows`

В v3 SURS вставлял ряды на свою главную вручную (`window.surs_getCustomButtonsRow`, `window.streaming_get*Row`, `window.genres_createGenresRow`, свой `getUpcomingEpisodes`). Модули при этом одновременно регистрировались в `ContentRows`. Но `ContentRows.call('main', …)` вызывают только штатные `tmdb.main` и `cub.main`, поэтому на главной SURS:

* не было штатных рядов Lampa 3: «Продолжить просмотр», «Рекомендации», «Недавние эпизоды»;
* ряд «Ближайшие эпизоды» был скопирован вручную;
* ряды нельзя было выключить в Настройки → «Каналы».

Теперь `main()` каждого источника SURS вызывает `Lampa.ContentRows.call(screen, params, parts)`, как это делает TMDB:

* **SURS** → экран `main`: все штатные ряды Lampa, ряды других плагинов, кнопки, стриминги, жанры;
* **SURS NEW / KIDS / RUS** → отдельный экран `surs`: только то, что явно на него подписано (сейчас это кнопки). Так взрослые «Рекомендации» не попадают в KIDS.

Сторонний плагин может добавить свой ряд на главные SURS:

```js
Lampa.ContentRows.add({
    name: 'my_row', title: 'Мой ряд', index: 2,
    screen: ['main', 'surs'],
    call: function (params, screen) {
        return function (call) { call({ title: '...', results: [...] }) }
    }
})
```

Ряды стримингов на главной SURS по-прежнему встают в случайную позицию: `ContentRows` читает `row.index` после вызова `call()`, поэтому позиция выбирается внутри `call`.

## Другие изменения под API V3

* Карточки-кнопки создаются через `params.module = Lampa.Maker.module('Card').only('Card','Callback')` вместо `createInstance`. В v3 в `createInstance` использовался `this`, а это объект `params`, а не данные карточки.
* В V3 `card.html` — нативный `Element` (`Template.js`), поэтому иконки вставляются через DOM, а не через jQuery.
* Боковое меню: кнопки «SURS / KIDS / RUS» добавляются через `Lampa.Menu.addButton` (новое в 3.0).
* Свою кнопку «Главная» плагин больше не подменяет. В V3 штатная кнопка сама перезагружает главную (`Activity.replace()`), а если вы на другом экране — открывает главную текущего источника.
* Запросы TMDB идут через `tmdb.get(..., {life})` с кешем Lampa 3 (6 часов; работает, если в Lampa включено кеширование запросов). Логотипы стримингов кешируются на 7 дней.
* Настройки пересобираются при каждом открытии меню настроек (`SettingsApi.removeParams` + `addParam`), как это делает сам Lampa для `ContentRows`. Для NEW / KIDS / RUS блоки фильтров просто не добавляются: DOM-хак со скрытием элементов по тексту заголовков больше не нужен.
* Регистрация источников — простым присваиванием в `Lampa.Api.sources`, без `Object.defineProperty`.
* Глобальный объект `window.SURS` (`settings`, `sourceNames`, `isSursSource`, `openMain`) и событие `Lampa.Listener.send('surs', {type:'ready'})` для модулей.

## Исправленные ошибки v3

| Где | Было | Стало |
|---|---|---|
| Фильтр «Кириллица в карточке» | меню писало в настройки профиля, фильтр читал глобальный `Storage 'cirillic'`, поэтому переключатель ни на что не влиял | читается настройка профиля |
| «Исключение азиатских жанров» | меню писало `without_keywords`, фильтр читал `withoutKeywords`, поэтому настройка не работала | один ключ (старый учитывается как запасной) |
| KIDS: все ряды стримингов/жанров | `sort.key` (не существует) давал `sort_by=undefined` | `sort.id` |
| KIDS: «Анимация» | один ряд вызывал колбэк по разу на каждую сортировку, а `partNext` ожидает один вызов | отдельный ряд на каждую сортировку |
| KIDS: «Топ по жанру» | один ряд вызывал колбэк дважды (мир + RU) | два отдельных ряда |
| KIDS: новинки фильмов | дублировался `release_date.lte` | один диапазон дат |
| «Топ за 5 лет» | последний период жёстко `2020–2025` | периоды считаются до текущего года |
| Профили / старт | источник `NEW` не учитывался при начальной загрузке | учитываются все 4 |
| `adjustSortFor*` | мутировали общий объект сортировки | возвращают копию |
| `nav_buttons.refreshButtons` | `ContentRows.call('surs_buttons', {}, [])` ничего не делал | убран; новые внешние кнопки появляются при следующем открытии главной |

## Что сохранено без изменений

* Ключи хранилища: `surs_settings` (по профилям `lampac_profile_id`), `surs_name`, `surs_disableMenu`, `surs_disableCustomName`, `source`. Существующие настройки пользователей подхватятся.
* Имена источников `surs_mod*` и `<surs_name> NEW|KIDS|RUS`, логика профилей Levende (`surs`, `forKids`, `onlyRus`).
* Все подборки, списки стримингов и студий, переводы.
* Внешнее API кнопок: `window.surs_addExternalButton / surs_removeExternalButton / surs_clearExternalButtons / surs_getExternalButtons / surs_getAllButtons`.

## Что проверено

Прогон в Node на заглушке Lampa: `ContentRows` и `Api.partNext` повторяют логику `lampa-source`, TMDB заменён заглушкой.

* все 4 источника полностью выгружаются по порциям: SURS ≈211 рядов, NEW 81, KIDS ≈220, RUS 65;
* ни один URL не содержит `undefined/NaN/null`, нет непереведённых заголовков;
* ни один ряд не вызывает колбэк дважды;
* фильтры (`minVotes`, возраст, ключевые слова) попадают в URL;
* боковое меню и переключение по профилю работают.

**В реальной Lampa 3 не проверялось.** Перед выкладкой в `v3/` стоит проверить на устройстве:

* внешний вид кнопок и логотипов;
* случайную позицию рядов стримингов;
* меню настроек.
