import { ThemeProvider } from './context';
import Demo2 from './Demo2';
import ThemeDemo from './ThemeDemo';


// Example of how to use the Theme Context in your App
function AppExample() {
  return (
    <ThemeProvider>
      <ThemeDemo />
      <Demo2 />
    </ThemeProvider>
  );
}

export default AppExample;