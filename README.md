## CS F364 Design And Analysis Of Algorithms

## Convex Hull
The convex hull of a set of points in space is essentially the smallest "shape" that wraps around all those points, with no corners bending inwards.

A shape is convex if, for any two points within the shape, the entire line segment connecting those points also lies entirely inside the shape. Imagine a rubber band stretched taut around the points - a convex shape would be the outline formed by the rubber band.

### Convex Hull Algorithms Implemented
### Jarvis March Algorithm
  The Jarvis march algorithm, also known as the gift wrapping algorithm, finds the convex hull of a set of points in two dimensions.
  <p align="center">
  <img width="450" height="250" alt="DonorPost" margin="auto" src="https://github.com/pavas23/Convex-Hull/assets/97559428/e650b00c-83e2-4c28-ac39-7f593b5e984a">

  </p>

    
### Kirk Patrick Seidel Algorithm
  The algorithm leverages the "marriage-before-conquest" principle. It works in stages:
  - ```Divide```: It starts by finding a vertical line that splits the set of points roughly in half.
  - ```Identify the Bridge```: Next, it locates the edge of the convex hull (the "bridge") that intersects this dividing line.
  - ```Reduce the Problem```: Points lying below this "bridge" are no longer relevant for the convex hull and can be discarded.

  <p align="center">
  <img width="450" height="250" alt="DonorPost" margin="auto" src="https://github.com/pavas23/Convex-Hull/assets/97559428/d13b3a3f-4f32-4f8c-8fa5-1455a4038705">
  </p>
  
  - ```Conquer Recursively```: Finally, the algorithm applies itself recursively to the two remaining sets of points on either side of the dividing line. This process continues until the convex hull for each sub-problem is found.




## How to Run Locally

Go to client directory

```bash
cd client
```

Install required node modules

```bash
npm install
```
Launch the web app on local host

```bash
npm run start
```

## Team Members
- [Pavas Garg](https://www.github.com/pavas23)
- [Dev Gala](https://github.com/devgala)
- [Atharva Dashora](https://github.com/goldengod-1)
- [Tushar Raghani](https://github.com/Tushar-015)

