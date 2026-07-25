// app/(tabs)/exercise/page.tsx
'use client';

import { Stack, Button, Typography } from "@mui/material";

export default function ExercisePage() {
  return (
    <Stack>
      <Typography>
        Exercise Tracker
      </Typography>
      <Button variant="contained" color="primary">
        Log Workout
      </Button>
    </Stack>
  );
}