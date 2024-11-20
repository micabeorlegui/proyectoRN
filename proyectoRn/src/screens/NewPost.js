import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native-web'
import { db, auth } from '../firebase/config';
import firebase from 'firebase';


class NewPost extends Component{
    constructor(props){
        super(props)
        this.state= {
          mensaje:"",
          errores: []
        }
    }  

    crearPosteo(mensaje,likes ) {
        let errores= []
        if(mensaje ===""){
            errores.push('No podes crear postes vacios')
            this.setState({ errores });
            return
        }else{
            db.collection('posts').add({
                owner: auth.currentUser.email,
                createdAt:Date.now(),
                mensaje: mensaje,
                likes: []
            })
            .then( this.props.navigation.navigate("Home"))
            .catch(err => console.log(err))

        }   
    }
    
    render() {
        return (
          <View style={styles.container}>
             <Image source={require('../../assets/img/background.jpeg')} style={styles.backgroundImage}/>
             <View style={styles.content}>
                <Text style={styles.nuevoPosteo}>Nuevo Posteo</Text>
                
                <TextInput 
                    style={styles.field} 
                    placeholder='Escribir...'
                    onChangeText={ (text) => this.setState({mensaje:text}) }
                    value={this.state.mensaje} />
                
                <TouchableOpacity style={styles.boton} onPress={() => this.crearPosteo(this.state.mensaje)}>
                    <Text style={styles.textoCentro}>Crear posteo</Text>
                </TouchableOpacity>

                {this.state.errores.length > 0 ? (
                    <View>{this.state.errores.map((error, index) => (
                        <Text key={index} style={styles.error}>{error}</Text>))}
                    </View>
                ) : (null) }

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
    nuevoPosteo:{
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
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'bold',
    },
    field:{
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 15,
        backgroundColor: '#FBFBFB',
        fontSize: 14,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    }
});
export default NewPost