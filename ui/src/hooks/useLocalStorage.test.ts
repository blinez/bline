import {renderHook, act} from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it.each`
        type        | value
        ${'string'} | ${'someString'}
        ${'null'}   | ${null}
        ${'number'} | ${5}
        ${'object'} | ${{count: 3}}
        ${'array'}  | ${['hello', 'world']}
    `('should store $type as initial value', ({value}) => {
        const {result} = renderHook(() => useLocalStorage('someKey', value));

        const [valueFromHook, _] = result.current;
        expect(valueFromHook).toStrictEqual(value);

        const valueFromStorage = window.localStorage.getItem('someKey');
        expect(JSON.parse(valueFromStorage!!)).toStrictEqual(value);
    });

    it('should set a new value', () => {
        const {result} = renderHook(() => useLocalStorage('someKey', 'someString'));
        const [_, setValue] = result.current;

        act(() => {
            setValue('newValue');
        });

        const [value, ignore] = result.current;

        expect(value).toStrictEqual('newValue');

        const valueFromStorage = window.localStorage.getItem('someKey');
        expect(JSON.parse(valueFromStorage!!)).toStrictEqual('newValue');
    });

    it('should set a new value using a function', () => {
        const {result} = renderHook(() => useLocalStorage('someKey', 'someString'));
        const [_, setValue] = result.current;

        act(() => {
            setValue(() => 'newValue');
        });

        const [value, ignore] = result.current;

        expect(value).toStrictEqual('newValue');

        const valueFromStorage = window.localStorage.getItem('someKey');
        expect(JSON.parse(valueFromStorage!!)).toStrictEqual('newValue');
    });
});
