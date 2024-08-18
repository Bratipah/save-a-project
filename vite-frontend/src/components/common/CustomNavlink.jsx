import React from 'react'
import {
    Anchor,
    NavLink, useMantineTheme
} from '@mantine/core';

import { Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLinkComponent = (props) => {
    const { to, label } = props.details
    const theme = useMantineTheme()

    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    let matched = match ? true : false

    return (
        <Anchor to={to} component={Link} style={{ textDecoration: "none" }} >
            <NavLink px="lg" className='child' variant='filled' active={matched ? true : false} label={label} sx={{
                borderRadius: theme.radius.md
            }} />
        </Anchor>
    )
}

export default CustomLinkComponent