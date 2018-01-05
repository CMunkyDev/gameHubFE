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
    primary1Color: "#76323F",
    primary2Color: "#76323F",
    primary3Color: "#76323F",
    accent1Color: "#6D7993",
    accent2Color: "#9099A2",
    accent3Color: "#9099A2",
    textColor: _colors.fullWhite,
    secondaryTextColor: "#D5D5D5",
    alternateTextColor: '#D5D5D5',
    canvasColor: '#D5D5D5',
    borderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
    disabledColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
    pickerHeaderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12),
    clockCircleColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12)
  }
};