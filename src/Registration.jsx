import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../config';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: 'https://auth-1070b.firebaseapp.com',
        })
          .then(() => {
            alert('Verification email sent');
          }).catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/backee.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <ScrollView>
          <Text style={styles.title}>Register Here..!!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='First Name'
              placeholderTextColor="#aaa"
              onChangeText={(firstName) => setFirstName(firstName)}
              autoCorrect={false}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Last Name'
              placeholderTextColor="#aaa"
              onChangeText={(lastName) => setLastName(lastName)}
              autoCorrect={false}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Email'
              placeholderTextColor="#aaa"
              onChangeText={(email) => setEmail(email)}
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
            />
            <TextInput
              style={styles.textInput}
              placeholder='Password'
              placeholderTextColor="#aaa"
              onChangeText={(password) => setPassword(password)}
              autoCorrect={false}
              autoCapitalize='none'
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => registerUser(email, password, firstName, lastName)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Registration;

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
    paddingTop: 20,
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
});
