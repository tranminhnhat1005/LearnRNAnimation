import React, { useRef } from 'react';
import { StyleSheet, View, Platform, Animated, PanResponder } from 'react-native';
import { wHeight } from './assets/utils';

const MIN_HEIGHT = wHeight * 0.1;
const MAX_HEIGHT = wHeight * 0.6;
const MAX_UPWARD_TRANSLATE_Y = MIN_HEIGHT - MAX_HEIGHT; // negative number
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const BottomSheet = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDY = useRef(0);
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animatedValue.setOffset(lastGestureDY.current);
            },
            onPanResponderMove: (e, gestureState) => {
                animatedValue.setValue(gestureState.dy);
            },
            onPanResponderRelease: (e, gestureState) => {
                animatedValue.flattenOffset(); // to reset offset
                
                // drag to exactly position
                // lastGestureDY.current += gestureState.dy;
                // if (lastGestureDY.current < MAX_UPWARD_TRANSLATE_Y) {
                //     lastGestureDY.current = MAX_UPWARD_TRANSLATE_Y;
                // }
                // if (lastGestureDY.current > MAX_DOWNWARD_TRANSLATE_Y) {
                //     lastGestureDY.current = MAX_DOWNWARD_TRANSLATE_Y;
                // }
                
                if (gestureState.dy > 0) {
                    // dragging down
                    if (gestureState.dy <= DRAG_THRESHOLD) {
                        springAnimation('up');
                    } else {
                        springAnimation('down');
                    }
                } else {
                    // dragging up
                    if (gestureState.dy >= -DRAG_THRESHOLD) {
                        springAnimation('down');
                    } else {
                        springAnimation('up');
                    }
                }
            },
        })
    ).current;

    const bottomSheetAnimation = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    const springAnimation = (dir: 'up' | 'down') => {
        lastGestureDY.current = dir === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
        Animated.spring(animatedValue, {
            toValue: lastGestureDY.current,
            speed: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.viewContainer}>
            <Animated.View style={[styles.viewBottomSheetContainer, bottomSheetAnimation]}>
                <View style={styles.dragHandleContainer} {...panResponder.panHandlers}>
                    <View style={styles.dragHandle} />
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: 'crimson',
    },
    viewBottomSheetContainer: {
        position: 'absolute',
        width: '100%',
        height: MAX_HEIGHT,
        bottom: MIN_HEIGHT - MAX_HEIGHT,
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: 'grey',
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.8,
                shadowRadius: 6,
            },
        }),
    },
    dragHandleContainer: {
        width: 100,
        height: 32,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    dragHandle: {
        width: 100,
        height: 6,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
    },
});

export default BottomSheet;
