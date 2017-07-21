/*
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
*/




// PARAMS ========================================================
    //globals
        var canvas;
    
    //for setup
        var firstLoop = true;

    //to control inputs
        var mouseJustReleased = false;

    //instances
        var tri;
        var pts = [];




// SETUP ========================================================

function setup() {
    //creation of the canvas and place it in the table on the index page
        canvas = createCanvas(400,200);
        canvas.parent("tdCanvas");

    //creation of the trihedron in the center of the canvas
        tri = new Trihedron(width/2,height/2,0);
    
    
    //creation of 5 points with random position in the 3D scene
        for (var i=0 ; i<5 ; i++) {
            pts.push(new Point(tri.point , random(-width/2,width/2),random(-height/2,height/2),random(-50,50)));
        }
    
    
    //to remove bug at start
        key = "";
}//end setup





// DRAW ========================================================


function draw() {
    if (firstLoop || mouseIsPressed || keyIsPressed || mouseJustReleased) {
        //refresh of the canvas
            background(220,230,250);

        //watch for mouse inputs
            //rotation with left button of mouse + drag
                if (mouseButton == LEFT) {
                    tri.point.angle.y += radians(pmouseX - mouseX);
                    tri.point.angle.x += radians(pmouseY - mouseY);
                }
            //translation with right button of mouse + drag
                if (mouseButton == RIGHT) {
                    tri.point.posA.x -= pmouseX - mouseX;
                    tri.point.posA.y -= pmouseY - mouseY;
                }
            //translation of a point with center button of mouse + drag
                if (mouseButton == CENTER) {
                        if (!mouseJustReleased) {
                            //we look for each points in the list pts
                                pts.forEach(function(p) {
                                    if (p.over(mouseX,mouseY)) {
                                        p.moved = true;
                                        //displacement of the point
                                            //1. calcul of the displacement
                                                var d = tri.calculDisplacement(mouseX-pmouseX , mouseY-pmouseY);
                                            //2. add the displacement to the position of the point
                                                p.posA.x += d.x;
                                                p.posA.y += d.y;
                                                p.posA.z += d.z;
                                    }
                                });
                        } else {
                            //we reset the "moved" parameter for each points in the list pts
                                pts.forEach(function(p) {
                                    p.moved = false;
                                });
                        }
                }
        
        //watch for key inputs
            //reset of the position of the trihedron
                if (key == "r") {
                    tri.point.posA = createVector(width/2,height/2,0);
                    tri.point.angle = createVector(0,0,0);
                }
            //reset + new set of points
                if (key == "t") {
                    //reset
                        tri.point.posA = createVector(width/2,height/2,0);
                        tri.point.angle = createVector(0,0,0);
                    //new set of points
                        pts = [];
                        for (var i=0 ; i<5 ; i++) {
                            pts.push(new Point(tri.point , random(-width/2,width/2),random(-height/2,height/2),random(-50,50)));
                        }
                }
        
        //display the trihedron
            tri.display();
        
        //display the array of random points
            pts.forEach(function(p) {
                p.display();
            });
        
        //reset
            firstLoop = false;
            key = "";
            mouseJustReleased = false; 
    }
}//end draw





    function mouseReleased() {
        mouseJustReleased = true;
    }//end mouseReleased
