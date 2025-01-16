class Coordinate {
    constructor(public latitude: number, public longitude: number, public region: string, public radius: number = 50 /* by km */) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
        this.region = region;
    }
}

function haversineDistance(cord1: Coordinate, cord2: Coordinate): number {
    const R = 6371;

    const toRad = (value: number) => value * Math.PI / 180;
    const dLat = toRad(cord2.latitude - cord1.latitude);
    const dLon = toRad(cord2.longitude - cord1.longitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(cord1.latitude)) * Math.cos(toRad(cord2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
}

let coordinates: Coordinate[] = [
    new Coordinate(40.7128, -74.0060, "New York"),
    new Coordinate(48.8566, 2.3522, "Paris"),
    new Coordinate(34.0522, -118.2437, "Los Angeles"),
    new Coordinate(35.6895, 139.6917, "Tokyo"),
    new Coordinate(-33.8688, 151.2093, "Sydney"),
    new Coordinate(55.7558, 37.6173, "Moscow"),
    new Coordinate(37.7749, -122.4194, "San Francisco"),
    new Coordinate(51.5074, -0.1278, "London"),
    new Coordinate(19.0760, 72.8777, "Mumbai"),
    new Coordinate(31.2304, 121.4737, "Shanghai"),
    new Coordinate(39.9042, 116.4074, "Beijing"),
    new Coordinate(-23.5505, -46.6333, "São Paulo"),
    new Coordinate(52.5200, 13.4050, "Berlin"),
    new Coordinate(43.6511, -79.3470, "Toronto"),
    new Coordinate(35.6762, 139.6503, "Kyoto"),
    new Coordinate(28.6139, 77.2090, "Delhi"),
    new Coordinate(40.4168, -3.7038, "Madrid"),
    new Coordinate(50.8503, 4.3517, "Brussels"),
    new Coordinate(25.276987, 55.296249, "Dubai"),
    new Coordinate(-26.2041, 28.0473, "Johannesburg"),
    new Coordinate(-34.6037, -58.3816, "Buenos Aires"),
    new Coordinate(37.9838, 23.7275, "Athens"),
    new Coordinate(59.3293, 18.0686, "Stockholm"),
    new Coordinate(1.3521, 103.8198, "Singapore"),
    new Coordinate(35.4437, 139.6380, "Yokohama"),
    new Coordinate(37.5665, 126.9780, "Seoul"),
    new Coordinate(41.9028, 12.4964, "Rome"),
    new Coordinate(38.7223, -9.1393, "Lisbon"),
    new Coordinate(50.0755, 14.4378, "Prague"),
    new Coordinate(45.4654, 9.1859, "Milan"),
    new Coordinate(47.4979, 19.0402, "Budapest"),
    new Coordinate(55.9533, -3.1883, "Edinburgh"),
    new Coordinate(25.2048, 55.2708, "Abu Dhabi"),
    new Coordinate(45.4215, -75.6972, "Ottawa"),
    new Coordinate(-22.9068, -43.1729, "Rio de Janeiro"),
    new Coordinate(60.1695, 24.9354, "Helsinki"),
    new Coordinate(35.2271, -80.8431, "Charlotte"),
    new Coordinate(39.7392, -104.9903, "Denver"),
    new Coordinate(33.7490, -84.3880, "Atlanta"),
    new Coordinate(32.7157, -117.1611, "San Diego"),
    new Coordinate(44.9778, -93.2650, "Minneapolis"),
    new Coordinate(25.7617, -80.1918, "Miami"),
    new Coordinate(29.7604, -95.3698, "Houston"),
    new Coordinate(42.3601, -71.0589, "Boston"),
    new Coordinate(51.1657, 10.4515, "Germany"),
    new Coordinate(-4.4419, 15.2663, "Kinshasa"),
    new Coordinate(6.5244, 3.3792, "Lagos"),
    new Coordinate(-1.2921, 36.8219, "Nairobi"),
    new Coordinate(13.7563, 100.5018, "Bangkok"),
    new Coordinate(21.0285, 105.8542, "Hanoi"),
    new Coordinate(10.8231, 106.6297, "Ho Chi Minh City"),
    new Coordinate(41.3851, 2.1734, "Barcelona"),
    new Coordinate(36.1699, -115.1398, "Las Vegas"),
    new Coordinate(43.7696, 11.2558, "Florence"),
    new Coordinate(35.0116, 135.7681, "Osaka"),
    new Coordinate(43.2220, 76.8512, "Almaty"),
    new Coordinate(31.5204, 74.3587, "Lahore"),
    new Coordinate(24.7136, 46.6753, "Riyadh"),
    new Coordinate(30.0444, 31.2357, "Cairo"),
    new Coordinate(59.9343, 30.3351, "Saint Petersburg"),
    new Coordinate(-8.4095, 115.1889, "Bali"),
    new Coordinate(22.3964, 114.1095, "Hong Kong"),
    new Coordinate(-37.8136, 144.9631, "Melbourne"),
    new Coordinate(-31.9505, 115.8605, "Perth"),
    new Coordinate(34.6937, 135.5023, "Kobe"),
    new Coordinate(45.7640, 4.8357, "Lyon"),
    new Coordinate(53.3498, -6.2603, "Dublin"),
    new Coordinate(64.1355, -21.8954, "Reykjavik"),
    new Coordinate(38.9072, -77.0369, "Washington, D.C."),
    new Coordinate(50.9375, 6.9603, "Cologne"),
    new Coordinate(59.9139, 10.7522, "Oslo"),
    new Coordinate(35.1046, 129.0392, "Busan"),
    new Coordinate(25.0343, 121.5645, "Taipei"),
    new Coordinate(52.3667, 4.8945, "Amsterdam"),
    new Coordinate(39.9526, -75.1652, "Philadelphia"),
    new Coordinate(53.4808, -2.2426, "Manchester"),
    new Coordinate(35.1776, 136.9076, "Nagoya"),
    new Coordinate(-36.8485, 174.7633, "Auckland"),
    new Coordinate(-12.0464, -77.0428, "Lima"),
    new Coordinate(33.6844, 73.0479, "Islamabad"),
    new Coordinate(50.1109, 8.6821, "Frankfurt"),
    new Coordinate(48.1351, 11.5820, "Munich"),
    new Coordinate(14.5995, 120.9842, "Manila"),
    new Coordinate(56.9496, 24.1052, "Riga"),
    new Coordinate(57.7089, 11.9746, "Gothenburg"),
    new Coordinate(37.2083, -93.2923, "Springfield"),
    new Coordinate(34.6937, 135.5023, "Osaka"),
    new Coordinate(30.3322, -81.6557, "Jacksonville"),
    new Coordinate(-15.7942, -47.8822, "Brasília"),
    new Coordinate(-22.9068, -43.1729, "Rio de Janeiro"),
    new Coordinate(23.8103, 90.4125, "Dhaka"),
    new Coordinate(-3.7319, -38.5267, "Fortaleza"),
    new Coordinate(39.1911, -106.8175, "Aspen"),
    new Coordinate(40.7357, -74.1724, "Newark")
];

coordinates = [
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    ...coordinates,
    new Coordinate(41.0082, 28.9784, "İstanbul")
]

const currentDistance = new Coordinate(40.87955212651662, 29.258220786205406, "current")

function calculateDistanceBetweenCurrentDistance() {
    const output = []

    for (let i = 0; i < coordinates.length; i++) {
        const element = coordinates[i]
        const distance = (haversineDistance(currentDistance, element) - element.radius).toFixed(2)
        output.push({ region: element.region, distance })
    }

    const sortedArray = output.sort(((a, b) => a.distance - b.distance));

    return sortedArray[0];
}

async function withPromiseAll() {
    const range = 25

    const searches = await Promise.all([...Array(Math.ceil(coordinates.length / range))].map((_, index) => findLowest(range, index)))
    const sortedArray = searches.sort(((a, b) => a.distance - b.distance));
    return sortedArray[0];
}

async function findLowest(range: number, index: number): Promise<{ region: string, distance: number }> {
    return new Promise((resolve) => {
        const output = []

        for (const element of coordinates.slice(index * range, (index * range) + range)) {
            const distance = (haversineDistance(currentDistance, element) - element.radius).toFixed(2)
            output.push({ region: element.region, distance })
        }

        const sortedArray = output.sort(((a, b) => a.distance - b.distance));

        resolve(sortedArray[0])
    })
}

async function main() {
    console.time("calculateDistanceBetweenCurrentDistance")
    const d1 = calculateDistanceBetweenCurrentDistance()
    console.log(d1)
    console.timeEnd("calculateDistanceBetweenCurrentDistance")

    console.time("withPromiseAll")
    const d2 = await withPromiseAll()
    console.log(d2)
    console.timeEnd("withPromiseAll")
}

main()