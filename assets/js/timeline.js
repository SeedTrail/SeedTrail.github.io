
document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.querySelector('.slider-container');
  const eventDetails = document.getElementById('eventDetails');

  // Define your 14 events
  const events = [
    {
      name: "US Election 2016",
      date: "2016-11-08",
      image: "/assets/img/icon1.avif",
      description: "The 2016 US Presidential Election was a historic event with significant global impact.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "Brexit",
      date: "2016-06-23",
      image: "/assets/img/brexit.jpg",
      description: "The UK's referendum to leave the European Union, known as Brexit, had widespread political and economic consequences.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "Paris Attacks",
      date: "2015-11-13",
      image: "/assets/img/paris.jpg",
      description: "The November 2015 Paris attacks were a series of coordinated terrorist attacks that occurred in Paris, France.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "Hong Kong Protests",
      date: "2019-08-12",
      image: "/assets/img/hong-kong.webp",
      description: "The 2019 Hong Kong protests were triggered by the introduction of an extradition bill and grew into a broader pro-democracy movement.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "US Election 2012",
      date: "2012-11-06",
      image: "/assets/img/2012.jpg",
      description: "The 2012 US Presidential Election saw Barack Obama win a second term as President of the United States.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "#MeToo",
      date: "2017-10-01",
      image: "/assets/img/MeToo.jpg",
      description: "The #MeToo movement went viral in 2017 as a hashtag used on social media to help demonstrate the widespread prevalence of sexual assault and harassment.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "Black Lives Matter",
      date: "2013-07-13",
      image: "/assets/img/blm.png",
      description: "Black Lives Matter is a decentralized movement advocating for non-violent civil disobedience in protest against incidents of police brutality against African-American people.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "Pokémon GO",
      date: "2016-07-06",
      image: "/assets/img/pokemon.jpg",
      description: "Pokémon GO is a 2016 augmented reality mobile game that became a global phenomenon, encouraging players to explore the real world to catch virtual Pokémon.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "E3 2016",
      date: "2016-06-14",
      image: "/assets/img/e3.webp",
      description: "E3 2016 was a major event in the video game industry, where many new games and consoles were announced.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "FIFA 17 Launch",
      date: "2016-09-27",
      image: "/assets/img/fifa.webp",
      description: "FIFA 17 is a football simulation video game released in 2016, featuring improved gameplay and the introduction of a story mode called 'The Journey'.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "Star Wars Battlefront II",
      date: "2017-11-01",
      image: "/assets/img/starwars.jpeg",
      description: "Star Wars Battlefront II is a 2017 action shooter game that faced controversy over its microtransaction system but was praised for its gameplay and graphics.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "Zelda: Breath of the Wild",
      date: "2017-03-03",
      image: "/assets/img/zelda.webp",
      description: "The Legend of Zelda: Breath of the Wild is an action-adventure game released in 2017, praised for its open-world design and freedom of exploration.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "Worlds LoL 2016",
      date: "2016-10-29",
      image: "/assets/img/lol.jpg",
      description: "The 2016 League of Legends World Championship was an esports tournament held in the United States, with SK Telecom T1 winning the championship.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    },
    {
      name: "GTA V Release",
      date: "2013-09-17",
      image: "/assets/img/gta.jpg",
      description: "Grand Theft Auto V is an action-adventure game released in 2013, known for its open-world design and three-protagonist story.",
      plotPaths: [
        "/assets/img/plot1.png",
        "/assets/img/plot2.png",
        "/assets/img/plot3.png"
      ]
    }
  ];

  // Create cards for each event
  events.forEach((event, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'event-card';
    cardDiv.innerHTML = `
      <img src="${event.image}" alt="${event.name}">
      <div class="event-date">${event.date}</div>
    `;

    // Toggle event details on click
    cardDiv.addEventListener('click', () => {
      if (eventDetails.style.display === 'block') {
        // If the current event is open, close it
        eventDetails.style.display = 'none';
      } else {
        // Open the clicked event
        eventDetails.style.display = 'block';
        eventDetails.innerHTML = `
          <h2>${event.name} <span style="font-size: 16px; color: #aaa;">(${event.date})</span></h2>
          <p>${event.description}</p>
          <div class="event-plots">
            ${event.plotPaths.map(path => `<img src="${path}" alt="Plot">`).join('')}
          </div>
        `;
      }
    });

    sliderContainer.appendChild(cardDiv);
  });
});
