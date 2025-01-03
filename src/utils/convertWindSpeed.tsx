export function convertWindSpeed(speedInMetersPerSecond: number): string {
    const speedInKilometersPerHour = speedInMetersPerSecond * 3.6;
    return `${Math.round(speedInKilometersPerHour)} km/h`;
}