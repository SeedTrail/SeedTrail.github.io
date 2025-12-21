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
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/brexit_KeywordCreator.png",
        "/assets/plots/brexit_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Paris Attacks",
      date: "2015-11-13",
      coords: [48.8566, 2.3522], // Paris
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/paris_attacks_KeywordCreator.png",
        "/assets/plots/paris_attacks_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Hong Kong Protests",
      date: "2019-08-12",
      coords: [22.3193, 114.1694], // Hong Kong
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/hong_kong_protests_peak_KeywordCreator.png",
        "/assets/plots/hong_kong_protests_peak_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "#MeToo",
      date: "2017-10-01",
      coords: [40.7128, -74.0060], // New York
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/metoo_KeywordCreator.png",
        "/assets/plots/metoo_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Black Lives Matter",
      date: "2013-07-13",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/black_lives_matter_KeywordCreator.png",
        "/assets/plots/black_lives_matter_KeywordCreator.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Pokémon GO",
      date: "2016-07-06",
      coords: [35.6762, 139.6503], // Tokyo
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/pokemon_go_KeywordCreator.png",
        "/assets/plots/pokemon_go_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "E3 2016",
      date: "2016-06-14",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/e3_KeywordCreator.png",
        "/assets/plots/e3_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "FIFA 17 Launch",
      date: "2016-09-27",
      coords: [51.5074, -0.1278], // London
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/fifa_17_launch_KeywordCreator.png",
        "/assets/plots/fifa_17_launch_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Star Wars Battlefront II",
      date: "2017-11-01",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/star_wars_battlefront_ii_KeywordCreator.png",
        "/assets/plots/star_wars_battlefront_ii_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Zelda: Breath of the Wild",
      date: "2017-03-03",
      coords: [35.6762, 139.6503], // Tokyo
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/zelda_breath_of_the_wild_KeywordCreator.png",
        "/assets/plots/zelda_breath_of_the_wild_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
      ]
    },
    {
      name: "Worlds LoL 2016",
      date: "2016-10-29",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Les Worlds LoL 2016 ont généré une activité YouTube exceptionnelle, avec des Z-scores élevés pour les mots-clés comme 'SKT' et 'Finals'.",
      plotPaths: [
        "/assets/plots/worlds_lol_KeywordCreator.png",
        "/assets/plots/worlds_lol_ZScore.png"
      ]
    },
    {
      name: "GTA V Release",
      date: "2013-09-17",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Le Z-score montre une activité exceptionnelle sur YouTube pendant l'élection de 2016. La pénétration des mots-clés comme 'Trump' et 'Clinton' a été portée par les grands créateurs.",
      popupText: "The US Election 2016 showed a significant spike in YouTube activity. This analysis reveals how major political events create synchronized narratives across multiple channels.",
      plotPaths: [
        "/assets/plots/gta_release_KeywordCreator.png",
        "/assets/plots/gta_release_ZScore.png"
      ],
      plotTexts: [
        "This ITS analysis shows a pronounced level increase at the election date, followed by a sustained downward trend in the post-event period.",
        "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution."
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
      document.getElementById('popup-event-description').textContent = event.description;
      document.getElementById('popup-event-text').textContent = event.popupText;
      document.getElementById('popup-plot1').src = event.plotPaths[0];
      document.getElementById('popup-plot2').src = event.plotPaths[1];
      document.getElementById('popup-plot1-text').textContent = event.plotTexts[0];
      document.getElementById('popup-plot2-text').textContent = event.plotTexts[1];
    
      // Show pop-up
      const popup = document.getElementById('event-popup');
      popup.style.display = 'block';
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
