  import { Tabs } from 'expo-router';

  export default function TabLayout() {
    return (
      <Tabs
        screenOptions={{
          headerShown: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="favs"
          options={{
            title: 'Favoritos',
          }}/>
          <Tabs.Screen
          name="personagens"
          options={{
            href: '/personagens',
          }}/>
      </Tabs> 
    );
  }