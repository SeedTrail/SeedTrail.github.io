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
        },
        autosize: true,
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
          pad: 4
        }
      };

      // Create a container for the plot
      const plotContainer = document.createElement('div');
      plotContainer.className = 'large-plot-container';

      // Append the container to the plot div
      const plotDiv = document.getElementById(`${category}-plot`);
      plotDiv.innerHTML = '';
      plotDiv.appendChild(plotContainer);

      Plotly.newPlot(plotContainer, [trace], layout);

      // Add click event to the plot
      plotContainer.on('plotly_click', function(plotData) {
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
      });

      // Resize the plot when the window is resized
      window.addEventListener('resize', () => {
        Plotly.Plots.resize(plotContainer);
      });
    };

    // Create plots for both categories
    createPlot('politics', politicsData, 'politics');
    createPlot('gaming', gamingData, 'gaming');
  })
  .catch(error => console.error('Error loading the JSON data:', error));
