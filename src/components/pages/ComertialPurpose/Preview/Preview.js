import { Document, Page } from '@react-pdf/renderer'
import React from 'react'

const Previews = () => {
    return (
        <Document 
            file='../../../../assets/img/sample.pdf'
            options={{ workerSrc: "/pdf.worker.js" }}>
            <Page size="A4"/>
        </Document>
    )
}

export default Previews
