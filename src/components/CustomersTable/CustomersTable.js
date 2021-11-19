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
          customers.map((customer) => {
            let progress = 0;
            if (customer.name) progress += 33.3;
            if (customer.facilities && customer.facilities.length > 0)
              progress += 33.3;
            if (customer.equipments && customer.equipments.length > 0)
              progress += 33.3;
            return (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>
                  <Progress value={progress} />
                </td>
                <td>
                  <Link to={`/dashboard/customers/${customer.id}`}>View</Link>
                </td>
              </tr>
            );
          })
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
