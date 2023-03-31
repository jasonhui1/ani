// import Image from 'next/image';
import { useState, useEffect, useRef } from 'react'
import { useCharacterQuoteQuery } from '../../Hooks/useQuoteQuery';
import useCharacterQuery from '../../Hooks/useCharacterQuery';
import { Image, Box, Button, Container, Flex, Heading, Input, ListItem, OrderedList, Divider } from '@chakra-ui/react'

export default function Character() {

    const [tempSeachTerm, setTempSeachTerm] = useState('eren')
    const [searchTerm, setSearchTerm] = useState<string>('eren')
    const [character, isCharacterLoading] = useCharacterQuery(searchTerm)
    const [quotes, isQuoteLoading] = useCharacterQuoteQuery(searchTerm)

    return (
        <Container maxW='6xl'>
            <Flex>
                <Box >
                    <Input mt='5' mb='3' type='text' value={tempSeachTerm} onChange={(e) => setTempSeachTerm(e.target.value)} />

                    <Button onClick={() => setSearchTerm(tempSeachTerm)}>Search</Button>

                    {isCharacterLoading ? <h1>Loading Character</h1> : (
                        character ? (
                            <Box>
                                <Heading my='5'>{character.name.native} {character.name.full} </Heading>
                                <Flex gap='8'>

                                    <Image objectFit='contain' src={character.image.large} alt='characterImage'></Image>
                                    <Box>

                                        {character.description.split('\n').map((str, i) => <p key={i}>{str}</p>)}
                                    </Box>
                                </Flex>
                            </Box>
                        ) : (
                            <p>No character found </p>
                        )
                    )}

                    <Divider my='5' />

                    <Heading mb='5'> Said </Heading>
                    {isQuoteLoading ? <h1>Loading sayings</h1> : (
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
