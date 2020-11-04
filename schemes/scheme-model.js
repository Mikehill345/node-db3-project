// scheme-model
const db = require("../data/db-config");

module.exports = {
    find(){
        return db('schemes')
    },
    findById(id){
        return db('schemes').where({ id }).first()
    },
    findSteps(id){
        return db('schemes')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({ 'scheme_id': id })
    },
    add(scheme){
        return db('schemes')
        .insert(scheme, 'id')
        .then(([id]) => this.findById(id))
    },
    addStep(newStep){
        return db('steps')
        .insert(newStep, 'id')
        .then(() => this.findSteps(newStep.scheme_id))
    },
    update(changes, id){
        return db('schemes')
        .where({ id })
        .update(changes)
        .then((count) => (count > 0 ? this.findById(id): null))
    },
    remove(id){
        return db('schemes')
        .where({ id })
        .del()
    }
}