import { SortOptions } from 'types'

export const sortCourses = (data: any, sort: SortOptions) => {
    return [...data].sort((a: any, b: any) => {
        const aVal = a?.[sort.field] ? a[sort.field] : 0;
        const bVal = b?.[sort.field] ? b[sort.field] : 0;

        if (!isNaN(aVal) && !isNaN(aVal)) {
            return sort.asc ? aVal - bVal : bVal - aVal;
        } else {
            const strA: String = aVal.toLowerCase();
            const strB: String = bVal.toLowerCase();
            if(strA > strB) {
                return sort.asc ? 1 : -1;
            } else if (strA < strB) {
                return sort.asc ? -1 : 1;
            } else {
                return 0;
            }
        }
    });
}
