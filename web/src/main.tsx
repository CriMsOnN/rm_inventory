import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { VisibilityProvider } from './providers/VisibilityProvider';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import { theme } from './theme';
import { isEnvBrowser } from './utils/misc';
import { Provider } from 'react-redux';
import { store } from './store';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ContextMenuProvider } from './providers/ContextMenuProvider';

if (isEnvBrowser()) {
  const root = document.getElementById('root');
  root!.style.backgroundImage = 'url("https://i.imgur.com/Zj6U16K.png")';
  root!.style.backgroundSize = '100% 100%';
  root!.style.backgroundRepeat = 'no-repeat';
  root!.style.backgroundPosition = 'center';
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <VisibilityProvider>
        <DarkMode>
          <Provider store={store}>
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
              <ContextMenuProvider>
                <App />
              </ContextMenuProvider>
            </DndProvider>
          </Provider>
        </DarkMode>
      </VisibilityProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
