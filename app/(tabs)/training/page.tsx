// app/(tabs)/exercise/page.tsx
'use client';

import { Stack, Button, Typography } from "@mui/material";

export default function ExercisePage() {
  return (
    <Stack sx={{flex: 1}}>
      <Typography>
        Training
      </Typography>
      <Button variant="contained" color="primary">
        maus
      </Button>
    </Stack>
  );
}