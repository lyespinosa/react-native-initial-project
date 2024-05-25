import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {listRequest} from '../../api/listRequest';
import {deleteRequest} from '../../api/deleteRequest'; // Asegúrate de tener una función para manejar la solicitud de eliminación
import CitaCard from '../components/CitaCard';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import UseGlobalState from '../../contexts/GlobalState';

export default function VerScreen() {
  const navigation = useNavigation();

  const [citas, setCitas] = useState([]);
  const {isOffline, localStorage, uploadData, deleteByIdLocalStorage} =
    UseGlobalState();

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
    if (!isOffline) {
      navigation.navigate('Editar', {id});
    } else {
      Alert.alert('Conéctate a internet para poder editar');
    }
  };

  const handleDelete = async (id: any) => {
    try {
      if (!isOffline) {
        await deleteRequest(id);
        setCitas(citas.filter(cita => cita.id !== id));
        Alert.alert('Éxito', 'Cita eliminada exitosamente');
      } else {
        Alert.alert('Conéctate a internet para borrar esta cita');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al eliminar la cita');
    }
  };

  const hadlOfflineEdit = (id: any) => {
    navigation.navigate('Editar', {id, offline: true});
  };

  const handleOfflineDelete = (id: any) => {
    deleteByIdLocalStorage(id);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {localStorage.length > 0 && (
          <>
            {!isOffline && (
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  await uploadData();
                  listRequest().then(response => {
                    setCitas(response);
                  });
                }}>
                <Text style={styles.text_button}>Subir datos al servidor</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.title}>Citas guardardas sin conexión</Text>
            {localStorage.map((cita: any, index: any) => (
              <CitaCard
                key={index}
                id={index}
                name={cita.name}
                reason={cita.reason}
                date={cita.date}
                time={cita.time}
                onEdit={hadlOfflineEdit}
                onDelete={handleOfflineDelete}
              />
            ))}
            <View style={styles.line} />
          </>
        )}

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
  line: {
    marginVertical: 20,
    height: 3,
    width: 400,
    backgroundColor: '#3e3e3e',
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10,
  },
  text_button: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
