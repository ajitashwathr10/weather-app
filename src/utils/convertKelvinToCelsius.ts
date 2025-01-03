export function convertKelvinToCelsius(kelvin: number): number {
    const tempInCelsius = kelvin - 273.15;
    return Math.round(tempInCelsius);
}