'use strict';

const { unGetSelectData, getSelectData } = require("../../utils");

const findAllDiscountCodesUnselect = async ({filter, limit = 50, page = 1, unSelect, model}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? {_id: -1} : {_id: 1}

    const documents = model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(unGetSelectData(unSelect))
        .lean()
    
    return documents
}

const findAllDiscountCodesSelect = async ({filter, limit = 50, page = 1, Select, model}) => {
    const skip = (page - 1) * limit
    const sortBy = sort === 'ctime' ? {_id: -1} : {_id: 1}

    const documents = model.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(Select))
        .lean()
    
    return documents
}

const checkDiscountExists = async ({model, filter}) => {
    return await model.findOne(filter).lean()
}

module.exports = {
    findAllDiscountCodesUnselect,
    findAllDiscountCodesSelect,
    checkDiscountExists
}