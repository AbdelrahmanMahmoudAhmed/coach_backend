const { sequelize, QuickAnswer } = require('../../models');

const validationChecker = require('../validation/checker')




const getAllQuickAnswer = (req, res, next) => {

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
            console.log("________err" , err)
        })

}

const addQuickAnswer = (req, res, next) => {
    const { questionAr, questionEn, answerAr, answerEn } = req.body
 
     validationChecker(req , res).then(()=>{
        QuickAnswer.create({ questionArr:questionAr, questionEn, answerAr, answerEn })
        .then((data) => {
            res.status(201).json({
                message:"the question has been added successfully",
                status:true,
                code:1,
                data,
            }) 
        })
        .catch((err) => {
            res.status(500).json(err)
            // err.httpCode = 500
            // next(err)

        })
     }).catch((err)=>{
        res.status(422).json(err)
    //     err.httpCode = 422
    //     console.log("err" , err)
    //    next(err)
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

const updateQuickAnswer =  (req, res, next) => {
    const { id } = req.params
    const { questionAr, questionEn, answerAr, answerEn } = req.body

    validationChecker(req , res).then((result)=>{
        console.log("result" , result)

    QuickAnswer.findOne({ where: { id } })
        .then((data) => {
            questionAr && (data.questionAr = questionAr)
            questionEn && (data.questionEn = questionEn)
            answerAr && (data.answerAr = answerAr)
            answerEn && (data.answerEn = answerEn)

            data.save().then((updatedData)=>{
                res.status(200).json({
                    message:`question with id ${id} has been updated successfully `,
                    status:true,
                    code:2,
                    data:updatedData,
                })
            }).catch((err) => {

                res.status(422).json('update err')
            })
        })
        .catch((err) => {
            res.status(422).json('err')
        })

    })
    .catch((err)=>{
        res.status(400).json(err)
     })

}

module.exports = { addQuickAnswer , getAllQuickAnswer , deleteQuickAnswer , updateQuickAnswer}