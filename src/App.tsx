import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthConsumer } from './contexts/jwt-context';
import { SplashScreen } from './components/SplashScreen';
import AppRoutes from './Routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AuthConsumer>
        {(auth) => {
          const showSplashScreen = !auth.isInitialized;

          return showSplashScreen ? <SplashScreen /> : (
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          );
        }}
      </AuthConsumer>
    </AuthProvider>
  );
}

export default App;

