import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights, ITelemetryPlugin } from '@microsoft/applicationinsights-web';

class TelemetryService {
    appInsights:ApplicationInsights | null = null;
    reactPlugin:ReactPlugin | null = null;

    constructor() {
        this.reactPlugin = new ReactPlugin();
    }

    initialize(appInsightsInstrumentationKey, reactPluginConfig) {
        this.appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: appInsightsInstrumentationKey,
                maxBatchInterval: 0,
                disableFetchTracking: false,
                extensions: [this.reactPlugin as ITelemetryPlugin],
                extensionConfig: {
                    [this.reactPlugin?.identifier as string]: reactPluginConfig
                }
            }
        });
        this.appInsights.loadAppInsights();
    }
}

export let ai = new TelemetryService();