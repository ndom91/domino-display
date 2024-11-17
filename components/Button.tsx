import { Text, Pressable, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import tw from "twrnc"

interface ButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  style?: any;
}

export default function Button({ onPress, title, isLoading, style }: ButtonProps) {
  const brandColor = useThemeColor('brandColor');
  const brandContrast = useThemeColor('brandContrast');

  return (
    <Pressable
      onPress={onPress}
      style={tw.style(`rounded-md py-3 bg-[${brandColor}] gap-2 items-center w-full flex flex-row flex-1 justify-center`, style)}
    >
      {isLoading ? <ActivityIndicator size="small" color={brandContrast} /> : null}
      <Text style={tw`font-bold`}>{title}</Text>
    </Pressable>
  )
}
