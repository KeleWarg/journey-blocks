'use client'

import * as React from 'react'
import { MapPin, Lock, Clock, Route, Check, AlertCircle } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, Input, StickyButtonContainer } from '@/components/ui'
import { MOVING_VALIDATION, MOVING_PROGRESS_SUBTITLES, MOVING_PROGRESS_TIME_ESTIMATES, MOVING_TOTAL_STEPS } from '@/types/moving'
import { stateCentroids } from '@/data/stateCentroids'

// Zip code prefix (3 digits) to approximate coordinates
// Format: { prefix: [latitude, longitude] }
const ZIP_COORDINATES: Record<string, [number, number]> = {
  // Northeast
  '010': [42.1, -72.6], '011': [42.3, -72.6], '012': [42.5, -73.2], '013': [42.4, -72.5], '014': [42.3, -71.8], '015': [42.3, -71.8], '016': [42.3, -71.6], '017': [42.3, -71.8], '018': [42.1, -71.0], '019': [42.5, -71.0], '020': [42.4, -71.1], '021': [42.4, -71.1], '022': [42.2, -71.0], '023': [42.0, -71.5], '024': [42.5, -71.2], '025': [41.7, -70.3], '026': [41.7, -70.0], '027': [41.7, -71.5],
  '028': [41.8, -71.4], '029': [41.5, -71.5],
  '030': [43.0, -71.5], '031': [43.0, -71.5], '032': [43.2, -71.5], '033': [43.0, -71.5], '034': [43.2, -72.0], '035': [43.5, -71.5], '036': [43.8, -71.5], '037': [44.0, -71.5], '038': [42.9, -71.3],
  '039': [43.7, -70.3], '040': [43.5, -70.5], '041': [43.5, -70.5], '042': [43.3, -70.6], '043': [43.9, -69.8], '044': [44.3, -69.0], '045': [44.1, -70.2], '046': [44.5, -68.4], '047': [45.2, -69.2], '048': [44.8, -68.8], '049': [44.2, -70.5],
  '050': [43.6, -72.6], '051': [43.4, -72.7], '052': [43.1, -72.9], '053': [43.2, -72.5], '054': [44.4, -72.0], '055': [44.3, -72.6], '056': [44.4, -72.7], '057': [44.0, -73.2], '058': [44.9, -72.2], '059': [44.5, -73.2],
  '060': [41.8, -72.7], '061': [41.8, -72.7], '062': [41.5, -72.8], '063': [41.3, -73.1], '064': [41.2, -73.2], '065': [41.1, -73.4], '066': [41.3, -72.9], '067': [41.6, -72.8], '068': [41.4, -73.4], '069': [41.5, -72.1],
  '070': [40.9, -74.2], '071': [40.8, -74.2], '072': [40.6, -74.3], '073': [40.7, -74.2], '074': [40.9, -74.1], '075': [40.9, -74.4], '076': [40.9, -74.0], '077': [40.4, -74.1], '078': [40.7, -74.5], '079': [41.0, -74.7], '080': [39.9, -75.0], '081': [39.7, -75.1], '082': [39.5, -75.0], '083': [39.4, -74.6], '084': [39.5, -75.2], '085': [40.2, -74.8], '086': [40.3, -74.6], '087': [40.4, -74.3], '088': [40.3, -74.0], '089': [40.1, -74.7],
  // New York
  '100': [40.8, -73.9], '101': [40.9, -73.9], '102': [40.8, -73.9], '103': [40.6, -74.0], '104': [40.8, -73.9], '105': [41.0, -73.8], '106': [41.0, -73.7], '107': [41.0, -73.9], '108': [40.9, -73.8], '109': [41.1, -73.8],
  '110': [40.7, -73.4], '111': [40.8, -73.3], '112': [40.7, -73.9], '113': [40.6, -73.7], '114': [40.8, -73.7], '115': [40.8, -73.6], '116': [40.7, -73.4], '117': [40.8, -73.5], '118': [40.9, -73.1], '119': [40.9, -72.7],
  '120': [42.7, -73.8], '121': [42.7, -73.7], '122': [42.8, -73.9], '123': [42.6, -73.8], '124': [41.5, -73.9], '125': [41.5, -74.0], '126': [41.9, -73.9], '127': [42.0, -74.4], '128': [42.4, -74.2], '129': [42.1, -75.9],
  '130': [43.0, -76.1], '131': [43.0, -76.2], '132': [43.1, -77.0], '133': [43.2, -75.5], '134': [43.5, -75.5], '135': [43.1, -76.0], '136': [44.7, -75.5], '137': [43.0, -78.9], '138': [42.9, -78.9], '139': [42.1, -79.2],
  '140': [42.9, -78.9], '141': [42.9, -78.7], '142': [43.0, -78.8], '143': [42.8, -78.6], '144': [43.2, -77.6], '145': [43.2, -77.6], '146': [43.2, -77.6], '147': [42.1, -76.8], '148': [42.4, -76.5], '149': [42.1, -77.1],
  // Pennsylvania
  '150': [40.4, -80.0], '151': [40.4, -80.0], '152': [40.4, -79.9], '153': [40.3, -79.5], '154': [40.5, -79.9], '155': [40.3, -78.9], '156': [40.5, -79.4], '157': [40.6, -79.2], '158': [41.4, -79.7], '159': [40.9, -78.8],
  '160': [41.0, -80.3], '161': [41.2, -79.4], '162': [41.4, -79.4], '163': [42.1, -80.1], '164': [41.5, -78.6], '165': [40.6, -78.4], '166': [40.3, -78.9], '167': [40.0, -78.5], '168': [40.2, -77.8], '169': [40.3, -76.9],
  '170': [40.3, -76.9], '171': [40.0, -77.2], '172': [40.0, -76.3], '173': [40.0, -76.3], '174': [40.2, -77.0], '175': [40.3, -76.4], '176': [40.3, -76.0], '177': [40.3, -77.5], '178': [40.6, -75.5], '179': [41.0, -75.5],
  '180': [40.6, -75.4], '181': [40.6, -75.4], '182': [41.2, -75.9], '183': [40.3, -76.0], '184': [41.4, -75.7], '185': [41.4, -75.7], '186': [41.2, -75.9], '187': [41.3, -76.0], '188': [41.4, -75.7], '189': [41.0, -75.2],
  '190': [40.0, -75.1], '191': [40.0, -75.2], '192': [40.0, -75.3], '193': [40.0, -75.5], '194': [40.1, -75.3], '195': [40.3, -74.8], '196': [40.0, -75.6],
  // DC/MD/VA
  '200': [38.9, -77.0], '201': [38.8, -77.1], '202': [38.9, -77.0], '203': [38.9, -77.0], '204': [38.9, -77.0], '205': [38.9, -77.0],
  '206': [38.8, -76.9], '207': [38.9, -76.8], '208': [39.0, -76.9], '209': [39.4, -77.4], '210': [38.8, -76.6], '211': [39.1, -76.6], '212': [39.3, -76.6], '214': [39.0, -76.5], '215': [39.4, -76.6], '216': [39.4, -76.4], '217': [39.3, -76.6], '218': [39.6, -78.8], '219': [39.4, -79.0],
  '220': [38.8, -77.1], '221': [38.9, -77.2], '222': [38.8, -77.1], '223': [38.9, -77.4], '224': [38.5, -77.3], '225': [38.3, -77.5], '226': [38.8, -77.1], '227': [38.8, -77.0], '228': [37.5, -77.4], '229': [37.3, -79.9],
  '230': [37.5, -77.4], '231': [37.2, -76.5], '232': [37.5, -77.4], '233': [36.8, -76.3], '234': [36.8, -76.0], '235': [36.9, -76.2], '236': [36.9, -76.2], '237': [37.0, -76.4], '238': [37.3, -79.4], '239': [37.4, -79.1],
  '240': [37.3, -79.9], '241': [37.3, -80.0], '242': [37.3, -81.0], '243': [37.3, -80.0], '244': [37.3, -79.4], '245': [38.4, -78.9], '246': [37.8, -79.4],
  // Southeast
  '270': [35.8, -78.6], '271': [36.1, -79.8], '272': [36.4, -79.7], '273': [36.1, -80.2], '274': [36.1, -79.8], '275': [35.5, -80.8], '276': [36.1, -80.2], '277': [36.3, -80.5], '278': [35.2, -80.8], '279': [35.1, -80.7],
  '280': [35.2, -80.8], '281': [35.2, -80.8], '282': [35.2, -80.8], '283': [35.2, -80.8], '284': [35.0, -78.9], '285': [35.0, -79.0], '286': [35.1, -79.0], '287': [35.3, -81.8], '288': [35.6, -82.6], '289': [35.1, -79.0],
  '290': [34.0, -81.0], '291': [34.0, -81.0], '292': [34.0, -81.0], '293': [34.8, -82.4], '294': [34.0, -80.0], '295': [33.8, -79.0], '296': [34.2, -79.8], '297': [35.0, -81.0], '298': [33.4, -79.9], '299': [32.8, -80.0],
  '300': [33.7, -84.4], '301': [33.7, -84.4], '302': [33.7, -84.4], '303': [33.7, -84.4], '304': [33.5, -84.4], '305': [33.7, -84.4], '306': [33.7, -84.4], '307': [34.2, -84.5], '308': [34.0, -84.0], '309': [34.5, -83.8],
  '310': [33.8, -84.3], '311': [33.8, -84.4], '312': [32.1, -81.1], '313': [32.1, -81.2], '314': [31.2, -81.5], '315': [32.5, -83.6], '316': [32.8, -83.6], '317': [32.1, -82.9], '318': [31.6, -84.2], '319': [30.8, -83.3],
  '320': [30.3, -81.7], '321': [30.3, -81.7], '322': [30.3, -81.7], '323': [30.2, -81.6], '324': [30.4, -87.2], '325': [29.7, -82.3], '326': [29.2, -82.1], '327': [28.5, -81.4], '328': [28.5, -81.4], '329': [28.1, -80.6],
  '330': [25.8, -80.2], '331': [25.8, -80.2], '332': [25.8, -80.2], '333': [25.8, -80.2], '334': [26.1, -80.1], '335': [27.9, -82.5], '336': [27.9, -82.5], '337': [27.9, -82.5], '338': [28.0, -82.8], '339': [28.0, -82.5],
  // Midwest
  '400': [38.3, -85.8], '401': [38.3, -85.8], '402': [38.3, -85.8], '403': [38.0, -84.5], '404': [38.0, -84.5], '405': [38.0, -84.5], '406': [38.0, -84.5], '407': [37.9, -85.0], '408': [37.7, -85.9], '409': [37.8, -87.1],
  '410': [37.8, -87.6], '411': [37.1, -86.5], '412': [37.0, -85.9], '413': [37.2, -86.1], '414': [37.5, -87.9], '415': [38.0, -83.5], '416': [38.0, -84.0], '417': [38.5, -83.0], '418': [37.5, -84.3],
  '430': [41.5, -81.7], '431': [41.1, -81.5], '432': [40.0, -82.9], '433': [40.0, -83.0], '434': [40.8, -81.4], '435': [40.8, -81.4], '436': [41.6, -83.5], '437': [41.2, -80.8], '438': [41.4, -82.2], '439': [41.4, -82.7],
  '440': [41.5, -81.7], '441': [41.5, -81.7], '442': [41.1, -80.7], '443': [40.8, -81.4], '444': [41.1, -81.5], '445': [41.1, -80.6], '446': [40.8, -81.4], '447': [40.4, -80.6], '448': [40.1, -82.0], '449': [40.4, -81.2],
  '450': [39.8, -84.2], '451': [39.8, -84.2], '452': [39.1, -84.5], '453': [39.8, -84.2], '454': [39.4, -84.2], '455': [39.8, -84.2], '456': [39.3, -82.1], '457': [39.9, -82.8], '458': [39.3, -83.0], '459': [39.1, -84.0],
  '460': [39.8, -86.2], '461': [39.8, -86.2], '462': [39.8, -86.2], '463': [40.0, -86.1], '464': [40.4, -86.9], '465': [40.4, -86.9], '466': [40.1, -85.7], '467': [40.8, -85.0], '468': [41.1, -85.1], '469': [41.7, -86.3],
  '470': [39.2, -85.9], '471': [39.0, -85.0], '472': [39.2, -85.9], '473': [38.7, -87.5], '474': [39.5, -87.4], '475': [38.0, -87.6], '476': [38.3, -85.8], '477': [38.1, -86.0], '478': [37.9, -86.8], '479': [38.1, -87.2],
  '480': [42.3, -83.0], '481': [42.3, -83.0], '482': [42.3, -83.0], '483': [42.5, -83.0], '484': [43.0, -83.7], '485': [43.4, -83.9], '486': [43.4, -83.9], '487': [42.7, -84.5], '488': [42.7, -84.5], '489': [42.3, -85.6],
  '490': [42.3, -85.6], '491': [42.3, -85.6], '492': [42.3, -85.6], '493': [43.0, -85.7], '494': [43.0, -85.7], '495': [43.7, -85.5], '496': [43.0, -85.7], '497': [44.8, -85.6], '498': [45.8, -84.7], '499': [46.5, -87.4],
  // Illinois/Wisconsin/Minnesota
  '600': [41.9, -87.6], '601': [41.9, -87.6], '602': [41.9, -87.6], '603': [41.8, -87.7], '604': [41.9, -87.7], '605': [41.8, -87.8], '606': [41.9, -87.6], '607': [42.0, -87.7], '608': [42.1, -87.8], '609': [42.3, -88.3],
  '610': [41.5, -90.6], '611': [41.5, -90.6], '612': [41.5, -90.6], '613': [41.3, -89.1], '614': [41.5, -88.1], '615': [41.5, -88.2], '616': [41.8, -89.5], '617': [42.3, -89.1], '618': [42.3, -89.0], '619': [42.0, -88.7],
  '620': [39.8, -89.6], '622': [38.5, -90.2], '623': [38.8, -89.9], '624': [38.6, -90.2], '625': [39.8, -89.6], '626': [39.8, -89.6], '627': [39.8, -89.6], '628': [38.3, -88.2], '629': [37.7, -89.2],
  '530': [43.1, -89.3], '531': [42.5, -88.1], '532': [43.0, -88.0], '534': [42.7, -89.0], '535': [43.8, -91.2], '537': [43.1, -89.3], '538': [43.1, -89.3], '539': [43.5, -89.8], '540': [44.5, -88.0], '541': [44.5, -88.0], '542': [44.5, -88.0], '543': [44.5, -88.0], '544': [44.0, -88.5], '545': [45.6, -89.4], '546': [44.0, -87.9], '547': [44.3, -90.8], '548': [46.7, -92.1], '549': [45.0, -87.6],
  '550': [44.9, -93.3], '551': [44.9, -93.3], '553': [45.0, -93.3], '554': [44.9, -93.3], '555': [45.0, -93.3], '556': [46.8, -92.1], '557': [46.8, -92.1], '558': [46.8, -92.1], '559': [44.2, -94.0], '560': [45.5, -94.2],
  '561': [45.0, -93.5], '562': [44.0, -92.5], '563': [44.0, -92.5], '564': [44.9, -93.1], '565': [44.9, -93.1], '566': [47.5, -94.9], '567': [48.1, -96.8],
  // Texas
  '750': [32.8, -96.8], '751': [32.8, -96.8], '752': [32.8, -96.8], '753': [32.8, -96.8], '754': [33.2, -97.1], '755': [33.4, -94.0], '756': [32.4, -99.7], '757': [33.9, -98.5], '758': [35.2, -101.8], '759': [33.9, -98.5],
  '760': [32.7, -97.3], '761': [32.7, -97.3], '762': [32.7, -97.3], '763': [32.7, -97.3], '764': [31.6, -97.1], '765': [31.1, -97.7], '766': [32.5, -97.3], '767': [31.8, -106.4], '768': [31.8, -106.4], '769': [32.4, -104.2],
  '770': [29.8, -95.4], '772': [29.8, -95.4], '773': [29.8, -95.4], '774': [29.8, -95.4], '775': [29.8, -95.4], '776': [30.1, -93.7], '777': [30.1, -94.1], '778': [27.8, -97.4], '779': [27.5, -99.5], '780': [29.4, -98.5],
  '781': [29.4, -98.5], '782': [29.4, -98.5], '783': [27.8, -97.4], '784': [27.5, -97.8], '785': [26.2, -98.2], '786': [30.3, -97.7], '787': [30.3, -97.7], '788': [30.3, -97.7], '789': [30.1, -97.3],
  // Mountain West
  '800': [39.7, -105.0], '801': [39.7, -105.0], '802': [39.7, -105.0], '803': [40.0, -105.3], '804': [39.7, -105.0], '805': [39.6, -104.8], '806': [39.7, -105.0], '807': [40.4, -104.7], '808': [38.8, -104.8], '809': [38.8, -104.8],
  '810': [38.8, -104.8], '811': [38.5, -107.9], '812': [37.3, -107.9], '813': [37.3, -108.6], '814': [39.1, -108.5], '815': [40.5, -107.5], '816': [39.1, -108.5],
  '820': [41.1, -104.8], '821': [42.8, -106.3], '822': [44.3, -105.5], '823': [42.8, -108.7], '824': [41.3, -105.6], '825': [42.1, -104.2], '826': [41.8, -107.2], '827': [43.8, -110.8], '828': [44.3, -105.5], '829': [44.8, -106.9], '830': [44.0, -108.0], '831': [44.8, -111.0],
  '832': [43.6, -116.2], '833': [42.6, -114.5], '834': [42.9, -112.5], '835': [46.4, -117.0], '836': [43.0, -115.3], '837': [43.5, -116.6], '838': [47.7, -116.8],
  '840': [40.8, -111.9], '841': [40.8, -111.9], '842': [41.2, -111.9], '843': [41.7, -111.8], '844': [41.1, -112.0], '845': [39.5, -111.0], '846': [38.6, -109.6], '847': [37.1, -113.6],
  '850': [33.4, -112.1], '851': [33.4, -112.1], '852': [33.4, -112.1], '853': [33.4, -112.1], '855': [33.3, -111.8], '856': [32.2, -110.9], '857': [32.2, -110.9], '859': [34.5, -112.5], '860': [33.7, -112.1], '863': [34.5, -114.4], '864': [35.2, -111.6], '865': [31.6, -110.3],
  // West Coast
  '889': [39.5, -119.8], '890': [36.2, -115.1], '891': [36.2, -115.1], '893': [39.5, -119.8], '894': [39.5, -119.8], '895': [39.5, -119.8], '897': [39.5, -119.8], '898': [38.8, -119.9],
  '900': [34.1, -118.3], '901': [34.1, -118.3], '902': [33.9, -118.4], '903': [33.8, -118.3], '904': [34.2, -118.5], '905': [33.9, -118.4], '906': [34.1, -118.3], '907': [34.1, -118.3], '908': [33.8, -118.2], '910': [34.0, -117.9],
  '911': [34.1, -118.2], '912': [34.2, -118.4], '913': [34.4, -118.5], '914': [34.3, -118.4], '915': [34.2, -118.2], '916': [34.1, -118.3], '917': [34.0, -118.2], '918': [34.0, -117.9], '919': [33.8, -118.0], '920': [32.7, -117.2],
  '921': [32.7, -117.2], '922': [33.2, -117.3], '923': [33.8, -116.5], '924': [33.9, -117.4], '925': [33.9, -117.4], '926': [33.7, -117.9], '927': [33.6, -117.9], '928': [33.7, -118.0], '930': [34.4, -119.7], '931': [34.9, -120.4],
  '932': [36.3, -119.3], '933': [35.4, -119.0], '934': [34.0, -118.3], '935': [35.1, -118.9], '936': [36.7, -119.8], '937': [36.7, -119.8], '938': [36.7, -119.8], '939': [36.1, -120.4], '940': [37.8, -122.4], '941': [37.8, -122.4],
  '942': [37.5, -122.3], '943': [37.4, -122.1], '944': [37.8, -122.3], '945': [37.8, -122.3], '946': [37.8, -122.3], '947': [37.9, -122.0], '948': [37.9, -122.5], '949': [37.5, -122.0], '950': [37.3, -121.9], '951': [37.3, -121.9],
  '952': [37.0, -121.6], '953': [36.6, -121.9], '954': [37.0, -122.0], '955': [40.8, -124.2], '956': [38.6, -121.5], '957': [38.6, -121.5], '958': [38.6, -121.5], '959': [39.1, -121.6], '960': [39.8, -122.2], '961': [38.4, -122.7],
  '967': [21.3, -157.9], '968': [21.3, -157.9],
  '970': [45.5, -122.7], '971': [45.5, -122.7], '972': [45.5, -122.7], '973': [45.4, -122.8], '974': [44.1, -123.1], '975': [42.3, -122.9], '976': [43.2, -123.4], '977': [43.8, -120.6], '978': [44.6, -121.2], '979': [45.9, -119.3],
  '980': [47.6, -122.3], '981': [47.6, -122.3], '982': [47.3, -122.3], '983': [47.2, -122.5], '984': [47.3, -122.5], '985': [47.0, -122.9], '986': [45.6, -122.7], '988': [46.6, -120.5], '989': [46.3, -119.3], '990': [47.7, -117.4],
  '991': [47.7, -117.4], '992': [47.7, -117.4], '993': [46.4, -117.0], '994': [48.5, -117.9],
  '995': [61.2, -149.9], '996': [64.8, -147.7], '997': [64.8, -147.7], '998': [61.2, -149.9], '999': [55.3, -131.7],
}

