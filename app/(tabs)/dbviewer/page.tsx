'use client';

import Header from '@/components/Header';
import { dbInstance, type SchemaTables } from '@/database/db';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    Tab,
    Tabs,
    Tooltip,
    Typography,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

type TableKey = keyof SchemaTables;

// Liest alle Tabellennamen dynamisch aus Dexie
const TABLE_NAMES = dbInstance.tables.map((t) => t.name as TableKey);

type BaseRow = { id: number } & Record<string, unknown>;

async function fetchRows(tableName: TableKey): Promise<BaseRow[]> {
    const table = dbInstance[tableName];
    return (await table.toArray()) as BaseRow[];
}

export default function DatabaseViewer() {
    const [activeTable, setActiveTable] = useState<TableKey>(
        TABLE_NAMES[0] ?? ('Machine' as TableKey),
    );

    const rows = useLiveQuery(() => fetchRows(activeTable), [activeTable]);

    function renderValueBadge(value: unknown) {
        if (value === null) {
            return (
                <Chip
                    label="null"
                    size="small"
                    variant="outlined"
                    color="default"
                />
            );
        }
        if (Array.isArray(value)) {
            return <Chip label="array" size="small" color="secondary" />;
        }

        const type = typeof value;
        const colorMap: Record<
            string,
            'primary' | 'success' | 'warning' | 'default'
        > = {
            number: 'primary',
            string: 'success',
            boolean: 'warning',
        };

        return (
            <Chip
                label={type}
                size="small"
                color={colorMap[type] ?? 'default'}
                variant="filled"
            />
        );
    }

    async function handleDeleteRow(id: number) {
        if (confirm(`Eintrag #${id} aus '${activeTable}' löschen?`)) {
            await dbInstance[activeTable].delete(id);
        }
    }

    async function handleClearTable() {
        if (
            confirm(
                `ALLE Einträge aus '${activeTable}' unwiderruflich löschen?`,
            )
        ) {
            await dbInstance[activeTable].clear();
        }
    }

    function handleTabChange(_e: React.SyntheticEvent, newValue: TableKey) {
        setActiveTable(newValue);
    }

    return (
        <>
            <Header showHome>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        overflow: 'auto',
                    }}
                >
                    <Tabs
                        value={activeTable}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {TABLE_NAMES.map((tableName) => (
                            <Tab
                                key={tableName}
                                label={tableName}
                                value={tableName}
                            />
                        ))}
                    </Tabs>
                </Box>
            </Header>
            <Card
                elevation={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minHeight: 0, // Verhindert Overflow-Probleme in Flexbox-Parents
                }}
            >
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: 'action.hover',
                        gap: 2,
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        Einträge:{' '}
                        <Box
                            component="span"
                            sx={{ color: 'text.primary', fontWeight: 'bold' }}
                        >
                            {rows?.length ?? 0}
                        </Box>
                    </Typography>

                    {Boolean(rows?.length) && (
                        <Button
                            size="small"
                            color="error"
                            startIcon={<ClearAllIcon fontSize="small" />}
                            onClick={handleClearTable}
                        >
                            Tabelle leeren
                        </Button>
                    )}
                </Box>
                {/* Datensätze / Content Area */}
                <CardContent
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: 2,
                        '&:last-child': { pb: 2 },
                    }}
                >
                    {!rows ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                py: 4,
                            }}
                        >
                            <CircularProgress size={24} />
                        </Box>
                    ) : rows.length === 0 ? (
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                borderStyle: 'dashed',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Tabelle `{activeTable}` ist leer.
                            </Typography>
                        </Paper>
                    ) : (
                        <Stack spacing={2}>
                            {rows.map((row) => (
                                <Paper
                                    key={row.id}
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        bgcolor: 'background.default',
                                    }}
                                >
                                    {/* Row Header (ID + Delete Button) */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            pb: 1,
                                            mb: 1.5,
                                            borderBottom: 1,
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: 'primary.main',
                                            }}
                                        >
                                            #ID: {row.id}
                                        </Typography>
                                        <Tooltip title="Eintrag löschen">
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    handleDeleteRow(row.id)
                                                }
                                            >
                                                <DeleteOutlineIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>

                                    {/* Key-Value Auflistung */}
                                    <Stack spacing={1}>
                                        {Object.entries(row).map(
                                            ([key, value]) => (
                                                <Box
                                                    key={key}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'baseline',
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        sx={{
                                                            alignItems:
                                                                'center',
                                                            minWidth: 0,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{
                                                                fontWeight:
                                                                    'medium',
                                                            }}
                                                        >
                                                            {key}:
                                                        </Typography>
                                                        {renderValueBadge(
                                                            value,
                                                        )}
                                                    </Stack>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            textAlign: 'right',
                                                            wordBreak:
                                                                'break-word',
                                                            flex: 1,
                                                        }}
                                                    >
                                                        {typeof value ===
                                                        'object'
                                                            ? JSON.stringify(
                                                                  value,
                                                              )
                                                            : String(value)}
                                                    </Typography>
                                                </Box>
                                            ),
                                        )}
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
