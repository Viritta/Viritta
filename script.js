<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Home</title>

<style>
html, body {
margin: 0;
height: 100%;
overflow: hidden;
}

#bg {
position: fixed;
inset: 0;
background-image: url("./data/images/backgrounds/main/bg1.jpg");
background-size: cover;
background-position: center;
z-index: -1;
}

.panel {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
color: white;
font-family: Arial;
}
</style>

</head>

<body>

<div id="bg"></div>

<div class="panel">
<h1>Работает</h1>
<p>Если ты видишь фон — значит всё ок</p>
</div>

</body>
</html>