import { Paper, Box, Stack, Title, Badge, Button, Group, Text, Anchor, Tooltip } from '@mantine/core'
import { IconCashBanknote, IconCalendar } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createObject, getReadableTokenBalance, getTimezone } from '../../configs/appfunctions'
import bodyStyles from '../styles/bodyStyles'
import { campaign_keys } from '../../configs/appconfig'

const CampaignCard = (props) => {
    const { details } = props;
    const { theme } = bodyStyles()

    const [tokenDetails, setTokenDetails] = useState(null)

    const data = createObject(campaign_keys, details)
    const getTokenMetadata = () => {

    }

    useEffect(() => {
        getTokenMetadata()
    }, [])

    return (
        <Paper radius="lg" sx={{
            overflow: "hidden !important",
            border: "none"
        }}>

            <Box sx={{
                height: "300px",
                position: "relative",
                // borderRadius: theme.radius.lg,
            }}>
                <img loading='lazy' src={data?.image ? data?.image : "https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBmb3Jlc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        aspectRatio: "16/9",

                    }} />
                <Box p="lg" sx={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    background: theme.fn.linearGradient(180, "rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 1)"),
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end"

                }}>
                    <Stack className='w-100' spacing={10}>
                        <Title order={2} color="white" sx={{ textTransform: "capitalize" }} align="center">{data?.title}</Title>
                        <Badge sx={{ width: "fit-content" }} mx="auto" variant='light'>Target: {getReadableTokenBalance(data?.total?.toString(), tokenDetails?.decimals ?? 18)} / {getReadableTokenBalance(data?.target?.toString(), tokenDetails?.decimals ?? 18)}  {tokenDetails?.symbol ?? "ETH"}</Badge>
                        <Anchor to={`/campaigns/${data?.id}`} component={Link} mx="auto">
                            <Button sx={{ width: "fit-content" }} radius="xl" px="xl" color="indigo" leftIcon={<IconCashBanknote />}>Donate</Button>
                        </Anchor>
                        <Group position='apart' align="center" spacing={0}>
                            <Tooltip label={getTimezone(data.start_date)} color="lime" withArrow>
                                <Group align="center" spacing={2}>
                                    <IconCalendar color="white" />
                                    <Text size="xs" color="white">{new Date(data?.start_date).toDateString()}</Text>
                                </Group>
                            </Tooltip>
                            <Tooltip label={getTimezone(data.end_date)} color="lime" withArrow>
                                <Group align="center" spacing={2}>
                                    <IconCalendar color="white" />
                                    <Text size="xs" color="white">{new Date(data?.start_date).toDateString()}</Text>
                                </Group>
                            </Tooltip>
                        </Group>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    )
}

export default CampaignCard