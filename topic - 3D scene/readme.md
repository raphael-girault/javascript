#Topic - 3D scene

Test to create a trihedron in 3D scene and move it with the mouse.

The control are : 

- Left click + drag mouse to rotate the scene

- Right click + drag mouse to move the scene

- R key to fully reset the position of the 3D scene

- T key to reset the sketch
    
    
    
The first idea is to create a trihedron that shows the position of the center of the 3D scene.
The second thing is to create a link between points and the trihedron to apply the modifications on the 3D scene and set correctly the positions of the points.
    
Note that we use orthogonal projection.
The idea is to use the length of the trihedrons axes display on the screen to determine the displacement of the mouse on the 3D scene.
So, we simply add all cross product between the vector create by the displacement of the mouse, and the differents axes of the trihedron.
    
The aim is to create a kind of 3D motor that display 2D shapes in a 3D scene.
    
    
    
We use : 
    - P5.js as main framework to run the code (https://p5js.org)
    - Modzila matrix library (https://developer.mozilla.org/fr/docs/Web/API/WebGL_API/Matrix_math_for_the_web)
