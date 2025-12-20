// Load your JSON data
Promise.all([
  fetch('assets/js/part4.json').then(response => response.json())
]).then(([data]) => {
  // Create plots for Politics and Gaming
  ['politics', 'gaming'].forEach(sector => {
    const sectorData = data[sector];

    // Extract dates and percentages for the plot
    const dates = sectorData.map(event => event.date);
    const percentages = sectorData.map(event => event.percentage);

    // Create the plot with a black line and colored dots
    const trace = {
      x: dates,
      y: percentages,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Consensus %',
      marker: {
        color: percentages, // Color based on percentage
        colorscale: sector === 'politics' ? 'Reds' : 'Greens', // Different colors for each sector
        size: 8,
        showscale: true,
        colorbar: {
          title: '% Consensus'
        }
      },
      line: {
        color: 'white',
        width: 1
      }
    };

    const layout = {
      title: {
        text: `${sector.charAt(0).toUpperCase() + sector.slice(1)} Event Detection`,
        font: {
          color: 'white'
        }
      },
      xaxis: {
        title: 'Date',
        titlefont: {
          color: 'white'
        },
        tickfont: {
          color: 'white'
        },
        gridcolor: 'rgba(255, 255, 255, 0.2)',
        zerolinecolor: 'rgba(255, 255, 255, 0.2)'
      },
      yaxis: {
        title: '% of Channels Discussing Same Topic',
        titlefont: {
          color: 'white'
        },
        tickfont: {
          color: 'white'
        },
        gridcolor: 'rgba(255, 255, 255, 0.2)',
        zerolinecolor: 'rgba(255, 255, 255, 0.2)'
      },
      hovermode: 'closest',
      plot_bgcolor: 'black',
      paper_bgcolor: 'black',
      font: {
        color: 'white'
      }
    };

    // Draw the plot
    Plotly.newPlot(`${sector}-plot`, [trace], layout);

    // Add click event to the plot
    document.getElementById(`${sector}-plot`).on('plotly_click', function(plotData) {
      const point = plotData.points[0];
      const pointIndex = point.pointIndex;
      const clickedEvent = sectorData[pointIndex];

      // Display keywords
      const keywordList = document.getElementById(`${sector}-keywords`);
      keywordList.innerHTML = `
        <h3>Top Keywords for ${clickedEvent.date}</h3>
        <ul>
          ${clickedEvent.keywords.map(keyword => `<li>${keyword}</li>`).join('')}
        </ul>
      `;

      // Display analysis
      const analysisDiv = document.getElementById(`${sector}-analysis`);
      analysisDiv.innerHTML = `
        <h3>Analysis for ${clickedEvent.date}</h3>
        <p>On ${clickedEvent.date}, the topics "${clickedEvent.keywords.join(', ')}" were discussed by ${clickedEvent.channels} channels (${clickedEvent.percentage}% consensus).</p>
        <p>This indicates a synchronized narrative, likely corresponding to a real-world event.</p>
      `;
    });
  });
}).catch(error => console.error('Error loading the JSON data:', error));

