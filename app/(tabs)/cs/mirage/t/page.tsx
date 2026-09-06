'use client';

import TabContentStack from '@/components/TabContentStack';
import instaWindowPosImg from '@/public/csLineups/mirage/t/instaWindow/instaWindowPositions.png';
import instaWindow1 from '@/public/csLineups/mirage/t/instaWindow/spawn1InstaWindow.png';
import instaWindow2 from '@/public/csLineups/mirage/t/instaWindow/spawn2InstaWindow.png';
import instaWindow3 from '@/public/csLineups/mirage/t/instaWindow/spawn3InstaWindow.png';
import instaWindow4 from '@/public/csLineups/mirage/t/instaWindow/spawn4InstaWindow.png';
import instaWindow5 from '@/public/csLineups/mirage/t/instaWindow/spawn5InstaWindow.png';
import { Stack } from '@mui/material';
import CsImage from '../../CsImage';
import MiniHeader from '../../MiniHeader';

export default function MirageT() {
    return (
        <TabContentStack>
            <MiniHeader title="Insta Window" />
            <Stack sx={{ height: 150 }}>
                <CsImage src={instaWindowPosImg} />
            </Stack>
            <Stack direction="row" sx={{ height: 120 }}>
                <CsImage src={instaWindow1} text="1" jump lmb w />

                <CsImage src={instaWindow2} text="2" jump lmb w />

                <CsImage src={instaWindow3} text="3" jump lmb w />

                <CsImage src={instaWindow4} text="4" jump lmb w />

                <CsImage src={instaWindow5} text="5" jump lmb w />
            </Stack>
        </TabContentStack>
    );
}
