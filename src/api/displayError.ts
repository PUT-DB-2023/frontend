export const displayError = (error: any) => {
    console.log('displayError', error);
    
    let errorMessage = ''
    for (const value of Object.values(error)) {
        errorMessage += value + ' '
    }
    return errorMessage
}