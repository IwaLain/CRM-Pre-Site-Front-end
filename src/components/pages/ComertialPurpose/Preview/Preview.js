import { Document, Page } from '@react-pdf/renderer'
import React from 'react'

const Previews = () => {
    return (
        <Document 
            file='sample.pdf'>
            <Page size="A4"/>
        </Document>
    )
}

export default Previews
