import React from "react";
import { View, Text, StyleSheet } from "react-native";

const User = ({ userInfo }) => {
    const { email, userName } = userInfo.data;

    return (
        <View style={styles.container}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.email}>Email: {email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FFF8E8", 
        padding: 10, 
        marginVertical: 10, 
        borderRadius: 12, 
        shadowColor: "#000",
        shadowOpacity: 0.15, 
        shadowRadius: 6, 
        elevation: 5,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4E342E',
        marginBottom:10
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
});

export default User