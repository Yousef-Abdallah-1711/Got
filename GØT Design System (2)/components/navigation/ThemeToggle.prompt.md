Header theme switch: shows the sun in dark mode (go light) and moon in light mode.
```jsx
<ThemeToggle theme={theme} onToggle={t => { document.documentElement.dataset.theme = t; localStorage.setItem('got-theme', t); setTheme(t); }} />
```
