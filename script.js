const themeSwitcher = document.querySelector('#themeSwitcher')

// This navigator is a browser navigational tool which access you current location and gives coordiantes. This navigator is available in all the browsers
navigator.geolocation.getCurrentPosition((position) => { // All these .geolocation.getCurrentPosition((position)=>{}) are prebuilt methods
    // console.log(position);
    let sunset = new Date().sunset(position.coords.latitude, position.coords.longitude);
    let sunrise = new Date().sunrise(position.coords.latitude, position.coords.longitude);
    // console.log(sunrise, sunset);
    if(isDay(sunset, sunrise)) {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }


    function isDay(sunset, sunrise) {
        const nowHours = new Date().getHours();
        return nowHours >= sunrise.getHours() && nowHours < sunset.getHours();
    }
})



const defaultTheme = localStorage.getItem('theme') || 'theme-light';// This will set a default theme of theme-light when no theme is selected by the user
setTheme(defaultTheme) // This function will be called first

themeSwitcher.addEventListener('change', (e) => {
    setTheme(e.target.value)
    // console.log(e.target.value);
})

function setTheme(theme) {
    // When you will receive a empty theme if you have selected "select a theme" assign the theme you have recived else set the light-theme
    theme = theme || 'theme-light';

    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    themeSwitcher.value = theme
}