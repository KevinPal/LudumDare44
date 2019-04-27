from lxml import etree
import os

svgStrings=[]
directory = "./svgs/"
for filename in os.listdir(directory):
    f = open(directory + filename)
    if f.mode == 'r':
        contents = f.read()
        root = etree.fromstring(contents)
    f.close()
    svgStrings.append(etree.tostring(root))


print """
<!DOCTYPE html>
<html>
	<head>
		<title>The Game!</title>
		<link rel="stylesheet" href="styles.css"/>
		<script src="./two.min.js"></script>
	</head>
	<body>
		<div class="game" id="draw-shapes" style="text-align: center">
		</div>
"""
for i in svgStrings:
    print i

print """
	</body>

	<script src="./input.js"></script>
	<script src="./enemy.js"></script>
	<script src="./game.js"></script>
</html>
"""