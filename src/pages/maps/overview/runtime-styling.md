---
title: "Runtime styling"
description: "Documentation for changing the look and feel of your Mapbox map in real time with the Mapbox Maps SDK for Android."
prependJs:
  - "import { Floater } from '../../../components/floater';"
---

{{
  <Floater
    url="/mapbox-gl-js/style-spec/"
    title="Style Spec Info"
    category="guide"
    text="View a full list of the features in runtime styling not specific to Android."
  />
}}

Using Runtime styling, you're able to dynamically change the look and feel of your map in real time. Lighten or darken the map based on the time of day, personalize icons and the colors of parks based on your users’ activity, switch languages on the fly, or bump the size of labels based on user preferences to improve legibility. Style existing map data or mix in your own – Runtime Styling is performant even with massive datasets.

Runtime styling expands upon the design power of Mapbox Studio and exposes all the same properties and attributes directly to mobile developers in our SDK.

If you'd like to add simple annotations on your map quickly, you might want to make use of the [annotations offered](https://www.mapbox.com/android-docs/map-sdk/overview/annotations/).

## Sources

Sources hold the data for layers to use in your map. There are a handful of different source types supported, choosing one depends on your data type. Adding a source won't instantly make data appear on the map because sources don't contain styling details like color or width. Layers refer to a source and give it a visual representation.

When creating a new source, two parameters are required, a source ID (String) and the source date.

### Vector

Vector source tiles must be in [Mapbox Vector Tile format](https://www.mapbox.com/developers/vector-tiles/). All layers that use a vector source must specify a "source-layer" value. For vector tiles hosted by Mapbox, the "url" value should be of the form `mapbox://mapid`.

```java
// Adding a vector source layer
VectorSource vectorSource = new VectorSource("vector-source", "mapbox://mapbox.mapbox-terrain-v2");
mapboxMap.addSource(vectorSource);
```

### Raster

Raster source tiles can be added to your map if they are in TileJSON format. If hosted by Mapbox, the "url" value should be of the form `mapbox://mapid`.

```java
// Adding a raster source layer
RasterSource rasterSource = new RasterSource("raster-source", "mapbox://mapbox.u8yyzaor");
mapboxMap.addSource(rasterSource);
```

### GeoJson

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/styles/LineLayerActivity.java"
    title="Add a GeoJSON source"
    category="example"
    text="Create a GeoJSON feature collection dynamically and then add it as a map source."
  />
}}

Adding a GeoJSON source can be done in a few different ways. You can provide a URL to the GeoJSON raw data hosted online, provide a link to a GeoJSON file hosted locally inside of the app's assets folder, or you can build your own GeoJSON feature collection directly inside of the code. The snippets of code below show the different ways to add a GeoJSON source to your map.

Add a GeoJSON source from a URL:

```java
URL geoJsonUrl = new URL("https://url-to-geojson-file.geojson");
GeoJsonSource geoJsonSource = new GeoJsonSource("geojson-source", geoJsonUrl);
mapboxMap.addSource(geoJsonSource);
```

Load a locally stored GeoJSON file. Either use the `loadJsonFromAsset()` method found below or use your own preferred way of loading in a JSON file:

```java
private String loadJsonFromAsset(String nameOfLocalFile) throws IOException {
  InputStream is = getAssets().open(nameOfLocalFile);
  int size = is.available();
  byte[] buffer = new byte[size];
  is.read(buffer);
  is.close();
  return new String(buffer, "UTF-8");
}

GeoJsonSource source = new GeoJsonSource("geojson-source", loadJsonFromAsset("local_file.geojson"));
mapboxMap.addSource(indoorBuildingSource);
```

Create a GeoJSON feature collection and then add it to your map:

```java
// Create a list to store our line coordinates.
List routeCoordinates = new ArrayList<Point>();
routeCoordinates.add(Point.fromLngLat(-118.394391, 33.397676));
routeCoordinates.add(Point.fromLngLat(-118.370917, 33.391142));

// Create the LineString from the list of coordinates and then make a GeoJSON FeatureCollection
// so that we can add the line to our map as a layer.

LineString lineString = LineString.fromLngLats(routeCoordinates);
FeatureCollection featureCollection = FeatureCollection.fromFeatures(
new Feature[]{Feature.fromGeometry(lineString)});

GeoJsonSource geoJsonSource = new GeoJsonSource("geojson-source", featureCollection);
mapboxMap.addSource(geoJsonSource);
```

{{
  <Floater
    url="https://www.mapbox.com/help/android-runtime-styling-intro/"
    title="Runtime intro"
    category="tutorial"
    text="Read an explanation and view the code for using runtime styling to change a map's water color."
  />
}}

