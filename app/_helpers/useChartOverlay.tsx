import {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
    type RefObject,
} from 'react';

// USAGE:
// const { containerRef, registerPointRef, overlay } = useChartOverlay(
//    pointIds,
//    {
//        lineColor: '#ffffff',
//        lineWidth: 2.5,
//        pointRadius: 3,
//        zIndex: 999,
//        tension: 0,
//    },
// );
//
// put containerRef onto the outer Stack that contains the elements
// put registerPointRef() onto each column:
//     ref={(el) => registerPointRef(set.id, el)}
// put {overlay} into the stack that contains the scrolling items THE STACK HAS TO BE POSITION RELATIVE

export type PointId = string | number;

export type OverlayPoint = {
    id: PointId;
    x: number;
    y: number;
};

export type ChartOverlayOptions = {
    /** Stroke color for the line and point fills. @default '#1976d2' */
    lineColor?: string;
    /** Stroke width of the connecting line in pixels. @default 2.5 */
    lineWidth?: number;
    /** Radius of the point markers in pixels. @default 4 */
    pointRadius?: number;
    /** Stack order index for the SVG element. @default 2 */
    zIndex?: number;
    /** Curvature intensity: 0 = straight lines, 0.5 = smooth spline, 1.0 = pronounced curve. @default 0 */
    tension?: number;
};

export type UseChartOverlayReturn<
    TContainer extends HTMLElement = HTMLDivElement,
> = {
    /** Ref to attach to the scrollable container (`position: relative` required) */
    containerRef: RefObject<TContainer | null>;
    /** Callback ref to register each target point node */
    registerPointRef: (id: PointId, el: HTMLElement | null) => void;
    /** Pre-rendered SVG overlay element */
    overlay: ReactNode;
    /** Raw computed coordinates for custom renders or tooltips */
    points: OverlayPoint[];
};

function getSplinePath(points: OverlayPoint[], tension: number = 0): string {
    if (points.length < 2) return '';

    if (tension <= 0 || points.length === 2) {
        return points.reduce(
            (acc, p, i) =>
                i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`,
            '',
        );
    }

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? i : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

        const cp1x = p1.x + ((p2.x - p0.x) / 3) * tension;
        const cp1y = p1.y + ((p2.y - p0.y) / 3) * tension;

        const cp2x = p2.x - ((p3.x - p1.x) / 3) * tension;
        const cp2y = p2.y - ((p3.y - p1.y) / 3) * tension;

        path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`;
    }

    return path;
}

function computePointCoordinates(
    container: HTMLElement,
    pointIds: PointId[],
    nodesMap: Map<PointId, HTMLElement>,
): OverlayPoint[] {
    const containerRect = container.getBoundingClientRect();
    const newPoints: OverlayPoint[] = [];

    for (const id of pointIds) {
        const el = nodesMap.get(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        newPoints.push({
            id,
            x:
                rect.left -
                containerRect.left +
                container.scrollLeft +
                rect.width / 2,
            y: rect.top - containerRect.top + container.scrollTop,
        });
    }

    return newPoints;
}

export function useChartOverlay<
    TContainer extends HTMLElement = HTMLDivElement,
>(
    pointIds: PointId[],
    options: ChartOverlayOptions = {},
): UseChartOverlayReturn<TContainer> {
    const {
        lineColor = '#1976d2',
        lineWidth = 2.5,
        pointRadius = 4,
        zIndex = 2,
        tension = 0,
    } = options;

    const containerRef = useRef<TContainer | null>(null);
    const nodesRef = useRef<Map<PointId, HTMLElement>>(new Map());
    const [points, setPoints] = useState<OverlayPoint[]>([]);

    const registerPointRef = useCallback(
        (id: PointId, el: HTMLElement | null) => {
            if (el) {
                nodesRef.current.set(id, el);
            } else {
                nodesRef.current.delete(id);
            }
        },
        [],
    );

    const serializedPointIds = useMemo(() => pointIds.join(','), [pointIds]);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const activeIds = new Set(pointIds);
        Array.from(nodesRef.current.keys()).forEach((key) => {
            if (!activeIds.has(key)) {
                nodesRef.current.delete(key);
            }
        });

        let rafId: number | null = null;

        const updatePoints = () => {
            const calculated = computePointCoordinates(
                container,
                pointIds,
                nodesRef.current,
            );
            setPoints(calculated);
        };

        const handleResize = () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updatePoints);
        };

        updatePoints();

        const observer = new ResizeObserver(handleResize);
        observer.observe(container);
        nodesRef.current.forEach((node) => observer.observe(node));

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            observer.disconnect();
        };
    }, [pointIds, serializedPointIds]);

    const pathD = useMemo(
        () => getSplinePath(points, tension),
        [points, tension],
    );

    const overlay = useMemo(() => {
        if (points.length === 0) return null;

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
                    overflow: 'visible',
                }}
            >
                {pathD && (
                    <path
                        d={pathD}
                        fill="none"
                        stroke={lineColor}
                        strokeWidth={lineWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
    }, [points, pathD, lineColor, lineWidth, pointRadius, zIndex]);

    return {
        containerRef,
        registerPointRef,
        overlay,
        points,
    };
}
