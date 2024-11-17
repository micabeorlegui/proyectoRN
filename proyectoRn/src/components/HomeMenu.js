import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import Users from '../screens/Users';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const HomeMenu= (props) => {
    return(
        <Tab.Navigator >
        
          <Tab.Screen 
            options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />, headerShown:false}}
            name="Home" 
            component={Home}
          />

          <Tab.Screen  
            options={{tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />, headerShown:false}}
            name="NewPost" 
            component={NewPost} 
          />

          <Tab.Screen  
            options={{tabBarIcon: () => <MaterialIcons name="account-circle" size={24} color="black" />, headerShown: false }}
            name="Profile" 
            component={Profile} 
          />
          <Tab.Screen
            options={{tabBarIcon: () => <FontAwesome name="users" size={24} color="black" />, headerShown:false}}
            name="Usuarios" 
            component={Users} 
          />
        
      </Tab.Navigator>
    )
    
}

export default HomeMenu