import { Row } from '@/database/db';
import { Card, Divider, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export default function Chart({
    data,
    setActiveSessionId,
}: {
    data: ({
        machineId: number;
        date: number;
    } & {
        id: number;
    } & {
        setRecords: Row<'SetRecord'>[];
    })[];
    setActiveSessionId: Dispatch<SetStateAction<number | null>>;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<Map<number, HTMLDivElement>>(new Map());
    const [points, setPoints] = useState<
        { id: number; x: number; y: number }[]
    >([]);
    const [svgSize, setSvgSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    const maxWeight = Math.max(
        0,
        ...data.flatMap((item) =>
            item.setRecords.map((record) => record.weight),
        ),
    );

    const updatePoints = () => {
        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const scrollLeft = container.scrollLeft;
        const scrollTop = container.scrollTop;

        setSvgSize({
            width: container.scrollWidth,
            height: container.scrollHeight,
        });

        const newPoints: { id: number; x: number; y: number }[] = [];

        data.forEach((session) => {
            session.setRecords.forEach((set) => {
                const el = barsRef.current.get(set.id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Exact top-center coordinate relative to full scrollable container area
                    const x =
                        rect.left -
                        containerRect.left +
                        scrollLeft +
                        rect.width / 2;
                    const y = rect.top - containerRect.top + scrollTop;
                    newPoints.push({ id: set.id, x, y });
                }
            });
        });

        setPoints(newPoints);
    };

    useEffect(() => {
        updatePoints();
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(updatePoints);
        observer.observe(container);

        return () => observer.disconnect();
    }, [data]);

    const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Card sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                <Stack
                    ref={containerRef}
                    sx={{
                        flex: 1,
                        gap: 1,
                        overflow: 'auto',
                        height: '100%',
                        position: 'relative',
                    }}
                    direction="row"
                    divider={<Divider orientation="vertical" />}
                >
                    {svgSize.width > 0 && (
                        <svg
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: svgSize.width,
                                height: svgSize.height,
                                pointerEvents: 'none',
                                zIndex: 2,
                            }}
                        >
                            {points.length > 1 && (
                                <polyline
                                    fill="none"
                                    stroke="#1976d2"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points={polylinePoints}
                                />
                            )}
                            {points.map((p) => (
                                <circle
                                    key={p.id}
                                    cx={p.x}
                                    cy={p.y}
                                    r="4"
                                    fill="#1976d2"
                                />
                            ))}
                        </svg>
                    )}

                    {data.map((session) => (
                        <Stack
                            key={session.id}
                            sx={{ height: '100%', zIndex: 1 }}
                            onClick={() => setActiveSessionId(session.id)}
                        >
                            <Stack
                                sx={{
                                    gap: 1,
                                    height: '100%',
                                    bgcolor: 'green',
                                    alignItems: 'flex-end',
                                }}
                                direction="row"
                            >
                                {session.setRecords.map((set) => {
                                    const calculatedHeight =
                                        maxWeight > 0
                                            ? (set.weight / maxWeight) * 100
                                            : 0;

                                    return (
                                        <Stack
                                            key={set.id}
                                            ref={(el) => {
                                                if (el)
                                                    barsRef.current.set(
                                                        set.id,
                                                        el,
                                                    );
                                                else
                                                    barsRef.current.delete(
                                                        set.id,
                                                    );
                                            }}
                                            sx={{
                                                height: `${calculatedHeight}%`,
                                                bgcolor: 'red',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                minWidth: 25,
                                                gap: 1,
                                                pb: 1,
                                            }}
                                        >
                                            <Typography>
                                                {set.weight}
                                            </Typography>
                                            <Typography sx={{ fontSize: 13 }}>
                                                {set.reps}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                            </Stack>
                            <Typography
                                sx={{ fontSize: 10, textAlign: 'center' }}
                            >
                                {new Date(session.date).toLocaleDateString(
                                    'de-DE',
                                    {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit',
                                    },
                                )}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Card>
        </Stack>
    );
}
