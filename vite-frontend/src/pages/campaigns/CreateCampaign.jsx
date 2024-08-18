import React from 'react'
import { Container, Grid, Select, Stack, TextInput, Title, useMantineTheme, Paper, Textarea, Group, Button, LoadingOverlay } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { IconAlertCircle, IconAlertTriangle, IconSpeakerphone } from '@tabler/icons';
import { Helmet } from 'react-helmet';
import { SEPARATOR, APP_NAME } from '../../configs/appconfig';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import SelectTokenModal from '../../components/common/SelectTokenModal';
import { useEffect } from 'react';
import { contract } from '../../utils/config';

import { v4 } from 'uuid';
//firebase imports
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import Web3 from 'web3';


const CreateCampaign = () => {

  const [loading, setLoading] = useState(false)
  const [causes, setCauses] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)

  const [uploading, setUploading] = useState(false)
  const [img, setImg] = useState(null)

  const theme = useMantineTheme()
  const navigate = useNavigate()

  const loadCauses = () => {
    contract?.methods?.getCauses().call().then(res => {
      setCauses(res)
    }).catch(e => { })
  }

  const form = useForm({
    initialValues: {
      title: "",
      cause: "",
      description: "",
      target: "",
      token: "0x2B0974b96511a728CA6342597471366D3444Aa2a",
      start_date: new Date(),
      end_date: new Date(),
      image: "https://newsroom.aboutrobinhood.com/wp-content/uploads/sites/2/2023/01/DALMATIAN-Blog_Header_2x.png"
    },
    validate: {
      title: value => value === "" ? "Title cannot be empty" : null,
      cause: value => value === "" ? "Select the cause of the campaign" : null,
      description: value => value === "" ? "Kindly describe the aim of the campaign" : null,
      target: value => value === "" ? "Target amount needs to be set" : null,
    }
  })

  const UploadImage = (file) => {
    setUploading(true)
    const imageRef = ref(storage, `images/${file['name'] + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImg(url)
        setUploading(false)
      })

    })
  };

  // const uploadFile = () => {
  //   UploadImage(form.values['image'])
  // }

  const handleSubmit = async () => {

    const accounts = await window?.ethereum?.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    const id = nanoid() + Date.now()
    let data = {
      ...form.values,
      start_date: form.values.start_date?.toLocaleDateString(),
      end_date: form.values.end_date?.toLocaleDateString(),
    }
    setLoading(true)
    const amount = Web3.utils.toWei(data?.target, 'ether')
    contract?.methods?.createCampaign(
      data?.title, data?.token, amount, data?.cause,
      data?.description, data?.image, data?.start_date,
      data?.end_date)
      .send({ from: account, gas: 2000000 }).then((data) => {
        form.reset()
        showNotification({
          message: "Adding new Campaign succeeded!",
          color: "green",
          icon: <IconAlertCircle />
        })
      }).catch((e) => {
        showNotification({
          message: "Adding new Campaign failed",
          color: "red",
          icon: <IconAlertTriangle />
        })
      }).finally(() => {
        setLoading(false)
      })

  }

  const isSignedIn = true

  useEffect(() => {
    loadCauses()
  }, [])

  // const waitChange = useMemo(() => {
  //   return {
  //     continue: img ? true : false
  //   }
  // }, [img])

  // useEffect(() => {
  //   if (img) {
  //     handleSubmit()
  //   }
  // }, [waitChange])

  return (
    <>
      <Helmet>
        <title>Create an campaign {SEPARATOR} {APP_NAME}</title>
      </Helmet>
      <SelectTokenModal select={setSelectedToken} open={openModal} closeModal={() => setOpenModal(false)} selectedToken={selectedToken} />
      <Container size="xl" py="lg">
        <Grid>
          <Grid.Col md={6} offsetMd={3}>
            <Paper radius="lg" p="xs" sx={{ position: "relative" }}>
              <LoadingOverlay visible={loading || uploading} />
              <Title weight={500} align="center" mb="md">Create new campaign</Title>
              <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                <Stack>
                  <TextInput label="Title" placeholder='Campaign title' radius="md"{...form.getInputProps('title')} />
                  <Select label="Select cause" placeholder='Cause of the campaign' radius="md" data={causes.map((cause) => ({ value: cause, label: cause }))}
                    {...form.getInputProps('cause')} />
                  <Textarea minRows={5} placeholder="Describe the campaign" label="Description" radius="md"{...form.getInputProps('description')} />
                  <Grid>
                    <Grid.Col md={6}>
                      <DatePicker
                        label="Pick start date"
                        placeholder="Pick campaign starting date"
                        radius="md"
                        {...form.getInputProps('start_date')}
                      />
                    </Grid.Col>
                    <Grid.Col md={6}>
                      <DatePicker
                        label="Pick end date"
                        placeholder="Pick campaign ending date"
                        radius="md"
                        {...form.getInputProps('end_date')}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid>
                    <Grid.Col md={6}>
                      <TextInput label="Image" placeholder="Campaign Image" radius="md"  {...form.getInputProps('image')} />
                    </Grid.Col>
                    <Grid.Col md={6}>
                      <TextInput label="Target amount" placeholder="Target amount for the campaign" radius="md"  {...form.getInputProps('target')} />
                    </Grid.Col>
                    <Grid.Col md={6}>
                      {/* <Paper radius="md" sx={{
                        background: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[1],
                        padding: "4px"
                      }}>
                        <Text size="sm">Select Token</Text>
                        <Group onClick={() => setOpenModal(true)} px="xs" align="center" position='apart' sx={{
                          background: getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[0],
                          borderRadius: theme.radius.md,
                          cursor: "pointer"
                        }}>
                          <Group>
                            <Avatar src={selectedToken?.icon} color="indigo">
                              {selectedToken?.symbol.substring(0, 1)}
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
                      </Paper> */}
                    </Grid.Col>
                    {/* <Grid.Col>
                      <FileInput accept="image/png,image/jpeg, image/jpg, image/webp" label="Campaing Image" placeholder='Select banner' {...form.getInputProps('image')} />
                    </Grid.Col> */}
                  </Grid>

                  <Group align="center" position='center'>
                    {
                      !isSignedIn && <Button radius="xl" px="xl" color="purple" onClick={connectWallet}>Connect wallet</Button>


                    }
                    <Button type='submit' leftIcon={<IconSpeakerphone />} color="purple" radius="xl" px="xl">Create Campaign</Button>

                  </Group>
                </Stack>
              </form>
              {/* <Box my="xl">
                <Title order={3} align="center" mb="md">Image</Title>
                <Center>
                  {
                    img ? <Image radius="lg" src={img} /> : null
                  }
                </Center>
              </Box> */}
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}

export default CreateCampaign