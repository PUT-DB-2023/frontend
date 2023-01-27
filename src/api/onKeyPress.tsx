export const onKeyPress = (event: any, handle: (() => void) | undefined, keys: string[]) => {
    const key: string = event.key;
    if (keys.includes(key)) {
        handle && handle();
    }
}

export const onEnterPress = (event: any, handle: (() => void) | undefined) => {
    onKeyPress(event, handle, ['Enter']);
}