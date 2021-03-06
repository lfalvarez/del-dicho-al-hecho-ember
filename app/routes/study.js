import Ember from 'ember';
import CsvParserMixin from 'ddah-ember/mixins/csv-parser';
import UtilitiesMixin from 'ddah-ember/mixins/utilities';
import config from '../config/environment';
import _ from 'lodash';

export default Ember.Route.extend(CsvParserMixin, UtilitiesMixin, {
  titleToken: function(model) {
    return model.get('name');
  },
  model(params){
    let study = this.store.peekAll('study').findBy('slug', params.study_name);
    if (_.isUndefined(study)){
      this.transitionTo("/404");
    }

    let file_name =config.rootURL +  'studies/' + study.get('filename');
    return this._parseCsv(file_name, this.store, study);
  },
});
