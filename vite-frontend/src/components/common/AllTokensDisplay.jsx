import { Avatar, Center, Group, HoverCard, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { getTheme, limitText } from '../../configs/appfunctions'
import { Stack, Box } from '@mantine/core';
import bodyStyles from '../styles/bodyStyles';

const AllTokensDisplay = () => {
    const [tokens, setTokens] = useState([])

    const { classes, theme } = bodyStyles()

    const getTokens = () => {
    }

    useEffect(() => {
        getTokens()
    }, [])

    return (
        <div>
            <Group spacing={20} align="center" p="xs" position='center'>
                {
                    tokens.map((token, i) => (
                        <Box key={token?.address} sx={{
                            width: "100px",
                            borderRadius: theme.radius.md,
                            ":hover": {
                                background: getTheme(theme) ? theme.colors.dark[8] : "#d3d6e9",
                            }
                        }}
                        >
                            <HoverCard width={280} shadow="md" radius="lg" withArrow arrowSize={16}>
                                <HoverCard.Target>
                                    <Center className='h-100' sx={{ cursor: "pointer" }} p="xs">
                                        <Stack align="center" className='w-100' spacing={10}>
                                            <Avatar size="sm" src={token?.icon} sx={{ textTransform: "capitalize" }}>
                                                {token?.symbol.substring(0, 1)}
                                            </Avatar>
                                            <Text size="sm">{limitText(token?.symbol, 10)}</Text>
                                        </Stack>
                                    </Center>
                                </HoverCard.Target>
                                <HoverCard.Dropdown sx={{
                                    background: getTheme(theme) ? theme.colors.dark[8] : "#d3d6e9",
                                }}>
                                    <Center className='h-100'>
                                        <Stack align="center" className='w-100' spacing={0}>
                                            <Avatar size="sm" src={token?.icon} sx={{ textTransform: "capitalize" }}>
                                                {token?.symbol.substring(0, 1)}
                                            </Avatar>
                                            <Text size="md" className={classes.text}>{token?.symbol}</Text>
                                            <Text size="xs" className={classes.text}>{token?.address}</Text>
                                            <Text size="sm" className={classes.text}>{token?.name}</Text>
                                        </Stack>
                                    </Center>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        </Box>
                    ))
                }
            </Group>
        </div>
    )
}

export default AllTokensDisplay
