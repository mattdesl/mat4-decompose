# mat4-decompose

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Decomposes a 3D matrix, useful for animations. Code ported from [W3 CSS Spec](http://www.w3.org/TR/css3-transforms/#decomposing-a-3d-matrix). 

## Usage

[![NPM](https://nodei.co/npm/mat4-decompose.png)](https://nodei.co/npm/mat4-decompose/)

#### `valid = decompose(matrix[, translation, scale, skew, perspective, quaternion])`

Decomposes the given `matrix` (an array of 16 floats, like those gl-matrix operates on), storing the results into the specified optional vectors.

- `translation` [x, y, z]
- `scale` [x, y, z]
- `skew` [xy, xz, yz] skew factors
- `perspective` [x, y, z, w]
- `quaternion` [x, y, z, w]

Returns `false` is this matrix cannot be decomposed, `true` otherwise.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/mat4-decompose/blob/master/LICENSE.md) for details.
