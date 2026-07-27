export default function GlobalLoading() {
    return (
        <div className="flex min-h-[50vh] w-full items-center justify-center p-6">
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-slate-200" />
                <p className="text-xs font-medium text-slate-400">Loading...</p>
            </div>
        </div>
    );
}
