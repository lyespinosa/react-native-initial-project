import {View, Text, StyleSheet, ScrollView, Button, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {listRequest} from '../api/listRequest';
import {deleteRequest} from '../api/deleteRequest'; // Asegúrate de tener una función para manejar la solicitud de eliminación
import CitaCard from '../components/CitaCard';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export default function VerScreen() {
  const navigation = useNavigation();

  const [citas, setCitas] = useState([]);

  useEffect(() => {
    listRequest().then(response => {
      setCitas(response);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      listRequest().then(response => {
        setCitas(response);
      });
    }, []),
  );

  const handleEdit = (id: any) => {
    navigation.navigate('Editar', {id});
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteRequest(id);
      setCitas(citas.filter(cita => cita.id !== id));
      Alert.alert('Éxito', 'Cita eliminada exitosamente');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al eliminar la cita');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de citas</Text>
        {citas.map((cita: any) => (
          <CitaCard
            key={cita.id}
            id={cita.id}
            name={cita.name}
            reason={cita.reason}
            date={cita.date}
            time={cita.time}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
