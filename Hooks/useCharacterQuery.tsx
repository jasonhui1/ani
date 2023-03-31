import { useState, useEffect } from 'react'

export interface CharacterData {
    id: number
    name: {
      full: string
      native: string
    }
    image: {
      large: string
    }
    description:string
    siteUrl:string
  }

  
const query = `
  query ($search: String) { # Define which variables will be used in the query (id)
    Character (search: $search) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      name {
        full
        native
      }
      image {
        large
      }
      description
      siteUrl
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



export default function useCharacterQuery(search: string): [CharacterData | undefined, boolean] {

  const [data, setData] = useState<CharacterData>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function fetchAnime() {
      const data = await fetch(url, options({ search: search }))
      if (data.status === 200) {
        const res = await data.json()
        setData(res.data.Character)

      } else {
        setData(undefined)
      }

      setLoading(false)
    }

    fetchAnime()
  }, [search])

  return [data, isLoading]
}






