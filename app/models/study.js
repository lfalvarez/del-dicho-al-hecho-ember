import DS from 'ember-data';
import _ from 'lodash';
import Ember from 'ember';
import CalculationsMixin from 'ddah-ember/mixins/calculations';

export default DS.Model.extend(CalculationsMixin, {
    version: DS.attr('string'),
    year: DS.attr('number'),
    promises: DS.hasMany('promise'),
    government: DS.belongsTo('government'),
    slug: DS.attr("string", {defaultValue: function(e){
      let gov = e.get("government");
      return (gov.get("name") + "_" + e.get("version") + "-" + e.get("year")).toLowerCase();
      },
    }),
    fullName: Ember.computed('version', 'year', function() {
      return `${this.get('version')} ${this.get('year')}`;
    }),
    fullfilment: DS.attr("number", {defaultValue: function(e){
      let fullfilment_promises = [];
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          fullfilment_promises.push(parseFloat(p.get('fullfilment')));
        });
        return _.round(_.mean(fullfilment_promises), 0);
      } else {
        return 0;
      }
    }}),
    coherenceLevel: DS.attr("number", {defaultValue: function(e){
      let coherence_promises = [];
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          coherence_promises.push(parseFloat(p.get('coherenceLevel')));
        });
        return _.round(_.mean(coherence_promises),1);
      } else {
        return 0;
      }
    }}),
    billsCount: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          count += p.get('bills').toArray().length;
        });
        return count;
      } else {
        return 0;
      }
    }}),
    urgenciesCount: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          count += parseInt(p.get('urgenciesCount'));
        });
        return count;
      } else {
        return 0;
      }
    }}),
    capacity: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if (parseInt(p.get('fullfilment')) === 100 && parseInt(p.get('coherenceLevel')) === 4){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    presentanAvance: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if (parseInt(p.get('fullfilment')) > 0){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    finalizadas: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if (parseInt(p.get('fullfilment')) === 100){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    enDesarrollo: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if(parseInt(p.get('fullfilment')) > 39 && parseInt(p.get('fullfilment')) < 91){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    capacidad: DS.attr("number", {defaultValue: function(e){
      let count = 0;
      if (e.get('promises').toArray().length){
        let promisesArray = e.get('promises');
        promisesArray.forEach(function(p){
          if(parseInt(p.get('fullfilment')) === 100 && parseInt(p.get('coherenceLevel')) === 4){
            count += 1;
          }
        });
        return count;
      } else {
        return 0;
      }
    }}),
    chartData : Ember.computed('fullfilment', function() {
      return {
          labels: [
            "% avance", "% incompleto"
          ],
          datasets: [
              {
                  data: [this.get('fullfilment'), 100-this.get('fullfilment')],
                  backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                  ],
                  hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                  ]
              }]
      };
    }),
    doughnutOpt: {
      responsive: true
    },
    areas: Ember.computed('promises',function(){
      let a = [];
      this.get('promises').toArray().forEach(function(p){
        let area = p.get('area');
        let area_id = area.get('id');
        let exist = _.some(a, function(e){ return e.get('id') === area_id; });
        if( !exist ){
          a.push( area );
        }
      });
      return a;
    }),
    promisesGroupedByArea: Ember.computed('promises', function(){
      let groupedPromises = {};
      let promises = this.get('promises').toArray();
      let study = this;

      _.each(promises, function(p){
        let area = p.get('area');
        let area_id = area.get('id');
        if(_.isUndefined(groupedPromises[area_id])) {
          groupedPromises[area_id] = {'area':area, 'promises':[p], 'summary':{'completed':0, 'in_progress':0, 'no_progress':0, 'fullfilment':0, 'coherenceLevel':0}};
        } else {
          groupedPromises[area_id].promises.push(p);
        }
      });
      _.each(groupedPromises, function(a, a_id){
        groupedPromises[a_id].summary.completed = study.getCompleted(a.promises);
        groupedPromises[a_id].summary.in_progress = study.getInProgress(a.promises);
        groupedPromises[a_id].summary.no_progress = study.getNoProgress(a.promises);
        // console.log(a.promises.toArray().length, a_id);
        groupedPromises[a_id].summary.fullfilment = study.getAverageFrom(a.promises, 'fullfilment');
        groupedPromises[a_id].summary.coherenceLevel = study.getAverageFrom(a.promises, 'coherenceLevel');
      });
      return groupedPromises;
    }),
    getPromisesByArea: function(area){
      let promises = [];
      _.forEach(this.get('promises').toArray(), function(promise){
        if(promise.get('area').get('id') === area.get('id')){
          promises.push(promise);
        }
      });
      return promises;
    }
});
