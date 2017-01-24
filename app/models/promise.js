import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  bills: DS.hasMany('bill'),
  study: DS.belongsTo('study'),
  area: DS.belongsTo('area'),
});
