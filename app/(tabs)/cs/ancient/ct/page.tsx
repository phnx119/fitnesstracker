'use client';

import TabContentStack from '@/components/TabContentStack';
import spawn1Start from '@/public/csLineups/ancient/ct/instaElbow/spawn1Start.jpg';
import spawn2Start from '@/public/csLineups/ancient/ct/instaElbow/spawn2Start.jpg';
import spawn3Start from '@/public/csLineups/ancient/ct/instaElbow/spawn3Start.jpg';
import spawn4Start from '@/public/csLineups/ancient/ct/instaElbow/spawn4Start.jpg';
import spawn5Start from '@/public/csLineups/ancient/ct/instaElbow/spawn5Start.jpg';
import { Stack } from '@mui/material';
import CsImage from '../../CsImage';
import ImageContainer from '../../ImageContainer';
import MiniHeader from '../../MiniHeader';

export default function AncientCt() {
    return (
        <TabContentStack>
            <MiniHeader title="Insta Elbow (left to right; SHIFT WALK S-E)" />
            <Stack direction="row" sx={{ height: 120 }}>
                <ImageContainer>
                    <CsImage src={spawn1Start} text="1" jump lmb w />
                </ImageContainer>

                <ImageContainer>
                    <CsImage src={spawn2Start} text="2" jump lmb w />
                </ImageContainer>

                <ImageContainer>
                    <CsImage src={spawn3Start} text="3" jump lmb w />
                </ImageContainer>

                <ImageContainer>
                    <CsImage src={spawn4Start} text="4" jump lmb w />
                </ImageContainer>

                <ImageContainer>
                    <CsImage src={spawn5Start} text="5" jump lmb w />
                </ImageContainer>
            </Stack>
        </TabContentStack>
    );
}
