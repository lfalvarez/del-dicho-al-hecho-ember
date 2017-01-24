import DS from 'ember-data';

export default DS.Model.extend({
    version: DS.attr('string'),
    year: DS.attr('number'),
    promises: DS.hasMany('promise'),
    government: DS.belongsTo('government'),
});
