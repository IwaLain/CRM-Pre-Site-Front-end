import { Table, Progress } from "reactstrap";
import { Link } from "react-router-dom";

const CustomersTable = ({ customers }) => {
  return (
    <Table style={{ width: "100%", verticalAlign: "middle" }}>
      <thead>
        <tr>
          <th style={{ width: "45%" }}>Name</th>
          <th style={{ width: "45%" }}>Progress</th>
        </tr>
      </thead>
      <tbody>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>
                <Progress value={customer.status * 100} />
              </td>
              <td>
                <Link to={`/dashboard/customer/${customer.id}`}>View</Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              No customers found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CustomersTable;
