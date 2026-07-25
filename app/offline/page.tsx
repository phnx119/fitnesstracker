export const metadata = {
  title: "Offline",
  description: "You are offline",
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center">
      <h1 className="text-2xl font-semibold">You’re offline</h1>
      <p className="mt-2 text-sm text-zinc-600">
        This app has been installed and can be opened offline. Please reconnect to refresh content.
      </p>
    </main>
  );
}
