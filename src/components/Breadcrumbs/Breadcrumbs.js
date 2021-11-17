import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { Link } from "react-router-dom";
import "./breadcrumbs.scss";

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav className="breadcrumbs">
      {breadcrumbs &&
        breadcrumbs.map(({ breadcrumb, match }, index) => {
          return (
            <div key={match.url} className="breadcrumbs__breadcrumb-item">
              <Link to={match.url || ""}>{breadcrumb}</Link>
              {index < breadcrumbs.length - 1 && (
                <span className="breadcrumbs__divider">-</span>
              )}
            </div>
          );
        })}
    </nav>
  );
};

export default withBreadcrumbs()(Breadcrumbs);
