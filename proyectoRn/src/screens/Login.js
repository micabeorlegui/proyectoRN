import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import {db, auth} from '../firebase/config';


class Login extends Component{
   constructor(){
       super();
       this.state={
        email: "",
        password: "",
        logued: false,
        errores: [],
        errores2: [],
        error:''
       }
   }

   componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.props.navigation.navigate('HomeMenu')
            }
        })
  }

   handleSubmit() { 
        let errores= []

        if (this.state.email==='' || this.state.password==='' ) {
            errores.push('Todos los campos deben ser completados.')
        }

        if (!this.state.email.includes("@")) {
            errores.push("Atención. Recorda que un email debe incluir '@'.");
        }

        this.setState({ errores });

        db.collection('users').where('email', '==', this.state.email).onSnapshot(
            docs => {
                if (docs.empty) {
                    this.setState({ errores2: "El email no está registrado. Por favor, regístrate."});
                }
                
                if(!docs.empty && docs.password !== this.state.password) {
                    this.setState({ errores2: "La contraseña es incorrecta."});
                }
            }
        )

        auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => this.setState({ logued: true,  errores: [] }))
        .then( ()=>  this.props.navigation.navigate("HomeMenu"))
        .catch((error) => this.setState({ error: "Fallo el login" }));    
    }
  
   render () {
       return(
        <View style={styles.container}>
            <Image source={require('../../assets/img/background.jpeg')} style={styles.backgroundImage}/>
            <View style={styles.content}>
                <Text style={styles.login}>Ingresar</Text>

                <TextInput
                    style={styles.field} 
                    keyboardType="email-address"
                    placeholder="Ingrese su email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.field} 
                    placeholder="Ingrese su contrasena"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />

                {this.state.errores.length > 0 ? (
                    <View>{this.state.errores.map((error, index) => (
                        <Text key={index} style={styles.error}>{error}</Text>))}
                    </View>
                ) : (null) }

                {this.state.errores2.length > 0 ? (
                    <Text style={styles.error}>{this.state.errores2}</Text>
                ) : (null) }

                {!this.state.error==='' ? (<Text style={styles.error}>{this.state.error}</Text>):(null)}

                <TouchableOpacity onPress={() => this.handleSubmit() }  style={styles.botonLogin}>
                    <Text style={styles.textoCentro}>Acceder</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")} style={styles.noTengoCuenta}>
                    <Text style={styles.textoCentro}>No tengo cuenta</Text>
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
    login:{
        fontWeight:'bold',
        lineHeight:40,
        fontSize:24,
        marginBottom: 25,
        color:'#481E14'
    },
    botonLogin:{
        backgroundColor:'#A67B5B',
        width:'50%',
        borderRadius:10,
        padding:4,
        marginTop:20
    },
    noTengoCuenta:{
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

export default Login