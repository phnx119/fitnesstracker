'use client';

import TabContentStack from '@/components/TabContentStack';
import spawn1End from '@/public/csLineups/ancient/ct/instaElbow/spawn1End.jpg';
import spawn1Start from '@/public/csLineups/ancient/ct/instaElbow/spawn1Start.jpg';
import spawn2End from '@/public/csLineups/ancient/ct/instaElbow/spawn2End.jpg';
import spawn2Start from '@/public/csLineups/ancient/ct/instaElbow/spawn2Start.jpg';
import spawn3End from '@/public/csLineups/ancient/ct/instaElbow/spawn3End.jpg';
import spawn3Start from '@/public/csLineups/ancient/ct/instaElbow/spawn3Start.jpg';
import spawn4End from '@/public/csLineups/ancient/ct/instaElbow/spawn4End.jpg';
import spawn4Start from '@/public/csLineups/ancient/ct/instaElbow/spawn4Start.jpg';
import spawn5End from '@/public/csLineups/ancient/ct/instaElbow/spawn5End.jpg';
import spawn5Start from '@/public/csLineups/ancient/ct/instaElbow/spawn5Start.jpg';
import { Stack } from '@mui/material';
import CsImage from '../../CsImage';
import MiniHeader from '../../MiniHeader';

export default function AncientCt() {
    return (
        <TabContentStack>
            <MiniHeader title="Insta Elbow (left to right; SHIFT WALK S-E)" />
            <Stack>
                <Stack direction="row" sx={{ height: 120, gap: 1 }}>
                    <CsImage src={spawn1Start} text="1 Start" jump lmb w />

                    <CsImage src={spawn2Start} text="2 Start" jump lmb w />

                    <CsImage src={spawn3Start} text="3 Start" jump lmb w />

                    <CsImage src={spawn4Start} text="4 Start" jump lmb w />

                    <CsImage src={spawn5Start} text="5 Start" jump lmb w />
                </Stack>

                <Stack direction="row" sx={{ height: 120, gap: 1 }}>
                    <CsImage src={spawn1End} text="1 End" />

                    <CsImage src={spawn2End} text="2 End" />

                    <CsImage src={spawn3End} text="3 End" />

                    <CsImage src={spawn4End} text="4 End" />

                    <CsImage src={spawn5End} text="5 End" />
                </Stack>
            </Stack>
        </TabContentStack>
    );
}
