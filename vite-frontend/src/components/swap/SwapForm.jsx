import { Avatar, Box, Button, Center, Grid, NumberInput, Paper, Stack, Text, useMantineTheme } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import SelectTokenModal from './SelectTokenModal'
import { useDisclosure } from '@mantine/hooks'
import { SingleToken } from './SelectAsset'
import { getTheme } from '../../config/functions'
import { IconCoin } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import BigNumber from 'bignumber.js'

const OX_API = 'd2bdac25-46ff-4e15-986c-7788914ad0a8'

const formatNumber = (num) => {
  if (num) {
    return Number(num).toLocaleString()
  }
  return ''
}


const SelectedTokenBox = ({ children, onClick }) => {
  return (
    <Box px="xs" sx={theme => ({
      cursor: "pointer",
      background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[1],
      borderRadius: theme.radius.md
    })}
      onClick={onClick}>
      {children}
    </Box>
  )
}

const SelectTokenButton = ({ onClick }) => {

  return (
    <Button size='md' radius={'md'} variant='outline' leftIcon={<IconCoin />} onClick={onClick}>
      Select Token
    </Button>
  )
}

const SelectTokenInput = ({ label, onClick, selectedToken, disabled, option, form }) => {

  return (
    <Grid>
      <Grid.Col span={6}>
        <Stack spacing={0}>
          <Text>{label}</Text>
          {
            selectedToken ? (
              <SelectedTokenBox
                onClick={onClick}>
                <SingleToken asset={selectedToken} />
              </SelectedTokenBox>
            ) : (
              <SelectTokenButton onClick={onClick} />
            )
          }
        </Stack>
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack className='h-100' justify='end'>
          <NumberInput precision={option === 'to' ? 20 : 3} radius="md" disabled={disabled} hideControls placeholder={option === 'to' ? 'Awaiting possible value' : "Enter amount"} {...form.getInputProps(option)} />
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

const SwapForm = () => {
  const [tokens, setTokens] = useState([])
  const commonTokens = ['WETH', 'WLD', 'MATIC','USDT', 'USDC', 'DAI', 'ARB']
  const [currentSelectOption, setCurrentSelectOption] = useState('from')

  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)

  const [opened, { open, close }] = useDisclosure(false);

  const theme = useMantineTheme()

  const getTokens = async () => {
    let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
    let tokenListJSON = await response.json();
    let tokens = tokenListJSON?.tokens
    setTokens(tokens)
  }

  const selectToken = (token) => {
    form.clearErrors()
    if (currentSelectOption === 'from') {
      if (token?.symbol === toToken?.symbol) {
        showNotification({
          message: "Select a different token"
        })
        return
      }
      setFromToken(token)
      return
    }
    if (token?.symbol === fromToken?.symbol) {
      showNotification({
        message: "Select a different token"
      })
      return
    }
    setToToken(token)
    return
  }

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      from: '',
      to: '',
      gasPrice: '',
    },
    validate: {
      from: value => {
        getPrice()
      }
    }
  })

  async function getPrice() {
    form.setFieldValue('to', '')
    let amount = new BigNumber(form.values.from).multipliedBy(10 ** fromToken?.decimals).toNumber()

    const params = {
      sellToken: fromToken?.address,
      buyToken: toToken?.address,
      sellAmount: amount,
    };
    const searchParams = new URLSearchParams(params).toString()

    const headers = { "0x-api-key": OX_API }

    const response = await fetch(
      `https://api.0x.org/swap/v1/price?${searchParams}`,
      { headers }
    );

    const swapPriceJSON = await response.json();
    if(swapPriceJSON?.code === 100){
      form.setFieldError('from', 'Price Not Found')
      form.setFieldError('to', 'Price Not Found')
      return 
    }
    const buyAmt = new BigNumber(swapPriceJSON?.buyAmount).dividedBy(10 ** toToken?.decimals).toNumber()
    form.setFieldValue('to', buyAmt)
    form.setFieldValue('gasPrice', swapPriceJSON?.estimatedGas)
  }

  useEffect(() => {
    getTokens()
  }, [])

  return (
    <div style={{ height: '100vh' }}>
      <SelectTokenModal commonTokens={commonTokens} tokens={tokens} select={selectToken} open={opened} closeModal={close} selectedToken={currentSelectOption === 'to' ? toToken : fromToken} />
      <Center className='h-100'>
        <Paper p={'lg'} radius={'md'} style={{
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
          width: '450px',
          maxWidth: '94%'
        }}>
          <Stack>
            <SelectTokenInput label='From' onClick={() => {
              setCurrentSelectOption('from')
              open()
            }}
              selectedToken={fromToken}
              disabled={(!fromToken || !toToken)}
              option={'from'}
              form={form}
            />

            <SelectTokenInput label='To' onClick={() => {
              setCurrentSelectOption('to')
              open()
            }}
              selectedToken={toToken}
              disabled={true}
              option={'to'}
              form={form}
            />
            <Text>Estimated Gas: {formatNumber(form.values.gasPrice)} </Text>
          </Stack>
        </Paper>
      </Center>
    </div>
  )
}

export default SwapForm