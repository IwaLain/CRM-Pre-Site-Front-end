import React from 'react'
import { Button, Col, Input, Row } from 'reactstrap';
import '../Users.scss'

const FilterComponent = ({ filterText, onFilter }) => (
    <Row className='user__filter'>
        <Col md={8} className='d-flex'>
            <Input
                id="search"
                type="text"
                className='form-constrol'
                placeholder="Filter table data..."
                value={filterText}
                onChange={onFilter}
            />
        </Col>
    </Row>
  );
  
  export default FilterComponent;