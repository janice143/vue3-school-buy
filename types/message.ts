
interface Iwarn{
    icon: string,
    color: string,
    backgroundColor: string,
    borderColor: string,
}

export interface Istyle{
    warn: Iwarn,
    error: Iwarn,
    success: Iwarn
}
