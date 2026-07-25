import { Stack } from "@mui/material";

export const metadata = {
  title: "Offline",
  description: "You are offline",
};

export default function OfflinePage() {
  return (
    <Stack>
      <h1 className="text-2xl font-semibold">You’re offline</h1>
      <p className="mt-2 text-sm text-zinc-600">
        This app has been installed and can be opened offline. Please reconnect to refresh content.
      </p>
    </Stack>
  );
}
