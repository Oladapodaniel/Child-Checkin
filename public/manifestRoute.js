var myDynamicManifest = {
  "name": "Your Great Site",
  "short_name": "Site",
  "description": "Something dynamic",
  "start_url": "<your-url>",
  "background_color": "#000000",
  "theme_color": "#0f4a73",
  "icons": [
      {
        src: "icon_size_36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "icon_size_48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icon_size_72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icon_size_96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icon_size_144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icon_size_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon_size_512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ]
  }
  const link = document.createElement("link");
  link.rel = "manifest";    
  const stringManifest = JSON.stringify(myDynamicManifest);
  link.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(stringManifest))
  document.head.appendChild(link);