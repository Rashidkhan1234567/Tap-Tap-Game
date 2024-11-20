import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

const Level_4Screen = ({ navigation }) => {
  const [timer, setTimer] = useState(25);
  const [number, setNumber] = useState(85);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef(null); 
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
    }, 1000);

    return () => clearInterval(intervalRef.current); 
  }, []);

  useEffect(() => {
    if (timer === 0 && number > 0) {
      clearInterval(intervalRef.current);
      setAlertTitle("Game Over");
      setAlertMessage("You Lose!");
      setShowAlert(true);
    }

    if (number === 0) {
      clearInterval(intervalRef.current);
      setShowConfetti(true);
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
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    if (alertTitle === "Congratulations!") {
      navigation.navigate("Level_5");
    } else if (alertTitle === "Game Over") {
      navigation.navigate("Game");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Level 4</Text>
      <View style={styles.container}>
        <Text style={styles.timer}>Timer: {timer}s</Text>
        <Text style={styles.number}>{number}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.circleButton} onPress={decrementNumber}>
            <Text style={styles.buttonText}>Tap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={decrementNumber}>
            <Text style={styles.buttonText}>Tap</Text>
          </TouchableOpacity>
        </View>

        {showConfetti && <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} fallSpeed={3000} />}

        <Modal
          transparent={true}
          visible={showAlert}
          animationType="slide"
          onRequestClose={() => setShowAlert(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{alertTitle}</Text>
              <Text style={styles.modalMessage}>{alertMessage}</Text>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: alertTitle === "Congratulations!" ? "#28A745" : "#FF5733" },
                ]}
                onPress={handleAlertConfirm}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    backgroundColor: "#4CAF50",
    width: "100%",
    textAlign: "center",
    padding: 30,
    paddingTop: 60,
  },
  timer: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#1D72B8" },
  number: { fontSize: 32, fontWeight: "bold", marginVertical: 20 },
  buttons: { flexDirection: "row", justifyContent: "space-around", width: "70%", marginTop: 20 },
  circleButton: {
    backgroundColor: "#4CAF50",
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { fontSize: 24, color: "#FFFFFF", fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  modalMessage: { fontSize: 18, marginBottom: 20 },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});

export default Level_4Screen;
