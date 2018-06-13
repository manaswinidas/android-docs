---
title: "Introduction"
description: "The official overview documentation for the Mapbox Maps SDK for Android. Learn how to customize your Android app's maps, visualize data, and much more."
overviewHeaderProps:
  imageId: overviewMapSdk
  versionConstant: MAP_SDK_VERSION
  changelogLink: "https://www.github.com/mapbox/mapbox-gl-native/blob/master/platform/android/CHANGELOG.md"
  ghLink: "https://github.com/mapbox/mapbox-gl-native"
  installLink: "https://www.mapbox.com/install/android"
  sdkFeatures:
    - "Live traffic"
    - "Runtime styling"
    - "Annotations"
    - "3D extrusions"
    - "Offline support"
prependJs:
  - "import { Floater } from '../../../components/floater';"
  - "import { MAP_SDK_VERSION } from '../../../constants';"
---
The Mapbox Maps SDK for Android is an open source toolset for displaying maps inside of your Android application. [Mapbox's demo app on the Google Play Store](https://play.google.com/store/apps/details?id=com.mapbox.mapboxandroiddemo&hl=en) includes many examples of how to use Mapbox Maps. Various pages in this documentation reference examples in the demo app.

## Install the Maps SDK

Before starting to develop your application with the Maps SDK, you'll need to add the SDK as a dependency. You can find the following dependency given below in the MavenCentral repository. While this document shows how to install the SDK through gradle, we also offer support for [Fabric](https://fabric.io/kits/android/mapbox/install).

While we show how to insert the stable version of the SDK inside your project, you can also use the nightly build/snapshot or the beta version, if one is available. Find more information about how to do this inside the project’s [GitHub repository](https://github.com/mapbox/mapbox-gl-native/tree/master/platform/android/#readme).

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes. You can also shrink the file APK file size by making use of APK splitting.

### 1. Add the dependency

1. Start Android Studio
2. Open up your application's `build.gradle`
3. Make sure that your project's `minSdkVersion` is at API 14 or higher
4. Under dependencies, add a new build rule for the latest `mapbox-android-sdk`
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-sdk:{{ MAP_SDK_VERSION }}'
}
```

### 2. Get an access token

If you don't have a Mapbox account, sign up for one [here](https://www.mapbox.com/signup/), then navigate to your [Account page](https://www.mapbox.com/account/) and copy your **default public token** to your clipboard. After you've added the Maps SDK as a dependency inside your Android project, open the `string.xml` file, create a new string, and paste the access token. Then to pass this into the Maps SDK, you'll want to place the access token inside of your application's `onCreate()` method.

```java
public class MyApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();

    // Mapbox Access token
    Mapbox.getInstance(getApplicationContext(), "<your access token>");
  }
}
```

### 3. Setup permissions

Starting in 5.0, we are making use of the Manifest merge feature to reduce the need to include any Maps SDK required things inside of your application's manifest file. You'll need to add _either_ the Fine **or** Coarse location permission if you plan to display a user's location on the map or get the user's location information. The user location permission should also be checked during runtime using the PermissionManager.

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 4. Add a map

Open the activity Java file you'd like to include the map in and add the code below to the file.

```java
private MapView mapView;

@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);

  mapView = (MapView) findViewById(R.id.mapView);
  mapView.onCreate(savedInstanceState);
  mapView.getMapAsync(new OnMapReadyCallback() {
    @Override
    public void onMapReady(MapboxMap mapboxMap) {

      // Customize map with markers, polylines, etc.

    }
  });
}

  // Add required Lifecycle methods listed in next section
```

Open the acitvities layout file and add the map view within your layout.

```xml
<com.mapbox.mapboxsdk.maps.MapView
  android:id="@+id/mapView"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  mapbox:mapbox_styleUrl="@string/mapbox_style_mapbox_streets" />
```

### 5. Lifecycle methods

The MapView contains its own lifecycle methods for managing Android's OpenGL lifecycle, which must be called directly from the containing Activity. In order for your app to correctly call the MapView's lifecycle methods, you must override the following lifecycle methods in the Activity that contains the MapView and call the respective MapView method. For example, your onStart() method should look like this:

```java
@Override
protected void onStart() {
  super.onStart();
  mapView.onStart();
}
```

All the lifecycle methods that need to be overridden:

```java
onCreate();
onStart();
onResume();
onPause();
onStop();
onSaveInstanceState();
onLowMemory();
onDestroy();
```

## Attribution

<!-- {{
  <Floater
    url="https://www.mapbox.com/help/attribution/"
    title="Attribution guidelines"
    category="help"
    text="Learn more about what kinds of attribution Mapbox require and why."
  />
}} -->

You must include the Mapbox wordmark and attribution notice on any map that uses the Mapbox Maps SDK for Android. We provide an Attribution layout that includes all required information and can be customized either in xml or using the `UiSettings` object.

You may adjust the position of the Mapbox wordmark and attribution notice, but they must stay visible on the map. You may also change the background and text color of the attribution notice to best match your design aesthetics, but all information must be  legible.

You may not otherwise alter the Mapbox wordmark or text attribution notice. If you wish to move or to remove the Mapbox wordmark, please [contact our sales team](https://www.mapbox.com/contact/sales/) to discuss options available under our Enterprise plans.

## Telemetry opt out
Mapbox Telemetry is a [powerful location analytics platform](https://www.mapbox.com/telemetry/) included in this SDK. By default, anonymized location and usage data is sent to Mapbox whenever the host app causes it to be gathered. The [Mapbox Terms of Service](https://www.mapbox.com/tos/) require your app to provide users with a way to individually opt out of Mapbox Telemetry, which is provided automatically as part of the [attribution](#attribution) control. If you hide the attribution control, you must provide an alternative opt out for your users to use.

## MapView XML attributes

To further customize the map such as setting the starting camera position, style, or adjusting the UI, attributes can be added inside the xml map view. all `MapView` XML attributes start with
`mapbox_` for identification and for removing any potential conflicts with other libraries.

Some examples of `MapView` attributes are:

```xml
<com.mapbox.mapboxsdk.maps.MapView

  ...

  mapbox:mapbox_cameraTargetLat="-36.84"
  mapbox:mapbox_cameraTargetLng="174.76"
  mapbox:mapbox_cameraZoom="10"
  mapbox:mapbox_cameraBearing="34.33"
  mapbox:mapbox_cameraTilt="50.25"
  mapbox:mapbox_styleUrl="@string/mapbox_style_satellite_streets"
  mapbox:mapbox_cameraZoomMax="12.41"
  mapbox:mapbox_cameraZoomMin="6"
  mapbox:mapbox_uiRotateGestures="false"/>
```

Due to the current implementation of Android Studio, you can't autogenerate `MapView` attributes by typing. You can always [view the full list of `MapView` attributes here](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/res/values/attrs.xml).
