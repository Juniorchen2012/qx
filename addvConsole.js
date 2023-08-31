var body = $response.body.replace(/<head>/g, "<head><script src='//cdn.jsdelivr.net/npm/eruda'></script><script>eruda.init();</script><script src='https://unpkg.com/vconsole@latest/dist/vconsole.min.js'></script><script>var vConsole = new window.VConsole();</script>")
console.log(body)
$done({ body })
