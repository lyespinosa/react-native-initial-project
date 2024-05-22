import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {listRequest} from '../api/listRequest';
import CitaCard from '../components/CitaCard';

export default function VerScreen() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    listRequest().then(response => {
      setCitas(response);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de citas</Text>

        {citas.map((cita: any) => (
          <CitaCard
            key={cita.id}
            name={cita.name}
            reason={cita.reason}
            date={cita.date}
            time={cita.time}
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
