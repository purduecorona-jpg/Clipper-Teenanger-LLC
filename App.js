import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostScreen from "./screens/PostScreen";
import ChatScreen from "./screens/ChatScreen";
import JournalScreen from "./screens/JournalScreen";
import QuizScreen from "./screens/QuizScreen";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey="pk_live_your_stripe_publishable_key">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Journal" component={JournalScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
