import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.minus.worlds',
  appName: 'MinusWorlds',
  webDir: 'www',
  bundledWebRuntime: false,
  loggingBehavior: "none",
	plugins: {
		SplashScreen: {
		  launchShowDuration: 2000,
		  launchAutoHide: false,
		//   backgroundColor: "#ffffffff",
		  androidSplashResourceName: "splash",
		  androidScaleType: "CENTER_CROP",
		  showSpinner: true,
		  androidSpinnerStyle: "large",
		  iosSpinnerStyle: "small",
		  spinnerColor: "#999999",
		  splashFullScreen: true,
		  splashImmersive: true,
		  layoutName: "launch_screen",
		  useDialog: true
		},
		PushNotifications: {
		  presentationOptions: ["badge", "sound", "alert"]
		}
	},
	cordova: {}
};

export default config;
