import {Dispatch, SetStateAction, useState} from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    if (window.localStorage.getItem(key) === null) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    function setValue(value: T | ((previousState: T) => T)) {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    }

    return [storedValue, setValue];
}

export default useLocalStorage;
