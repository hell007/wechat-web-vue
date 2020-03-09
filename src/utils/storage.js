import store from 'storejs'

export function set(key, val) {
	store.set(key, val)
}

export function get(key) {
	return store.get(key)
}
export function has(key) {
  return store.has(key)
}

export function remove(key) {
	return store.remove(key)
}

export function clear() {
	return store.clear()
}

export function hasToken() {
	return store.has('token')
}

export function getToken() {
  return get('token')
}
