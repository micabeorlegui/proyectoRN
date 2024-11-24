import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import {db, auth} from '../firebase/config';
import User from "../components/User";
import FontAwesome from '@expo/vector-icons/FontAwesome';

class Users extends Component{
   constructor(){
       super();
       this.state={
            query: "",
            users:[],
            resultados:[],
       }
   }

    componentDidMount(){
        db.collection('users')
        .onSnapshot(
            docs => {
                const users = [];
                docs.forEach(doc => {
                    users.push({id:doc.id, data: doc.data()})
                })
                this.setState({users:users, resultados: users})
            }
        )
    }

    handleSearch = (text) => {
        this.setState({ query: text }, () => this.handleFilter());
    }

    handleFilter(){
        const filteredUsers = this.state.users.filter((user) =>user.data.userName.toLowerCase().includes(this.state.query.toLowerCase()));
        this.setState({ resultados: filteredUsers });
    }

    render() {
        return(
            <View style={styles.container}>
                <Image source={require('../../assets/img/background.jpeg')} style={styles.backgroundImage}/>
                <View style={styles.content}>
                    <Text style={styles.titulo}>Filtrado de usuarios  <FontAwesome name="filter" size={24} color="#481E14" /></Text>

                    <TextInput style={styles.field} 
                        placeholder='Filtrar por nombre de usuario...'
                        onChangeText={this.handleSearch}
                        value={this.state.query} />

                    {this.state.resultados.length > 0 ? (
                        <FlatList
                            data= {this.state.resultados}
                            keyExtractor= {item=>item.id}
                            renderItem= {({item})=> <User userInfo={item}/>}
                        />
                    ) :(<Text style={styles.error}>El nombre de usuario ingresado no existe.</Text>)}
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
titulo:{
    fontWeight:'bold',
    lineHeight:40,
    fontSize:24,
    marginBottom: 20,
    color:'#481E14',
    marginTop:20,
},
field:{
    width: '100%',
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 30,
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
error:{
    color: "red",
    marginTop:10
}
});

export default Users