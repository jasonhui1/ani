import Image from 'next/image';
import { useState, useEffect, useRef } from 'react'
import useMediaQuery from '../../Hooks/useMediaQuery';
import { useAnimeQuoteQuery } from '../../Hooks/useQuoteQuery';
import { Box, Button, Container, Flex, Heading, Input, ListItem, OrderedList } from '@chakra-ui/react'

export default function Search() {

    const [tempSeachTerm, setTempSeachTerm] = useState('fate/zero')
    const [searchTerm, setSearchTerm] = useState<string>('fate/zero')
    const [quotes, isQuoteLoading] = useAnimeQuoteQuery(searchTerm)
    const [data, isLoading] = useMediaQuery(searchTerm)

    return (
        <Container maxW='6xl'>
            <Flex>
                <Box >
                    <Input mt='5' mb='3' type='text' value={tempSeachTerm} onChange={(e) => setTempSeachTerm(e.target.value)} />
                    <Button onClick={() => setSearchTerm(tempSeachTerm)}>Search</Button>

                    {isLoading ? <h1>Loading</h1> : (
                        <>
                            {data ? (
                                <Box>
                                    <Heading>{data.title.native} {data.title.english} </Heading>
                                    <Image src={data.coverImage.extraLarge} alt='coverImage' width={500} height={700}></Image>
                                </Box>
                            ) : <p>Not found</p>}
                        </>
                    )}

                    {isQuoteLoading ? <h1>Loading Quotes</h1> : (
                        quotes ? (
                            <Box>
                                <Heading my='5'> Quotes </Heading>
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
