// Load your JSON data
fetch('assets/js/events_data.json')
  .then(response => response.json())
  .then(data => {
    // Extract dates and percentages for the plot
    const dates = data.map(event => event.date);
    const percentages = data.map(event => event.percentage);

    // Create the plot with a black line and blue dots
    const trace = {
      x: dates,
      y: percentages,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Consensus %',
      marker: {
        color: 'blue',  // Blue dots
        size: 8
      },
      line: {
        color: 'white',  // White line for visibility on black background
        width: 1
      }
    };

    const layout = {
      title: {
        text: 'Timeline of Synchronized Narratives (Multi-Channel Consensus)',
        font: {
          color: 'white'  // White title text for visibility
        }
      },
      xaxis: {
        title: 'Date',
        titlefont: {
          color: 'white'  // White x-axis title
        },
        tickfont: {
          color: 'white'  // White x-axis tick labels
        },
        gridcolor: 'rgba(255, 255, 255, 0.2)',  // Light grid lines for visibility
        zerolinecolor: 'rgba(255, 255, 255, 0.2)'  // Light zero line
      },
      yaxis: {
        title: '% of Channels Discussing Same Topic',
        titlefont: {
          color: 'white'  // White y-axis title
        },
        tickfont: {
          color: 'white'  // White y-axis tick labels
        },
        gridcolor: 'rgba(255, 255, 255, 0.2)',  // Light grid lines for visibility
        zerolinecolor: 'rgba(255, 255, 255, 0.2)'  // Light zero line
      },
      hovermode: 'closest',
      plot_bgcolor: 'black',  // Black plot background
      paper_bgcolor: 'black',  // Black paper background
      font: {
        color: 'white'  // Default font color for all text
      }
    };

    // Draw the plot
    Plotly.newPlot('plot', [trace], layout);

    // Add click event to the plot
    document.getElementById('plot').on('plotly_click', function(plotData) {
      const point = plotData.points[0];
      const clickedDate = point.x;

      // Find the event corresponding to the clicked date
      const event = data.find(event => event.date === clickedDate);

      // Display keywords
      const keywordList = document.getElementById('keyword-list');
      keywordList.innerHTML = `
        <h2>Keywords for ${clickedDate}</h2>
        <ul>
          ${event.keywords.map(keyword => `<li>${keyword}</li>`).join('')}
        </ul>
      `;

      // Display analysis
      const analysisDiv = document.getElementById('analysis');
      analysisDiv.innerHTML = `
        <h2>Analysis for ${clickedDate}</h2>
        <p>On ${clickedDate}, the keywords "${event.keywords.join(', ')}" were discussed by ${event.channels} channels.
        This likely corresponds to [insert event description here].</p>
      `;
    });
  })
  .catch(error => console.error('Error loading the JSON data:', error));
