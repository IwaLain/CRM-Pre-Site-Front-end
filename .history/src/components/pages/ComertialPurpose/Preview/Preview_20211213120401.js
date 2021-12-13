import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { BASE_URL } from '../../../../js/api/constants';

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
      <Image src={BASE_URL + '/' + 'image/pdf/d3040739cbb290c87cc57521991582b45cf6db2d.pdf'} />
    </Page>
  </Document>
);

export default Previews