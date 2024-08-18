import React from 'react'
import { Avatar, Box, Button, Card, Center, Container, Grid, Group, Image, List, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import bodyStyles from '../components/styles/bodyStyles';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../configs/appconfig';
import HomeBannerCalendar from '../components/calendar/HomeBannerCalendar';

import HomeHeroCreateBtn, { HomeHeroDonateBtn } from '../components/common/HomeHeroCreateBtn';
import { getTheme } from '../configs/appfunctions';
import RecentCampaigns from '../components/recents/RecentCampaigns';
import RecentEvents from '../components/recents/RecentEvents';
import HomePageWhy from '../components/common/HomePageWhy';
import { IconCheck } from '@tabler/icons';
import { useScrollIntoView } from '@mantine/hooks';
import AllTokensDisplay from '../components/common/AllTokensDisplay';
import QuickStats from '../components/recents/QuickStats';

const coming_soons = [
    {
        title: "USDC",
        shortTitle: "USDC",
        borderType: "ridge",
        description: <><b>USDC</b> allows donors to securely and easily donate funds without the need to worry about exchange rate fluctuations and by the use of credit and debit cards. Therefore, it can be a great alternative for donors to make donations.
            <br />
            Additionally, <b>USDC</b> allows for faster and more cost effective transactions, meaning that more of the donation ends up in the hands of the recipient.
        </>,
        image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=023"
    },
    {
        title: "Donations Dashboard",
        shortTitle: "STATS",
        borderType: "groove",
        description: <>
            A dashboard can be a great way to provide transparency to donors and show them where their donations are going. It can also help to provide insights into the effectiveness of the platform and track progress towards fundraising goals.
            <br />
            Additionally, a dashboard can help the platform administrators to quickly identify any potential issues or trends.
        </>,
        image: "/imgs/statistics.png"
    },
    {
        title: "UTU Review System",
        shortTitle: "RATE",
        borderType: "ridge",
        description: <>
            A review system to be systematically designed to help review different partners based on the UTU protocol.
        </>,
        image: "https://stakingcrypto.info/static/assets/coins/utu-protocol-logo.png"
    },
    {
        title: "Coinbase Donations",
        shortTitle: "BASE",
        borderType: "ridge",
        description: <>
            An implementation to allow donors to donate via coinbase API to allow easy and seamless donations from multiple assets
        </>,
        image: "/imgs/coin.svg"
    },
    {
        title: "Aragon Voting DAO",
        shortTitle: "DAO",
        borderType: "ridge",
        description: <>
            Building a DAO on Aragon to help donors do proper voting for different partners as proposals for different campaigns
        </>,
        image: "https://assets.website-files.com/5e997428d0f2eb13a90aec8c/635f9f43482d4aa0a21d52a8_a-brand_logo.svg"
    }
]

const ComingSoonCard = ({ title, borderType, description, image, shortTitle }) => {
    const theme = useMantineTheme()
    const { classes } = bodyStyles()
    return (
        <Card radius="lg" shadow="xl" sx={{
            borderWidth: "15px",
            height: "100%",
            borderStyle: borderType,
            borderColor: getTheme(theme) ? theme.colors.dark[5] : "#d3d6e9",
            background: getTheme(theme) ? theme.colors.dark[8] : theme.colors.gray[1],
            position: "relative",
        }}>
            <span className={classes.floatingWord}>{shortTitle}</span>
            <Stack align="center">
                <Image width={100} src={image} />
                <Title className={classes.subtitle} order={2}>{title}</Title>
                <Text className={classes.text} align="center">
                    {description}
                </Text>
            </Stack>
        </Card>
    )
}


const Home = () => {
    const theme = useMantineTheme()
    const { classes } = bodyStyles()
    const { scrollIntoView, targetRef } = useScrollIntoView < HTMLDivElement > ({ offset: 120 });
    return (
        <>
            <Helmet>
                <title> {APP_NAME} - Donate today, save a life.</title>
                <meta name='description' content='We help raise funds through donations in the Ethereum Blockchain environment to help fight calamities within Kenya and Africa at large.' />
            </Helmet>
            <Container py="xs" size="xl">
                <Grid>
                    <Grid.Col className='fixed-height position-relative' md={7}>
                        <Box py="xl" sx={{
                            position: "absolute",
                            bottom: "60px",
                            left: 0,
                        }}>
                            <Stack>
                                <Title className={classes.title}>Shift a Life <br /> Foundation</Title>
                                <Text className={classes.text}>
                                    We help raise funds through donations in the Ethereum Blockchain environment to help fight calamities within Kenya and Africa at large.

                                    <br />
                                    <br />
                                    Our aim is to provide a clear and easy to use platform to help you <span className={classes.bold}>shift a life</span>.
                                </Text>
                                <Group mt="xl">
                                    <HomeHeroDonateBtn />
                                    <HomeHeroCreateBtn />
                                </Group>
                            </Stack>
                        </Box>
                    </Grid.Col>
                    <Grid.Col md={5} className='fixed-height' py="xl">
                        <HomeBannerCalendar />
                    </Grid.Col>

                </Grid>
            </Container>

            {/* Why this platform */}
            <Container size="lg" className='custom-mb'>
                <HomePageWhy />
            </Container>

            {/* Welcoming block */}
            <Container size="lg" className='custom-mb'>
                <Grid>
                    <Grid.Col md={6} className="fixed-height">
                        <Box className='h-100' sx={{
                            position: "relative",
                            ".img1": {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "70% !important",
                                aspectRatio: "16 / 9",
                                zIndex: 2,
                            },
                            ".img2": {
                                position: "absolute",
                                top: "20%",
                                right: 0,
                                width: "80% !important",
                                aspectRatio: "16 / 9",
                                zIndex: 2,
                            },
                            ".img3": {
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "80% !important",
                                aspectRatio: "16 / 9",
                                zIndex: 2,
                            },
                        }}>
                            <Image src="/home/img1.jpeg" radius="lg" className="img1" />
                            <Image src="/home/img2.jpeg" radius="lg" className="img2" />
                            <Image src="/home/img3.jpeg" radius="lg" className="img3" />
                        </Box>
                    </Grid.Col>
                    <Grid.Col md={6}>
                        <Stack>
                            <Title className={classes.subtitle}>How are we making a difference</Title>
                            <Text className={classes.text}>
                                The use of blockchain technology to create donation platforms is beginning to
                                revolutionize the way charitable organizations receive and manage donations.
                                By utilizing smart contracts and distributed ledgers,
                                these donation platform is able to provide:
                            </Text>
                            <List>
                                <List.Item className={classes.text} icon={<IconCheck />}>unparalleled transparency</List.Item>
                                <List.Item className={classes.text} icon={<IconCheck />}>Security</List.Item>
                                <List.Item className={classes.text} icon={<IconCheck />}>Reliability</List.Item>
                                <List.Item className={classes.text} icon={<IconCheck />}>Accountability to donors and recipients</List.Item>
                            </List>
                            <Button sx={{ width: "fit-content" }}
                                radius="md" color="indigo"
                                variant="outline"
                                onClick={() => scrollIntoView({ alignment: 'center' })}>
                                Learn more
                            </Button>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>

            {/* Recent campaigns */}
            <Container size="lg" className='custom-mb'>
                <RecentCampaigns />
            </Container>

            {/* Why use the blockchain */}
            <Container size="lg" className='custom-mb'>
                <Stack>
                    <Title order={3} className={classes.subtitle} ref={targetRef}>Why use the blockchain</Title>
                    <Grid>
                        <Grid.Col md={4}>
                            <Card shadow="xl" radius="lg" sx={{ position: "relative" }}>
                                <span className={classes.floatingNumber}>1</span>
                                <Title order={4} align="center" mb="md" className={classes.subtitle} sx={{ lineHeight: "60px" }}>Fraud Prevention</Title>
                                <Text className={classes.text} align="center">
                                    With the rise of online fraud, many donors are wary of where their money is going.
                                    Blockchain-based donation platforms put donor minds at ease by providing a record of donation transactions that is secure, immutable, and publicly viewable. This record of transactions allows donors to track their contributions from the point of donation to the point of receipt,
                                    ensuring that their donations are going to the intended recipient.
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <Card shadow="xl" radius="lg" className='h-100' sx={{ position: "relative" }}>
                                <span className={classes.floatingNumber}>2</span>
                                <Title order={4} align="center" mb="md" className={classes.subtitle} sx={{ lineHeight: "60px" }}>Security & Reliability</Title>
                                <Text className={classes.text} align="center">
                                    For charitable organizations, blockchain-based donation platforms can provide a secure and
                                    reliable way to receive donations. Donations are distributed directly to the organization’s wallet, eliminating the need for intermediaries
                                    and reducing processing fees. This also makes it easier for organizations to keep track of donations and manage their budgets more efficiently.
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <Card shadow="xl" radius="lg" className='h-100' sx={{ position: "relative" }}>
                                <span className={classes.floatingNumber}>3</span>
                                <Title order={4} align="center" mb="md" className={classes.subtitle} sx={{ lineHeight: "60px" }}>New model of Philanthropy</Title>
                                <Text className={classes.text} align="center">
                                    By utilizing blockchain technology, donation platforms are also able to
                                    create a new model of philanthropy. Donors are able to donate to multiple
                                    organizations at once, while organizations are able to distribute funds more
                                    quickly and effectively. Organizations are also able to create customized donation campaigns that  incentivize donors and increase donations.
                                </Text>
                            </Card>
                        </Grid.Col>
                    </Grid>

                    <Text className={classes.text} mt="md">
                        The use of blockchain-based donation platforms is transforming the way
                        charitable organizations receive and manage donations. By providing unparalleled transparency, security, and accountability, these platforms are making a
                        positive difference in the philanthropic space.
                    </Text>
                </Stack>
            </Container>

            {/* Quick statistics */}
            <QuickStats />

            <Container size="lg" className="custom-mb">
                <Stack>
                    <Title order={3} className={classes.subtitle}>Built on the Ethereum Blockchain</Title>
                    <Grid>
                        <Grid.Col md={5} py="xl">
                            <Center className='h-100'>
                                <Image src='https://cryptologos.cc/logos/versions/ethereum-eth-logo-full-vertical.svg?v=026' width="200px" />
                            </Center>
                        </Grid.Col>
                        <Grid.Col md={7} py="xl">
                            <Paper radius="lg">
                                <Center>
                                    <AllTokensDisplay />
                                </Center>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>

            {/* Coming soon */}
            <Box py="md" className='custom-mb' sx={{
                backgroundPosition: "center",
                background: `radial-gradient(
                                    ellipse at bottom right,
                                    rgba(29, 39, 54, 0.3) 0%,
                                    rgba(29, 39, 54, 0) 72%)`
            }}>
                <Container size="lg" className='custom-mb'>
                    <Stack>
                        <Title order={3} className={classes.subtitle}>Coming Soon</Title>
                        <Grid>
                            {
                                coming_soons?.map((e, i) => (
                                    <Grid.Col key={`soon_${i}`} md={6}>
                                        <ComingSoonCard {...e} />
                                    </Grid.Col>
                                ))
                            }
                        </Grid>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default Home