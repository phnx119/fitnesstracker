import { Stack, Typography } from '@mui/material';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
export default function CsImage({
    src,
    text = '',
}: {
    src: string | StaticImport;
    text?: string;
}) {
    return (
        <Stack>
            {text !== '' && (
                <Typography
                    sx={{
                        position: 'absolute',
                        top: 2,
                        left: 2,
                        backgroundColor: 'black',
                        zIndex: 10,
                    }}
                >
                    test
                </Typography>
            )}
            <Image alt="image" src={src} fill priority />;
        </Stack>
    );
}
