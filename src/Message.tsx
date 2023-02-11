import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimatedHeart from './AnimatedHeart';
import { wHeight } from './assets/utils';

export type MessageProps = {
    text: string;
    time: string;
};

export type MessageComponentProps = {
    data: MessageProps;
};

const getUniqueId = () => {
    return Math.floor(Math.random() * Date.now()).toString();
};

const Message: React.FC<MessageComponentProps> = ({ data }) => {
    const { time, text } = data;

    const [messageHeight, setMessageHeight] = useState<number>(0);
    const [isHearted, setIsHearted] = useState<boolean>(false);
    const [heartCount, setHeartCount] = useState<number>(0);
    const [flyHearts, setFlyHearts] = useState<{ id: string }[]>([]);

    const lastTap = useRef<number>(0);
    const isAnimating = useRef<boolean>(false);
    const heartTappedTimeout = useRef<ReturnType<typeof setTimeout>>();
    const heartAnimatedValue = useRef(new Animated.Value(0)).current;
    const heartCountAnimatedValue = useRef(new Animated.Value(0)).current;

    const heartAnimation = {
        transform: [
            {
                scale: heartAnimatedValue.interpolate({
                    inputRange: [0, 0.2, 0.7, 1],
                    outputRange: [0, 2.2, 2, 1],
                }),
            },
            {
                translateY: heartAnimatedValue.interpolate({
                    inputRange: [0, 0.2, 0.7, 1],
                    outputRange: [0, -20, -20, 1],
                }),
            },
            {
                translateX: heartAnimatedValue.interpolate({
                    inputRange: [0, 0.2, 0.7, 1],
                    outputRange: [0, -15, -15, 1],
                }),
            },
        ],
    };

    const heartCircleAnimation = {
        opacity: heartAnimatedValue,
    };

    const heartCountAnimation = {
        transform: [
            { translateY: heartCountAnimatedValue },
            {
                scale: heartCountAnimatedValue.interpolate({
                    inputRange: [-messageHeight, 0],
                    outputRange: [1, 0],
                }),
            },
        ],
        opacity: heartCountAnimatedValue.interpolate({
            inputRange: [-messageHeight, -10, 0],
            outputRange: [1, 0.9, 0],
        }),
    };

    useEffect(() => {
        if (isHearted) {
            Animated.timing(heartAnimatedValue, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }).start(() => (isAnimating.current = false));
        } else {
            heartAnimatedValue.setValue(0);
            isAnimating.current = false;
        }
    }, [isHearted, heartAnimatedValue, isAnimating]);

    const onMessageTap = () => {
        const now = Date.now();
        const DELAY = 300;
        if (lastTap.current && now - lastTap.current < DELAY) {
            if (!isAnimating.current) {
                setIsHearted(!isHearted);
                isAnimating.current = true;
            }
        } else {
            lastTap.current = now;
        }
    };

    const handleFyHearts = useCallback((id: string) => {
        setFlyHearts((oldFlyHearts) => [...oldFlyHearts].filter((flyHeart) => flyHeart.id !== id));
    }, []);

    const onHeartTap = () => {
        if (heartTappedTimeout.current) {
            clearTimeout(heartTappedTimeout.current);
        }
        setHeartCount(heartCount + 1);
        setFlyHearts([...flyHearts, { id: getUniqueId() }]);

        heartTappedTimeout.current = setTimeout(() => {
            Animated.spring(heartCountAnimatedValue, {
                toValue: 0,
                speed: 30,
                useNativeDriver: true,
            }).start();
        }, 700);
        Animated.spring(heartCountAnimatedValue, {
            toValue: -messageHeight,
            speed: 30,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View
            style={styles.viewMessageContainer}
            onLayout={(e) => {
                const { height } = e.nativeEvent.layout;
                setMessageHeight(Math.ceil(Math.min(height, wHeight * 0.8)));
            }}
        >
            <StatusBar barStyle={'dark-content'} />
            <Image source={require('./assets/images/avatar.jpeg')} resizeMode={'contain'} style={styles.imgAvatar} />
            <TouchableOpacity activeOpacity={0.7} style={styles.viewMessage} onPress={onMessageTap}>
                <Text style={styles.txtMessage}>{text}</Text>
                <Text style={styles.txtTime}>{time}</Text>
            </TouchableOpacity>
            {isHearted ? (
                <View style={styles.viewHeartContainer}>
                    <Animated.View style={[styles.viewHeartCircle, heartCircleAnimation]} />
                    <Animated.Image
                        source={require('./assets/images/heart-red.png')}
                        resizeMode={'contain'}
                        style={[styles.imgHeart, heartAnimation]}
                    />
                </View>
            ) : null}
            <TouchableOpacity style={[styles.btnReaction, styles.btnHeart]} activeOpacity={1} onPress={onHeartTap}>
                {heartCount ? (
                    <Image style={styles.imgHeartIcon} source={require('./assets/images/heart-red.png')} />
                ) : (
                    <Image style={styles.imgHeartIcon} source={require('./assets/images/heart-outline.png')} />
                )}
            </TouchableOpacity>

            <Animated.View style={[styles.btnReaction, styles.viewHeartCountCircle, heartCountAnimation]}>
                <Text style={styles.txtHeartCount}>{heartCount}</Text>
            </Animated.View>
            {flyHearts.map(({ id }) => (
                <AnimatedHeart key={id} id={id} messageHeight={messageHeight} onCompleteAnimation={handleFyHearts} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    viewMessageContainer: {
        width: '85%',
        flexDirection: 'row',
        marginVertical: 20,
    },
    imgAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: 'white',
    },
    viewMessage: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 2.84,
            },
        }),
    },
    txtMessage: {
        fontSize: 16,
        color: '#111111',
    },
    txtTime: {
        marginTop: 10,
        fontSize: 12,
        color: '#333333',
    },
    viewHeartContainer: {
        position: 'absolute',
        bottom: -8,
        right: -8,
        width: 30,
        height: 30,
    },
    viewHeartCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        ...Platform.select({
            android: { elevation: 5 },
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    width: 0.5,
                    height: 0.5,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2.3,
            },
        }),
    },
    imgHeart: {
        position: 'absolute',
        width: 30,
        height: 30,
    },
    btnReaction: {
        position: 'absolute',
        left: 54,
        bottom: -10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnHeart: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'white',
        ...Platform.select({
            android: { elevation: 5 },
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    width: 0.5,
                    height: 0.5,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2.3,
            },
        }),
    },
    imgHeartIcon: {
        width: 12,
        height: 12,
    },
    viewHeartCountCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        bottom: -14,
        left: 50,
        backgroundColor: '#FFAA33',
        zIndex: 100,
    },
    txtHeartCount: {
        color: 'white',
    },
});

export default Message;
