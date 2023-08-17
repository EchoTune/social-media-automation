import path from 'path';
// Makes path at the root of the src folder `H:\\social media automation\\src`
// takes location as parameter and navigates to folders inside src
export const cd = (location) => {
    return path.join('H:\\social media automation\\src\\' + location);
};
