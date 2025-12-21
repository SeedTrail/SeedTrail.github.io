document.addEventListener('DOMContentLoaded', function() {
  // Check if Leaflet is loaded
  if (typeof L === 'undefined') {
    console.error('Leaflet.js is not loaded.');
    document.getElementById('map').innerHTML = '<p style="text-align: center; padding: 20px; background: #111; color: #fff; border-radius: 8px;">Map unavailable. Please try again later.</p>';
    return;
  }

  // Define your events with coordinates, plots, and descriptions
  const events = [
    {
      name: "US Election 2016",
      date: "2016-11-08",
      coords: [37.0902, -95.7129], // Center of the US
      description: "Taken together, the traces suggest that the 2016 U.S. election functions as a high-energy but short-lived disturbance in YouTube’s ecosystem. The platform reacts instantly and massively, yet without long-term reconfiguration. Attention spreads laterally across many creators rather than consolidating around institutional voices. Political content does not overwrite the category, it infiltrates it.What emerges is not a permanent shift, but a momentary alignment: a collective mobilization that peaks, collapses, and dissolves back into routine production. The election leaves a spike, not a scar. Signal detected. Shock absorbed. Normality restored.",
      plotPaths: [
        "/assets/plots/us_election_2016_KeywordCreator.png",
        "/assets/plots/us_election_2016_ZScore.png"
      ],
      plotTexts: [
        "I observe a platform that resists singular authority. The creator concentration curve reveals a moderately centralized structure: no sovereign voice, no absolute monopolist. The most visible creator captures roughly 11% of election-related views, while the top five accumulate about a third of the total attention. Even extending to the top 25 channels only brings us to two-thirds of overall visibility. This suggests a dispersed attention economy, where political meaning is co-produced by a crowd rather than dictated by a single broadcaster. Influence is present, but fragmented. Keyword penetration, however, tells a different story. Only around 14% of videos explicitly carry election-related tags. The signal is strong, but its inscription is discreet. The election does not shout its name across the platform; it seeps in. Content creators absorb the event without always naming it, embedding political tension into commentary, humor, reactions, or adjacent narratives. The event circulates less as a declared topic than as a contextual atmosphere.",
        "Then comes the rupture. The Z-score spikes violently at the exact moment of the election, exceeding +6, far beyond the bounds of ordinary fluctuation. This is not noise. This is not seasonal drift. This is a systemic shock. For one brief moment, the platform synchronizes. Before and after, activity returns to its habitual oscillation, as if nothing had happened. The election appears not as a slow-burning transformation, but as a sharp pulse: intense, collective, and fleeting."
      ]
    },
    {
      name: "Brexit",
      date: "2016-06-23",
      coords: [51.5074, -0.1278], // London
      description: "Taken together, the signals portray Brexit as a slow-burn political event rather than an explosive platform shock. The anomaly is real but moderate; diffusion is partial; authority remains fragmented. YouTube does not convulse, it debates. This is a referendum that unfolds over time, not a moment that overwhelms the system. The platform behaves less like a reactive sensor and more like a deliberative space, continuously processing uncertainty, disagreement, and repetition. Signal sustained. Noise persistent. Meaning negotiated.",
      plotPaths: [
        "/assets/plots/brexit_KeywordCreator.png",
        "/assets/plots/brexit_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration is moderate, confirming that Brexit occupies a visible but not dominant place within political content. Attention is similarly distributed across a broad range of creators, with large political and news channels playing a role without fully monopolizing visibility. Together, these patterns reflect a sustained and plural debate: the event is present across the platform, but neither semantically overwhelming nor hierarchically centralized.",
        "The anomaly is present, but it does not scream. The Z-score rises above +3 around the referendum date, marking a statistically significant deviation from routine activity, yet stopping well short of the violent spikes produced by events like the 2016 U.S. election. This is not a rupture; it is an amplification. What strikes me more is the surrounding noise. Before and after the vote, the signal never fully settles. The platform was already vibrating with Brexit-related discourse long before the ballots were cast, and it continues to do so afterward. The referendum acts less as a trigger than as a focal point, momentarily intensifying an argument that was already unfolding across the network."
      ]
    },
    {
      name: "Paris Attacks",
      date: "2015-11-13",
      coords: [48.8566, 2.3522], // Paris
      description: "Taken together, the traces identify the Paris attacks as a major exogenous shock to YouTube’s ecosystem. The activity anomaly is sharp and statistically exceptional. Diffusion is broad and explicit. Attention structures are hybrid: institutional voices lead, but do not fully dominate. This is an event where the platform functions not only as a relay of traditional media, but as a space of distributed social reaction. Intensity is high. Response is collective. Meaning is negotiated across scales. Signal received. Shock processed. Echo sustained.",
      plotPaths: [
        "/assets/plots/paris_attacks_KeywordCreator.png",
        "/assets/plots/paris_attacks_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration is relatively high, indicating strong and explicit thematic saturation following the attacks. At the same time, creator concentration remains significant but not absolute: major news and political channels lead the conversation, yet a substantial share of views is captured by a wider base of creators. This combination points to a collective reaction that is structured but not monopolized, blending institutional authority with distributed social response.",
        "The signal breaks violently from its baseline. The Z-score spikes far beyond +5 at the moment of the attacks, marking an extreme deviation from ordinary publishing rhythms. This is not background noise. This is not cyclical variation. It is a clean, exogenous shock imposed on the system. The reaction is immediate. YouTube synchronizes almost instantaneously, registering the event as a major informational rupture. After the initial peak, activity declines gradually, but instability persists for weeks. The platform does not simply absorb the shock and move on; it continues to process it through delayed reactions, analyses, and secondary interpretations. The event echoes."
      ]
    },
    {
      name: "Hong Kong Protests",
      date: "2019-08-12",
      coords: [22.3193, 114.1694], // Hong Kong
      description: "Taken together, the traces depict the Hong Kong protests as a persistent but fragmented presence within YouTube’s ecosystem. Activity rises meaningfully, yet unfolds over time. Diffusion is broad but shallow. Authority remains distributed, while explicit framing stays limited.This is not a shock event. It is a movement in motion. The platform reflects its duration, its uncertainty, and its unresolved nature. Signal sustained. Meaning dispersed. Resolution deferred.",
      plotPaths: [
        "/assets/plots/hong_kong_protests_peak_KeywordCreator.png",
        "/assets/plots/hong_kong_protests_peak_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration is low, showing limited thematic saturation beyond dedicated content clusters. Attention is also weakly concentrated, with visibility distributed across many mid-sized creators rather than dominated by a few large channels. Together, these patterns suggest a diffuse and fragmented diffusion process, consistent with a prolonged political movement rather than a sharply bounded media event.",
        "The signal does not strike; it accumulates. The Z-score rises above the background level around the peak of the protests, confirming a statistically meaningful deviation from routine activity. Yet the anomaly remains moderate and uneven. There is no singular spike, no clean rupture. Instead, volatility stretches across time. Activity oscillates both before and after the focal moment, suggesting a gradual build-up and slow dissipation of attention. The platform appears to track the protests as a process rather than as an event. The sharp downturn at the end of the series reads less like a collapse than like a boundary artifact, a reminder that the data window closes even when the movement does not."
      ]
    },
    {
      name: "#MeToo",
      date: "2017-10-01",
      coords: [40.7128, -74.0060], // New York
      description: "Taken together, the traces portray #MeToo as a slow, persistent reconfiguration of discourse rather than a platform-wide shock. Activity rises gradually and endures. Diffusion through explicit keywords is minimal. Attention concentrates selectively.The movement reshapes narratives without demanding a singular moment of recognition. It does not interrupt the platform, it permeates it. Signal delayed. Meaning layered. Transformation ongoing.",
      plotPaths: [
        "/assets/plots/metoo_KeywordCreator.png",
        "/assets/plots/metoo_ZScore.png"
      ],
      plotTexts: [
        "Explicit references are rare, with very low keyword penetration despite sustained engagement. Attention, however, concentrates around a limited set of influential creators, indicating that visibility is partially centralized. This combination reflects a movement that reshapes discourse gradually and indirectly, carried by prominent voices rather than by widespread, explicitly labeled participation.",
        "There is no moment of impact. The Z-score refuses to peak at a single date, hovering instead around the baseline while higher values emerge later, downstream from the initial trigger. The platform does not react instantly. It absorbs, hesitates, and then gradually amplifies.This delayed elevation suggests that #MeToo operates less as an event than as a process. Visibility grows through accumulation: testimonies, responses, counter-responses, and reinterpretations layering over time. The absence of a sharp spike signals sustained engagement rather than immediate disruption. The movement unfolds, rather than strikes."
      ]
    },
    {
      name: "Black Lives Matter",
      date: "2013-07-13",
      coords: [34.0522, -118.2437], // Los Angeles
      description: "Taken together, the signals portray Black Lives Matter as an intense but tightly channeled event within YouTube’s ecosystem. The activity spike is real, but brief. Diffusion is selective. Authority concentrates quickly. The movement leaves a clear digital imprint, but one that is centralized and temporally compressed rather than expansive and persistent. The platform reacts decisively, yet does not structurally reorganize around the event. Signal detected. Amplified. Contained.",
      plotPaths: [
        "/assets/plots/black_lives_matter_KeywordCreator.png",
        "/assets/plots/black_lives_matter_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration remains low, suggesting that the movement is often discussed implicitly or through adjacent themes rather than explicitly named. In contrast, attention is strongly concentrated, with a small number of dominant creators capturing a large share of views. This imbalance indicates a diffusion pattern driven more by mediated amplification than by broad, grassroots participation across the platform.",
        "The signal rises, unmistakably, above the daily background noise. The Z-score registers a clear spike around the event date, well beyond ordinary fluctuations, confirming a genuine surge in activity. Yet the peak remains contained. Compared to major geopolitical shocks, this is not a systemic convulsion but a reactive pulse. What is more telling is its brevity. The spike collapses quickly, and activity settles back into its prior range almost immediately. The platform reacts, acknowledges, then moves on. The trace is sharp, but short. Mobilization occurs, but it does not sustain itself in production rhythms."
      ]
    },
    {
      name: "US Election 2012",
      date: "2012-11-06",
      coords: [38.9072, -77.0369], // Washington, D.C.
      description: "Taken together, the traces portray the 2012 U.S. election as a strong but temporally contained platform shock. The anomaly is sharp and unmistakable. Diffusion is broad and explicitly labeled. Attention is structured, yet not monopolized. Compared to protest-driven or culturally persistent events, this election behaves like a scheduled interruption, absorbed, processed, and released. Signal activated. Outcome registered. Platform returns to equilibrium.",
      plotPaths: [
        "/assets/plots/us_election_2012_KeywordCreator.png",
        "/assets/plots/us_election_2012_ZScore.png"
      ],
      plotTexts: [
        "Explicit framing is widespread, with relatively high keyword penetration signaling that the election is clearly named and recognized by creators. Attention, however, does not fully concentrate: while major channels capture a substantial share of views, no single actor monopolizes visibility. The event diffuses through a hybrid structure, combining institutional leadership with sustained participation from mid-sized and smaller creators.",
        "The signal peaks cleanly, then disappears. The Z-score surges sharply at the exact moment of the election, rising well above ordinary daily variation. The spike is narrow and isolated. Before and after, activity returns quickly to baseline, with no lingering elevation. This is a punctual mobilization. The platform reacts decisively, then disengages. Unlike slow-moving political processes or sustained social movements, the election registers as a clearly bounded temporal event, intense, synchronized, and brief."
      ]
    },
    {
      name: "Pokémon GO",
      date: "2016-07-06",
      coords: [35.6762, 139.6503], // Tokyo
      description: "Taken together, the traces identify Pokémon Go as a highly diffusive and collectively sustained entertainment event. Activity rises above baseline and remains elevated. Diffusion is explicit and category-wide. Attention is decentralized. Unlike breaking news or crisis-driven spikes, Pokémon Go produces a prolonged, participatory response, less a shock than a shared experience. Signal propagated. Community mobilized. Engagement sustained.",
      plotPaths: [
        "/assets/plots/pokemon_go_KeywordCreator.png",
        "/assets/plots/pokemon_go_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration is very high, confirming deep diffusion and strong thematic control across the category. Attention, however, remains broadly distributed, with low creator concentration and a smooth cumulative curve. This pairing reflects a collective creative phenomenon, where participation outweighs authority and visibility is shared rather than centralized.",
        "The signal lifts steadily above its baseline. The Z-score shows a clear but moderate positive deviation around the launch, confirming an increase in activity beyond routine fluctuations. This is not an extreme outlier. Compared to political crises or sudden shocks, the anomaly remains contained. What follows is more revealing than the peak itself. Elevated oscillations persist after the initial moment, suggesting continued engagement rather than a rapid return to equilibrium. The platform does not spike and forget, it lingers. The event unfolds over time."
      ]
    },
    {
      name: "E3 2016",
      date: "2016-06-14",
      coords: [33.7701, -118.1937], // Long Beach, CA (different from Los Angeles)
      description: "Taken together, the traces position E3 as an organized, non-polemical exogenous shock. Activity explodes, but briefly. Diffusion is systemic and explicit. Attention remains decentralized. E3 exemplifies a predictable, federating event, one that temporarily redistributes attention without producing lasting dependence or structural dominance. It stands in contrast to political crises, which concentrate authority, and social movements, which diffuse unevenly. Signal anticipated. Mobilization synchronized. Equilibrium restored.",
      plotPaths: [
        "/assets/plots/e3_KeywordCreator.png",
        "/assets/plots/e3_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration is exceptionally high, indicating that the event temporarily restructures the entire category around a shared thematic frame. At the same time, creator concentration remains low, with attention widely distributed across creators of all sizes. This pairing signals a highly participatory and horizontal mobilization, where collective alignment replaces hierarchical amplification.",
        "The signal erupts, then vanishes. The Z-score spikes sharply around the dates of E3, reaching values close to +5 and clearly breaking away from normal activity levels. This is a clean discontinuity in publishing behavior. Yet the anomaly is fleeting. The peak concentrates over just a few days before activity rapidly collapses back toward its baseline. There is no long tail, no residual instability. The platform mobilizes intensely, then disengages. This is the signature of a calendrical event: anticipated, synchronized, and short-lived."
      ]
    },
    {
      name: "FIFA 17 Launch",
      date: "2016-09-27",
      coords: [51.4545, -0.9781], // Reading, UK (different from London)
      description: "Taken together, the traces identify FIFA 17 as a high-penetration, low-concentration event. Activity rises above baseline without shock. Diffusion is total and explicit. Attention remains radically decentralized. The launch exemplifies a platform-native dynamic: predictable, participatory, and horizontal. Not a disruption, but a coordinated wave. Signal scheduled. Category captured. Attention dispersed.",
      plotPaths: [
        "/assets/plots/fifa_17_launch_KeywordCreator.png",
        "/assets/plots/fifa_17_launch_ZScore.png"
      ],
      plotTexts: [
        "The event shows extremely high keyword penetration, demonstrating near-total thematic dominance within the category. Creator concentration, however, is very low: attention fragments across a large number of creators, with no dominant channel emerging. This configuration reflects a mass-release dynamic, where shared anticipation produces widespread but decentralized engagement.",
        "The signal rises smoothly. The Z-score shows a clear but moderate positive anomaly around the release date, peaking between +1 and +2. Activity exceeds routine fluctuations, yet never fractures the system. There is no rupture, no abrupt synchronization.This is a prepared mobilization. Creators anticipate the launch, align their production schedules, and release content in a coordinated but staggered manner. The platform does not react, it executes. The anomaly reflects planning rather than surprise."
      ]
    },
    {
      name: "Star Wars Battlefront II",
      date: "2017-11-01",
      coords: [37.3382, -121.8863], // San Jose, CA
      description: "Taken together, the traces portray Star Wars Battlefront II as a widely diffused but non-disruptive platform event. Topical penetration is high. Participation is broad. Aggregate activity remains steady. This is the signature of an anticipated entertainment release: discussed everywhere, disruptive nowhere. Signal acknowledged. Topic circulated. Platform unchanged.",
      plotPaths: [
        "/assets/plots/star_wars_battlefront_ii_KeywordCreator.png",
        "/assets/plots/star_wars_battlefront_ii_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration is high, indicating widespread thematic adoption. Creator concentration is very low, with attention fragmented across many channels and no dominant actors. The event diffuses broadly without centralization, producing semantic saturation without a corresponding spike in hierarchical visibility.",
        "The signal barely breaks form. The Z-score shows no strong or persistent spike at the time of release, remaining largely within the bounds of ordinary daily variability. Any short-lived increase is modest and quickly reabsorbed by routine platform rhythms.There is no rupture here. The launch does not impose itself as a system-wide disturbance. The platform accommodates it without needing to recalibrate."
      ]
    },
    {
      name: "Zelda: Breath of the Wild",
      date: "2017-03-03",
      coords: [35.6895, 139.6917], // Tokyo (slightly different from Pokémon GO)
      description: "Taken together, the traces position Zelda: Breath of the Wild as a textbook release event. The activity shock is sharp and well-timed. Diffusion is broad but bounded. Attention combines hierarchy and distribution. This is an event that activates the platform decisively, then releases it just as cleanly. Signal triggered. Community mobilized. Equilibrium restored.",
      plotPaths: [
        "/assets/plots/zelda_breath_of_the_wild_KeywordCreator.png",
        "/assets/plots/zelda_breath_of_the_wild_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration is moderate, reflecting clear visibility without full thematic takeover. Creator concentration is similarly moderate, with leading channels driving early attention while a substantial long tail remains active. This balance points to a platform-wide but creator-driven event, combining leadership with broad participation.",
        "The signal peaks precisely on cue. The Z-score displays a sharp and isolated spike exactly at the release date, rising well beyond normal fluctuations. There is little anticipatory noise beforehand, and the surge is followed by a gradual decay. This is a clean temporal signature. Unlike social or political events that bleed across time, the release behaves like a well-defined activation point: scheduled, synchronized, and immediately legible in the data."
      ]
    },
    {
      name: "Worlds LoL 2016",
      date: "2016-10-29",
      coords: [37.7749, -122.4194], // San Francisco
      description: "Taken together, the traces identify League of Legends Worlds as a structurally integrated platform event. Activity does not explode, it endures. Diffusion is implicit rather than explicit. Attention remains decentralized. Worlds functions less as an external shock than as a recurring rhythm embedded in the platform’s creative metabolism. Not a disruption, but a seasonal pulse. Signal sustained. Community engaged. Cycle repeated.",
      plotPaths: [
        "/assets/plots/worlds_lol_KeywordCreator.png",
        "/assets/plots/worlds_lol_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration remains relatively low, suggesting that the event is often embedded implicitly within ongoing gaming narratives rather than explicitly tagged. Creator concentration is also low to moderate, with attention distributed across a wide ecosystem of streamers and analysts. Together, these patterns indicate a structurally integrated event that mobilizes creators collectively without overt semantic or hierarchical dominance.",
        "The signal stretches rather than spikes. The Z-score indicates a moderate but sustained elevation in activity, unfolding over an extended period instead of concentrating into a single peak. Attention builds, fluctuates, and persists, tracking the rhythm of the tournament itself leading to the finals at the end of it. This temporal profile contrasts sharply with political or breaking-news events. There is no moment of rupture. Instead, the platform remains in a state of prolonged activation, responding to successive matches, narratives, and turning points."
      ]
    },
    {
      name: "GTA V Release",
      date: "2013-09-17",
      coords: [34.0522, -118.25], // Slightly different from other LA coordinates
      description: "Taken together, the traces position the GTA release as a structurally exceptional but widely shared platform event. Activity surges sharply and persists. Diffusion is explicit and category-wide. Attention combines leadership with participation. This is a collective cultural moment: anticipated, coordinated, and broadly enacted. Not a niche disruption, not a hierarchical capture, but a synchronized wave carried by many voices at once. Signal launched. Category aligned. Participation sustained.",
      plotPaths: [
        "/assets/plots/gta_release_KeywordCreator.png",
        "/assets/plots/gta_release_ZScore.png"
      ],
      plotTexts: [
        "Keyword penetration is high, indicating strong thematic takeover of the category. Creator concentration is moderate: major gaming channels play a visible role, but a broad base of mid-sized and smaller creators also contributes substantially. The event combines coordinated anticipation with distributed participation, producing neither niche diffusion nor hierarchical capture.",
        "The signal spikes decisively. The Z-score registers a clear and statistically significant anomaly at the moment of release, rising well beyond ordinary day-to-day variation. This is not background noise. The surge is abrupt and remains elevated for several days. Unlike fleeting news shocks, the anomaly persists. The platform does not simply react and retreat, it sustains production. This temporal profile matches a highly anticipated commercial release: preparation, synchronized launch, and extended engagement."
      ]
    }
  ];

  // Initialize the map with dark tiles
  const map = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19
  }).addTo(map);

  // Add markers to the map with slight offsets for overlapping coordinates
  const markers = [];
  events.forEach((event, index) => {
    const marker = L.marker(event.coords, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: #0CF2DB; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff;"></div>`,
        iconSize: [20, 20]
      }),
      title: event.name
    }).addTo(map);

    marker.on('click', () => {
      // Set pop-up content
      document.getElementById('popup-event-name').textContent = event.name;
      document.getElementById('popup-event-date').textContent = event.date;
      document.getElementById('popup-event-description').textContent = event.description;
      document.getElementById('popup-plot1').src = event.plotPaths[0];
      document.getElementById('popup-plot2').src = event.plotPaths[1];
      document.getElementById('popup-plot1-text').textContent = event.plotTexts[0];
      document.getElementById('popup-plot2-text').textContent = event.plotTexts[1];

      // Show pop-up
      const popup = document.getElementById('event-popup');
      popup.style.display = 'block';
      popup.scrollTop = 0;
    });

    // Add a tooltip to the marker
    marker.bindTooltip(event.name, {
      permanent: false,
      direction: 'top'
    });

    markers.push(marker);
  });

  // Fit the map to show all markers
  const group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.5));

  // Close pop-up when clicking outside
  document.getElementById('event-popup').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
});
