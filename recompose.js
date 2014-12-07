/*
Input:  translation ; a 3 component vector
        scale       ; a 3 component vector
        skew        ; skew factors XY,XZ,YZ represented as a 3 component vector
        perspective ; a 4 component vector
        quaternion  ; a 4 component vector
Output: matrix      ; a 4x4 matrix
*/

var mat4 = require('gl-mat4')

var rotationMatrix = mat4.create()
var temp = mat4.create()

function applyQuat(out, quaternion) {
    var x = quaternion[0], y = quaternion[1], z = quaternion[2], w = quaternion[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2

    out[0] = 1 - 2 * (yy + zz)
    out[1] = 2 * (yx - wz)
    out[2] = 2 * (zx + wy)
    out[4] = 2 * (yx + wz)
    out[5] = 1 - 2 * (xx + zz)
    out[6] = 2 * (zy - wx)
    out[8] = 2 * (zx - wy)
    out[9] = 2 * (zy + wx)
    out[10] = 1 - 2 * (xx + yy)
}

module.exports = function recomposeMat4(matrix, translation, scale, skew, perspective, quaternion) {
    mat4.identity(matrix)

    //apply perspective
    matrix[3] = perspective[0]
    matrix[7] = perspective[1]
    matrix[11] = perspective[2]
    matrix[15] = perspective[3]

    //apply translation
    mat4.translate(matrix, matrix, translation)
    
    //apply rotation
    applyQuat(rotationMatrix, quaternion)
    mat4.multiply(matrix, matrix, rotationMatrix)
    
    // apply skew
    // temp is a identity 4x4 matrix initially
    mat4.identity(temp)

    if (skew[2] !== 0) {
        temp[9] = skew[2]
        mat4.multiply(matrix, matrix, temp)
    }

    if (skew[1] !== 0) {
        temp[9] = 0
        temp[8] = skew[1]
        mat4.multiply(matrix, matrix, temp)
    }

    if (skew[0]) {
        temp[8] = 0
        temp[4] = skew[0]
        mat4.multiply(matrix, matrix, temp)
    }

    //apply scale
    mat4.scale(matrix, matrix, scale)
}