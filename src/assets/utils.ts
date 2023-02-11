import { Animated, Dimensions, useWindowDimensions } from 'react-native';

export const getMusicNoteAnim = (value: Animated.Value, isRotateLeft?: boolean) => {
    return {
        transform: [
            {
                translateX: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, -16],
                }),
            },
            {
                translateY: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -32],
                }),
            },
            {
                rotate: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', isRotateLeft ? '-45deg' : '45deg'],
                }),
            },
        ],
        opacity: value.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 1, 0],
        }),
    };
};
export const getDiscAnim = (value: Animated.Value) => {
    return {
        transform: [
            {
                rotate: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                }),
            },
        ],
    };
};

export const { width: wWidth, height: wHeight, scale: wScale, fontScale: wFontScale } = Dimensions.get('window');
export const { width: sWidth, height: sHeight, scale: sScale, fontScale: sFontScale } = Dimensions.get('screen');
