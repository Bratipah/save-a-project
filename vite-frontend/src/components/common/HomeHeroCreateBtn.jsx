import React, { useState } from 'react'
import { useMantineTheme, Button, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';


export function HomeHeroDonateBtn() {
    const [open, setOpen] = useState(false)
    const theme = useMantineTheme()

    return (
        <Anchor component={Link} to={'/campaigns'}>
            <Button onClick={() => setOpen(o => !o)} radius="xl" px="xl" color="indigo">
                Donate Today
            </Button>
        </Anchor>
    );
}

function HomeHeroCreateBtn() {
    const [open, setOpen] = useState(false)
    const theme = useMantineTheme()

    return (
        <Anchor component={Link} to={'/create/campaign'}>
            <Button onClick={() => setOpen(o => !o)} radius="xl" px="xl" color="purple" variant="outline">
                    Create Campaign
                </Button>
        </Anchor>
        
    );
}


export default HomeHeroCreateBtn