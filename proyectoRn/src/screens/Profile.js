import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import {db, auth} from '../firebase/config';


class Profile extends Component{
   constructor(){
       super();
       this.state={


       }
   }

   logOut(){
        auth
            .signOut()
            .then(()=>{
                this.props.navigation.navigate('Login')
            })
            .catch(error => console.log(error))
    }

   render () {
       return(
        <View style={styles.container}>
            <Image source={require('../../assets/img/background.jpeg')} style={styles.backgroundImage}/>
            <View style={styles.content}>
                <Text style={styles.profile}>Mi perfil</Text>
                <TouchableOpacity style={styles.boton} onPress={ ()=> this.logOut()}>
                    <Text style={styles.textoCentro}>Log out</Text>
                </TouchableOpacity>
           </View>
        </View>
       )
   }


}

const styles = StyleSheet.create({
    container: {
      width:'100%',
      flex: 1,
      padding: 20
    },
    backgroundImage:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    profile:{
        fontWeight:'bold',
        lineHeight:40,
        fontSize:24,
        marginBottom: 25,
        color:'#481E14'
    },
    boton:{
        backgroundColor:'#A67B5B',
        width:'50%',
        borderRadius:10,
        padding:4,
        marginTop:20
    },
    textoCentro:{
        textAlign:'center'
    }
  });
export default Profile