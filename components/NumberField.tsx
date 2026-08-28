import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';

export default function NumberField({
    id: idProp,
    label,
    error,
    size = 'medium',
    showButtons = false,
    value,
    onValueChange,
    fullWidth = false,
    ...other
}: BaseNumberField.Root.Props & {
    label?: React.ReactNode;
    size?: 'small' | 'medium';
    error?: boolean;
    showButtons?: boolean;
    fullWidth?: boolean;
    value?: number | null;
    onValueChange?: (value: number | null, event: Event) => void;
}) {
    let id = React.useId();
    if (idProp) {
        id = idProp;
    }

    return (
        <BaseNumberField.Root
            value={value}
            onValueChange={onValueChange}
            style={{ width: fullWidth ? '100%' : undefined }}
            // Use de-DE locale so Base UI natively parses ',' as decimal
            locale="de-DE"
            {...other}
            render={(props, state) => (
                <FormControl
                    size={size}
                    ref={props.ref}
                    disabled={state.disabled}
                    required={state.required}
                    error={error}
                    variant="outlined"
                    fullWidth={fullWidth}
                    sx={{
                        width: fullWidth ? '100%' : undefined,
                        '& .MuiButton-root': {
                            borderColor: 'divider',
                            minWidth: 0,
                            bgcolor: 'action.hover',
                            '&:not(.Mui-disabled)': {
                                color: 'text.primary',
                            },
                        },
                    }}
                >
                    {label && (
                        <InputLabel
                            htmlFor={id}
                            sx={
                                showButtons
                                    ? {
                                          left: '50%',
                                          transformOrigin: 'top center',
                                          transform:
                                              'translate(-50%, 16px) scale(1)',
                                          '&.MuiInputLabel-shrink': {
                                              transform:
                                                  'translate(-50%, -9px) scale(0.75)',
                                          },
                                          ...(size === 'small' && {
                                              transform:
                                                  'translate(-50%, 9px) scale(1)',
                                              '&.MuiInputLabel-shrink': {
                                                  transform:
                                                      'translate(-50%, -9px) scale(0.75)',
                                              },
                                          }),
                                      }
                                    : undefined
                            }
                        >
                            {label}
                        </InputLabel>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            width: fullWidth ? '100%' : 'auto',
                        }}
                    >
                        {showButtons && (
                            <BaseNumberField.Decrement
                                render={
                                    <Button
                                        variant="outlined"
                                        aria-label="Decrease"
                                        size={size}
                                        sx={{
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            borderRight: '0px',
                                            '&.Mui-disabled': {
                                                borderRight: '0px',
                                            },
                                        }}
                                    />
                                }
                            >
                                <RemoveIcon fontSize={size} />
                            </BaseNumberField.Decrement>
                        )}

                        <BaseNumberField.Input
                            id={id}
                            style={{ flex: 1, minWidth: 0 }}
                            render={(inputProps, state) => (
                                <OutlinedInput
                                    inputRef={inputProps.ref}
                                    // Display value always uses commas
                                    value={state.inputValue.replace('.', ',')}
                                    onBlur={inputProps.onBlur}
                                    onFocus={inputProps.onFocus}
                                    onKeyUp={inputProps.onKeyUp}
                                    onKeyDown={inputProps.onKeyDown}
                                    // Replace dots with commas before Base UI reads the DOM event
                                    onChange={(e) => {
                                        const originalValue = e.target.value;
                                        e.target.value = originalValue.replace(
                                            '.',
                                            ',',
                                        );
                                        inputProps.onChange?.(e);
                                    }}
                                    label={label}
                                    slotProps={{
                                        input: {
                                            ...inputProps,
                                            sx: {
                                                textAlign: 'center',
                                            },
                                        },
                                    }}
                                    sx={{
                                        pr: 0,
                                        borderRadius: showButtons ? 0 : 1,
                                        flex: 1,
                                        width: '100%',
                                        ...(showButtons && {
                                            '& fieldset legend': {
                                                margin: '0 auto',
                                            },
                                        }),
                                    }}
                                />
                            )}
                        />

                        {showButtons && (
                            <BaseNumberField.Increment
                                render={
                                    <Button
                                        variant="outlined"
                                        aria-label="Increase"
                                        size={size}
                                        sx={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                            borderLeft: '0px',
                                            '&.Mui-disabled': {
                                                borderLeft: '0px',
                                            },
                                        }}
                                    />
                                }
                            >
                                <AddIcon fontSize={size} />
                            </BaseNumberField.Increment>
                        )}
                    </Box>
                </FormControl>
            )}
        />
    );
}
