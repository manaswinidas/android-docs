---
title: "Off-Route Detection"
description: "The Mapbox Navigation SDK for Android offers off-route detection for your Android app's navigation experience. Read this documentation to learn how."
---

A default off-route detection class is included inside the Navigation SDK which measures the distance from the users actual location to the one you'd expect the user to be and where they should be. If the measured distance is greater than the set threshold, the `userOffRoute` callback will get invoked. It is within the `OffRouteListener` that you can handle a reroute event by using `MapboxNavigation#startNavigation(DirectionsRoute)`.

In addition the off-route callback, by default, is placed on a timer to not cause a constant rerouting loop, however, this value can also be adjusted in the options class; the default is 3 seconds.  
You are also able to adjust a minimum distance that must be traveled before the off-route callback can be called again; default is 50 meters.

```java
navigation.addOffRouteListener(new OffRouteListener() {
  @Override
  public void userOffRoute(Location location) {
    NavigationRoute.builder()
      .accessToken(Mapbox.getAccessToken())
      .origin(newOrigin)
      .destination(destination)
      .build().getRoute(new Callback<DirectionsResponse>() {
      @Override
      public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {
        // Update MapboxNavigation here with new route
        // MapboxNavigation#startNavigation
      }

      @Override
      public void onFailure(Call<DirectionsResponse> call, Throwable t) {

      }
    });
  }
});
```
