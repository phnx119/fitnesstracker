'use client';

import { Row } from '@/database/db';
import { Box, Card, Typography, useTheme } from '@mui/material';
import type { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';

// Exact type structure derived from your Dexie db query
export type MachineSessionWithSets = Row<'MachineSession'> & {
    setRecords: Row<'SetRecord'>[];
};

interface MachineProgressChartProps {
    machineData: MachineSessionWithSets[];
    onSelectSession: (sessionId: number) => void;
    selectedSessionId?: number;
}

interface CustomChartDataItem {
    value: number;
    sessionId: number;
    repSummary: string;
    totalSets: number;
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

    const dates = machineData.map((session) => session.date);

    const chartData: CustomChartDataItem[] = machineData.map((session) => {
        // Sort sets by setNumber to ensure chronological rep string
        const sortedSets = [...session.setRecords].sort(
            (a, b) => a.setNumber - b.setNumber,
        );

        // Find the max weight lifted during this session
        const topSet = sortedSets.reduce(
            (max, curr) => (curr.weight > max.weight ? curr : max),
            sortedSets[0] || { weight: 0, reps: 0 },
        );

        const repSummary = sortedSets.map((set) => set.reps).join(' • ');
        const isSelected = session.id === selectedSessionId;

        return {
            value: topSet.weight,
            sessionId: session.id,
            repSummary,
            totalSets: sortedSets.length,
            symbolSize: isSelected ? 12 : 8,
            itemStyle: {
                color: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.info.main,
                borderColor: isSelected
                    ? theme.palette.primary.light
                    : theme.palette.info.dark,
                borderWidth: 2,
            },
        };
    });

    const option: EChartsOption = {
        backgroundColor: 'transparent',
        grid: {
            left: '4%',
            right: '6%',
            bottom: '14%',
            top: '18%',
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            textStyle: { color: theme.palette.text.primary },
            formatter: (params: unknown) => {
                const paramArray = (
                    Array.isArray(params) ? params : [params]
                ) as ChartCallbackParams[];
                const data = paramArray[0]?.data as
                    | CustomChartDataItem
                    | undefined;
                if (!data) return '';

                return `
          <div style="font-weight: 600; margin-bottom: 4px;">${paramArray[0].axisValue ?? ''}</div>
          <div>Top Weight: <strong style="color: ${theme.palette.primary.main}">${data.value} kg</strong></div>
          <div style="color: ${theme.palette.text.secondary}; font-size: 11px; margin-top: 2px;">
            Reps per set: <strong>${data.repSummary}</strong>
          </div>
        `;
            },
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLine: { lineStyle: { color: theme.palette.divider } },
            axisLabel: {
                color: theme.palette.text.secondary,
                fontSize: 11,
                margin: 12,
            },
            axisTick: { show: false },
        },
        yAxis: {
            type: 'value',
            name: 'Weight (kg)',
            nameTextStyle: {
                color: theme.palette.text.secondary,
                fontSize: 10,
                align: 'right',
            },
            scale: true,
            splitLine: {
                lineStyle: { color: theme.palette.divider, type: 'dashed' },
            },
            axisLabel: { color: theme.palette.text.secondary, fontSize: 10 },
        },
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'none',
            },
        ],
        series: [
            {
                name: 'Weight Progression',
                type: 'line',
                smooth: 0.3,
                data: chartData,
                lineStyle: {
                    color: theme.palette.info.main,
                    width: 3,
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
                                color: `${theme.palette.info.main}40`,
                            },
                            {
                                offset: 1,
                                color: `${theme.palette.info.main}00`,
                            },
                        ],
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    distance: 6,
                    formatter: (params: unknown) => {
                        const p = params as ChartCallbackParams;
                        const data = p.data as CustomChartDataItem;
                        return `{w|${p.value}kg}\n{r|${data.repSummary}}`;
                    },
                    rich: {
                        w: {
                            color: theme.palette.text.primary,
                            fontSize: 12,
                            fontWeight: 'bold',
                            lineHeight: 14,
                        },
                        r: {
                            color: theme.palette.text.secondary,
                            fontSize: 9,
                            lineHeight: 12,
                        },
                    },
                },
            },
        ],
    };

    const handleChartClick = (params: ChartCallbackParams): void => {
        const data = params.data as CustomChartDataItem | undefined;
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
            <Box sx={{ mb: 1 }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 700 }}
                >
                    Progress Trajectory
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Pinch or drag to zoom across workout dates
                </Typography>
            </Box>

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
