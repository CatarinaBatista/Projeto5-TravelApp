import { getCityData, getWeather, getImages } from './apis.js';

test('api calls test', () => {
    expect(getImages).toBeDefined();
    expect(getCityData).toBeDefined();
    expect(getWeather).toBeDefined();
});