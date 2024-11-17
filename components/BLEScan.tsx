import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Device } from 'react-native-ble-plx'

import Button from "@/components/Button";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { BLEService } from "@/services/BLEService";
import { cloneDeep } from "@/utils/cloneDeep";
import { BleDevice } from "@/components/BLEDevice";

type DeviceExtendedByUpdateTime = Device & { updateTimestamp: number }

const MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS = 5000
const VAPE_UUID = '6cd6c8b5-e378-0106-000a-1b9740683449'
const DISPLAY_UUID = '4116f8d2-9f66-4f58-a53d-fc7440e7c14e'

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

  const onConnectSuccess = () => {
    setIsConnecting(false)
  }

  const onConnectFail = () => {
    setIsConnecting(false)
  }

  return (
    <ThemedView>
      <Button
        title="Look for devices"
        onPress={() => {
          setFoundDevices([])

          async function scanDevices() {
            try {
              const isSupported = await BLEService.isBleSupported();
              if (isSupported) {
                BLEService.initializeBLE().then(() => BLEService.scanDevices(addFoundDevice, [VAPE_UUID, DISPLAY_UUID], true))
              }
            } catch (error) {
              console.log('error', error)
            }
          }

          scanDevices()
        }}
      />
      {foundDevices.map(device => (
        <div>
          {isConnecting ? <ActivityIndicator size="small" color='#ccc' /> : null}
          <BleDevice
            onPress={pickedDevice => {
              setIsConnecting(true)
              BLEService.connectToDevice(pickedDevice.id).then(onConnectSuccess).catch(onConnectFail)
            }}
            key={device.id}
            device={device}
          />
        </div>
      ))}
    </ThemedView>
  )
}
