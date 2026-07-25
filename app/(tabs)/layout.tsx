// app/(tabs)/layout.tsx
import BottomNav from "@/app/components/navigation/BottomNav";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 w-full max-w-md mx-auto bg-zinc-50 dark:bg-black relative overflow-hidden">
      {/* Scrollable screen content with bottom padding so content isn't hidden behind the bar */}
      <main className="flex-1 flex flex-col overflow-y-auto pb-20">
        {children}
      </main>

      {/* MUI Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
}