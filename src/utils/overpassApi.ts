export interface POI {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    amenity?: string;
    building?: string;
    office?: string;
    [key: string]: string | undefined;
  };
  type: "hospital" | "police" | "education" | "transport" | "tech" | "unknown";
}

// Bounding box: south, west, north, east
export const fetchPOIs = async (s: number, w: number, n: number, e: number): Promise<POI[] | null> => {
  // Query for hospitals, police, schools, and transport hubs
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"hospital|clinic"](${s},${w},${n},${e});
      node["amenity"~"police"](${s},${w},${n},${e});
      node["amenity"~"school|college|university"](${s},${w},${n},${e});
      node["amenity"~"bus_station|train_station"](${s},${w},${n},${e});
      node["building"~"commercial|office"](${s},${w},${n},${e});
      node["office"~"it|company"](${s},${w},${n},${e});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `data=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Process and categorize results
    const pois: POI[] = data.elements
      .filter((el: any) => el.type === "node" && el.tags)
      .map((el: any) => {
        let type: POI["type"] = "unknown";
        const amenity = el.tags.amenity || "";
        const building = el.tags.building || "";
        const office = el.tags.office || "";

        if (amenity.match(/hospital|clinic/)) type = "hospital";
        else if (amenity === "police") type = "police";
        else if (amenity.match(/school|college|university/)) type = "education";
        else if (amenity.match(/bus_station|train_station/)) type = "transport";
        else if (building.match(/commercial|office/) || office.match(/it|company/)) type = "tech";

        // Ignore unknown POIs to reduce clutter
        if (type === "unknown") return null;

        return {
          id: el.id,
          lat: el.lat,
          lon: el.lon,
          tags: el.tags,
          type
        };
      })
      .filter(Boolean) as POI[];

    return pois;
  } catch (error) {
    console.error("Failed to fetch POIs:", error);
    return null; // Return null to indicate an error (e.g. rate limit)
  }
};
