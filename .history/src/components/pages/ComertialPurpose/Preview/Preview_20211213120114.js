import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const Previews = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
        
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
      <Image src='../../../../assets/img/0f2e9792efcf90c199ac516320a35374317c1ce6.png'/>
    </Page>
  </Document>
);

export default Previews