"use client";
import React, { useEffect, useRef, useState } from "react";
import { State, City } from "country-state-city";

interface TextFieldWithMapboxProps {
  text: string;
  field: string;
  stateIso: string;
  setField: (value: string) => void;
  setStateIso: (value: string) => void;
  setCity?: (value: string[]) => void;
  setState?: any;
  handleLngChange?: (value: string) => void;
  handleLatChange?: (value: string) => void;
  setStateOptions?: any;
  setCityOptions?: any;
  setZip?: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement> | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZm9vZG1hZ2FwcCIsImEiOiJjbTE5dXBvNGMxa2xhMndxNHR1MHR3bjJzIn0.T4WaQMKD9pkjC-v0JZx3nw";

const TextFieldWithMapbox: React.FC<TextFieldWithMapboxProps> = ({
  text,
  field,
  stateIso,
  setField,
  setStateIso,
  setCity,
  handleLngChange,
  setStateOptions,
  setCityOptions,
  handleLatChange,
  setState,
  setZip,
  placeholder = "",
  type = "text",
  error = "",
  inputRef,
  onKeyDown,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const extractAddressParts = (place: any) => {
    const context = place.properties?.context || {};
    const coordinates = place.propperties?.coordinates || {
      latitude: 0,
      longitude: 0,
    };
    const country = context.country || {};

    return {
      city: context.place?.name || context.locality?.name || "",

      state: context.region?.name || context.region?.region_code || "",

      zip: context.postcode?.name || "",

      lng: coordinates.longitude,

      lat: coordinates.latitude,

      regionCode: context.region?.region_code || "",

      countryCode: country.country_code || "",
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setField(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 400); // ✅ debounce delay
  };

  const fetchSuggestions = async (query: string) => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
          query
        )}&proximity=ip&access_token=${MAPBOX_TOKEN}`
      );

      const data = await res.json();
      setSuggestions(data.features || []);
    } catch (err) {
      console.error("Mapbox error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place: any) => {
    setField(place.properties.full_address || place.place_name);

    const { city, state, zip, lng, lat, countryCode } =
      extractAddressParts(place);
    setCountryCode(countryCode);

    handleLngChange?.(lng);
    handleLatChange?.(lat);
    if (countryCode) {
      // Get all states with name and isoCode
      const allStates = State.getStatesOfCountry(countryCode).map((s) => ({
        name: s.name,
        id: s.isoCode, // include ISO code
      }));

      setStateOptions?.(allStates);
      if (state && allStates?.length) {
        const normalizedState = state.toLowerCase().trim();

        const matchedState = allStates.find((s) => {
          const name = s.name.toLowerCase().trim();

          return (
            name.includes(normalizedState) || normalizedState.includes(name)
          );
        });

        if (matchedState) {
          setState?.([state]);
          setStateIso?.(matchedState.id);
        }
      }
    }

    // if (state) {
    //   setState?.([state]);
    // }

    if (city) {
      setCity?.([city]);
      setCityOptions?.([city]);
    }

    if (zip) {
      setZip?.(zip);
    }

    setSuggestions([]);
  };

  useEffect(() => {
    if (stateIso && stateIso != "" && countryCode && countryCode != "") {
      const cities = City.getCitiesOfState(countryCode, stateIso).map(
        (c) => c.name
      );
      setCityOptions?.(cities);
    }
  }, [stateIso, countryCode]);
  return (
    <div className="w-full flex flex-col relative">
      {/* Label */}
      {text && (
        <label className="text-md font-semibold mb-2 ml-2 tracking-wide">
          {text}
        </label>
      )}

      {/* Input */}
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 border-2 ${
          error
            ? "border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.2)]"
            : "border-gray-200 hover:shadow-sm"
        }`}
      >
        <input
          type={type}
          ref={inputRef}
          value={field}
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className="w-full px-4 py-3 bg-white rounded-xl text-gray-800 placeholder-gray-400
            transition-all duration-300 font-mono tracking-wide outline-none focus:ring-0"
        />
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {item.properties?.full_address || item.place_name}
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-xs text-gray-400 mt-1 ml-2">Searching...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mt-2 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

export default TextFieldWithMapbox;
