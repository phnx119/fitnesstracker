import LMBIcon from '@/public/inputIcons/LMBIcon.webp';
import LMBRMBIcon from '@/public/inputIcons/LMBRMBIcon.webp';
import RMBIcon from '@/public/inputIcons/RMBIcon.webp';

import { Stack, Typography } from '@mui/material';
import { IconLetterW, IconTagsChevronUp } from '@tabler/icons-react/';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
export default function CsImage({
    src,
    text = '',
    lmb = false,
    rmb = false,
    jump = false,
    w = false,
}: {
    src: string | StaticImport;
    text?: string;
    lmb?: boolean;
    rmb?: boolean;
    jump?: boolean;
    w?: boolean;
}) {
    const mouseIcon = lmb ? (rmb ? LMBRMBIcon : LMBIcon) : RMBIcon;
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
            {(lmb || rmb || w || jump) && (
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        bottom: 0,
                        position: 'absolute',
                        bgcolor: 'black',
                        height: 30,
                    }}
                >
                    {(lmb || rmb) && (
                        <Stack sx={{ mx: -2 }}>
                            <Image alt="image" src={mouseIcon} height="30" />
                        </Stack>
                    )}
                    {jump && <IconTagsChevronUp />}
                    {w && <IconLetterW height="50" />}
                </Stack>
            )}
        </Stack>
    );
}