// Haversine formula to calculate distance between two coordinates
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Get coordinates for a zip code (uses first 3 digits)
function getZipCoordinates(zip: string): [number, number] | null {
  const prefix = zip.substring(0, 3)
  return ZIP_COORDINATES[prefix] || null
}

// Distance info returned to the UI
interface DistanceInfo {
  message: string
  distance: string
  fromState?: string
  toState?: string
  isEstimate?: boolean
}

// Get distance message based on miles
function getDistanceMessage(miles: number): { message: string; distance: string } {
  const distanceStr = miles < 10 ? `${Math.round(miles)} mi` : `${Math.round(miles).toLocaleString()} miles`
  
  if (miles < 10) {
    return {
      message: "A local move — nice! Local movers often offer the best rates for short distances.",
      distance: distanceStr
    }
  } else if (miles < 50) {
    return {
      message: "Looks like you're staying nearby — movers on this route tend to be more competitive on pricing.",
      distance: distanceStr
    }
  } else if (miles < 150) {
    return {
      message: "An in-state move — you'll have plenty of mover options for this distance.",
      distance: distanceStr
    }
  } else if (miles < 500) {
    return {
      message: "Moving across state lines — we'll match you with movers licensed for interstate moves.",
      distance: distanceStr
    }
  } else {
    return {
      message: "That's a big move! We'll find long-distance specialists with the best rates for your route.",
      distance: distanceStr
    }
  }
}

