import { View, Text, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello from the 3D mobile test!</Text>

      {/* Option 1: Using Link component */}
      <Link href="/three-cube">
        <Text style={{ marginTop: 20, color: 'blue' }}>Go to 3D Cube</Text>
      </Link>

      {/* Option 2: Using a button and router.push */}
      <Button title="Go to 3D Cube" onPress={() => router.push('/three-cube')} />
    </View>
  );
}
