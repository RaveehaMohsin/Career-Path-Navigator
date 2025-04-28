import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "./JobsNearMe.css";
import UpperHeader from "../../UpperHeader/upperheader";

const JobsNearMe = () => {
  const userData = JSON.parse(localStorage.getItem("CareerPathNavigatorUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  const [companies, setCompanies] = useState([]);
  const [keyword, setKeyword] = useState("software company");
  const [manualLocation, setManualLocation] = useState("");
  const [locationError, setLocationError] = useState(null);
  const [map, setMap] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("map"); // 'map' or 'list'
  const filtersRef = useRef({
    rating: 0,
    openNow: false,
    distance: 5000,
    category: "",
  });
  const mapRef = useRef(null);
  const apiKey = "AIzaSyB-BYiXjUgVNktXygiwKBJnwmxkZdQX_ts";

  const fetchCompanies = (lat, lng, searchKeyword, filters) => {
    setIsLoading(true);
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const userLocation = new window.google.maps.LatLng(lat, lng);
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
        ],
      });
      setMap(mapInstance);

      new window.google.maps.Marker({
        position: userLocation,
        map: mapInstance,
        title: "Your Location",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      const service = new window.google.maps.places.PlacesService(mapInstance);

      const request = {
        location: userLocation,
        radius: parseInt(filters.distance || 5000, 10),
        keyword: searchKeyword,
      };

      service.nearbySearch(request, (results, status, pagination) => {
        setIsLoading(false);
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const filteredResults = results.filter(
            (place) =>
              place.rating >= filters.rating &&
              (!filters.openNow || place.opening_hours?.open_now) &&
              (filters.category
                ? place.types?.includes(filters.category)
                : true)
          );
          setCompanies(filteredResults);
          setPagination(pagination);

          results.forEach((place) => {
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map: mapInstance,
              title: place.name,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(30, 30),
              },
            });

            marker.addListener("click", () => {
              setSelectedCompany(place);
              mapInstance.setCenter(place.geometry.location);
              mapInstance.setZoom(15);
            });
          });
        } else {
          setLocationError(
            "No results found. Try a different keyword or increase the radius."
          );
        }
      });
    });
  };

  const geocodeLocation = (address) => {
    setIsLoading(true);
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          fetchCompanies(location.lat(), location.lng(), keyword, filtersRef.current);
        } else {
          setIsLoading(false);
          setLocationError(
            "Location not found. Please enter a valid area name"
          );
        }
      });
    });
  };

  const handleSearch = () => {
    setLocationError(null);
    if (manualLocation.trim()) {
      geocodeLocation(manualLocation);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchCompanies(coords.latitude, coords.longitude, keyword, filtersRef.current);
        },
        (err) => {
          console.error(err);
          setIsLoading(false);
          setLocationError("Location access denied.");
        }
      );
    } else {
      setIsLoading(false);
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e) => {
    const { name, type, value, checked } = e.target;
    filtersRef.current = {
      ...filtersRef.current,
      [name]: type === "checkbox" ? checked : value,
    };
  };

  const applyFilters = () => {
    handleSearch();
  };

  const loadMoreResults = () => {
    if (pagination && pagination.hasNextPage) {
      pagination.nextPage();
    }
  };

  return (
    <div>
    <UpperHeader title="Jobs Near You" name={username} />
    <div className={`jnm-container ${window.innerWidth > 1250 ? 'with-dashboard' : ''}`}>
      
      
      <div className="jnm-content">
        <h1 className="jnm-main-title">Discover Opportunities Around You</h1>
        <p className="jnm-subtitle">Find companies and job opportunities in your area</p>

        <div className="jnm-search-section">
          <div className="jnm-search-input-group">
            <label htmlFor="jnm-location">Location</label>
            <input
              id="jnm-location"
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="Enter your area (e.g. Johar Town, Lahore)"
              className="jnm-location-input"
            />
          </div>

          <div className="jnm-search-input-group">
            <label htmlFor="jnm-keyword">What are you looking for?</label>
            <input
              id="jnm-keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search keyword e.g. IT, tech, software..."
            />
          </div>

          <button className="jnm-search-btn" onClick={handleSearch}>
            {isLoading ? (
              <span className="jnm-spinner"></span>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        <div className="jnm-filters-section">
          <h3 className="jnm-filters-title">Refine Your Search</h3>
          <div className="jnm-filters-grid">
            <div className="jnm-filter-item">
              <label htmlFor="jnm-rating">Minimum Rating</label>
              <div className="jnm-rating-input">
                <input
                  type="range"
                  id="jnm-rating"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.5"
                  defaultValue="0"
                  onChange={handleFilterChange}
                />
                <span>{filtersRef.current.rating || 0} ★</span>
              </div>
            </div>

            <div className="jnm-filter-item">
              <label htmlFor="jnm-distance">Max Distance</label>
              <select
                id="jnm-distance"
                name="distance"
                defaultValue="5000"
                onChange={handleFilterChange}
              >
                <option value="1000">1 km</option>
                <option value="3000">3 km</option>
                <option value="5000">5 km</option>
                <option value="10000">10 km</option>
                <option value="20000">20 km</option>
              </select>
            </div>

            <div className="jnm-filter-item">
              <label htmlFor="jnm-category">Category</label>
              <select
                id="jnm-category"
                name="category"
                defaultValue=""
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="startup">Startups</option>
                <option value="it_park">IT Parks</option>
                <option value="internship_friendly">Internship Friendly</option>
              </select>
            </div>

            <div className="jnm-filter-item jnm-checkbox-item">
              <input
                type="checkbox"
                id="jnm-openNow"
                name="openNow"
                onChange={handleFilterChange}
              />
              <label htmlFor="jnm-openNow">Open Now</label>
            </div>

            <button className="jnm-apply-filters-btn" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </div>

        {locationError && (
          <div className="jnm-error-message">
            <i className="jnm-error-icon">⚠️</i>
            {locationError}
          </div>
        )}

        <div className="jnm-view-toggle">
          <button
            className={`jnm-toggle-btn ${activeTab === "map" ? "jnm-active" : ""}`}
            onClick={() => setActiveTab("map")}
          >
            Map View
          </button>
          <button
            className={`jnm-toggle-btn ${activeTab === "list" ? "jnm-active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            List View
          </button>
        </div>

        <div className={`jnm-map-container ${activeTab === "map" ? "jnm-active" : ""}`}>
          <div ref={mapRef} className="jnm-map-inner" />
        </div>

        <div className={`jnm-results-container ${activeTab === "list" ? "jnm-active" : ""}`}>
          {isLoading ? (
            <div className="jnm-loading-animation">
              <div className="jnm-spinner"></div>
              <p>Searching for companies in your area...</p>
            </div>
          ) : companies.length > 0 ? (
            <>
              <div className="jnm-companies-grid">
                {companies.map((company, index) => (
                  <div key={index} className="jnm-company-card">
                    <div className="jnm-company-image">
                      {company.photos && company.photos.length > 0 ? (
                        <img
                          src={company.photos[0].getUrl({ maxWidth: 400 })}
                          alt={company.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = company.icon;
                          }}
                        />
                      ) : (
                        company.icon && <img src={company.icon} alt={company.name} />
                      )}
                    </div>
                    <div className="jnm-company-info">
                      <h3 className="jnm-company-name">{company.name}</h3>
                      <p className="jnm-company-address">{company.vicinity}</p>
                      
                      <div className="jnm-company-meta">
                        {company.rating && (
                          <div className="jnm-company-rating">
                            <span className="jnm-stars">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={i < Math.floor(company.rating) ? "jnm-star jnm-filled" : "jnm-star"}>
                                  ★
                                </span>
                              ))}
                            </span>
                            <span className="jnm-rating-value">{company.rating}</span>
                          </div>
                        )}
                        
                        {company.opening_hours?.open_now && (
                          <div className="jnm-open-status jnm-open">
                            Open Now
                          </div>
                        )}
                      </div>
                      
                      <div className="jnm-company-actions">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            company.vicinity
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="jnm-action-btn jnm-directions-btn"
                        >
                          <i className="jnm-icon">📍</i> Directions
                        </a>
                        <button 
                          className="jnm-action-btn jnm-save-btn"
                          onClick={() => {/* Add save functionality */}}
                        >
                          <i className="jnm-icon">❤️</i> Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pagination && pagination.hasNextPage && (
                <div className="jnm-load-more-container">
                  <button onClick={loadMoreResults} className="jnm-load-more-button">
                    Show More Results
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="jnm-no-results">
              <img src="/images/no-results.svg" alt="No results found" />
              <h3>No companies found</h3>
              <p>Try adjusting your search filters or location</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default JobsNearMe;