import React, {createContext, useContext, useEffect, useState} from 'react';

import {createRequest} from '../api/createRequest';
import {getObjetctStorage, setStorage} from '../utils/local-storage';

export default function UseGlobalState() {
  const context = useContext(GlobalState);
  if (!context) {
    throw new Error(
      'useGlobalStateContext must be used within a GlobalStateProvider',
    );
  }
  return context;
}

export const GlobalState = createContext({
  isOffline: false,
  setIsOffline: state => {},
  connectionRestored: false,
  setConnectionRestored: state => {},
  localStorage: [],
  pushLocalStorage: async value => {},
  updateByIdLocalStorage: async (id, value) => {},
  deleteByIdLocalStorage: async id => {},
  uploadData: async () => {},
});

export const GlobalStateProvider = ({children}) => {
  const [isOffline, setIsOffline] = useState(false);
  const [connectionRestored, setConnectionRestored] = useState(false);
  const [localStorage, setLocalStorage] = useState([]);

  useEffect(() => {
    locateLocalStorage();
  }, []);

  const locateLocalStorage = async () => {
    let storage = await getObjetctStorage('appointments');
    storage = storage || [];
    setLocalStorage(storage);
  };

  const pushLocalStorage = async appointment => {
    let storage = await getObjetctStorage('appointments');
    storage = storage || [];
    storage.push(appointment);
    await setStorage('appointments', storage);
    setLocalStorage(await getObjetctStorage('appointments'));
  };

  const updateByIdLocalStorage = async (id, updatedAppointment) => {
    let storage = await getObjetctStorage('appointments');
    storage = storage || [];

    if (id >= 0 && id < storage.length) {
      storage[id] = {
        ...storage[id],
        ...updatedAppointment,
      };
      await setStorage('appointments', storage);
      setLocalStorage(await getObjetctStorage('appointments'));
    } else {
      console.warn('ID fuera de los límites del array');
    }
  };

  const deleteByIdLocalStorage = async id => {
    const storage = await getObjetctStorage('appointments');
    storage.splice(id, 1);
    await setStorage('appointments', storage);
    setLocalStorage(await getObjetctStorage('appointments'));
  };

  const uploadData = async () => {
    const savedStorage = await getObjetctStorage('appointments');
    if (Array.isArray(savedStorage) && savedStorage.length > 0) {
      for (const appointment of savedStorage) {
        try {
          await createRequest(appointment);
        } catch (error) {
          console.log(error);
        }
      }

      await setStorage('appointments', []);
      setLocalStorage([]);
    }
  };

  return (
    <GlobalState.Provider
      value={{
        isOffline,
        setIsOffline,
        connectionRestored,
        setConnectionRestored,
        localStorage,
        pushLocalStorage,
        updateByIdLocalStorage,
        deleteByIdLocalStorage,
        uploadData,
      }}>
      {children}
    </GlobalState.Provider>
  );
};
