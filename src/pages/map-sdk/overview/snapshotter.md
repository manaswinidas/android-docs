---
title: "Snapshotter"
description: "Take a static snapshot photo of the map to use on the device in your app, a notification, or even to share with others"
prependJs:
  - "import { Floater } from '../../../components/floater';"
sideNavSections:
  - title: "Taking a map snapshot"
  - title: "Adding a marker to the map image"
---

# Snapshotter

The snapshot functionality of the Mapbox Maps SDK for Android generates a static map image to use in inside of your Android project. Take a snapshot of any Mapbox map and add the image into:

- another screen in your app
- a home screen
- a home screen widget
- a notification
- a list/recyclerview
- wherever else a `Bitmap` can be placed

A Mapbox map doesn't need to be displayed to use the snapshot functionality. `MapSnapshotter` can be invoked anywhere in the app.

Unless you have the map tiles already cached, the device _will_ need an internet connection to download the style and tiles necessary to render the map, and thus, the snapshot.

Snapshot generation can happen on the device's background thread, so don’t worry about compromising the user experience.

This snapshot feature is different than [the Mapbox Static API](https://www.mapbox.com/android-docs/java-sdk/overview/static-image). [The `MapboxStaticMap` class](https://github.com/mapbox/mapbox-java/blob/afe9e88c9a09a413405571678d17499aa0a5f25c/services-staticmap/src/main/java/com/mapbox/api/staticmap/v1/MapboxStaticMap.java) helps you build a URL to request a static map image which looks like an embedded map without interactivity or controls. 

## Taking a map snapshot

The `MapSnapshotter` constructor requires `MapSnapshotter.Options` object. The options 

```java
MapSnapshotter.Options snapShotOptions = new MapSnapshotter.Options(500, 500);

snapShotOptions.withRegion(mapboxMap.getProjection().getVisibleRegion().latLngBounds);
snapShotOptions.withStyle(mapboxMap.getStyleUrl());

MapSnapshotter mapSnapshotter = new MapSnapshotter(this, snapShotOptions);
```

Various settings within `Options`:

| Method | Description |
| --- | --- |
| `withCameraPosition` | The camera position to use for the snapshot image. This position is overriden if `withRegion` is also used.
| `withLogo ` | A boolean flag to determine whether the Mapbox logo is included in the snapshot image.
| `withPixelRatio ` | The pixel ratio to use. The default is 1.
| `withRegion ` | The region to show in the snapshot image. This is applied after the camera position.
| `withStyle ` | The map style to use in the snapshot image.
| `withStyleJson ` | The map style JSON to use instead of a map style URL.

Start the snapshot process with `start()` once you've created your `MapSnapshotter` object. When `MapSnapshot` is ready, use `snapshot.getBitmap()` to retrieve the `Bitmap` image.

```java
mapSnapshotter.start(new MapSnapshotter.SnapshotReadyCallback() {
	@Override
	public void onSnapshotReady(MapSnapshot snapshot) {
	
	Bitmap bitmapImage = snapshot.getBitmap();
		
	// Use bitmapImage however you'd like
	
	}
});
```    

Once you have the `Bitmap` image, you're free to use it however you'd like.

The Mapbox Android demo app has two examples that show how the snapshot `Bitmap` images can be used:

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/snapshot/SnapshotShareActivity.java"
    title="Sharing"
    category="example"
    text="Share the real-time map snapshot image"
  />
}}

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/snapshot/SnapshotNotificationActivity.java"
    title="UI"
    category="example"
    text="Use the map snapshot image in a notification"
  />
}}

