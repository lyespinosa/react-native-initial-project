import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function CitaCard({
  name,
  reason,
  date,
  time,
}: {
  name: string;
  reason: string;
  date: string;
  time: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Cita con: {name}</Text>

      <Text style={styles.date}>Fecha de la cita: {date}</Text>
      <Text style={styles.date}>A las: {time}</Text>

      <Text style={styles.reason}>Motivo: {reason}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 300,
  },
  date: {
    fontSize: 18,
    fontWeight: 'normal',
    marginVertical: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  reason: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
