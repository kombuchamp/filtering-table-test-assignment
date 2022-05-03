import React, { FC } from 'react';

import { Box, Chip } from '@mui/material';

/**
 * Renders a set of strings within chips
 *
 */
export const BreadCrumbs: FC<{
    values: string[];
}> = ({ values }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
            }}
        >
            {values.map((value) => (
                <Chip size={'small'} key={value} label={value} />
            ))}
        </Box>
    );
};
