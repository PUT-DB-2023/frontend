export const objectMap = (obj: any, fn: any) =>
Object.fromEntries(
    Object.entries(obj).map(
        ([k, v], i) => [k, fn(v, k, i)]
    )
)