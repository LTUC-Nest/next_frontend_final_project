export function toggleDarkMode() {
    const currentMode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', newMode === 'dark');
    localStorage.setItem('theme', newMode);
    return newMode; // Return the new mode for use in the component
  }
  
  export function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to 'light' if no theme is saved
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    return savedTheme; // Return the saved theme
  }
  