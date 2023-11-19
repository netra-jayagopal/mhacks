import React, { useState } from 'react'; 
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (text) => setName(text);
    const handleEmailChange = (text) => setEmail(text);
    const handlePasswordChange = (text) => setPassword(text);

    const handleCreateAccount = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
                        
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                itemsOrdered: [],
                itemsSold: [],
                itemsInCart: [],
                itemsListed: []
            })
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Error creating account:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.group}>
            <Text style={styles.header}>New User</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleNameChange}
                value={name}
                placeholder="Name"
                autoCapitalize="none"
             />

            <TextInput
                style={styles.input}
                onChangeText={handleEmailChange}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                onChangeText={handlePasswordChange}
                value={password}
                placeholder="Password"
                secureTextEntry
            />

            <Button 
                title="Create Account" 
                onPress={handleCreateAccount}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        padding: 20
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    group: {
        alignItems: 'center',
        height: 60,
        width: 300,
        position: 'absolute',
        top: '20%',
    }
});

export default SignupScreen