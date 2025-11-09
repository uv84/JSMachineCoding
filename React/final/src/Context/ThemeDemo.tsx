import { useTheme } from "./context";

export default function ThemeDemo() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div style={{
      backgroundColor: theme.background,
      color: theme.text,
      minHeight: "100vh",
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto", 
      }}>
        <h1>Theme Switcher Demo</h1>
        <p>Current theme: {isDark ? "Dark" : "Light"}</p>
        
        <button 
          onClick={toggleTheme}>
          Switch to {isDark ? "Light" : "Dark"} Theme
        </button> 
      </div>
    </div>
  );
}