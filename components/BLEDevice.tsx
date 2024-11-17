import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import { Device } from 'react-native-ble-plx'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export type DevicePropertyProps = {
  name: string
  value?: number | string | null
}

function DeviceProperty({ name, value }: DevicePropertyProps) {
  return (
    <ThemedView>
      <ThemedText>{name}:</ThemedText>
      <ThemedText>{value ?? '-'}</ThemedText>
    </ThemedView>
  )
}

export type BleDeviceProps = {
  onPress: (device: Device) => void
  device: Device
}

export function BleDevice({ device, onPress }: BleDeviceProps) {
  const isConnectableInfoValueIsUnavailable = typeof device.isConnectable !== 'boolean'
  const isConnectableValue = device.isConnectable ? 'true' : 'false'
  const parsedIsConnectable = isConnectableInfoValueIsUnavailable ? '-' : isConnectableValue

  return (
    <Pressable onPress={() => onPress(device)} style={styles.container}>
      <DeviceProperty name="name" value={device.name} />
      <DeviceProperty name="localName" value={device.localName} />
      <DeviceProperty name="id" value={device.id} />
      <DeviceProperty name="manufacturerData" value={device.manufacturerData} />
      <DeviceProperty name="rawScanRecord" value={device.rawScanRecord} />
      <DeviceProperty name="isConnectable" value={parsedIsConnectable} />
      <DeviceProperty name="mtu" value={device.mtu.toString()} />
      <DeviceProperty name="rssi" value={device.rssi} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#475569',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
})
