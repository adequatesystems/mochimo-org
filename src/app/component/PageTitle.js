import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PageTitle({ title }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        {title}
      </Typography>
    </Box>
  );
}
