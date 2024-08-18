import { ActionIcon, Avatar, Box, Button, Center, ColorSwatch, Container, Grid, Group, Image, Loader, LoadingOverlay, Paper, RingProgress, ScrollArea, Stack, Table, Text, TextInput, Title, Tooltip } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet';
import { SEPARATOR, APP_NAME } from '../../configs/appconfig';
import bodyStyles from '../../components/styles/bodyStyles';
import { getReadableTokenBalance, getTheme, getTimezone, limitChars } from '../../configs/appfunctions';
import { IconAlertCircle, IconAlertTriangle, IconCalendar, IconCashBanknote, IconChevronDown, IconCoin, IconX } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import CampaignDonations from '../../components/activities/CampaignDonations';
import BecomePartnerModal from '../../components/common/BecomePartnerModal';
import DonDetails from '../../components/activities/DonDetails';
import { contract } from '../../utils/config';
import { BigNumber } from "bignumber.js"
import Web3 from 'web3';

const partnerKeys = ['id', 'name', 'logo', 'expertise_fields', 'wallet']

const SingleCampaign = () => {

  const [data, setData] = useState(null)
  const [tokenDetails, setTokenDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [voting, setVoting] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [amt, setAmt] = useState("")
  const [tokenPrice, setTokenPrice] = useState(0)
  const [partners, setPartners] = useState([])
  const [canVote_, setCanVote] = useState(false)
  const canVote = true


  const { theme, classes } = bodyStyles()
  const modals = useModals()
  const { cid } = useParams()

  const checkIfCanVote = async () => {
    const accounts = await window?.ethereum?.request({ method: "eth_requestAccounts" });
    if (accounts?.length < 1) {
      showNotification({
        message: "Connect your wallet and reload the page"
      })
      return
    }

    const account = accounts[0];

    contract?.methods.getCampaignVoter(cid, account).call().then(res => {
      canVote(res)
    }).catch(e => { })
  }

  const getCampaign = () => {
    contract?.methods.getCampaign(cid).call().then(res => {
      setData(res)
    }).catch(e => { })
  }

  const getCampaignVoters = () => {
    contract?.methods.getCampaignVoters(cid).call().then(res => {
      console.log("voters: ", res)
    }).catch(e => { })
  }

  const loadSinglePartner = async (id) => {
    return await contract?.methods?.getPartner(id).call()
  }

  const getCampaignPartners = async () => {

    contract?.methods.getCampaignPartners(cid).call().then(res => {
      const campaignPartnersQueries = res[0]?.map(partnerID => loadSinglePartner(partnerID))
      Promise.allSettled(campaignPartnersQueries).then(res1 => {
        const partners__ = res1.map(a => a.value)
        for (let i = 0; i < partners__.length; i++) {
          partners__[i].votes = Number(res[1][i]?.toString())
        }
        setPartners(partners__)
      })

    }).catch(e => { })
  }


  const getTokenMetadata = () => {
  }

  const nearDonate = () => {
  }

  const tokenDonate = (address) => {
  }

  const donate = async () => {

    const accounts = await window?.ethereum?.request({ method: "eth_requestAccounts" });
    if (accounts?.length < 1) {
      showNotification({
        message: "Connect your wallet and reload the page"
      })
      return
    }
    const account = accounts[0];

    setLoading(true)
    const amount = Web3.utils.toWei(amt, 'ether')
    const date = new Date().toLocaleDateString()
    const gasEstimate = await contract.methods.donate(cid, amount, date).estimateGas({ from: account, value: amount });
    contract?.methods?.donate(cid, amount, date)
      .send({ from: account, gas: gasEstimate, value: amount }).then((data) => {
        setAmt("")
        showNotification({
          message: "Donation successful!",
          color: "green",
          icon: <IconAlertCircle />
        })
      }).catch((e) => {
        showNotification({
          message: "Donation Failed!",
          color: "red",
          icon: <IconAlertTriangle />
        })
      }).finally(() => {
        setLoading(false)
      })
  }

  const showModal = () => {
    if (amt === "" || amt === null) {
      showNotification({
        message: "Amount required.Please enter the amount you wish to donate to this campaign",
        color: "red",
      })
      return
    }
    else {
      modals.openConfirmModal({
        title: 'Make donation',
        centered: true,
        children: (
          <>
            <DonDetails label="Amount" value={amt} />
            <DonDetails label="Token" value={tokenDetails?.symbol} />
            <DonDetails label="Token Price" value={`${tokenPrice} USD`} />
            <DonDetails label="Estimated USD" value={parseFloat(amt) * tokenPrice} />
            <Text size="sm" mt="md" className={classes.text}>
              <b>NB:/-</b> Not all tokens load there approximate USD prices.
              0 USD might mean that we could not fetch the price of the token since it is not available on
              &nbsp;<b></b>
            </Text>
          </>
        ),
        labels: { confirm: 'Donate', cancel: "Cancel" },
        confirmProps: { color: 'indigo', radius: "xl" },
        cancelProps: { radius: "xl" },
        onCancel: () => { setLoading(false) },
        onConfirm: () => { donate() },
        radius: "lg",
        styles: {
          modal: {
            background: getTheme(theme) ? theme.colors.dark[6] : "#d3d6e9"
          }
        }
      })
    }
  }

  const loadTokenPrice = async (address) => {
  }

  const voteForPartner = async (partner_id) => {
    const accounts = await window?.ethereum?.request({ method: "eth_requestAccounts" });
    if (accounts?.length < 1) {
      showNotification({
        message: "Connect your wallet and reload the page"
      })
      return
    }
    const account = accounts[0];

    setVoting(true)
    const gasEstimate = await contract.methods.vote(cid, partner_id).estimateGas({ from: account });
    contract?.methods?.vote(cid, partner_id)
      .send({ from: account, gas: gasEstimate }).then((data) => {
        showNotification({
          message: "Voting successful!",
          color: "green",
          icon: <IconAlertCircle />
        })
      }).catch((e) => {
        showNotification({
          message: "Voting Failed!",
          color: "red",
          icon: <IconAlertTriangle />
        })
      }).finally(() => {
        setVoting(false)
      })
  }

  const isSignedIn = true

  const getCurrentPercentage = () => {
    let percent = ""
    if (data) {
      let num = new BigNumber(data?.total?.toString()).dividedBy(data?.target?.toString()).multipliedBy(100)
      percent = num.toFixed()
    }
    return percent
  }

  const call_cid = useMemo(() => {
    return {
      cid: cid
    }
  }, [cid])

  useEffect(() => {
    getCampaign()
    getCampaignVoters()
    getCampaignPartners()
    checkIfCanVote()
  }, [call_cid])

  return (
    <>
      <Helmet>
        <title> {`${APP_NAME} ${SEPARATOR} Campaign  ${SEPARATOR} ${data?.title ?? ""}`} </title>
      </Helmet>
      {/* <SelectTokenModal select={setSelectedToken} open={openModal} closeModal={() => setOpenModal(false)} selectedToken={selectedToken} /> */}
      <Container size="lg" py="xl" sx={{ paddingBottom: "60px", position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <Grid>
          <Grid.Col md={7}>
            <Box>
              <Title order={1} className={classes.subtitle} mb="xl">{data?.title}</Title>
              <img loading='lazy' src={data?.image ? data?.image : "https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBmb3Jlc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  aspectRatio: "16/9",
                  borderRadius: theme.radius.lg,
                }} />
              <Paper p="xs" radius="lg" my="md">
                Cause: {data?.cause}
              </Paper>
              <Paper p="xs" radius="lg" my="md">
                <Text className={classes.text} p="xs" sx={{
                  whiteSpace: "pre-wrap"
                }}>
                  {data?.description}
                </Text>
              </Paper>
              <Paper p="xs" radius="lg">
                <Grid>
                  <Grid.Col md={6}>
                    <Tooltip label={getTimezone(data?.date)} color="lime" withArrow>
                      <Group align="center" spacing={6}>
                        <IconCalendar />
                        <Text>Date:</Text>
                        <Text size="xs">{new Date(data?.start_date).toDateString()}</Text>
                      </Group>
                    </Tooltip>
                  </Grid.Col>
                  <Grid.Col md={6}>

                  </Grid.Col>
                  <Grid.Col md={6}>
                    <Tooltip label="Targetted amount" color="lime" withArrow>
                      <Group align="center" spacing={6}>
                        <IconCoin />
                        <Text>Target:</Text>
                        <Text size="xs" >{getReadableTokenBalance(data?.target?.toString(), tokenDetails?.decimals ?? 18)} {tokenDetails?.symbol ?? "ETH"}</Text>
                      </Group>
                    </Tooltip>
                  </Grid.Col>
                  <Grid.Col md={6}>
                    <Tooltip label="Token for donation" color="lime" withArrow>
                      <Group align="center" spacing={10}>
                        {/* <Text>Token:</Text> */}
                        <Avatar src={tokenDetails?.icon} size="sm" color="indigo">
                          {tokenDetails?.symbol?.substring(0, 1)}
                        </Avatar>
                        <Stack spacing={0}>
                          <Text size="sm">{tokenDetails?.name} - {tokenDetails?.symbol}</Text>
                          <Text size="xs">{limitChars(data?.donation_token, 15)}</Text>
                        </Stack>
                      </Group>
                    </Tooltip>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Box>
          </Grid.Col>
          <Grid.Col md={5}>
            <Paper radius="lg" p="xs">
              <Title order={3} className={classes.text} mb="sm" align='center'>Make donation</Title>
              <Stack>
                {
                  data?.token?.toLowerCase() === "any" ? (
                    <Paper radius="md" sx={{
                      background: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[1],
                      padding: "4px"
                    }}>
                      <Text size="md" mb="xs">Select Donation Token</Text>
                      <Group onClick={() => setOpenModal(true)} px="xs" align="center" position='apart' sx={{
                        background: getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0],
                        borderRadius: theme.radius.md,
                        cursor: "pointer"
                      }}>
                        <Group>
                          <Avatar src={selectedToken?.icon} size="sm" color="indigo">
                            {selectedToken?.symbol?.substring(0, 1)}
                          </Avatar>
                          <Stack spacing={0}>
                            <Text size="sm" weight={600}>{selectedToken?.name}</Text>
                            <Text size="xs">{selectedToken?.symbol}</Text>
                          </Stack>
                        </Group>
                        <ActionIcon color="indigo" variant="light">
                          {
                            false ? <IconX /> : <IconChevronDown />
                          }
                        </ActionIcon>
                      </Group>
                    </Paper>
                  ) : null
                }
                <TextInput value={amt}
                  onChange={e => setAmt(e.target.value)}
                  radius="lg"
                  placeholder={`Amt in ${tokenDetails?.symbol ?? "ETH"}`}
                  label={<Text className={classes.text} mb="xs">Enter Amount to Donate</Text>} size="md"
                  sx={{ overflow: "hidden" }}
                  icon={<Avatar size="sm" src={tokenDetails?.icon} sx={{
                    // background: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[1],
                    width: "30px",
                    height: "30px",
                    minWidth: "30px !important",
                    minHeight: "30px !important",
                    maxWidth: "30px !important",
                    maxHeight: "30px !important",
                    padding: "4px",

                    textTransform: "capitalize"
                  }}>{tokenDetails?.symbol?.substring(0, 1)}</Avatar>} />
                <Text size="xs" align="center">This campaign is set to receive <b>{tokenDetails?.symbol ?? "ETH"}</b> Tokens</Text>
                {
                  !isSignedIn ? <Button radius="xl" fullWidth px="xl" color="purple" onClick={connectWallet}>Connect wallet</Button>
                    :
                    <Button color="indigo" size="md"
                      leftIcon={<IconCashBanknote />} radius="xl" fullWidth
                      onClick={showModal}>
                      Donate
                    </Button>
                }
                {/* <Text size="xs" align='center'>
                  Each msg attached to token deposits should have the following separated by : <br />
                  donation_id, target, campaign_id, event_id, amount_usd ie <br />
                  don_1:general|event|campaign:campaign_1:event_1:0
                </Text> */}
                <Title order={3} className={classes.text} align='center'>Total donations</Title>
                <Center>
                  <Avatar src={tokenDetails?.icon} sx={{ textTransform: "capitalize" }} color="indigo">
                    {tokenDetails?.symbol?.substring(0, 1) ?? "E"}
                  </Avatar>
                </Center>
                <Text className={classes.text} align="center" weight={600}>
                  {getReadableTokenBalance(data?.total?.toString(), tokenDetails?.decimals ?? 18)}
                  &nbsp;
                  {tokenDetails?.symbol ?? "ETH"}
                </Text>
              </Stack>
            </Paper>

            <Paper my="md" radius="lg" px="xs" py="xl">
              <Stack spacing={0}>
                <Title order={3} className={classes.text} align='center'>Progress</Title>
                <Center>
                  <RingProgress
                    thickness={20}
                    roundCaps
                    size={250}
                    label={
                      <Stack spacing={0}>
                        <Text className={classes.text} align='center' size="sm">Target: {data?.target} </Text>
                        <Text className={classes.text} size="xs" align="center" weight={600} color="green">
                          {getCurrentPercentage()} % complete
                        </Text>
                        <Text className={classes.text} align='center' size="sm">
                          {data?.token === "any" ? "USD" : tokenDetails?.symbol}
                        </Text>
                      </Stack>
                    }
                    sections={[
                      { value: getCurrentPercentage(), color: theme.colors.green[7] },
                      { value: 100 - getCurrentPercentage(), color: theme.colors.indigo[7] },
                    ]}
                  />
                </Center>
                <Group position='center'>
                  <Group align="center" spacing={6}>
                    <ColorSwatch color={theme.colors.indigo[7]} radius="md" />
                    <Text size="sm" className={classes.text} >
                      Target - {getReadableTokenBalance(data?.target?.toString(), tokenDetails?.decimals ?? 18)} {tokenDetails?.symbol ?? 'ETH'}
                    </Text>
                  </Group>
                  <Group align="center" spacing={6}>
                    <ColorSwatch color={theme.colors.green[7]} radius="md" />
                    <Text size="sm" className={classes.text} >
                      Current - {data?.token === "any" ? data?.current_usd : getReadableTokenBalance(data?.total?.toString(), tokenDetails?.decimals ?? 18)} {tokenDetails?.symbol ?? "ETH"}
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </Paper>

          </Grid.Col>
        </Grid>
        <Paper radius="lg" p="xs" my="xl">
          <Group align="center" position='apart'>
            <Stack spacing={0} mb="md">
              <Title className={classes.subtitle} order={3}>All Donations</Title>
              <Text size="sm" className={classes.text}>
                Donations for this campaign
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Text size="md" className={classes.text} align="end" weight={700}>
                Total: {getReadableTokenBalance(data?.total?.toString(), tokenDetails?.decimals ?? 18)} {data?.token === "any" ? "USD" : tokenDetails?.symbol}
              </Text>
              <Text size="xs" className={classes.text} align="end">Approximately: {getReadableTokenBalance(data?.total?.toString(), tokenDetails?.decimals ?? 18)} ETH </Text>
            </Stack>
          </Group>
          <CampaignDonations category="campaigns" id={cid} />
        </Paper>
        <Paper radius="lg" p="xs" my="xl">
          <Group align="center" position='apart'>
            <Stack spacing={0} mb="md">
              <Title className={classes.subtitle1} order={4}>Campaign extra information</Title>
              <Text size="sm" className={classes.text}>
                Extra infor about the campaign.
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Text size="md" className={classes.text} align="end" weight={700}>
                Total: {getReadableTokenBalance(data?.total?.toString(), tokenDetails?.decimals ?? 18)} {tokenDetails?.symbol ?? "ETH"}
              </Text>
              <Text size="xs" className={classes.text} align="end">Approximately: {getReadableTokenBalance(data?.total?.toString(), tokenDetails?.decimals ?? 18)} ETH </Text>
            </Stack>
          </Group>
          <Title order={4}>Partners</Title>
          <Text size="sm" className={classes.text}>Who are partners? <span className={classes.dotted}>Read More</span> </Text>
          <ScrollArea>
            <Table>
              <thead>
                <tr>
                  <th style={{ width: "100px" }}>Position</th>
                  <th style={{ minWidth: "200px" }}>Partner</th>
                  <th style={{ minWidth: "200px" }}>Votes</th>
                  {
                    canVote ? <th style={{ minWidth: "200px" }}>UpVote</th> : null
                  }

                </tr>
              </thead>
              <tbody>
                {
                  partners?.sort((a, b) => b?.votes - a?.votes).map((partner, i) => (
                    <tr key={`_partner_${i}`}>
                      <td>{i + 1}</td>
                      <td>
                        <Group>
                          <Image src={partner?.logo} width={"60px"} />
                          <Text>
                            {partner?.name}
                          </Text>
                        </Group>
                      </td>
                      <td>{partner?.votes}</td>
                      {
                        canVote ? (
                          <td>
                            <Button radius="xl"
                              color="indigo" size='xs'
                              px="xl"
                              onClick={() => voteForPartner(partner?.id)}
                              rightIcon={voting ? <Loader size={16} color="white" /> : null}>
                              Vote
                            </Button>
                          </td>
                        ) : null
                      }

                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </ScrollArea>
          <BecomePartnerModal partners_={partners} method="add_event_partner" id={cid} />
        </Paper>
      </Container>
    </>
  )
}

export default SingleCampaign