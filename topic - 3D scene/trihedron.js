/*
    Class to create trihedron and display it.
    It is possible to apply some transformations on the trihedron as rotate and translate it.
*/



class Trihedron {
    
    //constructor
        constructor(x,y,z) {
            this.point = new Point(new Point(null , 0,0,0) , x,y,z);
            
            this.lengthAxe = 20;
            this.D = 5; //diameter of the center point of the trihedron
            
            //position of the end of each axes on 3D scenes
            //they will be recalculate after, in function of the transformation on the triadron
                this.posX = createVector(0,0,0);
                this.posY = createVector(0,0,0);
                this.posZ = createVector(0,0,0);
            
            
        }//end constructor
    
    
    //methods
        /*
            To display the trihedron.
            We must start by make the calculation of the position of the axes in function of the different modification of the angle and/or positions of trihedron in the 3D scene.
        */
        display() {
            //1. we start by re-calculate the position of the axes and the center point
                this.point.calculPos();
                this.calculPos();
            //2. display of the center of the triedront
                noFill();
                strokeWeight(1);
                stroke(0);
                ellipse(this.point.posR.x,this.point.posR.y,this.D,this.D);
            //3. display of the axes
                //X
                    stroke(255,0,0);
                    line(this.point.posR.x,this.point.posR.y , this.posX.x , this.posX.y);
                //Y
                    stroke(0,255,0);
                    line(this.point.posR.x,this.point.posR.y , this.posY.x , this.posY.y);
                //Z
                    stroke(0,0,255);
                    line(this.point.posR.x,this.point.posR.y , this.posZ.x , this.posZ.y);
        }//end display
    
    
    
        /*
            Calcul the position of the axes of the trihedron.
            We use modzila matrix lib to do this.
        */
        calculPos() {
            this.posX = transformation3D(this.point.angle , this.point.posR , createVector(this.lengthAxe,0,0));
            this.posY = transformation3D(this.point.angle , this.point.posR , createVector(0,this.lengthAxe,0));
            this.posZ = transformation3D(this.point.angle , this.point.posR , createVector(0,0,this.lengthAxe));
        }//end calculPos
    
    
    
    
        /*
            Return the 3D displacement of a point in the 3D space, in function of a 2D displacement on the screen.
            x : float - X displacement on screen 
            y : float - Y displacement on screen
            return p5.Vector
        */
        calculDisplacement(x,y) {
            //1. we start by calcul the position of axes
                this.calculPos();
            //2. get the 3D displacement (with scalar product)
                var dX = (x*(this.posX.x-this.point.posR.x) + y*(this.posX.y-this.point.posR.y))/this.lengthAxe;
                var dY = (x*(this.posY.x-this.point.posR.x) + y*(this.posY.y-this.point.posR.y))/this.lengthAxe;
                var dZ = (x*(this.posZ.x-this.point.posR.x) + y*(this.posZ.y-this.point.posR.y))/this.lengthAxe;
            //3. return the displacement
                return createVector(dX,dY,dZ);
        }//end calculDisplacement
    
}