
/**
 * Builder Method Pattern
 * 
 * A pattern to let the user build the object by running the builder functionality.
 * 
 * For example, we would like to build a car. We can run the builder function of the car builder to produce a car
 */

/**
 * First, let's build the sparepart builder. Let's say there are Tyre and Body sparepart.
 */

 interface TyreState {
   color: string,
   airPressure: number
 }

function TyreBuilder () {
  const state = {
    color: '',
    airPressure: 0
  }

  return {
    setColor (color: TyreState['color']) {
      state.color = color
    },
    setAirPressure (airPressure: TyreState['airPressure']) {
      state.airPressure = airPressure
    },
    getTyre () {
      return state
    }
  }
}

interface BodyState {
  color: string,
  tyreSlot: number
}

// pun intended ;)
function BodyBuilder () {
  const state: BodyState = {
    color: '',
    tyreSlot: 0
  }

  return {
    setColor (color: BodyState['color']) {
      state.color = color
    },
    setTyreSlot (slot: BodyState['tyreSlot']) {
      state.tyreSlot = slot
    },
    getBody () {
      return state
    }
  }
}

/**
 * Then, to build a car, it needs to have some tyres and a body. Let's build the builder for the Car
 */

interface CarState {
  tyres: TyreState[],
  body: BodyState | undefined
}

function CarBuilder () {

  const state: CarState = {
    tyres: [],
    body: undefined
  }


  return {
    setBody (body: BodyState) {
      state.body = body
    },
    setTyres (tyres: TyreState[]) {
      state.tyres = tyres
    },
    getCar () {
      return state
    }
  }
}

/**
 * Let's build the sparepart and the car
 */

const tyreCount = 4

const tyres = [...Array(tyreCount)].map(() => {
  const tyreBuilder = TyreBuilder()
  tyreBuilder.setColor('grey')
  tyreBuilder.setAirPressure(1000)
  return tyreBuilder.getTyre()  
})

const bodyBuilder = BodyBuilder()
bodyBuilder.setColor('blue')
bodyBuilder.setTyreSlot(4)
const body = bodyBuilder.getBody()

const carBuilder = CarBuilder()
carBuilder.setBody(body)
carBuilder.setTyres(tyres)
const car = carBuilder.getCar()

console.log('Check if the car tyres successfully build', car.tyres)
console.log('Check if the car body successfully build', car.body)
