import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import {db, auth} from '../firebase/config';


class Register extends Component{
   constructor(){
       super();
       this.state={
            email:'',
            username:'',
            password:'',
            registered: false,
            error:'',
            errores:[]
       }
   }

   componentDidMount(){
    auth.onAuthStateChanged(user=>{
        if (user) {
            this.props.navigation.navigate('Login') 
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

        this.setState({ errores: errores });

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
            <Image source={require('../../assets/img/background.jpeg')} style={styles.backgroundImage}/>
            <View style={styles.content}>
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

                {this.state.errores.length > 0 ? (
                    <View>{this.state.errores.map((error, index) => (
                        <Text key={index} style={styles.error}>{error}</Text>))}
                    </View>
                ) : (null) }

                {!this.state.error==='' ? (<Text style={styles.error}>{this.state.error}</Text>):(null)}

                <TouchableOpacity style={styles.botonRegistro} onPress={() => this.onSubmit()}>
                    <Text style={styles.textoCentro}> Registrar </Text> 
                </TouchableOpacity> 

                <TouchableOpacity style={styles.yaTengoCuenta} onPress={ ()=> this.props.navigation.navigate('Login')}>
                    <Text style={styles.textoCentro}>Ya tengo cuenta</Text>
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
    register:{
        fontWeight:'bold',
        lineHeight:40,
        fontSize:24,
        marginBottom: 25,
        color:'#481E14'
    },
    botonRegistro:{
        backgroundColor:'#A67B5B',
        width:'50%',
        borderRadius:10,
        padding:4,
        marginTop:20
    },
    yaTengoCuenta:{
        backgroundColor:'#B99470',
        width:'60%',
        borderRadius:10,
        padding:4,
        marginTop:20
    },
    textoCentro:{
        textAlign:'center'
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

export default Register