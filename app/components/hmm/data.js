// Copyright 2015 Alec Thilenius
// All rights reserved.

var pyHmmDataText = "start_probability = {'Healthy': 0.6, 'Fever': 0.4}\n\
transition_probability = {\n\
    'Healthy': {'Healthy': 0.7, 'Fever': 0.3},\n\
    'Fever': {'Healthy': 0.4, 'Fever': 0.6}\n\
}\n\
emission_probability = {\n\
    'Healthy': {'normal': 0.5, 'cold': 0.4, 'dizzy': 0.1},\n\
    'Fever': {'normal': 0.1, 'cold': 0.3, 'dizzy': 0.6}\n\
}";

var pyObservationsText = "observations = ('normal', 'cold', 'dizzy')";

var pyViterbiText = "# Let's start by finding all unique states, using the keys from\n\
# start_probability.\n\
states = [state for state in start_probability]\n\
# This is where we will store the graph you see below. It is a list,\n\
# where each index i represents a single time-step\n\
graph = [{}]\n\
# We start by entering info for time-step = 0, it's a little different than\n\
# the rest as we use start probabilities\n\
for i in states:\n\
    graph[0][i] = start_probability[i]*emission_probability[i][observations[0]]\n\
# Now we do the same thing we did above, but for time-step > 1, and we use\n\
# the probabilities from time-step - 1 instead of start probabilities.\n\
for t in range(1, len(observations)):\n\
    graph.append({})\n\
    for y in states:\n\
        prob = max(graph[t - 1][y0]*transition_probability[y0][y]*emission_probability[y][\n\
            observations[t]] for y0 in\n\
                   states)\n\
        graph[t][y] = prob\n\
# Finally we trace forward through the graph, finding the highest\n\
# probabilities in each time-step and saving it in this array.\n\
opt = []\n\
for j in graph:\n\
  for x, y in j.items():\n\
    if j[x] == max(j.values()):\n\
      opt.append(x)";
