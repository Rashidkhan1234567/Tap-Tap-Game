import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap Tap Game - About</Text>
      <Text style={styles.description}>
        In this game, you have a number starting from 10. Every time you press one of the buttons, the number will decrease.
        You need to reduce the number to 0 before the time runs out. If you reach 0 within the time limit, you win the game!
      </Text>
      <Button
        title="Start Game"
        onPress={() => navigation.navigate('Level_1')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
});

export default GameScreen;
