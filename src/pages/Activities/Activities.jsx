import moment from "moment";
import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../components/shared/TableLoadingRow";
import TitleWithBackButton from "../../components/shared/TitleWithBackButton/TitleWithBackButton";
import userService from "../../services/user.service";
import CustomPagination from "../../components/shared/Pagination/Pagination";
import { useTranslation } from "react-i18next";
const Activities = () => {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [activities, setactivities] = useState([]);
  const [pageInfo, setpageInfo] = useState({});
  const [query, setquery] = useState({
    limit: 10,
    page: 1,
  });
  useEffect(() => {
    (async function () {
      setloading(true);

      try {
        const { result } = await userService.getUserActivities(query);
        setactivities(result.docs);
        setpageInfo(result);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, [query]);
  return (
    <section className="section">
      <TitleWithBackButton
        path="/profile"
        title={t("activities.title")}
        name={t("activities.go_back")}
      />
      <div className="table-responsive">
        <table className="table table-borderless custom-shadow">
          <thead>
            <tr>
              <th scope="col">{t("activities.table.headers.activity")}</th>
              <th scope="col" className="text-end" align="end">
                {t("activities.table.headers.date_time")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && <TableLoadingRow colSpan={2} />}
            {activities.map((a) => (
              <tr>
                <td>{a.description}</td>
                <td align="end">
                  {moment(a.createdAt).format("MMMM Do YYYY, h:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomPagination
        totalPages={pageInfo.totalPages ?? 0}
        currentPage={query.page}
        onChangePage={(page) => setquery({ ...query, page })}
        maxPagesToShow={4}
      />
    </section>
  );
};

export default Activities;
