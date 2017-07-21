

/*
    Apply full transformation matrix and return the new coordinates of the point.
    angle : p5.Vector - angle
    center : p5.Vector - coordinate (cartesian) of the center
    point : p5.Vector - position of the point (relative position)
    
    return p5.Vector : the cartesian position of the point (abolute position)
*/
function transformation3D(angle , center , point) {
    var result = createVector(0,0,0);
    
    //use of mdn-matrix lib
        //1. get full rotation matrix
            var m = multiplyArrayOfMatrices([
                translateMatrix(center.x,center.y,center.z),
                rotateXMatrix(angle.x),
                rotateYMatrix(angle.y)          
            ]);
    
        //2. apply the matrix to the point
            var p = multiplyPoint(m , [point.x , point.y , point.z , 1]);
    
        //3. get result
            result.x = p[0];
            result.y = p[1];
            result.z = p[2];
    
    return result;
}//end polarToCartesian

