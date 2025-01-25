import '@mui/material/SvgIcon';
import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/Chip';

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		sidebar: true;
		layoutBackground: true;
		form: true;
	}
}

declare module '@mui/material/SvgIcon' {
	interface SvgIconPropsColorOverrides {
		sidebar: true;
		layoutBackground: true;
		form: true;
	}
}

declare module '@mui/material/Chip' {
	interface ChipPropsColorOverrides {
		sidebar: true;
		layoutBackground: true;
		form: true;
	}
}

declare module '@mui/material/styles/createPalette' {
	interface PaletteOptions {
		sidebar?: {
			light?: string;
			main: string;
			dark?: string;
			contrastText?: string;
		};
		layoutBackground?: {
			default: string;
			topBar: string;
		};
		form: {
			isDirty: {
				main: string;
				hover: string;
			};
			isError: {
				main: string;
				hover: string;
			};
		};
	}
	interface Palette {
		sidebar: {
			light: string;
			main: string;
			dark: string;
			contrastText: string;
		};
		layoutBackground: {
			default: string;
			topBar: string;
		};
		form: {
			isDirty: {
				main: string;
				hover: string;
			};
			isError: {
				main: string;
				hover: string;
			};
		};
	}
}
