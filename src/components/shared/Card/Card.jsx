import classNames from "classnames";
import React, { useState } from "react";
import "./Card.scss";
const Card = ({ title, trailing, children, tabs }) => {
  const [active, setactive] = useState(tabs && tabs[0].key);

  const handleChange = (tab) => setactive(tab.key);
  return (
    <div className="card card-wrapper">
      <div className="card-header">
        {title && !tabs && <h2>{title}</h2>}
        {tabs && <h2> {tabs.find((_) => _.key == active).label}</h2>}
        {trailing}
        {tabs && (
          <ul className="list-unstyled card-tabs">
            {tabs.map((tab) => (
              <li
                key={tab.label}
                className={classNames(active == tab.key && "active")}
                onClick={() => handleChange(tab)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
