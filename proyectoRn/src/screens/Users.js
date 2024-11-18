import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import {db, auth} from '../firebase/config';
import User from "../components/User";


class Users extends Component{
   constructor(){
       super();
       this.state={
            query: "",
            resultados:[],
            error:'',
            noResultados:''
       }
   }

    onSubmit(){
        if (!this.state.query.includes("@")) {
            this.setState({ error:"El email debe contener un '@'." });
            return;
        }

        db.collection('users').where('email', '==', this.state.query).onSnapshot(
            docs => {
                if (docs.empty) {
                    this.setState({noResultados: 'El email ingresado no existe'})
                }else{
                    const resultados = [];
                    docs.forEach(doc => {
                        resultados.push({id:doc.id, data: doc.data()})
                    })

                    this.setState({resultados:resultados})
                }
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Image source={require('../../assets/img/background.jpeg')} style={styles.backgroundImage}/>
                <View style={styles.content}>
                    <TextInput style={styles.field} 
                        keyboardType='email-address'
                        placeholder='Buscar usuario por email...'
                        onChangeText={ text => this.setState({query:text}) }
                        value={this.state.query} />

                    <TouchableOpacity style={styles.boton} onPress={() => this.onSubmit()}>
                        <Text style={styles.textoCentro}> Buscar </Text> 
                    </TouchableOpacity>

                    {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
                    {this.state.noResultados ? <Text style={styles.error}>{this.state.noResultados}</Text> : null}

                    {this.state.resultados.length > 0 ? (
                        <FlatList
                            data= {this.state.resultados}
                            keyExtractor= {item=>item.id}
                            renderItem= {({item})=> <User userInfo={item}/>}
                        />
                    ) :(null)}
                </View>     
            </View>
        );
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
boton:{
    backgroundColor:'#A67B5B',
    width:'50%',
    borderRadius:10,
    padding:4,
    marginTop:20,
    marginBottom:20
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

export default Users