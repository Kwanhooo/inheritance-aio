export function getSessionStorage(key) {
    return sessionStorage.getItem(key)
}

export function setSessionStorage(key, value) {
    return sessionStorage.setItem(key, value)
}

export function removeSessionStorage(key) {
    return sessionStorage.removeItem(key)
}
