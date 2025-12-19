document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.querySelector('.slider-container');
  const eventDetails = document.getElementById('eventDetails');

  // Define your event
  const event = {
    name: "US Election 2016",
    date: "2016-11-08",
    icon: "🗳️",
    description: "The 2016 US Presidential Election was a historic event with significant global impact.",
    plotPaths: [
      "/assets/img/plot1.png",
      "/assets/img/plot2.png",
      "/assets/img/plot3.png"
    ]
  };

  // Create icon for the event
  const iconDiv = document.createElement('div');
  iconDiv.className = 'event-icon';
  iconDiv.innerHTML = `
    <div class="icon">${event.icon}</div>
    <div class="event-date">${event.date}</div>
  `;
  iconDiv.addEventListener('click', () => showEventDetails(event));
  sliderContainer.appendChild(iconDiv);

  // Show event details and plots
  function showEventDetails(event) {
    eventDetails.style.display = 'block';
    eventDetails.innerHTML = `
      <h2>${event.name} (${event.date})</h2>
      <p>${event.description}</p>
      <div class="event-plots">
        ${event.plotPaths.map(path => `<img src="${path}" alt="Plot">`).join('')}
      </div>
    `;
  }
});
