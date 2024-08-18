import { Button, Card, Container, Grid, LoadingOverlay, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { APP_NAME, SEPARATOR } from '../../configs/appconfig'
import { contract } from '../../utils/config'
import bodyStyles from '../../components/styles/bodyStyles'
import { IconAlertCircle, IconAlertTriangle } from '@tabler/icons'
import { showNotification } from '@mantine/notifications'

const CreateCause = () => {

    const [loading, setLoading] = useState(false)

    const { theme, classes } = bodyStyles()

    const form = useForm({
        initialValues: {
            cause: ""
        },
        validate: {
            cause: value => value === "" ? "Cause is required" : null
        }
    })

    async function handleSubmit() {
        const accounts = await window?.ethereum?.request({ method: "eth_requestAccounts" });
        const account = accounts[0];

        setLoading(true)
        contract?.methods?.addCause(form.values.cause?.toString())
            .send({ from: account, gas: 2000000 }).then(res => {
                form.reset()
                showNotification({
                    message: "Adding new cause succeeded!",
                    color: "green",
                    icon: <IconAlertCircle />
                })
            }).catch(e => {
                console.log("error: ", e)
                showNotification({
                    message: "Adding new cause failed!",
                    color: "red",
                    icon: <IconAlertTriangle />
                })
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Helmet>
                <title>{`Register a new Cause ${SEPARATOR} ${APP_NAME}`}</title>
            </Helmet>

            <div>
                <Container style={{
                    position: "relative"
                }}>
                    <LoadingOverlay visible={loading} />
                    <Grid>
                        <Grid.Col md={6} offsetMd={3}>
                            <Card radius="lg" py={50}>
                                <Title mb="md" align='center' className={classes.text}>Register new Cause</Title>
                                <form onSubmit={form.onSubmit(values => handleSubmit())}>
                                    <Stack>
                                        <TextInput placeholder='Young Girl Education' label="Enter Cause" {...form.getInputProps('cause')} radius={'md'} />
                                        <Button type='submit'>Add Cause</Button>
                                    </Stack>
                                </form>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
            </div>
        </>
    )
}

export default CreateCause