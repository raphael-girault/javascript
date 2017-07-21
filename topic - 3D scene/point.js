/*
    Class to create point to put in 3D space.
*/



class Point {
    
    //constructor
        constructor(ref , x,y,z) {
            this.ref = ref; //reference point (for the setting in the 3D space)
            this.posA = createVector(x,y,z); //position absolue in screen
            this.posR = createVector(0,0,0); //position relative in screen
            
            this.angle = createVector(0,0,0);
            
            this.D = 10; //diameter of the point
            
            this.moved = false;
        }//end constructor
    
    
    //methods
        display() {
            //1. calcul of the position of the point
                this.calculPos();
            //2. display
                noStroke();
                if (this.moved) {
                    fill(0,0,200);
                } else {
                    fill(0);
                }
                ellipse(this.posR.x , this.posR.y , this.D , this.D);
        }//end display
    
    
    
        calculPos() {
            this.posR = transformation3D(this.ref.angle , this.ref.posA , this.posA);
        }//end calculPos
    
    
    
        over(x,y) {
            return (pow(this.D,2) >= pow(x-this.posR.x,2) + pow(y-this.posR.y,2));
            //note : we use the diameter of the displayed point and not the radius to simplify the displacement of the point
        }//end over
    
}