import React, { createContext, useContext, useRef, useCallback, useState } from 'react';
import { DrawerLayoutAndroid, StyleSheet, Text, View } from 'react-native';
import SearchResults from '@/components/index/SearchResults';

// Define the context type
interface DrawerContextType {
  openDrawer: () => void;
  closeDrawer: () => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const DrawerControlContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawerControl = (): DrawerContextType => {
  const context = useContext(DrawerControlContext);
  if (!context) {
    throw new Error('useDrawerControl must be used within a DrawerProvider');
  }
  return context;
};

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition] = useState<'left' | 'right'>('left');
  const [searchValue, setSearchValue] = useState<string>('');

  const openDrawer = useCallback(() => {
    if (drawer.current) {
      console.log('Opening drawer:', drawer.current);
      drawer.current.openDrawer();
    } else {
      console.log('Drawer not initialized:', drawer.current);
    }
  }, []);

  const closeDrawer = useCallback(() => {
    if (drawer.current) {
      console.log('Closing drawer:', drawer.current);
      drawer.current.closeDrawer();
    }
  }, []);

  return (
    <DrawerControlContext.Provider value={{ openDrawer, closeDrawer, searchValue, setSearchValue }}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={() => <SearchResults />}
      >
        {children}
      </DrawerLayoutAndroid>
    </DrawerControlContext.Provider>
  );
};
