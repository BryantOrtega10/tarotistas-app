import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.mdccolombia.tarotsabila.tarotista",
	appName: "Tarot de Sábila",
	webDir: "dist",
	server: {
		androidScheme: "https",
	},
	plugins: {
		SocialLogin: {
			providers: {
				google: true,
				facebook: false,
				apple: false,
				twitter: false,
			},
		},
	},
};

export default config;
