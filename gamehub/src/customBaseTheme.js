Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('material-ui/styles/colors');
var _colorManipulator = require('material-ui/utils/colorManipulator');
var _spacing = require('material-ui/styles/spacing');
var _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  spacing: _spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: "#0E0B16", //tab background color
    primary2Color: "#4717F6",
    primary3Color: "#0E0B16", //toggle unselected background color
    accent1Color: "#A239CA", //border color, logintab underline color
    accent2Color: "#4717F6", //header/toolbar background color
    accent3Color: "#A239CA",
    textColor: "#E7DFDD",
    secondaryTextColor: '#E7DFDD', //list subtitle color
    alternateTextColor: '#A239CA', //login/signup button background
    canvasColor: '#0E0B16', //bottom bar background, login/signup background
    borderColor: '#A239CA', //search bar underline
    disabledColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3), //search bar hint text
    pickerHeaderColor: _colors.fullWhite,
    clockCircleColor: _colors.fullWhite
  }
};