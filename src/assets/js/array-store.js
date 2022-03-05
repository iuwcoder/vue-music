import storage from 'good-storage'

function inerArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 存储
export function save(item, key, compare, maxLen) {
  const items = storage.get(key, [])
  inerArray(items, item, compare, maxLen)
  storage.set(key, items)
  return items 
}
export function saveID(item, key, compare) {
  const items = storage.get(key, '')
  inerArray(items, item, compare)
  storage.set(key, items)
  return items 
}

// 移除
export function remove(key, compare) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

// 获取本地存储的列表
export function load(key) {
  return storage.get(key, [])
}

// 清空
export function clear(key) {
  storage.remove(key)
  return[]
}
