import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {createRequest} from '../../api/createRequest'; // Asegúrate de tener una función para manejar la solicitud de creación
import {useNavigation} from '@react-navigation/native';
import UseGlobalState from '../../contexts/GlobalState';

export default function CrearCitaScreen() {
  const navigation = useNavigation();

  const {isOffline, pushLocalStorage} = UseGlobalState();

  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleCreateCita = async () => {
    if (!name || !reason || !date || !time) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      console.log({name, reason, date, time});
      if (isOffline) {
        await pushLocalStorage({name, reason, date, time});
        Alert.alert('Dato guardado localmente');
      } else {
        await createRequest({name, reason, date, time});
        Alert.alert('Éxito', 'Cita creada exitosamente');
      }
      setName('');
      setReason('');
      setDate('');
      setTime('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear la cita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nueva Cita</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Motivo"
        value={reason}
        onChangeText={setReason}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (dd/mm/yyyy)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (hh:mm)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Crear Cita" onPress={handleCreateCita} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});
