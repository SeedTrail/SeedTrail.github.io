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
        "/assets/plots/us_election_2016_KeywordCreator.png",
        "/assets/plots/us_election_2016_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Brexit",
      date: "2016-06-23",
      coords: [51.5074, -0.1278], // London
      description: "Le Z-score pour 'Brexit' a atteint un pic le jour du référendum. Les petits créateurs ont joué un rôle clé dans la diffusion des discussions.",
      plotPaths: [
        "/assets/plots/brexit_KeywordCreator.png",
        "/assets/plots/brexit_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a clear structural break at the referendum date, indicating a sudden surge in attention.",
        "The placebo test confirms that effects of similar magnitude are virtually absent under random-date assignments."
      ]
    },
    {
      name: "Paris Attacks",
      date: "2015-11-13",
      coords: [48.8566, 2.3522], // Paris
      description: "L'activité sur YouTube a explosé après les attaques, avec un Z-score élevé pour les mots-clés comme 'Paris' et 'Terrorisme'.",
      plotPaths: [
        "/assets/plots/paris_attacks_KeywordCreator.png",
        "/assets/plots/paris_attacks_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a pronounced level jump exactly at the event date, followed by a steep downward trend in the post-event period.",
        "The placebo distribution indicates that the estimated effect at the true event date lies far in the extreme right tail."
      ]
    },
    {
      name: "Hong Kong Protests",
      date: "2019-08-12",
      coords: [22.3193, 114.1694], // Hong Kong
      description: "Les manifestations de 2019 ont généré une activité YouTube exceptionnelle, avec des Z-scores élevés pour les mots-clés comme 'Protest' et 'Hong Kong'.",
      plotPaths: [
        "/assets/plots/hong_kong_protests_peak_KeywordCreator.png",
        "/assets/plots/hong_kong_protests_peak_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis reveals a distinct level increase at the event date, interrupting a relatively stable pre-event trend.",
        "The placebo test shows that the estimated effect at the true event date lies toward the upper tail of the distribution."
      ]
    },
    {
      name: "#MeToo",
      date: "2017-10-01",
      coords: [40.7128, -74.0060], // New York
      description: "Le mouvement #MeToo a vu une explosion de contenu YouTube, avec des Z-scores élevés pour les mots-clés comme 'Harassment' et 'Survivor'.",
      plotPaths: [
        "/assets/plots/metoo_KeywordCreator.png",
        "/assets/plots/metoo_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a level change at the event date, followed by a steeper positive trend in the post-event period.",
        "The placebo distribution shows that the estimated effect at the true event date lies in the left tail of the distribution."
      ]
    },
    {
      name: "Black Lives Matter",
      date: "2013-07-13",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Le mouvement BLM a généré une activité YouTube massive, avec des Z-scores élevés pour les mots-clés comme 'Police Brutality' et 'Protest'.",
      plotPaths: [
        "/assets/plots/black_lives_matter_KeywordCreator.png",
        "/assets/plots/black_lives_matter_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a gradual increase in activity leading up to the event date, followed by a visible decline afterward.",
        "The placebo distribution shows that the estimated effect at the actual event date lies well within the range of effects."
      ]
    },
    {
      name: "US Election 2012",
      date: "2012-11-06",
      coords: [38.9072, -77.0369], // Washington, D.C.
      description: "The 2012 US presidential election showed a significant but transient spike in YouTube activity.",
      plotPaths: [
        "/assets/plots/us_election_2012_KeywordCreator.png",
        "/assets/plots/us_election_2012_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Pokémon GO",
      date: "2016-07-06",
      coords: [35.6762, 139.6503], // Tokyo
      description: "Le lancement de Pokémon GO a provoqué un pic d'activité YouTube, avec des Z-scores élevés pour les mots-clés comme 'AR' et 'Niantic'.",
      plotPaths: [
        "/assets/plots/pokemon_go_KeywordCreator.png",
        "/assets/plots/pokemon_go_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis reveals a small level increase at the event date, followed by a largely flat post-event trajectory.",
        "The placebo test indicates that the estimated effect at the true event date lies close to the center of the placebo distribution."
      ]
    },
    {
      name: "E3 2016",
      date: "2016-06-14",
      coords: [33.7701, -118.1937], // Long Beach, CA (different from Los Angeles)
      description: "L'E3 2016 a généré une activité YouTube exceptionnelle, avec des Z-scores élevés pour les mots-clés comme 'Trailer' et 'Gameplay'.",
      plotPaths: [
        "/assets/plots/e3_KeywordCreator.png",
        "/assets/plots/e3_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a pronounced level jump at the event date, interrupting a moderately increasing pre-event trend.",
        "The placebo test places the estimated effect for the actual event date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "FIFA 17 Launch",
      date: "2016-09-27",
      coords: [51.4545, -0.9781], // Reading, UK (different from London)
      description: "Le lancement de FIFA 17 a provoqué un pic d'activité YouTube, avec des Z-scores élevés pour les mots-clés comme 'The Journey' et 'Gameplay'.",
      plotPaths: [
        "/assets/plots/fifa_17_launch_KeywordCreator.png",
        "/assets/plots/fifa_17_launch_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows an upward trend leading up to the release, followed by a flattening of the trajectory after the event date.",
        "The placebo test shows that the estimated effect at the true event date lies close to the center of the placebo distribution."
      ]
    },
    {
      name: "Star Wars Battlefront II",
      date: "2017-11-01",
      coords: [37.3382, -121.8863], // San Jose, CA
      description: "Le lancement de Star Wars Battlefront II a généré une activité YouTube massive, avec des Z-scores élevés pour les mots-clés comme 'Loot Box' et 'Controversy'.",
      plotPaths: [
        "/assets/plots/star_wars_battlefront_ii_KeywordCreator.png",
        "/assets/plots/star_wars_battlefront_ii_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a modest level increase at the event date, followed by a gradual downward trend.",
        "The placebo test places the estimated effect at the actual event date near the center of the distribution."
      ]
    },
    {
      name: "Zelda: Breath of the Wild",
      date: "2017-03-03",
      coords: [35.6895, 139.6917], // Tokyo (slightly different from Pokémon GO)
      description: "Le lancement de Zelda: Breath of the Wild a provoqué un pic d'activité YouTube, avec des Z-scores élevés pour les mots-clés comme 'Open World' et 'Gameplay'.",
      plotPaths: [
        "/assets/plots/zelda_breath_of_the_wild_KeywordCreator.png",
        "/assets/plots/zelda_breath_of_the_wild_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a pronounced level jump at the event date, interrupting a gently increasing pre-release trend.",
        "The placebo test places the estimated effect for the actual release far beyond the extreme right tail of the distribution."
      ]
    },
    {
      name: "Worlds LoL 2016",
      date: "2016-10-29",
      coords: [37.7749, -122.4194], // San Francisco
      description: "Les Worlds LoL 2016 ont généré une activité YouTube exceptionnelle, avec des Z-scores élevés pour les mots-clés comme 'SKT' et 'Finals'.",
      plotPaths: [
        "/assets/plots/worlds_lol_KeywordCreator.png",
        "/assets/plots/worlds_lol_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a smooth and gradual upward trend that continues through the event date.",
        "The placebo distribution places the estimated effect at the actual event date well within the central mass."
      ]
    },
    {
      name: "GTA V Release",
      date: "2013-09-17",
      coords: [34.0522, -118.25], // Slightly different from other LA coordinates
      description: "Le lancement de GTA V a provoqué un pic d'activité YouTube, avec des Z-scores élevés pour les mots-clés comme 'Open World' et 'Heist'.",
      plotPaths: [
        "/assets/plots/gta_release_KeywordCreator.png",
        "/assets/plots/gta_release_ZScore.png"
      ],
      plotTexts: [
        "The ITS analysis shows a pronounced level jump at the event date, interrupting a steadily increasing pre-release trend.",
        "The placebo test places the estimated effect of the actual release far beyond the extreme right tail of the distribution."
      ]
    }
  ];

  // Initialize the map with dark tiles
  const map = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  // Add markers to the map with slight offsets for overlapping coordinates
  const markers = [];
  events.forEach((event, index) => {
    const marker = L.marker(event.coords, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: #0CF2DB; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff;"></div>`,
        iconSize: [20, 20]
      }),
      title: event.name
    }).addTo(map);

    marker.on('click', () => {
      // Set pop-up content
      document.getElementById('popup-event-name').textContent = event.name;
      document.getElementById('popup-event-date').textContent = event.date;
      document.getElementById('popup-event-description').textContent = event.description;
      document.getElementById('popup-plot1').src = event.plotPaths[0];
      document.getElementById('popup-plot2').src = event.plotPaths[1];
      document.getElementById('popup-plot1-text').textContent = event.plotTexts[0];
      document.getElementById('popup-plot2-text').textContent = event.plotTexts[1];

      // Show pop-up
      const popup = document.getElementById('event-popup');
      popup.style.display = 'block';
      popup.scrollTop = 0;
    });

    // Add a tooltip to the marker
    marker.bindTooltip(event.name, {
      permanent: false,
      direction: 'top'
    });

    markers.push(marker);
  });

  // Fit the map to show all markers
  const group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.5));

  // Close pop-up when clicking outside
  document.getElementById('event-popup').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
});
