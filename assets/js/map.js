document.addEventListener('DOMContentLoaded', function() {
  // Check if Leaflet is loaded
  if (typeof L === 'undefined') {
    console.error('Leaflet.js is not loaded.');
    document.getElementById('map').innerHTML = '<p style="text-align: center; padding: 20px; background: #111; color: #fff; border-radius: 8px;">Map unavailable. Please try again later.</p>';
    return;
  }

  // Define your events with coordinates, plots, and descriptions
  const events = [
    {
      name: "US Election 2016",
      date: "2016-11-08",
      coords: [37.0902, -95.7129], // Center of the US
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      plotPaths: [
        "/assets/plots/us_election_2016_ITS.png",
        "/assets/plots/us_election_2016_Placebo.png"
      ]
    },
    {
      name: "Brexit",
      date: "2016-06-23",
      coords: [51.5074, -0.1278], // London
      description: "Le Z-score pour 'Brexit' a atteint un pic le jour du référendum. Les petits créateurs ont joué un rôle clé dans la diffusion des discussions.",
      plotPaths: [
        "/assets/plots/brexit_ITS.png",
        "/assets/plots/brexit_Placebo.png"
      ]
    },
    {
      name: "Paris Attacks",
      date: "2015-11-13",
      coords: [48.8566, 2.3522], // Paris
      description: "L'activité sur YouTube a explosé après les attaques, avec un Z-score élevé pour les mots-clés comme 'Paris' et 'Terrorisme'.",
      plotPaths: [
        "/assets/plots/paris_attacks_ITS.png",
        "/assets/plots/paris_attacks_Placebo.png"
      ]
    },
    {
      name: "Hong Kong Protests",
      date: "2019-08-12",
      coords: [22.3193, 114.1694], // Hong Kong
      description: "Les manifestations de 2019 ont généré une activité YouTube exceptionnelle, avec des Z-scores élevés pour les mots-clés comme 'Protest' et 'Hong Kong'.",
      plotPaths: [
        "/assets/plots/hong_kong_protests_peak_ITS.png",
        "/assets/plots/hong_kong_protests_peak_Placebo.png"
      ]
    },
    {
      name: "#MeToo",
      date: "2017-10-01",
      coords: [40.7128, -74.0060], // New York
      description: "Le mouvement #MeToo a vu une explosion de contenu YouTube, avec des Z-scores élevés pour les mots-clés comme 'Harassment' et 'Survivor'.",
      plotPaths: [
        "/assets/plots/metoo_ITS.png",
        "/assets/plots/metoo_Placebo.png"
      ]
    },
    {
      name: "Black Lives Matter",
      date: "2013-07-13",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Le mouvement BLM a généré une activité YouTube massive, avec des Z-scores élevés pour les mots-clés comme 'Police Brutality' et 'Protest'.",
      plotPaths: [
        "/assets/plots/black_lives_matter_ITS.png",
        "/assets/plots/black_lives_matter_Placebo.png"
      ]
    },
    {
      name: "Pokémon GO",
      date: "2016-07-06",
      coords: [35.6762, 139.6503], // Tokyo
      description: "Le lancement de Pokémon GO a provoqué un pic d'activité YouTube, avec des Z-scores élevés pour les mots-clés comme 'AR' et 'Niantic'.",
      plotPaths: [
        "/assets/plots/pokemon_go_ITS.png",
        "/assets/plots/pokemon_go_Placebo.png"
      ]
    },
    {
      name: "E3 2016",
      date: "2016-06-14",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "L'E3 2016 a généré une activité YouTube exceptionnelle, avec des Z-scores élevés pour les mots-clés comme 'Trailer' et 'Gameplay'.",
      plotPaths: [
        "/assets/plots/e3_ITS.png",
        "/assets/plots/e3_Placebo.png"
      ]
    },
    {
      name: "FIFA 17 Launch",
      date: "2016-09-27",
      coords: [51.5074, -0.1278], // London
      description: "Le lancement de FIFA 17 a provoqué un pic d'activité YouTube, avec des Z-scores élevés pour les mots-clés comme 'The Journey' et 'Gameplay'.",
      plotPaths: [
        "/assets/plots/fifa_17_launch_ITS.png",
        "/assets/plots/fifa_17_launch_Placebo.png"
      ]
    },
    {
      name: "Star Wars Battlefront II",
      date: "2017-11-01",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Le lancement de Star Wars Battlefront II a généré une activité YouTube massive, avec des Z-scores élevés pour les mots-clés comme 'Loot Box' et 'Controversy'.",
      plotPaths: [
        "/assets/plots/star_wars_battlefront_ii_ITS.png",
        "/assets/plots/star_wars_battlefront_ii_Placebo.png"
      ]
    },
    {
      name: "Zelda: Breath of the Wild",
      date: "2017-03-03",
      coords: [35.6762, 139.6503], // Tokyo
      description: "Le lancement de Zelda: Breath of the Wild a provoqué un pic d'activité YouTube, avec des Z-scores élevés pour les mots-clés comme 'Open World' et 'Gameplay'.",
      plotPaths: [
        "/assets/plots/zelda_breath_of_the_wild_ITS.png",
        "/assets/plots/zelda_breath_of_the_wild_Placebo.png"
      ]
    },
    {
      name: "Worlds LoL 2016",
      date: "2016-10-29",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Les Worlds LoL 2016 ont généré une activité YouTube exceptionnelle, avec des Z-scores élevés pour les mots-clés comme 'SKT' et 'Finals'.",
      plotPaths: [
        "/assets/plots/worlds_lol_ITS.png",
        "/assets/plots/worlds_lol_Placebo.png"
      ]
    },
    {
      name: "GTA V Release",
      date: "2013-09-17",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Le lancement de GTA V a provoqué un pic d'activité YouTube, avec des Z-scores élevés pour les mots-clés comme 'Open World' et 'Heist'.",
      plotPaths: [
        "/assets/plots/gta_release_ITS.png",
        "/assets/plots/gta_release_Placebo.png"
      ]
    }
  ];

// Initialize the map with dark tiles
  const map = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  // Add markers to the map
  events.forEach(event => {
    const marker = L.marker(event.coords, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: #0CF2DB; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff;"></div>`,
        iconSize: [20, 20]
      })
    }).addTo(map);
    marker.on('click', () => {
    // Set pop-up content
      document.getElementById('popup-event-name').textContent = event.name;
      document.getElementById('popup-event-date').textContent = event.date;
      document.getElementById('popup-event-description').textContent = event.description;
      document.getElementById('popup-plot1').src = event.plotPaths[0];
      document.getElementById('popup-plot2').src = event.plotPaths[1];
  
      // Show pop-up
      const popup = document.getElementById('event-popup');
      popup.style.display = 'block';
    
      // Adjust position if needed (e.g., scroll to top)
      popup.scrollTop = 0;
    });
  });



  
  // Close pop-up when clicking outside
  document.getElementById('event-popup').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
});
