document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.querySelector('.slider-container');
  const eventDetails = document.getElementById('eventDetails');

  // Define your 14 events
  const events = [
    {
      name: "US Election 2016",
      date: "2016-11-08",
      image: "/assets/img/icon1.avif",
      description: "Together, the three analyses identify the 2012 US presidential election as a highly salient but transient event in YouTube activity. The strong DiD divergence, the ITS discontinuity, and the extreme placebo result consistently point to a short-lived surge in attention tied closely to the election date.",
      plotJson: "/assets/js/us_election_2016.json", // Plotly JSON for the first plot
      plotlyDescription: "I observe a clear and well-timed spike in the treated topic at the event date, standing out from the control category. Prior to the election, both series display similar cyclical behavior, suggesting that the parallel trends assumption is reasonably satisfied. The divergence at the event date is sharp but short-lived, with the treated series quickly reverting toward pre-event levels.",
      plotPaths: [
        "/assets/plots/us_election_2016_ITS.png", // Static image for the second plot
        "/assets/plots/us_election_2016_Placebo.png"  // Static image for the third plot
      ]
      plotDescriptions: [
      "The ITS analysis shows a little pronounced level increase at the election date, followed by a sustained downward trend in the post-event period. This pattern is characteristic of an attention peak centered on election day, after which interest rapidly decays. There is no evidence of a persistent post-election elevation, indicating that the effect is primarily concentrated around the event itself.",
      "The placebo test places the estimated effect for the actual election date far in the extreme right tail of the distribution. Effects of comparable magnitude are virtually absent under random-date assignments, strongly suggesting that the observed spike is not attributable to background variability."
      ]
    },
    {
      name: "Brexit",
      date: "2016-06-23",
      image: "/assets/img/brexit.jpg",
      description: "The UK's referendum to leave the European Union, known as Brexit, had widespread political and economic consequences.",
      plotJson: "/assets/js/brexit.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/brexit_ITS.png", // Static image for the second plot
        "/assets/plots/brexit_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "Paris Attacks",
      date: "2015-11-13",
      image: "/assets/img/paris.jpg",
      description: "The November 2015 Paris attacks were a series of coordinated terrorist attacks that occurred in Paris, France.",
      plotJson: "/assets/js/paris_attacks.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/paris_attacks_ITS.png", // Static image for the second plot
        "/assets/plots/paris_attacks_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "Hong Kong Protests",
      date: "2019-08-12",
      image: "/assets/img/hong-kong.webp",
      description: "The 2019 Hong Kong protests were triggered by the introduction of an extradition bill and grew into a broader pro-democracy movement.",
      plotJson: "/assets/js/hong_kong_protests_peak.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/hong_kong_protests_peak_ITS.png", // Static image for the second plot
        "/assets/plots/hong_kong_protests_peak_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "US Election 2012",
      date: "2012-11-06",
      image: "/assets/img/2012.jpg",
      description: "The 2012 US Presidential Election saw Barack Obama win a second term as President of the United States.",
      plotJson: "/assets/js/us_election_2012.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/us_election_2012_ITS.png", // Static image for the second plot
        "/assets/plots/us_election_2012_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "#MeToo",
      date: "2017-10-01",
      image: "/assets/img/MeToo.jpg",
      description: "The #MeToo movement went viral in 2017 as a hashtag used on social media to help demonstrate the widespread prevalence of sexual assault and harassment.",
      plotJson: "/assets/js/metoo.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/metoo_ITS.png", // Static image for the second plot
        "/assets/plots/metoo_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "Black Lives Matter",
      date: "2013-07-13",
      image: "/assets/img/blm.png",
      description: "Black Lives Matter is a decentralized movement advocating for non-violent civil disobedience in protest against incidents of police brutality against African-American people.",
      plotJson: "/assets/js/black_lives_matter.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/black_lives_matter_ITS.png", // Static image for the second plot
        "/assets/plots/black_lives_matter_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "Pokémon GO",
      date: "2016-07-06",
      image: "/assets/img/pokemon.jpg",
      description: "Pokémon GO is a 2016 augmented reality mobile game that became a global phenomenon, encouraging players to explore the real world to catch virtual Pokémon.",
      plotJson: "/assets/js/pokemon_go.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/pokemon_go_ITS.png", // Static image for the second plot
        "/assets/plots/pokemon_go_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "E3 2016",
      date: "2016-06-14",
      image: "/assets/img/e3.webp",
      description: "E3 2016 was a major event in the video game industry, where many new games and consoles were announced.",
      plotJson: "/assets/js/e3.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/e3_ITS.png", // Static image for the second plot
        "/assets/plots/e3_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "FIFA 17 Launch",
      date: "2016-09-27",
      image: "/assets/img/fifa.webp",
      description: "FIFA 17 is a football simulation video game released in 2016, featuring improved gameplay and the introduction of a story mode called 'The Journey'.",
      plotJson: "/assets/js/fifa_17_launch.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/fifa_17_launch_ITS.png", // Static image for the second plot
        "/assets/plots/fifa_17_launch_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "Star Wars Battlefront II",
      date: "2017-11-01",
      image: "/assets/img/starwars.jpeg",
      description: "Star Wars Battlefront II is a 2017 action shooter game that faced controversy over its microtransaction system but was praised for its gameplay and graphics.",
      plotJson: "/assets/js/star_wars_battlefront_ii.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/star_wars_battlefront_ii_ITS.png", // Static image for the second plot
        "/assets/plots/star_wars_battlefront_ii_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "Zelda: Breath of the Wild",
      date: "2017-03-03",
      image: "/assets/img/zelda.webp",
      description: "The Legend of Zelda: Breath of the Wild is an action-adventure game released in 2017, praised for its open-world design and freedom of exploration.",
      plotJson: "/assets/js/zelda_breath_of_the_wild.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/zelda_breath_of_the_wild_ITS.png", // Static image for the second plot
        "/assets/plots/zelda_breath_of_the_wild_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "Worlds LoL 2016",
      date: "2016-10-29",
      image: "/assets/img/lol.jpg",
      description: "The 2016 League of Legends World Championship was an esports tournament held in the United States, with SK Telecom T1 winning the championship.",
      plotJson: "/assets/js/worlds_lol.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/worlds_lol_ITS.png", // Static image for the second plot
        "/assets/plots/worlds_lol_Placebo.png"  // Static image for the third plot
      ]
    },
    {
      name: "GTA V Release",
      date: "2013-09-17",
      image: "/assets/img/gta.jpg",
      description: "Grand Theft Auto V is an action-adventure game released in 2013, known for its open-world design and three-protagonist story.",
      plotJson: "/assets/js/gta_release.json", // Plotly JSON for the first plot
      plotPaths: [
        "/assets/plots/gta_release_ITS.png", // Static image for the second plot
        "/assets/plots/gta_release_Placebo.png"  // Static image for the third plot
      ]
    }
  ];

 events.forEach((event, index) => {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'event-card';
  cardDiv.innerHTML = `
    <img src="${event.image}" alt="${event.name}">
    <div class="event-date">${event.date}</div>
  `;

  cardDiv.addEventListener('click', async () => {
    if (eventDetails.style.display === 'block') {
      eventDetails.style.display = 'none';
    } else {
      eventDetails.style.display = 'block';
      eventDetails.innerHTML = `
        <h2>${event.name} <span style="font-size: 16px; color: #aaa;">(${event.date})</span></h2>
        <p>${event.description}</p>
        <div class="plotly-container">
          <div id="plotly-plot"></div>
          <div class="plotly-description-container">
            <p class="plotly-description">${event.plotlyDescription}</p>
          </div>
        </div>
        <div class="event-plots">
          ${event.plotPaths.map((path, index) => `
            <div class="plot-with-description">
              <img src="${path}" alt="Plot ${index + 1}" class="plot-image">
              <p class="plot-description">${event.plotDescriptions[index]}</p>
            </div>
          `).join('')}
        </div>
      `;

      try {
        const response = await fetch(event.plotJson);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const plotData = await response.json();
        Plotly.newPlot('plotly-plot', plotData.plotly_data.data, plotData.plotly_data.layout);
      } catch (error) {
        console.error('Error loading the Plotly JSON:', error);
        document.getElementById('plotly-plot').innerHTML = '<p>Error loading plot data. Please try again later.</p>';
      }
    }
  });

  sliderContainer.appendChild(cardDiv);
});
