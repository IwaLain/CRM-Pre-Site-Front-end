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
    <Page wrap>
      <Image src="https://img.icons8.com/android/96/000000/phone.png" />
    </Page>
  </Document>
);

export default Previews