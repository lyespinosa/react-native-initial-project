import React, {useEffect, useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Alert, StyleSheet, Text, View} from 'react-native';
import UseGlobalStateContext from '../contexts/GlobalState';

const OfflineFlag = ({isOffline}: {isOffline: boolean}) => {
  return (
    <>
      {isOffline && (
        <View style={styles.flag}>
          <Text style={styles.flag_text}>Sin conexión</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flag: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    right: 0,
    left: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
  },
  flag_text: {
    color: 'white',
    fontSize: 20,
    padding: 5,
  },
});

const OfflineMode = ({children}: any) => {
  const {isOffline, setIsOffline} = UseGlobalStateContext();
  const isOfflineRef = useRef(isOffline);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        activeOfflineMode();
      } else if (state.isConnected && isOfflineRef.current) {
        disableOfflineMode();
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeOfflineMode = async () => {
    if (!isOfflineRef.current) {
      setIsOffline(true);
      isOfflineRef.current = true;
    }
  };

  const disableOfflineMode = async () => {
    if (isOfflineRef.current) {
      setIsOffline(false);
      isOfflineRef.current = false;
    }
  };

  return (
    <>
      <OfflineFlag isOffline={isOffline} />
      {children}
    </>
  );
};

export default OfflineMode;
