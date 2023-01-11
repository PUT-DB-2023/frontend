import { FieldBox } from './FieldBox';

interface ISwitch {
    title?: string;
    value: any;
    setValue: any;
    leftText: string;
    rightText: string;
}

export const Switch = ({ title, value, setValue, leftText, rightText }: ISwitch) => {
    return (
        <FieldBox title={title}>
            <div className='flex items-center relative gap-2 bg-white'>
                <div>{leftText}</div>
                <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={value} onChange={() => setValue(!value)}/>
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-800"></div>
                </label>
                <div>{rightText}</div>
            </div>
        </FieldBox>
    )
};

Switch.displayName = 'Switch';