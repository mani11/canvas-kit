import React from 'react';
import {
  styled,
  StyledType,
  focusRing,
  mouseFocusBehavior,
  createComponent,
  ExtractProps,
  Themeable,
} from '@workday/canvas-kit-react/common';
import {colors, inputColors, spaceNumbers, borderRadius} from '@workday/canvas-kit-react/tokens';

import {Box, Flex} from '@workday/canvas-kit-react/layout';

const radioWidth = 18;
const rippleRadius = (spaceNumbers.l - radioWidth) / 2;
const radioHeight = 18;

export interface StyledRadioProps extends ExtractProps<typeof Box, 'input'>, Themeable {
  variant?: 'inverse' | undefined;
}

const StyledRadioInput = styled(Box.as('input'))<StyledRadioProps & StyledType>(
  {
    '&:focus, &:active': {
      outline: 'transparent',
    },
  },
  ({
    disabled,
    variant,
    theme: {
      canvas: {
        palette: {
          primary: themePrimary,
          common: {focusOutline: themeFocusOutline},
        },
      },
    },
  }) => ({
    cursor: disabled ? undefined : 'pointer',
    opacity: disabled && variant === 'inverse' ? '.4' : '1',
    height: '18px',
    width: '18px',

    // Circle element styles the radio as checked or unchecked
    ':after': {
      content: "''",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: disabled ? inputColors.disabled.background : colors.frenchVanilla100,
      borderRadius: '999px',
      boxSizing: 'border-box',
      border: `1px solid`,
      borderColor: disabled
        ? inputColors.disabled.border
        : variant === 'inverse'
        ? colors.soap300
        : inputColors.border,
      height: '18px',
      width: '18px',
      justifyContent: 'center',
      pointerEvents: 'none',
      position: 'absolute',
      transition: 'border 200ms ease, background 200ms',
      opacity: disabled && variant === 'inverse' ? '.4' : '1',
    },

    '&:hover:after': {
      borderColor: disabled
        ? inputColors.disabled.border
        : variant === 'inverse'
        ? colors.soap300
        : colors.licorice500,
    },

    '&:focus:after': {
      borderColor: disabled
        ? inputColors.disabled.border
        : variant === 'inverse'
        ? colors.soap300
        : colors.blueberry400,
    },

    '&:checked:after': {
      backgroundColor: variant === 'inverse' ? themePrimary.main : colors.frenchVanilla100,
      border: `5px solid`,
      borderColor: variant === 'inverse' ? colors.frenchVanilla100 : themePrimary.main,
    },

    '&:focus:after, &:focus:hover:after': {
      outline: 'transparent',

      ...focusRing({
        width: variant === 'inverse' ? 2 : 1,
        separation: 0,
        animate: false,
        innerColor: variant === 'inverse' ? colors.blackPepper400 : colors.frenchVanilla100,
        outerColor: variant === 'inverse' ? colors.frenchVanilla100 : colors.blueberry400,
      }),
    },

    '&:focus:checked:after, &:focus:hover:checked:after': {
      outline: 'transparent',
      ...focusRing({
        width: variant === 'inverse' ? 2 : 2,
        separation: 2,
        animate: false,
        innerColor: variant === 'inverse' ? colors.blackPepper400 : colors.frenchVanilla100,
        outerColor: variant === 'inverse' ? colors.frenchVanilla100 : colors.blueberry400,
      }),
    },

    ...mouseFocusBehavior({
      '&:focus:after': {
        ...focusRing({
          width: 0,
          outerColor: variant === 'inverse' ? colors.frenchVanilla100 : themeFocusOutline,
        }),
      },
      '&:focus:hover:after, &:focus:active:after': {
        ...focusRing({
          width: 0,
          outerColor: variant === 'inverse' ? colors.frenchVanilla100 : themeFocusOutline,
        }),
      },
      '&:focus:hover:checked:after, &:focus:active:checked:after': {
        ...focusRing({
          width: 0,
          outerColor: variant === 'inverse' ? colors.frenchVanilla100 : themeFocusOutline,
        }),
      },
    }),
  })
);

const RadioInputWrapper = styled(Flex)<Pick<StyledRadioProps, 'disabled' | 'variant'>>(
  {
    // Hover Ripple element
    '::before': {
      content: "''",
      borderRadius: borderRadius.circle,
      height: radioHeight,
      transition: 'box-shadow 150ms ease-out',
      width: radioWidth,
      pointerEvents: 'none',
    },
  },
  ({variant, disabled}) => ({
    '::before': {
      opacity: variant === 'inverse' ? '0.4' : '1',
    },
    '&:hover:before': {
      boxShadow: disabled ? undefined : `0 0 0 ${rippleRadius}px ${colors.soap200}`,
    },
  })
);

export interface StyledRadioProps extends ExtractProps<typeof Box, 'input'> {
  variant?: 'inverse' | undefined;
}

export const StyledRadio = createComponent('input')({
  displayName: 'Radio',
  Component: ({children, variant, ...elemProps}: StyledRadioProps, ref, Element) => {
    return (
      <RadioInputWrapper
        height="18px"
        width="18px"
        flex="0 0 auto"
        disabled={elemProps.disabled}
        variant={variant}
        {...elemProps}
      >
        <StyledRadioInput
          borderRadius="circle"
          position="absolute"
          margin="zero"
          as={Element}
          type="radio"
          checked={elemProps.checked}
          aria-checked={elemProps.checked}
          variant={variant}
          disabled={elemProps.disabled}
          {...elemProps}
        />
      </RadioInputWrapper>
    );
  },
});
