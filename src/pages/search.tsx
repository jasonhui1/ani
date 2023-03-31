import Image from 'next/image';
import { useState, useEffect, useRef } from 'react'
import useMediaQuery from '../../Hooks/useMediaQuery';
import { useCharacterQuoteQuery } from '../../Hooks/useQuoteQuery';
import { Box, Button, Container, Flex, Heading, Input, ListItem, OrderedList } from '@chakra-ui/react'


export default function Search() {

    const [tempSeachTerm, setTempSeachTerm] = useState('SPY')
    const [searchTerm, setSearchTerm] = useState<string>('SPY')
    const [data, isLoading] = useMediaQuery(searchTerm)
    const [quotes, isQuoteLoading] = useCharacterQuoteQuery('hachiman')

    return (
        <Container>
            <Flex>
                <Box >
                    <Input mt='5' mb='3' type='text' value={tempSeachTerm} onChange={(e) => setTempSeachTerm(e.target.value)} />
                    <Button onClick={() => setSearchTerm(tempSeachTerm)}>Search</Button>

                    {isLoading ? <h1>Loading</h1> : (
                        <>
                            {data ? (
                                <Box>
                                    <Heading>{data.title.native} {data.title.english} </Heading>
                                    <p>{data.id}</p>
                                    <Image src={data.coverImage.extraLarge} alt='coverImage' width={500} height={700}></Image>
                                </Box>
                            ) : <p>Not found</p>}
                        </>
                    )}
                </Box>



                {/* 
                <Box >
                    <Input mt='5' mb='3' type='text' value={tempSeachTerm} onChange={(e) => setTempSeachTerm(e.target.value)} />
                    <Button onClick={() => setSearchTerm(tempSeachTerm)}>Search</Button>
                    {data &&
                        <Box>
                            <Heading>{data.title.native} {data.title.english} </Heading>
                            <p>{data.id}</p>
                            <Image src={data.coverImage.extraLarge} alt='coverImage' width={500} height={700}></Image>
                        </Box>
                    }
                </Box> */}
            </Flex>
            {quotes && (
                <OrderedList>
                    {quotes.map((quote, index) => (
                        <ListItem key={index}>{quote.quote}</ListItem>
                    ))}
                </OrderedList>
            )}
        </Container>
    )
}
