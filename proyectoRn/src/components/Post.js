import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { db, auth } from '../firebase/config'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      cantidadLikes: this.props.postInfo.data.likes.length

    };
  }
  componentDidMount() {
    if (this.props.postInfo.data.likes.includes(auth.currentUser.email)) {
      this.setState(
        { liked: true,
          cantidadLikes: this.props.postInfo.data.like.length,
         }
      )
    }
  }
  handleLike() {
   
  }
  handleDisLike() {
    

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textoPrincipal}>
          Publicado por: {this.props.postInfo.data.owner}
        </Text>
        <Text style={styles.textoSecundario}>
          Descripción: {this.props.postInfo.data.mensaje}  
        </Text>
        <Text style={styles.textoSecundario}>
          {new Date(this.props.postInfo.data.createdAt).toLocaleString()}  
        </Text>
        { this.state.liked ? (
          <TouchableOpacity style={styles.boton} onPress={() => this.handleLike()}> 
            <Text style={styles.textoCentro} >Dislike </Text> 
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.boton} onPress={() => this.handleDisLike()}> 
            <Text style={styles.textoCentro}>Like</Text> 
          </TouchableOpacity>
        )}
        <Text style={styles.textoSecundario}> Cantidad de likes:{ }</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 8,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textoPrincipal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom:10
    },
    textoSecundario: {
        fontSize: 14,
        color: '#666',
    },
    boton:{
        backgroundColor:'#A67B5B',
        width:'20%',
        borderRadius:10,
        padding:4,
        marginTop:20,
        marginBottom:15
    },
    textoCentro:{
        textAlign:'center'
    },
});

export default Post;