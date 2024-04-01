import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "./../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('./../../assets/Images/Login.jpg')}
                style={styles.loginImage} />

            <View style={styles.textContainer}>
                <Text style={styles.mainTitle}>Community Marketplace</Text>
                <Text style={styles.subtitle}>Buy and sell items with ease!</Text>
                <TouchableOpacity onPress={onPress} style={styles.getStartButton}>
                    <Text style={styles.getStartButtonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover', // Adjusted to "cover" to match "object-covers"
    },
    textContainer: {
        padding: 32, // Adjust as needed, equivalent to "p-8"
    },
    mainTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 12, // Adjust as needed, equivalent to "m-3"
        color: '#718096', // Equivalent to "text-slate-500"
    },
    getStartButton: {
        padding: 16, // Adjust as needed, equivalent to "p-4"
        backgroundColor: '#e53e3e', // Equivalent to "bg-red-700"
        borderRadius: 9999, // Fully rounded
    },
    getStartButtonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
});
