import React, { useState, useEffect } from 'react'
import { Button, Group, Modal, Paper, Stack, Text, Title } from '@mantine/core'
import { getTheme } from '../../configs/appfunctions';
import bodyStyles from '../styles/bodyStyles';
import { Loader } from '@mantine/core';
import { contract } from '../../utils/config';
import { IconAlertCircle, IconAlertTriangle } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

const BecomePartnerModal = (props) => {

    const { partners_, id } = props

    const [partners, setPartners] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [accPartners, setAccPartners] = useState([])

    const { theme, classes } = bodyStyles()

    const loadSinglePartner = async (id) => {
        return await contract?.methods?.getPartner(id).call()
    }

    const getAccountPartners = async () => {
        const accounts = await window?.ethereum?.request({ method: "eth_requestAccounts" });
        if (accounts?.length < 1) {
            showNotification({
                message: "Connect your wallet and reload the page"
            })
            return
        }
        const account = accounts[0];

        contract?.methods?.getAccountPartners().call({
            from: account,
        }).then((res) => {
            const accPartnersQueries = res?.map(partnerID => loadSinglePartner(partnerID))
            Promise.allSettled(accPartnersQueries).then(res => {
                const accp = res.map(a => a.value)
                setAccPartners(accp)
            }).catch(err => {
                console.log(err)
            })
        }).catch((err) => {
            console.error("Error: ", err)
        })
    }

    const registerPartner = async (partner_id) => {
        const accounts = await window?.ethereum?.request({ method: "eth_requestAccounts" });
        const account = accounts[0];

        contract?.methods?.registerCampaignPartner(id, partner_id)
            .send({ from: account, gas: 2000000 }).then((data) => {
                // form.reset()
                showNotification({
                    message: "Registering Campaign Partner Successful!",
                    color: "green",
                    icon: <IconAlertCircle />
                })
            }).catch((e) => {
                showNotification({
                    message: "Registering Campaign Partner failed!!",
                    color: "red",
                    icon: <IconAlertTriangle />
                })
            }).finally(() => {
                setLoading(false)
            })
    }

    const checkIfExists = (id) => {
        return partners_?.some((x) => x.id === id);
    }

    useEffect(() => {
        getAccountPartners()
    }, [])
    return (
        <>
            <Button radius="xl" color="indigo" my="xl" onClick={() => setModalOpen(true)}>Become partner</Button>
            <Modal radius="lg" title="Register as a partner" opened={modalOpen} onClose={() => setModalOpen(false)}
                styles={{
                    modal: {
                        background: getTheme(theme) ? theme.colors.dark[9] : "#d3d6e9"
                    }
                }}
                overlayBlur={2}
                overlayOpacity={0.3} overflow="inside">
                <Text size="sm" className={classes.text}>
                    When become a partner you get a chance to be voted and if you become the top most partner,
                    you get a chance to effect this project. This means you are going to run the project as per the
                    project aim and description.
                </Text>

                <Stack spacing={4} my="xl">
                    {
                        accPartners?.map((partner, i) => (
                            <Paper key={`partner_${i}`} radius="md" p="md" sx={{
                                background: getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0]
                            }}>
                                <Group align="center" position="apart">
                                    <Title order={4} weight={400} className={classes.text}>{partner?.name}</Title>
                                    <Button size='sm' radius="xl"
                                        color="indigo"
                                        onClick={() => registerPartner(partner?.id)}
                                        rightIcon={loading ? <Loader size={16} color="white" /> : null}
                                        disabled={checkIfExists(partner?.id)}>
                                        {
                                            checkIfExists(partner?.id) ? "Aready registered" : "Register"
                                        }
                                    </Button>
                                </Group>
                            </Paper>
                        ))
                    }
                </Stack>

            </Modal>
        </>
    )
}

export default BecomePartnerModal