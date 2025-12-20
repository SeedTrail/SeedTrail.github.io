// Load your JSON data
fetch('consensus_events.json')
  .then(response => response.json())
  .then(data => {
    // Extract dates and percentages for the plot
    const dates = data.map(event => event.date);
    const percentages = data.map(event => event.percentage);

    // Create the plot
    const trace = {
      x: dates,
      y: percentages,
      mode: 'lines+markers',
      type: 'scatter',
      name: 'Consensus %',
      marker: {
        color: 'red',
        size: 8
      },
      line: {
        color: '#444444',
        width: 1
      }
    };

    const layout = {
      title: 'Timeline of Synchronized Narratives (Multi-Channel Consensus)',
      xaxis: { title: 'Date' },
      yaxis: { title: '% of Channels Discussing Same Topic' },
      hovermode: 'closest'
    };

    Plotly.newPlot('plot', [trace], layout);

    // Add click event to the plot
    document.getElementById('plot').on('plotly_click', function(data) {
      const point = data.points[0];
      const clickedDate = point.x;
      const event = data.find(event => event.date === clickedDate);

      // Display keywords
      const keywordList = document.getElementById('keyword-list');
      keywordList.innerHTML = `
        <h2>Keywords for ${clickedDate}</h2>
        <ul>
          ${event.keywords.map(keyword => `<li>${keyword}</li>`).join('')}
        </ul>
      `;

      // Display analysis (you can customize this)
      const analysisDiv = document.getElementById('analysis');
      analysisDiv.innerHTML = `
        <h2>Analysis for ${clickedDate}</h2>
        <p>On ${clickedDate}, the keywords "${event.keywords.join(', ')}" were discussed by ${event.channels} channels.
        This likely corresponds to [insert event description here].</p>
      `;
    });
  });