// Get coordinates for a zip — tries ZIP_COORDINATES first, falls back to state centroids
function getCoordinatesForZip(zip: string): { coords: [number, number]; isEstimate: boolean } | null {
  // Try exact 3-digit prefix lookup first
  const exact = getZipCoordinates(zip)
  if (exact) return { coords: exact, isEstimate: false }
  
  // Fall back to state centroid
  const state = getStateFromZip(zip)
  if (state) {
    // stateCentroids format: [longitude, latitude] — flip to [latitude, longitude]
    const centroid = stateCentroids[state.name]
    if (centroid) return { coords: [centroid[1], centroid[0]], isEstimate: true }
  }
  
  return null
}

// Map 3-digit zip code prefix to US state
function getStateFromZip(zip: string): { abbr: string; name: string } | null {
  if (zip.length < 3) return null
  const prefix = parseInt(zip.substring(0, 3), 10)
  if (isNaN(prefix)) return null

  // US zip prefix ranges → state
  const ranges: [number, number, string, string][] = [
    [5, 5, 'NY', 'New York'],
    [6, 9, 'PR', 'Puerto Rico'],
    [10, 27, 'MA', 'Massachusetts'],
    [28, 29, 'RI', 'Rhode Island'],
    [30, 38, 'NH', 'New Hampshire'],
    [39, 49, 'ME', 'Maine'],
    [50, 59, 'VT', 'Vermont'],
    [60, 69, 'CT', 'Connecticut'],
    [70, 89, 'NJ', 'New Jersey'],
    [100, 149, 'NY', 'New York'],
    [150, 196, 'PA', 'Pennsylvania'],
    [197, 199, 'DE', 'Delaware'],
    [200, 205, 'DC', 'Washington DC'],
    [206, 219, 'MD', 'Maryland'],
    [220, 246, 'VA', 'Virginia'],
    [247, 268, 'WV', 'West Virginia'],
    [270, 289, 'NC', 'North Carolina'],
    [290, 299, 'SC', 'South Carolina'],
    [300, 319, 'GA', 'Georgia'],
    [320, 349, 'FL', 'Florida'],
    [350, 369, 'AL', 'Alabama'],
    [370, 385, 'TN', 'Tennessee'],
    [386, 397, 'MS', 'Mississippi'],
    [400, 427, 'KY', 'Kentucky'],
    [430, 459, 'OH', 'Ohio'],
    [460, 479, 'IN', 'Indiana'],
    [480, 499, 'MI', 'Michigan'],
    [500, 528, 'IA', 'Iowa'],
    [530, 549, 'WI', 'Wisconsin'],
    [550, 567, 'MN', 'Minnesota'],
    [570, 577, 'SD', 'South Dakota'],
    [580, 588, 'ND', 'North Dakota'],
    [590, 599, 'MT', 'Montana'],
    [600, 629, 'IL', 'Illinois'],
    [630, 658, 'MO', 'Missouri'],
    [660, 679, 'KS', 'Kansas'],
    [680, 693, 'NE', 'Nebraska'],
    [700, 714, 'LA', 'Louisiana'],
    [716, 729, 'AR', 'Arkansas'],
    [730, 749, 'OK', 'Oklahoma'],
    [750, 799, 'TX', 'Texas'],
    [800, 816, 'CO', 'Colorado'],
    [820, 831, 'WY', 'Wyoming'],
    [832, 838, 'ID', 'Idaho'],
    [840, 847, 'UT', 'Utah'],
    [850, 865, 'AZ', 'Arizona'],
    [870, 884, 'NM', 'New Mexico'],
    [889, 898, 'NV', 'Nevada'],
    [900, 961, 'CA', 'California'],
    [967, 968, 'HI', 'Hawaii'],
    [970, 979, 'OR', 'Oregon'],
    [980, 994, 'WA', 'Washington'],
    [995, 999, 'AK', 'Alaska'],
  ]

  for (const [lo, hi, abbr, name] of ranges) {
    if (prefix >= lo && prefix <= hi) return { abbr, name }
  }
  return null
}

