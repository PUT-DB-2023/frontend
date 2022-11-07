import { SortOptions } from 'types'

export const sortFunc = (data: any, sort: SortOptions) => {
    return data ? [...data].sort((a: any, b: any) => {
        let aVal = a;
        let bVal = b;
        const field = sort.field.split('/');
        for (const val of field) {
            aVal = aVal?.[val];
            bVal = bVal?.[val];
        }
        if(!aVal || !bVal) {
            return 0
        }

        if (!isNaN(aVal) && !isNaN(aVal)) {
            return sort.asc ? aVal - bVal : bVal - aVal;
        } else {
            const strA: String = aVal.toLowerCase();
            const strB: String = bVal.toLowerCase();
            if (strA > strB) {
                return sort.asc ? 1 : -1;
            } else if (strA < strB) {
                return sort.asc ? -1 : 1;
            } else {
                return 0;
            }
        }
    }) : data;
}