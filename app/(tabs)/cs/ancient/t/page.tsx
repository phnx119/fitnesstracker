import TabContentStack from '@/components/TabContentStack';
import aCt from '@/public/csLineups/ancient/t/a/ct.webp';
import aDonut from '@/public/csLineups/ancient/t/a/donut.webp';
import aPos from '@/public/csLineups/ancient/t/a/pos.webp';
import bLong from '@/public/csLineups/ancient/t/b/long.webp';
import bPos from '@/public/csLineups/ancient/t/b/pos.webp';
import bShort from '@/public/csLineups/ancient/t/b/short.webp';
import spawn1 from '@/public/csLineups/ancient/t/instaRed/spawn1.webp';
import spawn4 from '@/public/csLineups/ancient/t/instaRed/spawn4.webp';
import spawn5 from '@/public/csLineups/ancient/t/instaRed/spawn5.webp';
import { Stack } from '@mui/material';
import CsImage from '../../CsImage';
import MiniHeader from '../../MiniHeader';

export default function AncientT() {
    return (
        <TabContentStack>
            <MiniHeader title="Insta Red (left to right)" />
            <Stack sx={{ height: 150 }} direction="row">
                <CsImage src={spawn1} text="1" w lmb jump />
                <CsImage src={spawn4} text="4" w lmb jump />
                <CsImage src={spawn5} text="5" w lmb jump />
            </Stack>

            <MiniHeader title="B-Site" />
            <Stack sx={{ height: 150 }} direction="row">
                <CsImage src={bPos} text="Pos: Corner" />
                <CsImage src={bLong} lmb jump text="Long" />
                <CsImage src={bShort} lmb jump text="Short" />
            </Stack>

            <MiniHeader title="A-Site" />
            <Stack sx={{ height: 150 }} direction="row">
                <CsImage src={aPos} text="Pos: Stone center" />
                <CsImage src={aCt} text="CT" jump lmb />
                <CsImage src={aDonut} text="Donut" jump lmb />
            </Stack>
        </TabContentStack>
    );
}
