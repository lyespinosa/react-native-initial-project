import {ReactNode, useEffect, useRef, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Alert, Text, View} from 'react-native';

import React from 'react'; // Add missing import statement

const OfflineFlag = ({isOffline}: {isOffline: boolean}) => {
  return (
    <>
      {isOffline && (
        <View>
          <Text>Sin conexión</Text>
        </View>
      )}
    </>
  );
};

const OfflineMode = ({children}: any) => {
  const [isOffline, setIsOffline] = useState(false);
  const isOfflineRef = useRef(isOffline);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert('offline');
      } else if (state.isConnected) {
        Alert.alert('online');
      }
    });

    return () => unsubscribe();
  }, []);

  const activeOfflineMode = async () => {
    if (!isOfflineRef.current) {
      setIsOffline(true);
      isOfflineRef.current = true;
      Alert.alert('offline');
    }
  };

  const disableOfflineMode = async () => {
    if (isOfflineRef.current) {
      setIsOffline(false);
      isOfflineRef.current = false;
      console.log('online');
    }
  };

  return <>{children}</>;
};

export default OfflineMode;
