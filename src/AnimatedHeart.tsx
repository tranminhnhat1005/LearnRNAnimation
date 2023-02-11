import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { wHeight, wWidth } from './assets/utils';

type TAnimatedHeartProps = {
    id: string;
    messageHeight: number;
    onCompleteAnimation: (id: string) => void;
};

const getRandomNumber = () => +(Math.random() < 0.5);
const getRandomX = () => {
    return getRandomNumber() ? -(Math.random() * 30) : Math.random() * wWidth * 0.7;
};
const getRandomRotate = () => {
    return [getRandomNumber() ? '-60deg' : '60deg', '0deg'];
};

const AnimatedHeart: React.FC<TAnimatedHeartProps> = ({ id, messageHeight, onCompleteAnimation }) => {
    const animatedValueY = useRef(new Animated.Value(0)).current;
    const randomXRef = useRef(getRandomX()).current;
    const randomRotateRef = useRef(getRandomRotate()).current;

    const animation = {
        opacity: animatedValueY.interpolate({
            inputRange: [-messageHeight * 1.2, 0],
            outputRange: [0, 1],
        }),
        transform: [
            {
                translateX: animatedValueY.interpolate({
                    inputRange: [-wHeight, 0],
                    outputRange: [randomXRef, 0],
                }),
            },
            {
                translateY: animatedValueY.interpolate({
                    inputRange: [-wHeight, -10, 0],
                    outputRange: [-wHeight, -50, 0],
                }),
            },
            {
                rotate: animatedValueY.interpolate({
                    inputRange: [-wHeight, 0],
                    outputRange: randomRotateRef,
                }),
            },
            {
                scale: animatedValueY.interpolate({
                    inputRange: [-50, 0],
                    outputRange: [1, 0.5],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    useEffect(() => {
        Animated.timing(animatedValueY, {
            toValue: -wHeight,
            duration: 3000,
            useNativeDriver: true,
        }).start(() => {
            onCompleteAnimation(id);
        });
    }, [animatedValueY, id, onCompleteAnimation]);

    return <Animated.Image source={require('./assets/images/heart-red.png')} style={[styles.imgHeart, animation]} />;
};

const styles = StyleSheet.create({
    imgHeart: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 50,
        bottom: -8,
    },
});

export default AnimatedHeart;
