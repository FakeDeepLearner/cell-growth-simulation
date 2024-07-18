# Overview
This is a simple application that simulates the division and growth of bacteria in a grid over time. Currently, it feautures a grid that is dynamically resizable (not while a simulation is running or has finished),
a tick rate that can be adjusted to speed up or slow down the simulation (can be changed while simulation is running), and buttons to start, resume and reset the simulation. Additionally, you can place or remove cells from the grid by clicking on individual cells


# Setting up and running locally

## Simply clone this repository 
```
git clone https://github.com/FakeDeepLearner/cell-growth-simulation
```

## then, start the application locally by running
```
npm start
```

# Structure and components

## cell.ts
The main building block of the application, it represents a single cell in a board. it contains information about
whether it is filled, and whether it is to be filled in the next render loop

## board.ts
Simply a collection of cells. Contains many functions to interact with said cells such as but not limited to
returning the next board in the render loop, filling cells (used in the render loop), 
and returning a new board with a specific cell updated (allows the feature of filling or emptying specific cells)

## boardCanvas.tsx
The actual component that renders the board in a canvas. For efficiency reasons, and to better control the DOM,
the board isn't rendered by rendering each cell individually. Instead, it is just drawn to the screen via this 
canvas after each render loop

## other-components
This folder contains the components that enable the actual functionality. It contains the buttons to 
start/pause and reset the simulation (buttons.tsx), the input fields to change the dimensions of the board 
(dimensionChangeInputs.tsx) and the slider that allows the tick rate to be adjusted (tickSlider.tsx). 
Of note is the fact that tick rates are in seconds, a tick rate of 10 seconds means that the render loop 
progresses every 10 seconds. Note that changing this value restarts the render loop. For example, if the tick 
rate is 5 seconds, and you change it to 3 seconds after 4 seconds have already passed, the render loop will 
progress in 3 seconds

## simulation.tsx
The main component of the application, actually the application itself. It maintains any state, reference and 
callbacks necessary, and contains the functions that are used by other components to manipulate said state. 
It is designed to not be re-rendered unless absolutely necessary. For example, pausing and resuming the simulation
doesn't cause a re-render, neither does changing the tick rate; simply because it doesn't make sense. 
Due to this, the component, and hence the application, remains as efficient as possible.
