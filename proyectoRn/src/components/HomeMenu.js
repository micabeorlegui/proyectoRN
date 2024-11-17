import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import Users from '../screens/Users';
const Tab = createBottomTabNavigator();

const HomeMenu= (props) => {
    return(
        <Tab.Navigator >
        
          <Tab.Screen 
            options={ { headerShown: false }}
            name="Home" 
            component={Home}
          />

          <Tab.Screen  
            options={ { headerShown: false }}
            name="NewPost" 
            component={NewPost} 
          />

          <Tab.Screen  
            options={ { headerShown: false }}
            name="Profile" 
            component={Profile} 
          />
          <Tab.Screen
            options={ { headerShown: false }}
            name="Usuarios" 
            component={Users} 
          />
        
      </Tab.Navigator>
    )
    
}

export default HomeMenu