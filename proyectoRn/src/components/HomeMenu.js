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
            name="Home" 
            component={Home}
            options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="#481E14" />, headerShown:false}}
          />

          <Tab.Screen  
            name="NewPost" 
            component={NewPost} 
            options={{tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="#481E14" />, headerShown:false}}
          />

          <Tab.Screen  
            name="Profile" 
            component={Profile} 
            options={{tabBarIcon: () => <MaterialIcons name="account-circle" size={24} color="#481E14" />, headerShown: false }}
          />
          <Tab.Screen
            name="Usuarios" 
            component={Users} 
            options={{tabBarIcon: () => <FontAwesome name="users" size={24} color="#481E14" />, headerShown:false}}
          />
        
      </Tab.Navigator>
    )
    
}

export default HomeMenu