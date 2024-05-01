const { sequelize, QuickAnswer } = require('../../models');
const { validationResult } = require('express-validator');

const addQuickAnswer = (req, res, next) => {
    const { questionAr, questionEn, answerAr, answerEn } = req.body

    QuickAnswer.create({ questionAr, questionEn, answerAr, answerEn })
        .then((data) => {
            res.status(201).json({
                message:"the question has been added successfully",
                status:true,
                code:1,
                data,
            })
        })
        .catch((err) => {
            res.status(422).json('err')
        })
}
const getAllQuickAnswer = (req, res, next) => {
    const { questionAr, questionEn, answerAr, answerEn } = req.body

    QuickAnswer.findAll()
        .then((data) => {
            res.status(200).json({
                message:"done successfully",
                status:true,
                code:2,
                data,
            })
        })
        .catch((err) => {
            res.status(422).json('err')
        })

}
const deleteQuickAnswer =  (req, res, next) => {
    const { id } = req.params

    QuickAnswer.findOne({ where: { id } })
        .then((data) => {
            data.destroy().then((q) => {
                res.json({
                    message:`question with id ${id} has been deleted successfully `,
                    status:true,
                    code:2,
                    data,
                })
            }).catch((err) => {

                res.status(422).json('delete err')
            })
        })
        .catch((err) => {
            res.status(422).json('err')
        })

}

module.exports = { addQuickAnswer , getAllQuickAnswer , deleteQuickAnswer}