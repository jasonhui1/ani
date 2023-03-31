// import Image from 'next/image';
import { useState, useEffect, useRef } from 'react'
import useMediaQuery from '../../Hooks/useMediaQuery';
import { useAnimeQuoteQuery } from '../../Hooks/useQuoteQuery';
import { Image, Box, Button, Container, Flex, Heading, Input, ListItem, OrderedList, Divider } from '@chakra-ui/react'

export default function Search() {

    const [tempSeachTerm, setTempSeachTerm] = useState('fate/zero')
    const [searchTerm, setSearchTerm] = useState<string>('fate/zero')
    const [quotes, isQuoteLoading] = useAnimeQuoteQuery(searchTerm)
    const [animeData, isLoading] = useMediaQuery(searchTerm)

    return (
        <Container maxW='6xl'>
            <Flex>
                <Box >
                    <Input mt='5' mb='3' type='text' value={tempSeachTerm} onChange={(e) => setTempSeachTerm(e.target.value)} />
                    <Button onClick={() => setSearchTerm(tempSeachTerm)}>Search</Button>

                    {isLoading ? <Heading>Loading</Heading> : (
                        <>
                            {animeData ? (
                                <Box>

                                    <Heading>{animeData.title.native} {animeData.title.english} </Heading>
                                    <Flex gap='8'>

                                        <Image objectFit='contain' src={animeData.coverImage.extraLarge} alt='coverImage' width={500} height={700}></Image>
                                        <Box>
                                            {animeData.description.split('\n').map((str, i) => <p key={i}>{str}</p>)}
                                        </Box>
                                    </Flex>
                                    {animeData.trailer && (
                                        <Box w='full'>
                                            <Heading> Trailer </Heading>

                                            {animeData.trailer.site === 'youtube' && (
                                                <YoutubeEmbed id={animeData.trailer.id} />
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            ) : <p>Not found</p>}
                        </>
                    )}

                    <Divider my='5' />

                    <Heading mb='5'> Quotes </Heading>
                    {isQuoteLoading ? <Heading>Loading Quotes</Heading> : (
                        quotes ? (
                            <Box>
                                <OrderedList>
                                    {quotes.map((quote, index) => (
                                        <ListItem key={index}>{quote.character}: {quote.quote}</ListItem>
                                    ))}
                                </OrderedList>
                            </Box>
                        ) : (
                            <p>No quotes found </p>
                        )
                    )}
                </Box>
            </Flex>
        </Container>
    )
}


interface EmbedUrl {
    id: string;
}

function YoutubeEmbed({ id }: EmbedUrl): JSX.Element {

    return (
        <iframe width="800" height="450"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen>
        </iframe>
    )
}