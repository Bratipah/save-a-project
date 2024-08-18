import { Center, Stack, Title, Text, Button, Group, Container, Grid, Card, Avatar, Image, Pagination } from '@mantine/core'
import React, { useEffect, useMemo, useState } from 'react'
import PartnerCard from '../../components/common/PartnerCard';
import bodyStyles from '../../components/styles/bodyStyles';
import { Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useScrollIntoView } from '@mantine/hooks';
import { contract } from '../../utils/config';

const Partners = () => {

  const [partners, setPartners] = useState([])
  const [count, setCount] = useState(0)
  const [limit, setLimit] = useState(15)
  const [page, setPage] = useState(1)

  const no_of_pages = Math.ceil(count / limit)

  const { theme, classes } = bodyStyles()
  const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 120 });

  const getPartners = () => {
    contract?.methods?.getCampaigns(1).call().then((res) => {
      setCampaigns(res)
    }).catch((err) => {
      console.error("Error: ", err)
    })
  }

  const wait = useMemo(() => {
    return {
      page
    }
  }, [page])

  useEffect(() => {
    getPartners()
  }, [wait])

  return (
    <>
      <div className='fixed-height' style={{
        background: "linear-gradient(30deg, rgba(20, 20, 255, 0.3), rgba(0, 0, 255, 0.2)), url(https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=600) no-repeat",
        // backgroundSize: "cover", 
        mixBlendMode: "difference",
        backgroundPosition: "center"
      }}>
        <Center className='h-100'>
          <Stack>
            <Title align='center' className={classes.title} style={{ color: "white" }} weight={700}>Shift a Life <br />Partners</Title>
            <Text className={classes.text} align="center" style={{ color: "white" }}>
              Here are all the Shift a Life partners who help transform
              <b> donations</b> <br /> into <b>work</b> in various regions around the globe.
            </Text>
            <Group position='center'>
              <Button color="indigo" sx={{ width: "150px" }} radius="xl" onClick={() => scrollIntoView({ alignment: 'center' })}>View all</Button>
              <Anchor to="/partners/become-partner" component={Link}>
                <Button color="indigo" sx={{ width: "150px" }} radius="xl">Become partner</Button>
              </Anchor>
            </Group>
          </Stack>
        </Center>
      </div>
      <Container my="xl" size="lg">
        <Stack spacing={0}>
          <Title className={classes.subtitle} order={3} ref={targetRef}>All partners</Title>
          <Group position='right'>
            <Pagination total={no_of_pages} page={page} onChange={page => setPage(page)} />
          </Group>
          <Grid my="xs">
            {
              partners.map((item, i) => (
                <Grid.Col md={3} key={`partner_${i}`}>
                  <PartnerCard details={item} />
                </Grid.Col>

              ))
            }
          </Grid>
          <Group position='right'>
            <Pagination total={no_of_pages} page={page} onChange={page => setPage(page)} />
          </Group>
        </Stack>
      </Container>
    </>
  )
}

export default Partners