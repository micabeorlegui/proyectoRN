import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {db, auth} from '../firebase/config';


class Register extends Component{
   constructor(){
       super();
       this.state={
            email:'',
            username:'',
            password:'',
            registered: false,
            errores:[]
       }
   }

   componentDidMount(){
    auth.onAuthStateChanged(user=>{
        if (user) {
            this.props.navigation.navigate('HomeMenu') 
        }
    })
}

onSubmit(){

    let errores= []
    if (this.state.email==='' || this.state.password==='' || this.state.username==='' ) {
        errores.push('Todos los campos deben ser completados.')
    }

    if (!this.state.email.includes("@")) {
        errores.push("El email debe contener un '@'.");
    }

    if (this.state.password.length<6) {
        errores.push("La contraseña debe tener al menos 6 caracteres.");
    }

    this.setState({ errores });

    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response=>{
            this.setState({registered: true})

            db.collection('users').add({
                owner: auth.currentUser.email,
                email: this.state.email,
                userName:this.state.username,
                createdAt: Date.now()
            })
        })
        .then(()=> this.props.navigation.navigate('Login'))
        .catch(error=>{
            this.setState({error:'Fallo en el regitro.'})
        })
}

   render () {
       return(
        <View style={styles.container}>
            <Text style={styles.register}>Registro</Text>

            <TextInput style={styles.field} 
                keyboardType='email-address'
                placeholder='Ingrese su email'
                onChangeText={ text => this.setState({email:text}) }
                value={this.state.email} />

            <TextInput style={styles.field} 
                keyboardType='default'
                placeholder='Ingrese su nombre de usuario'
                onChangeText={ text => this.setState({username:text}) }
                value={this.state.username} />

            <TextInput style={styles.field} 
                keyboardType='default'
                placeholder='Ingrese su contraseña'
                secureTextEntry={true} 
                onChangeText={ text => this.setState({password:text}) }
                value={this.state.password}/> 
            
            {this.state.errores.length > 0 && (
                <View style={styles.errorContainer}>{this.state.errores.map((error, index) => (
                    <Text key={index} style={styles.error}>{error}</Text>))}
                </View>
            )}

            <TouchableOpacity style={styles.botonRegistro} onPress={() => this.onSubmit()}>
                <Text style={styles.textoCentro}> Registrar </Text> 
            </TouchableOpacity> 

            <TouchableOpacity style={styles.ingresar} onPress={ ()=> this.props.navigation.navigate('Login')}>
                <Text style={styles.textoCentro}>Ya tengo cuenta</Text>
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
    register:{
        fontWeight:'bold',
        lineHeight:40,
        fontSize:20
    },
    ingresar:{
        backgroundColor:'rgb(255,165,0)',
        padding:8,
        marginBottom:10,
        marginTop:10,
        borderRadius:10
    },
    botonRegistro:{
        backgroundColor:'rgb(155,155,155)',
        width:'25%',
        borderRadius:10,
        paddin:5
    },
    textoCentro:{
        textAlign:'center'
    },
    field:{
        borderWidth:1,
        borderColor:'rgb(155,155,155)',
        marginBottom:10,
        paddingLeft:10
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    }
  });

export default Register