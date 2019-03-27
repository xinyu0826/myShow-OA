/**
 * token模块
 */
const TOKEN_KEY = 'token'
const localStorage = window.localStorage

export const getItem = () => localStorage.getItem(TOKEN_KEY)

export const setItem = token => localStorage.setItem(TOKEN_KEY, token)

export const removeItem = () => localStorage.removeItem(TOKEN_KEY)
