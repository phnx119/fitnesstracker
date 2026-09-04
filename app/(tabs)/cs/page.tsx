import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { TextField } from '@mui/material';

export default function Cs() {
    return (
        <>
            <Header showHome />
            <TabContentStack>
                <TextField />
            </TabContentStack>
        </>
    );
}
