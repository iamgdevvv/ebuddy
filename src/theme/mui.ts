'use client';
import { createTheme } from '@mui/material/styles';
import { colorSchemes, typography, shadows, shape } from '@theme/customizations/themePrimitives';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';

const muiTheme = createTheme({
	// For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
	cssVariables: {
		colorSchemeSelector: 'data-mui-color-scheme',
		cssVarPrefix: 'template',
	},
	colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
	typography,
	shadows,
	shape,
	components: {
		...inputsCustomizations,
		...dataDisplayCustomizations,
		...feedbackCustomizations,
		...navigationCustomizations,
		...surfacesCustomizations,
	},
});

export default muiTheme;

