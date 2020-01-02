/**
 * Adapter Pattern
 * 
 * A pattern that re-shape the given values to match the expected shape of the target.
 * 
 * For example, you have a microUSB charger cable, but the available charger port are USB-C. You need an adapter to port the microUSB to USB-C.
 */

const enum ChargerType {
  MICRO = 'micro-usb',
  USBC = 'usb-c'
}

interface Charger {
  type: ChargerType
}

const chargerCable: Charger = {
  type: ChargerType.MICRO
}

const chargerPort: Charger = {
  type: ChargerType.USBC
}

function connectCharger(cable: Charger, port: Charger) {
  return cable.type === port.type
}

function USBCAdapter (cable: Charger) {
  return {
    ...cable,
    type: ChargerType.USBC
  }
}

console.log('Connecting the charger cable to the charger port will fail by default', connectCharger(chargerCable, chargerPort))

console.log('Connecting the charger cable with adapter to the charger port will be success', connectCharger(USBCAdapter(chargerCable), chargerPort))