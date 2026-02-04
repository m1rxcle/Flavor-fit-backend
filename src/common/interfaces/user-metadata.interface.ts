export interface LocationInfo {
    country: string | null;
    city: string | null;
    latitude: number | null;
    longitude: number | null;
}

export interface DeviceInfo {
    browser: string | null;
    os: string | null;
    type: string | null;
}

export interface UserMetadata {
    location: LocationInfo;
    device: DeviceInfo;
    ip: string;
}
