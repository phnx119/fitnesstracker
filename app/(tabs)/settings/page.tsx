// app/(tabs)/exercise/page.tsx
'use client';

import { Stack, Button, Typography, Box } from "@mui/material";

export default function Settings() {
  return (
    <Stack sx={{flex: 1, gap: 1, m: 1}} >
      <Box sx={{flex: 1, bgcolor: "red"}} />
      <Button>maus</Button>
      <Box sx={{flex: 1, bgcolor: "green"}} />
      

      <Stack 
        direction="row" 
        sx={{bgcolor: "blue"}}
      >
        <Button variant="contained">maus2</Button>
        <Box sx={{flex: 1}} />
        <Button variant="contained">maus2</Button>
      </Stack>
    </Stack>
  );
}