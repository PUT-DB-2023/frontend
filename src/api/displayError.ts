export const displayError = (error: any) => {
    let errorMessage = ''
    for (const value of Object.values(error)) {
        errorMessage += value + ' '
    }
    return errorMessage
}