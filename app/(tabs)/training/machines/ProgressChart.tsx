/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Row } from '@/database/db';
import { Box } from '@mui/material';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useMemo } from 'react';

echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

type SessionData = {
    machineId: number;
    date: string;
    id: number;
    setRecords: Row<'SetRecord'>[];
};

interface MachineProgressChartProps {
    machineData: SessionData[];
}

// Adjust colors to match image_3.png
const chartCyan = '#00B0FF';
const darkGridLine = 'rgba(74, 74, 74, 0.4)';

export default function MachineProgressChart({
    machineData,
}: MachineProgressChartProps) {
    const chartOptions = useMemo(() => {
        const seriesData: (any[] | null)[] = [];
        const reps: string[] = [];
        const dates: string[] = [];

        let xIndex = 0;

        // Ensure data is sorted by date chronologically
        const sortedSessions = [...machineData].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        sortedSessions.forEach((session, sessionIndex) => {
            const sortedSets = [...session.setRecords].sort(
                (a, b) => a.setNumber - b.setNumber,
            );

            // Determine the middle index to center the date string
            const middleIndex = Math.floor((sortedSets.length - 1) / 2);

            sortedSets.forEach((set, setIndex) => {
                // Using [xIndex, yValue] array format allows us to skip indices for breaks
                // without adding an empty string to the x-axis categories.
                seriesData.push([xIndex, set.weight]);
                reps.push(set.reps.toString());
                dates.push(setIndex === middleIndex ? session.date : '');
                xIndex++;
            });

            // Insert a null element to break the line between sessions
            if (sessionIndex < sortedSessions.length - 1) {
                seriesData.push(null);
            }
        });

        return {
            grid: {
                top: 40, // Increased top padding so the top labels aren't cut off
                right: 20,
                bottom: 60,
                left: 40,
                // containLabel: true,
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    const data = params[0].value;
                    if (!data) return '';

                    const weight = data[1];
                    const rep = params[0].axisValue;
                    return `${weight} / ${rep}`;
                },
            },
            xAxis: [
                {
                    type: 'category',
                    data: reps,
                    axisTick: {
                        alignWithLabel: true,
                        show: true,
                    },
                    axisLine: {
                        show: true,
                    },
                    axisLabel: {
                        interval: 0,
                        color: '#ffffff', // Ensure axis text is white
                    },
                },
                {
                    type: 'category',
                    data: dates,
                    position: 'bottom',
                    offset: 20, // Push the date axis below the reps axis
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        align: 'center',
                        color: '#ffffff', // Ensure dates are white
                    },
                },
            ],
            yAxis: {
                type: 'value',
                scale: true, // Auto-scale so it doesn't necessarily start at 0
                axisLabel: {
                    color: '#ffffff', // Ensure y-axis text is white
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: darkGridLine, // Darker gray grid lines
                    },
                },
            },
            series: [
                {
                    type: 'line',
                    data: seriesData,
                    connectNulls: false, // Ensures the line breaks on null values
                    symbol: 'circle',
                    symbolSize: 8, // A bit larger for the border effect
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (params: any) => params.value[1], // Extracts the weight from the [xIndex, weight] array
                        color: '#ffffff', // Set label text color to white
                        textBorderWidth: 0, // Remove the default text outline
                        fontStyle: 'bold', // Match bold text from image_3.png
                    },
                    itemStyle: {
                        color: '#ffffff', // White circle fill
                        borderColor: chartCyan, // Cyan border for the circle
                        borderWidth: 2, // Border width
                    },
                    lineStyle: {
                        width: 3, // Slightly thicker line
                        color: '#00aeff47', // Specific cyan color for the line
                    },
                    areaStyle: {
                        // Subtle, dark, recessed-looking gradient fill
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(0, 70, 120, 0.8)' }, // Dark, muted cyan top
                            { offset: 1, color: 'rgba(0, 70, 120, 0.3)' }, // Near-transparent dark bottom
                        ]),
                    },
                },
            ],
        };
    }, [machineData]);

    return (
        <Box sx={{ width: '100%', height: 400 }}>
            <ReactEChartsCore
                echarts={echarts}
                option={chartOptions}
                style={{ height: '100%', width: '100%' }}
                notMerge={true}
                lazyUpdate={true}
            />
        </Box>
    );
}
