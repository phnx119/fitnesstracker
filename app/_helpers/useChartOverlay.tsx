import { useEffect, useMemo, useRef, useState } from 'react';

// USAGE:
// const { containerRef, registerPointRef, overlay } = useChartOverlay(
//    pointIds,
//    {
//        lineColor: '#ffffff',
//        lineWidth: 2.5,
//        pointRadius: 3,
//    },
// );
//
// put containerRef onto the outer Stack that contains the elements
// put registerPointRef() onto each column:
//     ref={(el) => registerPointRef(set.id, el)}
// put {overlay} into the outer stack or with same size and pos

export function useChartOverlay(
    pointIds: (string | number)[],
    options: {
        lineColor?: string;
        lineWidth?: number;
        pointRadius?: number;
        zIndex?: number;
    } = {},
) {
    const {
        lineColor = '#1976d2',
        lineWidth = 2.5,
        pointRadius = 4,
        zIndex = 2,
    } = options;

    const containerRef = useRef<HTMLDivElement>(null);
    const nodesRef = useRef<Map<string | number, HTMLElement>>(new Map());
    const [points, setPoints] = useState<
        { id: string | number; x: number; y: number }[]
    >([]);

    const registerPointRef = (id: string | number, el: HTMLElement | null) => {
        if (el) {
            nodesRef.current.set(id, el);
        } else {
            nodesRef.current.delete(id);
        }
    };

    const pointKeysSerialized = pointIds.join(',');

    useEffect(() => {
        const updatePoints = () => {
            const container = containerRef.current;
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const newPoints: { id: string | number; x: number; y: number }[] =
                [];

            pointIds.forEach((id) => {
                const el = nodesRef.current.get(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    newPoints.push({
                        id,
                        x: rect.left - containerRect.left + rect.width / 2,
                        y: rect.top - containerRect.top,
                    });
                }
            });

            setPoints(newPoints);
        };

        updatePoints();
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(updatePoints);
        observer.observe(container);
        container.addEventListener('scroll', updatePoints, { passive: true });

        return () => {
            observer.disconnect();
            container.removeEventListener('scroll', updatePoints);
        };
    }, [pointIds, pointKeysSerialized]);

    const polylinePoints = useMemo(
        () => points.map((p) => `${p.x},${p.y}`).join(' '),
        [points],
    );

    const overlay = useMemo(() => {
        return (
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex,
                }}
            >
                {points.length > 1 && (
                    <polyline
                        fill="none"
                        stroke={lineColor}
                        strokeWidth={lineWidth}
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
                        r={pointRadius}
                        fill={lineColor}
                    />
                ))}
            </svg>
        );
    }, [zIndex, lineColor, lineWidth, pointRadius, points, polylinePoints]);

    return {
        containerRef,
        registerPointRef,
        overlay,
    };
}
