import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {getRequest} from '../../api/getRequest';
import {updateRequest} from '../../api/updateRequest';
import UseGlobalState from '../../contexts/GlobalState';

export default function EditarCitaScreen({route, navigation}) {
  const {id, offline} = route.params;
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const {isOffline, localStorage, updateByIdLocalStorage} = UseGlobalState();

  useEffect(() => {
    if (offline) {
      const storedData = localStorage[id];
      if (storedData) {
        setName(storedData.name);
        setReason(storedData.reason);
        setDate(storedData.date);
        setTime(storedData.time);
      }
    } else {
      getRequest(id).then(response => {
        setName(response.name);
        setReason(response.reason);
        setDate(response.date);
        setTime(response.time);
      });
    }
  }, [id]);

  const handleUpdateCita = async () => {
    if (!name || !reason || !date || !time) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      if (offline) {
        await updateByIdLocalStorage(id, {name, reason, date, time});
        navigation.goBack();
      } else {
        await updateRequest(id, {name, reason, date, time});
        Alert.alert('Éxito', 'Cita actualizada exitosamente');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar la cita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Cita</Text>
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
      <Button title="Actualizar Cita" onPress={handleUpdateCita} />
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
