import React, { useEffect, useState } from "react";

import _ from "lodash";
import ibService from "../../services/ib.service";
import SelectGroup from "../../components/shared/SelectGroup/SelectGroup";
import TableLoadingRow from "../../components/shared/TableLoadingRow";
import { useSelector } from "react-redux";
import CopyIcon from "../../assets/icons/copy.png";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const IBStructures = () => {
  const { t } = useTranslation()
  const [loading, setloading] = useState(false);
  const [structures, setStructures] = useState([]);
  const [selectedStructureId, setselectedStructureId] = useState("");
  const [selectedMemeberId, setselectedMemeberId] = useState("");
  const currentUser = useSelector((state) => state.user);
  useEffect(() => {
    (async function () {
      setloading(true);
      try {
        const { result } = await ibService.getStructures();
        setselectedStructureId(result[0]._id);
        setStructures(result);
        setselectedMemeberId(result[0].members[0].customerId._id);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, []);

  const loadingIndicator = (
    <div className="spinner-border spinner-border-sm" role="status"></div>
  );
  const selectedStructure = structures.find(
    (s) => s._id == selectedStructureId
  );
  const selectedMember = selectedStructure?.members.find(
    (m) => m.customerId._id == selectedMemeberId
  );
  return (
    <section className="section account-summary">
      <h5 className="heading mb-3"> {t('ib_portal.structures.title')}</h5>
      <div className="row mb-4">
        <div className="col-12 col-md-4 col-lg-3 col-xl-2">
          <SelectGroup
            loading={loading}
            options={structures}
            name="structure"
            valueText="_id"
            hasInitial={false}
            onChange={(e) => setselectedStructureId(e.target.value)}
            value={selectedStructureId}
          // errors={errors}
          // onChange={handleChange}
          />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="heading mb-3"> {t('ib_portal.structures.dedicated_links.title')}</h5>
        {/* <SelectGroup
          loading={loading}
          options={structures}
          name="structure"
          valueText="_id"
          hasInitial={false}
          className="d-none d-md-block"
          onChange={(e) => setselectedStructureId(e.target.value)}
          value={selectedStructureId}
          // errors={errors}
          // onChange={handleChange}
        /> */}
      </div>

      <div>
        <div className="table-responsive">
          <table className="table table-borderless custom-shadow">
            <thead>
              <tr>
                <th scope="col">{t('ib_portal.structures.dedicated_links.table.headings.account_type')}</th>
                <th scope="col">{t('ib_portal.structures.dedicated_links.table.headings.approved')}</th>
                <th scope="col" className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableLoadingRow colSpan={3} />}
              {!loading && structures.length > 0 && (
                <>
                  <tr>
                    <td>{t('ib_portal.structures.dedicated_links.table.headings.register_demo')}</td>
                    <td>{`${import.meta.env.VITE_ACCUINDEX_URL}/register-demo?ibRef=${selectedStructure.recordId}&ibId=${currentUser.recordId}`}</td>

                    <td align="end">
                      <img
                        src={CopyIcon}
                        alt=""
                        width={14}
                        className="pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${import.meta.env.VITE_ACCUINDEX_URL}/register-demo?ibRef=${selectedStructure.recordId}&ibId=${currentUser.recordId}`
                          );
                          toast.info("Copied to clipboard");
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{t('ib_portal.structures.dedicated_links.table.headings.register_live')}</td>
                    <td>{`${import.meta.env.VITE_ACCUINDEX_URL}/register-live?ibRef=${selectedStructure.recordId}&ibId=${currentUser.recordId}`}</td>

                    <td align="end">
                      <img
                        src={CopyIcon}
                        alt=""
                        width={14}
                        className="pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${import.meta.env.VITE_ACCUINDEX_URL}/register-live?ibRef=${selectedStructure.recordId}&ibId=${currentUser.recordId}`
                          );
                          toast.info("Copied to clipboard");
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{t('ib_portal.structures.dedicated_links.table.headings.register_ib')}</td>
                    <td>{`${import.meta.env.VITE_ACCUINDEX_URL}/partner?ibRef=${selectedStructure.recordId}&ibId=${currentUser.recordId}`}</td>

                    <td align="end">
                      <img
                        src={CopyIcon}
                        alt=""
                        width={14}
                        className="pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${import.meta.env.VITE_ACCUINDEX_URL}/partner?ibRef=${selectedStructure.recordId}&ibId=${currentUser.recordId}`
                          );
                          toast.info(t('ib_portal.structures.dedicated_links.copied'));
                        }}
                      />
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        {selectedStructure && selectedStructure.totals.length > 0 && (
          <>
            <h5 className="heading mb-3 mt-4">{t('ib_portal.structures.structure_details.title')}</h5>
            <div className="table-responsive">
              <table className="table table-borderless custom-shadow">
                <thead>
                  <tr>
                    <th scope="col">{t('ib_portal.structures.structure_details.table.headings.account_type')}</th>
                    <th scope="col">{t('ib_portal.structures.structure_details.table.headings.total_repate')}</th>
                    <th scope="col">{t('ib_portal.structures.structure_details.table.headings.total_commission')}</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && <TableLoadingRow colSpan={3} />}
                  {!loading &&
                    selectedStructure &&
                    selectedStructure.totals.map((acc) => (
                      <tr>
                        <td className="fw-bold">{acc.accountTypeName}</td>
                        <td>{acc.rebate}</td>
                        <td>{acc.commission}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="d-flex align-items-center justify-content-between mt-3">
          <h5 className="heading mb-3">{t('ib_portal.structures.structure_members.title')}</h5>
          <SelectGroup
            loading={loading}
            options={selectedStructure?.members ?? []}
            valueText="mt5Account"
            generateTitleText={(o) =>
              `${o.customerId.firstName} (${o.mt5Account})`
            }
            generateValueText={(o) => o.customerId._id}
            name="accountNumber"
            hasInitial={false}
            onChange={(e) => setselectedMemeberId(e.target.value)}
            value={selectedMemeberId}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-borderless custom-shadow">
            <thead>
              <tr>
                <th scope="col">{t('ib_portal.structures.structure_details.table.headings.account_type')}</th>
                <th scope="col">{t('ib_portal.structures.structure_details.table.headings.total_repate')}</th>
                <th scope="col">{t('ib_portal.structures.structure_details.table.headings.total_commission')}</th>
              </tr>
            </thead>

            <tbody>
              {loading && <TableLoadingRow colSpan={3} />}
              {!loading && selectedMember?.values.length == 0 && (
                <tr>
                  <td colSpan={10} className="text-md-center">
                    {t('ib_portal.structures.structure_details.table.body.empty_members')}
                  </td>
                </tr>
              )}
              {!loading &&
                selectedStructure &&
                selectedMember.values.map((v) => (
                  <>
                    <tr>
                      <td className="fw-bold">{v.accountTypeName}</td>
                      <td>{v.forex.rebate}</td>
                      <td>{v.forex.commission}</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default IBStructures;
