docker build -t arkema-webview .
docker run -d --name arkema-webview -p 59090:59090 arkema-webview
