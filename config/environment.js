var governments =[{
	"name": "Marcelo Crivella",
	"years": {'start': 2017, 'end': 2020},
	"color1": "#FF9500",
	"color2": "#FCA94F",
	"color3": "#FCC48B",
	"color4": "#FCA94F",
	"studies": [{
		"type": "Programa",
		"img": "/img/bashelet-con-la-fiera.svg",
		"color": "#FCC48B",
		"year": 2016,
		"in_landing": true,
		"version": "Programa de Gobierno",
		"name": "Evaluación Río de Janeiro 100 días",
		"filename": "Rio100dias.csv",
		"description": "Quanto cumpriu a gestão de Marcelo Crivella na Prefeitura do Rio em 100 dias de governo? Descubra em Dito e Feito Rio.",
		"visible": true,
	}
	]
} ];
module.exports = function(environment) {
  var orders = {
    1: 'primer',
    2: 'segundo',
    3: 'tercer',
    4: 'cuarto'
  };
  var area_images = {
    'Agricultura': 'img/i-agr.svg',
		'Ciencia y Tecnología': 'img/i-cie.svg',
    'Cultura': 'img/i-cul.svg',
		'Lazer': 'img/i-cul.svg',
    'Defensa': 'img/i-def.svg',
    'Democracia': 'img/i-dem.svg',
    'Desarrollo Social': 'img/i-des.svg',
    'Economía y Comercio': 'img/i-eco.svg',
    'Educación': 'img/i-edu.svg',
    'Energía': 'img/i-ene.svg',
    'Equidad de Género': 'img/i-equ.svg',
    'Estado': 'img/i-est.svg',
    'Infancia y Juventud': 'img/i-inf.svg',
    'Justiça Social e Direitos Humanos': 'img/i-jus.svg',
    'Meio Ambiente': 'img/i-med.svg',
    'Minería': 'img/i-min.svg',
    'Obras Públicas': 'img/i-obr.svg',
    'Pueblos Indígenas': 'img/i-pue.svg',
    'Saúde': 'img/i-sal.svg',
    'Segurança e Guarda Municipal': 'img/i-seg.svg',
    'Trabalho': 'img/i-tra.svg',
    'Mobilidade Urbana': 'img/i-tran.svg',
    'Habitação e Urbanismo': 'img/i-viv.svg',
    'default': 'img/i-def.svg',
  };
  var matcher = {
    'area': {
      'name': 'area',
      'id': {
        'fieldToGetIdFrom': 'area'
      }
    },
    'promise': {
      'content': 'Promesa',
      'number': 'uid',
      'title': 'Titulo',
      'ja-why': 'ja_porque',
      'jc-why': 'jn_porque',
      'coherence-level': 'escala_de_coherencia',
      'id': {
        'fieldToGetIdFrom': 'uid'
      },
      'relationships':[
        "area"
      ]
    },
    'bill': {
      'name': 'Identificador acto administrativo',
      'title': 'Acto administrativo',
      'url': 'Link',
      'justification': 'justificacion_avance',
      'year': 'Ano',
      'version': 'Version',
      'id': {
        'fieldToGetIdFrom': 'Identificador acto administrativo'
      },
      'relationships':[
        "phase",
        "priority",
      ],
      'chekIsEmpty': 'Identificador acto administrativo',
    },
    'justification': {
      'justification': 'justificacion_avance',
      'id': {
        'fieldToGetIdFrom': 'justificacion_avance'
      },
      relationships: [
        'promise',
        'bill'
      ]
    }
  };
  var priorities = {
    'priorities': [
      {
        'countColumnName': "simple",
        'name': 'Simple'
      },
      {
        'countColumnName': "suma",
        'name': 'Suma'
      },
      {
        'countColumnName': "inmediata",
        'name': 'Inmediata'
      },
    ]
  };
  var phases = {
    'columnName': 'nombre_avance',
    "phases":[
    {
      'name': 'Sem progresso',
      'fullfilment': 0,
    }, {
      'name': 'Estágio inicial',
      'fullfilment': 10,
    }, {
      'name': 'Avanço marginal',
      'fullfilment': 30,
    }, {
      'name': 'Prazo Perdido',
      'fullfilment': 0,
    }
  ]};
	var comparisonsAreVisible = false;

  var ENV = {
    modulePrefix: 'ddah-ember',
    matcher: matcher,
    orders:orders,
    governments: governments,
    government_length: 4,
		useOnlyJsons: false,
    areaImages: area_images,
    comparable_with_other_gov: 'Programa',
    priorities: priorities,
    phases: phases,
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
		//Se puede utilizar max o average
		functionBills: 'max',
		comparisonsAreVisible: false,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true; 2014-2018
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.locationType = 'hash';
    ENV.rootURL = '/';
  }

  return ENV;
};
