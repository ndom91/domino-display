import { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { BLEService } from "@/services/BLEService";
import { Device } from 'react-native-ble-plx'

import { Button } from "react-native";
import { cloneDeep } from "@/utils/cloneDeep";

type DeviceExtendedByUpdateTime = Device & { updateTimestamp: number }

const MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS = 5000

export default function BluetoothScan() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [foundDevices, setFoundDevices] = useState<DeviceExtendedByUpdateTime[]>([])

  const addFoundDevice = (device: Device) =>
    setFoundDevices(prevState => {
      if (!isFoundDeviceUpdateNecessary(prevState, device)) {
        return prevState
      }
      // deep clone
      const nextState = cloneDeep(prevState)
      const extendedDevice: DeviceExtendedByUpdateTime = {
        ...device,
        updateTimestamp: Date.now() + MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS
      } as DeviceExtendedByUpdateTime

      const indexToReplace = nextState.findIndex(currentDevice => currentDevice.id === device.id)
      if (indexToReplace === -1) {
        return nextState.concat(extendedDevice)
      }
      nextState[indexToReplace] = extendedDevice
      return nextState
    })

  const isFoundDeviceUpdateNecessary = (currentDevices: DeviceExtendedByUpdateTime[], updatedDevice: Device) => {
    const currentDevice = currentDevices.find(({ id }) => updatedDevice.id === id)
    if (!currentDevice) {
      return true
    }
    return currentDevice.updateTimestamp < Date.now()
  }

  return (
    <ThemedView>
      <ThemedText>Bluetooth Scanning</ThemedText>
      <Button
        title="Look for devices"
        onPress={() => {
          setFoundDevices([])

          async function scanDevices() {
            try {
              const isSupported = await BLEService.isBleSupported();
              if (isSupported) {
                BLEService.initializeBLE().then(() => BLEService.scanDevices(addFoundDevice, null, true))
              }
            } catch (error) {
              console.log('error', error)
            }
          }

          scanDevices()
        }}
      />
      {foundDevices.map(device => (
        <ThemedText>{JSON.stringify(device, null, 2)}</ThemedText>
      ))}
    </ThemedView>

  )
}
