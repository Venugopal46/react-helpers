// https://kentcdodds.com/blog/should-i-usestate-or-usereducer
function useDarkMode() {
  const preferDarkQuery = '(prefers-color-scheme: dark)'
  const [mode, setMode] = React.useState(
    () =>
      window.localStorage.getItem('colorMode') ||
      (window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light'),
  )
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () => setMode(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])
  React.useEffect(() => {
    window.localStorage.setItem('colorMode', mode)
  }, [mode])
  return [mode, setMode]
}
