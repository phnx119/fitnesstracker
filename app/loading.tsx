'use client';

export default function Loading() {
    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                color: '#71717a',
                fontSize: '0.875rem',
            }}
        >
            <div
                aria-label="Loading"
                style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    border: '2px solid currentColor',
                    borderTopColor: 'transparent',
                    borderRadius: '9999px',
                    animation: 'spin 0.8s linear infinite',
                }}
            />
            <span>Loading...</span>
        </div>
    );
}
