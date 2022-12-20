import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import * as React from 'react'

export const InfoBox = ({ children }: { children: any }) => {
    return (
        <div className={`p-3 font-medium rounded bg-zinc-100 text-zinc-700`}>{children}</div>
    )
}

InfoBox.displayName = 'InfoBox';

export const InfoBoxDisclosure = ({ children }: { children: any }) => {
    const ref = React.useRef<HTMLDListElement>(null);
    const showIcon = ref.current && (ref?.current?.scrollWidth > ref?.current?.offsetWidth);

    return (
        <div className="w-full">
            <div className="w-fit max-w-md rounded-xl" style={{ maxWidth: 'min(100%, 800px)' }}>
                <Disclosure>
                    {({ open }) => (
                        <Disclosure.Button className={`flex w-full justify-between rounded-lg bg-zinc-100 px-4 py-2 text-left font-medium text-zinc-700 hover:bg-zinc-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-800 focus-visible:ring-opacity-75
                            ${showIcon ? '' : 'pointer-events-none'}`}>
                            <span className={`text-ellipsis overflow-hidden ${open ? '' : 'whitespace-nowrap'}`} ref={ref}>{children}</span>
                            {showIcon && <div className="w-fit h-fit ml-4"><ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-zinc-700`} /></div>}
                        </Disclosure.Button>
                    )}
                </Disclosure>
            </div>
        </div>
    )

}

InfoBoxDisclosure.displayName = 'InfoBoxDisclosure';