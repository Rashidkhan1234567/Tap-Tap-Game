import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import Level_1Screen from "./screens/Levels/Level_1Screen"; 
import Level_2Screen from "./screens/Levels/Level_2Screen"; 
import Level_3Screen from "./screens/Levels/Level_3Screen"; 
import Level_4Screen from "./screens/Levels/Level_4Screen"; 
import Level_5Screen from "./screens/Levels/Level_5Screen"; 

// Optional Linking Configuration for Web:
const linking = {
  prefixes: ["http://localhost:19006", "https://your-web-url"],
  config: {
    screens: {
      Home: "",
      Game: "game",
      Level_1: "level-1",
      Level_2: "level-2",
      Level_3: "level-3",
      Level_4: "level-4",
      Level_5: "level-5",
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{
            title: "Tap Tap Game",
            headerStyle: {
              backgroundColor: "#1D72B8",
            },
            headerTintColor: "#d3d3d3",
            headerTitleStyle: {
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Level_1"
          component={Level_1Screen}
          options={{
            headerShown : false,
            title: "Level 1",
            headerStyle: { backgroundColor: "#4CAF50" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Level_2"
          component={Level_2Screen}
          options={{
            headerShown : false,
            title: "Level 2",
            headerStyle: { backgroundColor: "#FF9800" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Level_3"
          component={Level_3Screen}
          options={{
            headerShown : false,
            title: "Level 3",
            headerStyle: { backgroundColor: "#FF9800" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Level_4"
          component={Level_4Screen}
          options={{
            headerShown : false,
            title: "Level 4",
            headerStyle: { backgroundColor: "#FF9800" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Level_5"
          component={Level_5Screen}
          options={{
            headerShown : false,
            title: "Level 5",
            headerStyle: { backgroundColor: "#FF9800" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
