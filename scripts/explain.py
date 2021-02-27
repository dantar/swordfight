import json

s = '''{"version":"1.0","showAllSwingButtons":true,"showLastSwingButtons":true,"enemySwingDelay":800,"world":{"orcs":[],"features":[{"hex":{"x":0,"y":0},"code":"shrine","tags":[]},{"hex":{"x":-1,"y":-2},"code":"tree","tags":[]},{"hex":{"x":1,"y":-2},"code":"tree","tags":[]},{"hex":{"x":-2,"y":-1},"code":"bush","tags":[]},{"hex":{"x":-1,"y":-1},"code":"grass","tags":[]},{"hex":{"x":1,"y":-1},"code":"stone","tags":[]},{"hex":{"x":-2,"y":1},"code":"tree","tags":[]},{"hex":{"x":-1,"y":1},"code":"stone","tags":[]},{"hex":{"x":1,"y":1},"code":"tree","tags":[]},{"hex":{"x":-1,"y":2},"code":"bush","tags":[]},{"hex":{"x":1,"y":2},"code":"grass","tags":[]}],"last":1614447712568,"next":1614448912565,"life":10,"gainLifeTime":3,"mana":0,"gainManaTime":3,"maxLife":12,"maxMana":1200}}'''
save = json.loads(s)
features = save['world']['features']
import pdb; pdb.set_trace()