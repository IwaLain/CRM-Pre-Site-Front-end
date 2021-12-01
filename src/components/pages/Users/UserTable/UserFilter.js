import React from 'react'
import { Button, Col, Input, Row } from 'reactstrap';
import '../Users.scss'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <Row className='user__filter'>
        <Col className='d-flex'>
            <Input
                id="search"
                type="text"
                className='form-constrol'
                placeholder="Filter table data..."
                value={filterText}
                onChange={onFilter}
            />
            <Button onClick={onClear}>X</Button>
        </Col>
    </Row>
  );
  
  export default FilterComponent;