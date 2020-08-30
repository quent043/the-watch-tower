export class MagicSeaWeedDetailSpot {

    mswId: number; 
    fetchedData: {

        localTimestamp: Number,
        swell: {
                unit: String,
                components: {
                    combined: {
                        height: Number,
                        period: Number,
                        direction: Number,
                        compassDirection: String
                    }}
                }
        wind: {
                    speed: number,
                    direction: number,
                    compassDirection: String,
                    gusts: number,
                    unit: String
                },
        condition: {
                
                    temperature: number,
                    weather: String,
                
                    unit: String
                },
    }

  
  constructor(mswId, localTimestamp, swellUnit, swellHeight, swellPeriod, swellDirection, swellCompassDirection,
    windSpeed, windDirection, windCompassDirection, windGusts, windUnit, temperature, weather, weatherUnit) {

        this.mswId = mswId,
        this.fetchedData.localTimestamp = localTimestamp,
        this.fetchedData.swell.unit = swellUnit,
        this.fetchedData.swell.components.combined.height = swellHeight,
        this.fetchedData.swell.components.combined.period = swellPeriod,
        this.fetchedData.swell.components.combined.direction = swellDirection,
        this.fetchedData.swell.components.combined.compassDirection = swellCompassDirection,
        this.fetchedData.wind.speed = windSpeed,
        this.fetchedData.wind.direction = windDirection,
        this.fetchedData.wind.compassDirection = windCompassDirection,
        this.fetchedData.wind.gusts = windGusts,
        this.fetchedData.wind.unit = windUnit,
        this.fetchedData.condition.temperature = temperature,
        this.fetchedData.condition.weather = weather,
        this.fetchedData.condition.unit = weatherUnit

  };

}
    // timeStamp: number;
    // swellHeight: number;
    // swellDirection: String;
    // swellPeriod: Number;
    // windSpeed: Number;
    // windDirection: String;

    // constructor (mswId, timeStamp, swellHeight, swellDirection, swellPeriod, windSpeed, windDirection) {
    //     this.mswId = mswId,
    //     this.timeStamp = timeStamp,
    //     this.swellHeight = swellHeight,
    //     this.swellDirection = swellDirection,
    //     this.swellPeriod = swellPeriod,
    //     this.windSpeed = windSpeed,
    //     this.windDirection = windDirection
    

    /*Données que je garde:
    "localTimestamp,
    "swell": {
            "unit": "m",
            "components": {
                "combined": {
                    "height": 0.7,
                    "period": 10,
                    "direction": 100.39,
                    "compassDirection": "W"
                },
"wind": {
            "speed": 28,
            "direction": 248,
            "compassDirection": "ENE",
            "gusts": 44,
            "unit": "kph"
        },
 "condition": {
           
            "temperature": 18,
            "weather": "10",
           
            "unit": "c"
        },

                */

// }