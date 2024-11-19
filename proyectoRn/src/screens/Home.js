import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, TextInput, Image} from 'react-native';
import {db, auth} from '../firebase/config';
import Post from "../components/Post";


class Home extends Component{
   constructor(){
       super();
       this.state={
            posts:[]
       }
   }

   componentDidMount(){
    db.collection("posts").orderBy('createdAt', 'desc').onSnapshot(
        docs => {
            let arrDocs= []
            docs.forEach(doc=>{
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: arrDocs
            }, console.log("Posteos en el home: ",JSON.stringify(this.state.posts, null, 4)))
        }
    )
    }

   render () {
       return(
        <View style={styles.container}>
            <Image source={require('../../assets/img/background.jpeg')} style={styles.backgroundImage}/>
            <View style={styles.content}>
                <Text style={styles.home}>Home</Text>
                <Text style={styles.user}>Bienvenido {auth.currentUser.email}</Text>
                
                {
                    this.state.posts.length === 0 ? (
                        <Text>No hay posts aún.</Text>
                    ) : (
                        <FlatList
                            data= {this.state.posts}
                            keyExtractor= {item=>item.id}
                            renderItem = {({item})=> <Post postInfo={item}/>}
                        />
                    )
                }
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
        alignItems: 'center',
        paddingHorizontal: 20
    },
    home:{
        fontWeight:'bold',
        fontSize:24,
        marginTop:20,
        color:'#481E14'
    },
    user:{
        fontSize:15,
        marginBottom: 25,
        marginTop:20,
        color:'#481E14'
    },

  });

export default Home