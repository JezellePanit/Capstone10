import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="menu" />
      <Stack.Screen name="about" />
      <Stack.Screen name="chatscreen" />
      <Stack.Screen name="comments" />
    </Stack>
  );
}