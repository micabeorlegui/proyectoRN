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
        <Text>
          Possteado por: {this.props.postInfo.data.owner}
        </Text>
        <Text>
          Descripcion: {this.props.postInfo.data.mensaje}  
        </Text>
        <Text>
          {new Date(this.props.postInfo.data.createdAt).toLocaleString()}  
        </Text>
        { this.state.liked ? (
          <TouchableOpacity onPress={() => this.handleLike()}> 
            <Text>Dislike </Text> 
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.handleDisLike()}> 
            <Text>like</Text> 
          </TouchableOpacity>
        )}
        <Text> Cantidad de likes:{ }</Text>

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

export default Post;