import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function PlaylistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lover</Text>
      <FlatList
        style={styles.list}
        data={[
          { key: 'I Forgot That You Existed' },
          { key: 'Cruel Summer' },
          { key: 'Lover' },
          { key: 'The Man' },
          { key: 'The Archer' },
          { key: 'I Think He Knows' },
          { key: 'Miss Americana & The Heartbreak Prince' },
          { key: 'Paper Rings' },
          { key: 'Cornelia Street' }
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  list: {
    paddingTop: 20
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40
  }
});
