export const clsName = 'rounded-lg p-1 border border-zinc-400 hover:border-zinc-600 focus-visible:border-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:ring-offset-0';
export const clsNameWrong = 'rounded-lg p-1 border-2 border-red-400 hover:border-red-600 focus-visible:border-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-800 focus-visible:ring-offset-0';
export const clsTextWrong = 'text-red-400 text-sm font-medium';

interface IFieldBox {
    title?: any;
    cls?: string;
    children?: any;
}

export const FieldBox = ({ title, cls, children }: IFieldBox) => {
    return (
        <div className={`${cls} flex flex-col px-4 w-full gap-1 my-2 relative [&>input]:rounded-[4px] [&>input]:bg-zinc-50 [&>textarea]:bg-zinc-50 [&>input]:h-9 [&>div]:h-9`}>
            {title ? <span className='font-semibold'>{title}</span> : null}
            {children}
        </div>
    )
};

FieldBox.displayName = 'FieldBox';