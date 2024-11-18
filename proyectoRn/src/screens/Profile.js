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
           <View>
                <TouchableOpacity style={styles.salir} onPress={ ()=> this.logOut()}>
                    <Text style={styles.textoCentro}>Log out</Text>
                </TouchableOpacity>
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
    home:{
        fontWeight:'bold',
        lineHeight:40,
        fontSize:20
    },
    salir:{
        backgroundColor:'rgb(255,165,0)',
        padding:8,
        marginBottom:10,
        marginTop:10,
        borderRadius:10
    },
    textoCentro:{
        textAlign:'center'
    }
  });
export default Profile