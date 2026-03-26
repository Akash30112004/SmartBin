import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as websocket from '../services/websocket';
<<<<<<< HEAD
import { get_bins_request } from '../services/bins.service';
import { get_kpi_request } from '../services/analytics.service';
import { adapt_bins } from '../adapters/bin.adapter';
import { adapt_kpi } from '../adapters/analytics.adapter';
=======
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [bins, setBins] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [wsConnected, setWsConnected] = useState(false);

  const [selectedBin, setSelectedBin] = useState(null);

  const selectBin = useCallback((bin) => {
    setSelectedBin((prev) => (prev?.id === bin?.id ? null : bin));
  }, []);

  const clearSelectedBin = useCallback(() => setSelectedBin(null), []);

  useEffect(() => {
<<<<<<< HEAD
    if (!isAuthenticated || !token) {
      setBins([]);
      setAnalytics({});
      return;
    }

    const fetch_dashboard_data = async () => {
      try {
        const [bins_response, kpi_response] = await Promise.all([
          get_bins_request(),
          get_kpi_request()
        ]);

        setBins(adapt_bins(bins_response?.data || []));
        setAnalytics(adapt_kpi(kpi_response?.data || {}));
      } catch (error) {
        console.error('Failed to load dashboard data:', error.message || error);
      }
    };

    fetch_dashboard_data();
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      const shouldConnect = import.meta.env.VITE_ENABLE_WS !== 'false';
      let unsubscribe_bin_update = () => {};
      let unsubscribe_sensor_offline = () => {};
=======
    if (isAuthenticated && token) {
      const shouldConnect = import.meta.env.VITE_ENABLE_WS !== 'false';
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
      
      if (!shouldConnect) {
        console.log('WebSocket disabled in development');
        return;
      }
      
      websocket.connect(
        token,
        () => {
          setWsConnected(true);
<<<<<<< HEAD

          unsubscribe_bin_update = websocket.subscribe('binUpdate', (event) => {
            setBins((previous_bins) =>
              previous_bins.map((bin) => {
                if (bin.id !== event.bin_id) {
                  return bin;
                }

                return {
                  ...bin,
                  fillLevel: event.fill_level ?? bin.fillLevel,
                  status: event.status === 'FULL' ? 'Alert' : 'Normal',
                  lastUpdated: new Date().toISOString()
                };
              })
            );
          });

          unsubscribe_sensor_offline = websocket.subscribe('sensorOffline', (event) => {
            setAlerts((previous_alerts) => [event, ...previous_alerts].slice(0, 50));
=======
          
          websocket.subscribe('/topic/bins', (data) => {
            setBins(data);
          });
          
          websocket.subscribe('/topic/alerts', (data) => {
            setAlerts(prev => [data, ...prev].slice(0, 50));
          });
          
          websocket.subscribe('/topic/analytics', (data) => {
            setAnalytics(data);
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
          });
        },
        (error) => {
          console.error('WebSocket connection error:', error);
          setWsConnected(false);
        }
      );

      return () => {
<<<<<<< HEAD
        unsubscribe_bin_update();
        unsubscribe_sensor_offline();
=======
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
        websocket.disconnect();
        setWsConnected(false);
      };
    }
  }, [isAuthenticated, token]);

  const value = {
    bins,
    setBins,
    alerts,
    setAlerts,
    analytics,
    setAnalytics,
    wsConnected,
    selectedBin,
    selectBin,
    clearSelectedBin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
