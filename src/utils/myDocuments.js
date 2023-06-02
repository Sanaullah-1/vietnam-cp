import Id from "../assets/images/id.png";
import Passport from "../assets/images/passport.png";
import Additional from '../assets/images/additional.png'


export function showSumsub(docs) {
    let show = true;
    if (docs) {
        Object.keys(docs).map(rec => {
            if (rec == "Proof Of Identity" && docs[rec][0].from == "sumsub" && docs[rec][0].status == "GREEN") {
                show = false;
            }
            if (rec == "Proof Of Identity" && docs[rec][0].from == "portal" && (docs[rec][0].status != "Rejected" && docs[rec][0].status != undefined)) {
                show = false;
            }
        })

    }
    return show
}
export function isProofOfAddressApproved(docs) {
    let approved = false;
    if (docs) {
        Object.keys(docs).map(rec => {
            if (rec == "Proof Of Residence" && docs[rec][0].status == "Approved") {
                approved = true;
            }

        })

    }
    return approved
}
export function getStatusClass(status) {
    switch (status) {
        case "GREEN":
            return "bg-success text-white"
        case "RED":
            return "bg-danger text-white"
        case "Rejected":
            return "bg-danger text-white"
        case "Approved":
            return "bg-success text-white"
        case "Pending":
            return "bg-light text-muted"
    }
}
export function getStatusTitle(status) {
    switch (status) {
        case "GREEN":
            return "APPROVED"
        case "RED":
            return "REJECTED"
        case "Rejected":
            return "REJECTED"
        case "Approved":
            return "APPROVED"
        case "Pending":
            return "PENDING"
    }
}
const getIDOrPassport = (type) => {
    switch (type) {
        case "PASSPORT":
            return Passport
        case "PASSPORT_FRONT":
            return Passport
        case "PASSPORT_BACK":
            return Passport
        case "ID_FRONT":
            return Id
        case "ID_BACK":
            return Id
        case "ID_CARD":
            return Id
    }


}
const getRelatedImage = (type, title) => {
    switch (type) {
        case "PROOF_OF_RESIDENCE":
            return Additional
        case "IDENTITY":
            return getIDOrPassport(title)
        case "ADDRESS_PROOF":
            return Additional
        case "ID_PROOF":
            return getIDOrPassport(title)
        case "ADDITIONAL_DOCUMENTS":
            return Additional
    }
}
const getDocTitle = (doc) => {
    switch (doc) {
        case "PROOF_OF_RESIDENCE":
            return "Proof Of Residence"
        case "IDENTITY":
            return "Proof Of Identity"
        case "ADDRESS_PROOF":
            return "Proof Of Residence"
        case "ID_PROOF":
            return "Proof Of Identity"
        case "ADDITIONAL_DOCUMENTS":
            return "Additional Document"
    }
}
export async function reshapDocs(sumsub, docs) {
    let newobj = {}
    let newArray = Object.keys(sumsub).map(rec => {
        if (sumsub[rec]) {

            newobj = {
                ...newobj,
                [getDocTitle(rec)]: [{
                    status: sumsub[rec].reviewResult.reviewAnswer,
                    // file: recFile,
                    fileName: sumsub[rec].idDocType,
                    from: "sumsub",
                    image: getRelatedImage(rec, sumsub[rec].idDocType)
                }]

            }
        }

    })

    if (docs && docs.length > 0) {
        docs.map(portalDoc => {
            if (portalDoc.title != "ID_PROOF") {
                let a = newobj[getDocTitle(portalDoc.title)]
                if (a) {
                    a.push(...portalDoc.files.map(rec => {
                        return {
                            file: rec.name,
                            from: "portal",
                            path: rec.path,
                            status: (portalDoc.title == "ADDRESS_PROOF" || portalDoc.title == "ID_PROOF") ? portalDoc.status : rec.status,
                            id: rec._id,
                            image: getRelatedImage(portalDoc.title)
                        }
                    }))
                } else {
                    if (getDocTitle(portalDoc.title)) {
                        newobj = {
                            ...newobj,
                            [getDocTitle(portalDoc.title)]: portalDoc.files.map(rec => {
                                return {
                                    file: rec.name,
                                    from: "portal",
                                    path: rec.path,
                                    status: (portalDoc.title == "ADDRESS_PROOF" || portalDoc.title == "ID_PROOF") ? portalDoc.status : rec.status,
                                    id: rec._id,
                                    image: getRelatedImage(portalDoc.title)
                                }
                            })
                        }
                    }
                }
            } else {
                if (getDocTitle(portalDoc.title)) {
                    newobj = {
                        ...newobj,
                        [getDocTitle(portalDoc.title)]: [{
                            file: portalDoc.files[0].name,
                            from: "portal",
                            path: portalDoc.files[0].path,
                            status: portalDoc.status,
                            id: portalDoc.files[0]._id,
                            image: getRelatedImage(portalDoc.title, portalDoc.files[0].type)

                        }]
                    }
                }
            }

        })

    }
    if (Object.keys(newobj).length) {
        return { mergedData: newobj, isEmpty: false }
    } else {
        return {
            mergedData: {
                "Proof Of Identity": [{
                    file: "Proof Of Identity",
                    from: "portal",
                    isEmpty: true,
                    image: Id

                }]
            },
            isEmpty: true
        }
    }

}