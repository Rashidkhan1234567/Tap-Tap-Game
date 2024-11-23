import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Animatable from "react-native-animatable";
import { Audio } from "expo-av";

const Level_3Screen = ({ navigation }) => {
  const [timer, setTimer] = useState(20);
  const [number, setNumber] = useState(65);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef(null);

  const soundRef = useRef({
    tap: null,
    win: null,
    lose: null,
    countdown: null,
  });

  useEffect(() => {
    const loadSounds = async () => {
      soundRef.current.tap = await Audio.Sound.createAsync(
        require("../../assets/sounds/tap.mp3")
      );
      soundRef.current.win = await Audio.Sound.createAsync(
        require("../../assets/sounds/win.mp3")
      );
      soundRef.current.lose = await Audio.Sound.createAsync(
        require("../../assets/sounds/lose.mp3")
      );
      soundRef.current.countdown = await Audio.Sound.createAsync(
        require("../../assets/sounds/countdown.mp3")
      );
    };

    loadSounds();

    return () => {
      Object.values(soundRef.current).forEach((sound) => sound?.unloadAsync());
    };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timer <= 4 && timer > 0) {
      soundRef.current.countdown.sound?.replayAsync();
    }

    if (timer === 0 && number > 0) {
      clearInterval(intervalRef.current);
      soundRef.current.lose.sound?.playAsync();
      soundRef.current.countdown.sound?.stopAsync();
      setAlertTitle("Game Over");
      setAlertMessage("You Lose!");
      setShowAlert(true);
    }

    if (number === 0) {
      clearInterval(intervalRef.current);
      setShowConfetti(true);
      soundRef.current.win.sound?.playAsync();
      soundRef.current.countdown.sound?.stopAsync();
      setTimeout(() => {
        setAlertTitle("Congratulations!");
        setAlertMessage("You Win!");
        setShowAlert(true);
        setShowConfetti(false);
      }, 3000);
    }
  }, [timer, number]);

  const decrementNumber = () => {
    if (number > 0) {
      setNumber((prev) => prev - 1);
      soundRef.current.tap.sound?.replayAsync();
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    if (alertTitle === "Congratulations!") {
      navigation.navigate("Level_4");
    } else if (alertTitle === "Game Over") {
      navigation.navigate("Game");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={styles.title}
      >
        Level 3
      </Animatable.Text>
      <View style={styles.content}>
        <Animatable.Text
          animation="fadeInDown"
          duration={800}
          style={styles.timer}
        >
          Timer: {timer}s
        </Animatable.Text>
        <Animatable.Text
          animation="flipInX"
          duration={800}
          style={styles.number}
        >
          {number}
        </Animatable.Text>
        <View style={styles.buttons}>
          <Animatable.View animation="zoomIn" duration={500}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={decrementNumber}
            >
              <Text style={styles.buttonText}>Tap</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="zoomIn" duration={500} delay={200}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={decrementNumber}
            >
              <Text style={styles.buttonText}>Tap</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {showConfetti && (
          <ConfettiCannon count={100} origin={{ x: 0, y: -50 }} fallSpeed={3000} />
        )}

        <Modal
          transparent={true}
          visible={showAlert}
          animationType="slide"
          onRequestClose={() => setShowAlert(false)}
        >
          <View style={styles.modalBackground}>
            <Animatable.View
              animation="bounceIn"
              style={styles.modalContainer}
            >
              <Text style={styles.modalTitle}>{alertTitle}</Text>
              <Text style={styles.modalMessage}>{alertMessage}</Text>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor:
                      alertTitle === "Congratulations!" ? "#28A745" : "#FF5733",
                  },
                ]}
                onPress={handleAlertConfirm}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", justifyContent: "center" },
  content: { alignItems: "center" },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#00FF00",
    textAlign: "center",
    marginBottom: 30,
  },
  timer: { fontSize: 24, fontWeight: "bold", color: "#00FF00", marginBottom: 20 },
  number: { fontSize: 32, fontWeight: "bold", color: "#FFFFFF", marginVertical: 20 },
  buttons: { flexDirection: "row", justifyContent: "space-around", width: "80%" },
  circleButton: {
    backgroundColor: "#00FF00",
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { fontSize: 24, color: "#000000", fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#111111",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 24, fontWeight: "bold", color: "#00FF00", marginBottom: 10 },
  modalMessage: { fontSize: 18, color: "#FFFFFF", marginBottom: 20 },
  modalButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  modalButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});

export default Level_3Screen;
