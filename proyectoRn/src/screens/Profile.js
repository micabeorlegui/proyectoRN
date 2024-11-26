import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            users: []
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user === null) {
                this.props.navigation.navigate('Login')
            }
        });

        const currentUser = auth.currentUser;
        if (currentUser) {
            db.collection("posts")
                .where("owner", "==", currentUser.email)
                .onSnapshot((docs) => {
                    let posteosObtenidos = [];
                    docs.forEach(doc => {
                        posteosObtenidos.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    });
                    this.setState({
                        posteos: posteosObtenidos
                    });
                });

            db.collection("users")
                .where("owner", "==", currentUser.email)
                .onSnapshot((docs) => {
                    let arrayUsers = [];
                    docs.forEach(doc => {
                        arrayUsers.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    this.setState({
                        users: arrayUsers
                    })
            })
        }
    }

    eliminarPost(postId) {
        db.collection("posts")
            .doc(postId)
            .delete()
    }

    cerrarSesion() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('Login');
            })
            .catch((error) => {
                console.error('Error al cerrar sesión:', error);
            });
    }

    render() {
      const user = this.state.users.length > 0 ? this.state.users[0].data : null;
      return (
          <View style={styles.container}>
              <Image 
                  source={require('../../assets/img/background.jpeg')} 
                  style={styles.backgroundImage}
              />
              <View style={styles.content}>
                  {user && (
                      <>
                          <Text style={styles.titulo}>{user.userName}</Text>
                          <Image
                              source={{ uri: "https://thumbs.dreamstime.com/b/l%C3%ADnea-icono-del-negro-avatar-perfil-de-usuario-121102131.jpg" }}
                              style={styles.imgPerfil}
                              resizeMode='contain'
                          />
                          <Text style={styles.user}>{auth.currentUser.email}</Text>
                          <TouchableOpacity
                              onPress={() => this.cerrarSesion()}
                              style={styles.button}
                          >
                              <Text style={styles.buttonText}>Cerrar Sesión</Text>
                          </TouchableOpacity>
                          <Text style={styles.titulo}>Tus posteos: {this.state.posteos.length}</Text>
                      </>
                  )}
                  {this.state.posteos.length === 0 ? (
                      <>
                          <Text style={styles.user}>El usuario no tiene posteos</Text>
                      </>
                  ) : (
                      <FlatList
                          data={this.state.posteos}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                              <View>
                                  <Post postInfo={item} />
                                  <TouchableOpacity
                                      style={styles.button}
                                      onPress={() => this.eliminarPost(item.id)}
                                  >
                                      <Text style={styles.buttonText}>Eliminar posteo</Text>
                                  </TouchableOpacity>
                              </View>
                          )}
                      />
                  )}
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
      alignItems: 'center',
      paddingHorizontal: 20
  },
  titulo:{
      fontWeight:'bold',
      fontSize:24,
      marginTop:20,
      color:'#481E14'
  },
  user:{
      fontSize:15,
      marginBottom: 25,
      marginTop:10,
      color:'#481E14'
  },
  imgPerfil: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginVertical: 10,
      borderWidth: 2,
      borderColor: '#481E14'
  },
  button: {
      backgroundColor: '#6C4E31',
      padding: 10,
      borderRadius: 7,
      marginTop: 10,
      alignItems: 'center',
      width: '50%',
      alignSelf: 'center'
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold'
  }
});

export default Profile;