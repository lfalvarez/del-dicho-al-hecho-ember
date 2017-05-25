import Ember from 'ember';

export function areaFullfilmentByGovernment(params/*, hash*/) {
  let area = params[0];
  let gov = params[1];
  return area.fullfilmentPerGovernment(gov);
}

export default Ember.Helper.helper(areaFullfilmentByGovernment);
