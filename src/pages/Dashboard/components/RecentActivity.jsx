import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableLoadingRow from "../../../components/shared/TableLoadingRow";
import userService from "../../../services/user.service";
import { useTranslation } from "react-i18next";

const RecentActivities = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);

  const [activities, setactivities] = useState([]);
  useEffect(() => {
    (async function () {
      setloading(true);

      try {
        const { result } = await userService.getUserActivities();
        setactivities(result.docs.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, []);

  return (
    <section className="section">
      <div className="d-flex align-items-end justify-content-between">
        <h5 className="heading">{t("dashboard.recent_activity.title")}</h5>

        <Link to="/activities" className="btn bg-white border rounded-0 mb-3">
          {t("dashboard.recent_activity.cta")}
        </Link>
      </div>
      <div className="card table-responsive">
        <table className="table table-borderless custom-shadow mb-0">
          <tbody>
            {loading && <TableLoadingRow colSpan={3} />}

            {activities.map((a, i) => (
              <tr key={a._id}>
                <td width={200}>{moment(a.createdAt).format("MMM Do YY")}</td>
                <td>{a.description}</td>
                <td align="end" className="text-primary fw-bold">
                  {t(a.status.toString())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentActivities;
