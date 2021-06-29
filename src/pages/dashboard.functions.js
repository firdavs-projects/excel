import {storage} from '@core/utils';

function toHtml(key) {
  const model = storage(key)
  const created = new Date(+key.split(':')[1])
  const opened = new Date(model.openedDate)
  return `
    <li class="db__record">
        <a href="#${key.replace(':', '/')}">${model.title}</a>
        <strong>
            ${created.toLocaleDateString()}
            ${created.toLocaleTimeString()}
        </strong>
        <strong>
            ${opened.toLocaleDateString()}
            ${opened.toLocaleTimeString()}
        </strong>
    </li>
    `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createTableRecords() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `
      <br><p style="text-align: center">Вы пока не создали ни одной таблицы </p>
    `
  }

  return `
        <div class="db__list-header">
          <span class="name">Название</span>
          <span>Дата создания</span>
          <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHtml).join('')}
        </ul>
    `
}
