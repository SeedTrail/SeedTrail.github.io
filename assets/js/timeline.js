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

  // Track the currently open event
  let isOpen = false;

  // Toggle event details on click
  iconDiv.addEventListener('click', () => toggleEventDetails(event));

  sliderContainer.appendChild(iconDiv);

  // Toggle function to show/hide event details
  function toggleEventDetails(event) {
    if (isOpen) {
      // If details are open, close them
      eventDetails.style.display = 'none';
      isOpen = false;
    } else {
      // If details are closed, open them
      eventDetails.style.display = 'block';
      eventDetails.innerHTML = `
        <h2>${event.name} (${event.date})</h2>
        <p>${event.description}</p>
        <div class="event-plots">
          ${event.plotPaths.map(path => `<img src="${path}" alt="Plot">`).join('')}
        </div>
      `;
      isOpen = true;
    }
  }
});
