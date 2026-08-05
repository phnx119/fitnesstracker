'use client';
import { Row } from '@/database/db';
import { Box, Card, useTheme } from '@mui/material';
import type { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

export type MachineSessionWithSets = Row<'MachineSession'> & {
    setRecords: Row<'SetRecord'>[];
};

interface MachineProgressChartProps {
    machineData: MachineSessionWithSets[];
    onSelectSession: (sessionId: number) => void;
    selectedSessionId?: number;
}

interface SetChartDataItem {
    value: number; // weight
    reps: number;
    setNumber: number;
    sessionId: number;
    date: string;
    isFirstInSession: boolean;
    symbolSize: number;
    itemStyle: {
        color: string;
        borderColor: string;
        borderWidth: number;
    };
}

interface ChartCallbackParams {
    componentType?: string;
    seriesType?: string;
    seriesIndex?: number;
    seriesName?: string;
    name?: string;
    dataIndex?: number;
    data?: unknown;
    value?: number | number[];
    axisValue?: string | number;
}

export default function MachineProgressChart({
    machineData,
    onSelectSession,
    selectedSessionId,
}: MachineProgressChartProps) {
    const theme = useTheme();

    // 1. Flatten every set into an individual point on the chart
    const flatSetData: SetChartDataItem[] = [];
    const sessionSeparators: number[] = [];

    let globalIndex = 0;
    const sessionStartIndexMap: number[] = [];

    machineData.forEach((session, sessionIdx) => {
        const sortedSets = [...session.setRecords].sort(
            (a, b) => a.setNumber - b.setNumber,
        );

        const isSessionSelected = session.id === selectedSessionId;
        sessionStartIndexMap.push(globalIndex);

        sortedSets.forEach((set, setIdx) => {
            flatSetData.push({
                value: set.weight,
                reps: set.reps,
                setNumber: set.setNumber,
                sessionId: session.id,
                date: session.date,
                isFirstInSession: setIdx === 0,
                symbolSize: isSessionSelected ? 10 : 7,
                itemStyle: {
                    color: isSessionSelected
                        ? theme.palette.primary.main
                        : theme.palette.info.main,
                    borderColor: '#ffffff',
                    borderWidth: 2,
                },
            });

            // Mark vertical line boundary between sessions
            if (
                setIdx === sortedSets.length - 1 &&
                sessionIdx < machineData.length - 1
            ) {
                sessionSeparators.push(globalIndex + 0.5);
            }

            globalIndex++;
        });
    });

    // 2. Compute dataZoom start/end indices for last 3 sessions
    const totalSessions = machineData.length;
    const targetSessionIndex = Math.max(0, totalSessions - 3);
    const zoomStartIndex = sessionStartIndexMap[targetSessionIndex] ?? 0;
    const zoomEndIndex = Math.max(0, flatSetData.length - 1);

    // 3. Vertical markLines for session separation
    const markLineData = sessionSeparators.map((sepIndex) => ({
        xAxis: sepIndex,
        lineStyle: {
            color: '#475569',
            type: 'dashed' as const,
            width: 1.5,
        },
        label: { show: false },
    }));

    const option: EChartsOption = {
        backgroundColor: 'transparent',
        grid: {
            left: '4%',
            right: '6%',
            bottom: '18%',
            top: '12%',
            containLabel: true,
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: '#0f172a',
            borderColor: '#334155',
            textStyle: { color: '#ffffff' },
            formatter: (params: unknown) => {
                const p = params as ChartCallbackParams;
                const data = p.data as SetChartDataItem | undefined;
                if (!data) return '';

                return `
          <div style="font-weight: 600; color: #ffffff;">${data.date}</div>
          <div style="color: #94a3b8; font-size: 11px;">Set ${data.setNumber}</div>
          <div style="margin-top: 4px; color: #ffffff;">
            Weight: <strong style="color: ${theme.palette.info.main}">${data.value}</strong>
          </div>
          <div style="color: #ffffff;">Reps: <strong>${data.reps}</strong></div>
        `;
            },
        },
        xAxis: {
            type: 'category',
            data: flatSetData.map((d) => d.date),
            axisLine: { lineStyle: { color: '#475569' } },
            axisTick: { show: false },
            axisLabel: {
                interval: 0,
                margin: 10,
                formatter: (_value: string, index: number) => {
                    const item = flatSetData[index];
                    if (!item) return '';

                    // First line: Rep count for this set
                    // Second line: Date (only displayed on the first set of each session)
                    const repsLine = `{r|${item.reps}}`;
                    const dateLine = item.isFirstInSession
                        ? `{d|${item.date}}`
                        : '';

                    return `${repsLine}\n${dateLine}`;
                },
                rich: {
                    r: {
                        color: '#94a3b8',
                        fontSize: 10,
                        lineHeight: 14,
                        align: 'center',
                    },
                    d: {
                        color: '#f8fafc',
                        fontSize: 10,
                        lineHeight: 14,
                        align: 'center',
                    },
                },
            },
        },
        yAxis: {
            type: 'value',
            nameTextStyle: { color: '#94a3b8', fontSize: 10, align: 'right' },
            scale: true,
            splitLine: { lineStyle: { color: '#334155', type: 'dashed' } },
            axisLabel: { color: '#f8fafc', fontSize: 10 },
        },
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'none',
                startValue: zoomStartIndex,
                endValue: zoomEndIndex,
            },
        ],
        series: [
            {
                name: 'Set Progress',
                type: 'line',
                smooth: 0.2,
                data: flatSetData,
                lineStyle: {
                    color: theme.palette.info.main,
                    width: 2.5,
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: `${theme.palette.info.main}30`,
                            },
                            {
                                offset: 1,
                                color: `${theme.palette.info.main}00`,
                            },
                        ],
                    },
                },
                markLine: {
                    silent: true,
                    symbol: ['none', 'none'],
                    data: markLineData,
                },
                label: {
                    show: true,
                    position: 'top',
                    distance: 6,
                    formatter: (params: unknown) => {
                        const p = params as ChartCallbackParams;
                        const data = p.data as SetChartDataItem;
                        // Display only raw weight number above the node
                        return `{w|${data.value}}`;
                    },
                    rich: {
                        w: {
                            color: '#ffffff',
                            fontSize: 11,
                            fontWeight: 'bold',
                        },
                    },
                },
            },
        ],
    };

    const handleChartClick = (params: ChartCallbackParams): void => {
        const data = params.data as SetChartDataItem | undefined;
        if (data?.sessionId !== undefined) {
            onSelectSession(data.sessionId);
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                p: 2,
                borderRadius: 3,
                bgcolor: 'background.paper',
            }}
        >
            <Box sx={{ width: '100%', height: 320 }}>
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    onEvents={{
                        click: handleChartClick,
                    }}
                />
            </Box>
        </Card>
    );
}
