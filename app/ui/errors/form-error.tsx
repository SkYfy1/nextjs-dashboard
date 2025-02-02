import React from 'react'

const FormError = ({ error, id }: { error: string[] | undefined | string, id: string }) => {
    if (id === 'fields-error') {
        return (
            <div id={id} aria-live="polite" aria-atomic="true" >
                <p className="mt-2 text-sm text-red-500">{error}</p>
            </div>
        )
    } else if (typeof error === "object") {
        return (
            <div id={id} aria-live="polite" aria-atomic="true">
                {error?.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
            </div>
        )
    }
}

export default FormError
