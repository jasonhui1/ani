import { useState, useEffect } from 'react'

export interface QuoteData {
    id: number
    anime: string
    character: string
    quote: string
}


export function useCharacterQuoteQuery(search: string): [QuoteData[] | undefined, boolean] {

    const [data, setData] = useState<QuoteData[]>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        async function fetchQuote() {
            const data = await fetch(`https://animechan.vercel.app/api/quotes/character?name=${search}`)
            const res = await data.json()
            console.log('quote', res)
            setData(res)
            setLoading(false)
        }

        fetchQuote()
    }, [search])

    return [data, isLoading]
}
