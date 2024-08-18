import React, { useEffect, useMemo, useState } from "react"
import { Button, Text, Loader, TextInput, Group, Alert, Center, Avatar, Stack, Title, Grid, Container, Paper } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { IconAlertCircle, IconCheck, IconDownload, IconSearch } from "@tabler/icons"
import { useLocation } from "react-router-dom"
import bodyStyles from "../styles/bodyStyles"
import { getTheme } from "../../configs/appfunctions"

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const ImportTokenModal = (props) => {
    const [tokenFound, setTokenFound] = useState(null)
    const [searchedToken, setSearchedToken] = useState("")
    const [error, setError] = useState(null)
    const [searching, setSearching] = useState(false)
    const [adding, setAdding] = useState(false)

    let query = useQuery();
    const { classes, theme } = bodyStyles()


    const getTokenMetadata = () => {

    }

    const registerContract = () => {
    }


    const importToken = () => {

    }

    const wait = useMemo(() => {
        return {
            q: query.get("transactionHashes")
        }
    }, [query])

    useEffect(() => {
        if (wait?.q) {
            showNotification({
                message: "Import successful",
                color: "green",
                icon: <IconCheck />
            })
        }
    }, [wait])

    return (
        <Container py="xl" size="lg">
            <Grid>
                {/* <Grid.Col md={6}></Grid.Col> */}
                <Grid.Col md={6} offsetMd={3}>
                    <Paper radius="lg" p="xs" py="xl" px="xl" sx={{
                        position: "relative",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[5]
                    }}>

                        <Stack>
                            <Title align='center' order={2} className={classes.subtitle}>Import Token</Title>
                            <Grid >
                                <Grid.Col xs={8}>
                                    <TextInput radius="md" value={searchedToken} onChange={e => setSearchedToken(e.target.value)} placeholder='Enter token address' />
                                </Grid.Col>
                                <Grid.Col xs={4}>
                                    <Button radius="xl" fullWidth onClick={getTokenMetadata} color="primary" leftIcon={<IconSearch />}>
                                        SEARCH
                                    </Button>
                                </Grid.Col>
                            </Grid>
                            <div className="py-3">
                                {searching && (
                                    <div className="d-flex justify-content-center py-2">
                                        <Loader variant='bars' />
                                    </div>
                                )}
                                {
                                    !searching && tokenFound && !error && (
                                        <>
                                            <Title order={4} align="start" my="md" className={classes.text}>{searchedToken}</Title>
                                            <Group className="row">
                                                <Avatar src={tokenFound?.icon} size="lg" />
                                                <Stack spacing={0}>
                                                    <Text>{tokenFound?.name}</Text>
                                                    {/* <Text size="sm">{searchedToken}</Text> */}
                                                    <Text size="xs">{tokenFound?.symbol}</Text>
                                                    <Text size="sm">Decimals: {tokenFound?.decimals}</Text>
                                                </Stack>
                                            </Group>
                                            <Center my="md">
                                                <Button radius="xl" fullWidth px="xl" color="purple" >Connect wallet</Button>
                                            </Center>
                                        </>
                                    )
                                }

                                {
                                    error && (
                                        <Alert icon={<IconAlertCircle size={16} />} title="Token not found" color="red">
                                            <Text className={classes.text}>
                                                The token address you entered above is not found. Please edit the address and try again.
                                            </Text>
                                        </Alert>
                                    )
                                }
                            </div>
                        </Stack>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default ImportTokenModal