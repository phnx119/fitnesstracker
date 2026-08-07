import {
    useCallback,
    useId,
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
//        fillBelowBackground: 'linear-gradient(0deg,rgba(0, 0, 0, 0) 20%, rgba(0, 212, 255, 1) 100%)',
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
    /** Any valid CSS `background` value below the curve (e.g. gradients, images, colors). */
    fillBelowBackground?: string;
    /** Any valid CSS `background` value above the curve. */
    fillAboveBackground?: string;
};

export type UseChartOverlayReturn<
    TContainer extends HTMLElement = HTMLDivElement,
> = {
    containerRef: RefObject<TContainer | null>;
    registerPointRef: (id: PointId, el: HTMLElement | null) => void;
    overlay: ReactNode;
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

    const n = points.length;
    const dx: number[] = new Array(n - 1);
    const dy: number[] = new Array(n - 1);
    const slope: number[] = new Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        dx[i] = points[i + 1].x - points[i].x;
        dy[i] = points[i + 1].y - points[i].y;
        slope[i] = dx[i] === 0 ? 0 : dy[i] / dx[i];
    }

    const m: number[] = new Array(n);
    m[0] = slope[0];
    m[n - 1] = slope[n - 2];

    for (let i = 1; i < n - 1; i++) {
        const sPrev = slope[i - 1];
        const sNext = slope[i];

        if (sPrev * sNext <= 0) {
            m[i] = 0;
        } else {
            m[i] = (2 * sPrev * sNext) / (sPrev + sNext);
        }
    }

    if (slope[0] === 0) m[0] = 0;
    if (slope[n - 2] === 0) m[n - 1] = 0;

    let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    const smoothness = tension * 0.5;

    for (let i = 0; i < n - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const spanX = dx[i];

        const cp1x = p1.x + spanX * smoothness;
        const cp1y = p1.y + m[i] * spanX * smoothness;

        const cp2x = p2.x - spanX * smoothness;
        const cp2y = p2.y - m[i + 1] * spanX * smoothness;

        path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }

    return path;
}

function computePointCoordinates(
    container: HTMLElement,
    pointIds: PointId[],
    nodesMap: Map<PointId, HTMLElement>,
): { points: OverlayPoint[]; containerWidth: number; containerHeight: number } {
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

    return {
        points: newPoints,
        containerWidth: container.scrollWidth,
        containerHeight: container.scrollHeight,
    };
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
        fillBelowBackground,
        fillAboveBackground,
    } = options;

    const rawClipBelowId = useId();
    const rawClipAboveId = useId();
    const clipBelowId = `clip-below-${rawClipBelowId.replace(/:/g, '')}`;
    const clipAboveId = `clip-above-${rawClipAboveId.replace(/:/g, '')}`;

    const containerRef = useRef<TContainer | null>(null);
    const nodesRef = useRef<Map<PointId, HTMLElement>>(new Map());

    const [{ points, containerWidth, containerHeight }, setState] = useState<{
        points: OverlayPoint[];
        containerWidth: number;
        containerHeight: number;
    }>({
        points: [],
        containerWidth: 0,
        containerHeight: 0,
    });

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
            const result = computePointCoordinates(
                container,
                pointIds,
                nodesRef.current,
            );
            setState(result);
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

    const areaBelowPathD = useMemo(() => {
        if (!pathD || !fillBelowBackground || points.length < 2) return '';
        const first = points[0];
        const last = points[points.length - 1];
        return `${pathD} L ${last.x.toFixed(2)} ${containerHeight} L ${first.x.toFixed(2)} ${containerHeight} Z`;
    }, [pathD, fillBelowBackground, points, containerHeight]);

    const areaAbovePathD = useMemo(() => {
        if (!pathD || !fillAboveBackground || points.length < 2) return '';
        const first = points[0];
        const last = points[points.length - 1];
        return `${pathD} L ${last.x.toFixed(2)} 0 L ${first.x.toFixed(2)} 0 Z`;
    }, [pathD, fillAboveBackground, points]);

    const overlay = useMemo(() => {
        if (points.length === 0) return null;

        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: containerWidth,
                    height: containerHeight,
                    pointerEvents: 'none',
                    zIndex,
                }}
            >
                {/* HTML Background Layer Below */}
                {fillBelowBackground && areaBelowPathD && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: fillBelowBackground,
                            clipPath: `url(#${clipBelowId})`,
                            WebkitClipPath: `url(#${clipBelowId})`,
                        }}
                    />
                )}

                {/* HTML Background Layer Above */}
                {fillAboveBackground && areaAbovePathD && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: fillAboveBackground,
                            clipPath: `url(#${clipAboveId})`,
                            WebkitClipPath: `url(#${clipAboveId})`,
                        }}
                    />
                )}

                {/* SVG Overlay Layer */}
                <svg
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'visible',
                    }}
                >
                    <defs>
                        {areaBelowPathD && (
                            <clipPath id={clipBelowId}>
                                <path d={areaBelowPathD} />
                            </clipPath>
                        )}
                        {areaAbovePathD && (
                            <clipPath id={clipAboveId}>
                                <path d={areaAbovePathD} />
                            </clipPath>
                        )}
                    </defs>

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
            </div>
        );
    }, [
        points,
        pathD,
        areaBelowPathD,
        areaAbovePathD,
        containerWidth,
        containerHeight,
        lineColor,
        lineWidth,
        pointRadius,
        zIndex,
        fillBelowBackground,
        fillAboveBackground,
        clipBelowId,
        clipAboveId,
    ]);

    return {
        containerRef,
        registerPointRef,
        overlay,
        points,
    };
}
