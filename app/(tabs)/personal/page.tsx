'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function ExercisePage() {
    return (
        //This sx is quite perfect and works as intended. Set bgcolor to see.

        // mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
        // Fixed issues:
        // - Entire site scrolling: Every stack in which the list is in has to have overflow: 'auto' (not the nicest fix but works...)
        // - Cards getting compressed by overflow: The easiest way is to put each card into a container like Stack or Box.
        //    -> either all of them into one big container or each one into its own container
        //
        // Recommended changes:
        // - Instead of hardcoding each Card, create an array which then can be mapped to get a dynamic list of cards
        //    -> makes changes to the card design easier
        //    -> lets you fix the compression issue cleaner
        // - Currently there is a double margin between the overview header and the list of cards, which makes the overview header look like its not centered
        // - For centering items inside of a stack, use alignItems and justifyContent
        //    -> Makes the code cleaner than using Boxes around it with flex 1
        //    -> Box flex 1 is used only when specific ratios are needed (like 2:1) or when pushing an element to one side, not for centering
        // - To create a gap around the stacks like the outer one or the list, use padding instead of margin
        //    -> Margin creates a padding around the container, which makes it smaller and cuts of anything (can cause problems with textfield labels)
        //    -> Padding is on the inside, which doesnt change the size of the container, only pusing its insides further inside, does not cut of anything
        // - Consider default props of mui components, for example typography variant default is "body1", then you dont need to set another body1
        // mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus

        <Stack sx={{ flex: 1, gap: 1, m: 1, overflow: 'auto' }}>
            {/* + overflow auto */}
            <Stack direction="row">
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>

            <Stack sx={{ gap: 1, m: 1, overflow: 'auto' }}>
                {/* + overflow auto */}
                <Stack>
                    {/* container to fix compression */}
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyheight</Typography>
                            <Typography variant="body1">Emptycheck</Typography>
                        </CardContent>
                    </Card>
                </Stack>

                <Stack>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight2</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight3</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight4</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight5</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight6</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight7</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight5</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight6</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight7</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight5</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight6</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight7</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight5</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight6</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight7</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight5</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight6</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Bodyweight7</Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>
        </Stack>
    );
}
