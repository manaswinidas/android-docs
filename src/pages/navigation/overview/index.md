---
title: "Introduction"
description: "Official documentation and overview of the Mapbox Navigation SDK for Android."
overviewHeaderProps:
  imageId: overviewNavigationSdk
  sdk: Navigation SDK
  changelogLink: "https://github.com/mapbox/mapbox-navigation-android/blob/master/CHANGELOG.md"
  ghLink: "https://github.com/mapbox/mapbox-navigation-android"
  sdkFeatures:
    - Off-route Detection
    - Timed Instructions
    - Snap-to-Route
    - Route Progress Information
    - Traffic Routing
prependJs:
  - "import { NAVIGATION_VERSION } from '../../../constants';"
---
The Navigation SDK is built on top of our Directions API and contains logic needed to get timed navigation instructions. The calculations compare the user’s current location to their route and provide critical by-the-second information. This includes voice instruction announcements, real-time user progress to their destination, and detecting when a user goes off-route; all critical when building a navigation app.

## Install the Navigation SDK

Before developing your app with the Navigation SDK, you'll need to add the SDK as a dependency. Note that while we show how to insert the stable version of the SDK inside your project, you can also use the nightly build/snapshot or the beta version if one is available. You can find the dependency given below in the MavenCentral repository.

### 1. Add the dependency

1. Start Android Studio
2. Open up your app's `build.gradle` file
3. Make sure that your project's `minSdkVersion` is at API 15 or higher
4. Under dependencies, add a new build rule for the latest `mapbox-android-navigation`
5. Click the `Sync Project with Gradle Files` near the toolbar in Studio.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-navigation:{{ NAVIGATION_VERSION }}'
}
```

### 2. Get an access token

If you don't have a Mapbox account, sign up for one [here](https://www.mapbox.com/signup/), then navigate to your [Account page](https://www.mapbox.com/account/) and copy your **default public token** to your clipboard. After you've added the Navigation SDK as a dependency inside your Android project, open the `string.xml` file, create a new string, and paste the access token. Then, pass this into the Navigation SDK.

```java
@Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    MapboxNavigation navigation = new MapboxNavigation(this, "<access token>");

    ...

  }
```

### 3. Setup permissions

The Navigation SDK makes use of the Android manifest merge feature to reduce the need to include any Navigation SDK requirements inside your application's manifest file. You'll need to include either the Fine or Coarse location permission for navigation to work properly. The user location permission should also be checked during runtime using the PermissionManager if your app targets the Android API 23 or higher.

For best navigation results, we strongly recommend using the fine location permission, which gives a more precise fix on the user's current location.

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### 4. Requesting a route

Now that you have created a way for the `MapboxNavigation` object to get the user's location, the other thing needed is a route. Use `NavigationRoute` and pass in an origin, destination, and a callback to handle the response. If you've ever worked with Retrofit, the callback here will look familiar since this is what we are using under the hood. Inside the `onResponse`, you can draw the directions route on a map or show time and distance using the full directions response.

For increasing the likelihood that the route you receive starts off in the same direction the user is traveling, you also have the option to pass in the user’s location bearing value; the value ranges from 0 to 355.

```java
// From Mapbox to The White House
Point origin = Point.fromLngLat(-77.03613, 38.90992);
Point destination = Point.fromLngLat(-77.0365, 38.8977);

NavigationRoute.builder()
      .accessToken(Mapbox.getAccessToken())
      .origin(origin)
      .destination(destination)
      .build()
      .getRoute(new Callback<DirectionsResponse>() {
        @Override
        public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {

        }

        @Override
        public void onFailure(Call<DirectionsResponse> call, Throwable t) {

        }
      });
```

If your navigation involves a bunch of pick-up and drop-off points, you can add up to 25 coordinates to the `NavigationRoute` builder; these are considered stops in between the origin and destination `Position`s (in the order that you add them - first waypoint is the first stop):

```java
NavigationRoute.Builder builder = NavigationRoute.builder()
      .accessToken(Mapbox.getAccessToken())
      .origin(origin)
      .destination(destination);

    for (Point waypoint : waypoints) {
      builder.addWaypoint(waypoint);
    }

    builder.build();
```

## MapboxNavigation Object

You will find most of the navigation APIs inside the `MapboxNavigation` class such as starting and ending the navigation session or attaching listeners. Assign and initialize a new instance of `MapboxNavigation` inside your navigation activity. When initializing, you'll need to pass in a `Context` and your Mapbox access token. Read the access token section in this getting started document to learn how to get a free access token.

```java
MapboxNavigation navigation = new MapboxNavigation(this, MAPBOX_ACCESS_TOKEN);
```

You can also optionally pass in a `MapboxNavigationOptions` object if you’d like to change the default behavior of the navigation SDK. Note that many of the options offered must be set before the `MapboxNavigation`  object is initialized.

## LocationEngine

Navigation requires the user's location to run; this is done using the `LocationEngine` class introduced in the 2.0 release of the Mapbox Java SDK. [Visit the `LocationEngine` documentation](https://www.mapbox.com/android-docs/core/overview/#locationengine) for detailed instructions on how to use this class. You'll need to set up an instance of a location engine and pass it in to the `MapboxNavigation` object.

```java
Location location = new LocationEngineProvider(this).obtainBestLocationEngineAvailable();
navigation.setLocationEngine(locationEngine);
```

## Lifecycle Methods

Inside your application's activity, you'll want to override the onDestroy lifecycle method, end the navigation session (if running) and use the `MabpoxNavigation#onDestroy` method. Doing this prevents any memory leaks and ensures proper shutdown of the service.

```java
@Override
protected void onDestroy() {
  super.onDestroy();
  // End the navigation session
  navigation.endNavigation();
  navigation.onDestroy();
}
```

## Navigation Running

The `onRunning` callback's helpful for being notified when the navigation session has started, the user has canceled the session, or the user has arrived at their final destination. From this information, you can decide when to show navigation notifications, know when it's safe to stop requesting user location updates, and much more.

```java
navigation.addNavigationEventListener(new NavigationEventListener() {
  @Override
  public void onRunning(boolean running) {

  }
});
```

<!-- ### Running navigation in background -->
