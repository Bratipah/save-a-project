import React, { useState } from 'react';

import { getTheme } from "./../../config/functions"

import { Modal, Group, Title, TextInput, Paper, Avatar, Stack, Text, ScrollArea, Pagination } from "@mantine/core"


import { Carousel } from "@mantine/carousel"
import SelectAsset from './SelectAsset';

function paginateArray(array, pageNumber, itemsPerPage) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  }



const SelectTokenModal = ({ tokens, commonTokens, select, open, closeModal, selectedToken }) => {

    const [searchedToken, setSearchedToken] = useState("")
    const [page, setPage] = useState(1);

    const perPage = 20
    const totalPages = Math.ceil(filterTokens()?.length / perPage)

    function filterTokens() {
        const filteredTokens = tokens?.filter(token => {
            const regex = new RegExp(searchedToken, 'gi');
            return token.symbol.match(regex) || token.name.match(regex) || token.address.match(regex)
        })
        return filteredTokens
    }

    function getCommonTokens(){
        return tokens?.filter(token => commonTokens?.includes(token?.symbol))
    }
    const selectSingle = (token) => {
        select(token);
        closeModal && closeModal();
    }


    return (
        <Modal overflow='inside' lockScroll
            opened={open}
            title="Select token"
            withCloseButton={true}
            onClose={() => closeModal && closeModal(false)}
            radius="lg"
            size={'sm'}
            styles={{
                body: {
                    height: 'calc(100dvh - (10dvh * 2))',
                },
            }}
        >
            <Stack style={{ height: "180px", }} spacing={10}>
                <TextInput value={searchedToken} onChange={e => setSearchedToken(e.target.value)}
                    size='md' radius="md"
                    placeholder="Search by name, symbol or address"
                    className='w-100' 
                    sx={theme => ({
                        ".mantine-TextInput-input": {
                            // borderStyle: "dashed",
                            borderWidth: "2px !important",
                            borderColor: theme.colors.pink[6],
                        }
                    })} />
                <Title order={5}>Common tokens</Title>
                <Carousel slideGap={10} align="start" loop speed={500}>
                    {
                        getCommonTokens()?.map((item, i) => (
                            <Carousel.Slide key={`token_s_${i}`} size={120}>
                                <SelectAssetBtn asset={item} select={selectSingle} selectedToken={selectedToken} />
                            </Carousel.Slide>
                        ))
                    }
                </Carousel>
                <Pagination total={totalPages} value={page} onChange={setPage} siblings={0} />
            </Stack>
            <ScrollArea scrollbarSize={10} style={{ height: "calc(100% - 180px)" }}>
                {/* <Box style={{ height: "1000px" }} /> */}
                {/* <Paper py="xs"> */}
                {
                    paginateArray(filterTokens(), page, perPage)?.map((item, i) => (
                        <SelectAsset key={`dfd_${i}`} asset={item} select={selectSingle} selectedToken={selectedToken} />
                    ))
                }
                {/* </Paper> */}
            </ScrollArea>
        </Modal>
    )
}


const SelectAssetBtn = ({ asset, select, selectedToken }) => {
    return (
        <Paper sx={theme => ({
            background: selectedToken?.symbol === asset?.symbol ? getTheme(theme) ? theme.colors.dark[6] : theme.colors.gray[1] : "transparent",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "10px",
            borderColor: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[4],
            pointerEvents: selectedToken?.symbol === asset?.symbol ? "none" : "all",
            padding: "4px 6px",
            cursor: "pointer"
        })} onClick={e => select(asset)}>
            <Group spacing="xs">
                <Avatar size="sm" src={asset?.logoURI} />
                <Text size="sm">{asset?.symbol}</Text>
            </Group>
        </Paper>
    )
}

export default SelectTokenModal