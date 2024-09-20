import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "./SchedulePlan.css";
import townBoundingBoxes from "./TownBoundingBox";
import {
  Box,
  Button,
  Rating,
  Typography,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ArrowBackIos,
  Place,
  RestaurantRounded,
  HotelRounded,
} from "@mui/icons-material";
import { getPlaceData, getHotelData } from "../../api";
import Navbar2 from "../../components/Navbar/Navbar2";
import DisplayCard from "../../components/DisplayCard/DisplayCard";

const SchedulePlan = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState([""]);
  const [waitingTimes, setWaitingTimes] = useState(Array(stops.length).fill(0));
  const [startDateTime, setStartDateTime] = useState("");
  const [reverseRoute, setReverseRoute] = useState(false);
  const [segmentDetails, setSegmentDetails] = useState([]);
  const [arrivalTable, setArrivalTable] = useState([]);
  const [summary, setSummary] = useState("");
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [mealRestaurants, setMealRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [hotelsLoading, setHotelsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const [passingTowns, setPassingTowns] = useState([]);
  const [nearbyTowns, setNearbyTowns] = useState([]);
  const [bookmarkPlaces, setBookmarkPlaces] = useState([]);
  const [count, setCount] = useState(0); //Count to select which part to render
  const navigate = useNavigate();

  const [dailyStartTime, setDailyStartTime] = useState("07:00");
  const [dailyEndTime, setDailyEndTime] = useState("20:00");

  //Navigate to Bookmark page
  const handleManageBookmarksClick = () => {
    navigate("/add-bookmarks");
  };

  //Fetch Bookmark from database
  useEffect(() => {
    const fetchBookmarkPlaces = async () => {
      try {
        const response = await fetch(
          "http://localhost:1200/api/bookmarks/getplaces",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setBookmarkPlaces(data);
        } else {
          console.log("Error fetching bookmark places");
        }
      } catch (error) {
        console.log("Something went wrong in fetching bookmark places");
      }
    };

    fetchBookmarkPlaces();
  }, []);

  // Update waitingTimes when stops length changes
  useEffect(() => {
    setWaitingTimes((prevTimes) => {
      // Create a new array with the same length as stops, preserving existing values
      const updatedTimes = [...prevTimes];

      // If stops have increased, add 0 for each new stop
      if (stops.length > prevTimes.length) {
        return [
          ...updatedTimes,
          ...Array(stops.length - prevTimes.length).fill(0),
        ];
      }

      // If stops have decreased, slice the array to match the stops length
      return updatedTimes.slice(0, stops.length);
    });
  }, [stops]);

  //Map rendering
  useEffect(() => {
    //If count is 1 (When Schedule button clicked) fetch Map
    if (count === 1) {
      mapRef.current = L.map("map").setView([7.8731, 80.7718], 7);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
      return () => {
        if (mapRef.current) mapRef.current.remove();
      };
    }
  }, [count]);

  const handleLocationInput = (inputId, value) => {
    if (value.length > 1) {
      fetch(
        `http://localhost:1200/api/destinations/suggestions?query=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch suggestions");
          return response.json();
        })
        .then((suggestions) => {
          // Update the datalist based on the suggestions
          const datalist = document.getElementById(`${inputId}Suggestions`);
          datalist.innerHTML = "";

          suggestions.forEach((suggestion) => {
            const option = document.createElement("option");
            option.value = suggestion.destinationName;
            datalist.appendChild(option);
          });
        })
        .catch((error) => console.error("Error fetching suggestions:", error));
    }
  };

  //BookmarkCard function
  const handleBookmarkClick = (bookmark) => {
    setStops((prevStops) => {
      let newStops = [...prevStops];

      // Ensure there are no trailing empty strings before making any changes
      if (newStops.length > 0 && newStops[newStops.length - 1] === "") {
        newStops.pop();
      }

      // Check if the bookmark is already in the stops array
      const bookmarkIndex = newStops.indexOf(bookmark.name);

      if (bookmarkIndex !== -1) {
        // If the bookmark exists, remove it
        newStops.splice(bookmarkIndex, 1);
      } else {
        // If the bookmark doesn't exist, add it to the stops
        newStops.push(bookmark.name);
      }

      // Add an empty string for the next stop input
      newStops.push("");

      return newStops;
    });
  };

  const handleStopInput = (index, value) => {
    let newStops = [...stops];
    newStops[index] = value;

    // Remove trailing empty stops
    while (newStops.length > 1 && newStops[newStops.length - 1] === "") {
      newStops.pop();
    }

    // Add an empty string if the last stop is not empty
    if (newStops[newStops.length - 1] !== "") {
      newStops.push("");
    }

    setStops(newStops);
    handleLocationInput(`stop${index + 1}`, value);
  };

  // Handle waiting time input for dynamic stops
  const handleWaitingTimeInput = (index, value) => {
    const newWaitingTimes = [...waitingTimes];
    newWaitingTimes[index] = parseFloat(value); // Make sure it's a number
    setWaitingTimes(newWaitingTimes);

    console.log("Updated Waiting Times:", newWaitingTimes);
  };

  // Handle reverse route toggle (start as destination)
  const handleReverseRouteChange = () => {
    setReverseRoute(!reverseRoute);

    // When reverse route is enabled, set destination to start location
    if (!reverseRoute) {
      setDestination(start);
    } else {
      setDestination("");
    }
  };

  // Sync destination when start changes if reverse route is enabled
  const handleStartInput = (value) => {
    setStart(value);
    if (reverseRoute) {
      setDestination(value);
    }
  };

  // Function to extract time in hours from the user's input
  const getHoursFromTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  };

  //Invoke when Schedule button clicked
  const findRoute = () => {
    const stopsToFetch = stops.filter((stop) => stop.trim() !== "");
    const locations = [start, ...stopsToFetch, destination];
    setIsLoading(true); //Set loading true to show loading until schedule generated done
    setCount(count + 1); //Count to render which part

    // Get the daily start and end times from the user input
    const dailyStartTimeInput = document.getElementById("dailyStartTime").value;
    const dailyEndTimeInput = document.getElementById("dailyEndTime").value;

    // Convert the times to hours
    const dailyStartTime = getHoursFromTime(dailyStartTimeInput);
    const dailyEndTime = getHoursFromTime(dailyEndTimeInput);

    const locationPromises = locations.map((loc) =>
      fetch(
        `http://localhost:1200/api/destinations/coordinates?name=${encodeURIComponent(
          loc
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch coordinates");
          return response.json();
        })
        .then((data) => ({
          name: loc,
          lat: data.latitude,
          lon: data.longitude,
        }))
    );

    Promise.all(locationPromises)
      .then((locationsData) => {
        // Once you have all the locations (finalWaypoints), you can calculate the route
        const finalWaypoints = locationsData; // Store the resolved locations as finalWaypoints

        // Now calculate towns along the route and nearby towns
        const passingTowns = getTownsAlongRoute(finalWaypoints);
        const nearbyTowns = getNearbyTowns(finalWaypoints);

        // Display the towns
        displayTowns(passingTowns, "Passing Towns");
        displayTowns(nearbyTowns, "Nearby Towns");

        // console.log("Waiting Times Before Route Calculation:", waitingTimes);

        // Calculate the route based on the fetched locations and other parameters
        calculateContinuousRoute(
          finalWaypoints,
          waitingTimes,
          new Date(startDateTime),
          dailyStartTime,
          dailyEndTime
        );
      })
      .catch((error) => console.error("Error fetching geocoding data:", error));
  };

  const calculateContinuousRoute = (
    waypoints,
    waitingTimes,
    startDateTimeValue,
    dailyStartTime,
    dailyEndTime
  ) => {
    // Remove any previous routing controls from the map
    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
    }

    // Intermediate stops for TSP
    const stopsWithTimes = waypoints.slice(1, -1).map((stop, index) => ({
      stop,
      waitingTime: waitingTimes[index],
    }));

    // Solve the TSP to get the optimal route
    let optimalStopsWithTimes = solveTSPForStopsWithTimes(
      stopsWithTimes,
      waypoints[0],
      waypoints[waypoints.length - 1]
    );

    // Clean the stops to ensure no duplicated destination
    optimalStopsWithTimes = cleanStopsWithTimes(
      optimalStopsWithTimes,
      waypoints[waypoints.length - 1]
    );

    // Final reordered waypoints and waiting times
    const finalWaypoints = [
      waypoints[0],
      ...optimalStopsWithTimes.map((pair) => pair.stop),
    ];
    const finalWaitingTimes = [
      waitingTimes[0],
      ...optimalStopsWithTimes.map((pair) => pair.waitingTime),
    ];

    // Get passing and nearby towns
    const passingTowns = getTownsAlongRoute(finalWaypoints);
    const nearbyTowns = getNearbyTowns(finalWaypoints);

    // Display the towns in React components (instead of direct DOM manipulation)
    displayTowns(passingTowns, "Passing Towns");
    displayTowns(nearbyTowns, "Nearby Towns");

    // Create routing control for the map using leaflet routing
    routingControlRef.current = L.Routing.control({
      waypoints: finalWaypoints.map((wp) => L.latLng(wp.lat, wp.lon)),
      routeWhileDragging: false,
      createMarker: () => null, // Prevent markers
    })
      .on("routesfound", (e) => {
        const routes = e.routes[0];
        const totalTravelTime = routes.summary.totalTime;
        const totalDistance = routes.summary.totalDistance / 1000;
        handleRouteFound(
          finalWaypoints,
          finalWaitingTimes,
          totalTravelTime,
          totalDistance,
          startDateTimeValue,
          dailyStartTime,
          dailyEndTime
        );
      })
      .on("routingerror", (error) => {
        console.error("Routing error:", error);
        alert("An error occurred while calculating the route.");
      })
      .addTo(mapRef.current);
  };

  // Function to clean the stops and remove any duplicate destinations
  const cleanStopsWithTimes = (orderedStopsWithTimes, destination) => {
    const cleanedStops = [...orderedStopsWithTimes];

    // Ensure destination is only added once at the end if it is not already included
    if (
      cleanedStops.length === 0 ||
      cleanedStops[cleanedStops.length - 1].stop !== destination
    ) {
      cleanedStops.push({ stop: destination, name: "Destination" });
    }

    return cleanedStops;
  };

  const handleRouteFound = (
    finalWaypoints,
    finalWaitingTimes,
    totalTravelTime,
    totalDistance,
    startDateTimeValue,
    dailyStartTime,
    dailyEndTime
  ) => {
    let currentDateTime = new Date(startDateTimeValue);

    setSegmentDetails([]); // Clear previous details
    setArrivalTable([]); // Clear previous table entries
    setSummary(""); // Clear previous summary
    setMealRestaurants([]); // Clear previous meal restaurants
    setHotels([]); //Clear previous hotels

    const overallSummary = {
      totalDistance: totalDistance.toFixed(2),
      totalTime: (totalTravelTime / 60).toFixed(2), // Convert time to hours
    };
    setSummary(overallSummary); // Set the summary

    let accumulatedTime = 0;

    finalWaypoints.forEach((waypoint, i) => {
      if (i < finalWaypoints.length - 1) {
        const from = finalWaypoints[i];
        const to = finalWaypoints[i + 1];
        const waitingTime = finalWaitingTimes[i] || 0;

        const segmentDistance = distanceBetweenCoords(from, to);
        const segmentTravelTime =
          (totalTravelTime / totalDistance) * segmentDistance;

        let departureTime = new Date(currentDateTime);

        // Calculate end time for the current segment
        accumulatedTime += segmentTravelTime;

        if (waitingTime > 0) {
          accumulatedTime += waitingTime * 60; // Convert waiting time to seconds
        }

        // Check if the segment ends past 8:00 PM
        let segmentEndHour =
          currentDateTime.getHours() + segmentTravelTime / 3600;

        if (segmentEndHour > dailyEndTime) {
          fetchHotels(waypoint, departureTime);
          currentDateTime.setDate(currentDateTime.getDate() + 1); // Move to the next day
          currentDateTime.setHours(dailyStartTime, 0, 0);
          departureTime = new Date(currentDateTime); // Set departure for next segment
          // Now add the travel time again after setting the start time for the next day
          currentDateTime.setSeconds(
            currentDateTime.getSeconds() + segmentTravelTime + waitingTime * 60
          );
        } else {
          // Add the travel time to the current time if within the same day
          currentDateTime.setSeconds(
            currentDateTime.getSeconds() + segmentTravelTime + waitingTime * 60
          );
        }

        const arrivalTime = new Date(currentDateTime);

        // Get nearby towns during meal times
        const nearbyTownsDuringMeal = getNearbyTownsForMealTime(
          [from, to],
          departureTime
        );

        if (nearbyTownsDuringMeal.meal !== "none") {
          //Call the function to fetch restaurants for the nearby towns
          fetchRestaurantsForMealTime(
            nearbyTownsDuringMeal.nearbyTowns,
            nearbyTownsDuringMeal.meal,
            arrivalTime
          );
          console.log(
            `Nearby towns for ${nearbyTownsDuringMeal.meal}:`,
            nearbyTownsDuringMeal.nearbyTowns
          );

          // Display the towns or handle them according to your needs (e.g., show on map)
          displayTowns(
            nearbyTownsDuringMeal.nearbyTowns,
            `Nearby ${nearbyTownsDuringMeal.meal} Towns`
          );
        }

        // Format the times to be displayed in the table
        const formattedDepartureTime = departureTime.toLocaleString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const formattedArrivalTime = arrivalTime.toLocaleString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        // Add segment details
        setSegmentDetails((prevDetails) => {
          const totalHours = Math.floor(segmentTravelTime / 3600); // Get the full hours
          const totalMinutes = Math.floor((segmentTravelTime % 3600) / 60); // Get the remaining minutes

          return [
            ...prevDetails,
            {
              from: from.name,
              to: to.name,
              distance: segmentDistance.toFixed(2), // Keep distance as is, with 2 decimal places
              time: `${totalHours}h ${totalMinutes}`, // Format time as "Xh Ymin"
              waitingTime,
            },
          ];
        });

        // Add arrival table data
        setArrivalTable((prevTable) => [
          ...prevTable,
          {
            from: from.name,
            to: to.name,
            distance: segmentDistance.toFixed(2),
            departure: formattedDepartureTime,
            arrival: formattedArrivalTime,
          },
        ]);

        setIsLoading(false); // Set loading state to false
      }
    });
  };

  const TSPPlanner = ({ locations }) => {
    const [optimalOrder, setOptimalOrder] = useState([]);

    useEffect(() => {
      if (locations.length > 0) {
        const optimalPath = solveTSP(locations);
        setOptimalOrder(optimalPath);
      }
    }, [locations]);

    // Traveling Salesman Problem (TSP) Solver function
    const solveTSP = (locations) => {
      const numLocations = locations.length;
      const distances = Array(numLocations)
        .fill()
        .map(() => Array(numLocations).fill(Infinity));

      // Calculate the distance matrix between each pair of locations
      for (let i = 0; i < numLocations; i++) {
        for (let j = i + 1; j < numLocations; j++) {
          const dist = distanceBetweenCoords(locations[i], locations[j]);
          distances[i][j] = dist;
          distances[j][i] = dist;
        }
      }

      const memo = {};
      const visitedAll = (1 << numLocations) - 1;

      // TSP dynamic programming function
      function tsp(mask, pos) {
        if (mask === visitedAll) {
          return distances[pos][0];
        }
        if (memo[`${mask}-${pos}`] !== undefined) {
          return memo[`${mask}-${pos}`];
        }
        let result = Infinity;
        for (let next = 0; next < numLocations; next++) {
          if ((mask & (1 << next)) === 0) {
            const newResult =
              distances[pos][next] + tsp(mask | (1 << next), next);
            result = Math.min(result, newResult);
          }
        }
        memo[`${mask}-${pos}`] = result;
        return result;
      }

      // Reconstruct the path
      function findPath(mask, pos) {
        if (mask === visitedAll) return [0];
        let result = Infinity;
        let bestNext = -1;
        for (let next = 0; next < numLocations; next++) {
          if ((mask & (1 << next)) === 0) {
            const newResult =
              distances[pos][next] + tsp(mask | (1 << next), next);
            if (newResult < result) {
              result = newResult;
              bestNext = next;
            }
          }
        }
        return [bestNext, ...findPath(mask | (1 << bestNext), bestNext)];
      }

      const order = findPath(1, 0);
      return order.map((index) => locations[index]);
    };

    return (
      <div>
        <h2>Optimal Route</h2>
        <ul>
          {optimalOrder.map((location, index) => (
            <li key={index}>
              Stop {index + 1}: Latitude: {location[0]}, Longitude:{" "}
              {location[1]}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const solveTSPForStopsWithTimes = (stopsWithTimes, start, destination) => {
    let remainingStops = stopsWithTimes.slice();
    let orderedStopsWithTimes = [];
    let currentLocation = start;

    // console.log("Initial remaining stops:", remainingStops);
    // console.log("Starting location:", start);
    // console.log("Destination:", destination);

    remainingStops = remainingStops.filter((pair) => {
      const isDestination = pair.stop === destination;
      // console.log(`Filtering ${pair.stop}, is destination: ${isDestination}`);
      return !isDestination;
    });

    // console.log(
    //   "Filtered remaining stops (without destination):",
    //   remainingStops
    // );

    while (remainingStops.length > 0) {
      let closestStop = null;
      let shortestDistance = Infinity;
      let closestPair = null;

      remainingStops.forEach((pair) => {
        const distance = distanceBetweenCoords(currentLocation, pair.stop);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          closestStop = pair.stop;
          closestPair = pair;
        }
      });

      orderedStopsWithTimes.push(closestPair);
      currentLocation = closestStop;

      // console.log("Current ordered stops:", orderedStopsWithTimes);

      remainingStops = remainingStops.filter((pair) => pair !== closestPair);
    }
    if (
      orderedStopsWithTimes.length === 0 ||
      orderedStopsWithTimes[orderedStopsWithTimes.length - 1].stop !==
        destination
    ) {
      orderedStopsWithTimes.push({ stop: destination, name: "Destination" });
      // console.log("Added destination:", destination);
    } else {
      // console.log("Destination is already the last stop, no need to add.");
    }

    console.log("Final ordered stops:", orderedStopsWithTimes);

    return orderedStopsWithTimes;
  };

  // Function to dynamically calculate the multiplier based on straight-line distance
  const getRoadDistanceMultiplier = (distance) => {
    if (distance <= 50) {
      return 1.3; // For short distances, a lower multiplier
    } else if (distance > 50 && distance <= 120) {
      return 1.4; // For medium distances, moderate multiplier
    } else {
      return 1.65; // For long distances, a higher multiplier
    }
  };

  // Haversine formula to calculate straight-line distance
  const distanceBetweenCoords = (coord1, coord2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const dLng = ((coord2.lon - coord1.lon) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coord1.lat * Math.PI) / 180) *
        Math.cos((coord2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const straightLineDistance = R * c; // Straight-line distance in kilometers

    // Get the appropriate road distance multiplier based on the straight-line distance
    const roadDistanceMultiplier =
      getRoadDistanceMultiplier(straightLineDistance);

    // Return the adjusted road distance
    return straightLineDistance * roadDistanceMultiplier;
  };

  const getTownsAlongRoute = (waypoints) => {
    return waypoints
      .filter((waypoint) =>
        Object.keys(townBoundingBoxes).some((town) =>
          isWithinBounds(waypoint, townBoundingBoxes[town])
        )
      )
      .map((waypoint) => waypoint.name);
  };

  const getNearbyTowns = (waypoints) => {
    return Object.keys(townBoundingBoxes).filter((town) =>
      waypoints.some(
        (waypoint) => isWithinBounds(waypoint, townBoundingBoxes[town], 0.05) // Adjust buffer if needed
      )
    );
  };

  const isWithinBounds = (coord, boundingBox, buffer = 0) => {
    return (
      coord.lat >= boundingBox.south - buffer &&
      coord.lat <= boundingBox.north + buffer &&
      coord.lon >= boundingBox.west - buffer &&
      coord.lon <= boundingBox.east + buffer
    );
  };

  const displayTowns = (towns, type) => {
    if (type === "Passing Towns") {
      setPassingTowns(towns);
    } else if (type === "Nearby Towns") {
      setNearbyTowns(towns);
    }
  };

  // Define time ranges for meals in hours (24-hour format)
  const mealTimes = {
    breakfast: { start: 7, end: 8 }, // 7:00 AM to 8:00 AM
    lunch: { start: 12, end: 14 }, // 12:00 PM to 2:00 PM
    dinner: { start: 18, end: 20 }, // 6:00 PM to 8:00 PM
  };

  // Function to determine if the current time falls within a meal time range
  const isWithinMealTime = (currentHour, mealTimeRange) => {
    return (
      currentHour >= mealTimeRange.start && currentHour <= mealTimeRange.end
    );
  };

  // Updated function to fetch nearby towns for specific meal times
  const getNearbyTownsForMealTime = (waypoints, currentDateTime) => {
    // Check current time in hours
    const currentHour = currentDateTime.getHours();

    // Get nearby towns
    const nearbyTownsForWaypoints = getNearbyTowns(waypoints);

    // Check if the current time falls within any meal time range
    if (isWithinMealTime(currentHour, mealTimes.breakfast)) {
      console.log("It's breakfast time!");
      return {
        meal: "breakfast",
        nearbyTowns: nearbyTownsForWaypoints, // Towns nearby during breakfast
      };
    } else if (isWithinMealTime(currentHour, mealTimes.lunch)) {
      console.log("It's lunch time!");
      return {
        meal: "lunch",
        nearbyTowns: nearbyTownsForWaypoints, // Towns nearby during lunch
      };
    } else if (isWithinMealTime(currentHour, mealTimes.dinner)) {
      console.log("It's dinner time!");
      return {
        meal: "dinner",
        nearbyTowns: nearbyTownsForWaypoints, // Towns nearby during dinner
      };
    }

    return { meal: "none", nearbyTowns: [] }; // No meal time
  };

  // Formatting time in 'hh:mm AM/PM' format
  const formatTime = (timeIn24h) => {
    const [hours, minutes] = timeIn24h.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  //Fetch restaurants for specific meal time
  const fetchRestaurantsForMealTime = (towns, meal, arrivalTime) => {
    setLoadingRestaurants(true);
    const bound = getBounds(towns[0]);

    // Format date to 'YYYY-MM-DD' early on
    const arrivalFormatDate = arrivalTime.toISOString().split("T")[0];

    const existingMeal = mealRestaurants.find(
      (item) => item.meal === meal && item.arrivalTime === arrivalFormatDate
    );

    if (existingMeal) {
      return; // Return  if the meal for the same date exists
    }

    if (bound) {
      const sw = { lat: bound.south, lng: bound.west };
      const ne = { lat: bound.north, lng: bound.east };

      getPlaceData(sw, ne, "restaurants")
        .then((restaurantsData) => {
          // Filter restaurants based on rating and closure status
          const filteredRestaurant = restaurantsData.filter(
            (restaurant) =>
              restaurant.rating >= 3 && restaurant.is_closed === false
          );

          console.log(restaurantsData);

          // Use prevState to avoid adding duplicate meals for the same date
          setMealRestaurants((prev) => {
            return [
              ...prev,
              {
                meal,
                restaurants: filteredRestaurant,
                arrivalTime: arrivalFormatDate, // Use formatted date
              },
            ];
          });

          setLoadingRestaurants(false);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
          setLoadingRestaurants(false);
        });
    }
  };

  // Helper function to get bounds for a given town
  function getBounds(town) {
    const bounds = townBoundingBoxes[town];
    if (bounds) {
      return bounds;
    } else {
      console.log(`No bounds found for ${town}`);
      return null;
    }
  }

  //Fetch hotels
  const fetchHotels = (waypoint, date) => {
    const bounds = createBound(waypoint);
    setHotelsLoading(true);

    // Format date to 'YYYY-MM-DD'
    const checkInDate = date.toISOString().split("T")[0];
    const checkOutDate = new Date(date);
    checkOutDate.setDate(checkOutDate.getDate() + 1); // Increment by 1 day for checkout
    const formattedCheckOutDate = checkOutDate.toISOString().split("T")[0];

    const adults = 2;
    const rooms = 1;
    const children = 0;

    const existingHotel = hotels.find((item) => item.date === checkInDate);

    if (existingHotel) {
      return; // Return if the same hotel exist
    }

    console.log("Hotels for ", checkInDate);
    getHotelData(
      bounds.sw,
      bounds.ne,
      checkInDate,
      formattedCheckOutDate,
      rooms,
      adults,
      children
    ).then((data) => {
      if (data === undefined) {
        setHotels((prev) => [...prev, { date: checkInDate, hotels: [] }]);
      } else {
        const filteredHotels = data.filter(
          (hotel) => hotel.basicPropertyData.reviews.totalScore >= 7
        );
        setHotels((prev) => {
          return [...prev, { date: checkInDate, hotels: filteredHotels }];
        });
      }
      console.log("Hotels:", hotels);
      setHotelsLoading(false);
    });
  };

  //Create bound for given coordinate
  const createBound = (coordinates) => {
    const centerLat = coordinates.lat;
    const centerLng = coordinates.lon;

    // Define a distance in degrees for latitude and longitude
    // Note: Adjust the distance as needed
    const latOffset = 0.1; // Latitude offset
    const lngOffset = 0.1; // Longitude offset

    // Calculate the southwest (SW) and northeast (NE) corners
    const swLat = centerLat - latOffset;
    const swLng = centerLng - lngOffset;
    const neLat = centerLat + latOffset;
    const neLng = centerLng + lngOffset;

    // Define the bounds
    const bounds = {
      sw: { lat: swLat, lng: swLng },
      ne: { lat: neLat, lng: neLng },
    };
    return bounds;
  };

  const handleEndTimeChange = (event) => {
    if (event.target.value < dailyStartTime) {
      window.alert("End time must be after start time");
      return;
    }
    setDailyEndTime(event.target.value);
  };

  return (
    <>
      <Navbar2 />
      <div>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "120px" }}
        >
          <h1 className="Schedule-Header">
            Schedule {count === 0 ? "Plan" : "Result"}
          </h1>
        </Box>

        <div className="container">
          {count === 0 ? (
            //Getting Stops and Bookmark places for schedule
            <>
              <div className="input-container">
                <div>
                  <label htmlFor="start" className="label">
                    Start Location:
                  </label>
                  <input
                    type="text"
                    id="start"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    list="startSuggestions"
                    onInput={(e) =>
                      handleLocationInput("start", e.target.value)
                    }
                    className="location-input"
                  />
                  <datalist id="startSuggestions"></datalist>
                </div>
                <div>
                  <label htmlFor="startDateTime" className="label">
                    Journey Start Time & Date:
                  </label>
                  <input
                    type="datetime-local"
                    id="startDateTime"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    className="date-input"
                    min={new Date().toISOString().split("T")[0] + "T00:00"}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="destination" className="label">
                    Destination:
                  </label>
                  <input
                    type="text"
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    list="destinationSuggestions"
                    onInput={(e) =>
                      handleLocationInput("destination", e.target.value)
                    }
                    className="location-input"
                  />
                  <datalist id="destinationSuggestions"></datalist>
                </div>
              </div>
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    id="reverseRoute"
                    checked={reverseRoute}
                    onChange={handleReverseRouteChange}
                  />{" "}
                  Use Destination as Start Location
                </label>
              </div>
              {/* New inputs for daily start and end time */}
              <div className="time-input-container" style={{ display: "flex" }}>
                <div style={{ marginRight: "10px", marginBottom: "20px" }}>
                  <label htmlFor="dailyStartTime" className="label">
                    Daily Start Time:
                  </label>
                  <input
                    type="time"
                    id="dailyStartTime"
                    value={dailyStartTime}
                    onChange={(e) => setDailyStartTime(e.target.value)}
                    className="time-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dailyEndTime" className="label">
                    Daily End Time:
                  </label>
                  <input
                    type="time"
                    id="dailyEndTime"
                    value={dailyEndTime}
                    onChange={handleEndTimeChange}
                    className="time-input"
                    required
                  />
                </div>
              </div>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5">Your Bookmarks:</Typography>
                <Button
                  variant="contained"
                  onClick={handleManageBookmarksClick}
                >
                  Manage Bookmarks
                </Button>
              </Box>
              {bookmarkPlaces.length === 0 && (
                <Typography variant="h5" sx={{ margin: "10px", color: "red" }}>
                  No bookmarks found.Click Manage Bookmarks to add Some
                </Typography>
              )}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {bookmarkPlaces.length > 0 &&
                  bookmarkPlaces.map((bookmark, index) => (
                    <div
                      key={index}
                      className="bookmark-card"
                      onClick={() => handleBookmarkClick(bookmark, index)}
                    >
                      <img
                        src={
                          bookmark.imgUrl
                            ? bookmark.imgUrl
                            : "https://st4.depositphotos.com/14953852/24787/v/1600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                        }
                        alt={bookmark.name}
                        className="bookmark-image"
                      />
                      <div className="bookmark-details">
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <h4>{bookmark.name}</h4>
                        </Box>
                        <Rating
                          name={`bookmark-rating-${index}`}
                          value={bookmark.rating}
                          precision={0.5} // Allows half-star increments
                          readOnly
                          size="small"
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ ml: 0.5 }}>
                            {bookmark.city}
                          </Typography>
                        </Box>
                      </div>
                      <Box sx={{ position: "absolute", top: -3, right: -3 }}>
                        {stops.includes(bookmark.name) ? (
                          <CheckCircle
                            style={{ color: "red" }}
                            fontSize="large"
                          />
                        ) : (
                          <></>
                        )}
                      </Box>
                    </div>
                  ))}
              </Box>
              {stops.map((stop, index) => (
                <div key={index}>
                  <label htmlFor={`stop${index + 1}`}>Stop {index + 1}:</label>
                  <input
                    type="text"
                    id={`stop${index + 1}`}
                    value={stop || ""}
                    onInput={(e) => handleStopInput(index, e.target.value)}
                    list={`stop${index + 1}Suggestions`}
                    placeholder="Enter stop location"
                    className="stop-input"
                  />
                  <datalist id={`stop${index + 1}Suggestions`}></datalist>
                  <div
                    className="waiting-time"
                    style={{ display: stop ? "block" : "none" }}
                  >
                    <label style={{ marginRight: 10 }}>Waiting Time:</label>
                    <input
                      type="radio"
                      name={`waitingTime${index + 1}`}
                      value="15"
                      className="radio"
                      onChange={(e) =>
                        handleWaitingTimeInput(index, e.target.value)
                      } // Add onChange handler
                      checked={waitingTimes[index] === 15} // Add checked condition
                    />{" "}
                    15 min
                    <input
                      type="radio"
                      name={`waitingTime${index + 1}`}
                      value="30"
                      className="radio"
                      onChange={(e) =>
                        handleWaitingTimeInput(index, e.target.value)
                      } // Add onChange handler
                      checked={waitingTimes[index] === 30} // Add checked condition
                    />{" "}
                    30 min
                    <input
                      type="radio"
                      name={`waitingTime${index + 1}`}
                      value="60"
                      className="radio"
                      onChange={(e) =>
                        handleWaitingTimeInput(index, e.target.value)
                      } // Add onChange handler
                      checked={waitingTimes[index] === 60} // Add checked condition
                    />{" "}
                    1 hour
                    <input
                      type="radio"
                      name={`waitingTime${index + 1}`}
                      value="120"
                      className="radio"
                      onChange={(e) =>
                        handleWaitingTimeInput(index, e.target.value)
                      } // Add onChange handler
                      checked={waitingTimes[index] === 120} // Add checked condition
                    />{" "}
                    2 hours
                  </div>
                </div>
              ))}

              <button
                id="findRoute"
                onClick={findRoute}
                style={{ marginTop: 20 }}
              >
                Generate Schedule
              </button>
            </>
          ) : (
            //Schedule Display segment with route map
            <>
              <Grid
                container
                spacing={3}
                sx={{ height: "50%", minHeight: "500px", marginBottom: "50px" }}
              >
                {isLoading ? (
                  <Box
                    sx={{
                      alignItems: "center",
                      justifyContent: "center", // Add this line
                      position: "fixed",
                      top: "50vh",
                      left: "80vh",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">
                        Generating Schedule For You
                      </Typography>
                      <CircularProgress />
                    </Box>
                  </Box>
                ) : (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{ maxHeight: "500px", overflow: "auto" }}
                  >
                    {arrivalTable.map((row, index) => (
                      <Box
                        sx={{
                          display: isLoading ? "none" : "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        key={index}
                      >
                        <Place />
                        <Typography variant="h5">{row.from}</Typography>
                        <Typography variant="h6" sx={{ color: "grey" }}>
                          {row.departure}
                        </Typography>
                        {index < arrivalTable.length && (
                          <Divider
                            orientation="vertical"
                            sx={{
                              height: "40px", // Adjust the height as needed
                              width: "2px", // Adjust the thickness of the line
                              backgroundColor: "grey",
                              marginY: 1, // Add some space between items
                            }}
                          />
                        )}
                      </Box>
                    ))}
                    {/* Render the last element separately */}
                    {arrivalTable.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: 2, // Adjust spacing as needed
                        }}
                      >
                        <Place />
                        <Typography variant="h5">
                          {arrivalTable[arrivalTable.length - 1].to}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "grey" }}>
                          {arrivalTable[arrivalTable.length - 1].arrival}
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                )}
                <Grid item xs={12} md={8}>
                  <div
                    id="map"
                    style={{
                      height: "100%",
                      display: isLoading ? "none" : "block",
                    }}
                  ></div>
                </Grid>
              </Grid>

              {isLoading ? (
                <></>
              ) : (
                <>
                  <div id="segmentDetails">
                    <h2>Segment Details</h2>
                    <div>
                      {segmentDetails.map((segment, index) => (
                        <div key={index} className="segment-container">
                          <h4>
                            From {segment.from} to {segment.to}
                          </h4>
                          <p>
                            <strong>Distance:</strong> {segment.distance} km
                          </p>
                          <p>
                            <strong>Time:</strong> {segment.time} minutes
                          </p>
                          <p>
                            <strong>Waiting Time:</strong> {segment.waitingTime}{" "}
                            minutes
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div id="arrivalTableContainer">
                    <h2>Schedule Table</h2>
                    <table id="arrivalTable">
                      <thead>
                        <tr>
                          <th>From</th>
                          <th>To</th>
                          <th>Distance</th>
                          <th>Estimated Departure Time</th>
                          <th>Estimated Arrival Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {arrivalTable.map((row, index) => (
                          <tr key={index}>
                            <td>{row.from}</td>
                            <td>{row.to}</td>
                            <td>{row.distance} km</td>
                            <td>{row.departure}</td>
                            <td>{row.arrival}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* For Restaurants */}
                  {mealRestaurants.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h5" sx={{ marginRight: "5px" }}>
                        Pick Your Restaurant{" "}
                      </Typography>
                      <RestaurantRounded />
                    </Box>
                  )}

                  {loadingRestaurants ? (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "green", marginRight: "10px" }}
                      >
                        Preparing Your Meal
                      </Typography>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Box>
                      {mealRestaurants.map((item, index) => (
                        <Box key={index} mb={2}>
                          <Typography variant="h6">
                            Meal: {item.meal} {item.arrivalTime}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                            {item.restaurants
                              .slice(0, 5)
                              .map((restaurant, idx) => (
                                <DisplayCard
                                  key={idx}
                                  name={restaurant.name}
                                  imgUrl={restaurant?.photo?.images?.large?.url}
                                  rating={restaurant.rating}
                                  location={restaurant?.address_obj?.city}
                                />
                              ))}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* For Hotel */}
                  {hotels.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h5" sx={{ marginRight: "5px" }}>
                        Pick Your Hotel{" "}
                      </Typography>
                      <HotelRounded />
                    </Box>
                  )}

                  {hotelsLoading ? (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "green", marginRight: "10px" }}
                      >
                        Preparing Accommodation for you
                      </Typography>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Box>
                      {/* For hotels with date */}
                      {hotels.map((item, index) => (
                        <Box key={index} mb={4}>
                          {/* Display the date */}
                          <Typography variant="h6" mb={2}>
                            Hotels available on {item.date}
                          </Typography>

                          <Box display="flex" flexWrap="wrap" gap={2}>
                            {item.hotels.slice(0, 5).map((hotel, idx) => (
                              <DisplayCard
                                key={idx}
                                name={hotel.basicPropertyData.name}
                                imgUrl={
                                  hotel.basicPropertyData.photos
                                    ? hotel.basicPropertyData.photos.main
                                        .lowResJpegUrl.absoluteUrl
                                    : "https://st4.depositphotos.com/14953852/24787/v/1600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                                }
                                score={
                                  hotel.basicPropertyData.reviews.totalScore
                                }
                                location={hotel.basicPropertyData.location.city}
                              />
                            ))}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <div id="summaryDiv">
                    <h3>Overall Summary</h3>

                    <h3>Travel Assumptions</h3>
                    <p>
                      <strong>Allowed Travel Hours:</strong>{" "}
                      {`${formatTime(dailyStartTime)} to ${formatTime(
                        dailyEndTime
                      )}`}
                    </p>
                    <p>
                      <strong>
                        If travel time exceeds the allowed time, the remaining
                        journey will resume at {formatTime(dailyStartTime)} the
                        next day.
                      </strong>
                    </p>
                  </div>
                </>
              )}

              <Button onClick={() => setCount(0)} variant="outlined">
                <ArrowBackIos />
                Back
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SchedulePlan;
