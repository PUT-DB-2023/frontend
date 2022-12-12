export const InfoBox = ({children}: {children: any}) => {
    return (
        <div className={`mx-1 p-3 font-medium rounded bg-zinc-100 text-zinc-700`}>{children}</div>
    )
}

InfoBox.displayName = 'InfoBox';