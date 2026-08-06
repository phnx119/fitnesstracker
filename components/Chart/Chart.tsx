import { Row } from '@/database/db';
import { Card, Divider, Stack, Typography } from '@mui/material';
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

const CHART_CONFIG = {
    MAX_BAR_HEIGHT_PERCENT: 98, // Scaled down to prevent clipping at top
    MIN_BAR_WIDTH: 25,
    LINE_COLOR: '#fafbfb',
    LINE_WIDTH: 2.5,
    POINT_RADIUS: 4,
} as const;

export type SessionWithSets = {
    id: number;
    machineId: number;
    date: number;
    setRecords: Row<'SetRecord'>[];
};

interface ChartProps {
    data: SessionWithSets[];
    setActiveSessionId: Dispatch<SetStateAction<number | null>>;
    maxHeightPercent?: number;
}

function useChartOverlay(data: SessionWithSets[]) {
    const containerRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<Map<number, HTMLDivElement>>(new Map());
    const [points, setPoints] = useState<
        { id: number; x: number; y: number }[]
    >([]);
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

    const registerBarRef = (id: number, el: HTMLDivElement | null) => {
        if (el) barsRef.current.set(id, el);
        else barsRef.current.delete(id);
    };

    useEffect(() => {
        const updatePoints = () => {
            const container = containerRef.current;
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const { scrollLeft, scrollTop, scrollWidth, scrollHeight } =
                container;

            setSvgSize({ width: scrollWidth, height: scrollHeight });

            const newPoints: { id: number; x: number; y: number }[] = [];

            data.forEach((session) => {
                session.setRecords.forEach((set) => {
                    const el = barsRef.current.get(set.id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        newPoints.push({
                            id: set.id,
                            x:
                                rect.left -
                                containerRect.left +
                                scrollLeft +
                                rect.width / 2,
                            y: rect.top - containerRect.top + scrollTop,
                        });
                    }
                });
            });

            setPoints(newPoints);
        };

        updatePoints();
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(updatePoints);
        observer.observe(container);

        return () => observer.disconnect();
    }, [data]);

    return { containerRef, registerBarRef, points, svgSize };
}

export default function Chart({
    data,
    setActiveSessionId,
    maxHeightPercent = CHART_CONFIG.MAX_BAR_HEIGHT_PERCENT,
}: ChartProps) {
    const { containerRef, registerBarRef, points, svgSize } =
        useChartOverlay(data);

    const maxWeight = useMemo(() => {
        return Math.max(
            0,
            ...data.flatMap((item) => item.setRecords.map((r) => r.weight)),
        );
    }, [data]);

    const polylinePoints = useMemo(
        () => points.map((p) => `${p.x},${p.y}`).join(' '),
        [points],
    );

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
                    {/* Overlay Line Chart */}
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
                                    stroke={CHART_CONFIG.LINE_COLOR}
                                    strokeWidth={CHART_CONFIG.LINE_WIDTH}
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
                                    r={CHART_CONFIG.POINT_RADIUS}
                                    fill={CHART_CONFIG.LINE_COLOR}
                                />
                            ))}
                        </svg>
                    )}

                    {/* Bars & Sessions */}
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
                                            ? (set.weight / maxWeight) *
                                              maxHeightPercent
                                            : 0;

                                    return (
                                        <Stack
                                            key={set.id}
                                            ref={(el) =>
                                                registerBarRef(set.id, el)
                                            }
                                            sx={{
                                                height: `${calculatedHeight}%`,
                                                bgcolor: 'red',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                minWidth:
                                                    CHART_CONFIG.MIN_BAR_WIDTH,
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
