// USAGE:
// const { containerRef, registerPointRef, overlay } = useChartOverlay(
//    {
//        lineColor: '#ffffff',
//        lineWidth: 2.5,
//        pointRadius: 3,
//        zIndex: 999,
//        tension: 0,
//        fillBelowBackground: 'linear-gradient(0deg,rgba(0, 0, 0, 0) 20%, rgba(0, 212, 255, 1) 100%)',
//    }
// );
//
// put containerRef onto the outer Stack that contains the elements
// put registerPointRef() onto each column:
//     ref={(el) => registerPointRef(set.id, el)}
// put {overlay} into the stack that contains the scrolling items THE STACK HAS TO BE POSITION RELATIVE
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

export type PointId = string | number;

export type OverlayPoint = {
    id: PointId;
    x: number;
    y: number;
};

export type ChartOverlayOptions<
    TContainer extends HTMLElement = HTMLDivElement,
> = {
    containerRef?: RefObject<TContainer | null>;
    attributeName?: string;
    lineColor?: string;
    lineWidth?: number;
    pointRadius?: number;
    zIndex?: number;
    tension?: number;
    fillBelowBackground?: string;
    fillAboveBackground?: string;
};

export type UseChartOverlayReturn<
    TContainer extends HTMLElement = HTMLDivElement,
> = {
    containerRef: RefObject<TContainer | null>;
    registerPointRef: (id: PointId, el: HTMLElement | null) => void;
    backgroundOverlay: ReactNode;
    linesOverlay: ReactNode;
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

export function useChartOverlay<
    TContainer extends HTMLElement = HTMLDivElement,
>(
    options: ChartOverlayOptions<TContainer> = {},
): UseChartOverlayReturn<TContainer> {
    const {
        containerRef: externalContainerRef,
        attributeName = 'data-chart-point',
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

    const internalContainerRef = useRef<TContainer | null>(null);
    const containerRef = externalContainerRef ?? internalContainerRef;

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
                el.setAttribute(attributeName, String(id));
            }
        },
        [attributeName],
    );

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let rafId: number | null = null;

        const updatePoints = () => {
            const elements = Array.from(
                container.querySelectorAll<HTMLElement>(`[${attributeName}]`),
            );

            const containerRect = container.getBoundingClientRect();
            const newPoints: OverlayPoint[] = [];

            elements.forEach((el) => {
                const id = el.getAttribute(attributeName);
                if (!id) return;

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
            });

            const contentEl = container.lastElementChild as HTMLElement | null;

            const contentWidth = contentEl
                ? Math.max(container.clientWidth, contentEl.scrollWidth)
                : container.scrollWidth || container.clientWidth;

            const contentHeight = contentEl
                ? Math.max(container.clientHeight, contentEl.scrollHeight)
                : container.scrollHeight || container.clientHeight;

            setState({
                points: newPoints,
                containerWidth: contentWidth,
                containerHeight: contentHeight,
            });
        };

        const handleResize = () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updatePoints);
        };

        updatePoints();

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        const contentEl = container.lastElementChild;
        if (contentEl && contentEl !== container) {
            resizeObserver.observe(contentEl);
        }

        const mutationObserver = new MutationObserver(handleResize);
        mutationObserver.observe(container, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', attributeName],
        });

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [containerRef, attributeName]);

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

    const backgroundOverlay = useMemo(() => {
        if (
            points.length === 0 ||
            (!fillBelowBackground && !fillAboveBackground)
        ) {
            return null;
        }

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
                <svg
                    style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        overflow: 'hidden',
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
                </svg>

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
            </div>
        );
    }, [
        points.length,
        containerWidth,
        containerHeight,
        zIndex,
        fillBelowBackground,
        fillAboveBackground,
        areaBelowPathD,
        areaAbovePathD,
        clipBelowId,
        clipAboveId,
    ]);

    const linesOverlay = useMemo(() => {
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
                    zIndex: zIndex + 1,
                }}
            >
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
        containerWidth,
        containerHeight,
        lineColor,
        lineWidth,
        pointRadius,
        zIndex,
    ]);

    const overlay = useMemo(
        () => (
            <>
                {backgroundOverlay}
                {linesOverlay}
            </>
        ),
        [backgroundOverlay, linesOverlay],
    );

    return {
        containerRef,
        registerPointRef,
        backgroundOverlay,
        linesOverlay,
        overlay,
        points,
    };
}
