import { useEffect, useState } from 'react';
import {
    AppShell,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
    Group,
    Title,
    Button,
    Image,
    Divider,
    Drawer,
    Anchor,
    Stack,
    Text,
} from '@mantine/core';
import CustomLinkComponent from '../components/common/CustomNavlink';
import { getTheme, limitChars } from '../configs/appfunctions';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Footer from '../components/common/Footer';
import { APP_NAME } from '../configs/appconfig';
import { Link } from 'react-router-dom';
import { connectWallet, disconnectWallet } from '../utils/config';
import React from 'react';

const navlinks = [
    { to: "/", label: "Home" },
    { to: "/campaigns", label: "Campaigns" },
    { to: "/create/campaign", label: "Create Campaign" },
    { to: "/partners/become-partner", label: "Become Partner" },
]

// Text color for light mode: #1f1f30


const ConnectionButton = () => {

    const [connectedAccount, setConnectedAccount] = useState(null)

    async function isConnected() {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts?.length > 0) {
            setConnectedAccount(accounts[0])
        }
    }

    useEffect(() => {
        isConnected()
    }, [])
    return (
        <Button radius="xl" px="xl" color="indigo" onClick={connectedAccount ? disconnectWallet : connectWallet}>{connectedAccount ? limitChars(connectedAccount, 10) : "Connect Wallet"}</Button>
    )
}



export default function AppWrapper(props) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const isSignedIn = true

    return (
        <AppShell
            styles={{
                main: {
                    background: getTheme(theme) ? theme.colors.dark[8] : "#d3d6e9",
                    zIndex: 2,
                },
            }}
            layout="alt"
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            padding={0}
            header={
                <Header height={{ base: 60, md: 70 }} px="md" sx={theme => ({
                    background: getTheme(theme) ? theme.colors.dark[6] : "#d3d6e9"
                })}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: "space-between" }}>

                        <Group align="center" style={{height: "100%"}}>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                />
                            </MediaQuery>
                            <Anchor component={Link} to="/" sx={{
                                textDecoration: "none !important",
                                height: "100%",
                                width: "120px",
                                ".lis": {
                                    color: getTheme(theme) ? theme.colors.gray[1] : theme.colors.dark[8],
                                    textDecoration: "none",
                                    ":hover": {
                                        textDecoration: "none !important"
                                    }
                                }
                            }}>
                                <img src={'/Shiftlogo.png'} style={{
                                    maxHeight: '90%'
                                }} />
                                {/* <Stack spacing={-10}>
                                    <Title order={2} className="lis">SaL</Title>
                                    <Text size="xs" className="lis">DONATE</Text>
                                </Stack> */}
                            </Anchor>
                            <Divider orientation='vertical' />
                            <Image src='https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=026' width={"30px"} />
                        </Group>

                        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                            <Group spacing={2}>
                                {
                                    navlinks.map((l, i) => (
                                        <CustomLinkComponent key={`navlink_${i}`} details={l} />
                                    ))
                                }
                            </Group>
                        </MediaQuery>

                        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                            <Group>
                                <ConnectionButton />
                                <ColorSchemeToggle />
                            </Group>
                        </MediaQuery>
                    </div>
                </Header>
            }
        >
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title={`${APP_NAME} - Menu`}
                padding="xl"
                size="md"
            >
                {
                    navlinks.map((l, i) => (
                        <CustomLinkComponent key={`navlink_${i}`} details={l} />
                    ))
                }
            </Drawer>
            <div className='min-height'>
                {props.children}
            </div>
            <Footer />
        </AppShell>
    );
}