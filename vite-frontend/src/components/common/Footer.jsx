import React from 'react'
import { ActionIcon, Anchor, Box, Container, Divider, Grid, Group, Image, List, Paper, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter, IconChecks, IconListCheck } from '@tabler/icons'
import bodyStyles from '../styles/bodyStyles'
import { getTheme } from '../../configs/appfunctions';
import { Link } from 'react-router-dom';

const footerLinks = [
    { to: "/partners", label: "Partners" },
    { to: "/partners/become-partner", label: "Become Partner" },
    { to: "/create/campaign", label: "Create Campaign" },
    { to: "/create/cause", label: "Register Cause" },
    { to: "/import", label: "Import Token" },
]

const Footer = () => {

    const { classes } = bodyStyles()
    const theme = useMantineTheme()

    return (
        <>
            <Box>
                <Divider color={getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[0]} />
                <Container size="xl" sx={{
                    paddingTop: "60px",
                    paddingBottom: "60px",
                }}>
                    <Grid>
                        <Grid.Col md={4}>
                            <Title className={classes.text} order={2} mb="lg" weight={500}>Shift a Life</Title>
                            <Text className={classes.text} mb="xl">
                                We help raise funds through donations in the Ethereum Blockchain environment to help fight calamities within Kenya.
                                <br />
                                <br />
                                Our aim is to provide a clear and easy to use platform to help you <span className={classes.bold}>shift a life</span>.
                            </Text>
                            <Image mx={'auto'} src='https://cryptologos.cc/logos/versions/ethereum-eth-logo-full-vertical.svg?v=026' width="200px" />
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <Title className={classes.text} order={2} mb="lg" weight={500}>Quick Links</Title>
                            <List>
                                {
                                    footerLinks.map((l, i) => (
                                        <Anchor key={`footer_link_${i}`} to={l.to} component={Link} sx={{
                                            color: getTheme(theme) ? theme.white : "#242a49",
                                        }}>
                                            <List.Item icon={<IconChecks />}>
                                                {l.label}
                                            </List.Item>
                                        </Anchor>
                                    ))
                                }
                            </List>
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <Title className={classes.text} order={2} mb="lg" weight={500}>Find us through</Title>
                            <Group>
                                <Anchor href='https://www.facebook.com/livesoftwaredeveloper/'>
                                    <ActionIcon variant='light' size="lg" color="indigo">
                                        <IconBrandFacebook color={getTheme(theme) ? theme.white : "#242a49"} />
                                    </ActionIcon>
                                </Anchor>
                                <Anchor href='https://twitter.com/LiveSoftwareDev/'>
                                    <ActionIcon variant='light' size="lg" color="indigo" >
                                        <IconBrandTwitter color={getTheme(theme) ? theme.white : "#242a49"} />
                                    </ActionIcon>
                                </Anchor>
                                <Anchor href='https://www.linkedin.com/company/76145963/'>
                                    <ActionIcon variant='light' size="lg" color="indigo" >
                                        <IconBrandLinkedin color={getTheme(theme) ? theme.white : "#242a49"} />
                                    </ActionIcon>
                                </Anchor>
                            </Group>
                            <Box my="xl" py="xl">
                                <Group spacing={6} align='center' >
                                    <Image src='https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=026' width={"30px"} />
                                    <Text size="xs">Blockchain</Text>
                                </Group>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Container>
                <Divider color={getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[4]} />
            </Box>
            <Paper radius={0}>
                <Container size="xl" py="xs">
                    <Group position='apart' align="center">
                        <Text size="sm"> Shift a Life. All rights reserved &copy; 2022</Text>
                        <Group>
                            <Anchor component={Link} to="/terms-of-use">
                                <Text size="xs">Terms & conditions</Text>
                            </Anchor>
                            <Anchor component={Link} to="/privacy-policy">
                                <Text size="xs">Privacy policy</Text>
                            </Anchor>
                        </Group>
                    </Group>
                </Container>
            </Paper>
        </>
    )
}

export default Footer