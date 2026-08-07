import { BlobImage } from '@/components/BlobImage';
import { Row } from '@/database/db';
import { CheckBox } from '@mui/icons-material';
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Stack,
} from '@mui/material';

export default function MachineList({
    machines,
    onClick,
    selectedIds = [],
}: {
    machines: Row<'Machine'>[];
    onClick(machine: Row<'Machine'>): void;
    selectedIds?: number[];
}) {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <ImageList cols={2} gap={8} sx={{ overflow: 'auto', flex: 1 }}>
                {machines.map((item) => (
                    <ImageListItem key={item.id} onClick={() => onClick(item)}>
                        <BlobImage blob={item.imageBlob} />

                        {selectedIds.some((selId) => selId === item.id) && (
                            <Stack
                                sx={{
                                    position: 'absolute',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%',
                                    bgcolor: '#000000A0',
                                }}
                            >
                                <CheckBox sx={{ fontSize: 40 }} />
                            </Stack>
                        )}

                        <ImageListItemBar title={item.name} />
                    </ImageListItem>
                ))}
            </ImageList>
        </Stack>
    );
}
