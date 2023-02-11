import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef } from 'react';
import { wHeight } from './assets/utils';
import { Animated } from 'react-native';

type MomoHeaderProps = {};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const MomoHeader = (props: MomoHeaderProps) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);
    const lastOffsetY = useRef(0);
    const scrollDirection = useRef('');

    const searchAnimation = {
        transform: [
            {
                scaleX: animatedValue.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 25],
                    outputRange: [0, -100],
                    extrapolate: 'clamp',
                }),
            },
        ],
        opacity: animatedValue.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    };
    const featureNameAnimation = {
        transform: [
            {
                scale: animatedValue.interpolate({
                    inputRange: [0, 30],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                }),
            },
        ],
        opacity: animatedValue.interpolate({
            inputRange: [0, 30],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    };
    const featureIconCircleAnimation = {
        opacity: animatedValue.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    };
    const featureIconAnimation = {
        opacity: animatedValue.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
    };
    const depositViewAnimation = {
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 80],
                    outputRange: [0, 36],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 100], // 100 =====
                    outputRange: [0, -55],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    const withdrawViewAnimation = {
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 80],
                    outputRange: [0, -16],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 100], // 100 =====
                    outputRange: [0, -55],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    const qrViewAnimation = {
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 80],
                    outputRange: [0, -56],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 100], // 100 =====
                    outputRange: [0, -55],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    const scanViewAnimation = {
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 80],
                    outputRange: [0, -92],
                    extrapolate: 'clamp',
                }),
            },
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 100], // 100 =====
                    outputRange: [0, -55],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    return (
        <View style={styles.viewContainer}>
            <StatusBar barStyle={'light-content'} />
            <SafeAreaView>
                <View style={styles.viewUpperPlaceholder} />
            </SafeAreaView>
            <SafeAreaView style={styles.viewHeaderContainer}>
                <View style={styles.viewUpperHeader}>
                    <View style={styles.viewSearchContainer}>
                        <Image source={require('./assets/images/momo/search.png')} style={styles.imgSearchIcon} />
                        <AnimatedTextInput
                            placeholder={'Tìm kiếm'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
                            style={[styles.inputSearch, searchAnimation]}
                        />
                    </View>
                    <Image source={require('./assets/images/momo/bell.png')} style={styles.imgBellIcon} />
                    <Image
                        source={require('./assets/images/avatar.jpeg')}
                        style={styles.imgAvatar}
                        resizeMode={'contain'}
                    />
                </View>
                <View style={styles.viewLowerHeader}>
                    <Animated.View style={[styles.viewFeature, depositViewAnimation]}>
                        <Animated.Image
                            source={require('./assets/images/momo/deposit-circle.png')}
                            style={[styles.imgFeatureCircleIcon, featureIconCircleAnimation]}
                            resizeMode={'contain'}
                        />
                        <Animated.Image
                            source={require('./assets/images/momo/deposit.png')}
                            style={[styles.imgFeatureIcon, featureIconAnimation]}
                            resizeMode={'contain'}
                        />
                        <Animated.Text style={[styles.txtFeatureName, featureNameAnimation]}>NẠP TIỀN</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.viewFeature, withdrawViewAnimation]}>
                        <Animated.Image
                            source={require('./assets/images/momo/withdraw-circle.png')}
                            style={[styles.imgFeatureCircleIcon, featureIconCircleAnimation]}
                            resizeMode={'contain'}
                        />
                        <Animated.Image
                            source={require('./assets/images/momo/withdraw.png')}
                            style={[styles.imgFeatureIcon, featureIconAnimation]}
                            resizeMode={'contain'}
                        />
                        <Animated.Text style={[styles.txtFeatureName, featureNameAnimation]}>RÚT TIỀN</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.viewFeature, qrViewAnimation]}>
                        <Animated.Image
                            source={require('./assets/images/momo/qr-circle.png')}
                            style={[styles.imgFeatureCircleIcon, featureIconCircleAnimation]}
                            resizeMode={'contain'}
                        />
                        <Animated.Image
                            source={require('./assets/images/momo/qr.png')}
                            style={[styles.imgFeatureIcon, featureIconAnimation]}
                            resizeMode={'contain'}
                        />
                        <Animated.Text style={[styles.txtFeatureName, featureNameAnimation]}>MÃ QR</Animated.Text>
                    </Animated.View>
                    <Animated.View style={[styles.viewFeature, scanViewAnimation]}>
                        <Animated.Image
                            source={require('./assets/images/momo/scan-circle.png')}
                            style={[styles.imgFeatureCircleIcon, featureIconCircleAnimation]}
                            resizeMode={'contain'}
                        />
                        <Animated.Image
                            source={require('./assets/images/momo/scan.png')}
                            style={[styles.imgFeatureIcon, featureIconAnimation]}
                            resizeMode={'contain'}
                        />
                        <Animated.Text style={[styles.txtFeatureName, featureNameAnimation]}>QUÉT MÃ</Animated.Text>
                    </Animated.View>
                </View>
            </SafeAreaView>
            <ScrollView
                ref={scrollViewRef}
                onScroll={(e) => {
                    const offsetY = e.nativeEvent.contentOffset.y;
                    scrollDirection.current = offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
                    lastOffsetY.current = offsetY;
                    animatedValue.setValue(offsetY);
                }}
                onScrollEndDrag={() => {
                    scrollViewRef.current?.scrollTo({
                        y: scrollDirection.current === 'down' ? 100 : 0, // 100
                        animated: true,
                    });
                }}
                scrollEventThrottle={16}
            >
                <View style={styles.viewHeaderPlaceholder} />
                <View style={styles.viewScrollContent} />
            </ScrollView>
        </View>
    );
};

const UPPER_HEADER_HEIGHT = 40;
const LOWER_HEADER_HEIGHT = 96;

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    viewHeaderContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#AF0C6E',
    },
    viewUpperHeader: {
        height: UPPER_HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    viewSearchContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    inputSearch: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 4,
        paddingLeft: 32,
        color: 'white',
        borderRadius: 4,
    },
    imgSearchIcon: {
        width: 16,
        height: 16,
        marginLeft: 8,
    },
    imgBellIcon: {
        width: 16,
        height: 16,
        marginHorizontal: 32,
    },
    imgAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderColor: 'white',
        borderWidth: 4,
    },
    viewLowerHeader: {
        height: LOWER_HEADER_HEIGHT,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    viewFeature: {
        alignItems: 'center',
    },
    imgFeatureCircleIcon: {
        width: 32,
        height: 32,
    },
    imgFeatureIcon: {
        width: 16,
        height: 16,
        position: 'absolute',
        top: 8,
    },
    txtFeatureName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 14,
        marginTop: 12,
    },
    viewUpperPlaceholder: {
        height: UPPER_HEADER_HEIGHT,
    },
    viewHeaderPlaceholder: {
        height: LOWER_HEADER_HEIGHT,
    },
    viewScrollContent: {
        height: wHeight * 2,
        backgroundColor: 'white',
    },
});

export default MomoHeader;
