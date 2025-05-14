function saveText() {
  const text = document.getElementById('text-input').value;
  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('link-output').innerHTML = 
      `<a href="${data.link}" target="_blank">🔗 Your SaveText Link</a>`;
  });
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

// Live time
setInterval(() => {
  document.getElementById('time').textContent = 
    new Date().toLocaleTimeString();
}, 1000);

// Weather API (Open-Meteo Example)
fetch('https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current_weather=true')
  .then(res => res.json())
  .then(data => {
    document.getElementById('weather').textContent = 
      `${data.current_weather.temperature}°C, ${data.current_weather.weathercode}`;
  });
