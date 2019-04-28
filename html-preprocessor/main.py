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


print( """
<!DOCTYPE html>
<html>
	<head>
		<title>The Game!</title>
		<link rel="stylesheet" href="styles.css"/>
		<script src="./two.min.js"></script>
	</head>
	<body>

                <img id="shop_btn" src="./res/Buttons/BTNs/Shop_BTN.png" />
                <img id="shop_btn_actv" src="./res/shop_btn_actv.png" />
                <img id="bg_img" src="./res/bg.png" />
                <img id="normal_btn" src="./res/normal_speed.png" />
                <img id="fast_btn" src="./res/fast_speed.png" />
                <img id="ui_bg" src="./res/ui_bg.png" />
                <img id="hp_bar" src="./res/hp_bar.png" />
                <img id="hp_bar_hp" src="./res/hp_bar_hp.png" />
                <img id="money_bar" src="./res/money_bar.png" />

		<div class="game" id="draw-shapes" style="text-align: center">
		</div>
""")
for i in svgStrings:
    print (i)

print("""
	</body>

	<script src="./global-var.js"></script>
	<script src="./util.js"></script>
	<script src="./input.js"></script>
	<script src="./enemy.js"></script>
        <script src="./shop.js"></script>
	<script src="./tower.js"></script>
	<script src="./game.js"></script>
</html>
""")
