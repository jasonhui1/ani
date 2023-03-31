import { useState, useEffect } from 'react'

export interface AnimeData {
  id: number
  title: {
    english: string
    native: string
  }
  description:string
  coverImage: {
    extraLarge: string
  }
  trailer: {
    id:string
    site:string
  }
}

const query = `
  query ($search: String) { # Define which variables will be used in the query (id)
    Media (search: $search, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
          extraLarge
      }
      trailer {
        id
        site
      }
    }
  }
`;

// Define the config we'll need for our Api request
interface OptionVariables {
  [key: string]: any;
}

var url = 'https://graphql.anilist.co'
const options = (variables: OptionVariables) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }
};




export default function useMediaQuery(search: string): [AnimeData | undefined, boolean] {

  const [data, setData] = useState<AnimeData>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function fetchAnime() {
      const data = await fetch(url, options({ search: search }))
      if (data.status === 200) {
        const res = await data.json()
        setData(res.data.Media)

      } else {
        setData(undefined)
      }

      setLoading(false)
    }

    fetchAnime()
  }, [search])

  return [data, isLoading]
}