A benefit of having your data inside a GeoJSON source is that you can update, remove, or add additional features inside the source at any time, providing a solution to animating data in your map through the Runtime Styling API. For example, using an Android [ValueAnimator](https://developer.android.com/reference/android/animation/ValueAnimator.html), you can move a feature by updating its coordinates within the GeoJSON data.

### Image

`ImageSource` allows for a georeferenced raster image to be shown on top of the map. The georeferenced image scales and rotates as the user zooms and rotates the map. The geographic location of the raster image content, supplied with `LatLngQuad`, can be non-axis aligned.

```java
// Set the latitude and longitude coordinates of the image's four corners
LatLngQuad quad = new LatLngQuad(
  new LatLng(46.437, -80.425),
  new LatLng(46.437, -71.516),
  new LatLng(37.936, -71.516),
  new LatLng(37.936, -80.425));
  
mapboxMap.addSource(new ImageSource(ID_IMAGE_SOURCE, quad, R.drawable));

// Add layer
RasterLayer layer = new RasterLayer(ID_IMAGE_LAYER, ID_IMAGE_SOURCE);
mapboxMap.addLayer(layer);
```    

The `setImage()` method is a convenient way to update the `ImageSource`'s image by passing in a drawable.

```java
mapboxMap.getSource(ID_IMAGE_SOURCE)).setImage(R.drawable.image_to_use)
```

### Custom geometry

There might be a situation when you want to draw a shape that doesn't fit the standard `Point`, `LineString`, `Polygon`, `MultiPoint`, `MultiLineString`, and `MultiPolygon` GeoJSON geometries. A `CustomGeometrySource` can help you achieve this. 

```java 
CustomGeometrySource source = new CustomGeometrySource(ID_GRID_SOURCE, GeometryTileProvider);
mapboxMap.addSource(source);
```

One example of `CustomGeometrySource` usage is to create a black grid on top of the map. This example's code can be found in [the `GridSourceActivity` of the Maps SDK for Android test application](https://github.com/mapbox/mapbox-gl-native/blob/4498917a3b9dbf6cc9728da01f479a027f27f902/platform/android/MapboxGLAndroidSDKTestApp/src/main/java/com/mapbox/mapboxsdk/testapp/activity/style/GridSourceActivity.java).


### Raster DEM

`RasterDemSource` currently supports Mapbox Terrain RGB (mapbox://mapbox.terrain-rgb) and [Mapzen Terrarium](https://mapzen.com/documentation/terrain-tiles/formats/#terrarium) tile formats.

The Mapbox terrain tileset is for adding hill terrain to any Mapbox map. Runtime styling can also be used to change the hillshade appearance.

```java
RasterDemSource rasterDemSource = new RasterDemSource("source-id", "mapbox://mapbox.terrain-rgb");
mapboxMap.addSource(rasterDemSource);

// Create hillshade layer source to map
HillshadeLayer hillshadeLayer = new HillshadeLayer("hillshade-layer-id", "source-id").withProperties(
  hillshadeHighlightColor(Color.parseColor(HILLSHADE_HIGHLIGHT_COLOR)),
  hillshadeShadowColor(Color.BLACK)
);

// Add hillshade layer to map
mapboxMap.addLayer(hillshadeLayer);
```

## Layers

While sources hold the data, layers are used to style and display the information. Several layer types are offered depending on your source geometry. Except for layers of the background type, each layer needs to refer to a source. You can optionally filter features and then define how those features are styled.

Each layer offers a `setProperties` API which can be used to style the layer in many different ways. Note that instead of creating different layers depending on certain cases inside your source data, it's recommended to use data-driven styling to reduce the number of layers that the map needs to render.

### Background

The background layer type is unique in that it doesn't require a source. Background layers can be a solid color or a pattern.

```java
BackgroundLayer backgroundLayer = new BackgroundLayer("background-layer");
backgroundLayer.setProperties(
  PropertyFactory.backgroundColor(Color.BLUE)
);
```

### Fill

Fill layers have an enclosed shape geometry that can be useful for marking areas on a map. The geometry's similar to a line layer consisting of a series of coordinates in a particular order with the first and last points having the same coordinate.

```java
FillLayer fillLayer = new FillLayer("layer-id", "source-id");
fillLayer.setProperties(
  PropertyFactory.fillColor(Color.GREEN)
);
```

To alter the shape of the geometry once you have added it, the layer can remain with no changes needed, only the source it's using should be updated. The layer will always display the latest updates inside its source.

<!-- NOTE will a none enclosed polygon fill be closed automatically? -->
<!-- NOTE talk about mapboxMap.getLayers(); -->
<!-- NOTE talk about mapboxMap.addLayerBelow(); -->

### Line

{{
  <Floater
    url="https://github.com/mapbox/mapbox-android-demo/blob/master/MapboxAndroidDemo/src/main/java/com/mapbox/mapboxandroiddemo/examples/styles/LineLayerActivity.java"
    title="Create and display line layer"
    category="guide"
    text="Build a GeoJSON FeatureCollection with the line geometry and then display it on the map using a line layer."
  />
}}

A series of coordinates can be combined to create a line segment that shows on a map. Between each pair of coordinates, a line segment's created which gets drawn straight and connects the two points.

<!-- NOTE add something visual here building the line layer? -->

Before beginning, you'll want to ensure that the Source your layer will be using has lineStrings as part of its geometry, an example creating this can be seen in the GeoJSON source section. Once the source has been created and added to the map, a lineLayer can be initiated, and properties can be set.

```java
LineLayer lineLayer = new LineLayer("line-layer", "line-source");

// The layer properties for our line. This is where we make the line dotted, set the
// color, etc.
lineLayer.setProperties(
  PropertyFactory.lineDasharray(new Float[]{0.01f, 2f}),
  PropertyFactory.lineCap(Property.LINE_CAP_ROUND),
  PropertyFactory.lineJoin(Property.LINE_JOIN_ROUND),
  PropertyFactory.lineWidth(5f),
  PropertyFactory.lineColor(Color.parseColor("#e55e5e"))
);

mapboxMap.addLayer(lineLayer);
```

### Symbol

Symbol layers indicate a single location on the map with either an icon or text label. Similar to GL Markers and Marker Views, the symbol layer can represent the same data and offers the most power for in map displaying. To begin with, we will show how to add a marker image to the map and then display it as your symbol layer.

```java
Bitmap icon = BitmapFactory.decodeResource(getResources(), R.drawable.my_marker_icon);
mapboxMap.addImage("my-marker-image", icon);

SymbolLayer symbolLayer = new SymbolLayer("layer-id", "source-id");
symbolLayer.setProperties(
  PropertyFactory.iconImage("my-marker-image")
);

mapboxMap.addLayer(symbolLayer);
```

Not only can symbol layers mark locations on the map using an image, but they can also display text directly on the map. Text symbol layers are done in a similar process to the image snippet given above, only the properties of the layer change.

```java
SymbolLayer selectedMarker = new SymbolLayer("selected-marker-layer", "selected-marker")
  .withProperties(
    PropertyFactory.textField("Mapbox"),
    PropertyFactory.textColor(Color.BLACK),
    PropertyFactory.textOpacity(0.5f)
  );

mapboxMap.addLayer(selectedMarker);
```

<!-- NOTE build an example showing how to display text stored in source property -->

### Raster

Raster layers are typically a collection of images that display on top of the base map tiles. While vector tiles are preferred, satellite imagery or legacy map styles render as a raster layer.

```java
RasterSource rasterSource = new RasterSource("source-id", "mapbox://mapbox.u8yyzaor");
mapboxMap.addSource(rasterSource);

RasterLayer rasterLayer = new RasterLayer("layer-id", "source-id");
mapboxMap.addLayer(rasterLayer);
```

One common use case for a `RasterLayer` is adding a layer of satellite tiles to the map:

```java
// Adding a raster source layer
RasterSource satelliteRasterSource = new RasterSource("satellite-raster-source", "mapbox://mapbox.satellite",512);
mapboxMap.addSource(satelliteRasterSource);
```

### Circle

Circle layers have a single center coordinate which comes from the source data. It's a geographically accurate projection of a circle on the Earth's surface drawn on the map. A few default properties are provided but can be overridden when the layer's first created.

```java
VectorSource vectorSource = new VectorSource("source-id", "mapbox://mapbox.2opop9hr");
mapboxMap.addSource(vectorSource);

CircleLayer circleLayer = new CircleLayer("layer-id", "source-id");
circleLayer.setSourceLayer("museum-cusco");
museumsLayer.setProperties(
  PropertyFactory.visibility(Property.VISIBLE),
  PropertyFactory.circleRadius(8f),
  PropertyFactory.circleColor(Color.argb(1, 55, 148, 179))
);
```

## Modify properties

Sources and layers aren't immutable and therefore, can be modified anytime during the map render. For example, to alter the fill color of a layer after it's been added to the map, you use the `mapboxMap` object to get the layer and set the property.

```java
FillLayer fillLayer = (FillLayer) mapboxMap.getLayer("fill-layer-id");
if (fillLayer != null) {
  fillLayer.setProperties(
    PropertyFactory.fillColor(Color.GREEN)
  );
}
```

In a GeoJSON source, you are able to modify, add, remove, or replace the FeatureCollection like so:

```java
GeoJsonSource geoJsonSource = (GeoJsonSource) mapboxMap.getSource("geojson-source-id");
if (geoJsonSource != null) {
  geoJsonSource.setGeoJson(myFeatureCollection);
}
```

## Capturing click events

Layers are not clickable and don't expose any event listeners for you to handle user input. Instead, the map querying feature described in a separate doc goes over how to detect when a user has clicked on a polygon inside your fill layer for example.
