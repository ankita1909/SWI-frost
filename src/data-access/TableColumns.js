export const TableColumnsToDisplay = {
    Datastreams: ["@iot.id", "name", "description", "observationType", "unitOfMeasurement"],
    MultiDataStreams: [],
    FeaturesOfInterest: ["name", "description", "encodingType", "feature"],
    HistoricalLocations: ["time"],
    Locations: ["name", "description", "@iot.selfLink"],
    Observations: ["phenomenonTime", "resultTime", "result"],
    ObservedProperties: ["@iot.id", "name", "definition", "description", "@iot.selfLink"],
    Sensors: ["@iot.id", "name", "metadata", "description", "encodingType"],
    Things: ["@iot.id", "name", "description"]
}