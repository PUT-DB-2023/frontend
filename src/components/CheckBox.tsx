interface ICheckBox {
    title: any;
    value: any;
    setValue: any;
}

export const CheckBox = ({ title, value, setValue }: ICheckBox) => {

    return (
        <div className='flex gap-2 items-center'>
            {title}
            <input type="checkbox" checked={value} onChange={() => setValue(!value)} className="w-4 h-4 text-blue-600 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"></input>
        </div>
    )
};

CheckBox.displayName = 'CheckBox';