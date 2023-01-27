import * as React from 'react';

export const useClickOutside = (onClick: any) => {
    const ref = React.useRef<any>(null);

    React.useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClick();
            }
        }

        document.addEventListener('click', handleClickOutside, { capture: true });

        return () => document.removeEventListener('click', handleClickOutside, { capture: true })
    }, [])

    return ref;
}