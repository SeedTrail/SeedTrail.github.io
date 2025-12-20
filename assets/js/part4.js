// Load your JSON data
fetch('assets/js/events_combined.json')
  .then(response => response.json())
  .then(data => {
    // Separate data by category
    const politicsData = data.filter(event => event.category === 'politics');
    const gamingData = data.filter(event => event.category === 'gaming');

    // Function to create a plot for a given category
    const createPlot = (category, categoryData, color) => {
      const dates = categoryData.map(event => event.date);
      const percentages = categoryData.map(event => event.percentage);

      const trace = {
        x: dates,
        y: percentages,
        mode: 'lines+markers',
        type: 'scatter',
        name: 'Consensus %',
        marker: {
          color: percentages,
          colorscale: color === 'politics' ? 'Reds' : 'Greens',
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
          text: `${category.charAt(0).toUpperCase() + category.slice(1)} Event Detection`,
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

      Plotly.newPlot(`${category}-plot`, [trace], layout);

      // Add click event to the plot
      document.getElementById(`${category}-plot`).on('plotly_click', function(plotData) {
        const point = plotData.points[0];
        const pointIndex = point.pointIndex;
        const clickedEvent = categoryData[pointIndex];

        // Display keywords
        const keywordList = document.getElementById(`${category}-keywords`);
        keywordList.innerHTML = `
          <h3>Top Keywords for ${clickedEvent.date}</h3>
          <ul>
            ${clickedEvent.keywords.map(keywordObj => `<li>${keywordObj.term}</li>`).join('')}
          </ul>
        `;

        // Display analysis
        const analysisDiv = document.getElementById(`${category}-analysis`);
        analysisDiv.innerHTML = `
          <h3>Analysis for ${clickedEvent.date}</h3>
          <p>On ${clickedEvent.date}, ${clickedEvent.channels} out of ${clickedEvent.total_channels} channels (${clickedEvent.percentage.toFixed(2)}% consensus) discussed the topics: "${clickedEvent.keywords.map(k => k.term).join(', ')}".</p>
          <p>This indicates a synchronized narrative, likely corresponding to a real-world event.</p>
        `;
      });
    };

    // Create plots for both categories
    createPlot('politics', politicsData, 'Reds');
    createPlot('gaming', gamingData, 'Greens');
  })
  .catch(error => console.error('Error loading the JSON data:', error));
