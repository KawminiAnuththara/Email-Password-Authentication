import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error.message);
        }
    };

    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
            .then(() => {
                alert("Password reset email sent");
            }).catch((error) => {
                alert(error);
            });
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/backee.png')} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Email'
                            placeholderTextColor="#aaa"
                            onChangeText={(email) => setEmail(email)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder='Password'
                            placeholderTextColor="#aaa"
                            onChangeText={(password) => setPassword(password)}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => loginUser(email, password)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Registration')}
                        style={styles.registerLink}
                    >
                        <Text style={styles.linkText}>Don't have an account? Register Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => forgetPassword()}
                        style={styles.forgetLink}
                    >
                        <Text style={styles.linkText}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:-90
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: 'white',
        textAlign: 'center',
        marginTop: 100,
    },
    inputContainer: {
        marginTop: 40,
        width: '100%',
    },
    textInput: {
        paddingTop: 40,
        paddingBottom: 20,
        width: '100%',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginBottom: 10,
        textAlign: 'center',

        borderRadius: 10,
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: 'teal',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white',
    },
    registerLink: {
        marginTop: 20,
    },
    forgetLink: {
        marginTop: 20,
    },
    linkText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
});
