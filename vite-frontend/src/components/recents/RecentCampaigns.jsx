import { Anchor, Button, Grid, Group, Stack, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CampaignCard from '../activities/CampaignCard'
import bodyStyles from '../styles/bodyStyles'
import { contract } from '../../utils/config'

const RecentCampaigns = () => {
    const [campaigns, setCampaigns] = useState([])

    const { theme, classes } = bodyStyles()

    const getCampaigns = () => {
        contract?.methods?.getCampaigns(1).call().then((res) => {
          setCampaigns(res)
        }).catch((err) => {
          console.error("Error: ", err)
        })
      }

    useEffect(() => {
        getCampaigns()
    }, [])

    return (
        <>
            <Stack>
                <Group position='apart' align="center">
                    <Title order={2} weight={500} className={classes.subtitle}>Recent Campaigns</Title>
                    <Anchor component={Link} to="/campaigns">
                        <Button variant='outline' radius="md" color="indigo" rightIcon={<IconArrowRight />}>View all</Button>
                    </Anchor>
                </Group>
                <Grid>
                    {
                        campaigns.slice(2, 5).map((c, i) => (
                            <Grid.Col md={4} key={`ds_campaign_${c.id}`}>
                                <CampaignCard details={c} />
                            </Grid.Col>
                        ))
                    }
                </Grid>
            </Stack>
        </>
    )
}

export default RecentCampaigns