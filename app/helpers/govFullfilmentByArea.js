import Ember from 'ember';
import _ from 'lodash';

export default Ember.Helper.extend({
  store: Ember.inject.service('store'),
  compute(params/*, hash*/)  {
    let store = this.get('store');

    let area_id = params[0].get('id');
    let area = store.peekRecord('area', area_id);
    let studies = params[1];

    let f = 0;
    _.forEach(studies, function(s){
      f = f + parseInt(area.fullfilmentPerStudy(s));
    });

    return _.round(f/studies.length,0);
  }
});