import { Avatar, Group, Paper, Stack, Text } from '@mantine/core'
import React from 'react'
import { getTheme } from '../../config/functions'

export const SingleToken = ({ asset }) => {
    return (
        <Group>
            <Avatar radius="xl" size="sm" src={asset?.logoURI} />
            <Stack spacing={-10}>
                <Text size="sm"><b>${asset?.symbol}</b></Text>
                <Text size="xs">{asset?.name}</Text>
            </Stack>
        </Group>
    )
}

const SelectAsset = ({ asset, select, selectedToken }) => {
    return (
        <Paper mb="xs" px="md" sx={theme => ({
            background: selectedToken?.symbol === asset?.symbol ? getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[1] : "transparent",
            cursor: "pointer",
            pointerEvents: selectedToken?.symbol === asset?.symbol ? "none" : "all",
            ":hover": {
                background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[1]
            }
        })} onClick={e => select(asset)}>
            <SingleToken asset={asset} />
        </Paper>
    )
}

export default SelectAsset