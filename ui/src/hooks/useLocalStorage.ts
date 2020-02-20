import {Dispatch, SetStateAction, useState} from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {

    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);

            if (item === null) {
                window.localStorage.setItem(key, JSON.stringify(initialValue));
                return initialValue;
            } else {
                return JSON.parse(item);
            }
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    function setValue(value: T | ((previousState: T) => T)) {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setStoredValue(valueToStore);
        } catch (error) {
            console.log(error);
        }
    }

    return [storedValue, setValue];
}

export default useLocalStorage;
