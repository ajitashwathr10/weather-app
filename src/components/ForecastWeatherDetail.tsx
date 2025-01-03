import React from 'react';
import Container from '@/components/Container';
import WeatherIcon from '@/components/WeatherIcon';
import WeatherDetails, {WeatherDetailProps} from '@/components/WeatherDetails';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

export default function ForecastWeatherDetail (
    props: ForecastWeatherDetailProps
) {
    const {
        weatherIcon = "02d",
        date = "2021-01-01",
        day = "Monday",
        temp = 0,
        feels_like = 0,
        temp_min = 0,
        temp_max = 0,
        description,
    } = props;

    return (
        <Container className = "gap-4">
            <section className = "flex gap-4 items-center px-4">
                <div className = "flex flex-col gap-1 items-center">
                    <WeatherIcon icon = {weatherIcon} />
                    <p>{date}</p>
                    <p className = "text-sm">{day}</p>
                </div>

                <div className = "flex flex-col px-4">
                    <span className = "text-5xl">{convertKelvinToCelsius(temp ?? 0)}</span>
                    <p className = "text-xs space-x-1 whitespace-nowrap">
                        <span>Feels like</span>
                        <span>{convertKelvinToCelsius(feels_like ?? 0)}</span>
                    </p>
                    <p className = "captialize">{description}</p>
                </div>
            </section>
            <section className = "overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
                <WeatherDetailProps{...props}/>
            </section>
        </Container>
    );
}