// Inline badge shown inside the zip input field
function ZipStateBadge({ zip }: { zip: string }) {
  const state = React.useMemo(() => getStateFromZip(zip), [zip])
  const isComplete = zip.length === 5

  if (zip.length < 3) return null

  // 5 digits entered but no state match → invalid
  if (isComplete && !state) {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-feedback-error bg-red-50 px-2.5 py-1 rounded-full">
        <AlertCircle className="w-3 h-3" />
        Invalid
      </span>
    )
  }

  if (!state) return null

  // 3-4 digits — state preview (subtle)
  if (!isComplete) {
    return (
      <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
        {state.name}
      </span>
    )
  }

  // 5 digits + valid state — confirmed
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-feedback-success bg-emerald-50 px-2.5 py-1 rounded-full">
      <Check className="w-3.5 h-3.5" />
      {state.name}
    </span>
  )
}

interface ZipcodesScreenProps {
  initialFromZip?: string
  initialToZip?: string
  onBack?: () => void
  onSubmit?: (data: { zipFrom: string; zipTo: string }) => void
}

/**
 * ZipcodesScreen
 * 
 * Step 1 of 5 - "Where are you moving?"
 * Collects origin and destination zip codes
 */
export function ZipcodesScreen({ 
  initialFromZip = '',
  initialToZip = '',
  onBack, 
  onSubmit 
}: ZipcodesScreenProps) {
  const [zipFrom, setZipFrom] = React.useState(initialFromZip)
  const [zipTo, setZipTo] = React.useState(initialToZip)
  const [errors, setErrors] = React.useState<{ zipFrom?: string; zipTo?: string }>({})
  
  // Check if both zips are valid 5-digit numbers
  const isValid = MOVING_VALIDATION.zipCode.pattern.test(zipFrom) && 
                  MOVING_VALIDATION.zipCode.pattern.test(zipTo)
  
  // Resolve states for each zip
  const fromState = React.useMemo(() => getStateFromZip(zipFrom), [zipFrom])
  const toState = React.useMemo(() => getStateFromZip(zipTo), [zipTo])
  
  // Calculate distance instantly when both zip codes are valid
  const distanceInfo: DistanceInfo | null = React.useMemo(() => {
    if (zipFrom.length !== 5 || zipTo.length !== 5) return null
    
    const from = getCoordinatesForZip(zipFrom)
    const to = getCoordinatesForZip(zipTo)
    
    if (from && to) {
      const miles = getDistance(from.coords[0], from.coords[1], to.coords[0], to.coords[1])
      const isEstimate = from.isEstimate || to.isEstimate
      const msg = getDistanceMessage(miles)
      return {
        ...msg,
        distance: isEstimate ? `~${msg.distance}` : msg.distance,
        fromState: fromState?.name,
        toState: toState?.name,
        isEstimate,
      }
    }
    
    // Both zips entered but neither could be geolocated at all
    return {
      message: "We'll match you with movers experienced on this route.",
      distance: "Distance TBD",
      fromState: fromState?.name,
      toState: toState?.name,
    }
  }, [zipFrom, zipTo, fromState, toState])
  
  const handleZipChange = (field: 'zipFrom' | 'zipTo', value: string) => {
    // Only allow numeric input, max 5 digits
    const cleaned = value.replace(/\D/g, '').slice(0, 5)
    
    if (field === 'zipFrom') {
      setZipFrom(cleaned)
      if (errors.zipFrom) setErrors(prev => ({ ...prev, zipFrom: undefined }))
    } else {
      setZipTo(cleaned)
      if (errors.zipTo) setErrors(prev => ({ ...prev, zipTo: undefined }))
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { zipFrom?: string; zipTo?: string } = {}
    
    if (!MOVING_VALIDATION.zipCode.pattern.test(zipFrom)) {
      newErrors.zipFrom = MOVING_VALIDATION.zipCode.message
    }
    if (!MOVING_VALIDATION.zipCode.pattern.test(zipTo)) {
      newErrors.zipTo = MOVING_VALIDATION.zipCode.message
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onSubmit?.({ zipFrom, zipTo })
  }
  
  return (
    <FormLayout 
      currentStep={1} 
      onBack={onBack}
      progressSubtitles={MOVING_PROGRESS_SUBTITLES}
      progressTimeEstimates={MOVING_PROGRESS_TIME_ESTIMATES}
      totalSteps={MOVING_TOTAL_STEPS}
      progressUnified
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        <div className="space-y-8">
          {/* Headline */}
          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">
              Where are you moving?
            </h1>
            <p className="text-body-sm text-neutral-500">
              We&apos;ll find top-rated movers who service your route.
            </p>
          </div>
          
          {/* Zip Code Inputs */}
          <div className="space-y-4 max-w-md mx-auto">
            {/* Moving From */}
            <div>
              <label className="flex items-center gap-2 text-body-sm font-medium text-neutral-800 mb-2">
                <MapPin className="w-4 h-4 text-primary-700" />
                Moving from
              </label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter zip code"
                value={zipFrom}
                onChange={(e) => handleZipChange('zipFrom', e.target.value)}
                error={errors.zipFrom}
                maxLength={5}
                suffix={<ZipStateBadge zip={zipFrom} />}
              />
            </div>
            
            {/* Moving To */}
            <div>
              <label className="flex items-center gap-2 text-body-sm font-medium text-neutral-800 mb-2">
                <MapPin className="w-4 h-4 text-feedback-success" />
                Moving to
              </label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter zip code"
                value={zipTo}
                onChange={(e) => handleZipChange('zipTo', e.target.value)}
                error={errors.zipTo}
                maxLength={5}
                suffix={<ZipStateBadge zip={zipTo} />}
              />
            </div>
            
            {/* Distance Message */}
            {distanceInfo && (
              <div className="animate-fade-in bg-primary-300 rounded-lg p-4 space-y-2.5">
                {/* Route header */}
                {distanceInfo.fromState && distanceInfo.toState && (
                  <div className="flex items-center gap-2 text-xs font-medium text-primary-700">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{distanceInfo.fromState}</span>
                    <span className="text-neutral-400">→</span>
                    <span>{distanceInfo.toState}</span>
                  </div>
                )}
                {/* Distance + message */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full flex-shrink-0">
                    <Route className="w-5 h-5 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-neutral-900">
                      {distanceInfo.distance}
                      {distanceInfo.isEstimate && (
                        <span className="text-xs font-normal text-neutral-500 ml-1.5">est.</span>
                      )}
                    </p>
                    <p className="text-xs text-neutral-600">{distanceInfo.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* CTA */}
          <StickyButtonContainer>
            <Button 
              type="submit" 
              fullWidth 
              showTrailingIcon
              disabled={!isValid}
            >
              Continue
            </Button>
            
            {/* Footer badges */}
            <div className="flex justify-center items-center gap-4 text-body-sm text-neutral-500 mt-3">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                Data encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Takes 60 seconds
              </span>
            </div>
          </StickyButtonContainer>
        </div>
      </form>
    </FormLayout>
  )
}

export default ZipcodesScreen
