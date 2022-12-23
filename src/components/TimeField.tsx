import { clsName, FieldBox } from './FieldBox';

export const TimeField = ({ title, value, setValue }: any) => {

    return (
        <FieldBox title={title}>
            <input type='time' value={value} onChange={(e) => setValue(e.target.value)}
                className={clsName} />
        </FieldBox>
    )
};

TimeField.displayName = 'TimeField';