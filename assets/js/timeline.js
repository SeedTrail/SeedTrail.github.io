
document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.querySelector('.slider-container');
  const eventDetails = document.getElementById('eventDetails');

  // Define your event with an image
  const event = {
    name: "US Election 2016",
    date: "2016-11-08",
    image: "/assets/img/icon1.avif", // Add an icon image for the card
    description: "The 2016 US Presidential Election was a historic event with significant global impact.",
    plotPaths: [
      "/assets/img/plot1.png",
      "/assets/img/plot2.png",
      "/assets/img/plot3.png"
    ]
  };

  // Create a card for the event
  const cardDiv = document.createElement('div');
  cardDiv.className = 'event-card';
  cardDiv.innerHTML = `
    <img src="${event.image}" alt="${event.name}">
    <div class="event-date">${event.date}</div>
  `;

  // Toggle event details on click
  cardDiv.addEventListener('click', () => {
    if (eventDetails.style.display === 'block') {
      eventDetails.style.display = 'none';
    } else {
      eventDetails.style.display = 'block';
      eventDetails.innerHTML = `
        <h2>${event.name} <span style="font-size: 16px; color: #666;">(${event.date})</span></h2>
        <p>${event.description}</p>
        <div class="event-plots">
          ${event.plotPaths.map(path => `<img src="${event.plotPaths[0]}" alt="Plot">`).join('')}
        </div>
      `;
    }
  });

  sliderContainer.appendChild(cardDiv);
});
