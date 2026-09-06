'use client';

import LMBIcon from '@/public/inputIcons/LMBIcon.png';
import LMBRMBIcon from '@/public/inputIcons/LMBRMBIcon.png';
import RMBIcon from '@/public/inputIcons/RMBIcon.png';

import { Stack, Typography } from '@mui/material';
import { IconLetterW, IconTagsChevronUp } from '@tabler/icons-react/';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import ImageContainer from './ImageContainer';
export default function CsImage({
    src,
    text = '',
    lmb = false,
    rmb = false,
    jump = false,
    w = false,
    noContainer = false,
}: {
    src: string | StaticImport;
    text?: string;
    lmb?: boolean;
    rmb?: boolean;
    jump?: boolean;
    w?: boolean;
    noContainer?: boolean;
}) {
    const mouseIcon = lmb ? (rmb ? LMBRMBIcon : LMBIcon) : RMBIcon;
    const infoBgColor = '#00000090';

    const content = (
        <Stack sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {text !== '' && (
                <Typography
                    sx={{
                        position: 'absolute',
                        backgroundColor: infoBgColor,
                        zIndex: 10,
                        fontSize: 15,
                    }}
                >
                    {text}
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
                        bgcolor: infoBgColor,
                    }}
                >
                    {(lmb || rmb) && (
                        <Image alt="image" src={mouseIcon} height={15} />
                    )}
                    {jump && (
                        <IconTagsChevronUp
                            height={15}
                            style={{ marginLeft: -3, marginRight: -4 }}
                        />
                    )}
                    {w && (
                        <IconLetterW
                            height={15}
                            style={{ marginLeft: -6, marginRight: -4 }}
                        />
                    )}
                </Stack>
            )}
        </Stack>
    );

    return noContainer ? content : <ImageContainer>{content}</ImageContainer>;
}
