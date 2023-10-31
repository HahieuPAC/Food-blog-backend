import specialtyService from "../service/specialtyService"

let createNewSpecialty = async (req, res) => {
    try {
        let doctor = await specialtyService.createNewSpecialty(req.body);
        return res.status(200).json(doctor); 
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getAllSpecialty = async(req, res) => {
    try {
        let data = await specialtyService.getAllSpecialty();
        return res.status(200).json(data); 
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

let getDetailSpecialtyById = async(req, res) => {
    try {
        let data = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(data); 
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        })
    }
}

module.exports = {
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}