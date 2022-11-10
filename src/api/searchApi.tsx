export const searchFunc = (search: string, data: [], keys: Array<string>) => {
    if (search === '') { return data; }
    else {
        return data ? data.filter((a) => {
            let phrase: String[] = [];
            for (const val of keys) {
                let keyVal = a;
                for (const key of val.split('/')) {
                    keyVal = keyVal?.[key];
                }
                if (keyVal !== undefined) { phrase.push(keyVal); }
            }

            const addedPhrase = phrase.join(' ').toLowerCase();
            return addedPhrase.includes(search.toLowerCase());
        }) : data;
    }
}