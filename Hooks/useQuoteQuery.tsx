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
            if (data.status === 200) {
                const res = await data.json()
                console.log('quote', res)
                setData(res)
            } else {
                setData(undefined)
            }
            setLoading(false)
        }

        fetchQuote()
    }, [search])

    return [data, isLoading]
}

export interface QuoteData {
    id: number
    anime: string
    character: string
    quote: string
}


export function useAnimeQuoteQuery(search: string): [QuoteData[] | undefined, boolean] {

    const [data, setData] = useState<QuoteData[]>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        async function fetchQuote() {
            const data = await fetch(`https://animechan.vercel.app/api/quotes/anime?title=${search}`)
            if (data.status === 200) {
                const res = await data.json()
                console.log('quote', res)
                setData(res)
            } else {
                setData(undefined)
            }
            setLoading(false)
        }

        fetchQuote()
    }, [search])

    return [data, isLoading]
}
