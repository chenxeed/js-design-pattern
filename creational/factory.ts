
/**
 * Factory Method Pattern
 * 
 * A pattern to create a predefined object instances from the factory.
 * 
 * For example, we would like to build a car. We can make a factory for each sparepart, and lastly we make a Car factory that makes use of the spareparts factory.
 */

/**
 * First, let's build the sparepart factories. Let's say there are Tyre and Body sparepart.
 */

interface TyreProps {
  color: string,
  airPressure: number
}

function TyreFactory (props: TyreProps) {
  const state = { ...props }

  return {
    getColor () {
      return state.color
    },
    getAirPressure () {
      return state.airPressure
    },
    canRun (turn = 0) {
      return state.airPressure - turn > 0
    },
    rotate (turn: number) {
      if ( state.airPressure - turn < 0 ) {
        throw new Error('Rotate failed, not enough air pressure!')
      }
      state.airPressure -= turn
    }
  }
}

interface BodyProps {
  color: string,
  tyreSlot: number
}

function BodyFactory (props: BodyProps) {
  const state = { ...props }

  return {
    getColor () {
      return state.color
    },
    getTyreSlot () {
      return state.tyreSlot
    }
  }
}

/**
 * Then, to build a car, it needs to have 4 tyres and a body. Let's build the factory for the Car
 */

interface CarProps {
  tyre: TyreProps,
  body: BodyProps
}

function CarFactory (props: CarProps) {
  const tyreProps = props.tyre
  const bodyProps = props.body

  // generate tyres based on the tyre slot in the body
  const tyres = [...Array(bodyProps.tyreSlot)].map(() => TyreFactory(tyreProps))

  const state = {
    tyres,
    body: BodyFactory(bodyProps),
    distance: 0
  }


  return {
    run (distance: number) {
      // validate if all the wheel is working before start running
      const checkRun = state.tyres.filter(tyre => tyre.canRun(distance))
      if (checkRun.length === state.tyres.length) {
        // rotate each wheel, then increment the distance
        state.tyres.forEach(tyre => tyre.rotate(distance))
        state.distance += distance
        return true
      } else {
        return false
      }
    },
    getDistance () {
      return state.distance
    },
    getTyrePressure () {
      return state.tyres.map(tyre => tyre.getAirPressure())
    }
  }
}

/**
 * Let's build a car and try to run it, then check the distance
 */
const carA = CarFactory({
  tyre: {
    color: 'black',
    airPressure: 1000
  },
  body: {
    color: 'blue',
    tyreSlot: 4
  }
})

console.log('Check if the car successfully runs', carA.run(200))
console.log('Check if the car distance moved', carA.getDistance() === 200)
console.log('Check if the tyre air pressure updated', carA.getTyrePressure().filter(pressure => pressure === 800).length === 4)

console.log('Check if the car failed to run because the distance exceeds the tyre air pressure', carA.run(900))
