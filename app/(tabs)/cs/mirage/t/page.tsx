'use client';

import TabContentStack from '@/components/TabContentStack';
import instaWindowPosImg from '@/public/csLineups/mirage/t/instaWindow/instaWindowPositions.png';
import CsImage from '../../CsImage';
import ImageContainer from '../../ImageContainer';
import MiniHeader from '../../MiniHeader';

export default function MirageT() {
    return (
        <TabContentStack>
            <MiniHeader title="Insta Window" />
            <ImageContainer>
                <CsImage src={instaWindowPosImg} />
            </ImageContainer>
        </TabContentStack>
    );
}
