import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import * as Animatable from "react-native-animatable";

const HomeScreen = ({ navigation }) => {
  // Updated data for games
  const games = [
    { id: "1", title: "Level Challenge", screen: "Game" },
    { id: "2", title: "Coming Soon", screen: "FutureGame" },
  ];

  const renderGameCard = ({ item }) => (
    <Animatable.View animation="zoomIn" duration={600} delay={item.id * 200}>
      <TouchableOpacity
        style={[
          styles.gameCard,
          { backgroundColor: item.title === "Coming Soon" ? "#333333" : "#00FF00" },
        ]}
        onPress={() => {
          if (item.title !== "Coming Soon") navigation.navigate(item.screen);
        }}
      >
        {item.title === "Coming Soon" && (
          <Image
            source={require("../assets/coming-soon.png")}
            style={styles.gameImage}
          />
        )}
        <Text style={styles.gameTitle}>
          {item.title === "Coming Soon" ? "New Adventure" : item.title}
        </Text>
        {item.title === "Coming Soon" && (
          <Text style={styles.comingSoonText}>Coming Soon...</Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="fadeInDown"
        duration={800}
        style={styles.title}
      >
        Game Zone
      </Animatable.Text>
      <Animatable.Text
        animation="fadeInUp"
        duration={800}
        style={styles.subtitle}
      >
        Explore and Play!
      </Animatable.Text>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={renderGameCard}
        contentContainerStyle={styles.gameList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#00FF00",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  gameList: {
    width: "100%",
    paddingHorizontal: 20,
  },
  gameCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#00FF00",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  gameTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  gameImage: {
    width: 100,
    height: 60,
    marginBottom: 10,
    tintColor: "#00FF00",
  },
  comingSoonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontStyle: "italic",
  },
});

export default HomeScreen;
