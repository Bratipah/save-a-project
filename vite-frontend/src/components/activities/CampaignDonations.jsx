import React, { useEffect, useState } from 'react'
import { ScrollArea, Table, Group, Text, Pagination } from '@mantine/core'
import { contract } from '../../utils/config'
import { createObject, getReadableTokenBalance, limitChars } from '../../configs/appfunctions'

const donationKeys = ['campaignId', 'donor', 'amount', 'date']

const CampaignDonations = (props) => {

    const { category, id } = props

    const [donations, setDonations] = useState([])
    const [count, setCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const no_of_pages = Math.ceil(count / limit)

    const loadDonations = () => {
        contract?.methods.getCampaignDonations(id, 1).call().then(res => {
            const donations_ = res?.map(donation => createObject(donationKeys, donation))
            setDonations(donations_)
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        loadDonations()
    }, [page])
    return (
        <div>
            <Group position='right'>
                <Pagination total={no_of_pages} page={page} onChange={page => setPage(page)} />
            </Group>
            <ScrollArea my="xl">
                <Table verticalSpacing={16} fontSize="sm" striped>
                    <thead>
                        <tr>
                            <th className='custom-th'>Donor</th>
                            <th className='custom-th'>Token</th>
                            <th className='custom-th'>Amount</th>
                            <th className='custom-th'>Amount USD</th>
                            <th className='custom-th'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donations?.map((don, i) => (
                                <tr key={`donation_${i}`}>
                                    <td>{limitChars(don?.donor, 20)}</td>
                                    <td>
                                        ETH
                                    </td>
                                    <td>
                                        {
                                            getReadableTokenBalance(don?.amount, 18)
                                        }
                                    </td>
                                    <td>
                                        <Group position='apart'>
                                            <Text size="sm">$</Text>
                                            <Text size="sm">{getReadableTokenBalance(don?.amount, 18)}</Text>
                                        </Group>
                                    </td>
                                    <td>{new Date(don?.date).toDateString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </ScrollArea>
            <Group position='right'>
                <Pagination total={no_of_pages} page={page} onChange={page => setPage(page)} />
            </Group>
        </div>
    )
}

export default CampaignDonations