import React from 'react';
import { StyleSheet, View } from 'react-native';
import Message from './Message';
import messages from './assets/messages';

type Props = {};

const Inbox = (props: Props) => {
    return (
        <View style={styles.viewInboxContainer}>
            {messages.map((message, index) => (
                <Message key={index} data={message} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    viewInboxContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Inbox;
