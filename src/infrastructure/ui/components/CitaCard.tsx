import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';

export default function CitaCard({
  id,
  name,
  reason,
  date,
  time,
  onEdit,
  onDelete,
}: {
  id: string;
  name: string;
  reason: string;
  date: string;
  time: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Cita con: {name}</Text>
      <Text style={styles.date}>Fecha de la cita: {date}</Text>
      <Text style={styles.date}>A las: {time}</Text>
      <Text style={styles.reason}>Motivo: {reason}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => onEdit(id)} />
        <Button title="Eliminar" onPress={() => onDelete(id)} />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
