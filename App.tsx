import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';

const App = () => {
  const [userName, setUserName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [targetNumber, setTargetNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [userGuess, setUserGuess] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleNameChange = (text: string) => {
    setUserName(text);
    if (text.trim() !== '') {
      setIsNameEntered(true);
    } else {
      setIsNameEntered(false);
    }
  };

  const handleGuessChange = (text: string) => {
    setUserGuess(text);
  };

  const startGame = () => {
    if (isNameEntered) {
      setGameStarted(true);
    }
  };

  const checkGuess = () => {
    const guess = parseInt(userGuess, 10);
    if (isNaN(guess)) {
      Alert.alert('Error', 'Please enter a valid number.');
      return;
    }

    if (guess === targetNumber) {
      Alert.alert(
        'Congratulations!',
        `You guessed the number!`,
        [
          {
            text: 'Play Again',
            onPress: () => resetGame(),
          },
          {
            text: 'Exit',
            onPress: () => setGameStarted(false),
          },
        ]
      );
    } else {
      const remainingAttempts = attemptsLeft - 1;
      setAttemptsLeft(remainingAttempts);

      if (remainingAttempts === 0) {
        Alert.alert(
          'Game Over!',
          `The correct number was ${targetNumber}`,
          [
            {
              text: 'Play Again',
              onPress: () => resetGame(),
            },
            {
              text: 'Exit',
              onPress: () => setGameStarted(false),
            },
          ]
        );
      } else {
        let hint = '';
        if (Math.abs(guess - targetNumber) <= 5) {
          hint = 'You\'re very close!';
        } else if (guess < targetNumber) {
          hint = 'Too low!';
        } else {
          hint = 'Too high!';
        }
        Alert.alert('Hint', `${hint} You have ${remainingAttempts} attempts left.`);
      }
    }
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttemptsLeft(10);
    setUserGuess('');
    setGameStarted(false);
  };

  return (
    <ImageBackground source={require('./MM.jpg')} style={styles.background}>
      <View style={styles.container}>
        {!gameStarted ? (
          <>
            <Text style={styles.greeting}>Hello! Welcome to the Guessing Number Game!</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              onChangeText={handleNameChange}
              value={userName}
            />
            <Button title="Start Game" onPress={startGame} disabled={!isNameEntered} />
            {isNameEntered && (
              <Text style={styles.greeting}>Nice to meet you, {userName}!</Text>
            )}
          </>
        ) : (
          <>
            <Text style={styles.gamePrompt}>Guess the number between 1 and 100:</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Guess"
              keyboardType="numeric"
              onChangeText={handleGuessChange}
              value={userGuess}
            />
            <Button title="Submit Guess" onPress={checkGuess} />
            <Text style={styles.attempts}>Attempts left: {attemptsLeft}</Text>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  gamePrompt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
  },
  attempts: {
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
});

export default App;
