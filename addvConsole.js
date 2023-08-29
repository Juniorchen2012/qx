var body = $response.body.replace(/<head>/g, "<head><script src='https://unpkg.com/vconsole@latest/dist/vconsole.min.js'></script><script>var vConsole = new window.VConsole();</script>")
$done({ body })
