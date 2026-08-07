import { BlobImage } from '@/components/BlobImage';
import { Row } from '@/database/db';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

export default function MachineList({
    machines,
    onClick,
}: {
    machines: Row<'Machine'>[];
    onClick(id: number): void;
}) {
    return (
        <ImageList cols={2}>
            {machines.map((item) => (
                <ImageListItem key={item.id} onClick={() => onClick(item.id)}>
                    <BlobImage blob={item.imageBlob} />
                    <ImageListItemBar title={item.name} />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
