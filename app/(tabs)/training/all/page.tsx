'use client';

import NumberField from '@/components/NumberField';
import { Button } from '@mui/material';
import PlanContainer from '../PlanContainer';

export default function allMachines() {
    return (
        <PlanContainer title="All" headerButtons={null}>
            <Button>maus?</Button>
            <NumberField label="mausigemausmaus" showButtons />
        </PlanContainer>
    );
}
