import { ButtonType } from "types";
import { Button } from "./Button";

interface IErrorFallback {
    error?: any;
    resetErrorBoundary?: any;
  }
  
  export const ErrorFallback = ({error, resetErrorBoundary} : IErrorFallback) => {
    let message = ''

    if (error?.response?.status === 400) {
      message = 'Błędne zapytanie.'
    }
    else if (error?.response?.status === 403) {
      message = 'Nie masz wystarczających uprawnień, aby wyświetlić tą stronę.'
    }
    else if (error?.response?.status === 404) {
      message = 'Nie znaleziono takiej strony.'
    }
    else if (error?.response?.status === 500) {
      message = 'Błąd serwera.'
    }
    else {
      message = 'Coś poszło nie tak :('
    }
    
    return (
      <div className='w-full h-full flex gap-12 flex-col justify-center items-center' role="alert">
        <div className='flex flex-col gap-4 justify-center items-center'>
          {error?.response?.status ? <h1 className="text-3xl text-red-500 font-bold"> {error?.response?.status} </h1> : null}
          <h2 className="text-xl text-red-500 font-semibold"> {message} </h2>
        </div>
        <Button type={ButtonType.ACTION} onClick={() => window.location.assign(window.location.origin)} text='Powrót na stronę główną' />
    </div>
    );
  };