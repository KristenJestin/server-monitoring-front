// imports
import { reactive, toRefs } from 'vue'

// config
const STORAGE_NAME = 'dark-mode'

// main
const loadStorage = () => {
    const item = localStorage.getItem(STORAGE_NAME)
    if (!item)
        // check from system
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    return item === 'true'
}

const state = reactive({ dark: loadStorage() })

const useDarkMode = () => {
    const changeDarkMode = (dark: boolean) => {
        state.dark = dark

        // save
        localStorage.setItem(STORAGE_NAME, dark.toString())
    }

    return {
        darkMode: toRefs(state),
        changeDarkMode,
    }
}

// exports
export default useDarkMode
