import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

const GameScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0
  const scaleAnim = useRef(new Animated.Value(1)).current; // Button scale animation

  // Screen fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => navigation.navigate('Level_1'));
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={{
          uri: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDV3d2JqZ2R5ZG51a3NwNmd3bHdhMWR2eHJ0bGs4bzRmbWMxNnhwMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/27dtxxrlQp4uzFpLZG/giphy.gif',
        }}
        style={styles.gif}
      />
      <Text style={styles.title}>Tap Tap Game</Text>
      <Text style={styles.description}>
        Reduce the number to **0** before the time runs out! Are you ready to play?
      </Text>
      <Animated.View style={[styles.startButtonWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={styles.startButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 320,
    height: 180,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#00ff7f',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#dcdcdc',
    lineHeight: 26,
    marginBottom: 40,
  },
  startButtonWrapper: {
    borderRadius: 25,
  },
  startButton: {
    backgroundColor: '#4caf50', // Green button
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default GameScreen;
