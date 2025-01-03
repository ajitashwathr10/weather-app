import React, { useState } from 'react';
import { MdOutlineLocationOn, MdSunny, MdMyLocation } from 'react-icons/md';
import SearchBox from '@/components/SearchBox';
import axios from 'axios';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { useAtom } from 'jotai';


type Props = {location?: string};
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
type Props = { readonly location?: string };
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [place, setPlace] = useAtom(placeAtom);
    const [_, setLoadingCity] = useAtom(loadingCityAtom);
    async function handleInputChang(value: string) {
        setCity(value);
    const [showSuggestions, setShowSuggestions] = useState(false);

    async function handleInputChange(value: string) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`
                );
                const suggestions = response.data.list.map((item: any) => item.name);
                setSuggestions(suggestions);
                setError("");
                setShowSuggestions(true);
            } catch(error) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    function handleSuggestionClick(event: React.MouseEvent<HTMLLIElement>) {
        setLoadingCity(true);
        event.preventDefault();
        if(suggestions.length == 0) {
            setError("Location not found");
            setLoadingCity(false);
        } else {
            setError("");
            setTimeout(() => {
                setLoadingCity(false);
                setPlace(city);
                setShowSuggestions(false);
            }, 500);
        }
    }

    function handleCurrentLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (postiion) => {
            const { latitude, longitude } = postiion.coords;
            try {
              setLoadingCity(true);
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
              );
              setTimeout(() => {
                setLoadingCity(false);
                setPlace(response.data.name);
              }, 500);
            } catch (error) {
              setLoadingCity(false);
            }
          });
        }
    }

    function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (city) {
            handleSuggestionClick(city);
        }
    }
        <>
            <nav className = "shadow-sm sticky top-0 left-0 z-50 bg-white">
                <div className = "h-[80px] w-full flex justify-between items-center man-w-7xl px-3 mx-auto">
                    <p className = "flex items-center justify-center gap-2">
                        <h2 className = "text-gray-500 text-3xl">Weather</h2>
                        <MdSunny className = "text-3xl mt-1 text-yellow-300"/>
                    </p>
                    <section className = "flex gap-2 items-center">
                        <MdMyLocation
                            title = "Your Current Location"
                            onClick = {handleCurrentLocation}
                            className = "text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
                        />
                        <MdOutlineLocationOn className = "text-3xl"/>
                        <p className = "text-slate-900/80 text-sm">{location}</p>
                        <div className = "relative hidden md:flex">
                            <SearchBox
                                value = {city}
                                onSubmit = {handleSubmitSearch}
                                onChange = {(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
                            />
                            <SuggetionBox
                                {...{
                                    showSuggestions,
                                    suggestions,
                                    handleSuggestionClick,
                                    error
                                }}
                            />
                        </div>
                    </section>
                </div>
            </nav>
            <section className = "flex max-w-7xl mx-auto px-3 py-4 md:hidden">
                <div className = "relative">
                    <SearchBox
                        value = {city}
                        onSubmit = {handleSubmitSearch}
                        onChange = {(e) => handleInputChang(e.target.value)}
                    />
                    <SuggestionBox
                        {...{
                            showSuggestions,
                            suggestions,
                            handleSuggestionClick,
                            error
                        }}
                    />
                </div>
            </section>
        </>
    );
};

function SuggetionBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
  }: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
  }) {
    return (
      <>
        {((showSuggestions && suggestions.length > 1) || error) && (
          <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
            {error && suggestions.length < 1 && (
              <li className = "text-red-500 p-1 "> {error}</li>
            )}
            {suggestions.map((item, i) => (
              <li
                key = {item}
                onClick = {() => handleSuggestionClick(item)}
                className = "cursor-pointer p-1 rounded   hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </>
    );
}

export default Navbar;