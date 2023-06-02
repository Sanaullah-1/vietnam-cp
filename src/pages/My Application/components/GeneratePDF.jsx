import React from 'react';
import { languages as languageList } from '../../../utils/myApplications';
import jsPDF from 'jspdf';
import { formatNumber } from '../../../utils/myApplications';
import './style.scss';
import logoAC from '../../../assets/images/logo.png';
import CHECKBOX from '../../../assets/icons/check.png';
import DownloadIcon from "../../../assets/icons/download-file.png";
import './Bulgatti-normal';
import './Cairo-normal';
import './Cairo-bold';
import { getCustomerType } from '../../../utils/myApplications';
const GeneratePDFFrom = (props) => {
    const { client, heading, isIb } = props;
    const {
        title,
        email,
        firstName,
        lastName,
        phone,
        address,
        language,
        dob,
        nationality,
        annualIncome,
        sourceOfFunds,
        employmentDetails,
        gender,
        notUSCitizen,
        workedInFinancialServices,
        taxIdentificationNumber,
        idDetails,
        declarations,
        ibDeclarations,
        ibQuestionnaire,
        clientType
    } = client;

    const [clientTypes, setClientTypes] = React.useState({})

    React.useEffect(() => {
        if (clientType) {
            setClientTypes(getCustomerType(clientType))
        }
    }, [clientType])
    const ref = isIb ? 'ibRef' : 'ref'

    const lang = languageList.find((v) => v.value === language);

    const generatePdf = () => {
        const element = document.getElementById(ref);

        const pdf = new jsPDF({
            unit: 'px',
            format: 'a4',
            userUnit: 'px',
            compressPdf: true,
            filters: ['ASCIIHexEncode']
        });
        pdf
            .html(element, {
                margin: [10, 5, 20, 5],
                html2canvas: {
                    scale: 0.52,
                    fontFaces: [
                        {
                            family: 'Bulgatti',
                            style: 'normal',
                            weight: 400
                        },
                        {
                            family: 'Cairo',
                            style: 'normal',
                            weight: 400
                        },
                        {
                            family: 'Cairo',
                            style: 'bold',
                            weight: 600
                        }
                    ]
                }
            })
            .then(() => {
                pdf.save(
                    `client-${firstName}.pdf`
                    
                    
                    // -${!isIb
                    //     ? clientTypes && !clientTypes.isCorporate
                    //         ? 'Individual'
                    //         : 'Corporate '
                    //     : 'SubIb'
                    // }.pdf`
                );
            });
    };

    return (
        <>
            <div className="hidden">
                <div id={ref} className="ref">
                    <div className="pdf-container p-4">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <img alt="..." className="logo" src={logoAC} />
                                </div>
                                <div className="col-9 text-center">
                                    <h4>{`Online ${heading}`}</h4>
                                </div>
                            </div>
                        </div>

                        <div className="topBar">
                            <h5>General Information</h5>
                        </div>

                        {clientTypes && !clientTypes.isCorporate ? (
                            <div className="rowC row6">
                                <div className="col left">Title:</div>
                                <div className="col">
                                    <div className="border-b">{title}</div>
                                </div>
                                <div className="col">First Name:</div>
                                <div className="col">
                                    <div className="border-b">{firstName}</div>
                                </div>
                                <div className="col">Last Name:</div>
                                <div className="col">
                                    <div className="border-b">{lastName}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="rowC row2">
                                <div className="col left">Company Name:</div>
                                <div className="col">
                                    <div className="border-b">{firstName}</div>
                                </div>
                            </div>
                        )}

                        <div className="rowC row4">
                            {clientType && clientType !== 8 && (
                                <>
                                    <div className="col left"> Home Phone: </div>
                                    <div className="col">
                                        <div className="border-b">none</div>
                                    </div>
                                </>
                            )}
                            {clientTypes && clientTypes.isCorporate && (
                                <>
                                    <div className="col left">Company Email:</div>
                                    <div className="col">
                                        <div className="border-b">{email}</div>
                                    </div>
                                </>
                            )}
                            <div className="col">Cell Phone: </div>
                            <div className="col">
                                <div className="border-b">{phone}</div>
                            </div>
                        </div>

                        <div className="rowC row4">
                            {clientTypes && !clientTypes.isCorporate ? (
                                <>
                                    <div className="col left">Email:</div>
                                    <div className="col">
                                        <div className="border-b">{email}</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col left">Country Of Incorporation:</div>
                                    <div className="col">
                                        <div className="border-b">{client.countryResidency}</div>
                                    </div>
                                </>
                            )}

                            <div className="col">
                                {clientTypes && !clientTypes.isCorporate
                                    ? 'Date of Birth:'
                                    : 'Date of incorportaion'}{' '}
                            </div>
                            <div className="col">
                                <div className="border-b">{dob}</div>
                            </div>
                        </div>

                        {clientTypes && !clientTypes.isCorporate ? (
                            <>
                                <div className="rowC row2">
                                    <div className="col left">Address:</div>
                                    <div className="col left">
                                        <div className="border-b">{address}</div>
                                    </div>
                                </div>

                                <div className="rowC row4">
                                    <div className="col left">Nationality:</div>
                                    <div className="col">
                                        <div className="border-b">{nationality}</div>
                                    </div>
                                    <div className="col">Language: </div>
                                    <div className="col">
                                        <div className="border-b">{lang && lang.name}</div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="rowC row2">
                                    <div className="col left">Registered Address:</div>
                                    <div className="col left">
                                        <div className="border-b">
                                            {client.corporateInfo.registeredAddress.address}{' '}
                                            {client.corporateInfo.registeredAddress.city
                                                ? `, ${client.corporateInfo.registeredAddress.city} ,`
                                                : ''}{' '}
                                            {client.corporateInfo.registeredAddress.country
                                                ? `${client.corporateInfo.registeredAddress.country} ,`
                                                : ''}{' '}
                                            {client.corporateInfo.registeredAddress.zipCode
                                                ? `${client.corporateInfo.registeredAddress.zipCode}`
                                                : ''}
                                        </div>
                                    </div>
                                </div>

                                <div className="rowC row2">
                                    <div className="col left">Head Quarters Address:</div>
                                    <div className="col left">
                                        <div className="border-b">
                                            {client.corporateInfo.sameAddress
                                                ? `${client.corporateInfo.registeredAddress.address}${client.corporateInfo.registeredAddress.city != ''
                                                    ? ', ' +
                                                    client.corporateInfo.registeredAddress.city
                                                    : ''
                                                }${client.corporateInfo.registeredAddress.country != ''
                                                    ? ', ' +
                                                    client.corporateInfo.registeredAddress.country
                                                    : ''
                                                }${client.corporateInfo.registeredAddress.zipCode != ''
                                                    ? ', ' +
                                                    client.corporateInfo.registeredAddress.zipCode
                                                    : ''
                                                }`
                                                : `${client.corporateInfo.headQuartersAddress.address}${client.corporateInfo.headQuartersAddress.city != ''
                                                    ? ', ' +
                                                    client.corporateInfo.headQuartersAddress.city
                                                    : ''
                                                }${client.corporateInfo.headQuartersAddress.country !=
                                                    ''
                                                    ? ', ' +
                                                    client.corporateInfo.headQuartersAddress.country
                                                    : ''
                                                }${client.corporateInfo.headQuartersAddress.zipCode !=
                                                    ''
                                                    ? ', ' +
                                                    client.corporateInfo.headQuartersAddress.zipCode
                                                    : ''
                                                }`}
                                        </div>
                                    </div>
                                </div>

                                <div className="rowC row6">
                                    <div className="col left">Nature:</div>
                                    <div className="col left">
                                        <div className="border-b">
                                            {client.corporateInfo.nature}
                                        </div>
                                    </div>

                                    <div className="col left">Turn Over:</div>
                                    <div className="col left">
                                        <div className="border-b">
                                            ${formatNumber(client.corporateInfo.turnOver)}
                                        </div>
                                    </div>

                                    <div className="col left">Balance Sheet:</div>
                                    <div className="col left">
                                        <div className="border-b">
                                            ${formatNumber(client.corporateInfo.balanceSheet)}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {clientTypes && !clientTypes.isCorporate && (
                            <div className="rowC rowGender">
                                <div className="col left">Gender:</div>
                                <div className="col">
                                    <div className="border-b">{gender}</div>
                                </div>
                                <div className="col">Work in financial?:</div>
                                <div className="col">
                                    <div className="border-b">{workedInFinancialServices}</div>
                                </div>
                            </div>
                        )}
                        {idDetails && clientTypes && !clientTypes.isCorporate && (
                            <>
                                <h4>ID Details</h4>
                                <div className="rowC rowId">
                                    <div className="col left">ID Type:</div>
                                    <div className="col">
                                        <div className="border-b">{idDetails.type}</div>
                                    </div>
                                    <div className="col">ID: </div>
                                    <div className="col">
                                        <div className="border-b">{idDetails.documentNo}</div>
                                    </div>
                                    <div className="col">ID Country of Issue: </div>
                                    <div className="col">
                                        <div className="border-b">
                                            {idDetails.countryOfIssue
                                                ? idDetails.countryOfIssue
                                                : 'not define'}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {clientTypes && !clientTypes.isCorporate && (
                            <>
                                <div className="topBar">
                                    <h5>Financial Information</h5>
                                </div>

                                <div className="rowC rowFinancial">
                                    <div className="col left">Annual Income:</div>
                                    <div className="col">
                                        <div className="border-b">{annualIncome}</div>
                                    </div>
                                    <div className="col">Source of Funds:</div>
                                    <div className="col">
                                        <div className="border-b">{sourceOfFunds}</div>
                                    </div>
                                </div>

                                {employmentDetails && (
                                    <>
                                        <div className="topBar">
                                            <h5>Employment Details</h5>
                                        </div>
                                        <div className="rowC rowEmployment">
                                            <div className="col left">Employment Status:</div>
                                            <div className="col">
                                                <div className="border-b">
                                                    {employmentDetails.employmentStatus}
                                                </div>
                                            </div>
                                            <div className="col">Industry:</div>
                                            <div className="col">
                                                <div className="border-b">
                                                    {employmentDetails.industry}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rowC rowJob">
                                            <div className="col left">Job Title:</div>
                                            <div className="col">
                                                <div className="border-b">
                                                    {employmentDetails.jobTitle}
                                                </div>
                                            </div>
                                            <div className="col">Name of Employer:</div>
                                            <div className="col">
                                                <div className="border-b">
                                                    {employmentDetails.nameOfEmployer}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="topBar">
                                    <h5>FATCA</h5>
                                </div>
                                <div className="pl-2">
                                    <p>
                                        Are you a citizen of the United States of America?{' '}
                                        {notUSCitizen ? (
                                            <span className="yes">YES</span>
                                        ) : (
                                            <span className="no">NO</span>
                                        )}
                                    </p>
                                    <p>
                                        Tax Identification:{' '}
                                        <span className="order-b">
                                            {taxIdentificationNumber
                                                ? taxIdentificationNumber
                                                : 'N/A'}
                                        </span>
                                    </p>
                                </div>

                                {isIb && ibQuestionnaire && (
                                    <>
                                        <div className="topBar">
                                            <h5>IB Questionnaire</h5>
                                        </div>
                                        <div className="pl-2">
                                            <p>
                                                Have Website / Blog for promotion?{' '}
                                                {ibQuestionnaire.haveSite !== 'no' ? (
                                                    <span className="yes">YES</span>
                                                ) : (
                                                    <span className="no">NO</span>
                                                )}
                                            </p>
                                            <p>
                                                Have you reffered clients to other providers?{' '}
                                                {ibQuestionnaire.refOther !== 'no' ? (
                                                    <span className="yes">YES</span>
                                                ) : (
                                                    <span className="no">NO</span>
                                                )}
                                            </p>
                                            <p>
                                                How do you acquire clients?{' '}
                                                <strong>{ibQuestionnaire.getClient}</strong>
                                            </p>
                                            <p>
                                                Countries of audience intending to acquire{' '}
                                                <strong>{ibQuestionnaire.targetCountries}</strong>
                                            </p>
                                            <p>
                                                Expected Clients in 12 Months:{' '}
                                                <span className="yes">{ibQuestionnaire.expected}</span>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {clientTypes && clientTypes.isCorporate && (
                            <>
                                <div className="topBar">
                                    <h5>Authorized Person:</h5>
                                </div>
                                <div className="rowC row6">
                                    <div className="col left">First Name:</div>
                                    <div className="col">
                                        <div className="border-b">
                                            {client.authorizedPerson &&
                                                client.authorizedPerson.firstName}
                                        </div>
                                    </div>
                                    <div className="col">Last Name:</div>
                                    <div className="col">
                                        <div className="border-b">
                                            {client.authorizedPerson &&
                                                client.authorizedPerson.lastName}
                                        </div>
                                    </div>

                                    <div className="col">Job Title:</div>
                                    <div className="col">
                                        <div className="border-b">
                                            {client.authorizedPerson &&
                                                client.authorizedPerson.jobTitle}
                                        </div>
                                    </div>
                                </div>
                                <div className="rowC row7">
                                    <div className="col left">Is US Citizen ?:</div>
                                    <div className="col">
                                        <div className="border-b">
                                            {client.authorizedPerson &&
                                                client.authorizedPerson.isUSCitizen
                                                ? 'Yes'
                                                : 'No'}
                                        </div>
                                    </div>
                                    <div className="col">TAX Identification #:</div>
                                    <div className="col">
                                        <div className="border-b">
                                            {(client.authorizedPerson &&
                                                client.authorizedPerson.taxId) || <>&nbsp;</>}
                                        </div>
                                    </div>
                                    <div className="col">Is Politically Exposed ?:</div>
                                    <div className="col">
                                        <div className="border-b">
                                            {client.authorizedPerson &&
                                                client.authorizedPerson.isPoliticallyExposed
                                                ? 'Yes'
                                                : 'No'}
                                        </div>
                                    </div>
                                    <div className="col">Worked In Financial ?:</div>
                                    <div className="col">
                                        <div className="border-b">
                                            {client.authorizedPerson &&
                                                client.authorizedPerson.workedInFinancial
                                                ? 'Yes'
                                                : 'No'}
                                        </div>
                                    </div>
                                </div>
                                <div className="topBar">
                                    <h5>Share Holders</h5>
                                </div>
                                {client.shareHolders &&
                                    client.shareHolders.length > 0 &&
                                    client.shareHolders.map((v) => (
                                        <>
                                            <div className="rowC row5">
                                                <div className="col left">First Name:</div>
                                                <div className="col">
                                                    <div className="border-b">{v.firstName}</div>
                                                </div>
                                                <div className="col">Last Name:</div>
                                                <div className="col">
                                                    <div className="border-b">{v.lastName}</div>
                                                </div>

                                                <div className="col">Share</div>
                                                <div className="col">
                                                    <div className="border-b">{v.shares} %</div>
                                                </div>
                                            </div>
                                            <div className="rowC row7">
                                                <div className="col left">Is US Citizen ?:</div>
                                                <div className="col">
                                                    <div className="border-b">
                                                        {v.isUSCitizen ? 'Yes' : 'No'}
                                                    </div>
                                                </div>
                                                <div className="col">TAX Identification #:</div>
                                                <div className="col">
                                                    <div className="border-b">
                                                        {v.taxId || <>&nbsp;</>}
                                                    </div>
                                                </div>
                                                <div className="col">Is Politically Exposed ?:</div>
                                                <div className="col">
                                                    <div className="border-b">
                                                        {v.isPoliticallyExposed ? 'Yes' : 'No'}
                                                    </div>
                                                </div>
                                                <div className="col">Worked In Financial ?:</div>
                                                <div className="col">
                                                    <div className="border-b">
                                                        {v.workedInFinancial ? 'Yes' : 'No'}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    ))}

                                <div className="topBar">
                                    <h5>Directors</h5>
                                </div>
                                {client.directors &&
                                    client.directors.length > 0 &&
                                    client.directors.map((v) => (
                                        <>
                                            <div className="rowC row4">
                                                <div className="col left">First Name:</div>
                                                <div className="col">
                                                    <div className="border-b">{v.firstName}</div>
                                                </div>
                                                <div className="col">Last Name:</div>
                                                <div className="col">
                                                    <div className="border-b">{v.lastName}</div>
                                                </div>
                                            </div>
                                            <div className="rowC row7">
                                                <div className="col left">Is US Citizen ?:</div>
                                                <div className="col">
                                                    <div className="border-b">
                                                        {v.isUSCitizen ? 'Yes' : 'No'}
                                                    </div>
                                                </div>
                                                <div className="col">TAX Identification #:</div>
                                                <div className="col">
                                                    <div className="border-b">
                                                        {v.taxId || <>&nbsp;</>}
                                                    </div>
                                                </div>
                                                <div className="col">Is Politically Exposed ?:</div>
                                                <div className="col">
                                                    <div className="border-b">
                                                        {v.isPoliticallyExposed ? 'Yes' : 'No'}
                                                    </div>
                                                </div>
                                                <div className="col">Worked In Financial ?:</div>
                                                <div className="col">
                                                    <div className="border-b">
                                                        {v.workedInFinancial ? 'Yes' : 'No'}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    ))}
                            </>
                        )}

                        {(declarations && declarations.length > 0) ||
                            (ibDeclarations && ibDeclarations.length > 0) ? (
                            <div className="topBar">
                                <h5>Declarations</h5>
                            </div>
                        ) : null}

                        {declarations &&
                            declarations.map((v) => (
                                <div className="rowC rowDecl">
                                    <div className="col">
                                        {' '}
                                        <img src={CHECKBOX} width="15px" height="15px" />
                                    </div>
                                    <div className="col left">
                                        <div dangerouslySetInnerHTML={{ __html: v }} />
                                    </div>
                                </div>
                            ))}
                        {isIb &&
                            ibDeclarations &&
                            ibDeclarations.map((v) => (
                                <div className="rowC rowDecl">
                                    <div className="col">
                                        {' '}
                                        <img src={CHECKBOX} width="15px" height="15px" />
                                    </div>
                                    <div className="col left">
                                        <div dangerouslySetInnerHTML={{ __html: v }} />
                                    </div>
                                </div>
                            ))}

                        <div className="container">
                            <div className="row align-items-center justify-content-around mt-5">
                                <div className="col text-center">
                                    <div style={{fontWeight: "bold"}}>
                                        Accepted By: {`${firstName} ${lastName}`}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <img src={DownloadIcon} alt="download icon" height={40} onClick={generatePdf} />
            {/* <button
                className="btn-outline-primary"
                size="small"
                onClick={generatePdf}>
                Download
            </button> */}
        </>
    );
};

export default GeneratePDFFrom;
